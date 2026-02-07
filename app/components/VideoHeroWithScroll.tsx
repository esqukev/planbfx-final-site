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
export default function VideoHeroWithScroll({ videoUrl }: VideoHeroWithScrollProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [logoVisible, setLogoVisible] = useState(true);

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
    const interval = setInterval(() => {
      setLogoVisible((v) => !v);
    }, 3000);
    return () => clearInterval(interval);
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
            transition: 'opacity 1.2s ease-in-out',
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
