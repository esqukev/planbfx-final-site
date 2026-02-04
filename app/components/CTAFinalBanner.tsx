'use client';

import Image from 'next/image';
import Link from 'next/link';

type CTAFinalBannerProps = {
  imageSrc: string;
};

/**
 * Banner final con imagen de fondo, texto y CTAs: Get in Touch + Explore Our Art.
 */
export default function CTAFinalBanner({ imageSrc }: CTAFinalBannerProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-20 md:py-28">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
          Art Meets Innovation
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-white/95 mb-6">
          Transforming Events with
          <br />
          Digital Brilliance
        </p>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10">
          Connect with us to elevate your event. Our unique blend of art, technology,
          and creativity brings a stunning visual experience to every occasion. Discover
          how we can transform your vision into reality.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all text-base"
          >
            Get in Touch
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white font-medium hover:text-white/90 transition-colors group"
          >
            Explore Our Art
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
