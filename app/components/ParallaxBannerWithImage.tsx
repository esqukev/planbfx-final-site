'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type ParallaxBannerWithImageProps = {
  subtitle?: string;
  titleLines?: string[];
  imageSrc?: string;
  className?: string;
};

const DEFAULT_LINES = [
  "We don't just create visuals",
  "we craft moments that",
  "are remembered",
];

export default function ParallaxBannerWithImage({
  subtitle = "Where art become experiences",
  titleLines = DEFAULT_LINES,
  imageSrc = '/bannerstage.jpg',
  className = '',
}: ParallaxBannerWithImageProps) {
  const sectionRef = useRef<HTMLElement>(null);
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
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>

      {/* Fade overlays for seamless transitions */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <p
          className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-6 md:mb-8 transition-opacity duration-1000"
          style={{
            transform: `translate3d(0, ${offset * 0.6}px, 0)`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          {subtitle}
        </p>
        <div
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
        >
          {titleLines.map((line, lineIndex) => {
            let totalCharIndex = 0;
            titleLines.slice(0, lineIndex).forEach((l) => {
              totalCharIndex += l.length + 1;
            });
            return (
              <p
                key={lineIndex}
                className="mb-1.5 md:mb-2"
                style={{
                  transform: `translate3d(0, ${offset * (1 + lineIndex * 0.1)}px, 0)`,
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                {line.split(' ').map((word, wordIndex) => {
                  const words = line.split(' ');
                  const wordStartIndex =
                    totalCharIndex +
                    words.slice(0, wordIndex).join(' ').length +
                    wordIndex;
                  return (
                    <span key={wordIndex} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
                      {word.split('').map((char, charIndex) => {
                        const charTotalIndex = wordStartIndex + charIndex;
                        const isApostrophe = char === "'" || char === "'";
                        const displayChar = char === "'" ? "'" : char;
                        return (
                          <span
                            key={`${lineIndex}-${wordIndex}-${charIndex}`}
                            className={isApostrophe ? 'font-fallback inline-block' : 'inline-block'}
                            style={{
                              opacity: isVisible ? 1 : 0,
                              transition: `opacity 1s ease ${charTotalIndex * 0.05}s`,
                            }}
                          >
                            {displayChar}
                          </span>
                        );
                      })}
                      {wordIndex < words.length - 1 && (
                        <span
                          className="inline-block"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transition: `opacity 1s ease ${wordStartIndex + word.length * 0.05}s`,
                            width: '0.3em',
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
