'use client';

import { forwardRef, useCallback, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import Hls from 'hls.js';

/**
 * Componente de video que soporta HLS (.m3u8) en Firefox y otros navegadores
 * que no tienen soporte nativo. Usa hls.js para decodificar HLS vía Media Source Extensions.
 */
const HLSVideo = forwardRef<HTMLVideoElement, ComponentPropsWithoutRef<'video'>>(
  function HLSVideo({ src, className, style, ...videoProps }, ref) {
    const internalRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const setRef = useCallback(
      (el: HTMLVideoElement | null) => {
        internalRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLVideoElement | null>).current = el;
      },
      [ref]
    );

    useEffect(() => {
      const video = internalRef.current;
      const srcStr = typeof src === 'string' ? src : undefined;
      if (!video || !srcStr) return;

      const isHLS = srcStr.endsWith('.m3u8');

      if (isHLS) {
        // Safari soporta HLS nativo; usar src directo
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = srcStr;
          return;
        }

        // Firefox y otros: usar hls.js
        if (Hls.isSupported()) {
          const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: false,
          });
          hlsRef.current = hls;

          hls.loadSource(srcStr);
          hls.attachMedia(video);

          return () => {
            hls.destroy();
            hlsRef.current = null;
          };
        }
      }

      // MP4 u otros formatos: usar src nativo
      video.src = srcStr;
    }, [src]);

    return (
      <video
        ref={setRef}
        className={className}
        style={style}
        {...videoProps}
      />
    );
  }
);

export default HLSVideo;
