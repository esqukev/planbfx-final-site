'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ParallaxBannerWithImageProps = {
  imageSrc?: string;
  className?: string;
};

export default function ParallaxBannerWithImage({
  imageSrc = '/bannerstage.jpg',
  className = '',
}: ParallaxBannerWithImageProps) {
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
      className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden m-0 p-0 border-0 ${className}`}
    >
      {/* Background image — parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ transform: `translate3d(0, ${imageOffset}px, 0)` }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>

      {/* Fade overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <p
          className="text-sm uppercase tracking-[0.35em] text-zinc-400 mb-6 md:mb-8 transition-opacity duration-1000"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          - TAKE THE NEXT STEP -
        </p>
        <Link
          href="/#services"
          className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight transition-[transform,font-size] duration-300 hover:scale-[1.06] focus:scale-[1.06] focus:outline-none"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          SEE OUR SERVICES
        </Link>
      </div>
    </section>
  );
}
