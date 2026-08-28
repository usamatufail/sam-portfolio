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
        <span className="mb-1.5 block font-mono text-[12px] text-muted">code</span>
        <input
          name="passcode"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className="w-full rounded-lg border border-rule bg-panel px-3 py-2.5 text-[15px] text-text outline-none transition-colors focus:border-accent"
        />
      </label>
      <div className="flex items-center gap-4">
        <SubmitButton>Unlock</SubmitButton>
        <Status state={state} />
      </div>
    </form>
  );
}
