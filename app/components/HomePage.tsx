'use client';

import dynamic from 'next/dynamic';
import Hero from './Hero';
import ContentSection from './ContentSection';
import Navigation from './Navigation';
import Footer from './Footer';
const PointCloudVisual = dynamic(() => import('./PointCloudVisual'), { ssr: false });
import VideoHero from './VideoHero';
import ParallaxLink from './ParallaxLink';
import { useLanguage } from '../context/LanguageContext';

const ProjectGrid = dynamic(() => import('./ProjectGrid'), { ssr: false });
const HomeCTABanner = dynamic(() => import('./HomeCTABanner'), { ssr: false });
const ParallaxBanner = dynamic(() => import('./ParallaxBanner'), { ssr: false });
const ParallaxBannerWithImage = dynamic(() => import('./ParallaxBannerWithImage'), { ssr: false });
const HyperSpaceBackground = dynamic(() => import('./HyperSpaceBackground'), { ssr: false });
const ScrollTextEffect = dynamic(() => import('./ScrollTextEffect'), { ssr: false });
const FadeInFromRight = dynamic(() => import('./FadeInFromRight'), { ssr: false });
const FadeInOnScroll = dynamic(() => import('./FadeInOnScroll'), { ssr: false });

export default function HomePage() {
  const { t, tf } = useLanguage();
  return (
    <main className="relative m-0 p-0 bg-black overflow-x-hidden">
      <Navigation />

      <Hero />

      <div id="about" className="scroll-section m-0 p-0 relative">
        <ContentSection
          title={t('home.crafting.title')}
          description={t('home.crafting.description')}
          learnMoreLink="/about"
          learnMoreText={t('home.crafting.learnMore')}
          sideVisual={<PointCloudVisual />}
          backgroundClassName="from-black text-white"
        />
      </div>

      <div className="m-0 p-0 block leading-none -mt-px">
        <VideoHero videoUrl="https://stream.mux.com/WEry4DCwkdk02q7uSXzK600mrdQH7p1gHzo3gI4Fd59l8.m3u8" />
      </div>

      <div className="m-0 p-0">
        <ParallaxBanner />
      </div>

      {/* Misma sección con imagen de fondo */}
      <div className="m-0 p-0">
        <ParallaxBannerWithImage imageSrc="/bannerstage.jpg" />
      </div>

      <div id="works" className="m-0 p-0">
        <ProjectGrid />
      </div>

      <section
        id="services"
        className="m-0 p-0 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #000000, #18181b, #000000)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 lg:py-40 text-center">
          <FadeInFromRight className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            {t('home.artInMotion')}
          </FadeInFromRight>
          <ParallaxLink
            href="/contact"
            className="mt-6 inline-block text-sm uppercase tracking-[0.35em] text-zinc-400 hover:text-white focus:outline-none focus:text-white transition-all duration-300 ease-out hover:scale-[1.04] focus:scale-[1.04]"
          >
            {t('home.bookYourCall')}
          </ParallaxLink>
        </div>
      </section>

      {/* Banner parallax: Crafting Moments / Innovative Art Meets Technology + CTAs (julietbanner1) */}
      <div className="m-0 p-0">
        <HomeCTABanner imageSrc="/afnisabanner2.jpg" />
      </div>

      <section id="contact" className="relative min-h-screen m-0 p-0 py-0 px-4 md:px-8 text-white overflow-hidden">
        <HyperSpaceBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center py-24 md:py-32">
          <div className="flex flex-col items-center px-6 sm:px-4 mb-8">
            <ScrollTextEffect className="text-4xl sm:text-6xl md:text-8xl font-bold text-center">
              {tf('home.cta.letsCreate')}<br />
              {t('home.cta.something')}<br />
              {t('home.cta.different')}
            </ScrollTextEffect>
          </div>
          <FadeInOnScroll className="text-xl text-zinc-400 mb-12">
            {tf('home.cta.doYouHaveIdea')}
          </FadeInOnScroll>
          <a
            href="/contact#contact-form"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
          >
            {t('home.cta.contactUs')}
          </a>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
