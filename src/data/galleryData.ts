/**
 * GALLERY DATA ARCHITECTURE
 * Structured format for curated visual heritage across 5 verified client categories:
 * 1. Weddings & Banquets
 * 2. Celebrations & Events
 * 3. Suites & Rooms
 * 4. Pure Veg Dining
 * 5. Palace & Grounds
 *
 * EXACT PHOTO RULE:
 * 1. Every gallery item is drawn strictly from verified high-resolution photographs in HOTEL_IMAGE_REGISTRY.
 * 2. NO stock photos or unverified hotel rooms.
 * 3. 100% authentic property imagery in Chandrapur, Maharashtra.
 */

import { HOTEL_IMAGE_REGISTRY } from './hotelImageRegistry';

export type GalleryCategory =
  | 'all'
  | 'weddings'
  | 'other-events'
  | 'rooms'
  | 'restaurant'
  | 'property';

export interface GalleryItem {
  id: string;
  code: string;
  srcDesktop: string;
  srcMobile: string;
  alt: string;
  category: Exclude<GalleryCategory, 'all'>;
  categoryLabel: string;
  title: string;
  caption?: string;
  orientation: 'featured' | 'landscape' | 'portrait' | 'square';
  featured?: boolean;
  isPlaceholderData: boolean;
  sourceType: 'property' | 'destination';
  allSpan?: string; // Responsive column span when in 'all' view
  aspectHint?: string;
}

export interface CategoryTabConfig {
  id: GalleryCategory;
  label: string;
  shortLabel: string;
  description: string;
}

