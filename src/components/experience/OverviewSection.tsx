import React from 'react';
import { Container } from '../Container';

interface OverviewSectionProps {
  onBookRoom?: () => void;
  onExploreEvents?: (categoryTitle?: string) => void;
  onExploreRooms?: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onBookRoom,
  onExploreEvents,
  onExploreRooms,
}) => {
  return (
    <section
      id="overview"
      className="relative w-full bg-[#FCFAF4] text-[#141619] py-16 sm:py-20 lg:py-28 border-t border-[#EAE5DA] overflow-hidden"
    >
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Editorial Luxury Storytelling (Grand Icon Style) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-[1.5px] bg-[#C5A859]" aria-hidden="true" />
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.22em] text-[#9E824C]">
                Comfort & Distinction in Chandrapur
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.18] tracking-wide text-[#111315]">
              A Royal Welcome Along Durgapur Road
            </h2>

            <div className="w-20 h-[2px] bg-[#C5A859]" />

            <p className="font-sans text-sm sm:text-base text-[#4A4843] leading-relaxed max-w-2xl">
              Located beside Sargam Petrol Pump near Major Gate in Chandrapur, Hotel Rajwada Palace combines genuine royal hospitality with modern comforts. From spacious air-conditioned suites for business travelers and safari explorers to chandelier-lit banquet halls designed for fairytale weddings, every space is curated to offer an exceptional stay.
            </p>

            {/* Three Editorial Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 w-full">
              <div className="p-4 rounded-[3px] bg-white border border-[#E8E2D5] shadow-sm">
                <span className="block font-cinzel text-xs font-semibold tracking-wider text-[#9E824C] uppercase mb-1">
                  Grand Banquets
                </span>
                <p className="text-xs text-[#5C5952] leading-snug">
                  Chandelier halls & wedding grounds hosting up to 1,000+ guests.
                </p>
              </div>

              <div
                onClick={onExploreRooms}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onExploreRooms?.()}
                className="p-4 rounded-[3px] bg-white border border-[#E8E2D5] hover:border-[#C5A859] shadow-sm cursor-pointer transition-colors"
              >
                <span className="block font-cinzel text-xs font-semibold tracking-wider text-[#9E824C] uppercase mb-1">
                  Opulent Suites →
                </span>
                <p className="text-xs text-[#5C5952] leading-snug">
                  Deluxe air-conditioned rooms with high-speed Wi-Fi and 24/7 dining.
                </p>
              </div>

              <div className="p-4 rounded-[3px] bg-white border border-[#E8E2D5] shadow-sm">
                <span className="block font-cinzel text-xs font-semibold tracking-wider text-[#9E824C] uppercase mb-1">
                  Pure Veg Dining
                </span>
                <p className="text-xs text-[#5C5952] leading-snug">
                  Festive Indian cuisine & starlit rooftop lounge around open fire pits.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-4 w-full sm:w-auto font-sans">
              <button
                type="button"
                onClick={onBookRoom}
                className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] bg-[#C5A859] hover:bg-[#D4B86A] text-[#111315] rounded-[2px] transition-all duration-300 shadow-[0_4px_16px_rgba(197,168,89,0.3)] hover:shadow-[0_8px_24px_rgba(197,168,89,0.45)] cursor-pointer hover:-translate-y-0.5"
              >
                Book Your Stay
              </button>

              <button
                type="button"
                onClick={() => onExploreEvents?.('Grand Wedding & Mandap Ceremony')}
                className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] bg-transparent hover:bg-[#F2ECE0] text-[#111315] border border-[#C5A859]/60 hover:border-[#C5A859] rounded-[2px] transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                Plan Weddings & Events
              </button>
            </div>
          </div>

          {/* Right Column: Verified Architectural Photography Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#E0D9CB] shadow-[0_16px_48px_rgba(0,0,0,0.12)] group">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/rajwada-palace/cinematic/hero-facade-1600.webp"
                />
                <img
                  src="/images/rajwada-palace/cinematic/hero-facade-1600.jpg"
                  alt="Hotel Rajwada Palace illuminated facade and celebratory red carpet entrance in Chandrapur"
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </picture>

              {/* Verified Trust Badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <div>
                  <span className="block font-cinzel text-xs font-semibold tracking-wider text-[#C5A859]">
                    HOTEL RAJWADA PALACE
                  </span>
                  <span className="text-[11px] text-white/80">
                    Durgapur Road · Near Major Gate, Chandrapur
                  </span>
                </div>
                <div className="flex items-center gap-1 text-right">
                  <span className="text-amber-400 font-semibold text-sm">★ 4.2</span>
                  <span className="text-[10px] text-white/70 block">(460+ reviews)</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative gold frame accent */}
            <div
              className="absolute -bottom-3 -right-3 -z-10 w-full h-full border border-[#C5A859]/30 rounded-lg hidden sm:block pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
