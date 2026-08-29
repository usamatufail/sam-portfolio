import { asc } from 'drizzle-orm';
import Link from 'next/link';
import { DangerButton, GhostButton } from '@/components/admin/ui';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { deleteProject, moveProject } from '@/lib/actions/projects';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-accent text-bg rounded-lg px-4 py-2 text-[14px] font-semibold transition-opacity hover:opacity-85"
        >
          New project
        </Link>
      </div>
      <p className="text-text-5 mt-2 mb-8 max-w-[64ch] text-[15px] leading-[1.7]">
        Order here is the order on both the home list and /work.
      </p>

      <div className="flex flex-col gap-3">
        {rows.map((project, index) => (
          <div
            key={project.id}
            className="border-rule bg-panel flex flex-wrap items-center gap-4 rounded-2xl border p-4"
          >
            <div className="min-w-0 flex-1">
              <Link href={`/admin/projects/${project.id}`} className="hover:text-accent">
                <span className="text-[16px] font-semibold">{project.name}</span>
                <span className="text-text-5 text-[14px]">{project.listDescription}</span>
              </Link>
              <div className="text-muted mt-1 flex flex-wrap gap-3 font-mono text-[12px]">
                <span>{project.year}</span>
                <span>{project.slug}</span>
                {!project.published && (
                  <span className="text-[oklch(0.72_0.19_25)]">unpublished</span>
                )}
                {!project.featured && <span>not on home</span>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <form action={moveProject}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="direction" value="up" />
                <fieldset disabled={index === 0} className="contents">
                  <GhostButton>↑</GhostButton>
                </fieldset>
              </form>
              <form action={moveProject}>
                <input type="hidden" name="id" value={project.id} />
                <input type="hidden" name="direction" value="down" />
                <fieldset disabled={index === rows.length - 1} className="contents">
                  <GhostButton>↓</GhostButton>
                </fieldset>
              </form>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <DangerButton>Delete</DangerButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