export const CATEGORY_TABS: CategoryTabConfig[] = [
  {
    id: 'all',
    label: 'All Collection',
    shortLabel: 'All',
    description: 'Complete visual archive of Hotel Rajwada Palace',
  },
  {
    id: 'weddings',
    label: 'Weddings & Banquets',
    shortLabel: 'Weddings',
    description: 'Royal stages, mandap canopies & ceremonial halls',
  },
  {
    id: 'other-events',
    label: 'Celebrations & Events',
    shortLabel: 'Events',
    description: 'Naming ceremonies, milestones & gala grounds',
  },
  {
    id: 'rooms',
    label: 'Suites & Rooms',
    shortLabel: 'Rooms',
    description: 'Palace suites, deluxe quarters & family accommodation',
  },
  {
    id: 'restaurant',
    label: 'Pure Veg Dining',
    shortLabel: 'Dining',
    description: 'Grand dining hall, ambient tables & feast halls',
  },
  {
    id: 'property',
    label: 'Palace & Grounds',
    shortLabel: 'Property',
    description: 'Palatial facade, foyer lobby & open-air rooftops',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // 01 · Grand Architectural Entrance & Facade (Panoramic Hero Anchor)
  {
    id: 'gal-prop-01',
    code: '01',
    srcDesktop: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].srcMobile || HOTEL_IMAGE_REGISTRY['hero-exterior-01'].src,
    alt: HOTEL_IMAGE_REGISTRY['hero-exterior-01'].alt,
    category: 'property',
    categoryLabel: 'PALACE & GROUNDS',
    title: 'The Grand Palace Tower & Front Exterior',
    caption: 'Architectural front facade and grand entrance gate in Chandrapur',
    orientation: 'featured',
    featured: true,
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-12',
  },

  // 02 · Royal Wedding Stage (Asymmetric 7-Col Anchor)
  {
    id: 'gal-wed-01',
    code: '02',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-weddings'].alt,
    category: 'weddings',
    categoryLabel: 'WEDDINGS & BANQUETS',
    title: 'Grand Ceremonial Wedding Stage',
    caption: 'Floral arch adornment & royal couple throne seating',
    orientation: 'featured',
    featured: true,
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-7',
  },

  // 03 · Traditional Wedding Mandap Canopy (Asymmetric 5-Col Pair)
  {
    id: 'gal-wed-02',
    code: '03',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-receptions-sec'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-receptions-sec'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-receptions-sec'].alt,
    category: 'weddings',
    categoryLabel: 'WEDDINGS & BANQUETS',
    title: 'Traditional Wedding Mandap Canopy',
    caption: 'Ornate draped mandap canopy with sacred ceremony seating',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-5',
  },

  // 04 · Palatial Reception Stage (4-Col Balanced Trio 1/3)
  {
    id: 'gal-wed-03',
    code: '04',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-receptions'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-receptions'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-receptions'].alt,
    category: 'weddings',
    categoryLabel: 'WEDDINGS & BANQUETS',
    title: 'Palatial Wedding Reception Stage',
    caption: 'Illuminated backdrop and majestic royal sofa seating',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-4',
  },

  // 05 · Main Banquet Hall Central Aisle (4-Col Balanced Trio 2/3)
  {
    id: 'gal-wed-04',
    code: '05',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-weddings-sec'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-weddings-sec'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-weddings-sec'].alt,
    category: 'weddings',
    categoryLabel: 'WEDDINGS & BANQUETS',
    title: 'Main Banquet Hall Central Aisle',
    caption: 'Spacious ceremonial seating layout under glowing chandeliers',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-4',
  },

  // 06 · Naming Ceremony & Milestone Banquet (4-Col Balanced Trio 3/3)
  {
    id: 'gal-evt-01',
    code: '06',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-events'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-events'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-events'].alt,
    category: 'other-events',
    categoryLabel: 'CELEBRATIONS & EVENTS',
    title: 'Naming Ceremony & Milestone Banquet',
    caption: 'Celebratory stage setup for family milestones and formal assemblies',
    orientation: 'featured',
    featured: true,
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-4',
  },

  // 07 · Main Dining Hall & Emerald Seating (8-Col Ultra-Res Feature)
  {
    id: 'gal-rest-01',
    code: '07',
    srcDesktop: HOTEL_IMAGE_REGISTRY['dining-venue-01'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['dining-venue-01'].src,
    alt: HOTEL_IMAGE_REGISTRY['dining-venue-01'].alt,
    category: 'restaurant',
    categoryLabel: 'PURE VEG DINING',
    title: 'Main Dining Hall & Emerald Seating',
    caption: 'Chandeliers, spacious tables, and regional pure vegetarian hospitality',
    orientation: 'featured',
    featured: true,
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-8',
  },

  // 08 · Evening Dining Table Ambience (4-Col Companion Detail)
  {
    id: 'gal-rest-02',
    code: '08',
    srcDesktop: HOTEL_IMAGE_REGISTRY['dining-venue-01-sec'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['dining-venue-01-sec'].src,
    alt: HOTEL_IMAGE_REGISTRY['dining-venue-01-sec'].alt,
    category: 'restaurant',
    categoryLabel: 'PURE VEG DINING',
    title: 'Evening Dining Table Ambience',
    caption: 'Warm ambient lighting and authentic hospitality table arrangement',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-4',
  },

  // 09 · Palace Suite Ceremonial Living (6-Col Pair 1/2)
  {
    id: 'gal-rm-03',
    code: '09',
    srcDesktop: HOTEL_IMAGE_REGISTRY['room-category-03'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['room-category-03'].src,
    alt: HOTEL_IMAGE_REGISTRY['room-category-03'].alt,
    category: 'rooms',
    categoryLabel: 'SUITES & ROOMS',
    title: 'Palace Suite Ceremonial Living',
    caption: 'Executive luxury suite bedroom with upholstered headboard & sofa lounge',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-6',
  },

  // 10 · Sanctuary Deluxe Quarters (6-Col Pair 2/2)
  {
    id: 'gal-rm-01',
    code: '10',
    srcDesktop: HOTEL_IMAGE_REGISTRY['room-category-01'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['room-category-01'].src,
    alt: HOTEL_IMAGE_REGISTRY['room-category-01'].alt,
    category: 'rooms',
    categoryLabel: 'SUITES & ROOMS',
    title: 'Sanctuary Deluxe Quarters',
    caption: 'Authentic guest room comfort with timber details and double bed',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-6',
  },

  // 11 · Family & Group Quarters (4-Col Balanced Trio 1/3)
  {
    id: 'gal-rm-02',
    code: '11',
    srcDesktop: HOTEL_IMAGE_REGISTRY['room-category-02'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['room-category-02'].src,
    alt: HOTEL_IMAGE_REGISTRY['room-category-02'].alt,
    category: 'rooms',
    categoryLabel: 'SUITES & ROOMS',
    title: 'Family & Group Quarters',
    caption: 'Spacious accommodation designed for families and wedding parties',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-4',
  },

  // 12 · Celebration Banquet Feast Wing (4-Col Balanced Trio 2/3)
  {
    id: 'gal-rest-03',
    code: '12',
    srcDesktop: HOTEL_IMAGE_REGISTRY['dining-venue-02'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['dining-venue-02'].src,
    alt: HOTEL_IMAGE_REGISTRY['dining-venue-02'].alt,
    category: 'restaurant',
    categoryLabel: 'PURE VEG DINING',
    title: 'Celebration Banquet Feast Wing',
    caption: 'Banquet dining enclosure for celebratory meals and parties',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-4',
  },

  // 13 · Celebration Chaise Lounge Staging (4-Col Balanced Trio 3/3)
  {
    id: 'gal-evt-02',
    code: '13',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-events-sec'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-events-sec'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-events-sec'].alt,
    category: 'other-events',
    categoryLabel: 'CELEBRATIONS & EVENTS',
    title: 'Celebration Chaise Lounge Staging',
    caption: 'Floral halo arch with regal velvet sofa arrangement',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-4',
  },

  // 14 · Open-Air Rooftop Celebration Terrace (6-Col Pair 1/2)
  {
    id: 'gal-prop-04',
    code: '14',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-family'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-family'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-family'].alt,
    category: 'property',
    categoryLabel: 'PALACE & GROUNDS',
    title: 'Open-Air Rooftop Celebration Terrace',
    caption: 'Panoramic open rooftop terrace for evening gatherings and celebrations',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-6',
  },

  // 15 · Sunset Rooftop Lounge & Seating (6-Col Pair 2/2)
  {
    id: 'gal-prop-05',
    code: '15',
    srcDesktop: HOTEL_IMAGE_REGISTRY['celebrations-family-sec'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['celebrations-family-sec'].src,
    alt: HOTEL_IMAGE_REGISTRY['celebrations-family-sec'].alt,
    category: 'property',
    categoryLabel: 'PALACE & GROUNDS',
    title: 'Sunset Rooftop Lounge & Seating',
    caption: 'Sunset ambience overlooking Chandrapur cityscape',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-6',
  },

  // 16 · Illuminated Evening Facade (7-Col Split 1/2)
  {
    id: 'gal-prop-02',
    code: '16',
    srcDesktop: HOTEL_IMAGE_REGISTRY['gallery-property-01'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['gallery-property-01'].src,
    alt: HOTEL_IMAGE_REGISTRY['gallery-property-01'].alt,
    category: 'property',
    categoryLabel: 'PALACE & GROUNDS',
    title: 'Illuminated Evening Facade',
    caption: 'Dusk illumination accentuating the palatial architecture',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-7',
  },

  // 17 · Reception & Front Desk Foyer (5-Col Split 2/2 - Portrait Detail)
  {
    id: 'gal-prop-03',
    code: '17',
    srcDesktop: HOTEL_IMAGE_REGISTRY['gallery-property-02'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['gallery-property-02'].src,
    alt: HOTEL_IMAGE_REGISTRY['gallery-property-02'].alt,
    category: 'property',
    categoryLabel: 'PALACE & GROUNDS',
    title: 'Reception & Front Desk Foyer',
    caption: 'Polished lobby and welcoming lounge for resident guests',
    orientation: 'portrait',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-5',
  },

  // 18 · Covered Gala & Celebration Grounds (6-Col Pair 1/2)
  {
    id: 'gal-evt-03',
    code: '18',
    srcDesktop: '/images/rajwada-palace/verified/rajwada-gala-protection-master.jpg',
    srcMobile: '/images/rajwada-palace/verified/rajwada-gala-protection-master.jpg',
    alt: 'Hotel Rajwada Palace covered gala celebration hall setup in Chandrapur',
    category: 'other-events',
    categoryLabel: 'CELEBRATIONS & EVENTS',
    title: 'Covered Gala & Celebration Grounds',
    caption: 'Weather-protected all-season banquet venue layout',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-6',
  },

  // 19 · Grand Banquet Celebration Hall (6-Col Pair 2/2)
  {
    id: 'gal-wed-05',
    code: '19',
    srcDesktop: HOTEL_IMAGE_REGISTRY['gallery-property-04'].src,
    srcMobile: HOTEL_IMAGE_REGISTRY['gallery-property-04'].src,
    alt: HOTEL_IMAGE_REGISTRY['gallery-property-04'].alt,
    category: 'weddings',
    categoryLabel: 'WEDDINGS & BANQUETS',
    title: 'Grand Banquet Celebration Hall',
    caption: 'Spacious banquet layout with ambient chandeliers for wedding receptions and galas',
    orientation: 'landscape',
    isPlaceholderData: false,
    sourceType: 'property',
    allSpan: 'md:col-span-6',
  },
];

/**
 * Returns the exact count of verified images for any category tab.
 */
export function getCategoryCount(category: GalleryCategory): number {
  if (category === 'all') {
    return GALLERY_ITEMS.length;
  }
  return GALLERY_ITEMS.filter((item) => item.category === category).length;
}
