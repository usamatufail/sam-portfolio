'use client';

import { useActionState } from 'react';
import type { Education, Experience, Principle } from '@/db/schema';
import {
  deleteEducation,
  deleteExperience,
  deletePrinciple,
  saveEducation,
  saveExperience,
  savePrinciples,
} from '@/lib/actions/content';
import type { ActionState } from '@/lib/actions/types';
import { SaveBar } from './ui';

const inputBase =
  'w-full rounded-lg border border-rule bg-bg px-3 py-2.5 text-[15px] text-text outline-none transition-colors focus:border-accent';

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-muted mb-1.5 block font-mono text-[12px]">{children}</span>;
}

/**
 * Delete lives inside the save form and carries its own `formAction`, so a row
 * can be removed without submitting the edits sitting in the other rows.
 */
function Row({ children, onDelete }: { children: React.ReactNode; onDelete: () => Promise<void> }) {
  return (
    <div className="border-rule bg-panel rounded-2xl border p-4">
      {children}
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          formAction={onDelete}
          className="border-rule text-text-5 cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[12px] transition-colors hover:border-[oklch(0.6_0.19_25)] hover:text-[oklch(0.72_0.19_25)]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export function ExperienceForm({ rows }: { rows: Experience[] }) {
  const [state, action] = useActionState<ActionState, FormData>(saveExperience, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      {rows.map((row) => (
        <Row key={row.id} onDelete={deleteExperience.bind(null, row.id)}>
          <input type="hidden" name="rowId" value={row.id} />
          <div className="grid gap-4 sm:grid-cols-[140px_1fr_1fr]">
            <label>
              <Label>period</Label>
              <input name={`period-${row.id}`} defaultValue={row.period} className={inputBase} />
            </label>
            <label>
              <Label>role</Label>
              <input name={`role-${row.id}`} defaultValue={row.role} className={inputBase} />
            </label>
            <label>
              <Label>employer</Label>
              <input
                name={`employer-${row.id}`}
                defaultValue={row.employer}
                className={inputBase}
              />
            </label>
          </div>
        </Row>
      ))}
      <SaveBar state={state} />
    </form>
  );
}

export function PrinciplesForm({ rows }: { rows: Principle[] }) {
  const [state, action] = useActionState<ActionState, FormData>(savePrinciples, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      {rows.map((row) => (
        <Row key={row.id} onDelete={deletePrinciple.bind(null, row.id)}>
          <input type="hidden" name="rowId" value={row.id} />
          <div className="flex flex-col gap-4">
            <label>
              <Label>lead phrase (rendered bold)</Label>
              <input name={`lead-${row.id}`} defaultValue={row.lead} className={inputBase} />
            </label>
            <label>
              <Label>evidence</Label>
              <textarea
                name={`body-${row.id}`}
                defaultValue={row.body}
                rows={3}
                className={`${inputBase} resize-y leading-[1.6]`}
              />
            </label>
          </div>
        </Row>
      ))}
      <SaveBar state={state} />
    </form>
  );
}

export function EducationForm({ rows }: { rows: Education[] }) {
  const [state, action] = useActionState<ActionState, FormData>(saveEducation, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      {rows.map((row) => (
        <Row key={row.id} onDelete={deleteEducation.bind(null, row.id)}>
          <input type="hidden" name="rowId" value={row.id} />
          <label>
            <Label>line</Label>
            <input name={`line-${row.id}`} defaultValue={row.line} className={inputBase} />
          </label>
        </Row>
      ))}
      <SaveBar state={state} />
    </form>
  );
}
