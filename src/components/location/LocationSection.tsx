import React from 'react';
import { Section } from '../Section';
import { Container } from '../Container';
import { SectionHeading } from '../SectionHeading';
import { PropertyAddressBlock } from './PropertyAddressBlock';
import { ContactActions } from './ContactActions';
import { LocationMap } from './LocationMap';
import { HOTEL_CONTACT_DATA } from '../../data/locationData';
import { ScrollReveal } from '../motion/ScrollReveal';

interface LocationSectionProps {
  className?: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  className = '',
}) => {
  return (
    <Section
      id="contact"
      variant="primary"
      spacing="lg"
      className={`relative ${className}`}
    >
      <Container size="xl">
        {/* Section Introduction */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading
            eyebrow="FIND US"
            title="Your Next Arrival"
            subtitle="Conveniently situated along Durgapur Road / Tadoba Road, welcoming guests to Chandrapur."
            align="left"
          />
        </div>

        {/* Editorial 12-Column Split Layout: 5 cols Information + 7 cols Map Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Address, Phone & Contact Actions (5 cols) */}
          <ScrollReveal variant="fade-up" delayMs={100} durationMs={700} className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Structured Editorial Address */}
            <PropertyAddressBlock
              address={HOTEL_CONTACT_DATA.address}
              propertyName={HOTEL_CONTACT_DATA.propertyName}
              category={HOTEL_CONTACT_DATA.category}
            />

            {/* Direct Contact Phone line */}
            <div className="p-4 border border-white/5 bg-charcoal-deep/60 space-y-1 rounded-lg">
              <span className="text-[10px] font-cinzel tracking-[0.2em] text-gold uppercase block">
                Direct Hotel Desk
              </span>
              <a
                href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
                className="font-serif text-2xl text-ivory-light hover:text-gold transition-colors block"
              >
                {HOTEL_CONTACT_DATA.phoneDisplay}
              </a>
              <p className="text-[11px] text-sand/80 font-sans">
                Available for reservations, banquet inquiries, and stay arrangements.
              </p>
            </div>

            {/* Practical Action CTAs */}
            <ContactActions
              phoneDisplay={HOTEL_CONTACT_DATA.phoneDisplay}
              phoneRaw={HOTEL_CONTACT_DATA.phoneRaw}
              directionsUrl={HOTEL_CONTACT_DATA.googleMapsDirectionsUrl}
            />
          </ScrollReveal>

          {/* Right Column: Architectural Map View (7 cols) */}
          <ScrollReveal variant="fade-up" delayMs={200} durationMs={700} className="lg:col-span-7">
            <LocationMap
              embedQuery={HOTEL_CONTACT_DATA.googleMapsEmbedQuery}
              directionsUrl={HOTEL_CONTACT_DATA.googleMapsDirectionsUrl}
            />
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
};
