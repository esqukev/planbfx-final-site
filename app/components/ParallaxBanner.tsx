'use client';

import { useEffect, useRef, useState } from 'react';

type ParallaxBannerProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ParallaxBanner({
  title = "Where ideas become experiences",
  subtitle = "We don't just create visuals — we craft moments that move",
  className = '',
}: ParallaxBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      // Parallax: background moves at 0.35x scroll speed when section is in view
      const visibleStart = -sectionHeight * 0.2;
      const visibleEnd = windowHeight + sectionHeight * 0.2;
      if (sectionTop < visibleEnd && sectionTop + sectionHeight > visibleStart) {
        setOffset(sectionTop * 0.35);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Parallax background layer */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
        }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600 rounded-full blur-[100px]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-6">
          {subtitle}
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          {title}
        </h2>
      </div>
    </section>
  );
}
