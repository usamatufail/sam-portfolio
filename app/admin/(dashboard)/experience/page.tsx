import { asc } from 'drizzle-orm';
import { AddButton } from '@/components/admin/AddButton';
import { ExperienceForm } from '@/components/admin/ListForms';
import { db } from '@/db';
import { experience } from '@/db/schema';
import { addExperience } from '@/lib/actions/content';

export const dynamic = 'force-dynamic';

export default async function ExperiencePage() {
  const rows = await db.select().from(experience).orderBy(asc(experience.sortOrder), asc(experience.id));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">Experience</h1>
        <AddButton action={addExperience} label="Add row" />
      </div>
      <p className="mt-2 mb-8 max-w-[64ch] text-[15px] leading-[1.7] text-text-5">
        The About page timeline, newest first. Saving keeps the order shown here.
      </p>

      <ExperienceForm rows={rows} />
    </>
  );
}
