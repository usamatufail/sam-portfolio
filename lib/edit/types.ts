export type EditMode = 'preview' | 'edit';

/** What the toolbar shows about pending work. */
export type EditStatus = {
  dirty: number;
  saving: boolean;
  message: string | null;
  ok: boolean;
};

export const IDLE_STATUS: EditStatus = { dirty: 0, saving: false, message: null, ok: true };
