'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

type CursorTiltTextProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
};

export default function CursorTiltText({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1200,
}: CursorTiltTextProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = tiltRef.current;
    if (!wrap || !el) return;

    const setRotation = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (clientX - centerX) / rect.width;
      const y = (centerY - clientY) / rect.height;
      const rotateY = x * maxTilt;
      const rotateX = y * maxTilt;
      gsap.to(el, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const resetRotation = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const onMouseMove = (e: MouseEvent) => setRotation(e.clientX, e.clientY);
    const onMouseLeave = () => resetRotation();

    wrap.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrap.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ perspective: `${perspective}px` }}
    >
      <div
        ref={tiltRef}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
