'use client';

import { createContext, useContext } from 'react';
import { IDLE_STATUS, type EditMode, type EditStatus } from '@/lib/edit/types';

/**
 * Four contexts rather than one, deliberately.
 *
 * Editable nodes are contentEditable, and a React re-render while someone is
 * typing moves the caret. Splitting by change frequency means a keystroke
 * updating the dirty count re-renders only the toolbar, never the node being
 * typed into.
 */
export const ModeContext = createContext<EditMode>('preview');
export const CanEditContext = createContext(false);
export const StatusContext = createContext<EditStatus>(IDLE_STATUS);

export type EditActions = {
  setValue: (path: string, value: string) => void;
  setMode: (mode: EditMode) => void;
  save: () => void;
  discard: () => void;
};
export const ActionsContext = createContext<EditActions | null>(null);

export const RegisterContext = createContext<(path: string, value: string) => void>(() => {});

export const useEditMode = () => useContext(ModeContext);
export const useCanEdit = () => useContext(CanEditContext);
export const useEditStatus = () => useContext(StatusContext);
export const useRegisterOriginal = () => useContext(RegisterContext);

export function useEditActions(): EditActions {
  const value = useContext(ActionsContext);
  if (!value) throw new Error('useEditActions must be used inside EditProvider');
  return value;
}
