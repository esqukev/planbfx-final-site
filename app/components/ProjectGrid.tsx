'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    id: '01',
    code: 'DISCOVERY',
    title: 'Discovery & Brief',
    description:
      'We map your goals, audience, and constraints. From kickoff to creative brief, we align on vision so every step builds toward the same outcome.',
  },
  {
    id: '02',
    code: 'CONCEPT',
    title: 'Concept & Design',
    description:
      'We explore concepts and visual directions. Storyboards, style frames, and interactive prototypes bring the idea to life before production.',
  },
  {
    id: '03',
    code: 'PRODUCTION',
    title: 'Production & Craft',
    description:
      'We produce the experience: film, 3D, motion, and tech. Every asset is crafted to match the creative vision and technical requirements.',
  },
  {
    id: '04',
    code: 'DELIVERY',
    title: 'Delivery & Launch',
    description:
      'We integrate, test, and deploy. From stage to screen, we ensure the experience runs flawlessly and stays on brand.',
  },
];

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length === 0) return;

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.88 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section || cards.some((c) => c && t.trigger === c)) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="m-0 py-0 px-4 md:px-8 bg-white dark:bg-black"
    >
      <div className="max-w-4xl mx-auto py-16 md:py-24">
        <div className="mb-20 md:mb-24">
          <span className="text-sm uppercase tracking-wider text-zinc-500 mb-4 block">
            Our Works
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-4">
            Selected Cases
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Discover the process behind our work — from brief to delivery.
          </p>
        </div>

        {/* Vertical timeline: línea por detrás, cards encima y centradas */}
        <div className="relative">
          {/* Línea central (por detrás de las cards) */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-300 dark:bg-zinc-600 -translate-x-1/2 z-0"
            aria-hidden
          />

          {processSteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative flex justify-center py-10 md:py-14 first:pt-0 last:pb-0"
            >
              {/* Card centrada sobre la línea (la línea pasa por detrás), un poquito a un lado */}
              <div
                className={`
                  w-full max-w-xl relative z-10
                  ${index % 2 === 0 ? 'md:-translate-x-4 md:text-left' : 'md:translate-x-4 md:text-right'}
                `}
              >
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-900/80 p-6 md:p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2">
                    {step.id} — {step.code}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 text-center">
          <button className="px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
            All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
