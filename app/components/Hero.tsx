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
      <HeroGradientBackground />
      <div className="relative z-20 w-full h-full min-h-0 flex items-center justify-center border-0 outline-none overflow-hidden translate-y-[-50px] md:translate-y-0 isolate">
        <div className="relative w-full max-w-[min(100vw,80vh)] max-h-[80vh] aspect-square flex items-center justify-center">
          {/* Blur layer in logo shape - behind point cloud */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              maskImage: 'url(/logos/plablandinglogo.svg)',
              WebkitMaskImage: 'url(/logos/plablandinglogo.svg)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: 'rgba(0,0,0,0.2)',
            }}
            aria-hidden
          />
          <div className="relative w-full h-full shadow-none">
            <LogoPointCloud />
          </div>
        </div>
      </div>
    </section>
  );
}
