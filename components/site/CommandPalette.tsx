'use client';

import { useCommandPalette } from '@/hooks/useCommandPalette';
import type { PaletteCommand } from '@/lib/commands';
import { PaletteTrigger } from './PaletteTrigger';

/** Presentation only. Everything it does lives in `useCommandPalette`. */
export function CommandPalette({
  commands,
  email,
  placeholder,
}: {
  commands: PaletteCommand[];
  email: string;
  placeholder: string;
}) {
  const {
    open,
    query,
    view,
    filtered,
    unlockNote,
    inputRef,
    activeIndex,
    openPalette,
    close,
    backToList,
    run,
    onQueryChange,
    highlight,
  } = useCommandPalette(commands, email);

  return (
    <>
      <PaletteTrigger onOpen={openPalette} />

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
                onChange={(event) => onQueryChange(event.target.value)}
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
                    onMouseEnter={() => highlight(index)}
                    className={`hover:bg-panel-hover flex w-full cursor-pointer items-center gap-3.5 rounded-[9px] px-3 py-[11px] text-left transition-colors duration-200 ${
                      index === activeIndex ? 'bg-panel-hover' : 'bg-transparent'
                    }`}
                  >
                    <span className="min-w-0 flex-1 text-[15.5px]">{command.label}</span>
                    <span className="text-muted-2 font-mono text-[11.5px]">{command.hint}</span>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <div className="text-muted px-3 py-[11px] text-[15.5px]">
                    {unlockNote ?? 'No matches.'}
                  </div>
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
