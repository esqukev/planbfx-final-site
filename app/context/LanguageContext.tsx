'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type Lang = 'en' | 'es';

type LanguageContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
};

const translations: Record<Lang, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.langToEs': 'Español',
    'nav.langToEn': 'English',
    'contact.title': 'Want to work with us?',
    'contact.subtitle': "Let's turn ideas into impact.",
    'contact.intro': "Whether you have a clear vision or just a spark, we're here to help shape it. Reach out and let's create something that actually stands out.",
    'contact.getInContact': 'Get in contact.',
    'contact.readyTitle': 'Ready to move forward?',
    'contact.readyDesc1': 'This form is designed for clients who already have a clear vision, goals, and references. The more detail you provide, the faster and more accurately we can move forward.',
    'contact.readyDesc2': 'Book a meeting and walk us through your ideas and expectations.',
    'contact.name': 'Name',
    'contact.company': 'Company or event name',
    'contact.city': 'City',
    'contact.country': 'Country',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email',
    'contact.details': 'Details',
    'contact.detailsHint': 'If not enough details are provided we could not consider your inquiry',
    'contact.send': 'Send',
    'contact.faqTitle': 'Frequently Asked Questions',
    'contact.faqSubtitle': 'Your questions answered simply and clearly.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'nav.langToEs': 'Español',
    'nav.langToEn': 'English',
    'contact.title': '¿Quieres trabajar con nosotros?',
    'contact.subtitle': 'Convirtamos ideas en impacto.',
    'contact.intro': 'Tengas una visión clara o solo una chispa, estamos aquí para darle forma. Escríbenos y creemos algo que realmente destaque.',
    'contact.getInContact': 'Ponte en contacto.',
    'contact.readyTitle': '¿Listo para avanzar?',
    'contact.readyDesc1': 'Este formulario está pensado para clientes que ya tienen una visión, objetivos y referencias claras. Cuantos más detalles nos des, más rápido y mejor podremos avanzar.',
    'contact.readyDesc2': 'Reserva una reunión y cuéntanos tus ideas y expectativas.',
    'contact.name': 'Nombre',
    'contact.company': 'Empresa o nombre del evento',
    'contact.city': 'Ciudad',
    'contact.country': 'País',
    'contact.phone': 'Teléfono',
    'contact.email': 'Correo electrónico',
    'contact.details': 'Detalles',
    'contact.detailsHint': 'Si no se proporcionan suficientes detalles no podremos considerar tu consulta',
    'contact.send': 'Enviar',
    'contact.faqTitle': 'Preguntas frecuentes',
    'contact.faqSubtitle': 'Tus dudas resueltas de forma clara.',
  },
};

const defaultLang: Lang = 'en';

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'planbfx-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === 'en' || stored === 'es') setLangState(stored);
    } catch (_) {}
    setMounted(true);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      if (typeof document !== 'undefined') document.documentElement.lang = next === 'es' ? 'es' : 'en';
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';
  }, [mounted, lang]);

  const t = useCallback(
    (key: string) => {
      const map = translations[lang];
      return map[key] ?? translations.en[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: 'en',
      setLang: () => {},
      t: (k: string) => translations.en[k] ?? k,
    };
  }
  return ctx;
}
