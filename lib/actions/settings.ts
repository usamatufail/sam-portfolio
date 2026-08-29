'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { AVAILABILITY_STATES, settings } from '@/db/schema';
import { requireAdmin } from '@/lib/auth';
import { bool, str } from '@/lib/parse';
import { publish } from './revalidate';
import { fail, ok, type ActionState } from './types';

export async function saveSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const email = str(formData.get('email'));
  if (!email.includes('@')) return fail('That email address does not look right.');

  const rawState = str(formData.get('availabilityState'));
  const availabilityState = AVAILABILITY_STATES.find((candidate) => candidate === rawState);
  if (!availabilityState) return fail('Pick an availability state.');

  /*
   * Only the fields this form actually renders.
   *
   * Everything visible on the page is edited inline now and is deliberately
   * absent from this form. Writing those columns here would read '' from the
   * missing inputs and wipe the copy, so they must stay out of this object.
   */
  try {
    await db
      .update(settings)
      .set({
        fullName: str(formData.get('fullName')),
        jobTitle: str(formData.get('jobTitle')),
        avatarUrl: str(formData.get('avatarUrl')),
        avatarAlt: str(formData.get('avatarAlt')),

        email,
        phone: str(formData.get('phone')),
        linkedinUrl: str(formData.get('linkedinUrl')),
        githubUrl: str(formData.get('githubUrl')),
        resumeUrl: str(formData.get('resumeUrl')),
        palettePlaceholder: str(formData.get('palettePlaceholder')),

        badgeEnabled: bool(formData.get('badgeEnabled')),
        badgeCtaUrl: str(formData.get('badgeCtaUrl')),

        availabilityState,
        availabilityAvailable: str(formData.get('availabilityAvailable')),
        availabilityLimited: str(formData.get('availabilityLimited')),
        availabilityUnavailable: str(formData.get('availabilityUnavailable')),

        seoTitle: str(formData.get('seoTitle')),
        seoDescription: str(formData.get('seoDescription')),
        seoKeywords: str(formData.get('seoKeywords')),
        ogTitle: str(formData.get('ogTitle')),
        ogDescription: str(formData.get('ogDescription')),

        updatedAt: new Date(),
      })
      .where(eq(settings.id, 1));
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Could not save.');
  }

  publish();
  return ok('Saved. The live site is updated.');
}
