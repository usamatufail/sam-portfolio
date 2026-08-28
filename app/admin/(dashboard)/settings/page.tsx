import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { SettingsForm } from '@/components/admin/SettingsForm';
import { db } from '@/db';
import { settings } from '@/db/schema';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const [row] = await db.select().from(settings).where(eq(settings.id, 1)).limit(1);
  if (!row) notFound();

  return (
    <>
      <h1 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">Site settings</h1>
      <p className="mt-2 mb-8 max-w-[64ch] text-[15px] leading-[1.7] text-text-5">
        Standalone copy: the hero, contact links, page headings, footer and everything search
        engines read.
      </p>
      <SettingsForm settings={row} />
    </>
  );
}
