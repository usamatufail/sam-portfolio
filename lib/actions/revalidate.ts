import { revalidatePath, revalidateTag } from 'next/cache';
import { CONTENT_TAG } from '@/lib/queries';

/**
 * Every mutation ends here.
 *
 * Both calls are needed, and this was verified against a production build:
 * `revalidateTag` drops the cached query results, but on its own it does NOT
 * re-render the statically prerendered public routes; they keep serving the
 * old HTML. `revalidatePath('/', 'layout')` re-renders every public route with
 * fresh data. Dropping either one leaves saves invisible on the live site.
 *
 * Deliberately not a `'use server'` module: every export of one of those is a
 * callable endpoint, and this is internal.
 */
export function publish(): void {
  revalidateTag(CONTENT_TAG, 'max');
  revalidatePath('/', 'layout');
}
