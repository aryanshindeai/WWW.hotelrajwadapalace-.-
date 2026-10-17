import React from 'react';

interface HeroActionsProps {
  onBookRoom?: () => void;
  onExploreWeddings?: () => void;
  onExploreRooms?: () => void;
  onExploreDining?: () => void;
  onDirectCall?: () => void;
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
  secondaryLabel = 'WEDDINGS & EVENTS',
  tertiaryLabel = 'EXPLORE DINING',
  className = '',
}) => {
  const isDiningAction = tertiaryLabel.toLowerCase().includes('dining');

  return (
    <div className={`space-y-4 animate-hero-reveal-4 ${className}`}>
      {/* Primary Action Button Cluster */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
        {/* 1. Primary CTA: BOOK A ROOM → */}
        <button
          type="button"
          onClick={onBookRoom}
          className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.16em] bg-[#C7A66B] hover:bg-[#D8BD8A] active:bg-[#9B8053] text-[#101317] rounded-full transition-all duration-300 shadow-[0_8px_24px_rgba(199,166,107,0.35)] hover:shadow-[0_12px_32px_rgba(199,166,107,0.5)] cursor-pointer shimmer-sweep hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{primaryLabel}</span>
          <span
            className="text-sm font-bold transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>

        {/* 2. Secondary CTA: WEDDINGS & EVENTS */}
        {onExploreWeddings && (
          <button
            type="button"
            onClick={onExploreWeddings}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.14em] bg-[#101317]/85 hover:bg-[#C7A66B]/15 backdrop-blur-md text-[#F6F0E7] hover:text-[#C7A66B] border border-white/20 hover:border-[#C7A66B]/60 rounded-full transition-all duration-300 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{secondaryLabel}</span>
          </button>
        )}

        {/* 3. Additional CTA: EXPLORE DINING ↓ or EXPLORE ROOMS */}
        {(onExploreDining || onExploreRooms) && (
          <button
            type="button"
            onClick={onExploreDining || onExploreRooms}
            className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.14em] bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-md text-[#F6F0E7]/85 hover:text-[#F6F0E7] border border-white/10 hover:border-[#C7A66B]/40 rounded-full transition-all duration-300 cursor-pointer"
          >
            <span>{tertiaryLabel}</span>
            <span
              className={`text-xs transition-transform duration-300 ${
                isDiningAction ? 'group-hover:translate-y-0.5' : 'group-hover:translate-x-0.5'
              }`}
              aria-hidden="true"
            >
              {isDiningAction ? '↓' : '→'}
            </span>
          </button>
        )}
      </div>

      {/* Direct Phone / Contact Action for Instant Hospitality Assistance */}
      <div className="flex items-center gap-2 text-xs text-sand/80 font-sans pt-1">
        <a
          href="tel:+919921019664"
          className="inline-flex items-center gap-1.5 hover:text-[#C7A66B] transition-colors duration-200 cursor-pointer py-1"
          aria-label="Call Hotel Reception: 099210 19664"
        >
          <svg
            className="w-3.5 h-3.5 text-[#C7A66B]"
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
          <span className="tracking-wide">Direct Hotel Reception:</span>
          <span className="font-semibold text-[#F6F0E7] hover:text-[#C7A66B]">+91 99210 19664</span>
        </a>
      </div>
    </div>
  );
};
