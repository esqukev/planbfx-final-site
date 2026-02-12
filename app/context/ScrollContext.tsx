'use client';

import { createContext, useContext, useCallback } from 'react';

type ScrollToTopFn = () => void;

const ScrollContext = createContext<ScrollToTopFn | null>(null);

export function useScrollToTop() {
  const scrollToTop = useContext(ScrollContext);
  return scrollToTop ?? (() => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

export function ScrollProvider({
  scrollToTop,
  children,
}: {
  scrollToTop: ScrollToTopFn;
  children: React.ReactNode;
}) {
  return (
    <ScrollContext.Provider value={scrollToTop}>
      {children}
    </ScrollContext.Provider>
  );
}
