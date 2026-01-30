'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type LenisInstance = {
  raf: (time: number) => void;
  on: (event: string, fn: () => void) => void;
  destroy: () => void;
  scroll: number;
  scrollTo: (value: number) => void;
};

function rafCallback(time: number, lenis: LenisInstance) {
  lenis.raf(time * 1000);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);
  const rafRef = useRef<(time: number) => void | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lenis: LenisInstance | null = null;

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
      }) as LenisInstance;

      lenisRef.current = lenis;

      lenis.on('scroll', () => ScrollTrigger.update());

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && value !== undefined && lenis) {
            lenis.scrollTo(value);
          }
          return lenis?.scroll ?? 0;
        },
      });

      rafRef.current = (time: number) => rafCallback(time, lenis!);
      gsap.ticker.add(rafRef.current);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      if (rafRef.current) gsap.ticker.remove(rafRef.current);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
