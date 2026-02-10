'use client';

import Hero from './components/Hero';
import ContentSection from './components/ContentSection';
import ProjectGrid from './components/ProjectGrid';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PointCloudVisual from './components/PointCloudVisual';
import HyperSpaceBackground from './components/HyperSpaceBackground';
import ScrollTextEffect from './components/ScrollTextEffect';
import FadeInFromRight from './components/FadeInFromRight';
import HomeCTABanner from './components/HomeCTABanner';
import FadeInOnScroll from './components/FadeInOnScroll';
import VideoHero from './components/VideoHero';
import ParallaxBanner from './components/ParallaxBanner';
import ParallaxBannerWithImage from './components/ParallaxBannerWithImage';
import ParallaxLink from './components/ParallaxLink';
import Trans from './components/Trans';
import { useLanguage } from './context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  return (
    <main className="relative m-0 p-0 bg-black overflow-x-hidden">
      <Navigation />

      <Hero />

      <div id="about" className="scroll-section m-0 p-0 relative">
        <ContentSection
          title={t('home.craftingTitle')}
          description={t('home.craftingDesc')}
          learnMoreLink="/about"
          learnMoreLabel={t('home.learnMore')}
          sideVisual={<PointCloudVisual />}
          backgroundClassName="from-black text-white"
        />
      </div>

      <div className="m-0 p-0 block leading-none -mt-px">
        <VideoHero
          videoUrl="https://res.cloudinary.com/dpplgma25/video/upload/v1769541821/plabanfisa_kskqbc.mp4"
          line1={t('home.videoLine1')}
          line2={t('home.videoLine2')}
          line3={t('home.videoLine3')}
        />
      </div>

      <div className="m-0 p-0">
        <ParallaxBanner
          title={t('home.parallaxTitle')}
          subtitle={t('home.parallaxSubtitle')}
        />
      </div>

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
            href="/contact#contact-form"
            className="mt-6 inline-block text-sm uppercase tracking-[0.35em] text-zinc-400 hover:text-white focus:outline-none focus:text-white transition-all duration-300 ease-out hover:scale-[1.04] focus:scale-[1.04]"
          >
            {t('home.bookCall')}
          </ParallaxLink>
        </div>
      </section>

      <div className="m-0 p-0">
        <HomeCTABanner
          imageSrc="/afnisabanner2.jpg"
          subtitle={t('home.ctaBannerSubtitle')}
          titleLine1={t('home.ctaBannerTitle1')}
          titleLine2={t('home.ctaBannerTitle2')}
          paragraph={t('home.ctaBannerParagraph')}
          exploreServicesText={t('home.ctaBannerExplore')}
          getInTouchText={t('home.ctaBannerTouch')}
        />
      </div>

      <section id="contact" className="relative min-h-screen m-0 p-0 py-0 px-4 md:px-8 text-white overflow-hidden">
        <HyperSpaceBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center py-24 md:py-32">
          <ScrollTextEffect className="text-6xl md:text-8xl font-bold mb-8">
            <Trans>{t('home.letsCreate')}</Trans><span className="font-fallback">´</span><br />
            {t('home.something')}<br />
            {t('home.different')}
          </ScrollTextEffect>
          <FadeInOnScroll className="text-xl text-zinc-400 mb-12">
            <Trans>{t('home.idea')}</Trans>
          </FadeInOnScroll>
          <a
            href="/contact#contact-form"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
          >
            {t('home.contactUs')}
          </a>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
