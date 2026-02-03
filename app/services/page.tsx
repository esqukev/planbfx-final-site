import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <Navigation />

      {/* Banner con imagen tomybanner */}
      <section className="relative w-full aspect-[21/9] min-h-[200px] md:min-h-[280px] overflow-hidden">
        <Image
          src="/tomybanner.jpg"
          alt="Services"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8">
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
