'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CursorTiltFigure from '../components/CursorTiltFigure';
import VantaHalo from '../components/VantaHalo';
import ImageHero from '../components/ImageHero';
import HyperSpaceBackground from '../components/HyperSpaceBackground';
import Trans from '../components/Trans';
import { useLanguage } from '../context/LanguageContext';

const VALIDATION: Record<string, string> = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email address.',
  phone: 'Please enter your phone number.',
  details: 'Please provide details about your inquiry.',
};

const FAQ_KEYS = [
  { q: 'contact.faq1q', a: 'contact.faq1a' },
  { q: 'contact.faq2q', a: 'contact.faq2a' },
  { q: 'contact.faq3q', a: 'contact.faq3a' },
  { q: 'contact.faq4q', a: 'contact.faq4a' },
  { q: 'contact.faq5q', a: 'contact.faq5a' },
] as const;

export default function ContactPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [modal, setModal] = useState<'errors' | 'success' | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (form: HTMLFormElement): boolean => {
    const d = new FormData(form);
    const list: string[] = [];
    if (!(d.get('name') as string)?.trim()) list.push(VALIDATION.name);
    if (!(d.get('phone') as string)?.trim()) list.push(VALIDATION.phone);
    const email = (d.get('email') as string)?.trim();
    if (!email) list.push(VALIDATION.email);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) list.push(VALIDATION.email);
    if (!(d.get('details') as string)?.trim()) list.push(VALIDATION.details);
    setErrors(list);
    if (list.length) setModal('errors');
    return list.length === 0;
  };

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

      <section className="relative py-24 md:py-32 px-4 md:px-8 min-h-screen">
        <HyperSpaceBackground />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
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
                <Trans>{t('contact.intro')}</Trans>
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
              <div className="mt-10 flex justify-start w-full overflow-visible py-6">
                <div className="w-full max-w-2xl overflow-visible" style={{ minHeight: 480 }}>
                  <VantaHalo logoSrc="/logos/Property-1-Variant4.svg" className="min-h-[480px] w-full bg-transparent overflow-visible" logoClassName="w-40 h-20 sm:w-52 sm:h-28 md:w-60 md:h-30" />
                </div>
              </div>
            </div>

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
                  if (validate(e.currentTarget)) setModal('success');
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
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback"
                    placeholder="Your name"
                  />
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
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback"
                    placeholder="+1 555 123 4567"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.email')}
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
                    {t('contact.details')}
                  </label>
                  <p className="text-xs text-white/50 mb-2">
                    {t('contact.detailsHint')}
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
                  {t('contact.send')}
                </button>
              </form>
            </div>
          </div>

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
              {FAQ_KEYS.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-white font-medium hover:bg-white/5 transition-colors"
                  >
                    <span>{t(item.q)}</span>
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
                      <p className="text-white/70 leading-relaxed text-justify">{t(item.a)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {modal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md bg-black/40"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="rounded-2xl border border-white/10 bg-black/70 shadow-2xl max-w-md w-full p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modal-title" className="text-xl font-bold text-white mb-4">
              {modal === 'errors' ? t('contact.modalErrorsTitle') : t('contact.modalSuccessTitle')}
            </h3>
            {modal === 'errors' ? (
              <>
                <p className="text-white/80 mb-3">{t('contact.modalErrorsIntro')}</p>
                <ul className="list-disc list-inside text-red-300/90 space-y-1 mb-6">
                  {errors.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-white/80 mb-6">
                {t('contact.modalSuccessMessage')}
              </p>
            )}
            <button
              type="button"
              onClick={() => setModal(null)}
              className="w-full md:w-auto px-6 py-3 rounded-full border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition-all"
            >
              {t('contact.modalClose')}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
