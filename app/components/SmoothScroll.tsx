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
  off?: (event: string, fn: () => void) => void;
  destroy: () => void;
  scroll: number;
  scrollTo: (value: number, options?: { immediate?: boolean; duration?: number }) => void;
  resize?: () => void;
};

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisInstance | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
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
    let rafId = 0;
    let onLenisScroll: (() => void) | null = null;

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
      }) as LenisInstance;

      lenisRef.current = lenis;

      onLenisScroll = () => ScrollTrigger.update();
      lenis.on('scroll', onLenisScroll);

      const resizeLenis = () => {
        if (lenis?.resize) lenis.resize();
        ScrollTrigger.refresh();
      };

      const ro = new ResizeObserver(() => resizeLenis());
      ro.observe(document.body);

      const onFormErrors = () => {
        requestAnimationFrame(() => {
          resizeLenis();
          requestAnimationFrame(resizeLenis);
        });
      };
      window.addEventListener('contact-form-errors', onFormErrors);

      cleanupRef.current = () => {
        ro.disconnect();
        window.removeEventListener('contact-form-errors', onFormErrors);
      };

      const animate = (time: number) => {
        if (!lenis) return;
        lenis.raf(time);
        rafId = window.requestAnimationFrame(animate);
      };

      rafId = window.requestAnimationFrame(animate);
    });

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      if (rafId) window.cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        if (onLenisScroll && lenisRef.current.off) {
          lenisRef.current.off('scroll', onLenisScroll);
        }
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
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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
