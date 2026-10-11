import React, { useEffect, useRef } from 'react';
import { type NavItem } from './NavLink';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onBookRoom?: () => void;
  id?: string;
}

export const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isOpen,
  onClose,
  items,
  activeId,
  onSelect,
  onBookRoom,
  id = 'mobile-menu-overlay',
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Keyboard accessibility: ESC key close & trap focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id={id}
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 bg-charcoal-deep/98 backdrop-blur-2xl flex flex-col justify-between px-6 sm:px-12 py-8 overflow-y-auto"
    >
      {/* Top Bar inside Overlay: Wordmark & Close button */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <img
            src="/images/rajwada-palace/rajwada-logo.png"
            alt="Hotel Rajwada A Wedding Palace Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain drop-shadow-md flex-shrink-0"
          />
          <div>
            <span className="font-serif text-lg tracking-wide text-ivory block">
              HOTEL RAJWADA PALACE
            </span>
            <span className="block text-[10px] font-cinzel text-gold tracking-widest mt-0.5">
              CHANDRAPUR · MAHARASHTRA
            </span>
          </div>
        </div>

        <button
          ref={firstFocusableRef}
          type="button"
          onClick={onClose}
          className="p-2 text-ivory/80 hover:text-gold focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          aria-label="Close menu"
        >
          <span className="font-cinzel text-xs tracking-[0.2em] uppercase">Close [×]</span>
        </button>
      </div>

      {/* Main Editorial Nav Links */}
      <nav aria-label="Mobile Menu Links" className="py-8 my-auto flex flex-col space-y-5 sm:space-y-6">
        {items.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              className="group overflow-hidden"
              style={{
                animationDelay: `${idx * 60}ms`,
              }}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect?.(item.id);
                  onClose();
                }}
                className="flex items-baseline justify-between py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-sand/60">0{idx + 1}</span>
                  <span
                    className={`font-serif text-2xl sm:text-3xl lg:text-4xl tracking-normal transition-colors duration-300 ${
                      isActive
                        ? 'text-gold italic font-medium'
                        : 'text-ivory group-hover:text-gold-light'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <span className="font-cinzel text-xs tracking-widest text-sand/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </span>
              </a>
            </div>
          );
        })}
      </nav>

      {/* Bottom Conversion Action & Direct Contact */}
      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Call Now */}
          <a
            href="tel:+919921019664"
            className="flex items-center justify-center gap-2 py-3 px-4 text-xs uppercase tracking-widest font-sans font-medium text-ivory border border-white/20 hover:border-gold hover:text-gold transition-colors text-center"
          >
            <svg
              className="w-4 h-4 text-gold"
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

          {/* WhatsApp */}
          <a
            href="https://wa.me/919921019664?text=Hello%20Hotel%20Rajwada%20Palace%2C%20I%20would%20like%20to%20inquire%20about%20a%20booking"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 text-xs uppercase tracking-widest font-sans font-medium text-emerald-400 border border-emerald-500/30 hover:border-emerald-400 transition-colors text-center"
          >
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Book a Room Primary Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onBookRoom?.();
          }}
          className="w-full py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-sans font-medium bg-gold text-charcoal-deep hover:bg-gold-light transition-all text-center"
        >
          Book a Room
        </button>

        <div className="pt-2 text-[11px] text-sand/70 text-center">
          Near Major Gate, Durgapur Road, Chandrapur · Direct: 099210 19664
        </div>
      </div>
    </div>
  );
};
