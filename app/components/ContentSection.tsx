'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  reverse?: boolean;
  stats?: Array<{ number: string; numberSuffix?: string; label: string }>;
  learnMoreLink?: string;
}

export default function ContentSection({
  title,
  subtitle,
  description,
  imageUrl,
  reverse = false,
  stats,
  learnMoreLink,
}: ContentSectionProps) {
  // Placeholder image URL from a generative image service
  const placeholderImage = imageUrl || `https://picsum.photos/800/600?random=${Math.random()}`;

  return (
    <section className={`py-24 px-4 md:px-8 ${reverse ? 'bg-zinc-50 dark:bg-zinc-900' : 'bg-white dark:bg-black'}`}>
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        <div className="flex-1">
          {subtitle && (
            <span className="text-sm uppercase tracking-wider text-zinc-500 mb-4 block">
              {subtitle}
            </span>
          )}
          <h2 className="text-[3.3rem] md:text-[4.4rem] font-bold mb-6 text-black dark:text-white leading-tight">
            {title}
          </h2>
          <p className="text-[1.1rem] text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
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
              className="inline-flex items-center gap-2 text-black dark:text-white font-semibold hover:gap-4 transition-all group mt-6"
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
        {imageUrl && (
          <div className="flex-1 w-full">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
