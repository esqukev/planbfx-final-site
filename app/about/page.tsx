'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section with GIF and Grid Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 0 0'
          }}
        />
        
        {/* Darker grid overlay for contrast */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 0 0'
          }}
        />
        
        {/* GIF Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
          <div className="relative aspect-video w-full">
            <Image
              src="/about-hero.gif"
              alt="PlanB FX Animation"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-24 px-4 md:px-8 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-black dark:text-white">
            About Us
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            This is the About page. Content will be added here.
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
