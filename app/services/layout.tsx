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
  title: 'Servicios: Visuales en Vivo, VFX, Video Mapping | PlanB FX',
  description: 'Servicios profesionales de PlanB FX: visuales en vivo para DJs y festivales, VJ loops, motion graphics, VFX, video mapping, contenido para pantallas LED y experiencias inmersivas para eventos y marcas. Dibujo en Vivo, Espejismo Artificial, Arte Audio Reactivo, Anuncios Interactivos, Cascada de Logos, Mapping y Control Visual Expresivo, Experiencia Personalizada.',
  keywords: [
    'Live Painting',
    'Artificial Mirage',
    'Audio Reactive Art',
    'Interactive Branding / Advertising',
    'Logo Waterfall',
    'Projection Mapping',
    'Customized Experience',
    'Dibujo en Vivo',
    'Espejismo Artificial',
    'Arte Audio Reactivo',
    'Anuncios Interactivos',
    'Cascada de Logos',
    'Mapping y Control Visual Expresivo',
    'Experiencia Personalizada',
    'visuales en vivo',
    'VFX',
    'video mapping',
    'VJ loops',
    'motion graphics',
    'LED screen content',
    'PlanB FX services',
  ],
  openGraph: {
    title: 'Servicios: Visuales en Vivo, VFX, Video Mapping | PlanB FX',
    description: 'Servicios profesionales de PlanB FX: visuales en vivo para DJs y festivales, VJ loops, motion graphics, VFX, video mapping, contenido para pantallas LED y experiencias inmersivas para eventos y marcas.',
    url: `${SITE_URL}/services`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services: Live Visuals, VFX, Video Mapping | PlanB FX',
    description: 'PlanB FX services: live visuals for DJs and festivals, VJ loops, motion graphics, VFX, video mapping, LED screen content and immersive experiences for events and brands. Live Painting, Artificial Mirage, Audio Reactive Art, Interactive Branding / Advertising, Logo Waterfall, Projection Mapping + Visual Control Performance, Customized Experience.',
  },
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PlanB FX',
  url: SITE_URL,
  description: 'VFX studio, live visuals for DJs and festivals, video mapping, motion graphics, interactive art and immersive experiences.',
  areaServed: [
    { '@type': 'Country', name: 'Costa Rica' },
    { '@type': 'Place', name: 'Latin America' },
  ],
};

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'PlanB FX Services',
  description: 'Live Visuals, VFX, Video Mapping, Motion Graphics, Interactive Art, Immersive Experiences for events and brands in Costa Rica and Latin America',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  );
}
