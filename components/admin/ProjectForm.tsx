'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { Project } from '@/db/schema';
import { createProject, updateProject } from '@/lib/actions/projects';
import type { ActionState } from '@/lib/actions/types';
import { formatParagraphs, formatTokens } from '@/lib/parse';
import { Field, SaveBar, Section, TextArea, Toggle } from './ui';

export function ProjectForm({ project }: { project?: Project }) {
  const action = project ? updateProject : createProject;
  const [state, formAction] = useActionState<ActionState, FormData>(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {project && <input type="hidden" name="id" value={project.id} />}

      <Section
        title="Home list row"
        description="How this project reads in the Selected work list."
      >
        <Field label="name" name="name" defaultValue={project?.name} required />
        <Field
          label="slug"
          name="slug"
          defaultValue={project?.slug}
          hint="Left blank, it is derived from the name."
        />
        <div className="sm:col-span-2">
          <TextArea
            label="list description"
            name="listDescription"
            defaultValue={project?.listDescription}
            rows={2}
            hint="Runs on directly after the name, so it usually starts with a comma."
          />
        </div>
      </Section>

      <Section title="Case study" description="The /work entry." columns={1}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="year" name="year" defaultValue={project?.year} />
          <Field
            label="category"
            name="category"
            defaultValue={project?.category}
            hint="The second half of the meta row, e.g. “AI commerce · Next.js 14”."
          />
        </div>
        <Field label="case study heading" name="caseTitle" defaultValue={project?.caseTitle} />
        <TextArea
          label="body"
          name="body"
          defaultValue={project ? formatParagraphs(project.body) : ''}
          rows={10}
          hint="One paragraph per block, separated by a blank line."
        />
        <TextArea
          label="tech"
          name="tech"
          defaultValue={project ? formatTokens(project.tech) : ''}
          rows={2}
          hint="Comma separated."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="link url"
            name="linkUrl"
            defaultValue={project?.linkUrl}
            hint="Optional. Leave blank for projects with nothing public."
          />
          <Field
            label="link label"
            name="linkLabel"
            defaultValue={project?.linkLabel}
            hint="e.g. “phia.com ↗”"
          />
        </div>
      </Section>

      <Section title="Visibility">
        <Toggle
          label="Published"
          name="published"
          defaultChecked={project?.published ?? true}
          hint="Unpublished projects disappear from both the home list and /work."
        />
        <Toggle
          label="Show in the home list"
          name="featured"
          defaultChecked={project?.featured ?? true}
          hint="Off keeps the case study on /work but hides the home row."
        />
      </Section>

      <SaveBar state={state} />

      {project && (
        <Link
          href="/admin/projects"
          className="text-muted hover:text-accent -my-2 inline-block py-2 font-mono text-[13px]"
        >
          ← all projects
        </Link>
      )}
    </form>
  );
}
