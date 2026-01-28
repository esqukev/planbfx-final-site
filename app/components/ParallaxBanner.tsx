'use client';

import { useEffect, useRef, useState } from 'react';

type ParallaxBannerProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ParallaxBanner({
  title = "We don't just create visuals — we craft moments that move",
  subtitle = "Where art become experiences",
  className = '',
}: ParallaxBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowHeight) {
        setOffset(sectionTop * 0.2);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[50vh] flex items-center justify-center overflow-hidden m-0 p-0 border-0 ${className}`}
    >
      {/* Simple background without orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

      {/* Fade overlays for seamless transitions */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16 md:py-20">
        {/* Title on top */}
        <p
          className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-4 md:mb-6"
          style={{ transform: `translate3d(0, ${offset * 0.6}px, 0)` }}
        >
          {subtitle}
        </p>
        <p
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        >
          {title}
        </p>
      </div>
    </section>
  );
}
