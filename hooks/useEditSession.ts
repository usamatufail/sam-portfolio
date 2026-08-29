'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchCanEdit, readEditMode, rememberEditMode, SESSION_EVENT } from '@/lib/edit/session';
import type { EditMode } from '@/lib/edit/types';

/**
 * Whether this visitor may edit, plus the edit/preview toggle.
 *
 * The check runs after hydration rather than in the layout on purpose: reading
 * the session cookie server-side would opt every public page out of static
 * prerendering, which is what the site's SEO depends on.
 */
export function useEditSession() {
  const [canEdit, setCanEdit] = useState(false);
  const [mode, setModeState] = useState<EditMode>('preview');

  useEffect(() => {
    let cancelled = false;

    const check = () => {
      void fetchCanEdit().then((allowed) => {
        if (cancelled) return;
        setCanEdit(allowed);
        if (!allowed) return;
        const stored = readEditMode();
        if (stored) setModeState(stored);
      });
    };

    check();
    // Unlocking happens elsewhere (the palette) while this stays mounted.
    window.addEventListener(SESSION_EVENT, check);
    return () => {
      cancelled = true;
      window.removeEventListener(SESSION_EVENT, check);
    };
  }, []);

  const setMode = useCallback((next: EditMode) => {
    setModeState(next);
    rememberEditMode(next);
  }, []);

  return { canEdit, mode: canEdit ? mode : ('preview' as EditMode), setMode };
}
