import React from 'react';
import { HeroActions } from './HeroActions';

interface HeroContentProps {
  badge?: string;
  titlePart1?: string;
  titlePart2?: string;
  subtitle?: string;
  locationDetails?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  tertiaryLabel?: string;
  onBookRoom?: () => void;
  onExploreWeddings?: () => void;
  onExploreRooms?: () => void;
  onExploreDining?: () => void;
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  badge = 'WELCOME TO HOTEL RAJWADA PALACE',
  titlePart1 = 'HOTEL RAJWADA PALACE',
  titlePart2,
  subtitle = 'Where authentic royal warmth, palatial architecture, and memorable stays embrace you along Durgapur Road, Chandrapur.',
  primaryLabel = 'BOOK A ROOM',
  secondaryLabel = 'EXPLORE THE HOTEL',
  tertiaryLabel,
  onBookRoom,
  onExploreWeddings,
  onExploreRooms,
  onExploreDining,
  className = '',
}) => {
  return (
    <div
      className={`relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center select-text px-4 ${className}`}
    >
      {/* 1. Contextual Eyebrow / Category Tag */}
      {badge && (
        <div className="flex items-center justify-center gap-2.5 mb-3 sm:mb-4 animate-hero-reveal-1">
          <span className="w-5 sm:w-8 h-[1px] bg-[#C5A859]/70" aria-hidden="true" />
          <span className="font-cinzel tracking-[0.22em] sm:tracking-[0.26em] text-[10px] sm:text-xs text-[#C5A859] uppercase font-semibold">
            {badge}
          </span>
          <span className="w-5 sm:w-8 h-[1px] bg-[#C5A859]/70" aria-hidden="true" />
        </div>
      )}

      {/* 2. Classical Majestic Serif Headline matching The Grand Icon */}
      <h1 className="mb-3 sm:mb-4 animate-hero-reveal-2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
        <span className="block font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] tracking-[0.14em] font-normal leading-[1.12] uppercase text-white">
          <span>{titlePart1}</span>
          {titlePart2 && (
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.16em] mt-1 text-white/95">
              {titlePart2}
            </span>
          )}
        </span>
      </h1>

      {/* 3. Refined Supporting Subtitle */}
      {subtitle && (
        <div className="mb-6 sm:mb-8 max-w-2xl mx-auto animate-hero-reveal-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          <p className="text-white/90 font-light text-xs sm:text-sm md:text-base lg:text-[17px] leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}

      {/* 4. Centered Action Buttons (Booking & Exploration) */}
      <HeroActions
        onBookRoom={onBookRoom}
        onExploreWeddings={onExploreWeddings}
        onExploreRooms={onExploreRooms}
        onExploreDining={onExploreDining}
        primaryLabel={primaryLabel}
        secondaryLabel={secondaryLabel}
        tertiaryLabel={tertiaryLabel}
      />
    </div>
  );
};

