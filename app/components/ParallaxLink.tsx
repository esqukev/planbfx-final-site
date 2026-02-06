'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Enlace con efecto parallax al scroll: se mueve suavemente con el scroll (de abajo hacia arriba).
 */
export default function ParallaxLink({ href, children, className = '' }: ParallaxLinkProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const tween = gsap.fromTo(
      wrapperRef.current,
      { y: 40, opacity: 0.7 },
      {
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 90%',
          end: 'top 30%',
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
    <div ref={wrapperRef} className="inline-block">
      <a href={href} className={className}>
        {children}
      </a>
    </div>
  );
}
