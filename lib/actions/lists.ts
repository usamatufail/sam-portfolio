'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { education, experience, principles } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { str } from '@/lib/parse';
import { nextSortOrder } from './ordering';
import { publish } from './revalidate';
import { fail, ok, type ActionState } from './types';

export async function saveExperience(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const ids = formData.getAll('rowId').map(String);
  const rows = ids
    .map((rowId, index) => ({
      id: Number(rowId),
      period: str(formData.get(`period-${rowId}`)),
      role: str(formData.get(`role-${rowId}`)),
      employer: str(formData.get(`employer-${rowId}`)),
      sortOrder: index,
    }))
    .filter((row) => row.role || row.employer || row.period);

  try {
    await Promise.all(
      rows.map((row) =>
        db
          .update(experience)
          .set({
            period: row.period,
            role: row.role,
            employer: row.employer,
            sortOrder: row.sortOrder,
          })
          .where(eq(experience.id, row.id)),
      ),
    );
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Could not save.');
  }

  publish();
  return ok('Saved. The live site is updated.');
}

export async function addExperience(): Promise<void> {
  await requireAdmin();
  await db.insert(experience).values({
    period: 'Year-Year',
    role: 'New role',
    employer: 'Employer',
    sortOrder: await nextSortOrder(experience),
  });
  publish();
  redirect('/admin/experience');
}

export async function deleteExperience(id: number): Promise<void> {
  await requireAdmin();
  if (Number.isInteger(id)) {
    await db.delete(experience).where(eq(experience.id, id));
    publish();
  }
  redirect('/admin/experience');
}

export async function savePrinciples(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const ids = formData.getAll('rowId').map(String);
  try {
    await Promise.all(
      ids.map((rowId, index) =>
        db
          .update(principles)
          .set({
            lead: str(formData.get(`lead-${rowId}`)),
            body: str(formData.get(`body-${rowId}`)),
            sortOrder: index,
          })
          .where(eq(principles.id, Number(rowId))),
      ),
    );
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Could not save.');
  }

  publish();
  return ok('Saved. The live site is updated.');
}

export async function addPrinciple(): Promise<void> {
  await requireAdmin();
  await db.insert(principles).values({
    lead: 'New lead phrase.',
    body: 'The evidence that backs it up.',
    sortOrder: await nextSortOrder(principles),
  });
  publish();
  redirect('/admin/principles');
}

export async function deletePrinciple(id: number): Promise<void> {
  await requireAdmin();
  if (Number.isInteger(id)) {
    await db.delete(principles).where(eq(principles.id, id));
    publish();
  }
  redirect('/admin/principles');
}

export async function saveEducation(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const ids = formData.getAll('rowId').map(String);
  try {
    await Promise.all(
      ids.map((rowId, index) =>
        db
          .update(education)
          .set({ line: str(formData.get(`line-${rowId}`)), sortOrder: index })
          .where(eq(education.id, Number(rowId))),
      ),
    );
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Could not save.');
  }

  publish();
  return ok('Saved. The live site is updated.');
}

export async function addEducation(): Promise<void> {
  await requireAdmin();
  await db
    .insert(education)
    .values({ line: 'New line · Year', sortOrder: await nextSortOrder(education) });
  publish();
  redirect('/admin/education');
}

export async function deleteEducation(id: number): Promise<void> {
  await requireAdmin();
  if (Number.isInteger(id)) {
    await db.delete(education).where(eq(education.id, id));
    publish();
  }
  redirect('/admin/education');
}
