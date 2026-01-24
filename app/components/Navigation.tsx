'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Works', href: '/works' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="relative h-12 w-32 cursor-pointer hover:opacity-80 transition-opacity"
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
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white hover:text-zinc-300 transition-colors text-sm uppercase tracking-wider"
            >
              {item.label}
            </Link>
          ))}
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
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-zinc-800">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
