'use client';

import React from 'react';
import Navigation from '../components/Navigation';
import HLSVideo from '../components/HLSVideo';
import Footer from '../components/Footer';
import VideoHeroWithScroll from '../components/VideoHeroWithScroll';
import CTAFinalBanner from '../components/CTAFinalBanner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_VIDEO_URL = 'https://stream.mux.com/lKnmpOTSed5Kpw01k1mi9ldLt00A7Bsvt3ZMdy41003q6Y.m3u8';

const PRODUCTS: Array<{
  id: string;
  titleKey: string;
  descKey: string;
  videoUrl?: string;
}> = [
  { id: 'live-painting', titleKey: 'services.livePainting.title', descKey: 'services.livePainting.description', videoUrl: 'https://stream.mux.com/g01gzXddhASNJW01BF1wnPWDRzzKvbD8uY02msTnyey2TQ.m3u8' },
  { id: 'artificial-mirage', titleKey: 'services.artificialMirage.title', descKey: 'services.artificialMirage.description', videoUrl: 'https://stream.mux.com/5xmVk005LJVjdokXO8prxqwb2Be62qutfv4qf01o3gH2o.m3u8' },
  { id: 'audio-reactive-art', titleKey: 'services.audioReactive.title', descKey: 'services.audioReactive.description', videoUrl: 'https://stream.mux.com/Q4jWgXitCvHmOSqK1fw7C02CrGIJJQAi5UO3dU28ot6Q.m3u8' },
  { id: 'interactive-branding', titleKey: 'services.interactiveBranding.title', descKey: 'services.interactiveBranding.description', videoUrl: 'https://stream.mux.com/lUfhg3dB8H5tkvhQo2uZnnm6YQtW00r01mFjbYjIQTur4.m3u8' },
  { id: 'logo-waterfall', titleKey: 'services.logoWaterfall.title', descKey: 'services.logoWaterfall.description', videoUrl: 'https://stream.mux.com/013acMdndgiE20096ONFsBMlYNkkZBrkuoPODmSTQgvwg.m3u8' },
  { id: 'projection-mapping', titleKey: 'services.projectionMapping.title', descKey: 'services.projectionMapping.description', videoUrl: 'https://stream.mux.com/lXLqZRpm5mnuUy702dM00bJYtjhBLuqL4cmqyQc2hYw01Q.m3u8' },
  { id: 'customized-experience', titleKey: 'services.customizedExperience.title', descKey: 'services.customizedExperience.description', videoUrl: 'https://stream.mux.com/mF9PhpjvXu7mOk3MaOr2Ye9Dm2hDONde3sf7Hfini7o.m3u8' },
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
              <HLSVideo
                src={product.videoUrl}
                className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
                playsInline
                muted
                loop
                autoPlay
                preload="auto"
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
              />
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
  const sectionRefs = React.useRef<(HTMLElement | null)[]>([]);
  const pageRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="relative min-h-screen bg-black text-white">
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
