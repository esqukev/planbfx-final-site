'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type HomeCTABannerProps = {
  imageSrc: string;
};

/**
 * Banner parallax debajo de Art Meets Innovation: Crafting Moments, Innovative Art Meets Technology, párrafo y botones.
 */
export default function HomeCTABanner({ imageSrc }: HomeCTABannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [imageOffset, setImageOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden m-0 p-0 border-0"
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
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <span
          className="text-sm uppercase tracking-[0.3em] text-zinc-400 block mb-4 transition-all duration-[1000ms] ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          Crafting Moments
        </span>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 md:mb-8 transition-all duration-[1000ms] ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.1s',
          }}
        >
          Innovative Art Meets Technology
        </h2>
        <p
          className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-[1000ms] ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.2s',
          }}
        >
          Welcome to PlanB FX, where creativity and technology converge. We breathe life into events through interactive art, smart coding, and AI-driven experiences. Let us elevate your vision into a captivating reality.
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 transition-all duration-[1000ms] ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.3s',
          }}
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all text-base"
          >
            Explore services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-base"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
