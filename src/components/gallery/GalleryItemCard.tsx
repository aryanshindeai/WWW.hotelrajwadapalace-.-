import React, { useState } from 'react';
import { type GalleryItem } from '../../data/galleryData';

interface GalleryItemCardProps {
  item: GalleryItem;
  index: number;
  onOpenLightbox: (index: number) => void;
  className?: string;
  colSpanClass?: string;
}

export const GalleryItemCard: React.FC<GalleryItemCardProps> = ({
  item,
  index,
  onOpenLightbox,
  className = '',
  colSpanClass = 'md:col-span-6 lg:col-span-4',
}) => {
  const [loaded, setLoaded] = useState(false);

  // Responsive aspect ratio based on layout role & orientation
  const getAspectClass = () => {
    if (colSpanClass.includes('col-span-12')) {
      return 'aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[260px] sm:min-h-[360px] lg:min-h-[440px]';
    }
    if (item.orientation === 'portrait') {
      return 'aspect-[3/4] sm:aspect-[4/5] min-h-[300px] sm:min-h-[380px]';
    }
    if (colSpanClass.includes('col-span-7') || colSpanClass.includes('col-span-8')) {
      return 'aspect-[16/10] sm:aspect-[16/11] lg:aspect-[16/10] min-h-[260px] sm:min-h-[320px]';
    }
    if (colSpanClass.includes('col-span-6')) {
      return 'aspect-[16/10] sm:aspect-[16/11] min-h-[240px] sm:min-h-[290px]';
    }
    return 'aspect-[4/3] sm:aspect-[16/11] min-h-[220px] sm:min-h-[260px]';
  };

  return (
    <figure
      className={`group relative overflow-hidden bg-charcoal-deep rounded-xl border border-white/10 hover:border-gold/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.55)] transition-all duration-500 select-none ${colSpanClass} ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpenLightbox(index)}
        className="w-full h-full block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-deep cursor-pointer"
        aria-label={`View ${item.title} in full screen`}
      >
        <div className={`relative w-full ${getAspectClass()} overflow-hidden`}>
          {/* Skeleton Placeholder */}
          <div
            className={`absolute inset-0 bg-charcoal-muted/30 transition-opacity duration-700 ${
              loaded ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'
            }`}
            aria-hidden="true"
          />

          {/* Picture element with WebP + JPG fallback */}
          <picture className="w-full h-full block">
            <source
              type="image/webp"
              srcSet={item.srcDesktop.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
            />
            <source media="(max-width: 767px)" srcSet={item.srcMobile} />
            <source media="(min-width: 768px)" srcSet={item.srcDesktop} />
            <img
              src={item.srcDesktop}
              alt={item.alt}
              width={1280}
              height={853}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'
              } group-hover:scale-[1.03] group-hover:brightness-[1.02] motion-reduce:group-hover:scale-100`}
            />
          </picture>

          {/* Top-Left Architectural Badge */}
          <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10 px-2.5 py-1 rounded-full bg-charcoal-deep/85 backdrop-blur-md border border-white/10 group-hover:border-gold/30 text-ivory text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
            <span>{item.code} · {item.categoryLabel}</span>
          </div>

          {/* Top-Right Inspect Action Badge */}
          <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 px-2.5 py-1 rounded-full bg-charcoal-deep/90 backdrop-blur-md border border-gold/50 text-gold text-[10px] font-cinzel tracking-[0.15em] uppercase flex items-center gap-1 shadow-lg">
            <svg
              className="w-3 h-3 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            <span>View ↗</span>
          </div>

          {/* Bottom Vignette & Title Information */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#080B0E]/95 via-[#080B0E]/65 to-transparent pt-12 pb-3.5 px-3.5 sm:px-5 flex flex-col justify-end pointer-events-none">
            <h3 className="font-serif text-base sm:text-lg lg:text-xl text-ivory group-hover:text-gold transition-colors duration-300 font-light leading-snug line-clamp-1">
              {item.title}
            </h3>
            {item.caption && (
              <p className="text-[11px] sm:text-xs text-sand/80 font-sans tracking-wide line-clamp-1 mt-0.5">
                {item.caption}
              </p>
            )}

            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 text-[9px] sm:text-[10px] font-mono text-sand/60">
              <span className="tracking-wider uppercase">Chandrapur, Maharashtra</span>
              <span className="text-gold/80 tracking-widest uppercase">Verified Property</span>
            </div>
          </div>
        </div>
      </button>
    </figure>
  );
};
