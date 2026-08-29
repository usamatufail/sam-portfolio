'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Editable } from '@/components/edit/Editable';
import { useScrolledPast } from '@/hooks/useScrolledPast';
import { editPath } from '@/lib/inline/fields';

const NAV = [
  { href: '/work', label: 'work' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
];

export function Header({ wordmark }: { wordmark: string }) {
  const pathname = usePathname();
  const lifted = useScrolledPast();

  return (
    <header
      className="ease-site sticky top-0 z-30 border-b transition-[background-color,backdrop-filter,border-color] duration-[400ms]"
      style={{
        backgroundColor: lifted ? 'oklch(0.145 0.004 250 / 0.72)' : 'oklch(0.145 0.004 250 / 0)',
        backdropFilter: lifted ? 'saturate(1.6) blur(14px)' : 'blur(0px)',
        WebkitBackdropFilter: lifted ? 'saturate(1.6) blur(14px)' : 'blur(0px)',
        borderBottomColor: lifted ? 'oklch(0.29 0.006 250)' : 'oklch(0.145 0.004 250 / 0)',
      }}
    >
      <div className="mx-auto flex w-full max-w-[720px] items-center gap-4 px-5 py-[26px] sm:gap-5 sm:px-[28px]">
        <Link
          href="/"
          className="-my-2 min-w-0 truncate py-2 text-[15px] font-semibold tracking-[-0.01em] transition-opacity duration-300 hover:opacity-60"
        >
          <Editable path={editPath('settings', 1, 'wordmark')} value={wordmark} />
        </Link>
        <div className="flex-1" />
        <nav className="flex flex-none gap-4 font-mono text-[13px] sm:gap-[22px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-accent -my-2 py-2 transition-colors duration-300 ${
                pathname === item.href ? 'text-text' : 'text-muted-2'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
