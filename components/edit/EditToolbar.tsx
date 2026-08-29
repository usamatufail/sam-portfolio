'use client';

import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
import { lockAction } from '@/lib/actions/auth';
import { useEditorOffset } from '@/hooks/useEditorOffset';
import { announceSessionChange } from '@/lib/edit/session';
import { useCanEdit, useEditActions, useEditMode, useEditStatus } from './context';

function PencilIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function segment(active: boolean) {
  return `inline-flex cursor-pointer items-center gap-1.5 min-h-9 rounded-full px-3 py-2 font-mono text-[12px] transition-colors ${
    active ? 'bg-accent text-bg' : 'text-text-5 hover:text-text'
  }`;
}

export function EditToolbar() {
  const canEdit = useCanEdit();
  const mode = useEditMode();
  const { dirty, saving, message, ok } = useEditStatus();
  const { setMode, save, discard } = useEditActions();
  const router = useRouter();
  const [locking, startLock] = useTransition();
  const barRef = useRef<HTMLDivElement>(null);

  useEditorOffset(barRef, canEdit);

  if (!canEdit) return null;

  return (
    <div
      data-editor-ui=""
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div
        ref={barRef}
        className="border-rule-strong bg-panel/95 pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border px-2 py-2 backdrop-blur"
        style={{ boxShadow: '0 18px 40px -20px rgba(0,0,0,0.9)' }}
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMode('edit')}
            className={segment(mode === 'edit')}
          >
            <PencilIcon />
            edit
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={segment(mode === 'preview')}
          >
            <EyeIcon />
            preview
          </button>
        </div>

        <span className="bg-rule mx-1 h-5 w-px flex-none" aria-hidden="true" />

        <button
          type="button"
          onClick={save}
          disabled={dirty === 0 || saving}
          className="bg-accent text-bg min-h-9 cursor-pointer rounded-full px-3.5 py-2 font-mono text-[12px] font-semibold transition-opacity hover:opacity-85 disabled:cursor-default disabled:opacity-35"
        >
          {saving ? 'saving…' : dirty > 0 ? `save ${dirty}` : 'saved'}
        </button>

        {dirty > 0 && !saving && (
          <button
            type="button"
            onClick={discard}
            className="text-text-5 hover:text-text min-h-9 cursor-pointer rounded-full px-2.5 py-2 font-mono text-[12px] transition-colors"
          >
            discard
          </button>
        )}

        <button
          type="button"
          disabled={locking}
          onClick={() =>
            startLock(async () => {
              await lockAction();
              announceSessionChange();
              router.refresh();
            })
          }
          title="Leave edit mode"
          className="text-muted hover:text-accent min-h-9 cursor-pointer rounded-full px-2.5 py-2 font-mono text-[12px] transition-colors disabled:opacity-50"
        >
          lock
        </button>

        {message && (
          <span
            role="status"
            className={`px-2 font-mono text-[12px] ${ok ? 'text-accent' : 'text-[oklch(0.72_0.19_25)]'}`}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
