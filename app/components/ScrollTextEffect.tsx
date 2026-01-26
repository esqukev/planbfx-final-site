'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextEffectProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollTextEffect({ children, className = '' }: ScrollTextEffectProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;

    gsap.fromTo(
      text,
      {
        opacity: 0,
        scale: 2.5,
        y: 100,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1.5,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <h2 ref={textRef} className={className}>
      {children}
    </h2>
  );
}
