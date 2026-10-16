import React from 'react';
import { Typography } from './Typography';
import { ScrollReveal } from './motion/ScrollReveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <ScrollReveal
      variant="fade-up"
      durationMs={700}
      className={`flex flex-col max-w-3xl ${alignmentClasses} ${className}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-gold/60 animate-line-expand origin-left" aria-hidden="true" />
          <Typography variant="label" className="tracking-[0.25em] text-gold font-medium">
            {eyebrow}
          </Typography>
          <span className="w-8 h-[1px] bg-gold/60 animate-line-expand origin-right" aria-hidden="true" />
        </div>
      )}
      <Typography
        variant="h2"
        className="mb-4 text-ivory-light font-light tracking-wide"
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body"
          className="text-ivory-muted/80 max-w-xl font-light"
        >
          {subtitle}
        </Typography>
      )}
    </ScrollReveal>
  );
};
