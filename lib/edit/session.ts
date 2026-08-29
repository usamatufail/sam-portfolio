import type { EditMode } from './types';

/** Where the chosen mode is remembered for the tab. */
const MODE_KEY = 'sam-edit-mode';

/** Fired when the edit session is gained or dropped, so listeners re-check. */
export const SESSION_EVENT = 'sam:edit-session-changed';

export const EDIT_SESSION_ENDPOINT = '/api/edit-session';

/**
 * Unlocking happens in the command palette while the provider stays mounted, so
 * `router.refresh()` alone never makes it re-read the cookie. This is how the
 * two are told to look again.
 */
export function announceSessionChange(): void {
  window.dispatchEvent(new Event(SESSION_EVENT));
}

/** Storage can throw outright in private mode, so both sides are guarded. */
export function rememberEditMode(mode: EditMode): void {
  try {
    sessionStorage.setItem(MODE_KEY, mode);
  } catch {
    // The mode still applies to this page view; it just will not persist.
  }
}

export function readEditMode(): EditMode | null {
  try {
    const stored = sessionStorage.getItem(MODE_KEY);
    return stored === 'edit' || stored === 'preview' ? stored : null;
  } catch {
    return null;
  }
}

/** Asks the server whether this visitor currently holds an edit session. */
export async function fetchCanEdit(): Promise<boolean> {
  try {
    const response = await fetch(EDIT_SESSION_ENDPOINT, { cache: 'no-store' });
    if (!response.ok) return false;
    const data = (await response.json()) as { canEdit?: boolean };
    return Boolean(data.canEdit);
  } catch {
    // Offline or blocked: the site stays read-only.
    return false;
  }
}
