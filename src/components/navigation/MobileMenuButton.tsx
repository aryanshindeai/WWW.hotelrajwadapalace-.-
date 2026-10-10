import React from 'react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  ariaControls?: string;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick,
  className = '',
  ariaControls = 'mobile-menu-overlay',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-2 py-1.5 px-3 text-ivory bg-charcoal-surface/90 border border-white/20 hover:border-gold hover:text-gold transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm cursor-pointer ${className}`}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls={ariaControls}
    >
      <span className="text-xs font-sans font-medium uppercase tracking-wider">
        {isOpen ? 'Close' : 'Menu'}
      </span>
      <div className="relative w-4 h-3.5 flex flex-col justify-between" aria-hidden="true">
        <span
          className={`h-[2px] w-4 bg-current transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-[5px] text-gold' : ''
          }`}
        />
        <span
          className={`h-[2px] w-4 bg-current transition-all duration-200 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`h-[2px] w-4 bg-current transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-[5px] text-gold' : ''
          }`}
        />
      </div>
    </button>
  );
};
