'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type ScrollZoomHeroProps = {
  imageSrc: string;
  imageAlt?: string;
};

/**
 * Banner de Contact: imagen con overlay que se oscurece al hacer scroll (como otros banners).
 */
export default function ScrollZoomHero({
  imageSrc,
  imageAlt = '',
}: ScrollZoomHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Más oscuro cuanto más ha salido la sección por arriba (scroll down)
      if (rect.bottom < 0) {
        setOverlayOpacity(0.5);
      } else if (rect.top < windowHeight) {
        const progress = 1 - rect.top / windowHeight;
        setOverlayOpacity(Math.min(0.5, progress * 0.5));
      } else {
        setOverlayOpacity(0);
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
