'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CursorTiltFigure from '../components/CursorTiltFigure';
import VantaHalo from '../components/VantaHalo';
import ImageHero from '../components/ImageHero';
import HyperSpaceBackground from '../components/HyperSpaceBackground';
import { useLanguage } from '../context/LanguageContext';

const VALIDATION_MESSAGES = {
  nameRequired: 'Please enter your name.',
  emailRequired: 'Please enter your email address.',
  emailInvalid: 'Please enter a valid email address.',
  phoneRequired: 'Please enter your phone number.',
  detailsRequired: 'Please provide details about your inquiry.',
};

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
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateForm = (form: HTMLFormElement): boolean => {
    const data = new FormData(form);
    const errors: Record<string, string> = {};
    const name = (data.get('name') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const phone = (data.get('phone') as string)?.trim();
    const details = (data.get('details') as string)?.trim();
    if (!name) errors.name = VALIDATION_MESSAGES.nameRequired;
    if (!email) errors.email = VALIDATION_MESSAGES.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = VALIDATION_MESSAGES.emailInvalid;
    if (!phone) errors.phone = VALIDATION_MESSAGES.phoneRequired;
    if (!details) errors.details = VALIDATION_MESSAGES.detailsRequired;
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Scroll to form when entering with #contact-form
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
                  {t('contact.title')}
                </h1>
              </CursorTiltFigure>

              <p className="text-2xl md:text-3xl font-light text-white/90 mb-8">
                {t('contact.subtitle')}
              </p>
              <p className="text-lg text-white/70 leading-relaxed mb-6 text-justify">
                {t('contact.intro')}
              </p>
              <p className="text-lg font-semibold text-white/90 mb-10">
                {t('contact.getInContact')}
              </p>

              <div className="flex flex-wrap gap-4 md:gap-6">
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
            </div>

            {/* VantaHalo centered below contact block, ~25% larger, unclipped */}
            <div className="lg:col-span-2 flex justify-center w-full overflow-visible mt-12 lg:mt-16 py-8">
              <div className="relative w-full max-w-2xl min-h-[525px] overflow-visible">
                <VantaHalo logoSrc="/logos/Property-1-Variant4.svg" className="min-h-[525px] w-full max-w-full bg-transparent overflow-visible" />
              </div>
            </div>

            {/* Columna derecha — Ready to move forward + form */}
            <div id="contact-form" className="text-left scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {t('contact.readyTitle')}
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-4">
                {t('contact.readyDesc1')}
              </p>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                {t('contact.readyDesc2')}
              </p>

              <form
                noValidate
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const valid = validateForm(e.currentTarget);
                  if (valid) {
                    // Form is valid; handle submit (e.g. send to API) here
                  }
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback ${formErrors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-white/20'}`}
                    placeholder="Your name"
                    onBlur={() => clearError('name')}
                    onChange={() => clearError('name')}
                  />
                  {formErrors.name && (
                    <p className="mt-1.5 text-sm font-medium text-red-400" role="alert">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.company')}
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
                    {t('contact.city')}
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
                    {t('contact.country')}
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
                    {t('contact.phone')}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback ${formErrors.phone ? 'border-red-500 focus:ring-red-500/50' : 'border-white/20'}`}
                    placeholder="+1 555 123 4567"
                    onBlur={() => clearError('phone')}
                    onChange={() => clearError('phone')}
                  />
                  {formErrors.phone && (
                    <p className="mt-1.5 text-sm font-medium text-red-400" role="alert">{formErrors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback ${formErrors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-white/20'}`}
                    placeholder="you@example.com"
                    onBlur={() => clearError('email')}
                    onChange={() => clearError('email')}
                  />
                  {formErrors.email && (
                    <p className="mt-1.5 text-sm font-medium text-red-400" role="alert">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.details')}
                  </label>
                  <p className="text-xs text-white/50 mb-2">
                    {t('contact.detailsHint')}
                  </p>
                  <textarea
                    id="details"
                    name="details"
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl bg-white/10 border resize-y min-h-[140px] font-fallback text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition ${formErrors.details ? 'border-red-500 focus:ring-red-500/50' : 'border-white/20'}`}
                    placeholder="Describe your project, goals, timeline, and any references or mood boards..."
                    onBlur={() => clearError('details')}
                    onChange={() => clearError('details')}
                  />
                  {formErrors.details && (
                    <p className="mt-1.5 text-sm font-medium text-red-400" role="alert">{formErrors.details}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
                >
                  {t('contact.send')}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ: título grande izquierda, subtítulo pequeño, preguntas a la derecha */}
          <div className="mt-24 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {t('contact.faqTitle')}
              </h2>
              <p className="text-sm md:text-base text-white/60 mb-8">
                {t('contact.faqSubtitle')}
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
