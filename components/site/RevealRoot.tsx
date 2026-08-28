'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/**
 * Scroll reveal + avatar parallax, ported from the design prototype.
 *
 * The one rule that matters: elements already inside the viewport on load are
 * never hidden. Only below-the-fold nodes get the hidden styles, they are
 * applied from JS after first paint, and an unconditional 1.6s timeout clears
 * everything no matter what the observer does. An earlier build shipped a blank
 * first paint by getting this wrong.
 */
export function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-anim]'));
    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

    const revealAll = () => {
      for (const node of nodes) {
        node.dataset.shown = '1';
        node.style.opacity = '';
        node.style.transform = '';
        node.style.filter = '';
        node.style.willChange = '';
      }
    };

    // Unconditional safety net — content is never left hidden.
    const safety = window.setTimeout(revealAll, 1600);

    let raf = 0;
    const frame = () => {
      raf = 0;
      const viewportHeight = window.innerHeight || 0;
      for (const el of parallax) {
        const speed = Number.parseFloat(el.dataset.parallax ?? '0') || 0;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2 - viewportHeight / 2;
        el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(2)}px, 0)`;
      }
    };
    const requestFrame = () => {
      if (!raf) raf = window.requestAnimationFrame(frame);
    };

    if (!reduced && parallax.length > 0) {
      window.addEventListener('scroll', requestFrame, { passive: true });
      window.addEventListener('resize', requestFrame, { passive: true });
      frame();
    }

    const viewportHeight = window.innerHeight || 0;
    if (reduced || nodes.length === 0 || viewportHeight === 0) {
      revealAll();
      return () => {
        window.clearTimeout(safety);
        window.removeEventListener('scroll', requestFrame);
        window.removeEventListener('resize', requestFrame);
        if (raf) window.cancelAnimationFrame(raf);
      };
    }

    const enter = (node: HTMLElement, delay: number) => {
      if (node.dataset.shown) return;
      node.dataset.shown = '1';
      node.style.transition =
        `opacity 0.85s ${EASE} ${delay}s, ` +
        `transform 1.1s ${EASE} ${delay}s, ` +
        `filter 0.85s ${EASE} ${delay}s`;
      node.style.opacity = '1';
      node.style.transform = 'none';
      node.style.filter = 'none';
      window.setTimeout(
        () => {
          node.style.willChange = 'auto';
          node.style.transition = '';
        },
        (delay + 1.3) * 1000,
      );
    };

    const belowFold = (node: HTMLElement) => node.getBoundingClientRect().top > viewportHeight * 0.92;

    const waiting = nodes.filter(belowFold);
    for (const node of waiting) {
      if (node.dataset.shown) continue;
      node.style.opacity = '0';
      node.style.transform = 'translate3d(0, 34px, -60px) scale(0.975)';
      node.style.filter = 'blur(6px)';
      node.style.willChange = 'transform, opacity, filter';
    }
    for (const node of nodes) {
      if (!belowFold(node)) node.dataset.shown = '1';
    }

    let observer: IntersectionObserver | undefined;
    if (waiting.length > 0 && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries
            .filter((e) => e.isIntersecting)
            .forEach((e, index) => {
              enter(e.target as HTMLElement, Math.min(index * 0.06, 0.24));
              observer?.unobserve(e.target);
            });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0 },
      );
      for (const node of waiting) observer.observe(node);
    } else {
      for (const node of waiting) enter(node, 0);
    }

    const onScrollReveal = () => {
      for (const node of waiting) {
        if (!node.dataset.shown && !belowFold(node)) enter(node, 0);
      }
    };
    window.addEventListener('scroll', onScrollReveal, { passive: true });
    const fallback = window.setTimeout(() => {
      for (const node of waiting) enter(node, 0);
    }, 4000);

    return () => {
      window.clearTimeout(safety);
      window.clearTimeout(fallback);
      window.removeEventListener('scroll', onScrollReveal);
      window.removeEventListener('scroll', requestFrame);
      window.removeEventListener('resize', requestFrame);
      if (raf) window.cancelAnimationFrame(raf);
      observer?.disconnect();
    };
    // `pathname` is not read inside the effect; it is the dependency that makes
    // the whole reveal pass re-run on every route change.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [pathname]);

  return null;
}
