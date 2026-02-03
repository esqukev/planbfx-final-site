'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

type ScrollZoomHeroProps = {
  imageSrc: string;
  imageAlt?: string;
  logoSrc?: string;
};

/**
 * Hero con fade a negro y texto overlay al hacer scroll (Framer Motion).
 * Solo letras "Let's Elevate" / "Your Game" (sin logo).
 */
export default function ScrollZoomHero({
  imageSrc,
  imageAlt = '',
}: ScrollZoomHeroProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Fade a negro: overlay negro que gana opacidad al hacer scroll (como otros banners)
  const blackOverlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Texto overlay: fade out muy natural al hacer scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  return (
    <section
      ref={ref}
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

      {/* Overlay de texto: Let's Elevate / Your Game (indentado), fade out al scroll */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center pl-8 md:pl-16 lg:pl-24 pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <div className="text-white font-bold leading-tight drop-shadow-lg">
          <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
            Let&apos;s Elevate
          </p>
          <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight pl-12 md:pl-20 lg:pl-24">
            Your Game
          </p>
        </div>
      </motion.div>

      {/* Fade a negro al hacer scroll (mismo efecto que otros banners) */}
      <motion.div
        className="absolute inset-0 z-30 bg-black pointer-events-none"
        style={{ opacity: blackOverlayOpacity }}
        aria-hidden
      />

      {/* Gradiente inferior para transición seamless hacia la sección siguiente */}
      <div
        className="absolute bottom-0 left-0 right-0 z-40 h-32 md:h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
        }}
        aria-hidden
      />
    </section>
  );
}
