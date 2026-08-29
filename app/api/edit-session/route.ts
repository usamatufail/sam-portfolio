import { isAuthenticated } from '@/lib/auth';

/**
 * Whether this visitor may edit inline.
 *
 * This exists as a route handler rather than a check in the site layout on
 * purpose: reading cookies in the layout would opt every public page out of
 * static prerendering, which is what the SEO depends on. The pages stay static
 * for everyone, and the editor bootstraps itself after hydration.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(
    { canEdit: await isAuthenticated() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
