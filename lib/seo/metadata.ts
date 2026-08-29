import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';

/** Google truncates SERP snippets around here. */
export const META_DESCRIPTION_MAX = 155;

/** The social card, served by app/opengraph-image.jpg. */
const SOCIAL_IMAGE = '/opengraph-image.jpg';

/** Trims at a word boundary so a snippet never cuts mid-word. */
export function truncateForMeta(text: string, max = META_DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${trimmed.replace(/[,.;:\s]+$/, '')}…`;
}

/**
 * Metadata for a sub-page.
 *
 * Next merges metadata shallowly, so a page that returns its own `openGraph`
 * replaces the root's completely: without spelling out `url` and `images` here,
 * these pages ship with no social card at all. That is exactly the bug this
 * helper exists to prevent recurring.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  siteName,
}: {
  title: string;
  description: string;
  path: string;
  siteName: string;
}): Metadata {
  const summary = truncateForMeta(description);

  return {
    title,
    description: summary,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: `${title} · ${siteName}`,
      description: summary,
      url: `${siteUrl()}${path}`,
      siteName,
      locale: 'en_US',
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${siteName}`,
      description: summary,
      images: [SOCIAL_IMAGE],
    },
  };
}
