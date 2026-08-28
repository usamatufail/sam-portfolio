import { jwtVerify, SignJWT } from 'jose';

export const SESSION_COOKIE = 'sam_admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const ISSUER = 'sam-portfolio';
const AUDIENCE = 'admin';

function secretKey(): Uint8Array {
  const raw = process.env.SESSION_SECRET;
  if (!raw || raw.length < 32) {
    throw new Error(
      'SESSION_SECRET is missing or shorter than 32 characters. Generate one with `openssl rand -base64 48`.',
    );
  }
  return new TextEncoder().encode(raw);
}

export async function signSessionToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

/** Edge-safe: takes a raw token rather than reading cookies. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ['HS256'],
    });
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
