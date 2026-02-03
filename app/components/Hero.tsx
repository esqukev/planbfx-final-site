'use client';

import { useEffect, useRef } from 'react';
import LogoPointCloud from './LogoPointCloud';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black m-0 border-0 outline-none"
      style={{ willChange: 'transform' }}
    >
      <div className="relative z-10 w-full h-full min-h-screen border-0 outline-none overflow-hidden">
        <LogoPointCloud />
      </div>
    </section>
  );
}
