import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://planb-fx.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PlanB FX',
    template: '%s | PlanB FX',
  },
  description: 'Custom Interactive Experiences',
  keywords: [
    'PlanB FX',
    'planbfx',
    'planb-fx',
    'plan b fx',
    'Plan B',
    'plan b',
    'Custom Interactive Experiences',
    'Arte interactivo',
    'Interactive Art',
    'Experiencias Interactivas',
    'Arte con IA',
    'AI Art',
    'Projection Mapping',
    'Projection Art',
    'House Music Visuals',
    'Visuales para eventos',
    'Proyecciones para eventos',
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
    'interactive art',
    'visual experiences',
    'Costa Rica',
    'events',
    'festivals',
  ],
  openGraph: {
    title: 'PlanB FX',
    description: 'Custom Interactive Experiences',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PlanB FX',
  alternateName: ['planbfx', 'planb-fx', 'Plan B FX', 'Plan B'],
  url: SITE_URL,
  description: 'Custom Interactive Experiences. Interactive art, visual experiences, and immersive installations for events and festivals.',
  email: 'info@planb-fx.com',
  sameAs: ['https://www.instagram.com/planb_fx/'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San José',
    addressCountry: 'CR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] w-full m-0 p-0 bg-black overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
