import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface NavLinkProps {
  item: NavItem;
  isActive?: boolean;
  onClick?: (id: string) => void;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  item,
  isActive = false,
  onClick,
  className = '',
}) => {
  return (
    <a
      href={item.href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(item.id);
        }
      }}
      className={`group relative py-2.5 px-1 font-sans text-[13px] tracking-[0.1em] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
        isActive ? 'text-gold font-semibold' : 'text-ivory/90 hover:text-gold-light'
      } ${className}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span>{item.label}</span>

      {/* Refined editorial line indicator */}
      <span
        className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gold transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isActive
            ? 'opacity-100 scale-x-100'
            : 'opacity-0 scale-x-0 group-hover:opacity-80 group-hover:scale-x-100'
        }`}
        aria-hidden="true"
      />
    </a>
  );
};
