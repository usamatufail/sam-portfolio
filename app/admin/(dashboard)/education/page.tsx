import { asc } from 'drizzle-orm';
import { AddButton } from '@/components/admin/AddButton';
import { EducationForm } from '@/components/admin/ListForms';
import { db } from '@/db';
import { education } from '@/db/schema';
import { addEducation } from '@/lib/actions/content';

export const dynamic = 'force-dynamic';

export default async function EducationPage() {
  const rows = await db
    .select()
    .from(education)
    .orderBy(asc(education.sortOrder), asc(education.id));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">Education</h1>
        <AddButton action={addEducation} label="Add line" />
      </div>
      <p className="text-text-5 mt-2 mb-8 max-w-[64ch] text-[15px] leading-[1.7]">
        Degrees and certifications, one line each. Saving keeps the order shown here.
      </p>

      <EducationForm rows={rows} />
    </>
  );
}
