import { count } from 'drizzle-orm';
import Link from 'next/link';
import { db } from '@/db';
import { commands, education, experience, principles, projects } from '@/db/schema';

export const dynamic = 'force-dynamic';

const CARDS = [
  {
    href: '/admin/settings',
    title: 'Site settings',
    body: 'Hero copy, contact links, page headings, footer and SEO metadata.',
  },
  {
    href: '/admin/projects',
    title: 'Projects',
    body: 'The home list and the /work case studies. Add, edit, reorder, unpublish.',
  },
  { href: '/admin/experience', title: 'Experience', body: 'The About page timeline.' },
  {
    href: '/admin/principles',
    title: 'How I work',
    body: 'The five lead-phrase paragraphs on About.',
  },
  { href: '/admin/education', title: 'Education', body: 'Degrees and certifications.' },
  {
    href: '/admin/commands',
    title: 'Command palette',
    body: 'Every ⌘K row, including the answer views.',
  },
];

export default async function AdminHome() {
  const [[p], [e], [pr], [ed], [c]] = await Promise.all([
    db.select({ value: count() }).from(projects),
    db.select({ value: count() }).from(experience),
    db.select({ value: count() }).from(principles),
    db.select({ value: count() }).from(education),
    db.select({ value: count() }).from(commands),
  ]);

  const counts: Record<string, number> = {
    '/admin/projects': p.value,
    '/admin/experience': e.value,
    '/admin/principles': pr.value,
    '/admin/education': ed.value,
    '/admin/commands': c.value,
  };

  return (
    <>
      <h1 className="m-0 text-[24px] font-semibold tracking-[-0.02em]">Dashboard</h1>
      <p className="text-text-5 mt-2 mb-8 max-w-[64ch] text-[15px] leading-[1.7]">
        Everything on the public site is editable here. Saving revalidates the cached pages
        immediately, so changes are live on the next request.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group border-rule bg-panel hover:border-accent-50 rounded-2xl border p-5 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[16px] font-semibold">{card.title}</span>
              {counts[card.href] !== undefined && (
                <span className="text-muted font-mono text-[12px]">{counts[card.href]}</span>
              )}
            </div>
            <p className="text-text-5 mt-2 mb-0 text-[14px] leading-[1.6]">{card.body}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
