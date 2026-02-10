'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CursorTiltFigure from '../components/CursorTiltFigure';
import VantaHalo from '../components/VantaHalo';
import ImageHero from '../components/ImageHero';
import HyperSpaceBackground from '../components/HyperSpaceBackground';

const FAQ_ITEMS = [
  {
    question: 'Where are you based?',
    answer: 'Headquartered in San José, Costa Rica, we bring our visual expertise to every corner of the country with forward planning. Contact us to learn more about our availability and reach.',
  },
  {
    question: 'What kind of events do you work with?',
    answer: 'We work with a wide range of events including festivals, concerts, corporate events, brand activations, art installations, and private parties. Our visual experiences are tailored to each occasion.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend reaching out at least 4–8 weeks before your event to allow time for concept development and technical setup. For larger or custom projects, earlier is better.',
  },
  {
    question: 'Do you provide equipment or do we need to supply it?',
    answer: 'We can work with your existing setup or provide recommendations. Depending on the project, we can handle projection, screens, and technical integration—just ask when you get in touch.',
  },
  {
    question: 'What information do you need to get started?',
    answer: 'Share your event date, venue, vision, and any references or mood boards. The more detail you provide in the form, the faster we can propose a tailored solution.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll al formulario cuando se entra con #contact-form (ej. desde Home "Contact Us")
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact-form') {
      const el = document.getElementById('contact-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden overflow-y-auto">
      <Navigation />

      <ImageHero
        imageSrc="/letyago.jpg"
        imageAlt="Contact"
      />

      <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-x-hidden min-h-screen">
        <HyperSpaceBackground />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Dos columnas: izquierda = texto + contact; derecha = form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Columna izquierda — justificado a la izquierda */}
            <div className="text-left">
              <CursorTiltFigure
                className="mb-12 flex justify-start"
                maxTilt={36}
                perspective={1000}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Want to work with us?
                </h1>
              </CursorTiltFigure>

              <p className="text-2xl md:text-3xl font-light text-white/90 mb-8">
                Let<span className="font-fallback">&apos;</span>s turn ideas into impact.
              </p>
              <p className="text-lg text-white/70 leading-relaxed mb-6 text-justify">
                Whether you have a clear vision or just a spark, we<span className="font-fallback">&apos;</span>re here to help shape it.
                Reach out and let<span className="font-fallback">&apos;</span>s create something that actually stands out.
              </p>
              <p className="text-lg font-semibold text-white/90 mb-10">
                Get in contact.
              </p>

              <div className="flex flex-wrap gap-4 md:gap-6 mb-12">
                <a
                  href="tel:+50686201212"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
                >
                  Phone
                </a>
                <a
                  href="https://wa.me/50686201212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:hello@planbfx.com"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
                >
                  Email
                </a>
              </div>
              <div className="flex justify-start w-full max-w-2xl bg-transparent overflow-visible py-8">
                <VantaHalo logoSrc="/logos/Property-1-Variant4.svg" className="min-h-[420px] w-full max-w-full bg-transparent overflow-visible" />
              </div>
            </div>

            {/* Columna derecha — Ready to move forward + form */}
            <div id="contact-form" className="text-left scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to move forward?
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-4">
                This form is designed for clients who already have a clear vision, goals, and references.
                The more detail you provide, the faster and more accurately we can move forward.
              </p>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Book a meeting and walk us through your ideas and expectations.
              </p>

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
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback"
                    placeholder="Company or event name"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-white/80 mb-2">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback"
                    placeholder="Country"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback"
                    placeholder="+1 555 123 4567"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-white/80 mb-2">
                    Details
                  </label>
                  <p className="text-xs text-white/50 mb-2">
                    If not enough details are provided we could not consider your inquiry
                  </p>
                  <textarea
                    id="details"
                    name="details"
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition resize-y min-h-[140px] font-fallback"
                    placeholder="Describe your project, goals, timeline, and any references or mood boards..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* FAQ: título grande izquierda, subtítulo pequeño, preguntas a la derecha */}
          <div className="mt-24 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm md:text-base text-white/60 mb-8">
                Your questions answered simply and clearly.
              </p>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-white font-medium hover:bg-white/5 transition-colors"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`shrink-0 w-6 h-6 flex items-center justify-center text-white/80 text-lg font-light transition-transform ${
                        openFaq === index ? 'rotate-45' : ''
                      }`}
                    >
                      <span className="font-fallback" aria-hidden>+</span>
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-4 pt-0">
                      <p className="text-white/70 leading-relaxed text-justify">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
