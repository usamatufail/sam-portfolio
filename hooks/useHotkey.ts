'use client';

import { useEffect } from 'react';

/**
 * Fires `handler` on a modifier + key combination, anywhere on the page.
 * Disabled entirely when `active` is false, so callers do not have to guard
 * inside the handler.
 */
export function useHotkey(
  key: string,
  handler: () => void,
  { active = true, meta = true }: { active?: boolean; meta?: boolean } = {},
): void {
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (meta && !(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== key) return;
      event.preventDefault();
      handler();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [key, handler, active, meta]);
}
