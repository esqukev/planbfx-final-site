'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CTAFinalBannerProps = {
  imageSrc: string;
};

/**
 * Banner final con imagen parallax, subtítulo gris, título grande, párrafo y CTAs.
 */
export default function CTAFinalBanner({ imageSrc }: CTAFinalBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [imageOffset, setImageOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowHeight) {
        setImageOffset(rect.top * 0.3);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ transform: `translate3d(0, ${imageOffset}px, 0)` }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-black/60" aria-hidden />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-left px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <span className="text-base uppercase tracking-[0.35em] text-zinc-400 block mb-6">
          Art Meets Innovation
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
          Transforming Events with<br />
          Digital Brilliance.
        </h2>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10">
          Connect with us to elevate your event. Our unique blend of art, technology,
          and creativity brings a stunning visual experience to every occasion. Discover
          how we can transform your vision into reality.
        </p>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-base"
          >
            Get in touch
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
