'use client';

import { useActionState } from 'react';
import { loginAction } from '@/lib/actions/auth';
import type { ActionState } from '@/lib/actions/types';
import { Status, SubmitButton } from './ui';

export function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState<ActionState, FormData>(loginAction, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="text-muted mb-1.5 block font-mono text-[12px]">code</span>
        <input
          name="passcode"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className="border-rule bg-panel text-text focus:border-accent w-full rounded-lg border px-3 py-2.5 text-[15px] transition-colors outline-none"
        />
      </label>
      <div className="flex items-center gap-4">
        <SubmitButton>Unlock</SubmitButton>
        <Status state={state} />
      </div>
    </form>
  );
}
