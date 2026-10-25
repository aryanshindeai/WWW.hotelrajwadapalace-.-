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
      {/* 1. Subtle top atmospheric gradient ensuring navigation & brandmark readability */}
      <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-gradient-to-b from-black/75 via-black/30 to-transparent" />

      {/* 2. Luminous cinematic radial vignette — keeps focal architecture glowing while focusing depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_20%,_rgba(0,0,0,0.42)_100%)]" />

      {/* 3. Bottom cinematic grounding gradient that provides contrast for CTAs and leads into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/40 to-transparent" />
    </div>
  );
};
