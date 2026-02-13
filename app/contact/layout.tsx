import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact PlanB FX for custom interactive experiences. Live Painting, Artificial Mirage, Audio Reactive Art, Projection Mapping. Get in touch for events and festivals.',
  keywords: ['PlanB FX contact', 'hire PlanB FX', 'interactive art Costa Rica', 'events visual'],
  openGraph: {
    title: 'Contact | PlanB FX',
    description: 'Contact PlanB FX for custom interactive experiences. Get in touch for your event.',
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
