'use client';

import Image from 'next/image';

interface Project {
  year: string;
  category: string;
  title: string;
  client: string;
  imageUrl?: string;
}

const projects: Project[] = [
  {
    year: '2025',
    category: 'Campaign',
    title: 'Creative Campaign',
    client: 'PlanB FX',
    imageUrl: `https://picsum.photos/600/400?random=1`,
  },
  {
    year: '2025',
    category: 'Production',
    title: 'Brand Film',
    client: 'PlanB FX',
    imageUrl: `https://picsum.photos/600/400?random=2`,
  },
  {
    year: '2025',
    category: 'Events',
    title: 'Corporate Event',
    client: 'PlanB FX',
    imageUrl: `https://picsum.photos/600/400?random=3`,
  },
  {
    year: '2025',
    category: 'Design',
    title: 'Brand Identity',
    client: 'PlanB FX',
    imageUrl: `https://picsum.photos/600/400?random=4`,
  },
  {
    year: '2025',
    category: 'Campaign',
    title: 'Digital Campaign',
    client: 'PlanB FX',
    imageUrl: `https://picsum.photos/600/400?random=5`,
  },
  {
    year: '2025',
    category: 'Production',
    title: 'Video Production',
    client: 'PlanB FX',
    imageUrl: `https://picsum.photos/600/400?random=6`,
  },
];

export default function ProjectGrid() {
  return (
    <section className="m-0 py-0 px-4 md:px-8 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto py-16 md:py-24">
        <div className="mb-16">
          <span className="text-sm uppercase tracking-wider text-zinc-500 mb-4 block">
            Our Works
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-4">
            Selected Cases
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-zinc-200 dark:bg-zinc-800">
                <Image
                  src={project.imageUrl || `https://picsum.photos/600/400?random=${index}`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="text-sm text-zinc-500 mb-2">
                {project.year} {project.category}
              </div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {project.client}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
            All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
