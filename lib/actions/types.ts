export type ActionState = { ok: boolean; message: string } | null;

export function ok(message: string): ActionState {
  return { ok: true, message };
}

export function fail(message: string): ActionState {
  return { ok: false, message };
}
