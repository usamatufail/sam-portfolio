import { asc, eq, sql } from 'drizzle-orm';
import { db } from '@/db';
import type { commands, education, experience, principles, projects } from '@/db/schema';

/** The tables that carry a user-controlled display order. */
type Orderable =
  typeof projects | typeof commands | typeof experience | typeof principles | typeof education;

/** The order value to give a newly appended row. */
export async function nextSortOrder(table: Orderable): Promise<number> {
  const [row] = await db.select({ max: sql<number | null>`max(${table.sortOrder})` }).from(table);
  return (row?.max ?? -1) + 1;
}

/**
 * Moves one row up or down, then rewrites every row's `sortOrder` so the
 * sequence stays dense. Returns false when the move was not possible, so the
 * caller can skip revalidating.
 */
export async function moveRow(
  table: Orderable,
  id: number,
  direction: 'up' | 'down',
): Promise<boolean> {
  if (!Number.isInteger(id)) return false;

  const rows = await db
    .select({ id: table.id })
    .from(table)
    .orderBy(asc(table.sortOrder), asc(table.id));

  const index = rows.findIndex((row) => row.id === id);
  const target = index + (direction === 'up' ? -1 : 1);
  if (index === -1 || target < 0 || target >= rows.length) return false;

  [rows[index], rows[target]] = [rows[target], rows[index]];
  await Promise.all(
    rows.map((row, order) =>
      db.update(table).set({ sortOrder: order }).where(eq(table.id, row.id)),
    ),
  );
  return true;
}
