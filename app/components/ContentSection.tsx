'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  sideVisual?: ReactNode;
  reverse?: boolean;
  stats?: Array<{ number: string; numberSuffix?: string; label: string }>;
  learnMoreLink?: string;
  backgroundClassName?: string;
}

export default function ContentSection({
  title,
  subtitle,
  description,
  imageUrl,
  sideVisual,
  reverse = false,
  stats,
  learnMoreLink,
  backgroundClassName,
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasRight = Boolean(imageUrl || sideVisual);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
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
      className={`relative py-24 px-4 md:px-8 ${backgroundClassName || (reverse ? 'bg-zinc-50 dark:bg-zinc-900' : 'bg-white dark:bg-black')}`}
    >
      {/* Light effects on the left for dark backgrounds */}
      {backgroundClassName?.includes('from-black') && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      )}
      <div className={`relative z-10 max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} ${hasRight ? 'items-center' : 'items-start'} gap-10 md:gap-10`}>
        <div className={`flex-1 ${hasRight ? 'md:max-w-[620px]' : 'max-w-3xl'}`}>
          {subtitle && (
            <span className={`text-sm uppercase tracking-wider text-zinc-500 mb-4 block transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {subtitle}
            </span>
          )}
          <h2 className={`text-[3.3rem] md:text-[4.4rem] font-bold mb-6 ${backgroundClassName?.includes('from-black') ? 'text-white' : 'text-black dark:text-white'} leading-tight transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {title}
          </h2>
          <p className={`text-[1.1rem] ${backgroundClassName?.includes('from-black') ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'} mb-8 leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {description}
          </p>
          {stats && (
            <div className="grid grid-cols-3 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-black dark:text-white mb-2">
                    {stat.number}
                    {stat.numberSuffix && (
                      <span className="font-sans">{stat.numberSuffix}</span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
          {learnMoreLink && (
            <Link 
              href={learnMoreLink}
              className={`inline-flex items-center gap-2 ${backgroundClassName?.includes('from-black') ? 'text-white' : 'text-black dark:text-white'} font-semibold hover:gap-4 transition-all group mt-6 duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="inline-block group-hover:scale-110 transition-transform duration-300">
                Learn More
              </span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
        {hasRight && (
          <div
            className={`flex-1 w-full md:max-w-[420px] transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {imageUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              sideVisual
            )}
          </div>
        )}
      </div>
    </section>
  );
}
