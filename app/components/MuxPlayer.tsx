'use client';

import { useEffect } from 'react';

type MuxPlayerProps = {
  playbackId: string;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: 'cover' | 'contain';
  /** When true, video fills viewport (no black bars) - for hero/banner */
  fillViewport?: boolean;
};

function getPlaybackIdFromUrl(url: string): string | null {
  const match = url.match(/player\.mux\.com\/([^/?]+)/);
  return match ? match[1] : null;
}

export function getMuxPlaybackId(urlOrId: string): string | null {
  if (urlOrId.includes('player.mux.com')) {
    return getPlaybackIdFromUrl(urlOrId);
  }
  return urlOrId;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mux-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'playback-id'?: string;
          autoplay?: string;
          muted?: boolean;
          loop?: boolean;
          'stream-type'?: string;
          'video-title'?: string;
          theme?: string;
        },
        HTMLElement
      >;
    }
  }
}

const HIDE_ALL_CONTROLS = {
  '--controls': 'none',
  '--center-controls': 'none',
  '--play-button': 'none',
  '--loading-indicator': 'none',
  '--dialog': 'none',
  '--time-range': 'none',
  '--seek-backward-button': 'none',
  '--seek-forward-button': 'none',
  '--mute-button': 'none',
  '--captions-button': 'none',
  '--airplay-button': 'none',
  '--pip-button': 'none',
  '--fullscreen-button': 'none',
  '--cast-button': 'none',
  '--playback-rate-button': 'none',
  '--volume-range': 'none',
  '--time-display': 'none',
  '--duration-display': 'none',
  '--rendition-menu-button': 'none',
} as React.CSSProperties;

export default function MuxPlayer({ playbackId, className = '', style = {}, objectFit = 'cover', fillViewport = false }: MuxPlayerProps) {
  useEffect(() => {
    import('@mux/mux-player');
  }, []);

  const baseStyle = {
    width: '100%',
    height: '100%',
    aspectRatio: 'auto',
    maxWidth: 'none',
    '--media-object-fit': objectFit,
    ...HIDE_ALL_CONTROLS,
    ...style,
  } as React.CSSProperties;

  if (fillViewport) {
    Object.assign(baseStyle, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      minWidth: '100%',
      minHeight: '100%',
      width: 'auto',
      height: 'auto',
      aspectRatio: 'auto',
      transform: 'translate(-50%, -50%)',
    });
  }

  return (
    <mux-player
      playback-id={playbackId}
      autoplay="muted"
      muted
      loop
      stream-type="on-demand"
      video-title=""
      className={className}
      style={baseStyle}
    />
  );
}
