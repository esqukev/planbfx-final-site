'use client';

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HyperSpaceBackground from '../components/HyperSpaceBackground';
import CursorTiltText from '../components/CursorTiltText';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      <section className="relative min-h-screen py-24 md:py-32 px-4 md:px-8">
        <HyperSpaceBackground />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Título interactivo: cursor-driven perspective tilt (GSAP) */}
          <CursorTiltText
            className="mb-16 flex justify-center"
            maxTilt={14}
            perspective={1000}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
              Wanna work with us?
            </h1>
          </CursorTiltText>

          {/* Intro — símbolos con tipografía fallback */}
          <p className="text-2xl md:text-3xl font-light text-white/90 mb-10 text-center">
            Let<span className="font-fallback">&apos;</span>s turn ideas into impact.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-6">
            Whether you have a clear vision or just a spark, we<span className="font-fallback">&apos;</span>re here to help shape it.
            Reach out and let<span className="font-fallback">&apos;</span>s create something that actually stands out.
          </p>
          <p className="text-lg font-semibold text-white/90 mb-16">
            Get in contact.
          </p>

          {/* Phone, WhatsApp, Email — botones */}
          <div className="flex flex-wrap gap-4 md:gap-6 mb-20">
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/70 transition-all text-base font-medium"
            >
              Phone
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/70 transition-all text-base font-medium"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@planbfx.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/70 transition-all text-base font-medium"
            >
              Email
            </a>
          </div>

          {/* Second text block */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to move forward?
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            This form is designed for clients who already have a clear vision, goals, and references.
            The more detail you provide, the faster and more accurately we can move forward.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-16">
            Book a meeting and walk us through your ideas and expectations.
          </p>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                Company or event name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition"
                placeholder="Company or event name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-white/80 mb-2">
                Details
              </label>
              <p className="text-xs text-white/50 mb-2">
                If not enough details are provided we could not consider your inquiry.
              </p>
              <textarea
                id="details"
                name="details"
                rows={6}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition resize-y min-h-[140px]"
                placeholder="Describe your project, goals, timeline, and any references or mood boards..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all text-lg"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
