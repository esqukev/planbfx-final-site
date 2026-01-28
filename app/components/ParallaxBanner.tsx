'use client';

type ParallaxBannerProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ParallaxBanner({
  title = "We don't just create visuals — we craft moments that move",
  subtitle = "Where art become experiences",
  className = '',
}: ParallaxBannerProps) {
  return (
    <section
      className={`relative min-h-[50vh] flex items-center justify-center overflow-hidden m-0 p-0 border-0 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16 md:py-20">
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 md:mb-6">
          {title}
        </p>
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
