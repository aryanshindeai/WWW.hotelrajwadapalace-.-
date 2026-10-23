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
      <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-[#101317]/70 via-[#101317]/20 to-transparent" />

      {/* 2. Desktop editorial asymmetric left gradient: clear legibility for headline while letting ultra 8K lighting and architecture shine */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-[#101317]/70 via-[#101317]/25 to-transparent" />

      {/* 3. Tablet left gradient (medium devices) */}
      <div className="hidden md:block lg:hidden absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#101317]/70 via-[#101317]/30 to-transparent" />

      {/* 4. Mobile bottom-to-top gradient: balanced anchor for typography without dulling the image */}
      <div className="md:hidden absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#101317]/85 via-[#101317]/35 to-transparent" />

      {/* 5. Seamless bottom fade into page body */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#101317] to-transparent" />
    </div>
  );
};
