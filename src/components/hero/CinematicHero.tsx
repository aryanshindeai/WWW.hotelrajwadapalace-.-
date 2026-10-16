import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HeroOverlay } from './HeroOverlay';
import { Container } from '../Container';
import { HOTEL_IMAGE_REGISTRY } from '../../data/hotelImageRegistry';
import { SplitTextReveal } from '../motion/SplitTextReveal';

export interface HeroSlide {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  srcDesktop: string;
  srcWebpDesktop: string;
  srcMobile: string;
  srcWebpMobile: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-facade',
    tabLabel: '01 Facade',
    badge: 'CHANDRAPUR · MAHARASHTRA',
    title: 'Hotel Rajwada Palace',
    subtitle: 'A regal sanctuary of authentic hospitality, comfortable stays, and grand celebratory venues along Durgapur Road, Chandrapur.',
    srcDesktop: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].src,
    srcWebpDesktop: '/images/rajwada-palace/verified/rajwada-hero-master.webp',
    srcMobile: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].srcMobile || HOTEL_IMAGE_REGISTRY['hero-exterior-01'].src,
    srcWebpMobile: '/images/rajwada-palace/verified/rajwada-hero-master-640.webp',
    alt: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].alt,
  },
  {
    id: 'hero-weddings',
    tabLabel: '02 Weddings',
    badge: 'ROYAL CELEBRATIONS & BANQUETS',
    title: 'Weddings & Celebrations',
    subtitle: 'Ornate ceremonial stages, grand chandelier banquet halls, and open-air rooftop grounds designed for life’s golden moments.',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].src,
    srcWebpDesktop: '/images/rajwada-palace/verified/rajwada-wedding-stage-master.webp',
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].src,
    srcWebpMobile: '/images/rajwada-palace/verified/rajwada-wedding-stage-master-640.webp',
    alt: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].alt,
  },
  {
    id: 'hero-rooms',
    tabLabel: '03 Suites',
    badge: 'COMFORTABLE ACCOMMODATION',
    title: 'Rooms & Executive Suites',
    subtitle: 'Air-conditioned deluxe rooms, multi-bed quarters, and executive suites designed for restful retreats and wedding families.',
    srcDesktop: HOTEL_IMAGE_REGISTRY['room-category-03'].src,
    srcWebpDesktop: '/images/rajwada-palace/verified/rajwada-suite-03-master.webp',
    srcMobile: HOTEL_IMAGE_REGISTRY['room-category-03'].src,
    srcWebpMobile: '/images/rajwada-palace/verified/rajwada-suite-03-master-640.webp',
    alt: HOTEL_IMAGE_REGISTRY['room-category-03'].alt,
  },
  {
    id: 'hero-dining',
    tabLabel: '04 Dining',
    badge: 'FINE VEGETARIAN DINING',
    title: 'Rajwada Dining Hall',
    subtitle: 'Delicious pure vegetarian Indian delicacies, aromatic biryanis, tandoori breads, and lavish celebration banquet feasts.',
    srcDesktop: HOTEL_IMAGE_REGISTRY['dining-venue-01'].src,
    srcWebpDesktop: '/images/rajwada-palace/verified/rajwada-dining-01-master.webp',
    srcMobile: HOTEL_IMAGE_REGISTRY['dining-venue-01'].src,
    srcWebpMobile: '/images/rajwada-palace/verified/rajwada-dining-01-master-640.webp',
    alt: HOTEL_IMAGE_REGISTRY['dining-venue-01'].alt,
  },
];

interface CinematicHeroProps {
  onBookRoom?: () => void;
  onReserveTable?: () => void;
  onOrderFood?: () => void;
  onEnquireEvent?: () => void;
  onSelectSection?: (id: string) => void;
  onExplore?: () => void;
  scrollTargetId?: string;
  className?: string;
}

