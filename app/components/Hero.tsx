'use client';

import { useEffect, useRef } from 'react';
import LogoPointCloud from './LogoPointCloud';
import HeroGradientBackground from './HeroGradientBackground';
import VantaNet from './VantaNet';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrolled = window.pageYOffset;
      const hero = heroRef.current;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = `${1 - scrolled / 800}`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden bg-black m-0 border-0 outline-none"
      style={{ willChange: 'transform', minHeight: '100dvh' }}
    >
      <div className="absolute inset-0 z-0">
        <VantaNet className="w-full h-full" />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #000 0%, transparent 22%, transparent 68%, rgba(0,0,0,0.4) 85%, #000 100%)',
        }}
        aria-hidden
      />
      <HeroGradientBackground />
      <div className="relative z-20 w-full h-full min-h-0 flex items-center justify-center border-0 outline-none overflow-hidden translate-y-[-50px] md:translate-y-0 isolate">
        <LogoPointCloud />
      </div>
    </section>
  );
}
