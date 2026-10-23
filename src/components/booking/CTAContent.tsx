import React from 'react';
import { Typography } from '../Typography';
import { AvailabilityButton } from '../navigation/AvailabilityButton';
import { Button } from '../Button';
import { ScrollReveal } from '../motion/ScrollReveal';
import { trackCallClick } from '../../lib/supabase';

interface CTAContentProps {
  onCheckAvailability?: () => void;
  phoneDisplay: string;
  phoneRaw: string;
  className?: string;
}

export const CTAContent: React.FC<CTAContentProps> = ({
  onCheckAvailability,
  phoneDisplay,
  phoneRaw,
  className = '',
}) => {
  return (
    <ScrollReveal
      variant="fade-up"
      durationMs={750}
      className={`relative z-20 max-w-2xl lg:max-w-3xl text-left select-text ${className}`}
    >
      {/* 1. Small Editorial Label */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <span className="w-8 sm:w-12 h-[1px] bg-gold/60" aria-hidden="true" />
        <span className="font-cinzel tracking-[0.28em] text-[10px] sm:text-xs text-gold uppercase font-medium">
          YOUR STAY · HOTEL RAJWADA PALACE
        </span>
      </div>

      {/* 2. Large Display Heading */}
      <h2 className="mb-4 sm:mb-6">
        <span className="block font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-ivory-light leading-[1.08]">
          Plan Your Visit
        </span>
      </h2>

      {/* 3. Short Restrained Supporting Invitation */}
      <Typography
        variant="body-lg"
        className="text-ivory-warm/85 font-light text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-xl"
      >
        Whether arriving for celebrations, formal gatherings, or a tranquil retreat along the Chandrapur corridor, our guest desk welcomes your inquiry.
      </Typography>

      {/* 4. Coordinated Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
        <AvailabilityButton
          size="lg"
          onClick={onCheckAvailability}
          className="w-full sm:w-auto text-center"
        />

        <Button
          variant="secondary"
          size="lg"
          as="a"
          href={`tel:${phoneRaw}`}
          onClick={() => trackCallClick('booking_cta_section')}
          className="w-full sm:w-auto text-center bg-charcoal-deep/60 backdrop-blur-sm border-white/20 hover:border-gold hover:text-gold"
          aria-label={`Call the hotel at ${phoneDisplay}`}
        >
          Call: {phoneDisplay}
        </Button>
      </div>

      {/* 5. Verified Address Footnote */}
      <p className="mt-8 pt-6 border-t border-white/10 text-[11px] sm:text-xs text-sand/80 font-sans tracking-wide">
        Near Major Gate, beside Sargam Petrol Pump, Durgapur Road, Chandrapur, Maharashtra 442401
      </p>
    </ScrollReveal>
  );
};
