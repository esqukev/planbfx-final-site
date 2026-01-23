import AnimatedStrip from './components/AnimatedStrip';
import Hero from './components/Hero';
import ContentSection from './components/ContentSection';
import ProjectGrid from './components/ProjectGrid';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      
      <Hero />
      
      {/* Animated Strip */}
      <AnimatedStrip 
        text="CUSTOM INTERACTIVE INMMERSIONS" 
        speed={40}
        direction="right"
        className="bg-white dark:bg-black text-black dark:text-white py-4"
      />
      
      {/* About Section */}
      <div id="about">
        <ContentSection
          title="Crafting Immersive Visual Experiences"
          description="We create immersive, tailored visuals that push the boundaries of your vision. From concept to execution, we merge creativity, interaction, and technology to build unique visual experiences that engage, evolve, and resonate beyond the screen."
          imageUrl="/planb-variant2.svg"
          learnMoreLink="/about"
        />
      </div>
      
      {/* Animated Strip */}
      <AnimatedStrip 
        text="Be Different Lead Boldly" 
        speed={35}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4"
      />
      
      {/* Services Section */}
      <section id="services" className="py-24 px-4 md:px-8 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-sm uppercase tracking-wider text-zinc-500 mb-4 block">
              What we do
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-4">
              We create, produce, and design experiences that make your events hit different.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Events',
                description: 'Creative event concept development and full-scale event planning and execution.',
              },
              {
                number: '02',
                title: 'Integrated Marketing',
                description: 'Marketing communication strategy development, brand positioning, and high-impact campaigns.',
              },
              {
                number: '03',
                title: 'Creative Design',
                description: 'Brand identity development, concept creation and design consultancy.',
              },
              {
                number: '04',
                title: 'Production',
                description: 'TVCs, Brand Films, Corporate Video Production, and TV Show Production.',
              },
            ].map((service, index) => (
              <div key={index} className="p-6 bg-white dark:bg-black rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-zinc-300 dark:text-zinc-700 mb-4">
                  {service.number}
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Animated Strip */}
      <AnimatedStrip 
        text="Ready to Create Your Brand Breakthrough?" 
        speed={45}
        direction="right"
        className="bg-black text-white py-4"
      />
      
      {/* Works Section */}
      <div id="works">
        <ProjectGrid />
      </div>
      
      {/* CTA Section */}
      <section id="contact" className="py-32 px-4 md:px-8 bg-gradient-to-br from-black via-zinc-900 to-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-bold mb-8">
            Let´s Create<br />
            Something<br />
            Extraordinary
          </h2>
          <p className="text-xl text-zinc-400 mb-12">
            Got A Project? Let´s Talk
          </p>
          <button className="px-12 py-6 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all transform hover:scale-105 text-lg">
            Contact Us
          </button>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
