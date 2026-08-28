import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Manrope } from 'next/font/google';
import './globals.css';
import { getSettings } from '@/lib/queries';
import { siteUrl } from '@/lib/site';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0b0c0f',
  colorScheme: 'dark',
};

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();

  return {
    metadataBase: new URL(siteUrl()),
    title: { default: s.seoTitle, template: `%s · ${s.fullName}` },
    description: s.seoDescription,
    keywords: s.seoKeywords.split(',').map((k) => k.trim()),
    authors: [{ name: s.fullName, url: siteUrl() }],
    creator: s.fullName,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      title: s.ogTitle,
      description: s.ogDescription,
      url: siteUrl(),
      siteName: s.fullName,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: s.ogTitle,
      description: s.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
