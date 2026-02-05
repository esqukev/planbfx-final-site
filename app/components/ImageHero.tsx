'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

type ImageHeroProps = {
  imageSrc: string;
  imageAlt?: string;
};

/**
 * Banner igual al de About (video hero) pero con imagen y sin logo en el centro.
 * Misma estructura: full viewport, parallax al scroll, object-cover.
 */
export default function ImageHero({ imageSrc, imageAlt = '' }: ImageHeroProps) {
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
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black"
      style={{ willChange: 'transform' }}
    >
      <div className="absolute inset-0 z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-black/25" aria-hidden />
    </section>
  );
}
