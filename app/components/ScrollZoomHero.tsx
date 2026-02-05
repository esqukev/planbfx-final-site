'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type ScrollZoomHeroProps = {
  imageSrc: string;
  imageAlt?: string;
};

/**
 * Banner de Contact: mismo efecto que Services (ImageHero) — fade out al hacer scroll.
 * Overlay reducido 50% (máx 0.25).
 */
export default function ScrollZoomHero({
  imageSrc,
  imageAlt = '',
}: ScrollZoomHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.pageYOffset;
      // Mismo efecto que ImageHero (Services): fade out al hacer scroll
      setOpacity(Math.max(0, 1 - scrolled / 800));
      // Overlay reducido 50%: máx 0.25
      if (scrolled > 400) {
        setOverlayOpacity(0.25);
      } else {
        setOverlayOpacity((scrolled / 400) * 0.25);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] min-h-[100dvh] w-full overflow-hidden bg-black"
      style={{ opacity }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 z-10 bg-black transition-opacity duration-150"
        style={{ opacity: overlayOpacity }}
        aria-hidden
      />
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}
