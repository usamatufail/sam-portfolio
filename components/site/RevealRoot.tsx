'use client';

import { useParallax } from '@/hooks/useParallax';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/** Mount point for the site's scroll motion. Renders nothing itself. */
export function RevealRoot() {
  useScrollReveal();
  useParallax();
  return null;
}
