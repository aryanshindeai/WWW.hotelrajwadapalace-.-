import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../Container';
import { BrandMark } from './BrandMark';
import { DesktopNav } from './DesktopNav';
import { MobileMenuButton } from './MobileMenuButton';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { type NavItem } from './NavLink';

// Primary luxury navigation links for Hotel Rajwada Palace matching client requirements
export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'top', label: 'Home', href: '#top' },
  { id: 'rooms', label: 'Hotel & Rooms', href: '#rooms' },
  { id: 'restaurant', label: 'Restaurant', href: '#restaurant' },
  { id: 'events', label: 'Weddings & Events', href: '#events' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavigationProps {
  activeSectionId?: string;
  onSelectSection?: (id: string) => void;
  onBookRoom?: () => void;
  onCheckAvailability?: () => void;
  onContactClick?: () => void;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSectionId,
  onSelectSection,
  onBookRoom,
  onCheckAvailability,
  onContactClick: _onContactClick,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(activeSectionId || '');
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  // Sync active section prop if provided externally
  useEffect(() => {
    if (activeSectionId !== undefined) {
      setActiveItem(activeSectionId);
    }
  }, [activeSectionId]);

  // Intelligent scroll handler using requestAnimationFrame for optimal mobile/desktop performance
  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Transparent-to-Solid transition threshold (40px)
          setIsScrolled(currentScrollY > 40);

          if (currentScrollY <= 80) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollYRef.current + 10) {
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
    onSelectSection?.(id);
  };

  const handleBooking = () => {
    if (onBookRoom) {
      onBookRoom();
    } else if (onCheckAvailability) {
      onCheckAvailability();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isScrolled
            ? 'liquid-glass-nav py-3 border-b border-white/[0.1] shadow-[0_10px_35px_rgba(0,0,0,0.55)]'
            : 'bg-gradient-to-b from-charcoal-deep/90 via-charcoal-deep/60 to-transparent py-5 md:py-6 lg:py-7 border-b border-white/[0.04]'
        } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-95'} ${className}`}
      >
        <Container size="xl">
          <div className="flex items-center justify-between gap-4">
            {/* 1. Left: Architectural Wordmark */}
            <div className="flex-shrink-0">
              <BrandMark
                isScrolled={isScrolled}
                onClick={() => handleItemSelect('top')}
              />
            </div>

            {/* 2. Center: Editorial Luxury Navigation Links */}
            <div className="hidden lg:flex items-center">
              <DesktopNav
                items={MAIN_NAV_ITEMS}
                activeId={activeItem}
                onSelect={handleItemSelect}
              />
            </div>

            {/* 3. Right: Clear 'Book a Room' and 'Call Now' Actions */}
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
              {/* Call Now Button */}
              <a
                href="tel:+919921019664"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-[0.14em] font-sans font-medium text-ivory/90 hover:text-gold border border-white/15 hover:border-gold/50 rounded-sm transition-all duration-300 hover:bg-white/[0.03]"
                aria-label="Call Now: 099210 19664"
              >
                <svg
                  className="w-3.5 h-3.5 text-gold"
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
                <span>Call Now</span>
              </a>

              {/* Book a Room CTA */}
              <button
                type="button"
                onClick={handleBooking}
                className="group relative inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs uppercase tracking-[0.16em] font-sans font-medium text-charcoal-deep bg-gold hover:bg-gold-light active:bg-gold-muted border border-gold hover:border-gold-light transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(194,166,118,0.25)] rounded-sm cursor-pointer"
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
        </Container>
      </header>

      {/* 5. Accessible Mobile Navigation Overlay */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={MAIN_NAV_ITEMS}
        activeId={activeItem}
        onSelect={handleItemSelect}
        onBookRoom={handleBooking}
      />
    </>
  );
};
