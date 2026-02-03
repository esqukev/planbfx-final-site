'use client';

import Image from 'next/image';

type ScrollZoomHeroProps = {
  imageSrc: string;
  imageAlt?: string;
};

/**
 * Banner de Contact: solo imagen y texto estático (sin efectos ni overlays).
 */
export default function ScrollZoomHero({
  imageSrc,
  imageAlt = '',
}: ScrollZoomHeroProps) {
  return (
    <section className="relative h-[100vh] min-h-[100dvh] w-full overflow-hidden bg-black">
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

      <div className="absolute inset-0 z-10 flex items-center pl-8 md:pl-16 lg:pl-24 pointer-events-none">
        <div className="text-white font-bold leading-tight drop-shadow-lg">
          <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
            Let&apos;s Elevate
          </p>
          <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight pl-12 md:pl-20 lg:pl-24">
            Your Game
          </p>
        </div>
      </div>
    </section>
  );
}
