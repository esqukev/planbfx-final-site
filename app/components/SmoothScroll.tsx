'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollProvider } from '../context/ScrollContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type LenisInstance = {
  raf: (time: number) => void;
  on: (event: string, fn: () => void) => void;
  destroy: () => void;
  scroll: number;
  scrollTo: (value: number, options?: { immediate?: boolean; duration?: number }) => void;
  resize?: () => void;
};

function rafCallback(time: number, lenis: LenisInstance) {
  lenis.raf(time * 1000);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);
  const rafRef = useRef<(time: number) => void | null>(null);
  const pathname = usePathname();

  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

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

  // Al cargar o cambiar de ruta: scroll a top (excepto cuando hay #contact-form)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (hash === '#contact-form') return;

    window.history.scrollRestoration = 'manual';

    const doScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    };

    doScroll();

    const t1 = setTimeout(doScroll, 50);
    const t2 = setTimeout(doScroll, 150);
    const t3 = setTimeout(() => {
      doScroll();
      if (lenisRef.current?.resize) lenisRef.current.resize();
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return (
    <ScrollProvider scrollToTop={scrollToTop}>
      {children}
    </ScrollProvider>
  );
}
