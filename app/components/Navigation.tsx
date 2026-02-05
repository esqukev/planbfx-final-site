'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    // Works oculto por ahora (sin contenido)
    { label: 'Contact', href: '/contact' },
  ];

  const blurClass = scrolled || isMenuOpen
    ? 'backdrop-blur-xl bg-black/40 shadow-[0_20px_40px_rgba(0,0,0,0.25)]'
    : 'backdrop-blur-0 bg-transparent';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-3 px-3 md:pt-4 md:px-4">
      {/* Blur solo a izquierda (logo) y derecha (links), no en el centro */}
      <div className="w-full rounded-2xl flex overflow-hidden transition-all duration-700 ease-out">
        {/* Zona izquierda con blur */}
        <div
          className={`flex items-center shrink-0 rounded-l-2xl pl-4 md:pl-8 py-4 pr-6 md:pr-8 transition-all duration-700 ${blurClass}`}
        >
          <Link
            href="/"
            className="relative h-12 w-32 cursor-pointer hover:opacity-80 transition-opacity block"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
        </div>
        {/* Centro sin blur */}
        <div className="flex-1 min-w-0" />
        {/* Zona derecha con blur (desktop) */}
        <div
          className={`hidden md:flex items-center gap-8 lg:gap-12 shrink-0 rounded-r-2xl pr-8 lg:pr-12 xl:pr-16 py-4 pl-6 transition-all duration-700 ${blurClass}`}
        >
          {menuItems.map((item) => {
            const isActive = pathname === '/' ? item.href === '/' : (pathname === item.href || (pathname !== '/' && pathname.startsWith(item.href + '/')));
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative flex flex-col items-center text-white hover:text-zinc-300 transition-colors text-sm uppercase tracking-wider py-1"
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-px bg-white shrink-0 nav-indicator"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </div>
        {/* Mobile: hamburger con blur */}
        <div className={`flex md:hidden items-center shrink-0 rounded-r-2xl py-4 pl-4 pr-4 transition-all duration-700 ${blurClass}`}>
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className={`relative z-10 md:hidden rounded-b-2xl overflow-hidden transition-all duration-700 ${blurClass}`}>
          {menuItems.map((item) => {
            const isActive = pathname === '/' ? item.href === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm uppercase tracking-wider ${isActive ? 'text-white bg-white/10' : 'text-white/90 hover:text-white hover:bg-white/5'} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {isActive && (
                  <span className="w-1.5 h-px bg-white shrink-0 nav-indicator" aria-hidden />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
