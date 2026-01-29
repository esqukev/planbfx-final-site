'use client';

import { useEffect, useRef, useState } from 'react';

type ParallaxBannerProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ParallaxBanner({
  title = "We don't just create visuals we craft moments that are remembered",
  subtitle = "Where art become experiences",
  className = '',
}: ParallaxBannerProps) {
  // Split title into lines - using typographic apostrophe (')
  const titleLines = [
    "We don't just create visuals",
    "we craft moments that",
    "are remembered"
  ];
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

      <div className="relative z-10 max-w-5xl mx-auto text-center px-8 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        {/* Subtitle on top with fade in */}
        <p
          ref={subtitleRef}
          className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-6 md:mb-8 transition-opacity duration-1000"
          style={{
            transform: `translate3d(0, ${offset * 0.6}px, 0)`,
            opacity: isVisible ? 1 : 0,
          }}
        >
          {subtitle}
        </p>
        {/* Title with letter-by-letter fade in, split into lines */}
        <div
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          style={{
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}
        >
          {titleLines.map((line, lineIndex) => {
            let totalCharIndex = 0;
            // Calculate starting character index for this line
            titleLines.slice(0, lineIndex).forEach((l) => {
              totalCharIndex += l.length + 1; // +1 for line break
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
                  const wordStartIndex = totalCharIndex + line.split(' ').slice(0, wordIndex).join(' ').length + wordIndex;
                  return (
                    <span key={wordIndex} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
                      {word.split('').map((char, charIndex) => {
                        const charTotalIndex = wordStartIndex + charIndex;
                        // Replace straight apostrophe with typographic apostrophe
                        const displayChar = char === "'" ? "'" : char;
                        const isApostrophe = char === "'";
                        return (
                          <span
                            key={`${lineIndex}-${wordIndex}-${charIndex}`}
                            className="inline-block"
                            style={{
                              opacity: isVisible ? 1 : 0,
                              transition: `opacity 1s ease ${charTotalIndex * 0.05}s`,
                              fontFamily: isApostrophe ? 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' : 'inherit',
                            }}
                          >
                            {displayChar}
                          </span>
                        );
                      })}
                      {wordIndex < line.split(' ').length - 1 && (
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
