'use client';

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
  const repeatedText = Array(10).fill(text).join(' • ');

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div 
        className={`inline-flex ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <span className="inline-block px-4 text-2xl font-bold uppercase tracking-wider">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
