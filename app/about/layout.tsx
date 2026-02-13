import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

export const metadata: Metadata = {
  title: 'About',
  description: 'PlanB FX: A collective of local musicians and visual artists creating immersive, code-based experiences. Partners with 3AM, Soulful Gathering, Xtyle, Microgarden. Custom Interactive Experiences.',
  keywords: ['PlanB FX', 'about', 'interactive art', 'Costa Rica', 'visual experiences', 'events'],
  openGraph: {
    title: 'About | PlanB FX',
    description: 'PlanB FX: A collective creating immersive visual experiences for events and festivals.',
    url: `${SITE_URL}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
