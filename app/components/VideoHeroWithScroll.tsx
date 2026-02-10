'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type VideoHeroWithScrollProps = {
  videoUrl: string;
};

/**
 * Banner con video y mismo efecto que ImageHero: fade out al hacer scroll.
 * Logo centrado que aparece y desaparece.
 */
const FADE_MS = 1200;
const VISIBLE_MS = 2000;
const HIDDEN_MS = 2000;

export default function VideoHeroWithScroll({ videoUrl }: VideoHeroWithScrollProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.pageYOffset;
      const hero = heroRef.current;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = `${Math.max(0, 1 - scrolled / 800)}`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const show = () => {
      if (cancelled) return;
      setLogoVisible(true);
      t1 = setTimeout(() => {
        if (cancelled) return;
        setLogoVisible(false);
        t2 = setTimeout(show, FADE_MS + HIDDEN_MS);
      }, FADE_MS + VISIBLE_MS);
    };
    t2 = setTimeout(show, 400);
    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black"
      style={{ willChange: 'transform' }}
    >
      <div className="absolute inset-0 z-10">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div
          className="relative w-48 h-24 md:w-64 md:h-32 opacity-90"
          style={{
            opacity: logoVisible ? 0.9 : 0,
            transition: `opacity ${FADE_MS / 1000}s ease-in-out`,
          }}
        >
          <Image
            src="/planb-logo.svg"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
