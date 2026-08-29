'use client';

import type { ActionState } from '@/lib/actions/types';
import { SubmitButton } from './buttons';

export function Status({ state }: { state: ActionState }) {
  if (!state) return null;
  return (
    <p
      role="status"
      className={`m-0 font-mono text-[13px] ${state.ok ? 'text-accent' : 'text-[oklch(0.72_0.19_25)]'}`}
    >
      {state.message}
    </p>
  );
}

/** Sticky footer bar carrying the submit button and the last save message. */

export function SaveBar({ state }: { state: ActionState }) {
  return (
    <div className="border-rule bg-bg/90 sticky bottom-0 -mx-1 flex items-center gap-4 border-t px-1 py-4 backdrop-blur">
      <SubmitButton />
      <Status state={state} />
    </div>
  );
}
