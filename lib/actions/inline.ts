'use server';

import { eq, inArray } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import { db } from '@/db';
import { education, experience, principles, projects, settings } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { parseEditPath, type EditableTable } from '@/lib/inline/fields';
import { CONTENT_TAG } from '@/lib/queries';

const TABLES = { settings, projects, experience, principles, education } as const;

export type InlineSaveResult = { ok: boolean; message: string; saved: number };

type Pending = {
  scalars: Record<string, string>;
  arrays: Record<string, Map<number, string>>;
};

/**
 * Persists a batch of inline edits.
 *
 * `changes` is keyed by the `table:id:field[:index]` paths the page handed out.
 * Anything not on the allowlist in lib/inline/fields.ts is dropped rather than
 * written, so a tampered payload cannot reach an arbitrary column.
 */
export async function saveInlineEdits(changes: Record<string, string>): Promise<InlineSaveResult> {
  await requireAdmin();

  const entries = Object.entries(changes);
  if (entries.length === 0) return { ok: true, message: 'Nothing to save.', saved: 0 };
  if (entries.length > 500)
    return { ok: false, message: 'Too many changes in one save.', saved: 0 };

  // Group by row so each row is written once, however many fields changed.
  const byRow = new Map<string, Pending>();
  let rejected = 0;

  for (const [path, rawValue] of entries) {
    const parsed = parseEditPath(path);
    if (!parsed) {
      rejected += 1;
      continue;
    }
    if (typeof rawValue !== 'string' || rawValue.length > 20_000) {
      rejected += 1;
      continue;
    }

    // contentEditable can smuggle in non-breaking spaces and stray newlines.
    const value = rawValue
      .replace(/ /g, ' ')
      .replace(/\s*\n\s*/g, ' ')
      .trim();

    const key = `${parsed.table}:${parsed.id}`;
    const pending = byRow.get(key) ?? { scalars: {}, arrays: {} };
    if (parsed.index === undefined) {
      pending.scalars[parsed.field] = value;
    } else {
      pending.arrays[parsed.field] ??= new Map();
      pending.arrays[parsed.field].set(parsed.index, value);
    }
    byRow.set(key, pending);
  }

  if (byRow.size === 0) {
    return { ok: false, message: 'Nothing recognised in those edits.', saved: 0 };
  }

  // Array fields are read-modify-write, so fetch the rows that need one.
  const needsRead = new Map<EditableTable, number[]>();
  for (const [key, pending] of byRow) {
    if (Object.keys(pending.arrays).length === 0) continue;
    const [table, id] = key.split(':') as [EditableTable, string];
    needsRead.set(table, [...(needsRead.get(table) ?? []), Number(id)]);
  }

  const current = new Map<string, Record<string, unknown>>();
  for (const [table, ids] of needsRead) {
    const rows = await db.select().from(TABLES[table]).where(inArray(TABLES[table].id, ids));
    for (const row of rows as { id: number }[]) {
      current.set(`${table}:${row.id}`, row as Record<string, unknown>);
    }
  }

  let saved = 0;
  try {
    for (const [key, pending] of byRow) {
      const [tableName, rawId] = key.split(':') as [EditableTable, string];
      const table = TABLES[tableName];
      const id = Number(rawId);

      const patch: Record<string, unknown> = { ...pending.scalars };

      for (const [field, edits] of Object.entries(pending.arrays)) {
        const existing = (current.get(key)?.[field] as string[] | undefined) ?? [];
        const next = [...existing];
        for (const [index, value] of edits) {
          if (index < next.length) next[index] = value;
          else if (value) next.push(value);
        }
        // Clearing an item removes it, matching how the admin textareas behave.
        patch[field] = next.filter((item) => item.trim() !== '');
      }

      if ('updatedAt' in table) patch.updatedAt = new Date();

      // Keys are allowlisted above, which Drizzle's generic set() type cannot know.
      await db
        .update(table)
        .set(patch as Parameters<ReturnType<typeof db.update>['set']>[0])
        .where(eq(table.id, id));
      saved += Object.keys(pending.scalars).length + Object.keys(pending.arrays).length;
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Could not save those edits.',
      saved: 0,
    };
  }

  revalidateTag(CONTENT_TAG, 'max');
  revalidatePath('/', 'layout');

  const note = rejected > 0 ? ` ${rejected} change(s) were not recognised and were skipped.` : '';
  return { ok: true, message: `Saved.${note}`, saved };
}
