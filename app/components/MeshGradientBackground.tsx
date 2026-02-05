'use client';

/**
 * Mesh gradient background: soft moving gradient blobs.
 * Adapted from ShaderLabs-style mesh gradient (uColor1-4, uSpeed).
 * Colors: dark gray (#0d0d0d), light gray (#b5b5b5), dark, warm dark (#120d07).
 */
export default function MeshGradientBackground({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: '#0d0d0d' }}
      aria-hidden
    >
      {/* Blobs suaves animados con radial-gradient */}
      <div
        className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] opacity-40 animate-mesh-blob-1"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(181,181,181,0.35) 0%, transparent 50%)',
        }}
      />
      <div
        className="absolute w-[100%] h-[100%] top-0 right-0 opacity-30 animate-mesh-blob-2"
        style={{
          background: 'radial-gradient(circle at 70% 70%, rgba(13,13,13,0.9) 0%, transparent 45%)',
        }}
      />
      <div
        className="absolute w-[110%] h-[110%] -top-[5%] left-1/2 -translate-x-1/2 opacity-35 animate-mesh-blob-3"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(18,13,7,0.6) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute w-[80%] h-[80%] bottom-0 left-0 opacity-25 animate-mesh-blob-4"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(181,181,181,0.2) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
