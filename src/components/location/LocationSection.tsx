import React from 'react';
import { Section } from '../Section';
import { Container } from '../Container';
import { PropertyAddressBlock } from './PropertyAddressBlock';
import { ContactActions } from './ContactActions';
import { LocationMap } from './LocationMap';
import { HOTEL_CONTACT_DATA } from '../../data/locationData';
import { ScrollReveal } from '../motion/ScrollReveal';

interface LocationSectionProps {
  className?: string;
}

/**
 * THE RAJWADA CONCIERGE — LUXURY LOCATION & CONTACT EXPERIENCE
 *
 * Provides clear, factual, elegant geographic orientation for guests arriving
 * in Chandrapur, along with direct concierge communications.
 */
export const LocationSection: React.FC<LocationSectionProps> = ({
  className = '',
}) => {
  return (
    <Section
      id="contact"
      variant="surface"
      spacing="lg"
      className={`relative overflow-hidden bg-charcoal-deep text-ivory border-t border-b border-gold/15 ${className}`}
    >
      {/* Background Ambience Layers */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(199,166,107,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] pointer-events-none opacity-20 bg-[radial-gradient(circle_at_bottom_right,rgba(199,166,107,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        {/* Section Introduction */}
        <div className="mb-12 sm:mb-16 pb-8 border-b border-white/5">
          <ScrollReveal variant="fade-up" durationMs={700} className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 sm:w-12 h-[1px] bg-gold/70 origin-left" aria-hidden="true" />
              <span className="font-cinzel text-xs uppercase tracking-[0.28em] text-gold font-medium">
                FIND US
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-gold/70 origin-right" aria-hidden="true" />
            </div>

            {/* Editorial Serif Heading with Intentional Line Break */}
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-ivory tracking-tight leading-[1.08] mb-5">
              Your Arrival <br className="hidden sm:inline" />
              <span className="italic font-normal text-gold-light">Begins Here.</span>
            </h2>

            {/* Supporting Description */}
            <p className="font-sans text-sand text-base sm:text-lg max-w-2xl leading-relaxed">
              Find Hotel Rajwada Palace in Chandrapur, conveniently located along Durgapur / Tadoba Road.
            </p>
          </ScrollReveal>
        </div>

        {/* Premium Two-Column Composition: 5 cols Left (Information) + 7 cols Right (Interactive Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* =====================================================================
              LEFT COLUMN: 40% DESKTOP WIDTH — LOCATION & HOTEL CONTACT
          ===================================================================== */}
          <ScrollReveal
            variant="fade-up"
            delayMs={100}
            durationMs={800}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* 1. Structured Address Block with Copy Utility */}
            <PropertyAddressBlock
              address={HOTEL_CONTACT_DATA.address}
              propertyName={HOTEL_CONTACT_DATA.propertyName}
              category={HOTEL_CONTACT_DATA.category}
            />

            {/* 2. Direct Hotel Desk Panel */}
            <div className="p-4 sm:p-5 rounded-sm border border-gold/30 bg-charcoal-surface/80 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-cinzel tracking-[0.24em] text-gold uppercase font-semibold">
                  DIRECT HOTEL DESK
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Reception Desk Active" />
              </div>

              <a
                href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
                className="font-sans text-2xl sm:text-3xl font-semibold text-ivory hover:text-gold transition-colors block tracking-wide whitespace-nowrap"
                aria-label={`Call direct hotel desk at ${HOTEL_CONTACT_DATA.phoneDisplay}`}
              >
                {HOTEL_CONTACT_DATA.phoneDisplay}
              </a>

              <p className="text-xs text-sand font-sans leading-relaxed pt-0.5">
                Available for room reservations, banquet enquiries, and dining arrangements in Chandrapur.
              </p>
            </div>

            {/* 3. Three Balanced Action Buttons */}
            <ContactActions
              phoneDisplay={HOTEL_CONTACT_DATA.phoneDisplay}
              phoneRaw={HOTEL_CONTACT_DATA.phoneRaw}
              directionsUrl={HOTEL_CONTACT_DATA.googleMapsDirectionsUrl}
              whatsappUrl={HOTEL_CONTACT_DATA.whatsappUrl}
            />
          </ScrollReveal>

          {/* =====================================================================
              RIGHT COLUMN: 60% DESKTOP WIDTH — INTERACTIVE GOOGLE MAP
          ===================================================================== */}
          <ScrollReveal
            variant="fade-up"
            delayMs={200}
            durationMs={800}
            className="lg:col-span-7 flex flex-col h-full"
          >
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
