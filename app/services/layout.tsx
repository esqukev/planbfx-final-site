import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

const products = [
  { name: 'Live Painting', desc: 'Real-time fusion of human touch and AI. Transform live illustrations into dynamic visual streams.', keywords: ['Live Painting', 'Dibujo en Vivo'] },
  { name: 'Artificial Mirage', desc: 'Reality as an infinite canvas. Transform live video feeds into any imaginable concept.', keywords: ['Artificial Mirage', 'Espejismo Artificial'] },
  { name: 'Audio Reactive Art', desc: 'Visuals that breathe to the beat. Graphic environments that respond to every frequency.', keywords: ['Audio Reactive Art', 'Arte Audio Reactivo'] },
  { name: 'Interactive Branding', desc: 'Dynamic text overlays and generative typography that react live to the environment.', keywords: ['Interactive Branding / Advertising', 'Interactive Branding', 'Advertising', 'Anuncios Interactivos'] },
  { name: 'Logo Waterfall', desc: 'Dynamic flow of brand identity. Waterfalls of logos that react to audience movement.', keywords: ['Logo Waterfall', 'Cascada de Logos'] },
  { name: 'Projection Mapping', desc: 'Surface intervention and live visual direction. Alter perception of physical space.', keywords: ['Projection Mapping + Visual Control Performance', 'Projection Mapping', 'Visual Control Performance', 'Mapping y Control Visual Expresivo', 'Mapping', 'Control Visual Expresivo'] },
  { name: 'Customized Experience', desc: 'Tailored interactive installations and visual solutions for each project.', keywords: ['Customized Experience', 'Experiencia Personalizada'] },
];

export const metadata: Metadata = {
  title: 'Services',
  description: 'PlanB FX services: Live Painting, Artificial Mirage, Audio Reactive Art, Interactive Branding, Logo Waterfall, Projection Mapping, Customized Experience. Custom Interactive Experiences for events and festivals.',
  keywords: [
    'Live Painting',
    'Artificial Mirage',
    'Audio Reactive Art',
    'Interactive Branding / Advertising',
    'Interactive Branding',
    'Advertising',
    'Logo Waterfall',
    'Projection Mapping + Visual Control Performance',
    'Projection Mapping',
    'Visual Control Performance',
    'Customized Experience',
    'Dibujo en Vivo',
    'Espejismo Artificial',
    'Arte Audio Reactivo',
    'Anuncios Interactivos',
    'Cascada de Logos',
    'Mapping y Control Visual Expresivo',
    'Mapping',
    'Control Visual Expresivo',
    'Experiencia Personalizada',
    'Custom Interactive Experiences',
    'Arte interactivo',
    'Interactive Art',
    'Experiencias Interactivas',
    'Arte con IA',
    'AI Art',
    'Projection Art',
    'House Music Visuals',
    'Visuales para eventos',
    'Proyecciones para eventos',
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
