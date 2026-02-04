'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CursorTiltFigure from '../components/CursorTiltFigure';
import PlanBFXText from '../components/PlanBFXText';
import ScrollZoomHero from '../components/ScrollZoomHero';

const FAQ_ITEMS = [
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

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navigation />

      <ScrollZoomHero
        imageSrc="/anfisabanner.jpg"
        imageAlt="Contact hero"
      />

      <section
        className="relative py-24 md:py-32 px-4 md:px-8"
        style={{
          background: 'linear-gradient(to bottom left, #000000 0%, #18181b 50%, #000000 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
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
                  Wanna work with us?
                </h1>
              </CursorTiltFigure>

              <p className="text-2xl md:text-3xl font-light text-white/90 mb-8">
                Let<span className="font-fallback">&apos;</span>s turn ideas into impact.
              </p>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                Whether you have a clear vision or just a spark, we<span className="font-fallback">&apos;</span>re here to help shape it.
                Reach out and let<span className="font-fallback">&apos;</span>s create something that actually stands out.
              </p>
              <p className="text-lg font-semibold text-white/90 mb-10">
                Get in contact.
              </p>

              <div className="flex flex-wrap gap-4 md:gap-6 mb-12">
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
              <div className="flex justify-start">
                <PlanBFXText />
              </div>
            </div>

            {/* Columna derecha — Ready to move forward + form */}
            <div className="text-left">
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
          </div>

          {/* Common Questions: título grande izquierda, subtítulo pequeño, botón Get in touch, preguntas a la derecha */}
          <div className="mt-24 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Common Questions
              </h2>
              <p className="text-sm md:text-base text-white/60 mb-8">
                Your questions answered simply and clearly.
              </p>
              <Link
                href="#contact-form"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-base"
              >
                Get in touch
              </Link>
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
                      +
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-4 pt-0">
                      <p className="text-white/70 leading-relaxed">{item.answer}</p>
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
