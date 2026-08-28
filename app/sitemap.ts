import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/work`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
