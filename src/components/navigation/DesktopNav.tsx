import React from 'react';
import { NavLink, type NavItem } from './NavLink';

interface DesktopNavProps {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  items,
  activeId,
  onSelect,
  className = '',
}) => {
  return (
    <nav
      aria-label="Main Navigation"
      className={`hidden lg:flex items-center space-x-4 xl:space-x-6 ${className}`}
    >
      {items.map((item) => (
        <NavLink
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          onClick={onSelect}
        />
      ))}
    </nav>
  );
};
