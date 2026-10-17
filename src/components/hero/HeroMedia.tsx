import React, { useState } from 'react';

export interface HeroImageSource {
  srcDesktop: string;
  srcMobile: string;
  alt: string;
  credit?: string;
}

interface HeroMediaProps {
  source: HeroImageSource;
  className?: string;
}

export const HeroMedia: React.FC<HeroMediaProps> = ({
  source,
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`absolute inset-0 overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Background base tone for smooth contrast prior to image hydration */}
      <div className="absolute inset-0 bg-charcoal-deep" />

      {/* Responsive Picture element providing separate mobile and desktop crops with WebP support */}
      <picture className="w-full h-full block">
        {/* Mobile WebP crop (below 768px) */}
        <source
          type="image/webp"
          media="(max-width: 767px)"
          srcSet="/images/rajwada-palace/verified/rajwada-gallery-facade-master-640.webp 640w, /images/rajwada-palace/verified/rajwada-gallery-facade-master-1080.webp 1080w"
          sizes="100vw"
        />
        {/* Desktop WebP cinematic crop (768px and above) */}
        <source
          type="image/webp"
          media="(min-width: 768px)"
          srcSet="/images/rajwada-palace/verified/rajwada-gallery-facade-master-1600.webp 1600w, /images/rajwada-palace/verified/rajwada-gallery-facade-master-1080.webp 1080w"
          sizes="100vw"
        />
        {/* Mobile vertical crop fallback (below 768px) */}
        <source
          media="(max-width: 767px)"
          srcSet={source.srcMobile}
        />
        {/* Desktop panoramic/cinematic crop fallback (768px and above) */}
        <source
          media="(min-width: 768px)"
          srcSet={source.srcDesktop}
        />
        <img
          src={source.srcDesktop}
          alt={source.alt}
          width={1024}
          height={683}
          fetchPriority="high"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-[center_35%] md:object-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded ? 'opacity-100 animate-hero-media' : 'opacity-0 scale-105'
          }`}
        />
      </picture>
    </div>
  );
};
