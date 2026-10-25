import React, { useState, useEffect, useRef } from 'react';
import { BrandMark } from './BrandMark';
import { DesktopNav } from './DesktopNav';
import { MobileMenuButton } from './MobileMenuButton';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { type NavItem } from './NavLink';
import { trackCallClick } from '../../lib/supabase';

// Primary clear navigation links
export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'top', label: 'Home', href: '#top' },
  { id: 'rooms', label: 'Rooms & Suites', href: '#rooms' },
  { id: 'restaurant', label: 'Restaurant', href: '#restaurant' },
  { id: 'food-menu', label: 'Food Menu', href: '#food-menu' },
  { id: 'events', label: 'Weddings & Events', href: '#events' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  activeSectionId?: string;
  onSelectSection?: (id: string) => void;
  onBookRoom?: () => void;
  onReserveTable?: () => void;
  onOrderFood?: () => void;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSectionId,
  onSelectSection,
  onBookRoom,
  onReserveTable,
  onOrderFood,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(activeSectionId || '');
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (activeSectionId !== undefined) {
      setActiveItem(activeSectionId);
    }
  }, [activeSectionId]);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsScrolled(currentScrollY > 30);

          if (currentScrollY <= 80) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollYRef.current + 12) {
            // keep docked smoothly
            setIsVisible(true);
          } else if (currentScrollY < lastScrollYRef.current - 5) {
            setIsVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          tickingRef.current = false;
        });

        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemSelect = (id: string) => {
    setActiveItem(id);
    if (id === 'food-menu') {
      if (onOrderFood) onOrderFood();
      else onSelectSection?.('restaurant');
    } else {
      onSelectSection?.(id);
    }
  };

  return (
    <>
      {/* 
        ARCHITECTURAL FULL-WIDTH LUXURY HEADER (Matching The Grand Icon Reference)
        Seamless top integration with subtle atmospheric dark top gradient
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isScrolled
            ? 'bg-[#0b0c0e]/92 backdrop-blur-md border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-3 sm:py-3.5'
            : 'bg-transparent py-4 sm:py-5 lg:py-6'
        } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-95'} ${className}`}
      >
        {/* Soft top atmospheric vignette when unscrolled for legibility over bright hero slides */}
        {!isScrolled && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent -z-10"
            aria-hidden="true"
          />
        )}

        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* 1. Official Brand Wordmark & Royal Emblem on Left */}
          <div className="flex-shrink-0">
            <BrandMark
              isScrolled={isScrolled}
              onClick={() => handleItemSelect('top')}
            />
          </div>

          {/* 2. Center Editorial Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <DesktopNav
              items={MAIN_NAV_ITEMS}
              activeId={activeItem}
              onSelect={handleItemSelect}
            />
          </div>

          {/* 3. Right: Prominent Reference-Matched Action CTAs */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            {/* Direct Call Reception Link */}
            <a
              href="tel:+919921019664"
              onClick={() => trackCallClick('header')}
              className="group inline-flex items-center gap-1.5 px-2.5 py-2 text-[11px] xl:text-xs uppercase tracking-[0.14em] font-sans font-medium text-white/80 hover:text-[#C5A859] transition-colors"
              aria-label="Call Reception: 099210 19664"
            >
              <svg
                className="w-3.5 h-3.5 text-[#C5A859] flex-shrink-0 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="hidden xl:inline">Call: 099210 19664</span>
            </a>

            {/* Optional Dining Table Reservation */}
            {onReserveTable && (
              <button
                type="button"
                onClick={onReserveTable}
                className="hidden xl:inline-flex items-center justify-center px-3 py-2 text-[11px] xl:text-xs uppercase tracking-[0.14em] font-sans font-medium text-white/80 hover:text-[#C5A859] transition-colors cursor-pointer"
              >
                <span>Reserve Table</span>
              </button>
            )}

            {/* Reference-Matched Gold Border "BOOK NOW" Button */}
            <button
              type="button"
              onClick={onBookRoom}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-sans font-semibold text-[#C5A859] hover:text-[#111315] bg-transparent hover:bg-[#C5A859] border border-[#C5A859] rounded-[2px] transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(197,168,89,0.35)] cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-current flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>BOOK NOW</span>
            </button>
          </div>

          {/* 4. Tablet & Mobile Controls (Calendar Quick CTA + Hamburger Menu) */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-2.5">
            {/* Calendar Quick Booking Trigger (Matching Tablet/Mobile Grand Icon) */}
            <button
              type="button"
              onClick={onBookRoom}
              aria-label="Book Now"
              className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 border border-[#C5A859] text-[#C5A859] hover:bg-[#C5A859] hover:text-[#111315] rounded-[2px] transition-colors cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-current"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>

            {/* Mobile Hamburger Trigger */}
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </header>

      {/* 5. Mobile Menu Overlay with All Actions */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={MAIN_NAV_ITEMS}
        activeId={activeItem}
        onSelect={handleItemSelect}
        onBookRoom={onBookRoom}
      />
    </>
  );
};
