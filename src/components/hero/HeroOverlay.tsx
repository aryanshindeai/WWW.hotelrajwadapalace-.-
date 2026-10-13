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
      {/* 1. Top gradient: preserves floating navigation bar and crest readability */}
      <div className="absolute inset-x-0 top-0 h-44 sm:h-56 bg-gradient-to-b from-charcoal-deep/85 via-charcoal-deep/40 to-transparent" />

      {/* 2. Editorial asymmetric lower-left gradient: anchors typography and actions with crystal clarity */}
      <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-charcoal-deep/95 via-charcoal-deep/60 to-transparent" />

      {/* 3. Horizontal edge gradient: adds subtle side shadow for desktop typography */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-charcoal-deep/80 via-charcoal-deep/30 to-transparent" />

      {/* 4. Delicate warm gold ambient reflection reflecting hotel's architectural lighting */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-radial from-gold/10 via-gold/0 to-transparent blur-3xl opacity-60" />

      {/* 5. Seamless bottom fade into page body */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal to-transparent" />

      {/* 6. Restrained analog grain overlay */}
      <div className="absolute inset-0 hero-grain-overlay opacity-50" />
    </div>
  );
};
