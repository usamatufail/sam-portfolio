'use client';

import { useMemo } from 'react';
import { useEditLinkGuard } from '@/hooks/useEditLinkGuard';
import { useEditSession } from '@/hooks/useEditSession';
import { useHotkey } from '@/hooks/useHotkey';
import { useInlineEditor } from '@/hooks/useInlineEditor';
import { useUnsavedWarning } from '@/hooks/useUnsavedWarning';
import {
  ActionsContext,
  CanEditContext,
  ModeContext,
  RegisterContext,
  StatusContext,
  type EditActions,
} from './context';

/** Wires the editing hooks together and publishes them through context. */
export function EditProvider({ children }: { children: React.ReactNode }) {
  const { canEdit, mode, setMode } = useEditSession();
  const { status, register, setValue, save, discard } = useInlineEditor();

  const editing = mode === 'edit';
  useEditLinkGuard(editing);
  useUnsavedWarning(status.dirty > 0);
  // Anyone editing text will reach for this.
  useHotkey('s', save, { active: editing });

  const actions = useMemo<EditActions>(
    () => ({ setValue, setMode, save, discard }),
    [setValue, setMode, save, discard],
  );

  return (
    <RegisterContext.Provider value={register}>
      <ActionsContext.Provider value={actions}>
        <ModeContext.Provider value={mode}>
          <StatusContext.Provider value={status}>
            <CanEditContext.Provider value={canEdit}>{children}</CanEditContext.Provider>
          </StatusContext.Provider>
        </ModeContext.Provider>
      </ActionsContext.Provider>
    </RegisterContext.Provider>
  );
}
