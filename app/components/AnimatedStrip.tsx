'use client';

import React from 'react';

interface AnimatedStripProps {
  text: string;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function AnimatedStrip({ 
  text, 
  speed = 50, 
  direction = 'left',
  className = '' 
}: AnimatedStripProps) {

  return (
    <div className={`overflow-hidden whitespace-nowrap m-0 ${className}`}>
      <div 
        className={`inline-flex ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <span className="inline-block px-4 text-2xl font-bold uppercase tracking-wider">
          {Array(10).fill(text).map((t, i) => (
            <React.Fragment key={i}>
              {t}
              {i < 9 && <span className="font-sans"> • </span>}
            </React.Fragment>
          ))}
        </span>
      </div>
    </div>
  );
}
