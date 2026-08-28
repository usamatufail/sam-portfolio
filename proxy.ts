import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

/**
 * Fast redirect for admin page loads. This is a convenience layer only —
 * `requireAdmin()` inside each admin page and server action is what actually
 * enforces access.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === '/admin/login';
  const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  if (!authed && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = pathname === '/admin' ? '' : `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  if (authed && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
