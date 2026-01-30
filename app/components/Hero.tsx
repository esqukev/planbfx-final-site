'use client';

import Image from 'next/image';
import LogoPointCloud from './LogoPointCloud';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden m-0">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bannerstage.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>

      {/* Space for brand banner or animation */}
      <div className="relative z-10 w-full h-full">
        <LogoPointCloud />
      </div>
    </section>
  );
}
