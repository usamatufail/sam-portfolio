'use client';

import { useEffect } from 'react';

/**
 * Much of the editable copy sits inside links (project rows, contact rows), so
 * in edit mode a click should place the caret rather than navigate away.
 *
 * Done once at the document level instead of threading a mode check through
 * every link. The editor's own chrome is exempt via `[data-editor-ui]`.
 */
export function useEditLinkGuard(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor || anchor.closest('[data-editor-ui]')) return;
      if (target?.closest('[data-editable]') || anchor.querySelector('[data-editable]')) {
        event.preventDefault();
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [active]);
}
