'use client';

import { usePathname } from 'next/navigation';

/** Keyed on the route so `main` replays its fade on every navigation. */
export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main
      key={pathname}
      className="animate-site-fade mx-auto w-full max-w-[720px] flex-1 px-[28px]"
      style={{ perspective: '1400px', perspectiveOrigin: '50% 30%' }}
    >
      {children}
    </main>
  );
}
