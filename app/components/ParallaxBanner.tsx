'use client';

import { useEffect, useRef, useState } from 'react';

type ParallaxBannerProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ParallaxBanner({
  title = "We don't just create visuals we craft moments that move",
  subtitle = "Where art become experiences",
  className = '',
}: ParallaxBannerProps) {
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
        setOffset(sectionTop * 0.2);
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
        {/* Title with letter-by-letter fade in, words kept together */}
        <p
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          style={{
            transform: `translate3d(0, ${offset}px, 0)`,
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
          }}
        >
          {title.split(' ').map((word, wordIndex) => {
            let charIndex = 0;
            // Calculate total character index including previous words and spaces
            title.split(' ').slice(0, wordIndex).forEach((w) => {
              charIndex += w.length + 1; // +1 for space
            });
            return (
              <span key={wordIndex} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
                {word.split('').map((char, idx) => {
                  const totalCharIndex = charIndex + idx;
                  return (
                    <span
                      key={`${wordIndex}-${idx}`}
                      className="inline-block"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 1s ease ${totalCharIndex * 0.05}s`,
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
                {wordIndex < title.split(' ').length - 1 && (
                  <span
                    className="inline-block"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transition: `opacity 1s ease ${charIndex + word.length * 0.05}s`,
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
      </div>
    </section>
  );
}
