import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

export const metadata: Metadata = {
  title: { absolute: 'PlanB FX' },
  description: 'Contact PlanB FX to book live visuals, VFX, motion graphics, video mapping and audiovisual production for electronic music events, brands and corporate experiences in Costa Rica and LATAM.',
  keywords: ['PlanB FX contact', 'book live visuals', 'VFX Costa Rica', 'video mapping', 'corporate events'],
  openGraph: {
    title: 'Contact: Book Custom Interactive Experiences | PlanB FX',
    description: 'Contact PlanB FX to book live visuals, VFX, motion graphics, video mapping and audiovisual production for electronic music events, brands and corporate experiences in Costa Rica and LATAM.',
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