const SLIDE_DURATION_MS = 6000;

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onBookRoom,
  onReserveTable,
  onOrderFood,
  onEnquireEvent,
  onSelectSection,
  onExplore,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgressKey((prev) => prev + 1);
  }, []);

  const selectSlide = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setProgressKey((prev) => prev + 1);
  }, []);

  // Automatic Rotation every 6.0 seconds (paused on user hover, touch, or manual toggle)
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Touch swipe handling for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStart(null);
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  const activeSlide = HERO_SLIDES[currentIndex];

  const handleEventClick = () => {
    if (onEnquireEvent) {
      onEnquireEvent();
    } else if (onSelectSection) {
      onSelectSection('events');
    }
  };

  const handleDiningClick = () => {
    if (onReserveTable) {
      onReserveTable();
    } else if (onSelectSection) {
      onSelectSection('restaurant');
    }
  };

  return (
    <section
      id="hero"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hotel Rajwada Palace Welcome Experience"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[100svh] min-h-[680px] max-h-[1100px] flex items-end overflow-hidden bg-charcoal-deep select-none ${className}`}
    >
      {/* 1. Cinematic Crossfading Image Slides with Subtle Ken Burns Push-In */}
      <div className="absolute inset-0 select-none pointer-events-none" aria-hidden="true">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <picture className="w-full h-full block">
                {/* Modern responsive WebP sources */}
                <source
                  type="image/webp"
                  media="(max-width: 767px)"
                  srcSet={slide.srcWebpMobile}
                />
                <source
                  type="image/webp"
                  media="(min-width: 768px)"
                  srcSet={slide.srcWebpDesktop}
                />
                {/* Fallback sources */}
                <source media="(max-width: 767px)" srcSet={slide.srcMobile} />
                <source media="(min-width: 768px)" srcSet={slide.srcDesktop} />
                <img
                  src={slide.srcDesktop}
                  alt={slide.alt}
                  width={1920}
                  height={1080}
                  fetchPriority={idx === 0 ? 'high' : 'low'}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`w-full h-full object-cover object-[center_40%] md:object-center transform transition-transform duration-[7000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
              </picture>
            </div>
          );
        })}
      </div>

      {/* 2. Atmospheric & Lighting Multi-Layer Overlay */}
      <HeroOverlay />

      {/* 3. Lower-Left Foreground Content */}
      <div className="relative z-20 w-full pb-16 sm:pb-20 md:pb-24 lg:pb-28 pt-36">
        <Container size="xl">
          <div className="max-w-3xl lg:max-w-4xl text-left select-text">
            {/* Contextual Location Eyebrow & Verified Trust Tag */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="w-8 sm:w-12 h-[1.5px] bg-gold animate-line-expand" aria-hidden="true" />
              <span className="font-cinzel tracking-[0.22em] text-[10px] sm:text-xs text-gold uppercase font-semibold transition-all duration-500">
                {activeSlide.badge}
              </span>
              <span className="hidden sm:inline-block text-white/30 font-light">|</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-medium tracking-wide bg-gold/15 text-gold-light border border-gold/30 hover:border-gold/60 transition-colors">
                <span>★ 4.2 Rating</span>
                <span className="text-white/40">·</span>
                <span>460+ Verified Google Reviews</span>
              </span>
            </div>

            {/* Slide Title with Split Word Reveal (Skiper UI & Animmaster Inspiration) */}
            <h1 className="mb-3 sm:mb-4">
              <span className="block font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-normal leading-[1.08] text-ivory-light">
                <SplitTextReveal
                  text={activeSlide.title}
                  triggerKey={activeSlide.id}
                  baseDelayMs={80}
                  staggerMs={70}
                />
              </span>
            </h1>

            {/* Subtitle with Refined Blur-Fade Drift */}
            <p
              key={activeSlide.id}
              className="text-ivory-warm/90 font-light text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl animate-hero-reveal-2"
            >
              {activeSlide.subtitle}
            </p>

            {/* High-Visibility Real Commercial Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* Primary Call to Action: Book a Room / Enquire Now */}
              <button
                type="button"
                onClick={onBookRoom}
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.16em] bg-gold hover:bg-gold-light active:bg-gold-muted text-charcoal-deep border border-gold rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(194,166,118,0.45)] cursor-pointer shimmer-sweep animate-gold-glow hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book a Room</span>
                <svg
                  className="w-4 h-4 text-charcoal-deep group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              {/* Action 2: Weddings & Events */}
              <button
                type="button"
                onClick={handleEventClick}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.14em] bg-charcoal-surface/85 backdrop-blur-md text-ivory hover:text-gold hover:border-gold border border-white/20 rounded-full transition-all duration-300 cursor-pointer hover:bg-gold/10"
              >
                <span>Weddings & Events</span>
              </button>

              {/* Action 3: Restaurant */}
              <button
                type="button"
                onClick={handleDiningClick}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.14em] bg-charcoal-surface/85 backdrop-blur-md text-ivory hover:text-emerald-300 hover:border-emerald-400 border border-white/20 rounded-full transition-all duration-300 cursor-pointer hover:bg-emerald-500/10"
              >
                <span>Restaurant</span>
              </button>

              {/* Action 3b: Food Menu */}
              {onOrderFood && (
                <button
                  type="button"
                  onClick={onOrderFood}
                  className="hidden lg:inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.14em] bg-emerald-950/60 backdrop-blur-md text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 hover:border-emerald-400 rounded-full transition-all duration-300 cursor-pointer"
                >
                  <span>Food Menu</span>
                </button>
              )}

              {/* Action 4: Explore the Hotel */}
              {onExplore && (
                <button
                  type="button"
                  onClick={onExplore}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-3 text-xs uppercase tracking-[0.14em] text-sand/80 hover:text-ivory transition-colors cursor-pointer group skiper-link"
                >
                  <span>Explore the Hotel</span>
                  <span className="group-hover:translate-y-1 transition-transform duration-300 text-gold">↓</span>
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* 4. Interactive Scene Switcher with Micro-Tabs & Live Progress Bar */}
      <div className="absolute bottom-6 right-4 sm:right-6 md:right-8 z-30 flex items-center gap-2 sm:gap-3 bg-charcoal-deep/90 backdrop-blur-xl px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/15 shadow-2xl max-w-[calc(100vw-2rem)]">
        {/* Previous Arrow */}
        <button
          type="button"
          onClick={prevSlide}
          className="w-7 h-7 rounded-full flex items-center justify-center text-ivory/70 hover:text-gold hover:bg-white/5 transition-colors text-xs cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          aria-label="Previous scene"
        >
          ←
        </button>

        {/* Labeled Micro-Tabs for Each Scene */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => selectSlide(idx)}
                className={`relative px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'text-gold font-medium bg-white/[0.08] border border-gold/40'
                    : 'text-ivory/60 hover:text-ivory hover:bg-white/[0.04] border border-transparent'
                }`}
                aria-label={`Show ${slide.tabLabel}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                {/* Text Label (Short on small mobile, full on tablet/desktop) */}
                <span className="relative z-10 whitespace-nowrap">
                  {slide.tabLabel}
                </span>

                {/* Animated Progress Fill for Active Slide */}
                {isActive && (
                  <span
                    key={`progress-${progressKey}`}
                    className={`absolute bottom-0 left-0 h-[2px] bg-gold rounded-full ${
                      isPaused ? 'animate-hero-progress-paused' : 'animate-hero-progress'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={nextSlide}
          className="w-7 h-7 rounded-full flex items-center justify-center text-ivory/70 hover:text-gold hover:bg-white/5 transition-colors text-xs cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          aria-label="Next scene"
        >
          →
        </button>

        {/* Divider */}
        <span className="w-[1px] h-4 bg-white/20 hidden sm:inline-block" aria-hidden="true" />

        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          className="text-ivory/70 hover:text-gold text-[10px] sm:text-xs uppercase font-mono px-1.5 py-0.5 rounded transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1"
          aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
        >
          {isPaused ? (
            <>
              <span className="text-[10px]">▶</span>
              <span className="hidden md:inline">Play</span>
            </>
          ) : (
            <>
              <span className="text-[10px]">⏸</span>
              <span className="hidden md:inline">Pause</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
