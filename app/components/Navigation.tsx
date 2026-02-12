'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { useScrollToTop } from '../context/ScrollContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.about', href: '/about' },
    { labelKey: 'nav.services', href: '/services' },
    { labelKey: 'nav.contact', href: '/contact' },
  ];

  // Desktop: active = exact match for Home, otherwise path matches or starts with href
  const isActiveDesktop = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  // Mobile: same logic — solo iluminar la página actual, sin rayita
  const isActiveMobile = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-3 px-3 md:pt-4 md:px-4">
      {/* Mobile: overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-[45] md:hidden bg-transparent"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      {/* Blur bar: una sola barra con blur */}
      <div
        className={`relative z-50
          w-full rounded-2xl
          transition-all duration-700 ease-out
          ${scrolled || isMenuOpen
            ? 'backdrop-blur-xl bg-black/40 shadow-[0_20px_40px_rgba(0,0,0,0.25)]'
            : 'backdrop-blur-0 bg-transparent'
          }
        `}
      >
        <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="relative h-12 w-32 cursor-pointer hover:opacity-80 transition-opacity block"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                scrollToTop();
              }
            }}
          >
            <Image
              src="/planb-logo.svg"
              alt="PlanB FX"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {menuItems.map((item) => (
              <Link
                key={item.labelKey}
                href={item.href}
                className="relative flex flex-col items-center text-white hover:text-zinc-300 transition-colors text-sm uppercase tracking-wider py-1"
                onClick={(e) => {
                  if (isActiveDesktop(item.href)) {
                    e.preventDefault();
                    scrollToTop();
                  }
                }}
              >
                {t(item.labelKey)}
                {isActiveDesktop(item.href) && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-px bg-white shrink-0 nav-indicator"
                    aria-hidden
                  />
                )}
              </Link>
            ))}
            <div className="flex items-center gap-1 text-white/80">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`text-xs uppercase tracking-wider py-1 transition-colors cursor-pointer ${lang === 'en' ? 'text-white font-semibold' : 'hover:text-white'}`}
                title="English"
                aria-label="English"
              >
                EN
              </button>
              <span className="text-white/50 font-fallback" aria-hidden>|</span>
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`text-xs uppercase tracking-wider py-1 transition-colors cursor-pointer ${lang === 'es' ? 'text-white font-semibold' : 'hover:text-white'}`}
                title="Español"
                aria-label="Español"
              >
                ES
              </button>
            </div>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile: solo iluminar la página actual, sin rayita */}
        {isMenuOpen && (
          <div className="relative z-10 md:hidden rounded-b-2xl">
            {menuItems.map((item) => (
              <Link
                key={item.labelKey}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm uppercase tracking-wider transition-colors ${
                  isActiveMobile(item.href) ? 'text-white bg-white/10' : 'text-white/90 hover:text-white hover:bg-white/5'
                }`}
                onClick={(e) => {
                  if (isActiveMobile(item.href)) {
                    e.preventDefault();
                    scrollToTop();
                  }
                  setIsMenuOpen(false);
                }}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-4 py-3">
              <button
                type="button"
                onClick={() => { setLang('en'); setIsMenuOpen(false); }}
                className={`text-xs uppercase tracking-wider transition-colors cursor-pointer ${lang === 'en' ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-white/50 font-fallback" aria-hidden>|</span>
              <button
                type="button"
                onClick={() => { setLang('es'); setIsMenuOpen(false); }}
                className={`text-xs uppercase tracking-wider transition-colors cursor-pointer ${lang === 'es' ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}
              >
                ES
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
