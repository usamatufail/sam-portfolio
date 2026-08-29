'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { announceSessionChange, rememberEditMode } from '@/lib/edit/session';
import { unlockAction } from '@/lib/actions/auth';
import { filterCommands, type PaletteCommand, type PaletteView } from '@/lib/commands';

/**
 * All palette behaviour: open state, filtering, selection, running a command,
 * and the code-entry path into inline editing. The component that uses this
 * only renders.
 */
export function useCommandPalette(commands: PaletteCommand[], email: string) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<PaletteView>({ mode: 'list' });
  const [selected, setSelected] = useState(0);
  const [unlockNote, setUnlockNote] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setQuery('');
    setView({ mode: 'list' });
    setSelected(0);
    setUnlockNote(null);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset]);

  const backToList = useCallback(() => {
    setView({ mode: 'list' });
    setQuery('');
    setSelected(0);
  }, []);

  const filtered = useMemo(() => filterCommands(commands, query), [commands, query]);

  /**
   * The palette doubles as the way in to inline editing: when a query matches
   * no command, Enter tries it as the edit code. Only ever sent on Enter, never
   * per keystroke, and the server throttles attempts.
   */
  const tryUnlock = useCallback(
    async (candidate: string) => {
      setUnlockNote('checking…');
      const result = await unlockAction(candidate);
      if (!result.ok) {
        setUnlockNote(result.message);
        return;
      }
      rememberEditMode('edit');
      close();
      announceSessionChange();
      router.refresh();
    },
    [close, router],
  );

  const run = useCallback(
    (command: PaletteCommand) => {
      switch (command.kind) {
        case 'route':
          close();
          router.push(command.value ?? '/');
          break;
        case 'external':
          close();
          window.open(command.value ?? '', '_blank', 'noreferrer');
          break;
        case 'mailto':
          close();
          window.location.href = `mailto:${email}`;
          break;
        case 'copyEmail':
          void navigator.clipboard?.writeText(email).catch(() => {});
          setQuery('');
          setView({
            mode: 'answer',
            title: 'Copied',
            lines: [`${email} is on your clipboard. I reply within a day.`],
          });
          break;
        case 'answer':
          setQuery('');
          setView({
            mode: 'answer',
            title: command.answerTitle ?? command.label,
            lines: command.answerLines,
          });
          break;
      }
    },
    [close, email, router],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === 'k') {
        event.preventDefault();
        setOpen((wasOpen) => !wasOpen);
        reset();
        return;
      }

      if (!open) {
        // "/" is a shortcut only when the visitor is not already typing.
        if (key === '/') {
          const tag = (event.target as HTMLElement | null)?.tagName;
          if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
            event.preventDefault();
            setOpen(true);
          }
        }
        return;
      }

      if (key === 'escape') {
        event.preventDefault();
        close();
        return;
      }

      if (view.mode !== 'list') {
        if (key === 'enter' || key === 'backspace') {
          event.preventDefault();
          backToList();
        }
        return;
      }

      if (key === 'arrowdown') {
        event.preventDefault();
        setSelected((i) => Math.min(i + 1, filtered.length - 1));
      } else if (key === 'arrowup') {
        event.preventDefault();
        setSelected((i) => Math.max(i - 1, 0));
      } else if (key === 'enter') {
        event.preventDefault();
        const command = filtered[selected] ?? filtered[0];
        if (command) run(command);
        else if (query.trim()) void tryUnlock(query.trim());
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, view.mode, filtered, selected, query, reset, close, backToList, run, tryUnlock]);

  useEffect(() => {
    if (open && view.mode === 'list') {
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [open, view.mode]);

  const onQueryChange = useCallback((value: string) => {
    setQuery(value);
    setSelected(0);
    setUnlockNote(null);
  }, []);

  return {
    open,
    query,
    view,
    filtered,
    unlockNote,
    inputRef,
    activeIndex: Math.min(selected, Math.max(filtered.length - 1, 0)),
    openPalette: () => setOpen(true),
    close,
    backToList,
    run,
    onQueryChange,
    highlight: setSelected,
  };
}
