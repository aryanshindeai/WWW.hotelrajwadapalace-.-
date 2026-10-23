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
  badge = 'CHANDRAPUR · MAHARASHTRA',
  titlePart1 = 'Where Every Stay',
  titlePart2 = 'Becomes a Story.',
  subtitle = 'Discover welcoming hospitality, comfortable stays, memorable dining, and celebrations at Hotel Rajwada Palace, Chandrapur.',
  locationDetails = 'Near Major Gate · Beside Sargam Petrol Pump · Durgapur Road',
  primaryLabel = 'BOOK A ROOM',
  secondaryLabel = 'WEDDINGS & EVENTS',
  tertiaryLabel = 'EXPLORE DINING',
  onBookRoom,
  onExploreWeddings,
  onExploreRooms,
  onExploreDining,
  className = '',
}) => {
  return (
    <div
      className={`relative z-20 max-w-3xl lg:max-w-4xl text-left select-text ${className}`}
    >
      {/* 1. Contextual Location Eyebrow & Verified Trust Tag */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 sm:mb-4 animate-hero-reveal-1">
        <span className="w-6 sm:w-12 h-[1.5px] bg-[#C7A66B] animate-line-expand" aria-hidden="true" />
        <span className="font-cinzel tracking-[0.2em] sm:tracking-[0.24em] text-[10px] sm:text-xs text-[#C7A66B] uppercase font-semibold">
          {badge}
        </span>
        <span className="inline-block text-white/30 font-light text-xs">|</span>
        <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-sans font-medium tracking-wide bg-[#C7A66B]/15 text-[#D8BD8A] border border-[#C7A66B]/30 hover:border-[#C7A66B]/60 transition-colors">
          <span>★ 4.2 Rating</span>
          <span className="text-white/40">·</span>
          <span className="hidden sm:inline">460+ Verified Google Reviews</span>
          <span className="inline sm:hidden">460+ Reviews</span>
        </span>
      </div>

      {/* 2. Editorial Serif Headline: Where Every Stay Becomes a Story. */}
      <h1 className="mb-2.5 sm:mb-4 animate-hero-reveal-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
        <span className="block font-cormorant text-[2.25rem] xs:text-[2.65rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.5rem] tracking-tight font-normal leading-[1.08] sm:leading-[1.05] text-[#F6F0E7]">
          <span>{titlePart1}</span>
          {titlePart2 && (
            <span className="block font-cormorant italic font-light text-[#FDFAF5]">
              {titlePart2}
            </span>
          )}
        </span>
      </h1>

      {/* 3. Supporting Description & Authentic Geographic Certainty */}
      <div className="mb-5 sm:mb-8 max-w-2xl animate-hero-reveal-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
        <p className="text-[#F6F0E7]/95 font-light text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
          {subtitle}
        </p>
        {locationDetails && (
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.16em] uppercase text-sand/90 block mt-2 sm:mt-2.5">
            {locationDetails}
          </span>
        )}
      </div>

      {/* 4. Asymmetric Action Buttons (Booking-First UX) */}
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
