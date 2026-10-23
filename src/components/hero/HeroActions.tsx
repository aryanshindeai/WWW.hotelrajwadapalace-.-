import React from 'react';
import { HOTEL_CONTACT_DATA } from '../../data/locationData';
import { trackCallClick } from '../../lib/supabase';

interface HeroActionsProps {
  onBookRoom?: () => void;
  onExploreWeddings?: () => void;
  onExploreRooms?: () => void;
  onExploreDining?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  tertiaryLabel?: string;
  className?: string;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  onBookRoom,
  onExploreWeddings,
  primaryLabel = 'BOOK A ROOM',
  secondaryLabel = 'WEDDINGS & EVENTS',
  className = '',
}) => {
  return (
    <div className={`space-y-4 animate-hero-reveal-4 ${className}`}>
      {/* Primary Action Button Cluster */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
        {/* 1. Primary Highlighted CTA: BOOK A ROOM → */}
        <button
          type="button"
          onClick={onBookRoom}
          className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[48px] px-7 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.16em] bg-[#C7A66B] hover:bg-[#D8BD8A] active:bg-[#9B8053] text-[#101317] rounded-full transition-all duration-300 shadow-[0_8px_24px_rgba(199,166,107,0.35)] hover:shadow-[0_12px_32px_rgba(199,166,107,0.5)] cursor-pointer shimmer-sweep hover:scale-[1.02] active:scale-[0.98] text-center"
        >
          <span>{primaryLabel}</span>
          <span
            className="text-sm font-bold transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>

        {/* 2. Secondary Contact Action: CALL NOW */}
        <a
          href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
          onClick={() => trackCallClick('hero')}
          className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto min-h-[48px] px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.14em] bg-[#101317]/85 hover:bg-[#C7A66B]/15 backdrop-blur-md text-[#F6F0E7] hover:text-[#C7A66B] border border-white/25 hover:border-[#C7A66B]/60 rounded-full transition-all duration-300 cursor-pointer text-center"
          aria-label={`Call the hotel reception: ${HOTEL_CONTACT_DATA.phoneDisplay}`}
        >
          <svg
            className="w-4 h-4 text-[#C7A66B] flex-shrink-0 transition-transform duration-300 group-hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>CALL NOW: {HOTEL_CONTACT_DATA.phoneDisplay}</span>
        </a>

        {/* 3. Subtle tertiary exploration link: Weddings / Celebrations */}
        {onExploreWeddings && (
          <button
            type="button"
            onClick={onExploreWeddings}
            className="hidden lg:inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs uppercase tracking-[0.14em] font-sans font-medium text-sand/80 hover:text-ivory hover:bg-white/[0.05] rounded-full transition-colors cursor-pointer"
          >
            <span>{secondaryLabel}</span>
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      {/* Direct Hotel Address / Front Desk Note */}
      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-sand/75 font-sans pt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
        <span>Near Major Gate, Durgapur Road, Chandrapur · Direct Desk Active</span>
      </div>
    </div>
  );
};
