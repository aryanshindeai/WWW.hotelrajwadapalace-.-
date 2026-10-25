import React, { useEffect, useRef } from 'react';
import { type GalleryItem } from '../../data/galleryData';

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onBookRoom?: (roomName?: string) => void;
  onEnquireDining?: () => void;
  onEnquireEvent?: (categoryTitle?: string) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onSelectIndex,
  onBookRoom,
  onEnquireDining,
  onEnquireEvent,
}) => {
  const currentItem = items[currentIndex] || items[0];
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation: ESC closes, Arrow keys navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onSelectIndex((currentIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onSelectIndex((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'Home') {
        e.preventDefault();
        onSelectIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        onSelectIndex(items.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onSelectIndex]);

  // Lock body scroll when open and autofocus close button
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Scroll active thumbnail into view in filmstrip
  useEffect(() => {
    if (isOpen && filmstripRef.current) {
      const activeThumb = filmstripRef.current.children[currentIndex] as HTMLElement | undefined;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [isOpen, currentIndex]);

  // Touch Swipe Handlers for mobile gestures
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartXRef.current - touchEndX;
    const diffY = touchStartYRef.current - touchEndY;

    // Minimum horizontal threshold (45px) and predominantly horizontal
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        onSelectIndex((currentIndex + 1) % items.length);
      } else {
        onSelectIndex((currentIndex - 1 + items.length) % items.length);
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  if (!isOpen || !currentItem) return null;

  // Contextual action button depending on image category
  const renderContextualCTA = () => {
    if (currentItem.category === 'weddings' || currentItem.category === 'other-events') {
      if (onEnquireEvent) {
        return (
          <button
            type="button"
            onClick={() => {
              onClose();
              onEnquireEvent(currentItem.title);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/15 hover:bg-gold text-gold hover:text-charcoal-deep border border-gold/40 text-xs font-cinzel tracking-wider uppercase transition-all duration-300 cursor-pointer"
          >
            <span>Enquire for Events</span>
            <span aria-hidden="true">↗</span>
          </button>
        );
      }
    } else if (currentItem.category === 'rooms') {
      if (onBookRoom) {
        return (
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookRoom(currentItem.title);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/15 hover:bg-gold text-gold hover:text-charcoal-deep border border-gold/40 text-xs font-cinzel tracking-wider uppercase transition-all duration-300 cursor-pointer"
          >
            <span>Book This Room</span>
            <span aria-hidden="true">↗</span>
          </button>
        );
      }
    } else if (currentItem.category === 'restaurant') {
      if (onEnquireDining) {
        return (
          <button
            type="button"
            onClick={() => {
              onClose();
              onEnquireDining();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/15 hover:bg-gold text-gold hover:text-charcoal-deep border border-gold/40 text-xs font-cinzel tracking-wider uppercase transition-all duration-300 cursor-pointer"
          >
            <span>Reserve Table</span>
            <span aria-hidden="true">↗</span>
          </button>
        );
      }
    }
    return null;
  };

  const nextIndex = (currentIndex + 1) % items.length;
  const prevIndex = (currentIndex - 1 + items.length) % items.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery full screen viewer"
      className="fixed inset-0 z-50 bg-[#06080B]/98 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-5 lg:p-6 select-none animate-fadeIn"
      onClick={(e) => {
        // Close if clicked directly on overlay background
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* 1. Preload Adjacent Images for Instant Switching */}
      <link rel="preload" as="image" href={items[nextIndex].srcDesktop} />
      <link rel="preload" as="image" href={items[prevIndex].srcDesktop} />

      {/* 2. Top Header Bar: Counter, Badges, Contextual CTA, and Close Control */}
      <header className="flex items-center justify-between border-b border-white/10 pb-3 z-30">
        <div className="flex items-center gap-2.5 sm:gap-4">
          <span className="font-mono text-xs sm:text-sm text-gold tracking-widest font-semibold">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span className="w-3.5 h-[1px] bg-gold/40" aria-hidden="true" />
          <span className="font-cinzel text-xs tracking-[0.2em] uppercase text-ivory">
            {currentItem.categoryLabel}
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Verified Property
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {renderContextualCTA()}

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-surface/80 hover:bg-gold hover:text-charcoal-deep border border-white/15 hover:border-gold text-ivory text-xs font-cinzel tracking-wider uppercase transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer"
            aria-label="Close image viewer"
          >
            <span>Close</span>
            <span className="text-xs font-mono text-sand/60 hidden sm:inline">[ESC]</span>
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </header>

      {/* 3. Main Image Presentation with Navigation Arrows & Touch Swipe */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex-1 flex items-center justify-center my-2 sm:my-3 overflow-hidden touch-pan-y"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onSelectIndex(prevIndex)}
          className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-charcoal-deep/80 backdrop-blur-md border border-white/15 text-ivory hover:text-charcoal-deep hover:bg-gold hover:border-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer shadow-xl"
          aria-label="Previous photograph"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Display Image with Picture tag */}
        <div className="max-h-[68vh] sm:max-h-[72vh] max-w-[94vw] lg:max-w-[88vw] overflow-hidden rounded-xl border border-white/10 bg-charcoal-surface shadow-2xl flex items-center justify-center">
          <picture>
            <source
              type="image/webp"
              srcSet={currentItem.srcDesktop.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
            />
            <img
              key={currentItem.id}
              src={currentItem.srcDesktop}
              alt={currentItem.alt}
              decoding="async"
              className="max-h-[68vh] sm:max-h-[72vh] max-w-[94vw] lg:max-w-[88vw] object-contain transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </picture>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onSelectIndex(nextIndex)}
          className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-charcoal-deep/80 backdrop-blur-md border border-white/15 text-ivory hover:text-charcoal-deep hover:bg-gold hover:border-gold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer shadow-xl"
          aria-label="Next photograph"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 4. Bottom Information Bar & Filmstrip Navigator */}
      <footer className="border-t border-white/10 pt-3 z-30 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-1.5">
          <div>
            <h3 className="font-serif text-base sm:text-lg lg:text-xl text-ivory-light font-light leading-snug">
              {currentItem.title}
            </h3>
            {currentItem.caption && (
              <p className="text-xs sm:text-sm text-sand/80 font-sans mt-0.5 line-clamp-1">
                {currentItem.caption}
              </p>
            )}
          </div>
          <div className="text-[10px] font-mono tracking-widest uppercase text-sand/60">
            Hotel Rajwada Palace · Chandrapur
          </div>
        </div>

        {/* Interactive Thumbnail Filmstrip (Visible on screens above 640px) */}
        <div
          ref={filmstripRef}
          className="hidden sm:flex items-center gap-2 overflow-x-auto scrollbar-none py-1"
          aria-label="Thumbnail filmstrip"
        >
          {items.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectIndex(idx)}
                className={`flex-shrink-0 w-14 h-10 rounded-md overflow-hidden border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-gold ring-2 ring-gold/40 scale-105 opacity-100'
                    : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                }`}
                aria-label={`Jump to photograph ${idx + 1}: ${item.title}`}
              >
                <img
                  src={item.srcDesktop}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden text-center text-[10px] text-sand/60 font-mono tracking-wider">
          Swipe left or right to browse photos
        </div>
      </footer>
    </div>
  );
};
