'use client';

import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import VideoHeroWithScroll from '../components/VideoHeroWithScroll';
import CTAFinalBanner from '../components/CTAFinalBanner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES_VIDEO_URL = 'https://res.cloudinary.com/dpplgma25/video/upload/v1769796195/beyerrandom_lk0ov5.mp4';

const SYMBOL_FALLBACK = ["'", "'", "´", "-", "–", "—", "+", "/"];

function textWithSymbolFallback(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let key = 0;
  let run = '';
  for (const char of text) {
    if (SYMBOL_FALLBACK.includes(char)) {
      if (run) {
        parts.push(run);
        run = '';
      }
      parts.push(<span key={key++} className="font-fallback">{char}</span>);
    } else {
      run += char;
    }
  }
  if (run) parts.push(run);
  return parts.length === 1 ? parts[0] : <>{parts.map((p, i) => <React.Fragment key={i}>{p}</React.Fragment>)}</>;
}

const PRODUCTS: Array<{
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
}> = [
  {
    id: 'live-painting',
    title: 'Live Painting',
    description:
      'A real-time fusion of human touch and AI. Using precision digital tools, we transform live illustrations into dynamic visual streams, crafting an organic piece of art that evolves before the audience\'s eyes.',
    videoUrl: 'https://res.cloudinary.com/dpplgma25/video/upload/v1770746569/Live_painting_PB_FX_vosurw.mp4',
  },
  {
    id: 'artificial-mirage',
    title: 'Artificial Mirage',
    description:
      'Reality as an infinite canvas. We transform live video feeds into any imaginable concept, from familiar characters to abstract scenes. Here, the limit isn\'t the technology, but your imagination; we turn the environment and its subjects into a surreal, real-time visual experience.',
    videoUrl: 'https://res.cloudinary.com/dpplgma25/video/upload/v1770745183/egypt_q9pz1j.mp4',
  },
  {
    id: 'audio-reactive-art',
    title: 'Audio Reactive Art',
    description:
      'Visuals that breathe to the beat. We develop graphic environments that respond with absolute precision to every frequency and pulse, achieving a perfect synchronicity where music becomes visible.',
    videoUrl: 'https://res.cloudinary.com/dpplgma25/video/upload/v1770748182/Audio_Reactive_Cymatics_zzo9sg.mp4',
  },
  {
    id: 'interactive-branding',
    title: 'Interactive Branding / Advertising',
    description:
      'Dynamic text overlays and generative typography that react live to the environment, creating a smart, customized visual narrative for every brand.',
    videoUrl: 'https://res.cloudinary.com/dpplgma25/video/upload/v1770338141/CYRIX_jcsd8k.mp4',
  },
  {
    id: 'logo-waterfall',
    title: 'Logo Waterfall',
    description:
      'A dynamic flow of brand identity. We leverage GPU power to create waterfalls composed of logos that react organically to the audience\'s movement via optical sensors. An elegant and playful way to embed branding into the audience\'s memory.',
    videoUrl: 'https://res.cloudinary.com/dpplgma25/video/upload/v1770746759/logo_rain_tyohaa.mp4',
  },
  {
    id: 'projection-mapping',
    title: 'Projection Mapping + Visual Control Performance',
    description:
      'Surface intervention and live visual direction. We alter the perception of physical space through precision mapping, guided by a real-time visual performance that ensures a cohesive, high-impact atmosphere.',
    videoUrl: 'https://res.cloudinary.com/dpplgma25/video/upload/v1770338660/IMG_3202_k8sfmw.mp4',
  },
  {
    id: 'customized-experience',
    title: 'Customized Experience',
    description:
      'Tailored Experiences. We collaborate closely with our clients to design and develop exclusive interactive installations and visual solutions, specifically adapted to the identity and needs of each project.',
    videoUrl: 'https://res.cloudinary.com/dpplgma25/video/upload/v1770746128/Custom_Experience_clip_xgf2i6.mp4',
  },
];

function ProductSection({
  product,
  index,
  sectionRef,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
  sectionRef: (el: HTMLElement | null) => void;
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
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900/80 md:transition-transform md:duration-500 md:ease-[cubic-bezier(0.4,0,0.2,1)] md:hover:scale-[1.08]">
            {product.videoUrl ? (
              <video
                src={product.videoUrl}
                className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
                playsInline
                muted
                loop
                autoPlay
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-zinc-500 text-sm uppercase tracking-wider">
                Preview
              </div>
            )}
          </div>
        </div>
        <div className={isEven ? 'lg:order-1' : ''}>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {textWithSymbolFallback(product.title)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl text-justify">
            {textWithSymbolFallback(product.description)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
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

      <div className="relative z-20">
        {PRODUCTS.map((product, index) => (
          <ProductSection
            key={product.id}
            product={product}
            index={index}
            sectionRef={(el) => {
              sectionRefs.current[index] = el;
            }}
          />
        ))}
      </div>

      <CTAFinalBanner
        imageSrc="/Untitled-9580.jpg"
        subtitle="Innovate Your Experience"
        title="Art and technology unite at PlanB FX"
        paragraph="Discover how we blend creativity with technology to create stunning interactive art. Explore our imaginative solutions designed for events that leave a lasting impression. Experience art like never before."
        ctaText={<>Let<span className="font-fallback">&apos;</span>s talk</>}
        ctaHref="/contact"
        secondaryText=""
        secondaryHref=""
        centered
      />

      <Footer />
    </main>
  );
}
