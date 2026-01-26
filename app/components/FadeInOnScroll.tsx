'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  triggerSelector?: string;
}

export default function FadeInOnScroll({ 
  children, 
  className = '',
  triggerSelector
}: FadeInOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Find the trigger element (the ScrollTextEffect h2)
    const trigger = triggerSelector 
      ? document.querySelector(triggerSelector) 
      : element.closest('.relative')?.querySelector('h2');

    if (!trigger) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top 40%',
          end: 'top 20%',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [triggerSelector]);

  return (
    <p ref={elementRef} className={className}>
      {children}
    </p>
  );
}
