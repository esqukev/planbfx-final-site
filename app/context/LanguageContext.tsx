'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { translations as translationsMap, SPECIAL_CHARS } from './translations';

export type Lang = 'en' | 'es';

type LanguageContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: (key: string) => string;
  /** Render translated string with special chars in font-fallback */
  tf: (key: string) => ReactNode;
};

const translations = translationsMap;

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

  const tf = useCallback(
    (key: string): ReactNode => {
      const str = t(key);
      const parts: ReactNode[] = [];
      let keyIdx = 0;
      let run = '';
      for (const char of str) {
        if (SPECIAL_CHARS.includes(char)) {
          if (run) {
            parts.push(run);
            run = '';
          }
          parts.push(React.createElement('span', { key: keyIdx++, className: 'font-fallback' }, char));
        } else {
          run += char;
        }
      }
      if (run) parts.push(run);
      return parts.length <= 1 ? (parts[0] ?? '') : React.createElement(React.Fragment, null, ...parts);
    },
    [t]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tf }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    const t = (k: string) => translations.en[k] ?? k;
    return {
      lang: 'en',
      setLang: () => {},
      t,
      tf: (k: string) => t(k),
    };
  }
  return ctx;
}
