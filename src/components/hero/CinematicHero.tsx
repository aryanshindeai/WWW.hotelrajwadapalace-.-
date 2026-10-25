import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HeroOverlay } from './HeroOverlay';
import { HeroContent } from './HeroContent';
import { Container } from '../Container';
import { HERO_SLIDES, type HeroSlide } from '../../data/heroData';

export type { HeroSlide };

interface CinematicHeroProps {
  onBookRoom?: () => void;
  onReserveTable?: () => void;
  onOrderFood?: () => void;
  onEnquireEvent?: (categoryTitle?: string) => void;
  onSelectSection?: (id: string) => void;
  onExplore?: () => void;
  scrollTargetId?: string;
  className?: string;
}

/** Slide rotation interval: 6000 milliseconds (matching The Grand Icon reference cadence) */
const SLIDE_DURATION_MS = 6000;

/** Smooth crossfade transition duration */
const CROSSFADE_MS = 750;

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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const targetTiltRef = useRef({ x: 0, y: 0 });

  // Detect reduced-motion preferences
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mq.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Continuous auto-advance with restart on manual user interaction
  const resetTimer = useCallback(() => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION_MS);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [resetTimer, currentIndex]);

  // Pre-decode next and previous slide images ahead of time for flicker-free crossfades
  useEffect(() => {
    if (typeof window === 'undefined' || !('Image' in window)) return;
    const nextIdx = (currentIndex + 1) % HERO_SLIDES.length;
    const prevIdx = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;

    [nextIdx, prevIdx].forEach((idx) => {
      const slide = HERO_SLIDES[idx];
      if (slide) {
        const img = new Image();
        img.src = window.innerWidth >= 1440
          ? slide.srcDesktop2560
          : window.innerWidth >= 1024
          ? slide.srcDesktop1600
          : window.innerWidth >= 768
          ? slide.srcTablet1080
          : slide.srcMobile720;
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      }
    });
  }, [currentIndex]);

  // Smooth lerp mouse tilt for desktop 3D perspective
  useEffect(() => {
    if (isReducedMotion) return;

    let isMounted = true;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateTilt = () => {
      if (!isMounted) return;
      setTilt((prev) => {
        const nextX = lerp(prev.x, targetTiltRef.current.x, 0.08);
        const nextY = lerp(prev.y, targetTiltRef.current.y, 0.08);
        if (Math.abs(nextX - prev.x) < 0.001 && Math.abs(nextY - prev.y) < 0.001) {
          return prev;
        }
        return { x: nextX, y: nextY };
      });
      animFrameRef.current = requestAnimationFrame(updateTilt);
    };

    animFrameRef.current = requestAnimationFrame(updateTilt);
    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isReducedMotion]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isReducedMotion || e.pointerType === 'touch') return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle 3D tilt coordinates: rotateX, rotateY in degrees
    targetTiltRef.current = {
      x: normalizedY * -4.5, // vertical tilt
      y: normalizedX * 5.5,  // horizontal tilt
    };
  };

  const handlePointerLeave = () => {
    targetTiltRef.current = { x: 0, y: 0 };
  };

  // Touch swipe handling for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      nextSlide();
      resetTimer();
    } else if (diff < -45) {
      prevSlide();
      resetTimer();
    }
    setTouchStart(null);
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      resetTimer();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      resetTimer();
    }
  };

  const activeSlide = HERO_SLIDES[currentIndex];

  // Primary CTA mapping per slide
  const handlePrimaryAction = () => {
    if (currentIndex === 1) {
      // Royal Banquet Celebrations
      if (onEnquireEvent) onEnquireEvent('Royal Banquet Celebrations');
      else if (onSelectSection) onSelectSection('events');
      else onBookRoom?.();
    } else if (currentIndex === 2) {
      // Grand Wedding & Mandap Ceremony
      if (onEnquireEvent) onEnquireEvent('Grand Wedding & Mandap Ceremony');
      else if (onSelectSection) onSelectSection('events');
      else onBookRoom?.();
    } else if (currentIndex === 4) {
      // Twilight Terrace & Dining -> Reserve table
      if (onReserveTable) onReserveTable();
      else onBookRoom?.();
    } else {
      // The Palace & Suites -> Book Room
      onBookRoom?.();
    }
  };

  // Secondary CTA mapping per slide
  const handleSecondaryAction = () => {
    if (currentIndex === 1) {
      if (onSelectSection) onSelectSection('events');
      else onExplore?.();
    } else if (currentIndex === 2) {
      if (onSelectSection) onSelectSection('events');
      else onEnquireEvent?.('Grand Wedding & Mandap Ceremony');
    } else if (currentIndex === 3) {
      if (onSelectSection) onSelectSection('rooms');
      else onBookRoom?.();
    } else if (currentIndex === 4) {
      if (onOrderFood) onOrderFood();
      else if (onSelectSection) onSelectSection('restaurant');
      else onReserveTable?.();
    } else {
      if (onExplore) onExplore();
      else if (onSelectSection) onSelectSection('overview');
      else onBookRoom?.();
    }
  };

  const handleScrollToOverview = () => {
    const el = document.getElementById(scrollTargetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hotel Rajwada Palace Welcome Experience"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-screen min-h-[620px] max-h-[1200px] flex items-center justify-center overflow-hidden bg-[#0a0b0d] select-none ${className}`}
    >
      {/* 1. Cinematic Multi-Layer Responsive Imagery with 3D Depth & Ken Burns Zoom */}
      <div
        className="absolute inset-0 select-none pointer-events-none will-change-transform"
        style={{
          transform: !isReducedMotion
            ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.02, 1.02, 1)`
            : undefined,
          transition: 'transform 0.15s ease-out',
        }}
        aria-hidden="true"
      >
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
              className={`absolute inset-0 transition-all ease-in-out ${
                isActive
                  ? 'opacity-100 z-10 scale-100 pointer-events-auto'
                  : 'opacity-0 z-0 scale-[1.03] pointer-events-none'
              }`}
            >
              <picture className="w-full h-full block">
                {/* 4K and QHD Retina Displays (1440px and up) */}
                <source
                  type="image/webp"
                  media="(min-width: 1440px)"
                  srcSet={slide.srcDesktop2560}
                />
                {/* High-Resolution Full HD Desktop (1024px - 1439px) */}
                <source
                  type="image/webp"
                  media="(min-width: 1024px)"
                  srcSet={slide.srcDesktop1600}
                />
                {/* Tablet (768px - 1023px) */}
                <source
                  type="image/webp"
                  media="(min-width: 768px)"
                  srcSet={slide.srcTablet1080}
                />
                {/* Mobile Portrait Crop (under 768px) */}
                <source
                  type="image/webp"
                  media="(max-width: 767px)"
                  srcSet={slide.srcMobile720}
                />
                {/* Fallback progressive JPEGs */}
                <source
                  media="(min-width: 768px)"
                  srcSet={slide.srcFallbackJpg}
                />
                <source
                  media="(max-width: 767px)"
                  srcSet={slide.srcMobile720.replace('.webp', '.jpg')}
                />
                <img
                  src={slide.srcFallbackJpg}
                  alt={slide.alt}
                  width={2560}
                  height={1440}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`w-full h-full object-cover filter brightness-[0.92] contrast-[1.06] ${
                    isActive && !isReducedMotion ? 'animate-hero-zoom' : 'scale-100'
                  }`}
                />
              </picture>
            </div>
          );
        })}
      </div>

      {/* 2. Luminous Multi-Layer Atmospheric Overlay (Matching The Grand Icon) */}
      <HeroOverlay />

      {/* 3. Hero Foreground Content with Counter-Parallax */}
      <div
        className="relative z-20 w-full px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 flex items-center justify-center"
        style={{
          transform: !isReducedMotion
            ? `translate3d(${(-tilt.y * 3.5).toFixed(1)}px, ${(-tilt.x * 3.5).toFixed(1)}px, 0)`
            : undefined,
          transition: 'transform 0.15s ease-out',
        }}
      >
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
            onExploreRooms={handleSecondaryAction}
            onExploreDining={handleSecondaryAction}
          />
        </Container>
      </div>

      {/* 4. Left & Right Circular Navigation Chevrons (Grand Icon Style) */}
      <button
        type="button"
        onClick={() => {
          prevSlide();
          resetTimer();
        }}
        aria-label="Previous Hero Slide"
        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/45 border border-[#C5A859]/30 hover:border-[#C5A859] hover:bg-[#C5A859] text-[#C5A859] hover:text-[#0f1012] backdrop-blur-sm transition-all duration-300 absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 cursor-pointer shadow-lg hover:scale-105 active:scale-95 group"
      >
        <svg
          className="w-5 h-5 text-current transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => {
          nextSlide();
          resetTimer();
        }}
        aria-label="Next Hero Slide"
        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/45 border border-[#C5A859]/30 hover:border-[#C5A859] hover:bg-[#C5A859] text-[#C5A859] hover:text-[#0f1012] backdrop-blur-sm transition-all duration-300 absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 cursor-pointer shadow-lg hover:scale-105 active:scale-95 group"
      >
        <svg
          className="w-5 h-5 text-current transition-transform duration-200 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 5. Editorial Scroll Down Cue on Bottom-Left */}
      <div className="hidden md:flex items-center gap-3 absolute bottom-10 left-10 lg:left-14 z-30">
        <button
          type="button"
          onClick={handleScrollToOverview}
          className="group flex items-center gap-2.5 text-xs uppercase tracking-[0.22em] text-white/70 hover:text-[#C5A859] transition-colors cursor-pointer"
          aria-label="Scroll to discover Hotel Rajwada Palace"
        >
          <span className="w-8 h-[1px] bg-[#C5A859]/60 group-hover:w-12 transition-all duration-300" />
          <span className="font-sans text-[11px] font-medium tracking-[0.2em]">Explore</span>
          <svg className="w-3.5 h-3.5 text-[#C5A859] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* 6. Elegant Slide Indicators with Elongated Active Gold Bar on Bottom-Right */}
      <div
        className="absolute z-30 flex items-center gap-2.5 bottom-7 left-1/2 -translate-x-1/2 md:bottom-11 md:right-12 md:left-auto md:translate-x-0"
        role="tablist"
        aria-label="Hero Experience Scenes"
      >
        <span className="hidden lg:inline-block font-sans text-[11px] text-[#C5A859]/80 uppercase tracking-[0.18em] mr-2">
          {String(currentIndex + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Switch to slide ${idx + 1}: ${slide.tabLabel}`}
              onClick={() => {
                setCurrentIndex(idx);
                resetTimer();
              }}
              className={`transition-all duration-500 rounded-full cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A859] ${
                isActive
                  ? 'w-7 sm:w-9 h-[4px] bg-[#C5A859] shadow-[0_0_12px_rgba(197,168,89,0.8)]'
                  : 'w-[6px] h-[4px] bg-white/40 hover:bg-white/80'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};
