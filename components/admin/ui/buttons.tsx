'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ children = 'Save changes' }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-accent text-bg cursor-pointer rounded-lg px-5 py-2.5 text-[15px] font-semibold transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? 'Saving…' : children}
    </button>
  );
}

export function DangerButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="border-rule text-text-5 cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[12px] transition-colors hover:border-[oklch(0.6_0.19_25)] hover:text-[oklch(0.7_0.19_25)] disabled:opacity-50"
    >
      {pending ? '…' : children}
    </button>
  );
}

export function GhostButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="border-rule text-text-5 hover:border-accent hover:text-accent cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[12px] transition-colors disabled:opacity-50"
    >
      {pending ? '…' : children}
    </button>
  );
}
