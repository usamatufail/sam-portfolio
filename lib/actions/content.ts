'use server';

import { asc, eq, sql } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import {
  AVAILABILITY_STATES,
  COMMAND_KINDS,
  commands,
  education,
  experience,
  principles,
  projects,
  settings,
} from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { bool, optionalStr, parseParagraphs, parseTokens, slugify, str } from '@/lib/parse';
import { CONTENT_TAG } from '@/lib/queries';
import { fail, ok, type ActionState } from './types';

/**
 * Every mutation ends here.
 *
 * Both calls are needed, and this was verified against a production build:
 * `revalidateTag` drops the cached query results, but on its own it does NOT
 * re-render the statically prerendered public routes; they keep serving the
 * old HTML. `revalidatePath('/', 'layout')` re-renders every public route with
 * fresh data. Dropping either one leaves saves invisible on the live site.
 */
function publish(): void {
  revalidateTag(CONTENT_TAG, 'max');
  revalidatePath('/', 'layout');
}

/* -------------------------------------------------------------- settings -- */

export async function saveSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const email = str(formData.get('email'));
  if (!email.includes('@')) return fail('That email address does not look right.');

  const rawState = str(formData.get('availabilityState'));
  const availabilityState = AVAILABILITY_STATES.find((candidate) => candidate === rawState);
  if (!availabilityState) return fail('Pick an availability state.');

  /*
   * Only the fields this form actually renders.
   *
   * Everything visible on the page is edited inline now and is deliberately
   * absent from this form. Writing those columns here would read '' from the
   * missing inputs and wipe the copy, so they must stay out of this object.
   */
  try {
    await db
      .update(settings)
      .set({
        fullName: str(formData.get('fullName')),
        jobTitle: str(formData.get('jobTitle')),
        avatarUrl: str(formData.get('avatarUrl')),
        avatarAlt: str(formData.get('avatarAlt')),

        email,
        phone: str(formData.get('phone')),
        linkedinUrl: str(formData.get('linkedinUrl')),
        githubUrl: str(formData.get('githubUrl')),
        resumeUrl: str(formData.get('resumeUrl')),
        palettePlaceholder: str(formData.get('palettePlaceholder')),

        badgeEnabled: bool(formData.get('badgeEnabled')),
        badgeCtaUrl: str(formData.get('badgeCtaUrl')),

        availabilityState,
        availabilityAvailable: str(formData.get('availabilityAvailable')),
        availabilityLimited: str(formData.get('availabilityLimited')),
        availabilityUnavailable: str(formData.get('availabilityUnavailable')),

        seoTitle: str(formData.get('seoTitle')),
        seoDescription: str(formData.get('seoDescription')),
        seoKeywords: str(formData.get('seoKeywords')),
        ogTitle: str(formData.get('ogTitle')),
        ogDescription: str(formData.get('ogDescription')),

        updatedAt: new Date(),
      })
      .where(eq(settings.id, 1));
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Could not save.');
  }

  publish();
  return ok('Saved. The live site is updated.');
}

/* -------------------------------------------------------------- projects -- */

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
    const [maxRow] = await db
      .select({ max: sql<number | null>`max(${projects.sortOrder})` })
      .from(projects);
    const [row] = await db
      .insert(projects)
      .values({ ...values, sortOrder: (maxRow?.max ?? -1) + 1 })
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
  const id = Number(formData.get('id'));
  const direction = str(formData.get('direction')) === 'up' ? -1 : 1;
  if (!Number.isInteger(id)) return;

  const rows = await db
    .select({ id: projects.id })
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id));

  const index = rows.findIndex((r) => r.id === id);
  const target = index + direction;
  if (index === -1 || target < 0 || target >= rows.length) return;

  [rows[index], rows[target]] = [rows[target], rows[index]];
  await Promise.all(
    rows.map((row, order) =>
      db.update(projects).set({ sortOrder: order }).where(eq(projects.id, row.id)),
    ),
  );

  publish();
}

/* ------------------------------------------------- experience / lists ----- */

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
  const [maxRow] = await db
    .select({ max: sql<number | null>`max(${experience.sortOrder})` })
    .from(experience);
  await db.insert(experience).values({
    period: 'Year-Year',
    role: 'New role',
    employer: 'Employer',
    sortOrder: (maxRow?.max ?? -1) + 1,
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
  const [maxRow] = await db
    .select({ max: sql<number | null>`max(${principles.sortOrder})` })
    .from(principles);
  await db.insert(principles).values({
    lead: 'New lead phrase.',
    body: 'The evidence that backs it up.',
    sortOrder: (maxRow?.max ?? -1) + 1,
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
  const [maxRow] = await db
    .select({ max: sql<number | null>`max(${education.sortOrder})` })
    .from(education);
  await db
    .insert(education)
    .values({ line: 'New line · Year', sortOrder: (maxRow?.max ?? -1) + 1 });
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

/* -------------------------------------------------------------- commands -- */

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
  const [maxRow] = await db
    .select({ max: sql<number | null>`max(${commands.sortOrder})` })
    .from(commands);
  const order = (maxRow?.max ?? -1) + 1;
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
  const id = Number(formData.get('id'));
  const direction = str(formData.get('direction')) === 'up' ? -1 : 1;
  if (!Number.isInteger(id)) return;

  const rows = await db
    .select({ id: commands.id })
    .from(commands)
    .orderBy(asc(commands.sortOrder), asc(commands.id));

  const index = rows.findIndex((r) => r.id === id);
  const target = index + direction;
  if (index === -1 || target < 0 || target >= rows.length) return;

  [rows[index], rows[target]] = [rows[target], rows[index]];
  await Promise.all(
    rows.map((row, order) =>
      db.update(commands).set({ sortOrder: order }).where(eq(commands.id, row.id)),
    ),
  );

  publish();
}
