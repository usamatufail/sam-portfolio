/**
 * DOM primitives for the site's scroll reveal and parallax.
 *
 * Kept separate from the hooks that schedule them so the rules here can be read
 * (and changed) without wading through effect lifecycles.
 */

export const REVEAL_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** A node is "below the fold" only once it is past this share of the viewport. */
export const FOLD_RATIO = 0.92;

/** Unconditional backstop: content is never left hidden, whatever else fails. */
export const SAFETY_MS = 1600;

/** Second backstop for nodes an observer never reports. */
export const FALLBACK_MS = 4000;

export const REVEAL_SELECTOR = '[data-anim]';
export const PARALLAX_SELECTOR = '[data-parallax]';

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isBelowFold(node: HTMLElement, viewportHeight: number): boolean {
  return node.getBoundingClientRect().top > viewportHeight * FOLD_RATIO;
}

/** Strips every inline style the reveal applies, leaving the node as authored. */
export function clearReveal(node: HTMLElement): void {
  node.dataset.shown = '1';
  node.style.opacity = '';
  node.style.transform = '';
  node.style.filter = '';
  node.style.willChange = '';
}

/** The pre-reveal state. Only ever applied to nodes below the fold. */
export function hideForReveal(node: HTMLElement): void {
  if (node.dataset.shown) return;
  node.style.opacity = '0';
  node.style.transform = 'translate3d(0, 34px, -60px) scale(0.975)';
  node.style.filter = 'blur(6px)';
  node.style.willChange = 'transform, opacity, filter';
}

/** Transitions a hidden node in, then drops the properties it no longer needs. */
export function revealNode(node: HTMLElement, delay: number): void {
  if (node.dataset.shown) return;
  node.dataset.shown = '1';
  node.style.transition =
    `opacity 0.85s ${REVEAL_EASE} ${delay}s, ` +
    `transform 1.1s ${REVEAL_EASE} ${delay}s, ` +
    `filter 0.85s ${REVEAL_EASE} ${delay}s`;
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
}

/** Offsets each element against its distance from the viewport centre. */
export function applyParallax(elements: HTMLElement[], viewportHeight: number): void {
  for (const element of elements) {
    const speed = Number.parseFloat(element.dataset.parallax ?? '0') || 0;
    const rect = element.getBoundingClientRect();
    const middle = rect.top + rect.height / 2 - viewportHeight / 2;
    element.style.transform = `translate3d(0, ${(-middle * speed).toFixed(2)}px, 0)`;
  }
}
