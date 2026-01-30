'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AboutSplitSection from '../components/AboutSplitSection';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navigation />

      <section className="relative z-20 bg-black">
        <AboutSplitSection />
      </section>

      <Footer />
    </main>
  );
}
