import React, { useState } from 'react';
import { Section } from '../Section';
import { Container } from '../Container';
import { SectionHeading } from '../SectionHeading';
import { EventMedia } from './EventMedia';
import { EventSupportingMedia } from './EventSupportingMedia';
import { EventDetails } from './EventDetails';
import { EventSelector } from './EventSelector';
import { CELEBRATIONS_DATA } from '../../data/celebrationsData';
import { ScrollReveal } from '../motion/ScrollReveal';

interface CelebrationsSectionProps {
  onEnquire?: () => void;
  onExploreSpace?: () => void;
  className?: string;
}

export const CelebrationsSection: React.FC<CelebrationsSectionProps> = ({
  onEnquire,
  onExploreSpace,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCategory = CELEBRATIONS_DATA[currentIndex] || CELEBRATIONS_DATA[0];

  return (
    <Section
      id="events"
      variant="primary"
      spacing="lg"
      className={`relative ${className}`}
    >
      <Container size="xl">
        {/* Section Introduction */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="WEDDINGS &amp; EVENTS"
            title="Weddings, Celebrations &amp; Grand Events"
            subtitle="Spacious banquet halls, decorated wedding stages, and open-air rooftop grounds in Chandrapur. Plan your dream wedding or milestone celebration with our team."
            align="left"
          />
        </div>

        {/* Event Category Selector */}
        <ScrollReveal variant="fade-up" delayMs={50} durationMs={600} className="border-b border-white/5 pb-4 mb-8 sm:mb-12">
          <EventSelector
            categories={CELEBRATIONS_DATA}
            currentIndex={currentIndex}
            onSelectIndex={setCurrentIndex}
          />
        </ScrollReveal>

        {/* High-Impact Asymmetric 12-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-8 lg:mb-14">
          {/* Primary Dominant Image (7/12 cols ~ 60% visual attention) */}
          <ScrollReveal variant="fade-up" delayMs={100} durationMs={700} className="lg:col-span-7">
            <EventMedia category={currentCategory} />
          </ScrollReveal>

          {/* Event Narrative Details & CTA (5/12 cols ~ 40%) */}
          <ScrollReveal variant="fade-up" delayMs={200} durationMs={700} className="lg:col-span-5">
            <EventDetails
              category={currentCategory}
              onEnquire={onEnquire}
              onExploreSpace={onExploreSpace}
            />
          </ScrollReveal>
        </div>

        {/* Secondary Supporting Visual Offset (Optional Detail Layer) */}
        {currentCategory.secondaryImageDesktop && (
          <ScrollReveal variant="fade-up" delayMs={150} durationMs={700} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-8 border-t border-white/5">
            <div className="lg:col-span-6 lg:col-start-4">
              <EventSupportingMedia category={currentCategory} />
            </div>
          </ScrollReveal>
        )}
      </Container>
    </Section>
  );
};
