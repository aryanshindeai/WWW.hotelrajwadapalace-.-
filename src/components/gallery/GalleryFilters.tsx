import React from 'react';
import {
  CATEGORY_TABS,
  getCategoryCount,
  type GalleryCategory,
} from '../../data/galleryData';

interface GalleryFiltersProps {
  currentCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
  className?: string;
}

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  currentCategory,
  onSelectCategory,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Mobile-friendly horizontal scrollable pill bar; flex-wrap on tablet/desktop */}
      <nav
        role="tablist"
        aria-label="Gallery category filters"
        className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
      >
        {CATEGORY_TABS.map((tab) => {
          const isActive = tab.id === currentCategory;
          const count = getCategoryCount(tab.id);

          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`gallery-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls="gallery-grid-region"
              onClick={() => onSelectCategory(tab.id)}
              className={`group flex-shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-deep cursor-pointer select-none ${
                isActive
                  ? 'bg-gold text-charcoal-deep font-semibold shadow-[0_2px_14px_rgba(212,175,55,0.28)] border border-gold'
                  : 'bg-charcoal-surface/80 hover:bg-charcoal-surface text-sand/85 hover:text-ivory border border-white/10 hover:border-gold/30'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? 'bg-charcoal-deep/15 text-charcoal-deep font-bold'
                    : 'bg-white/5 text-sand/60 group-hover:text-sand/90'
                }`}
                aria-label={`${count} items`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
