import { asc } from 'drizzle-orm';
import Link from 'next/link';
import { AddButton } from '@/components/admin/AddButton';
import { DangerButton, GhostButton } from '@/components/admin/ui';
import { db } from '@/db';
import { commands } from '@/db/schema';
import { addCommand, deleteCommand, moveCommand } from '@/lib/actions/commands';

export const dynamic = 'force-dynamic';

export default async function CommandsPage() {
  const rows = await db.select().from(commands).orderBy(asc(commands.sortOrder), asc(commands.id));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">Command palette</h1>
        <AddButton action={addCommand} label="Add command" />
      </div>
      <p className="text-text-5 mt-2 mb-8 max-w-[64ch] text-[15px] leading-[1.7]">
        Every row behind ⌘K, in the order they appear. The four answer commands print their text
        inside the palette rather than navigating.
      </p>

      <div className="flex flex-col gap-3">
        {rows.map((command, index) => (
          <div
            key={command.id}
            className="border-rule bg-panel flex flex-wrap items-center gap-4 rounded-2xl border p-4"
          >
            <div className="min-w-0 flex-1">
              <Link
                href={`/admin/commands/${command.id}`}
                className="hover:text-accent -my-2 inline-block py-2"
              >
                <span className="text-[16px] font-semibold">{command.label}</span>
              </Link>
              <div className="text-muted mt-1 flex flex-wrap gap-3 font-mono text-[12px]">
                <span>{command.key}</span>
                <span>{command.kind}</span>
                {!command.enabled && <span className="text-[oklch(0.72_0.19_25)]">disabled</span>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <form action={moveCommand}>
                <input type="hidden" name="id" value={command.id} />
                <input type="hidden" name="direction" value="up" />
                <fieldset disabled={index === 0} className="contents">
                  <GhostButton>↑</GhostButton>
                </fieldset>
              </form>
              <form action={moveCommand}>
                <input type="hidden" name="id" value={command.id} />
                <input type="hidden" name="direction" value="down" />
                <fieldset disabled={index === rows.length - 1} className="contents">
                  <GhostButton>↓</GhostButton>
                </fieldset>
              </form>
              <form action={deleteCommand}>
                <input type="hidden" name="id" value={command.id} />
                <DangerButton>Delete</DangerButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
