import React from 'react';
import { type CelebrationCategory } from '../../data/celebrationsData';
import { Typography } from '../Typography';
import { Button } from '../Button';

interface EventDetailsProps {
  category: CelebrationCategory;
  onEnquire?: (categoryTitle?: string) => void;
  onExploreSpace?: () => void;
  className?: string;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  category,
  onEnquire,
  onExploreSpace,
  className = '',
}) => {
  return (
    <div
      key={category.id}
      className={`flex flex-col justify-between h-full space-y-6 sm:space-y-8 animate-fadeIn ${className}`}
    >
      <div className="space-y-4">
        {/* Subtle Category & Code Tag */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gold/80 tracking-widest">{category.code}</span>
          <span className="w-6 h-[1px] bg-gold/40" aria-hidden="true" />
          <span className="font-cinzel text-xs tracking-[0.2em] text-sand uppercase">
            {category.label}
          </span>
        </div>

        {/* Display Title */}
        <Typography
          variant="h2"
          className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-ivory-light"
        >
          {category.title}
        </Typography>

        {/* Subtitle / Venue context */}
        <span className="font-sans text-xs tracking-wider uppercase text-gold block">
          {category.subtitle}
        </span>

        {/* Narrative Description */}
        <Typography
          variant="body"
          className="text-ivory-muted/80 text-sm sm:text-base leading-relaxed pt-1 font-light"
        >
          {category.description}
        </Typography>

        {/* Verified Details Matrix (Rendered only if verified data exists) */}
        {category.details && category.details.length > 0 && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            {category.details.map((item, idx) => (
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

        {/* Verified Category Credentials */}
        <div className="p-3 bg-charcoal-deep border border-white/5 text-[11px] text-sand/80 font-sans leading-relaxed">
          <span className="text-gold font-medium block mb-0.5">HOTEL & BANQUET HALL</span>
          Spacious ceremonial banquet spaces on Durgapur Road, Chandrapur. Custom banquet layouts and catering configurations available on inquiry.
        </div>
      </div>

      {/* Primary & Secondary Action Buttons */}
      <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <Button
          variant="primary"
          size="md"
          onClick={() => onEnquire?.(category.title)}
          className="w-full sm:w-auto"
        >
          Enquire for an Event
        </Button>

        {onExploreSpace && (
          <Button
            variant="secondary"
            size="md"
            onClick={onExploreSpace}
            className="w-full sm:w-auto"
          >
            Explore The Space
          </Button>
        )}
      </div>
    </div>
  );
};
