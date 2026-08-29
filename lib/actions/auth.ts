'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSession, destroySession, isPasscodeCorrect } from '@/lib/auth';
import { str } from '@/lib/parse';
import { fail, type ActionState } from './types';

/**
 * Per-instance throttle. On Vercel each lambda has its own map, so this slows
 * an attacker down rather than stopping them outright, which is enough for a single
 * admin behind a long passcode, and it keeps the surface dependency-free.
 */
const attempts = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

async function clientKey(): Promise<string> {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'local';
}

function throttled(key: string): boolean {
  const now = Date.now();
  const record = attempts.get(key);
  if (!record || now - record.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: now });
    return false;
  }
  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const key = await clientKey();
  if (throttled(key)) {
    return fail('Too many attempts. Wait fifteen minutes and try again.');
  }

  const passcode = str(formData.get('passcode'));
  if (!passcode) return fail('Enter the code.');

  if (!(await isPasscodeCorrect(passcode))) {
    return fail('That code is not right.');
  }

  attempts.delete(key);
  await createSession();

  const next = str(formData.get('next'));
  redirect(next.startsWith('/admin') ? next : '/admin');
}

/**
 * Unlocks inline editing from the command palette: the visitor types the code
 * into the palette's own input, so there is no separate login screen.
 * Shares the throttle above with the /admin login form.
 */
export async function unlockAction(passcode: string): Promise<{ ok: boolean; message: string }> {
  const key = await clientKey();
  if (throttled(key)) {
    return { ok: false, message: 'Too many attempts. Wait fifteen minutes.' };
  }

  const candidate = typeof passcode === 'string' ? passcode.trim() : '';
  if (!candidate || !(await isPasscodeCorrect(candidate))) {
    return { ok: false, message: 'Not recognised.' };
  }

  attempts.delete(key);
  await createSession();
  return { ok: true, message: 'Editing unlocked.' };
}

/** Leaves edit mode and drops the session. */
export async function lockAction(): Promise<void> {
  await destroySession();
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}
