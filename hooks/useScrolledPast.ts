'use client';

import { useEffect, useState } from 'react';

/** True once the page is scrolled further than `threshold` pixels. */
export function useScrolledPast(threshold = 8): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      setPast((window.pageYOffset || document.documentElement.scrollTop || 0) > threshold);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return past;
}
