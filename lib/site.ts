/** Canonical origin for metadata, sitemap and robots. */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  // Vercel sets this on preview and production deployments.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return 'http://localhost:3000';
}

export function whatsappUrl(phone: string): string {
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
}
