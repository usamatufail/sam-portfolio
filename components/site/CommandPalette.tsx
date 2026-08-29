'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CommandKind } from '@/db/schema';

export type PaletteCommand = {
  id: number;
  key: string;
  label: string;
  hint: string;
  kind: CommandKind;
  value: string | null;
  answerTitle: string | null;
  answerLines: string[];
};

type View = { mode: 'list' } | { mode: 'answer'; title: string; lines: string[] };

export function CommandPalette({
  commands,
  email,
  placeholder,
}: {
  commands: PaletteCommand[];
  email: string;
  placeholder: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<View>({ mode: 'list' });
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setView({ mode: 'list' });
    setSelected(0);
  }, []);

  const backToList = useCallback(() => {
    setView({ mode: 'list' });
    setQuery('');
    setSelected(0);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.key} ${c.hint}`.toLowerCase().includes(q));
  }, [commands, query]);

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
        setQuery('');
        setView({ mode: 'list' });
        setSelected(0);
        return;
      }

      if (!open) {
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
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, view.mode, filtered, selected, close, backToList, run]);

  useEffect(() => {
    if (open && view.mode === 'list') {
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [open, view.mode]);

  const activeIndex = Math.min(selected, Math.max(filtered.length - 1, 0));

  return (
    <>
      <div className="mx-auto mt-[-22px] w-full max-w-[720px] px-[28px] pb-[34px]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open command palette"
          className="text-faint hover:text-accent -m-3 inline-flex min-h-11 min-w-11 cursor-pointer appearance-none items-center border-none bg-transparent p-3 font-mono text-[11.5px] transition-colors duration-300"
        >
          ⌘K
        </button>
      </div>

      {open && (
        <div
          className="animate-overlay-fade fixed inset-0 z-[60] flex items-start justify-center px-5 pt-[11vh] pb-5"
          style={{ background: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(8px)' }}
        >
          {/* A real button, so closing by backdrop is reachable by keyboard too
              (Esc closes as well, via the global handler). */}
          <button
            type="button"
            aria-label="Close command palette"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default appearance-none border-none bg-transparent"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="border-rule-strong bg-panel relative w-full max-w-[560px] overflow-hidden rounded-2xl border"
            style={{ boxShadow: '0 40px 90px -34px rgba(0, 0, 0, 0.9)' }}
          >
            <div className="border-panel-rule flex items-center gap-2.5 border-b px-[18px] py-[15px]">
              <span className="text-accent font-mono text-sm">›</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                placeholder={placeholder}
                className="text-text placeholder:text-muted-2 min-w-0 flex-1 border-none bg-transparent text-base outline-none"
              />
              <button
                type="button"
                onClick={close}
                className="border-rule text-muted-2 cursor-pointer rounded-[5px] border px-1.5 py-[3px] font-mono text-[11px]"
              >
                esc
              </button>
            </div>

            {view.mode === 'list' ? (
              <div className="max-h-[54vh] overflow-auto p-2">
                {filtered.map((command, index) => (
                  <button
                    key={command.id}
                    type="button"
                    onClick={() => run(command)}
                    onMouseEnter={() => setSelected(index)}
                    className={`hover:bg-panel-hover flex w-full cursor-pointer items-center gap-3.5 rounded-[9px] px-3 py-[11px] text-left transition-colors duration-200 ${
                      index === activeIndex ? 'bg-panel-hover' : 'bg-transparent'
                    }`}
                  >
                    <span className="min-w-0 flex-1 text-[15.5px]">{command.label}</span>
                    <span className="text-muted-2 font-mono text-[11.5px]">{command.hint}</span>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="text-muted px-3 py-[11px] text-[15.5px]">No matches.</div>
                )}
              </div>
            ) : (
              <div className="px-6 pt-[22px] pb-[18px]">
                <div className="text-muted mb-3.5 font-mono text-xs">{view.title}</div>
                {view.lines.map((line, index) => (
                  <p key={index} className="text-text-2 mb-3 text-base leading-[1.7] last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            )}

            {view.mode !== 'list' && (
              <div className="border-panel-rule text-muted-2 flex items-center justify-between gap-3 border-t px-[18px] py-[13px] font-mono text-xs">
                <button type="button" onClick={backToList} className="text-accent cursor-pointer">
                  ← all commands
                </button>
                <span>{email}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
