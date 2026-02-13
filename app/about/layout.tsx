import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

export const metadata: Metadata = {
  title: { absolute: 'PlanB FX' },
  description: 'Somos un estudio creativo especializado en visuales para eventos, VFX, visuales, motion design y experiencias audiovisuales para festivales, DJs, marcas y eventos corporativos en Costa Rica y LATAM.',
  keywords: ['PlanB FX', 'about', 'estudio creativo', 'visuales para eventos', 'VFX Costa Rica', 'motion design', 'LATAM'],
  openGraph: {
    title: 'Nosotros: PlanB FX | Estudio de Visuales y Producción Creativa',
    description: 'Somos un estudio creativo especializado en visuales para eventos, VFX, motion design y experiencias audiovisuales para festivales, DJs, marcas y eventos corporativos en Costa Rica y LATAM.',
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About: PlanB FX | Creative Interactive Production Studio',
    description: 'We are a creative studio specializing in live event visuals, VFX, visuales, motion design and immersive audiovisual experiences for festivals, DJs, brands and corporate events in Costa Rica and LATAM.',
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
