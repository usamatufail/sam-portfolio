import type { Settings } from '@/db/schema';

/**
 * The schema.org Person block for the home page.
 *
 * Pure and separate from the page so the structured data can be reasoned about
 * (and changed) without touching layout, and so it stays in step with the same
 * settings row the visible copy uses.
 */
export function buildPersonSchema(settings: Settings, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.fullName,
    alternateName: 'Sam Tufail',
    jobTitle: settings.jobTitle,
    description: settings.seoDescription,
    url: siteUrl,
    image: `${siteUrl}${settings.avatarUrl}`,
    email: `mailto:${settings.email}`,
    sameAs: [settings.linkedinUrl, settings.githubUrl, settings.resumeUrl],
    knowsAbout: settings.seoKeywords.split(',').map((keyword) => keyword.trim()),
  };
}
