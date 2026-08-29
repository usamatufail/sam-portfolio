'use client';

import { useEffect, type RefObject } from 'react';

const ROOT_FLAG = 'data-editor-active';
const OFFSET_VAR = '--editor-offset';

/**
 * Pushes the document down by the height of the floating editor bar.
 *
 * The bar is fixed above a sticky header, so without this it covers the nav.
 * Measured rather than hard-coded because the bar wraps to two rows on narrow
 * screens; the matching CSS lives in globals.css under `[data-editor-active]`.
 */
export function useEditorOffset(ref: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    const root = document.documentElement;

    const clear = () => {
      root.removeAttribute(ROOT_FLAG);
      root.style.removeProperty(OFFSET_VAR);
    };

    if (!active) {
      clear();
      return;
    }

    root.setAttribute(ROOT_FLAG, '');
    const element = ref.current;
    if (!element) return clear;

    const apply = () => {
      const height = Math.ceil(element.getBoundingClientRect().height) + 24;
      root.style.setProperty(OFFSET_VAR, `${height}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(element);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [ref, active]);
}
