import type { Metadata } from 'next';
import HomePage from './components/HomePage';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

export const metadata: Metadata = {
  title: { absolute: 'PlanB FX' },
  description: 'PlanB FX creates live visuals, cinematic VFX, motion graphics, video mapping and immersive experiences for electronic music events, festivals, corporate events and brands across Costa Rica and Latin America.',
  openGraph: {
    title: 'PlanB FX | Custom Interactive Experience in Costa Rica',
    description: 'PlanB FX creates live visuals, cinematic VFX, motion graphics, video mapping and immersive experiences for electronic music events, festivals, corporate events and brands across Costa Rica and Latin America.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlanB FX | Custom Interactive Experience in Costa Rica',
    description: 'PlanB FX creates live visuals, cinematic VFX, motion graphics, video mapping and immersive experiences for electronic music events, festivals, corporate events and brands across Costa Rica and Latin America.',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function Page() {
  return <HomePage />;
}
