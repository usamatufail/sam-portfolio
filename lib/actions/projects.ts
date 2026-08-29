'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { bool, optionalStr, parseParagraphs, parseTokens, slugify, str } from '@/lib/parse';
import { moveRow, nextSortOrder } from './ordering';
import { publish } from './revalidate';
import { fail, ok, type ActionState } from './types';

function projectValues(formData: FormData) {
  const name = str(formData.get('name'));
  return {
    name,
    slug: slugify(str(formData.get('slug')) || name),
    listDescription: str(formData.get('listDescription')),
    year: str(formData.get('year')),
    category: str(formData.get('category')),
    caseTitle: str(formData.get('caseTitle')),
    body: parseParagraphs(formData.get('body')),
    tech: parseTokens(formData.get('tech')),
    linkUrl: optionalStr(formData.get('linkUrl')),
    linkLabel: optionalStr(formData.get('linkLabel')),
    featured: bool(formData.get('featured')),
    published: bool(formData.get('published')),
    updatedAt: new Date(),
  };
}

export async function createProject(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const values = projectValues(formData);
  if (!values.name) return fail('A project needs a name.');
  if (!values.slug) return fail('A project needs a slug.');

  let id: number;
  try {
    const [row] = await db
      .insert(projects)
      .values({ ...values, sortOrder: await nextSortOrder(projects) })
      .returning({ id: projects.id });
    id = row.id;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not create the project.';
    return fail(message.includes('projects_slug_idx') ? 'That slug is already taken.' : message);
  }

  publish();
  redirect(`/admin/projects/${id}?created=1`);
}

export async function updateProject(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const id = Number(formData.get('id'));
  if (!Number.isInteger(id)) return fail('Missing project id.');

  const values = projectValues(formData);
  if (!values.name) return fail('A project needs a name.');
  if (!values.slug) return fail('A project needs a slug.');

  try {
    await db.update(projects).set(values).where(eq(projects.id, id));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not save the project.';
    return fail(message.includes('projects_slug_idx') ? 'That slug is already taken.' : message);
  }

  publish();
  return ok('Saved. The live site is updated.');
}

export async function deleteProject(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  if (Number.isInteger(id)) {
    await db.delete(projects).where(eq(projects.id, id));
    publish();
  }
  redirect('/admin/projects');
}

export async function moveProject(formData: FormData): Promise<void> {
  await requireAdmin();
  const direction = str(formData.get('direction')) === 'up' ? 'up' : 'down';
  if (await moveRow(projects, Number(formData.get('id')), direction)) publish();
}
