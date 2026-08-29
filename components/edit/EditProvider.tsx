'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { saveInlineEdits } from '@/lib/actions/inline';

export type EditMode = 'preview' | 'edit';

const MODE_KEY = 'sam-edit-mode';

/** Fired when the edit session is gained or dropped, so the provider re-checks. */
export const SESSION_EVENT = 'sam:edit-session-changed';

export function announceSessionChange() {
  window.dispatchEvent(new Event(SESSION_EVENT));
}

/**
 * Three contexts rather than one, deliberately.
 *
 * Editable nodes are contentEditable, and a React re-render while someone is
 * typing moves the caret. So the mode and the stable action callbacks live in
 * their own contexts, and the frequently-changing status (dirty count, saving,
 * last message) lives in a third that only the toolbar subscribes to.
 */
const ModeContext = createContext<EditMode>('preview');

type Actions = {
  setValue: (path: string, value: string) => void;
  setMode: (mode: EditMode) => void;
  save: () => void;
  discard: () => void;
};
const ActionsContext = createContext<Actions | null>(null);

type Status = { dirty: number; saving: boolean; message: string | null; ok: boolean };
const StatusContext = createContext<Status>({ dirty: 0, saving: false, message: null, ok: true });

export const useEditMode = () => useContext(ModeContext);
export const useEditStatus = () => useContext(StatusContext);
export function useEditActions(): Actions {
  const value = useContext(ActionsContext);
  if (!value) throw new Error('useEditActions must be used inside EditProvider');
  return value;
}

export function EditProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [canEdit, setCanEdit] = useState(false);
  const [mode, setModeState] = useState<EditMode>('preview');
  const [status, setStatus] = useState<Status>({
    dirty: 0,
    saving: false,
    message: null,
    ok: true,
  });

  // Edits live in a ref so a keystroke never re-renders the node being typed in.
  const changes = useRef(new Map<string, string>());
  // The server-rendered value for each path, so reverting an edit clears it.
  const originals = useRef(new Map<string, string>());

  /**
   * Asked for after hydration so the page itself can stay statically rendered.
   *
   * Also re-run on SESSION_EVENT, because unlocking happens in the command
   * palette: `router.refresh()` re-renders the server components but does not
   * remount this provider, so a mount-only fetch would never see the new cookie
   * and the toolbar would not appear until a full reload.
   */
  useEffect(() => {
    let cancelled = false;

    const check = () => {
      fetch('/api/edit-session', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : { canEdit: false }))
        .then((data: { canEdit?: boolean }) => {
          if (cancelled) return;
          setCanEdit(Boolean(data.canEdit));
          if (!data.canEdit) return;
          try {
            const stored = sessionStorage.getItem(MODE_KEY);
            if (stored === 'edit' || stored === 'preview') setModeState(stored);
          } catch {
            // Private browsing or blocked storage: preview is a fine default.
          }
        })
        .catch(() => {
          // Offline or blocked: the site simply stays read-only.
        });
    };

    check();
    window.addEventListener(SESSION_EVENT, check);
    return () => {
      cancelled = true;
      window.removeEventListener(SESSION_EVENT, check);
    };
  }, []);

  const setMode = useCallback((next: EditMode) => {
    setModeState(next);
    try {
      sessionStorage.setItem(MODE_KEY, next);
    } catch {
      // Not worth surfacing; the mode still applies for this page view.
    }
  }, []);

  const setValue = useCallback((path: string, value: string) => {
    if (!originals.current.has(path)) return;
    const original = originals.current.get(path);
    const before = changes.current.size;

    if (value === original) changes.current.delete(path);
    else changes.current.set(path, value);

    const after = changes.current.size;
    if (after !== before) {
      setStatus((s) => ({ ...s, dirty: after, message: null }));
    }
  }, []);

  const registerOriginal = useCallback((path: string, value: string) => {
    originals.current.set(path, value);
  }, []);

  const discard = useCallback(() => {
    changes.current.clear();
    setStatus({ dirty: 0, saving: false, message: null, ok: true });
    router.refresh();
  }, [router]);

  const save = useCallback(() => {
    if (changes.current.size === 0) return;
    const payload = Object.fromEntries(changes.current);
    setStatus((s) => ({ ...s, saving: true, message: null }));

    void saveInlineEdits(payload).then((result) => {
      if (result.ok) {
        changes.current.clear();
        originals.current.clear();
        setStatus({ dirty: 0, saving: false, message: result.message, ok: true });
        router.refresh();
      } else {
        setStatus((s) => ({ ...s, saving: false, message: result.message, ok: false }));
      }
    });
  }, [router]);

  /**
   * Much of the editable copy sits inside links (project rows, contact rows).
   * In edit mode a click should place the caret, not navigate away. Handled
   * once here rather than threading a mode check through every link.
   */
  useEffect(() => {
    if (mode !== 'edit') return;
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
  }, [mode]);

  // Do not let unsaved copy disappear on a stray reload.
  useEffect(() => {
    if (status.dirty === 0) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [status.dirty]);

  // Cmd/Ctrl+S saves, as anyone editing text will try.
  useEffect(() => {
    if (mode !== 'edit') return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        save();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, save]);

  const actions = useMemo<Actions>(
    () => ({ setValue, setMode, save, discard }),
    [setValue, setMode, save, discard],
  );

  const effectiveMode = canEdit ? mode : 'preview';

  return (
    <RegisterContext.Provider value={registerOriginal}>
      <ActionsContext.Provider value={actions}>
        <ModeContext.Provider value={effectiveMode}>
          <StatusContext.Provider value={status}>
            <CanEditContext.Provider value={canEdit}>{children}</CanEditContext.Provider>
          </StatusContext.Provider>
        </ModeContext.Provider>
      </ActionsContext.Provider>
    </RegisterContext.Provider>
  );
}

const RegisterContext = createContext<(path: string, value: string) => void>(() => {});
export const useRegisterOriginal = () => useContext(RegisterContext);

const CanEditContext = createContext(false);
export const useCanEdit = () => useContext(CanEditContext);
