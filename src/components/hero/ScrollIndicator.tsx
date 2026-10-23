import React, { useState, useEffect } from 'react';

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  targetId = 'overview',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out indicator smoothly once user begins scrolling down (>60px)
      if (window.scrollY > 60) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`hidden sm:block absolute bottom-8 sm:bottom-10 right-6 sm:right-12 lg:right-16 z-20 transition-opacity duration-700 pointer-events-auto ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
    >
      <button
        type="button"
        onClick={handleClick}
        className="group flex flex-col items-center gap-2.5 text-sand/70 hover:text-gold transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold p-1"
        aria-label="Scroll down to explore Hotel Rajwada Palace"
      >
        <span className="font-sans text-[9px] tracking-[0.26em] uppercase font-medium">
          Explore
        </span>
        <div className="w-[1px] h-9 sm:h-12 bg-white/15 relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-scroll-pulse" />
        </div>
      </button>
    </div>
  );
};
