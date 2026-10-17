import React from 'react';

interface HeroOverlayProps {
  className?: string;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Top subtle gradient: preserves floating navigation bar and crest readability */}
      <div className="absolute inset-x-0 top-0 h-36 sm:h-44 bg-gradient-to-b from-[#101317]/85 via-[#101317]/35 to-transparent" />

      {/* 2. Desktop editorial asymmetric left gradient: provides crystal-clear legibility for headline and CTAs while preserving facade illumination in center/right */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-[#101317]/88 via-[#101317]/40 to-transparent" />

      {/* 3. Tablet left gradient (medium devices) */}
      <div className="hidden md:block lg:hidden absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#101317]/88 via-[#101317]/55 to-transparent" />

      {/* 4. Mobile bottom-to-top gradient: anchors typography and CTAs on small viewports */}
      <div className="md:hidden absolute inset-x-0 bottom-0 h-[82%] bg-gradient-to-t from-[#101317]/95 via-[#101317]/70 to-transparent" />

      {/* 5. Delicate warm champagne gold ambient reflection mimicking palace illumination */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-radial from-[#C7A66B]/12 via-[#C7A66B]/0 to-transparent blur-3xl opacity-60" />

      {/* 6. Seamless bottom fade into page body */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#101317] to-transparent" />

      {/* 7. Restrained analog grain overlay */}
      <div className="absolute inset-0 hero-grain-overlay opacity-25" />
    </div>
  );
};
