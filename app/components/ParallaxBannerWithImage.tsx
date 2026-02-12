'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
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

  // Efecto rebote + fade in al cambiar la palabra: aparece desde arriba (GSAP bounce)
  useEffect(() => {
    if (!rotatingTitle || !wordRef.current) return;
    const el = wordRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: -28, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: 'back.out(1.6)',
        overwrite: true,
      }
    );
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
        <div className="absolute inset-0 bg-black/30" aria-hidden />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 w-full min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 md:py-32 lg:py-40">
        {rotatingTitle ? (
          <div
            className="w-full flex justify-center items-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 1200ms ease-out, transform 1200ms ease-out',
            }}
          >
            <p
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight w-full text-center"
              style={{
                textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)',
              }}
            >
              <span className="block text-center w-full">
                <span>{rotatingTitle.prefix.trim()}</span>
                <span className="inline-block w-[0.4em]" aria-hidden />
                <span
                  ref={wordRef}
                  className="inline-block text-center min-w-[3ch] transition-[width] duration-500 ease-in-out"
                  style={{ width: `${Math.max(currentWord.length, 3)}ch` }}
                >
                  {currentWord}
                </span>
              </span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <p
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 md:mb-8 transition-all duration-[1200ms] ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: '0s',
              }}
            >
              {t('home.takeNextStep')}
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
                className="inline-block text-sm uppercase tracking-[0.35em] text-zinc-400 hover:text-white focus:outline-none focus:text-white transition-all duration-300 ease-out hover:scale-[1.04] focus:scale-[1.04]"
              >
                {t('home.seeOurServices')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
