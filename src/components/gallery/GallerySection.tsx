import React, { useState } from 'react';
import { Section } from '../Section';
import { Container } from '../Container';
import { SectionHeading } from '../SectionHeading';
import { GalleryFilters } from './GalleryFilters';
import { GalleryItemCard } from './GalleryItemCard';
import { GalleryLightbox } from './GalleryLightbox';
import { GALLERY_ITEMS, type GalleryCategory } from '../../data/galleryData';

interface GallerySectionProps {
  className?: string;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter items based on active category tab
  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
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
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            eyebrow="PHOTO GALLERY"
            title="Explore Hotel Rajwada Palace"
            subtitle="Click the categories below to view verified photos of our weddings, rooms, dining spaces, and facilities. Tap any photo to open full-screen view."
            align="left"
          />
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="border-b border-white/5 pb-4 mb-8 sm:mb-12">
          <GalleryFilters
            currentCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Editorial Rhythm Composition: Alternating between large featured moments and supporting details */}
        <div className="space-y-8 sm:space-y-12">
          {/* Row 1: Featured Dominant Architectural Image (Full 12 cols) */}
          {filteredItems[0] && (
            <div className="w-full">
              <GalleryItemCard
                item={filteredItems[0]}
                index={0}
                onOpenLightbox={handleOpenLightbox}
              />
            </div>
          )}

          {/* Row 2: Editorial Split (7 cols landscape + 5 cols portrait detail) */}
          {filteredItems.length > 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <GalleryItemCard
                  item={filteredItems[1]}
                  index={1}
                  onOpenLightbox={handleOpenLightbox}
                />
              </div>
              <div className="lg:col-span-5">
                <GalleryItemCard
                  item={filteredItems[2]}
                  index={2}
                  onOpenLightbox={handleOpenLightbox}
                />
              </div>
            </div>
          )}

          {/* Row 3: Balanced 2-column or 3-column supporting sequence */}
          {filteredItems.length > 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.slice(3).map((item, idx) => (
                <GalleryItemCard
                  key={item.id}
                  item={item}
                  index={idx + 3}
                  onOpenLightbox={handleOpenLightbox}
                />
              ))}
            </div>
          )}
        </div>

        {/* Restrained Section End Transition Marker toward upcoming Reviews/Trust */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-gold/50" aria-hidden="true" />
            <span className="font-cinzel tracking-[0.2em] uppercase text-gold text-[10px]">
              Visual Heritage
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-sand/60">
            Hotel Rajwada Palace · Curated Imagery
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
      />
    </Section>
  );
};
