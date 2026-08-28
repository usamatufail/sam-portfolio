import { asc } from 'drizzle-orm';
import { AddButton } from '@/components/admin/AddButton';
import { PrinciplesForm } from '@/components/admin/ListForms';
import { db } from '@/db';
import { principles } from '@/db/schema';
import { addPrinciple } from '@/lib/actions/content';

export const dynamic = 'force-dynamic';

export default async function PrinciplesPage() {
  const rows = await db.select().from(principles).orderBy(asc(principles.sortOrder), asc(principles.id));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">How I work</h1>
        <AddButton action={addPrinciple} label="Add paragraph" />
      </div>
      <p className="mt-2 mb-8 max-w-[64ch] text-[15px] leading-[1.7] text-text-5">
        Each paragraph opens with a bold lead phrase, then the evidence behind it. Saving keeps the order shown here.
      </p>

      <PrinciplesForm rows={rows} />
    </>
  );
}
