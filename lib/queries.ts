import 'server-only';

import { asc, eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';
import { db } from '@/db';
import { commands, education, experience, principles, projects, settings } from '@/db/schema';

/** Every public read is tagged with this so one revalidate refreshes the site. */
export const CONTENT_TAG = 'site-content';

export const getSettings = unstable_cache(
  async () => {
    const [row] = await db.select().from(settings).where(eq(settings.id, 1)).limit(1);
    if (!row) throw new Error('Settings row is missing. Run `pnpm db:seed`.');
    return row;
  },
  ['settings'],
  { tags: [CONTENT_TAG] },
);

export const getProjects = unstable_cache(
  async () =>
    db
      .select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(asc(projects.sortOrder), asc(projects.id)),
  ['projects'],
  { tags: [CONTENT_TAG] },
);

export const getExperience = unstable_cache(
  async () => db.select().from(experience).orderBy(asc(experience.sortOrder), asc(experience.id)),
  ['experience'],
  { tags: [CONTENT_TAG] },
);

export const getPrinciples = unstable_cache(
  async () => db.select().from(principles).orderBy(asc(principles.sortOrder), asc(principles.id)),
  ['principles'],
  { tags: [CONTENT_TAG] },
);

export const getEducation = unstable_cache(
  async () => db.select().from(education).orderBy(asc(education.sortOrder), asc(education.id)),
  ['education'],
  { tags: [CONTENT_TAG] },
);

export const getCommands = unstable_cache(
  async () =>
    db
      .select()
      .from(commands)
      .where(eq(commands.enabled, true))
      .orderBy(asc(commands.sortOrder), asc(commands.id)),
  ['commands'],
  { tags: [CONTENT_TAG] },
);
