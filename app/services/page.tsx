'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ImageHero from '../components/ImageHero';

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <Navigation />

      {/* Banner igual a About pero con foto, sin logo */}
      <ImageHero imageSrc="/tomybanner.jpg" imageAlt="Services" />

      <section className="relative z-20 py-16 md:py-24 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white">
            Services
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            This is the Services page. Content will be added here.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
