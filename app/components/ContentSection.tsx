'use client';

import Image from 'next/image';

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  reverse?: boolean;
  stats?: Array<{ number: string; label: string }>;
}

export default function ContentSection({
  title,
  subtitle,
  description,
  imageUrl,
  reverse = false,
  stats,
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            {description}
          </p>
          {stats && (
            <div className="grid grid-cols-3 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-black dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 w-full">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={placeholderImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
