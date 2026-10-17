import React from 'react';

interface BrandMarkProps {
  className?: string;
  isScrolled?: boolean;
  onClick?: () => void;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  className = '',
  onClick,
}) => {
  return (
    <a
      href="#top"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal transition-transform duration-300 ${className}`}
      aria-label="Hotel Rajwada Palace - Home"
    >
      {/* Official Royal Emblem Logo */}
      <img
        src="/images/rajwada-palace/rajwada-logo.png"
        alt="Hotel Rajwada A Wedding Palace Logo"
        width={44}
        height={44}
        className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
      />

      <div className="flex flex-col justify-center">
        {/* Primary Architectural Wordmark */}
        <span className="font-serif text-sm sm:text-base lg:text-[17px] tracking-[0.08em] text-[#F6F0E7] font-medium leading-none group-hover:text-[#D8BD8A] transition-colors duration-300 whitespace-nowrap">
          HOTEL RAJWADA PALACE
        </span>

        {/* Location / Destination tag */}
        <span className="font-sans text-[8px] sm:text-[8.5px] tracking-[0.24em] uppercase text-sand/80 mt-1 font-medium group-hover:text-sand transition-colors duration-300">
          Chandrapur · Maharashtra
        </span>
      </div>
    </a>
  );
};
