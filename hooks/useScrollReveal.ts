'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  clearReveal,
  FALLBACK_MS,
  hideForReveal,
  isBelowFold,
  prefersReducedMotion,
  REVEAL_SELECTOR,
  revealNode,
  SAFETY_MS,
} from '@/lib/animation/reveal';

/**
 * Reveals `[data-anim]` nodes as they scroll into view, re-running per route.
 *
 * The rule that matters: elements already inside the viewport on load are never
 * hidden. Only below-the-fold nodes get the hidden styles, that happens from JS
 * after first paint, and a timeout clears everything regardless of what the
 * observer does. An earlier build shipped a blank first paint by getting this
 * wrong, so keep all three guarantees if you change this.
 */
export function useScrollReveal(): void {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const revealAll = () => nodes.forEach(clearReveal);

    const safety = window.setTimeout(revealAll, SAFETY_MS);
    const viewportHeight = window.innerHeight || 0;

    if (prefersReducedMotion() || nodes.length === 0 || viewportHeight === 0) {
      revealAll();
      return () => window.clearTimeout(safety);
    }

    const waiting = nodes.filter((node) => isBelowFold(node, viewportHeight));
    waiting.forEach(hideForReveal);
    for (const node of nodes) {
      if (!isBelowFold(node, viewportHeight)) node.dataset.shown = '1';
    }

    let observer: IntersectionObserver | undefined;
    if (waiting.length > 0 && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry, index) => {
              revealNode(entry.target as HTMLElement, Math.min(index * 0.06, 0.24));
              observer?.unobserve(entry.target);
            });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0 },
      );
      for (const node of waiting) observer.observe(node);
    } else {
      for (const node of waiting) revealNode(node, 0);
    }

    const onScroll = () => {
      for (const node of waiting) {
        if (!node.dataset.shown && !isBelowFold(node, viewportHeight)) revealNode(node, 0);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const fallback = window.setTimeout(() => {
      for (const node of waiting) revealNode(node, 0);
    }, FALLBACK_MS);

    return () => {
      window.clearTimeout(safety);
      window.clearTimeout(fallback);
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
    // `pathname` is not read here; it is what makes the pass re-run per route.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [pathname]);
}
