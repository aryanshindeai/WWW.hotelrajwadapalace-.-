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
      className={`skiper-link group relative py-2 px-1.5 font-sans text-[11px] xl:text-[12.5px] tracking-[0.14em] uppercase font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
        isActive ? 'text-[#C5A859] font-semibold' : 'text-white/85 hover:text-[#D8BD8A]'
      } ${className}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="flex items-center gap-1.5">
        <span>{item.label}</span>
      </span>
    </a>
  );
};
