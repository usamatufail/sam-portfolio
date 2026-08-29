'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Tracks pending inline edits.
 *
 * The values live in refs, not state: the nodes being edited are
 * contentEditable, and re-rendering one while someone is typing moves the
 * caret. Only the dirty *count* is state, and only when it actually changes.
 */
export function useDirtyValues() {
  const changes = useRef(new Map<string, string>());
  const originals = useRef(new Map<string, string>());
  const [dirty, setDirty] = useState(0);

  /** Records the server-rendered value, so reverting an edit clears it. */
  const register = useCallback((path: string, value: string) => {
    originals.current.set(path, value);
  }, []);

  const setValue = useCallback((path: string, value: string) => {
    if (!originals.current.has(path)) return;
    const before = changes.current.size;

    if (value === originals.current.get(path)) changes.current.delete(path);
    else changes.current.set(path, value);

    const after = changes.current.size;
    if (after !== before) setDirty(after);
  }, []);

  const snapshot = useCallback(() => Object.fromEntries(changes.current), []);

  const reset = useCallback((forgetOriginals = false) => {
    changes.current.clear();
    if (forgetOriginals) originals.current.clear();
    setDirty(0);
  }, []);

  return { dirty, register, setValue, snapshot, reset };
}
