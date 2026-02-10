'use client';

import type { ReactNode } from 'react';

/** Characters that need font-fallback (not in main display font) */
const SPECIAL_CHARS = ["'", "'", '"', '"', '´', '`', '-', '–', '—', '@', '©', '+', '/', '′", '’'];

/**
 * Renders text with special characters wrapped in span.font-fallback
 * so they use the fallback font across the site.
 */
export default function Trans({ children }: { children: string }): ReactNode {
  if (typeof children !== 'string') return children;
  const parts: ReactNode[] = [];
  let key = 0;
  let run = '';
  for (const char of children) {
    if (SPECIAL_CHARS.includes(char)) {
      if (run) {
        parts.push(run);
        run = '';
      }
      parts.push(<span key={key++} className="font-fallback">{char}</span>);
    } else {
      run += char;
    }
  }
  if (run) parts.push(run);
  return parts.length <= 1 ? (parts[0] ?? children) : <>{parts.map((p, i) => <span key={i}>{p}</span>)}</>;
}
