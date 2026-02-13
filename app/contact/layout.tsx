import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

export const metadata: Metadata = {
  title: { absolute: 'PlanB FX' },
  description: 'Contacta a PlanB FX para cotizar visuales en vivo, VFX, motion graphics, video mapping y producción audiovisual para eventos de música electrónica, marcas y corporativos en Costa Rica y LATAM.',
  keywords: ['PlanB FX contact', 'cotizar visuales', 'VFX Costa Rica', 'video mapping', 'eventos corporativos'],
  openGraph: {
    title: 'Contacto: Cotiza Experiencias Interactivas | PlanB FX',
    description: 'Contacta a PlanB FX para cotizar visuales en vivo, VFX, motion graphics, video mapping y producción audiovisual para eventos de música electrónica, marcas y corporativos en Costa Rica y LATAM.',
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact: Book Custom Interactive Experiences | PlanB FX',
    description: 'Contact PlanB FX to book live visuals, VFX, motion graphics, video mapping and audiovisual production for electronic music events, brands and corporate experiences in Costa Rica and LATAM.',
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
