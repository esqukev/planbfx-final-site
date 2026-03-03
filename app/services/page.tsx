'use client';

import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import VideoHeroWithScroll from '../components/VideoHeroWithScroll';
import CTAFinalBanner from '../components/CTAFinalBanner';
import MuxPlayer, { getMuxPlaybackId } from '../components/MuxPlayer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const MUX_PARAMS = 'autoplay=muted&muted=true&controls=false&loop=true';
const SERVICES_VIDEO_URL = `https://player.mux.com/lKnmpOTSed5Kpw01k1mi9ldLt00A7Bsvt3ZMdy41003q6Y?${MUX_PARAMS}`;

const PRODUCTS: Array<{
  id: string;
  titleKey: string;
  descKey: string;
  videoUrl?: string;
}> = [
  { id: 'live-painting', titleKey: 'services.livePainting.title', descKey: 'services.livePainting.description', videoUrl: `https://player.mux.com/g01gzXddhASNJW01BF1wnPWDRzzKvbD8uY02msTnyey2TQ?${MUX_PARAMS}` },
  { id: 'artificial-mirage', titleKey: 'services.artificialMirage.title', descKey: 'services.artificialMirage.description', videoUrl: `https://player.mux.com/5xmVk005LJVjdokXO8prxqwb2Be62qutfv4qf01o3gH2o?${MUX_PARAMS}` },
  { id: 'audio-reactive-art', titleKey: 'services.audioReactive.title', descKey: 'services.audioReactive.description', videoUrl: `https://player.mux.com/Q4jWgXitCvHmOSqK1fw7C02CrGIJJQAi5UO3dU28ot6Q?${MUX_PARAMS}` },
  { id: 'interactive-branding', titleKey: 'services.interactiveBranding.title', descKey: 'services.interactiveBranding.description', videoUrl: `https://player.mux.com/mF9PhpjvXu7mOk3MaOr2Ye9Dm2hDONde3sf7Hfini7o?${MUX_PARAMS}` },
  { id: 'logo-waterfall', titleKey: 'services.logoWaterfall.title', descKey: 'services.logoWaterfall.description', videoUrl: `https://player.mux.com/013acMdndgiE20096ONFsBMlYNkkZBrkuoPODmSTQgvwg?${MUX_PARAMS}` },
  { id: 'projection-mapping', titleKey: 'services.projectionMapping.title', descKey: 'services.projectionMapping.description', videoUrl: `https://player.mux.com/lXLqZRpm5mnuUy702dM00bJYtjhBLuqL4cmqyQc2hYw01Q?${MUX_PARAMS}` },
  { id: 'customized-experience', titleKey: 'services.customizedExperience.title', descKey: 'services.customizedExperience.description', videoUrl: `https://player.mux.com/mF9PhpjvXu7mOk3MaOr2Ye9Dm2hDONde3sf7Hfini7o?${MUX_PARAMS}` },
];

function ProductSection({
  product,
  index,
  sectionRef,
  t,
  tf,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
  sectionRef: (el: HTMLElement | null) => void;
  t: (k: string) => string;
  tf: (k: string) => React.ReactNode;
}) {
  const isEven = index % 2 === 0;
  return (
    <section
      ref={sectionRef}
      id={product.id}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 py-20 md:px-8 lg:px-12"
    >
      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div className={isEven ? 'lg:order-2' : ''}>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900/80 md:transition-transform md:duration-500 md:ease-[cubic-bezier(0.4,0,0.2,1)] md:hover:scale-[1.116]">
            {product.videoUrl ? (
              product.videoUrl.includes('player.mux.com') ? (
                <MuxPlayer
                  playbackId={getMuxPlaybackId(product.videoUrl)!}
                  className="absolute inset-0 w-full h-full min-w-full min-h-full"
                  objectFit="cover"
                />
              ) : (
                <video
                  src={product.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
                  playsInline
                  muted
                  loop
                  autoPlay
                />
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center text-zinc-500 text-sm uppercase tracking-wider">
                {t('services.preview')}
              </div>
            )}
          </div>
        </div>
        <div className={isEven ? 'lg:order-1' : ''}>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {tf(product.titleKey)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl text-justify">
            {tf(product.descKey)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { t, tf } = useLanguage();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const refs = sectionRefs.current.filter(Boolean);
    refs.forEach((section) => {
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: true,
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Navigation />

      <VideoHeroWithScroll videoUrl={SERVICES_VIDEO_URL} />

      <div className="relative bg-black">
        {PRODUCTS.map((product, index) => (
          <ProductSection
            key={product.id}
            product={product}
            index={index}
            t={t}
            tf={tf}
            sectionRef={(el) => {
              sectionRefs.current[index] = el;
            }}
          />
        ))}
      </div>

      <CTAFinalBanner
        imageSrc="/Untitled-9580.jpg"
        subtitle={t('services.cta.subtitle')}
        title={t('services.cta.title')}
        paragraph={t('services.cta.paragraph')}
        ctaText={tf('services.cta.letsTalk')}
        ctaHref="/contact"
        secondaryText=""
        secondaryHref=""
        centered
      />

      <Footer />
    </main>
  );
}
