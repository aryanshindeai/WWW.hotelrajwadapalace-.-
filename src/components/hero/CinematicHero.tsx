import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HeroOverlay } from './HeroOverlay';
import { Container } from '../Container';
import { HOTEL_IMAGE_REGISTRY } from '../../data/hotelImageRegistry';

export interface HeroSlide {
  id: string;
  srcDesktop: string;
  srcMobile: string;
  alt: string;
  tag: string;
  title: string;
  subtitle: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-facade',
    srcDesktop: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].srcMobile || HOTEL_IMAGE_REGISTRY['hero-exterior-01'].src,
    alt: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].alt,
    tag: 'CHANDRAPUR · MAHARASHTRA',
    title: 'Hotel Rajwada Palace',
    subtitle: 'A regal sanctuary of authentic hospitality, comfortable stays, and grand celebrations near Tadoba corridor.',
  },
  {
    id: 'hero-rooms',
    srcDesktop: HOTEL_IMAGE_REGISTRY['room-category-01'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['room-category-01'].src,
    alt: HOTEL_IMAGE_REGISTRY['room-category-01'].alt,
    tag: 'COMFORTABLE ACCOMMODATION',
    title: 'Rooms & Executive Suites',
    subtitle: 'Air-conditioned deluxe rooms and spacious quarters designed for restful unwinding and family stays.',
  },
  {
    id: 'hero-dining',
    srcDesktop: HOTEL_IMAGE_REGISTRY['dining-venue-01'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['dining-venue-01'].src,
    alt: HOTEL_IMAGE_REGISTRY['dining-venue-01'].alt,
    tag: 'FINE VEGETARIAN DINING',
    title: 'Rajwada Dining Hall',
    subtitle: 'Delicious Indian vegetarian delicacies, aromatic biryanis, tandoori breads, and banquet feasts.',
  },
  {
    id: 'hero-weddings',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].alt,
    tag: 'GRAND CELEBRATIONS & BANQUETS',
    title: 'Weddings & Celebrations',
    subtitle: 'Decorated wedding stages, grand chandelier halls, and open-air rooftop grounds for life’s grandest moments.',
  },
];

interface CinematicHeroProps {
  onBookRoom?: () => void;
  onReserveTable?: () => void;
  onOrderFood?: () => void;
  onExplore?: () => void;
  scrollTargetId?: string;
  className?: string;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onBookRoom,
  onReserveTable,
  onOrderFood,
  onExplore,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Automatic Rotation every 5.5 seconds (paused on hover or interaction)
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

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

  const activeSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      id="hero"
      aria-label="Hotel Rajwada Palace Welcome Experience"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[100svh] min-h-[660px] max-h-[1100px] flex items-end overflow-hidden bg-charcoal-deep ${className}`}
    >
      {/* 1. Cinematic Crossfading Image Slides */}
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
                <source media="(max-width: 767px)" srcSet={slide.srcMobile} />
                <source media="(min-width: 768px)" srcSet={slide.srcDesktop} />
                <img
                  src={slide.srcDesktop}
                  alt={slide.alt}
                  fetchPriority={idx === 0 ? 'high' : 'low'}
                  decoding="async"
                  className={`w-full h-full object-cover object-center transform transition-transform duration-[6500ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
              </picture>
            </div>
          );
        })}
      </div>

      {/* 2. Atmospheric & Lighting Overlay */}
      <HeroOverlay />

      {/* 3. Lower-Left Foreground Content */}
      <div className="relative z-20 w-full pb-14 sm:pb-16 md:pb-20 lg:pb-24 pt-36">
        <Container size="xl">
          <div className="max-w-3xl lg:max-w-4xl text-left select-text">
            {/* Contextual Location Eyebrow */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="w-8 sm:w-12 h-[1.5px] bg-gold" aria-hidden="true" />
              <span className="font-cinzel tracking-[0.25em] text-[11px] sm:text-xs text-gold uppercase font-semibold">
                {activeSlide.tag}
              </span>
            </div>

            {/* Slide Title */}
            <h1 className="mb-3 sm:mb-4">
              <span className="block font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-normal leading-[1.05] text-ivory-light">
                {activeSlide.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-ivory-warm/90 font-light text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              {activeSlide.subtitle}
            </p>

            {/* Distinct Action Buttons (Room Booking, Table, Order Food, Explore) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              {/* Primary Book a Room CTA */}
              <button
                type="button"
                onClick={onBookRoom}
                className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.16em] bg-gold text-charcoal-deep hover:bg-gold-light active:bg-gold-muted border border-gold rounded-full transition-all duration-300 shadow-lg hover:shadow-gold/20 cursor-pointer"
              >
                Book a Room
              </button>

              {/* Reserve a Table CTA */}
              <button
                type="button"
                onClick={onReserveTable}
                className="px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.14em] bg-charcoal-surface/85 backdrop-blur-md text-ivory hover:text-gold hover:border-gold border border-white/20 rounded-full transition-all duration-300 cursor-pointer"
              >
                Reserve Table
              </button>

              {/* Order Food CTA */}
              {onOrderFood && (
                <button
                  type="button"
                  onClick={onOrderFood}
                  className="px-5 sm:px-6 py-3.5 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.14em] bg-emerald-950/70 backdrop-blur-md text-emerald-300 hover:text-emerald-200 hover:border-emerald-400 border border-emerald-500/30 rounded-full transition-all duration-300 cursor-pointer hidden sm:inline-flex"
                >
                  Order Food
                </button>
              )}

              {/* Explore Button */}
              {onExplore && (
                <button
                  type="button"
                  onClick={onExplore}
                  className="px-4 py-3 text-xs uppercase tracking-[0.14em] text-sand/80 hover:text-ivory transition-colors cursor-pointer hidden md:inline-flex"
                >
                  Explore Details ↓
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* 4. Carousel Slide Indicators & Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-charcoal-deep/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <button
          type="button"
          onClick={prevSlide}
          className="text-ivory/70 hover:text-gold p-1 text-xs transition-colors"
          aria-label="Previous image slide"
        >
          ←
        </button>

        <div className="flex items-center gap-1.5">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-gold' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="text-ivory/70 hover:text-gold p-1 text-xs transition-colors"
          aria-label="Next image slide"
        >
          →
        </button>
      </div>
    </section>
  );
};
