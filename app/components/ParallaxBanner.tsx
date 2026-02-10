'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

type ParallaxBannerProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ParallaxBanner({
  title,
  subtitle,
  className = '',
}: ParallaxBannerProps) {
  const { t } = useLanguage();
  const titleLines = [
    t('home.parallax.line1'),
    t('home.parallax.line2'),
    t('home.parallax.line3'),
  ];
  const subtitleText = subtitle ?? t('home.parallax.subtitle');
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowHeight) {
        setOffset(sectionTop * 0.4);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden m-0 p-0 border-0 ${className}`}
    >
      {/* Diagonal gradient: light from top-right to bottom-left */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom left, #000000 0%, #18181b 50%, #000000 100%)',
        }}
      />

      {/* Fade overlays for seamless transitions */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-8 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-32 lg:py-40">
        {/* Subtitle on top with fade in */}
        <p
          ref={subtitleRef}
          className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-400 mb-4 sm:mb-6 md:mb-8 transition-opacity duration-1000"
          style={{
            transform: `translate3d(0, ${offset * 0.6}px, 0)`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          {subtitleText}
        </p>
        {/* Title: 3 lines; mobile ~40% larger than before; no line breaks */}
        <div
          ref={titleRef}
          className="text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight max-w-full tracking-[-0.02em] sm:tracking-normal"
        >
          {titleLines.map((line, lineIndex) => {
            let totalCharIndex = 0;
            titleLines.slice(0, lineIndex).forEach((l) => {
              totalCharIndex += l.length + 1;
            });
            return (
              <p
                key={lineIndex}
                className="mb-0 md:mb-0.5 leading-tight whitespace-nowrap"
                style={{
                  transform: `translate3d(0, ${offset * (1 + lineIndex * 0.1)}px, 0)`,
                  display: 'block',
                }}
              >
                {line.split(' ').map((word, wordIndex) => {
                  const wordStartIndex = totalCharIndex + line.split(' ').slice(0, wordIndex).join(' ').length + wordIndex;
                  return (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                      {line.split(' ')[wordIndex].split('').map((char, charIndex) => {
                        const charTotalIndex = wordStartIndex + charIndex;
                        const needsFallback = ["'", "'", "´", "-", "–", "—", "+", "/"].includes(char);
                        const displayChar = char === "'" ? "'" : char;
                        return (
                          <span
                            key={`${lineIndex}-${wordIndex}-${charIndex}`}
                            className={`inline-block ${needsFallback ? 'font-fallback' : ''}`}
                            style={{
                              opacity: isVisible ? 1 : 0,
                              transition: `opacity 1s ease ${charTotalIndex * 0.05}s`,
                            }}
                          >
                            {displayChar}
                          </span>
                        );
                      })}
                      {wordIndex < line.split(' ').length - 1 && (
                        <span
                          className="inline-block w-[0.25em] sm:w-[0.3em]"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transition: `opacity 1s ease ${wordStartIndex + line.split(' ')[wordIndex].length * 0.05}s`,
                          }}
                        >
                          {' '}
                        </span>
                      )}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
