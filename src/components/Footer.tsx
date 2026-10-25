import React from 'react';
import { Container } from './Container';
import { AvailabilityButton } from './navigation/AvailabilityButton';
import { HOTEL_CONTACT_DATA } from '../data/locationData';
import { getWhatsAppGeneralInquiryUrl } from '../lib/whatsapp';

interface FooterProps {
  onCheckAvailability?: () => void;
  onNavigateSection?: (id: string) => void;
  className?: string;
}

const FOOTER_NAV_LINKS = [
  { id: 'top', label: 'Home', href: '#top' },
  { id: 'rooms', label: 'Hotel & Rooms', href: '#rooms' },
  { id: 'restaurant', label: 'Restaurant', href: '#restaurant' },
  { id: 'events', label: 'Weddings & Events', href: '#events' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'contact', label: 'Contact & Location', href: '#contact' },
];

export const Footer: React.FC<FooterProps> = ({
  onCheckAvailability,
  onNavigateSection,
  className = '',
}) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(id);
    }
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Hotel Rajwada Palace Global Footer"
      className={`w-full bg-charcoal-deep border-t border-white/5 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 text-ivory ${className}`}
    >
      <Container size="xl">
        {/* 1. TOP BRAND STATEMENT & ARCHITECTURAL WORDMARK */}
        <div className="pb-12 sm:pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="font-cinzel tracking-[0.28em] text-[10px] sm:text-xs text-gold uppercase block mb-2 font-medium">
              Chandrapur · Maharashtra
            </span>
            <span className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory-light font-light tracking-tight block leading-[1.05]">
              Hotel Rajwada Palace
            </span>
          </div>
          <div className="max-w-md text-sand text-xs sm:text-sm font-light leading-relaxed">
            A sanctuary of regal architectural composure, authentic regional hospitality, and grand celebratory spaces in Chandrapur, Maharashtra.
          </div>
        </div>

        {/* 2. MIDDLE MULTI-LEVEL EDITORIAL COLUMNS */}
        <div className="py-12 sm:py-16 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Property & Location (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-gold block mb-3 font-medium">
                The Property
              </span>
              <address className="not-italic text-sm text-ivory-muted/90 font-light leading-relaxed space-y-1">
                <p className="text-ivory font-normal">Near Major Gate</p>
                <p>Beside Sargam Petrol Pump</p>
                <p className="text-ivory-warm">Durgapur / Tadoba Road</p>
                <p>Tukum, Urjanagar</p>
                <p className="text-gold-light pt-1">Maharashtra 442401, India</p>
              </address>
            </div>

            <div className="pt-2 space-y-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-sand/70 block mb-1">
                  Direct Hotel Desk
                </span>
                <a
                  href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
                  className="font-serif text-xl sm:text-2xl text-ivory-light hover:text-gold transition-colors inline-block"
                  aria-label={`Call the hotel at ${HOTEL_CONTACT_DATA.phoneDisplay}`}
                >
                  {HOTEL_CONTACT_DATA.phoneDisplay}
                </a>
              </div>

              {/* Verified Instagram & WhatsApp Links */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href={HOTEL_CONTACT_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-sand hover:text-gold transition-colors py-1 px-2.5 border border-white/10 hover:border-gold/40 rounded-sm"
                  aria-label="Visit Hotel Rajwada Palace on Instagram"
                >
                  <svg className="w-3.5 h-3.5 text-pink-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram @hotelrajwadaweddpalace</span>
                </a>

                <a
                  href={getWhatsAppGeneralInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors py-1 px-2.5 border border-emerald-500/20 hover:border-emerald-500/40 rounded-sm"
                  aria-label="Chat with Hotel Rajwada Palace on WhatsApp"
                >
                  <span>WhatsApp: +91 99210 19664</span>
                </a>
              </div>
            </div>
          </div>

          {/* Center Column: Editorial Navigation Links (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-gold block mb-3 font-medium">
              Explore The Palace
            </span>
            <nav aria-label="Footer Navigation Links" className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {FOOTER_NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="group flex items-center justify-between text-xs uppercase tracking-[0.16em] text-ivory/80 hover:text-gold transition-colors duration-300 py-1"
                >
                  <span>{link.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold text-[10px]" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column: Inquiries & Conversion CTA (3 cols) */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div>
              <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-gold block mb-3 font-medium">
                Inquiries & Reservations
              </span>
              <p className="text-xs text-sand font-light leading-relaxed mb-6">
                Connect directly with our desk for room availability, banquet reservations, and wedding hall bookings.
              </p>
              <AvailabilityButton
                size="md"
                className="w-full text-center"
                onClick={onCheckAvailability}
              />
            </div>

            <div className="p-3 bg-charcoal/50 border border-white/5 text-[11px] text-sand/80 font-sans mt-4">
              <span className="text-gold font-medium block">Category: Hotel / Banquet Hall</span>
              Google Rating: 4.2 ★ (460 Verified Reviews)
            </div>
          </div>
        </div>

        {/* 3. BOTTOM LEGAL, COPYRIGHT, AND ACCREDITATION */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/60">
          <p>© {currentYear} Hotel Rajwada Palace, Chandrapur. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[10px] tracking-widest uppercase">
            <span>Tukum · Urjanagar</span>
            <span className="w-1 h-1 rounded-full bg-gold/40" aria-hidden="true" />
            <span>Chandrapur 442401</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
