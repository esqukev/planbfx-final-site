import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

const products = [
  { name: 'Live Painting', desc: 'Real-time fusion of human touch and AI. Transform live illustrations into dynamic visual streams.' },
  { name: 'Artificial Mirage', desc: 'Reality as an infinite canvas. Transform live video feeds into any imaginable concept.' },
  { name: 'Audio Reactive Art', desc: 'Visuals that breathe to the beat. Graphic environments that respond to every frequency.' },
  { name: 'Interactive Branding', desc: 'Dynamic text overlays and generative typography that react live to the environment.' },
  { name: 'Logo Waterfall', desc: 'Dynamic flow of brand identity. Waterfalls of logos that react to audience movement.' },
  { name: 'Projection Mapping', desc: 'Surface intervention and live visual direction. Alter perception of physical space.' },
  { name: 'Customized Experience', desc: 'Tailored interactive installations and visual solutions for each project.' },
];

export const metadata: Metadata = {
  title: 'Services',
  description: 'PlanB FX services: Live Painting, Artificial Mirage, Audio Reactive Art, Interactive Branding, Logo Waterfall, Projection Mapping, Customized Experience. Custom Interactive Experiences for events and festivals.',
  keywords: [
    'Live Painting',
    'Artificial Mirage',
    'Audio Reactive Art',
    'Interactive Branding',
    'Logo Waterfall',
    'Projection Mapping',
    'Customized Experience',
    'PlanB FX services',
    'interactive art Costa Rica',
    'visual experiences events',
  ],
  openGraph: {
    title: 'Services | PlanB FX',
    description: 'Live Painting, Artificial Mirage, Audio Reactive Art, Interactive Branding, Logo Waterfall, Projection Mapping, Customized Experience. Custom Interactive Experiences.',
    url: `${SITE_URL}/services`,
  },
};

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'PlanB FX Services',
  description: 'Custom Interactive Experiences for events and festivals',
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: p.name,
      description: p.desc,
      provider: {
        '@type': 'Organization',
        name: 'PlanB FX',
      },
    },
  })),
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  );
}
