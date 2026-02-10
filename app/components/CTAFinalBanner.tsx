'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type CTAFinalBannerProps = {
  imageSrc: string;
  /** Optional custom content (Services uses custom copy) */
  subtitle?: string;
  title?: string;
  paragraph?: string;
  ctaText?: ReactNode;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  /** Center content (Services banner) */
  centered?: boolean;
};

/**
 * Banner final con imagen parallax, subtítulo gris, título grande, párrafo y CTAs.
 */
export default function CTAFinalBanner({
  imageSrc,
  subtitle = 'Art In Motion',
  title = 'Transforming Events with\nDigital Brilliance',
  paragraph = 'Connect with us to elevate your event. Our unique blend of art, technology, and creativity brings a stunning visual experience to every occasion. Discover how we can transform your vision into reality.',
  ctaText = 'Get in touch',
  ctaHref = '/contact',
  secondaryText = 'Explore Our Art',
  secondaryHref = '/services',
  centered = false,
}: CTAFinalBannerProps) {
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
      className="relative min-h-[70vh] flex items-center justify-start overflow-hidden"
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

      <div
        className={`relative z-10 w-full max-w-3xl py-20 md:py-28 pl-6 pr-6 md:pl-16 md:pr-12 lg:pl-24 lg:pr-16 ${
          centered ? 'mx-auto text-center flex flex-col items-center' : 'text-left'
        }`}
      >
        <span className="text-sm uppercase tracking-[0.3em] text-zinc-400 block mb-4">
          {subtitle}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 whitespace-pre-line">
          {title}
        </h2>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 text-justify">
          {paragraph}
        </p>
        <div className={`flex flex-wrap items-center gap-4 md:gap-6 ${centered ? 'justify-center' : ''}`}>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
          >
            {ctaText}
          </Link>
          {secondaryText && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 text-white font-medium hover:text-white/90 transition-all duration-300 ease-out hover:scale-[1.04] group"
            >
              {secondaryText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
