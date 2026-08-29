'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { applyParallax, PARALLAX_SELECTOR, prefersReducedMotion } from '@/lib/animation/reveal';

/** Drives `[data-parallax]` elements from scroll position, one rAF per frame. */
export function useParallax(): void {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR));
    if (elements.length === 0) return;

    let raf = 0;
    const frame = () => {
      raf = 0;
      applyParallax(elements, window.innerHeight || 0);
    };
    const request = () => {
      if (!raf) raf = window.requestAnimationFrame(frame);
    };

    frame();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    return () => {
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      if (raf) window.cancelAnimationFrame(raf);
    };
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [pathname]);
}
