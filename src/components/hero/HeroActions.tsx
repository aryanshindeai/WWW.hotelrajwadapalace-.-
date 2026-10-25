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
  onExploreRooms,
  onExploreDining,
  primaryLabel = 'BOOK A ROOM',
  secondaryLabel = 'EXPLORE THE HOTEL',
  className = '',
}) => {
  const handleSecondary = onExploreWeddings || onExploreRooms || onExploreDining;

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Centered Action Button Cluster matching The Grand Icon luxury styling */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2 font-sans">
        {/* 1. Primary Highlighted CTA (Solid Gold Filled Rectangular Luxury Button) */}
        <button
          type="button"
          onClick={onBookRoom}
          className="group relative inline-flex items-center justify-center min-h-[50px] w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] bg-[#C5A859] hover:bg-[#D4B86A] active:bg-[#B39345] text-[#0f1012] rounded-[2px] transition-all duration-300 shadow-[0_8px_24px_rgba(197,168,89,0.35)] hover:shadow-[0_12px_32px_rgba(197,168,89,0.55)] cursor-pointer hover:-translate-y-0.5 active:translate-y-0 text-center border border-[#C5A859]"
        >
          <span>{primaryLabel}</span>
        </button>

        {/* 2. Secondary CTA (Frosted Glass Bordered Luxury Button) */}
        {handleSecondary && (
          <button
            type="button"
            onClick={handleSecondary}
            className="group relative inline-flex items-center justify-center min-h-[50px] w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] bg-black/25 hover:bg-white/10 active:bg-white/20 backdrop-blur-sm text-[#FCFAF4] hover:text-[#C5A859] border border-white/35 hover:border-[#C5A859] rounded-[2px] transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 text-center"
          >
            <span>{secondaryLabel}</span>
          </button>
        )}
      </div>

      {/* Direct Verified Front Desk Phone Link & Location Assurance */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs text-white/80 font-sans pt-4 sm:pt-5 drop-shadow">
        <a
          href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
          onClick={() => trackCallClick('hero')}
          className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#C5A859] transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          <span>Front Desk: {HOTEL_CONTACT_DATA.phoneDisplay}</span>
        </a>
        <span className="text-white/30">·</span>
        <span className="text-white/70">Durgapur Road, Chandrapur</span>
      </div>
    </div>
  );
};
