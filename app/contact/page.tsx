'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CursorTiltFigure from '../components/CursorTiltFigure';
import VantaHalo from '../components/VantaHalo';
import ImageHero from '../components/ImageHero';
import HyperSpaceBackground from '../components/HyperSpaceBackground';
import { useLanguage } from '../context/LanguageContext';

const FAQ_ITEMS = [
  { questionKey: 'contact.faq1q', answerKey: 'contact.faq1a' },
  { questionKey: 'contact.faq2q', answerKey: 'contact.faq2a' },
  { questionKey: 'contact.faq3q', answerKey: 'contact.faq3a' },
  { questionKey: 'contact.faq4q', answerKey: 'contact.faq4a' },
  { questionKey: 'contact.faq5q', answerKey: 'contact.faq5a' },
];

export default function ContactPage() {
  const { t, tf } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setFormErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (form: HTMLFormElement): boolean => {
    const data = new FormData(form);
    const errors: Record<string, string> = {};
    const name = (data.get('name') as string)?.trim();
    const company = (data.get('company') as string)?.trim();
    const city = (data.get('city') as string)?.trim();
    const country = (data.get('country') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const phone = (data.get('phone') as string)?.trim();
    const details = (data.get('details') as string)?.trim();
    if (!name) errors.name = t('contact.validation.name');
    if (!company) errors.company = t('contact.validation.company');
    if (!city) errors.city = t('contact.validation.city');
    if (!country) errors.country = t('contact.validation.country');
    if (!email) errors.email = t('contact.validation.email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t('contact.validation.emailInvalid');
    if (!phone) errors.phone = t('contact.validation.phone');
    if (!details) errors.details = t('contact.validation.details');
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact-form') {
      const el = document.getElementById('contact-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const inputBase = 'w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition font-fallback';
  const inputError = 'border-red-500/60 focus:ring-red-500/40';

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden overflow-y-auto">
      <Navigation />
      <ImageHero imageSrc="/letyago.jpg" imageAlt="Contact" />

      <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-x-hidden min-h-screen">
        <HyperSpaceBackground />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="text-left">
              <CursorTiltFigure className="mb-12 flex justify-start" maxTilt={36} perspective={1000}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {tf('contact.title')}
                </h1>
              </CursorTiltFigure>
              <p className="text-2xl md:text-3xl font-light text-white/90 mb-8">{tf('contact.subtitle')}</p>
              <p className="text-lg text-white/70 leading-relaxed mb-6 text-justify">{t('contact.intro')}</p>
              <p className="text-lg font-semibold text-white/90 mb-10">{t('contact.getInContact')}</p>

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

              {/* VantaHalo just below buttons, 25% larger, no clipping */}
              <div className="flex justify-center w-full overflow-visible mt-8 md:mt-10 py-6">
                <div className="relative w-full max-w-2xl min-h-[480px] overflow-visible rounded-2xl">
                  <VantaHalo
                    logoSrc="/logos/Property-1-Variant4.svg"
                    className="min-h-[480px] w-full bg-transparent overflow-visible"
                  />
                </div>
              </div>
            </div>

            <div id="contact-form" className="text-left scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('contact.readyTitle')}</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-4">{t('contact.readyDesc1')}</p>
              <p className="text-lg text-white/70 leading-relaxed mb-8">{t('contact.readyDesc2')}</p>

              <form
                noValidate
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  validate(e.currentTarget);
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
                    className={`${inputBase} ${formErrors.name ? inputError : 'border-white/20'}`}
                    placeholder={t('contact.name')}
                    onBlur={() => clearError('name')}
                    onChange={() => clearError('name')}
                  />
                  {formErrors.name && (
                    <p className="mt-1.5 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm px-2 py-1" role="alert">
                      {formErrors.name}
                    </p>
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
                    className={`${inputBase} ${formErrors.company ? inputError : 'border-white/20'}`}
                    placeholder={t('contact.company')}
                    onBlur={() => clearError('company')}
                    onChange={() => clearError('company')}
                  />
                  {formErrors.company && (
                    <p className="mt-1.5 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm px-2 py-1" role="alert">
                      {formErrors.company}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.city')}
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className={`${inputBase} ${formErrors.city ? inputError : 'border-white/20'}`}
                    placeholder={t('contact.city')}
                    onBlur={() => clearError('city')}
                    onChange={() => clearError('city')}
                  />
                  {formErrors.city && (
                    <p className="mt-1.5 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm px-2 py-1" role="alert">
                      {formErrors.city}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.country')}
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    className={`${inputBase} ${formErrors.country ? inputError : 'border-white/20'}`}
                    placeholder={t('contact.country')}
                    onBlur={() => clearError('country')}
                    onChange={() => clearError('country')}
                  />
                  {formErrors.country && (
                    <p className="mt-1.5 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm px-2 py-1" role="alert">
                      {formErrors.country}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.phone')}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`${inputBase} ${formErrors.phone ? inputError : 'border-white/20'}`}
                    placeholder="+1 555 123 4567"
                    onBlur={() => clearError('phone')}
                    onChange={() => clearError('phone')}
                  />
                  {formErrors.phone && (
                    <p className="mt-1.5 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm px-2 py-1" role="alert">
                      {formErrors.phone}
                    </p>
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
                    className={`${inputBase} ${formErrors.email ? inputError : 'border-white/20'}`}
                    placeholder="you@example.com"
                    onBlur={() => clearError('email')}
                    onChange={() => clearError('email')}
                  />
                  {formErrors.email && (
                    <p className="mt-1.5 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm px-2 py-1" role="alert">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-white/80 mb-2">
                    {t('contact.details')}
                  </label>
                  <p className="text-xs text-white/50 mb-2">{t('contact.detailsHint')}</p>
                  <textarea
                    id="details"
                    name="details"
                    rows={6}
                    className={`${inputBase} resize-y min-h-[140px] ${formErrors.details ? inputError : 'border-white/20'}`}
                    placeholder={t('contact.details')}
                    onBlur={() => clearError('details')}
                    onChange={() => clearError('details')}
                  />
                  {formErrors.details && (
                    <p className="mt-1.5 text-sm text-red-400 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm px-2 py-1" role="alert">
                      {formErrors.details}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition-all duration-300 ease-out hover:scale-[1.03] text-base"
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
              <p className="text-sm md:text-base text-white/60 mb-8">{t('contact.faqSubtitle')}</p>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-white font-medium hover:bg-white/5 transition-colors"
                  >
                    <span>{t(item.questionKey)}</span>
                    <span className={`shrink-0 w-6 h-6 flex items-center justify-center text-white/80 text-lg font-light transition-transform ${openFaq === index ? 'rotate-45' : ''}`}>
                      <span className="font-fallback" aria-hidden>+</span>
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-4 pt-0">
                      <p className="text-white/70 leading-relaxed text-justify">{t(item.answerKey)}</p>
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
