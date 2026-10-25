import React, { useState } from 'react';
import { Section } from '../Section';
import { Container } from '../Container';
import { SectionHeading } from '../SectionHeading';
import { GalleryFilters } from './GalleryFilters';
import { GalleryItemCard } from './GalleryItemCard';
import { GalleryLightbox } from './GalleryLightbox';
import {
  GALLERY_ITEMS,
  CATEGORY_TABS,
  type GalleryCategory,
} from '../../data/galleryData';

interface GallerySectionProps {
  className?: string;
  onBookRoom?: (roomName?: string) => void;
  onEnquireDining?: () => void;
  onEnquireEvent?: (categoryTitle?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  className = '',
  onBookRoom,
  onEnquireDining,
  onEnquireEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter items based on active category tab
  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const activeTabConfig = CATEGORY_TABS.find((tab) => tab.id === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  /**
   * Computes an editorial asymmetric column span that guarantees zero awkward gaps
   * across both the 19-image master archive and individual filtered views.
   */
  const computeColSpan = (index: number, total: number, isAll: boolean, defaultSpan?: string): string => {
    if (isAll && defaultSpan) {
      return defaultSpan;
    }

    // Curated balance for category-filtered views
    if (total === 3) {
      // 1 featured panorama + 2 complementary side cards
      if (index === 0) return 'md:col-span-12';
      return 'md:col-span-6';
    }

    if (total === 4) {
      // 2 rhythmic diagonal pairs (7+5 and 5+7 = 12 each)
      if (index === 0) return 'md:col-span-7';
      if (index === 1) return 'md:col-span-5';
      if (index === 2) return 'md:col-span-5';
      return 'md:col-span-7';
    }

    if (total === 5) {
      // 1 grand hero anchor (12 cols) + two balanced pairs (6+6 each)
      if (index === 0) return 'md:col-span-12';
      return 'md:col-span-6';
    }

    if (total === 6) {
      if (index === 0) return 'md:col-span-8';
      if (index === 1) return 'md:col-span-4';
      return 'md:col-span-6';
    }

    return 'md:col-span-6 lg:col-span-4';
  };

  return (
    <Section
      id="gallery"
      variant="primary"
      spacing="lg"
      className={`relative ${className}`}
    >
      <Container size="xl">
        {/* Section Introduction */}
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="PHOTO GALLERY"
            title="Explore Hotel Rajwada Palace"
            subtitle="Explore authentic, high-resolution photographs of our royal wedding stages, guest rooms, pure vegetarian dining hall, and rooftop terrace in Chandrapur. Tap any photograph to open full-screen view."
            align="left"
          />
        </div>

        {/* Category Filter Navigation Bar */}
        <div className="border-b border-white/10 pb-5 mb-8 sm:mb-10">
          <GalleryFilters
            currentCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Dynamic Category Context Subtitle */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-sand/80">
            <p className="font-sans">
              <span className="text-gold font-semibold">
                {activeTabConfig?.label || 'Gallery'}
              </span>
              {' — '}
              <span>{activeTabConfig?.description}</span>
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-sand/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>{filteredItems.length} Verified Photographs</span>
            </div>
          </div>
        </div>

        {/* Editorial Responsive Grid */}
        <div
          id="gallery-grid-region"
          role="tabpanel"
          aria-labelledby={`gallery-tab-${selectedCategory}`}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch"
        >
          {filteredItems.map((item, idx) => {
            const colSpan = computeColSpan(
              idx,
              filteredItems.length,
              selectedCategory === 'all',
              item.allSpan
            );

            return (
              <GalleryItemCard
                key={item.id}
                item={item}
                index={idx}
                onOpenLightbox={handleOpenLightbox}
                colSpanClass={colSpan}
              />
            );
          })}
        </div>

        {/* Section Footer: Visual Heritage & Trust Hallmark */}
        <div className="mt-14 sm:mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-gold/50" aria-hidden="true" />
            <span className="font-cinzel tracking-[0.2em] uppercase text-gold text-[10px]">
              Visual Heritage
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-sand/60">
            Hotel Rajwada Palace · Tukum, Chandrapur · 100% Verified Property Photography
          </span>
        </div>
      </Container>

      {/* Full-screen Immersive Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={lightboxIndex}
        onSelectIndex={setLightboxIndex}
        onBookRoom={onBookRoom}
        onEnquireDining={onEnquireDining}
        onEnquireEvent={onEnquireEvent}
      />
    </Section>
  );
};
