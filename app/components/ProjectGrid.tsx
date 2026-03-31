'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const processStepKeys = [
  { id: '01', subtitleKey: 'home.process.step1sub', codeKey: 'home.process.step1code', descKey: 'home.process.step1desc' },
  { id: '02', subtitleKey: 'home.process.step2sub', codeKey: 'home.process.step2code', descKey: 'home.process.step2desc' },
  { id: '03', subtitleKey: 'home.process.step3sub', codeKey: 'home.process.step3code', descKey: 'home.process.step3desc' },
  { id: '04', subtitleKey: 'home.process.step4sub', codeKey: 'home.process.step4code', descKey: 'home.process.step4desc' },
];

export default function ProjectGrid() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: subtitle, start: 'top 88%', once: true },
          }
        );
      }

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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="m-0 py-0 px-4 md:px-8 bg-black"
    >
      <div className="max-w-4xl mx-auto py-20 md:py-28 px-6 md:px-10">
        <div className="mb-20 md:mb-24 flex flex-col items-center text-center">
          <p
            ref={subtitleRef}
            className="text-sm uppercase tracking-[0.3em] text-zinc-400 max-w-2xl mx-auto"
          >
            {t('home.process.discover')}
          </p>
        </div>

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-600 -translate-x-1/2 z-0"
            aria-hidden
          />

          {processStepKeys.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative flex justify-center py-10 md:py-14 first:pt-0 last:pb-0"
            >
              <div
                className={`
                  w-full max-w-xl relative z-10
                  ${index % 2 === 0 ? 'md:-translate-x-20 md:text-left' : 'md:translate-x-20 md:text-right'}
                `}
              >
                <div className="rounded-2xl border-0 bg-zinc-900/80 p-6 md:p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                    {t(step.subtitleKey)}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                    {t(step.codeKey)}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-justify">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
