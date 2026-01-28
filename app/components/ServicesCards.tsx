'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    number: '01',
    title: 'Events',
    description: 'Creative event concept development and full-scale event planning and execution.',
  },
  {
    number: '02',
    title: 'Integrated Marketing',
    description: 'Marketing communication strategy development, brand positioning, and high-impact campaigns.',
  },
  {
    number: '03',
    title: 'Creative Design',
    description: 'Brand identity development, concept creation and design consultancy.',
  },
  {
    number: '04',
    title: 'Production',
    description: 'TVCs, Brand Films, Corporate Video Production, and TV Show Production.',
  },
];

export default function ServicesCards() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <div
          key={service.number}
          className="p-6 rounded-lg border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-600 transition-all duration-500 hover:shadow-xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, background 0.3s, border-color 0.3s, box-shadow 0.3s`,
          }}
        >
          <div className="text-4xl font-bold text-zinc-500 mb-4">{service.number}</div>
          <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
          <p className="text-zinc-400">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
