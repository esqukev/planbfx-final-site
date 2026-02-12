'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type HomeCTABannerProps = {
  imageSrc: string;
};

/**
 * Banner parallax debajo de Art Meets Innovation: Crafting Moments, Innovative Art Meets Technology, párrafo y botones.
 */
export default function HomeCTABanner({ imageSrc }: HomeCTABannerProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageOffset, setImageOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const craftingMoments = t('home.ctaBanner.craftingMoments');
  const innovativeArt = t('home.ctaBanner.innovativeArt');
  const meetsTechnology = t('home.ctaBanner.meetsTechnology');
  const paragraph = t('home.ctaBanner.paragraph');

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

  // Efecto scroll: de grande a pequeño (como Let's Create Something Extraordinary)
  useEffect(() => {
    if (!contentRef.current) return;

    const tween = gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 2.5, y: 120 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 100%',
          end: 'top 25%',
          scrub: true,
        },
      }
    );

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
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

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-3xl mx-auto text-center px-5 sm:px-10 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40 box-border overflow-hidden min-w-0"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-400 block mb-4">
          {craftingMoments.split('').map((char, i) => (
            <span
              key={`st-${i}`}
              className={['\'', '"', '-', '–', '—', '+', '/'].includes(char) ? 'inline-block font-fallback' : 'inline-block'}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.03}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 md:mb-8 text-center break-words">
          <span className="block text-center">
            {innovativeArt.split('').map((char, i) => (
              <span
                key={`t1-${i}`}
                className={['\'', '"', '-', '–', '—', '+', '/'].includes(char) ? 'inline-block font-fallback' : 'inline-block'}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.6s ease ${(innovativeArt.length + 1 + i) * 0.03}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
          <span className="block text-center mt-1">
            {meetsTechnology.split('').map((char, i) => (
              <span
                key={`t2-${i}`}
                className={['\'', '"', '-', '–', '—', '+', '/'].includes(char) ? 'inline-block font-fallback' : 'inline-block'}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.6s ease ${(innovativeArt.length + meetsTechnology.length + 2 + i) * 0.03}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h2>
        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto px-2 sm:px-1 break-words">
          {(() => {
            const words = paragraph.split(' ');
            const sym = ["'", '"', '-', '–', '—', '+', '/'];
            let charIdx = 0;
            return (
              <>
                {words.map((word, wi) => (
                  <span key={`w-${wi}`} className="inline">
                    {word.split('').map((char, ci) => (
                      <span
                        key={`c-${wi}-${ci}`}
                        className={sym.includes(char) ? 'inline-block font-fallback' : 'inline-block'}
                        style={{ opacity: isVisible ? 1 : 0, transition: `opacity 0.6s ease ${(charIdx++) * 0.02}s` }}
                      >
                        {char}
                      </span>
                    ))}
                    {wi < words.length - 1 ? ' ' : null}
                  </span>
                ))}
              </>
            );
          })()}
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 4.2s, transform 0.6s ease 4.2s',
          }}
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
          >
            {t('home.ctaBanner.exploreServices')}
          </Link>
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
          >
            {t('home.ctaBanner.getInTouch')}
          </Link>
        </div>
      </div>
    </section>
  );
}
