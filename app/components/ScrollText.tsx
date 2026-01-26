'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextProps {
  text: string;
  className?: string;
}

export default function ScrollText({ text, className = '' }: ScrollTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionId = 'lets-create-extraordinary';

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(`.scroll-char-${sectionId}`);

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        scale: 2.2,
        x: (i) => (i % 2 === 0 ? -200 : 200),
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        ease: 'power4.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [sectionId]);

  const charClass = `scroll-char-${sectionId}`;

  return (
    <div ref={containerRef} className={`scroll-text-section ${className}`}>
      <h2 className="scroll-text">
        {text.split('').map((char, i) => (
          <span className={charClass} key={i}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <style jsx>{`
        .scroll-text-section {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .scroll-text {
          font-size: clamp(3rem, 8vw, 8rem);
          font-weight: 500;
          letter-spacing: 0.08em;
          color: white;
          overflow: hidden;
          white-space: nowrap;
          line-height: 1.2;
        }

        .scroll-char-${sectionId} {
          display: inline-block;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
