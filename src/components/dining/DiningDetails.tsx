import React from 'react';
import { type DiningExperience } from '../../data/diningData';
import { Typography } from '../Typography';
import { Button } from '../Button';

interface DiningDetailsProps {
  dining: DiningExperience;
  onCheckAvailability?: () => void;
  onEnquireDining?: () => void;
  onOrderFood?: () => void;
  className?: string;
}

export const DiningDetails: React.FC<DiningDetailsProps> = ({
  dining,
  onCheckAvailability,
  onEnquireDining,
  onOrderFood,
  className = '',
}) => {
  return (
    <div
      key={dining.id}
      className={`flex flex-col justify-between h-full space-y-6 animate-fadeIn ${className}`}
    >
      <div className="space-y-4">
        {/* Subtle Category & Code Tag */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold/80 tracking-widest">{dining.code}</span>
          <span className="w-6 h-[1px] bg-gold/40" aria-hidden="true" />
          <span className="font-cinzel text-xs tracking-[0.2em] text-sand uppercase">
            {dining.venueCategory}
          </span>
        </div>

        {/* Display Title */}
        <Typography
          variant="h2"
          className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-ivory-light"
        >
          {dining.title}
        </Typography>

        {/* Narrative Description */}
        <Typography
          variant="body"
          className="text-ivory-muted/80 text-sm sm:text-base leading-relaxed pt-1 font-light"
        >
          {dining.description}
        </Typography>

        {/* Verified Details Matrix (Rendered only if authentic verified data exists) */}
        {dining.details && dining.details.length > 0 && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            {dining.details.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] tracking-widest uppercase font-cinzel text-gold block">
                  {item.label}
                </span>
                <span className="text-xs text-ivory font-sans">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Optional Menu Link (Only rendered if an authentic link exists) */}
        {dining.menuLink && (
          <div className="pt-2">
            <Button
              variant="text"
              as="a"
              href={dining.menuLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Menu →
            </Button>
          </div>
        )}

        {/* Verified Dining Credentials */}
        <div className="p-3 bg-charcoal-deep border border-white/5 text-[11px] text-sand/80 font-sans leading-relaxed">
          <span className="text-gold font-medium block mb-0.5">DINING &amp; HOSPITALITY</span>
          Authentic regional dining and celebration feast spaces on Durgapur Road, Chandrapur. Leisurely dining and banquet catering available.
        </div>
      </div>

      {/* Distinct Restaurant Actions: Table Reservation + Food Order + Phone Desk */}
      <div className="pt-2 sm:pt-4 flex flex-wrap gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={onEnquireDining || onCheckAvailability}
          className="flex-1 sm:flex-initial text-center justify-center font-medium"
        >
          Reserve a Table
        </Button>
        {onOrderFood && (
          <Button
            variant="secondary"
            size="md"
            onClick={onOrderFood}
            className="flex-1 sm:flex-initial text-center justify-center border-gold/40 text-gold hover:bg-gold/10"
          >
            Order Food &amp; Menu
          </Button>
        )}
        <Button
          variant="secondary"
          size="md"
          as="a"
          href="tel:+919921019664"
          className="w-full sm:w-auto text-center justify-center text-xs"
        >
          Call Restaurant
        </Button>
      </div>
    </div>
  );
};
