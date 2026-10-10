import React from 'react';
import { type GalleryCategory } from '../../data/galleryData';

interface GalleryFiltersProps {
  currentCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
  className?: string;
}

const CATEGORY_TABS: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Photos' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'other-events', label: 'Other Events' },
  { id: 'rooms', label: 'Hotel & Rooms' },
  { id: 'restaurant', label: 'Restaurant & Food' },
  { id: 'property', label: 'Property & Facilities' },
];

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  currentCategory,
  onSelectCategory,
  className = '',
}) => {
  return (
    <nav
      aria-label="Gallery category filters"
      className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}
    >
      {CATEGORY_TABS.map((tab) => {
        const isActive = tab.id === currentCategory;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectCategory(tab.id)}
            className={`px-4 py-2 text-xs sm:text-sm font-sans font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold cursor-pointer ${
              isActive
                ? 'bg-gold text-charcoal-deep shadow-md font-semibold'
                : 'bg-charcoal-surface/80 text-sand hover:text-ivory hover:bg-charcoal-deep border border-white/10'
            }`}
            aria-current={isActive ? 'true' : 'false'}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
