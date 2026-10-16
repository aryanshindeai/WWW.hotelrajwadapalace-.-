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
      data-active={isActive ? 'true' : undefined}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(item.id);
        }
      }}
      className={`skiper-link group relative py-2 px-1 font-sans text-[13px] tracking-[0.1em] font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
        isActive ? 'text-gold font-semibold' : 'text-ivory/90 hover:text-gold-light'
      } ${className}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="flex items-center gap-1.5">
        {isActive && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(218,165,32,0.8)] animate-pulse"
            aria-hidden="true"
          />
        )}
        <span>{item.label}</span>
      </span>
    </a>
  );
};
