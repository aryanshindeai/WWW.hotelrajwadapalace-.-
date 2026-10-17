import React, { useState, useEffect, useCallback } from 'react';
import { HeroOverlay } from './HeroOverlay';
import { HeroContent } from './HeroContent';
import { ScrollIndicator } from './ScrollIndicator';
import { Container } from '../Container';

import { HERO_SLIDES, type HeroSlide } from '../../data/heroData';

export type { HeroSlide };

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

/** Slide rotation interval: exactly 5000 milliseconds (5 seconds) */
const SLIDE_DURATION_MS = 5000;

/** Smooth crossfade transition duration: 500 milliseconds (0.5 seconds) */
const CROSSFADE_MS = 500;

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onBookRoom,
  onReserveTable,
  onOrderFood,
  onEnquireEvent,
  onSelectSection,
  onExplore,
  scrollTargetId = 'overview',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // --- Continuous auto-advance: exactly every 5000 ms (5 seconds), single active timer, zero leaks ---
  useEffect(() => {
    // Respect prefers-reduced-motion — halt automatic transitions
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);

  // Pre-decode next slide image ahead of time to ensure flicker-free, instant crossfades
  useEffect(() => {
    const nextIdx = (currentIndex + 1) % HERO_SLIDES.length;
    const nextSlideData = HERO_SLIDES[nextIdx];
    if (typeof window !== 'undefined' && nextSlideData && 'Image' in window) {
      const img = new Image();
      img.src = window.innerWidth >= 1024 
        ? nextSlideData.srcWebpDesktop 
        : nextSlideData.srcWebpMobile;
      if ('decode' in img) {
        img.decode().catch(() => {
          // Non-critical: ignore decode interruptions on quick slide changes
        });
      }
    }
  }, [currentIndex]);

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

  // Primary CTA Action mapped per slide
  const handlePrimaryAction = () => {
    if (currentIndex === 1) {
      // Weddings slide -> Enquire event or book room
      if (onEnquireEvent) onEnquireEvent();
      else if (onSelectSection) onSelectSection('events');
      else onBookRoom?.();
    } else if (currentIndex === 3) {
      // Dining slide -> Reserve table
      if (onReserveTable) onReserveTable();
      else onBookRoom?.();
    } else {
      // Default / Facade / Rooms -> Book room
      onBookRoom?.();
    }
  };

  // Secondary CTA Action mapped per slide
  const handleSecondaryAction = () => {
    if (currentIndex === 3) {
      // Dining slide -> Food Menu
      if (onOrderFood) onOrderFood();
      else onSelectSection?.('restaurant');
    } else if (currentIndex === 2) {
      // Rooms slide -> Explore Rooms section
      if (onSelectSection) onSelectSection('rooms');
      else onBookRoom?.();
    } else {
      // Default / Facade / Weddings -> Explore Weddings section
      if (onSelectSection) onSelectSection('events');
      else onEnquireEvent?.();
    }
  };

  // Tertiary CTA Action mapped per slide
  const handleTertiaryAction = () => {
    if (currentIndex === 0) {
      // Facade slide -> Explore Dining section
      if (onSelectSection) onSelectSection('restaurant');
      else {
        const diningEl = document.getElementById('experience') || document.getElementById('restaurant');
        if (diningEl) diningEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (currentIndex === 2) {
      // Rooms slide -> Direct Call
      window.location.href = 'tel:+919921019664';
    } else if (currentIndex === 1) {
      // Weddings slide -> Book a Stay
      onBookRoom?.();
    } else if (currentIndex === 3) {
      // Dining slide -> Book a Stay
      onBookRoom?.();
    } else {
      if (onExplore) onExplore();
      else onBookRoom?.();
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[100svh] min-h-[660px] max-h-[1050px] flex items-end overflow-hidden bg-[#101317] select-none ${className}`}
    >
      {/* 1. Ultra-Sharp Crossfading Image Slides — no scale transform, full-quality eager load */}
      <div className="absolute inset-0 select-none pointer-events-none" aria-hidden="true">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
              className={`absolute inset-0 transition-opacity ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <picture
                className={`w-full h-full block transition-transform duration-[3500ms] ease-out will-change-transform ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
              >
                {/* Full-resolution WebP — desktop (1600px) */}
                <source
                  type="image/webp"
                  media="(min-width: 1024px)"
                  srcSet={slide.srcWebpDesktop}
                />
                {/* Mid-resolution WebP — tablet */}
                {slide.srcWebpTablet && (
                  <source
                    type="image/webp"
                    media="(min-width: 768px) and (max-width: 1023px)"
                    srcSet={slide.srcWebpTablet}
                  />
                )}
                {/* Mobile WebP */}
                <source
                  type="image/webp"
                  media="(max-width: 767px)"
                  srcSet={slide.srcWebpMobile}
                />
                {/* Fallback full-size JPEG — no downscale */}
                <source media="(min-width: 768px)" srcSet={slide.srcDesktop} />
                <source media="(max-width: 767px)" srcSet={slide.srcMobile} />
                <img
                  src={slide.srcDesktop}
                  alt={slide.alt}
                  width={1920}
                  height={1080}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  loading="eager"
                  decoding="async"
                  style={{ imageRendering: 'high-quality' } as unknown as React.CSSProperties}
                  className="w-full h-full object-cover object-[center_35%] md:object-[center_30%] lg:object-[center_35%]"
                />
              </picture>
            </div>
          );
        })}
      </div>

      {/* 2. Atmospheric & Lighting Multi-Layer Architectural Overlay */}
      <HeroOverlay />

      {/* 3. Lower-Left Foreground Content */}
      <div className="relative z-20 w-full pb-14 sm:pb-20 md:pb-24 lg:pb-28 pt-32 sm:pt-36 lg:pt-40">
        <Container size="xl">
          <HeroContent
            key={activeSlide.id}
            badge={activeSlide.badge}
            titlePart1={activeSlide.titlePart1}
            titlePart2={activeSlide.titlePart2}
            subtitle={activeSlide.subtitle}
            locationDetails={activeSlide.locationDetails}
            primaryLabel={activeSlide.primaryLabel}
            secondaryLabel={activeSlide.secondaryLabel}
            tertiaryLabel={activeSlide.tertiaryLabel}
            onBookRoom={handlePrimaryAction}
            onExploreWeddings={handleSecondaryAction}
            onExploreRooms={handleTertiaryAction}
            onExploreDining={handleTertiaryAction}
          />
        </Container>
      </div>

      {/* 4. Minimal Dot Progress Indicators — auto-runs, no controls */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"
        aria-hidden="true"
      >
        {HERO_SLIDES.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <span
              key={idx}
              className={`block rounded-full transition-all duration-500 ${
                isActive
                  ? 'w-6 h-[3px] bg-[#C7A66B]'
                  : 'w-[3px] h-[3px] bg-white/35'
              }`}
            />
          );
        })}
      </div>

      {/* 5. Editorial Scroll Down Indicator */}
      <ScrollIndicator targetId={scrollTargetId} />
    </section>
  );
};
