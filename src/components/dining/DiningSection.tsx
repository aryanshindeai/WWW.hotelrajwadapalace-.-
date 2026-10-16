import React, { useState } from 'react';
import { Section } from '../Section';
import { Container } from '../Container';
import { SectionHeading } from '../SectionHeading';
import { DiningFeatureMedia } from './DiningFeatureMedia';
import { DiningSupportingMedia } from './DiningSupportingMedia';
import { DiningDetails } from './DiningDetails';
import { DiningExperienceSelector } from './DiningExperienceSelector';
import { DINING_DATA } from '../../data/diningData';
import { ScrollReveal } from '../motion/ScrollReveal';

interface DiningSectionProps {
  onCheckAvailability?: () => void;
  onEnquireDining?: () => void;
  onOrderFood?: () => void;
  className?: string;
}

export const DiningSection: React.FC<DiningSectionProps> = ({
  onCheckAvailability,
  onEnquireDining,
  onOrderFood,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVenue = DINING_DATA[currentIndex] || DINING_DATA[0];

  return (
    <Section
      id="restaurant"
      variant="surface"
      spacing="lg"
      className={`relative ${className}`}
    >
      <Container size="xl">
        {/* Section Introduction */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="RESTAURANT &amp; DINING"
            title="Restaurant &amp; Dining at Rajwada"
            subtitle="Delicious meals, celebratory banquet feasts, and family dining. Reserve a table or order dining arrangements directly from our restaurant desk."
            align="left"
          />
        </div>

        {/* Venue Selector Navigation */}
        <ScrollReveal variant="fade-up" delayMs={50} durationMs={600} className="border-b border-white/5 pb-4 mb-8 sm:mb-12">
          <DiningExperienceSelector
            venues={DINING_DATA}
            currentIndex={currentIndex}
            onSelectIndex={setCurrentIndex}
          />
        </ScrollReveal>

        {/* 1. Large Dominant Feature Image Span (Full 12-column span) */}
        <ScrollReveal variant="fade-up" delayMs={100} durationMs={700} className="mb-8 lg:mb-12">
          <DiningFeatureMedia dining={currentVenue} />
        </ScrollReveal>

        {/* 2. Asymmetric Lower Composition: Supporting Detail (7 cols) + Editorial Information (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Supporting Photography / Atmosphere Detail */}
          <ScrollReveal variant="fade-up" delayMs={150} durationMs={700} className="lg:col-span-7">
            <DiningSupportingMedia dining={currentVenue} />
          </ScrollReveal>

          {/* Dining Narrative Details & Primary CTA */}
          <ScrollReveal variant="fade-up" delayMs={220} durationMs={700} className="lg:col-span-5">
            <DiningDetails
              dining={currentVenue}
              onCheckAvailability={onCheckAvailability}
              onEnquireDining={onEnquireDining}
              onOrderFood={onOrderFood}
            />
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
};
