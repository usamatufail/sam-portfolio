'use client';

import { GhostButton } from './ui';

export function AddButton({ action, label }: { action: () => Promise<void>; label: string }) {
  return (
    <form action={action}>
      <GhostButton>{label}</GhostButton>
    </form>
  );
}
