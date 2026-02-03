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
 * Hero con efecto de zoom y fade al hacer scroll (Framer Motion).
 * Imagen de fondo a pantalla completa y logo opcional encima.
 */
export default function ScrollZoomHero({
  imageSrc,
  imageAlt = '',
  logoSrc,
}: ScrollZoomHeroProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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

      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ scale, opacity }}
      >
        {logoSrc && (
          <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-2xl">
            <Image
              src={logoSrc}
              alt="Plan B FX"
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
