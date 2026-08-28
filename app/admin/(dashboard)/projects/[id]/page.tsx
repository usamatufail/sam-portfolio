import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { db } from '@/db';
import { projects } from '@/db/schema';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = Number(id);
  if (!Number.isInteger(projectId)) notFound();

  const [project] = await db.select().from(projects).where(eq(projects.id, projectId)).limit(1);
  if (!project) notFound();

  return (
    <>
      <h1 className="m-0 mb-8 text-[24px] font-semibold tracking-[-0.02em]">{project.name}</h1>
      <ProjectForm project={project} />
    </>
  );
}
