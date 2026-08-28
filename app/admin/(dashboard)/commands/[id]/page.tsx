import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { CommandForm } from '@/components/admin/CommandForm';
import { db } from '@/db';
import { commands } from '@/db/schema';

export const dynamic = 'force-dynamic';

export default async function EditCommandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const commandId = Number(id);
  if (!Number.isInteger(commandId)) notFound();

  const [command] = await db.select().from(commands).where(eq(commands.id, commandId)).limit(1);
  if (!command) notFound();

  return (
    <>
      <h1 className="m-0 mb-8 text-[24px] font-semibold tracking-[-0.02em]">{command.label}</h1>
      <CommandForm command={command} />
    </>
  );
}
