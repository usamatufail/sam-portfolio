'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { COMMAND_KINDS, commands } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { bool, optionalStr, parseParagraphs, slugify, str } from '@/lib/parse';
import { moveRow, nextSortOrder } from './ordering';
import { publish } from './revalidate';
import { fail, ok, type ActionState } from './types';

export async function updateCommand(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const id = Number(formData.get('id'));
  if (!Number.isInteger(id)) return fail('Missing command id.');

  const rawKind = str(formData.get('kind'));
  const kind = COMMAND_KINDS.find((candidate) => candidate === rawKind);
  if (!kind) return fail('Pick a valid command type.');

  const value = optionalStr(formData.get('value'));
  if ((kind === 'route' || kind === 'external') && !value) {
    return fail(kind === 'route' ? 'Route commands need a path.' : 'Link commands need a URL.');
  }

  try {
    await db
      .update(commands)
      .set({
        key: slugify(str(formData.get('key'))),
        label: str(formData.get('label')),
        hint: str(formData.get('hint')),
        kind,
        value,
        answerTitle: optionalStr(formData.get('answerTitle')),
        answerLines: parseParagraphs(formData.get('answerLines')),
        enabled: bool(formData.get('enabled')),
      })
      .where(eq(commands.id, id));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not save.';
    return fail(message.includes('commands_key_idx') ? 'That key is already taken.' : message);
  }

  publish();
  return ok('Saved. The live site is updated.');
}

export async function addCommand(): Promise<void> {
  await requireAdmin();
  const order = await nextSortOrder(commands);
  const [row] = await db
    .insert(commands)
    .values({
      key: `command-${order + 1}`,
      label: 'New command',
      hint: 'answer',
      kind: 'answer',
      answerTitle: 'title',
      answerLines: ['The text this command prints in the palette.'],
      sortOrder: order,
    })
    .returning({ id: commands.id });
  publish();
  redirect(`/admin/commands/${row.id}`);
}

export async function deleteCommand(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  if (Number.isInteger(id)) {
    await db.delete(commands).where(eq(commands.id, id));
    publish();
  }
  redirect('/admin/commands');
}

export async function moveCommand(formData: FormData): Promise<void> {
  await requireAdmin();
  const direction = str(formData.get('direction')) === 'up' ? 'up' : 'down';
  if (await moveRow(commands, Number(formData.get('id')), direction)) publish();
}
