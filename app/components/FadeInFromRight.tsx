'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInFromRightProps {
  children: React.ReactNode;
  className?: string;
}

/** Efecto de entrada: fade in de derecha a izquierda (distinto al scroll scale del CTA). */
export default function FadeInFromRight({ children, className = '' }: FadeInFromRightProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 35%',
          scrub: true,
        },
      }
    );
    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
