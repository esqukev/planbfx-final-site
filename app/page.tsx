import AnimatedStrip from './components/AnimatedStrip';
import Hero from './components/Hero';
import ContentSection from './components/ContentSection';
import ProjectGrid from './components/ProjectGrid';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PointCloudVisual from './components/PointCloudVisual';
import HyperSpaceBackground from './components/HyperSpaceBackground';
import ScrollTextEffect from './components/ScrollTextEffect';
import FadeInOnScroll from './components/FadeInOnScroll';
import VideoHero from './components/VideoHero';
import ParallaxBanner from './components/ParallaxBanner';
import ParallaxBannerWithImage from './components/ParallaxBannerWithImage';
import ServicesCards from './components/ServicesCards';

export default function Home() {
  return (
    <main className="relative m-0 p-0">
      <Navigation />

      <Hero />

      <div id="about" className="scroll-section m-0 p-0 -mt-px relative">
        <ContentSection
          title="Crafting Immersive Visual Experiences"
          description="We create immersive, tailored visuals that push the boundaries of your vision. From concept to execution, we merge creativity, interaction, and technology to build unique visual experiences that engage, evolve, and resonate beyond the screen."
          learnMoreLink="/about"
          sideVisual={<PointCloudVisual />}
          backgroundClassName="bg-gradient-to-b from-black via-zinc-900 to-black text-white"
        />
        {/* Fade suave al negro para transición seamless con VideoHero */}
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
          subtitle="Where art become experiences"
        />
      </div>

      {/* Misma sección con imagen de fondo */}
      <div className="m-0 p-0">
        <ParallaxBannerWithImage imageSrc="/bannerstage.jpg" />
      </div>

      <div id="works" className="m-0 p-0">
        <ProjectGrid />
      </div>

      {/* What we do — single container with Crafting background, no gap */}
      <section
        id="services"
        className="m-0 p-0 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #000000, #18181b, #000000)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-wider text-zinc-500 mb-4 block">
              What we do
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              We create, produce, and design experiences that make your events hit different.
            </h2>
          </div>
          <ServicesCards />
        </div>
      </section>

      <div className="m-0 p-0">
        <AnimatedStrip
          text="Ready to Create Your Brand Breakthrough?"
          speed={45}
          direction="right"
          className="bg-black text-white py-0 m-0"
        />
      </div>

      {/* CTA — seamless from What we do (both black at boundary) */}
      <section id="contact" className="relative m-0 p-0 py-0 px-4 md:px-8 text-white overflow-hidden">
        {/* HyperSpace Background */}
        <HyperSpaceBackground />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center py-24 md:py-32">
          <ScrollTextEffect className="text-6xl md:text-8xl font-bold mb-8">
            Let´s Create<br />
            Something<br />
            Extraordinary
          </ScrollTextEffect>
          <FadeInOnScroll 
            className="text-xl text-zinc-400 mb-12"
          >
            Got A Project? Let´s Talk
          </FadeInOnScroll>
          <button className="px-12 py-6 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all transform hover:scale-105 text-lg">
            Contact Us
          </button>
        </div>
      </section>
      
      <Footer />
      </main>
  );
}
