'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

type ParallaxBannerWithImageProps = {
  imageSrc?: string;
  className?: string;
  /** Si se pasa, se muestra "prefix + palabra rotando" en lugar de TAKE THE NEXT STEP / SEE OUR SERVICES */
  rotatingTitle?: { prefix: string; words: string[] };
};

export default function ParallaxBannerWithImage({
  imageSrc = '/bannerstage.jpg',
  className = '',
  rotatingTitle,
}: ParallaxBannerWithImageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [imageOffset, setImageOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

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

  // Rotating word (WE CREATE ART / EXPERIENCE / INNOVATION / etc.)
  useEffect(() => {
    if (!rotatingTitle || rotatingTitle.words.length === 0) return;
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingTitle.words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [rotatingTitle]);

  useEffect(() => {
    if (!rotatingTitle || !wordRef.current) return;
    const el = wordRef.current;
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
  }, [wordIndex, rotatingTitle]);

  const words = rotatingTitle?.words ?? [];
  const currentWord = words[wordIndex] ?? '';

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden m-0 p-0 border-0 ${className}`}
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
            className="object-cover"
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

      <div className="relative z-10 max-w-5xl mx-auto text-center px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        {rotatingTitle ? (
          <p
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight transition-all duration-[1200ms] ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transitionDelay: '0s',
            }}
          >
            {rotatingTitle.prefix}
            <span
              ref={wordRef}
              key={wordIndex}
              className="inline-block min-w-[14ch] text-left align-bottom transition-opacity duration-300"
            >
              {currentWord}
            </span>
          </p>
        ) : (
          <>
            <p
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 md:mb-8 transition-all duration-[1200ms] ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '0s',
              }}
            >
              TAKE THE NEXT STEP
            </p>
            <div
              className="transition-all duration-[1200ms] ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '0.15s',
              }}
            >
              <Link
                href="/services"
                className="inline-block text-sm uppercase tracking-[0.35em] text-zinc-400 hover:text-white focus:outline-none focus:text-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04] focus:scale-[1.04]"
              >
                SEE OUR SERVICES
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
