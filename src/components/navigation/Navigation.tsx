import React, { useState, useEffect, useRef } from 'react';
import { BrandMark } from './BrandMark';
import { DesktopNav } from './DesktopNav';
import { MobileMenuButton } from './MobileMenuButton';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { type NavItem } from './NavLink';

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
        FLOATING CYLINDRICAL / PILL-SHAPED LUXURY NAVIGATION BAR
        Floating top container with refined padding and maximum readability
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isScrolled
            ? 'py-2 sm:py-3'
            : 'py-4 sm:py-6'
        } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-95'} ${className}`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Cylindrical / Pill Floating Container */}
          <div
            className={`w-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 ${
              isScrolled
                ? 'liquid-glass-nav bg-charcoal-deep/95 border border-gold/25 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_24px_rgba(194,166,118,0.08)]'
                : 'bg-charcoal-deep/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
            }`}
          >
            {/* 1. Brand Wordmark on Left */}
            <div className="flex-shrink-0 pr-3">
              <BrandMark
                isScrolled={isScrolled}
                onClick={() => handleItemSelect('top')}
              />
            </div>

            {/* 2. Center Editorial Links (Desktop / Large Displays) */}
            <div className="hidden xl:flex items-center">
              <DesktopNav
                items={MAIN_NAV_ITEMS}
                activeId={activeItem}
                onSelect={handleItemSelect}
              />
            </div>

            {/* 3. Right: Prominent Cylindrical Action CTAs */}
            <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Call Now Button with Icon */}
              <a
                href="tel:+919921019664"
                className="group inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs uppercase tracking-[0.12em] font-sans font-medium text-ivory/90 hover:text-gold border border-white/15 hover:border-gold/40 rounded-full transition-all duration-300 hover:bg-white/[0.04]"
                aria-label="Call Now: 099210 19664"
              >
                <svg
                  className="w-3.5 h-3.5 text-gold flex-shrink-0 transform transition-transform duration-300 group-hover:rotate-12"
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
                <span className="hidden md:inline">Call Now</span>
              </a>

              {/* Reserve a Table CTA */}
              {onReserveTable && (
                <button
                  type="button"
                  onClick={onReserveTable}
                  className="hidden md:inline-flex items-center justify-center px-3.5 py-2 text-xs uppercase tracking-[0.12em] font-sans font-medium text-ivory/90 hover:text-gold border border-white/15 hover:border-gold/40 rounded-full transition-all duration-300 hover:bg-white/[0.04] cursor-pointer"
                >
                  <span>Table</span>
                </button>
              )}

              {/* Order Food CTA */}
              {onOrderFood && (
                <button
                  type="button"
                  onClick={onOrderFood}
                  className="hidden lg:inline-flex items-center justify-center px-3.5 py-2 text-xs uppercase tracking-[0.12em] font-sans font-medium text-emerald-300 hover:text-emerald-200 border border-emerald-500/30 hover:border-emerald-400 rounded-full transition-all duration-300 hover:bg-emerald-500/10 cursor-pointer"
                >
                  <span>Food Menu</span>
                </button>
              )}

              {/* Primary Book a Room CTA (Visually Most Prominent) */}
              <button
                type="button"
                onClick={onBookRoom}
                className="shimmer-sweep group relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-xs uppercase tracking-[0.15em] font-sans font-semibold text-charcoal-deep bg-gold hover:bg-gold-light active:bg-gold-muted border border-gold hover:border-gold-light rounded-full transition-all duration-300 shadow-md hover:shadow-[0_4px_24px_rgba(194,166,118,0.35)] cursor-pointer overflow-hidden"
              >
                <span>Book a Room</span>
              </button>
            </div>

            {/* 4. Mobile Menu Trigger */}
            <div className="flex items-center sm:hidden">
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
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
