import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-black dark:text-white">
            Services
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            This is the Services page. Content will be added here.
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
