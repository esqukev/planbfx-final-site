import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PointCloudVisual from './components/PointCloudVisual';
import VantaHalo from './components/VantaHalo';
import HyperSpaceBackground from './components/HyperSpaceBackground';
import ScrollTextEffect from './components/ScrollTextEffect';
import FadeInFromRight from './components/FadeInFromRight';
import HomeCTABanner from './components/HomeCTABanner';
import FadeInOnScroll from './components/FadeInOnScroll';
import VideoHero from './components/VideoHero';
import ParallaxBanner from './components/ParallaxBanner';
import ParallaxBannerWithImage from './components/ParallaxBannerWithImage';
import ParallaxLink from './components/ParallaxLink';

export default function Home() {
  return (
    <main className="relative m-0 p-0 bg-black overflow-x-hidden">
      <Navigation />

      <Hero />

      <div id="about" className="scroll-section m-0 p-0 relative">
        <section className="relative flex min-h-[70vh] items-center justify-center py-16 md:py-24">
          <div className="absolute inset-0 z-0">
            <VantaHalo className="absolute inset-0 min-h-full w-full" />
          </div>
          <div className="relative z-10">
            <PointCloudVisual />
          </div>
        </section>
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32 lg:h-40 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
          }}
          aria-hidden
        />
      </div>

      <div className="m-0 p-0 block leading-none -mt-px">
        <VideoHero videoUrl="https://res.cloudinary.com/dpplgma25/video/upload/v1769541821/plabanfisa_kskqbc.mp4" />
      </div>

      <div className="m-0 p-0">
        <ParallaxBanner
          title="We don´t just create visuals — we craft moments that move"
          subtitle="Where art becomes experiences"
        />
      </div>

      {/* Misma sección con imagen de fondo */}
      <div className="m-0 p-0">
        <ParallaxBannerWithImage imageSrc="/bannerstage.jpg" />
      </div>

      <div id="works" className="m-0 p-0">
        <ProjectGrid />
      </div>

      {/* Art In Motion — fade in de derecha a izquierda */}
      <section
        id="services"
        className="m-0 p-0 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #000000, #18181b, #000000)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 lg:py-40 text-center">
          <FadeInFromRight className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            Art In Motion
          </FadeInFromRight>
          <ParallaxLink
            href="/contact#contact-form"
            className="mt-6 inline-block text-sm uppercase tracking-[0.35em] text-zinc-400 hover:text-white focus:outline-none focus:text-white transition-all duration-300 ease-out hover:scale-[1.04] focus:scale-[1.04]"
          >
            BOOK YOUR CALL NOW
          </ParallaxLink>
        </div>
      </section>

      {/* Banner parallax: Crafting Moments / Innovative Art Meets Technology + CTAs (julietbanner1) */}
      <div className="m-0 p-0">
        <HomeCTABanner imageSrc="/afnisabanner2.jpg" />
      </div>

      {/* CTA — fondo estrellas HyperSpace */}
      <section id="contact" className="relative min-h-screen m-0 p-0 py-0 px-4 md:px-8 text-white overflow-hidden">
        <HyperSpaceBackground />
        <div className="relative z-10 max-w-4xl mx-auto text-center py-24 md:py-32">
          <ScrollTextEffect className="text-6xl md:text-8xl font-bold mb-8">
            Let<span className="font-fallback">´</span>s Create<br />
            Something<br />
            Different
          </ScrollTextEffect>
          <FadeInOnScroll 
            className="text-xl text-zinc-400 mb-12"
          >
            Do you have an idea? Let<span className="font-fallback">´</span>s talk
          </FadeInOnScroll>
          <a
            href="/contact#contact-form"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
          >
            Contact us
          </a>
        </div>
      </section>
      
      <Footer />
      </main>
  );
}
