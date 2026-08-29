import 'server-only';

import { timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, SESSION_MAX_AGE, signSessionToken, verifySessionToken } from './session';

/**
 * Compares two secrets without leaking length or content through timing.
 * Both sides are hashed to a fixed width first so `timingSafeEqual` never
 * throws on a length mismatch.
 */
async function secretsMatch(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b)),
  ]);
  return timingSafeEqual(Buffer.from(ha), Buffer.from(hb));
}

export async function isPasscodeCorrect(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    throw new Error('ADMIN_PASSCODE is not set. Add it to .env.local.');
  }
  return secretsMatch(candidate, expected);
}

export async function createSession(): Promise<void> {
  const token = await signSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

/**
 * The real access check. `proxy.ts` gives a fast redirect for page loads, but
 * every admin page and every server action calls this too, because a proxy check
 * alone is not an authorisation boundary.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }
}
