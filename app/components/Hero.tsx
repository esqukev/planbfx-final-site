'use client';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <span className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-4 block">
            PlanB FX
          </span>
        </div>
        <h1 className="text-7xl md:text-9xl font-bold mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-fade-in">
            Art Comes First
          </span>
          <span className="block text-white mt-2 animate-fade-in-delay">
            Creative Above All
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mt-8 animate-fade-in-delay-2">
          We shape distinctive success stories with breakthrough ideas and creative mastery
        </p>
        <div className="mt-12 flex gap-4 justify-center animate-fade-in-delay-3">
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all transform hover:scale-105">
            Watch Showreel
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
