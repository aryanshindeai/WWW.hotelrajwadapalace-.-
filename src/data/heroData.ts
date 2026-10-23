/**
 * HERO SCENES DATA FOR HOTEL RAJWADA PALACE
 * Tukum, Durgapur Road, Chandrapur, Maharashtra
 */

export interface HeroSlide {
  id: string;
  tabLabel: string;
  tabShortLabel: string;
  badge: string;
  titlePart1: string;
  titlePart2?: string;
  subtitle: string;
  locationDetails: string;
  primaryLabel: string;
  secondaryLabel?: string;
  tertiaryLabel?: string;
  srcDesktop: string;
  srcWebpDesktop: string;
  srcWebpTablet?: string;
  srcMobile: string;
  srcWebpMobile: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hero-facade',
    tabLabel: '01 Facade',
    tabShortLabel: '01',
    badge: 'CHANDRAPUR · MAHARASHTRA',
    titlePart1: 'Where Every Stay',
    titlePart2: 'Becomes a Story.',
    subtitle: 'Discover welcoming hospitality, comfortable stays, memorable dining, and celebrations at Hotel Rajwada Palace, Chandrapur.',
    locationDetails: 'Near Major Gate · Beside Sargam Petrol Pump · Durgapur Road',
    primaryLabel: 'BOOK A ROOM',
    secondaryLabel: 'WEDDINGS & EVENTS',
    tertiaryLabel: 'EXPLORE DINING',
    srcDesktop: '/images/rajwada-palace/verified/rajwada-gallery-facade-master.jpg',
    srcWebpDesktop: '/images/rajwada-palace/verified/rajwada-gallery-facade-master.webp',
    srcWebpTablet: '/images/rajwada-palace/verified/rajwada-gallery-facade-master-1080.webp',
    srcMobile: '/images/rajwada-palace/verified/rajwada-gallery-facade-master.jpg',
    srcWebpMobile: '/images/rajwada-palace/verified/rajwada-gallery-facade-master-640.webp',
    alt: 'Hotel Rajwada Palace illuminated architectural tower, red carpet grand entrance, and celebratory wedding facade at dusk in Chandrapur',
  },
  {
    id: 'hero-weddings',
    tabLabel: '02 Weddings',
    tabShortLabel: '02',
    badge: 'ROYAL CELEBRATIONS & BANQUETS',
    titlePart1: 'Weddings &',
    titlePart2: 'Celebrations',
    subtitle: 'Ornate ceremonial stages, grand chandelier banquet halls, and open-air rooftop grounds designed for life’s golden moments.',
    locationDetails: 'Grand Banquet Halls · Palatial Wedding Mandap · 1000+ Guest Capacity',
    primaryLabel: 'PLAN YOUR EVENT',
    secondaryLabel: 'EXPLORE WEDDINGS',
    tertiaryLabel: 'BOOK A STAY',
    srcDesktop: '/images/rajwada-palace/verified/rajwada-wedding-stage-master.jpg',
    srcWebpDesktop: '/images/rajwada-palace/verified/rajwada-wedding-stage-master.webp',
    srcWebpTablet: '/images/rajwada-palace/verified/rajwada-wedding-stage-master-1080.webp',
    srcMobile: '/images/rajwada-palace/verified/rajwada-wedding-stage-master.jpg',
    srcWebpMobile: '/images/rajwada-palace/verified/rajwada-wedding-stage-master-640.webp',
    alt: 'Hotel Rajwada A Wedding Palace decorated ceremonial wedding stage with floral arch and couple throne seating in Chandrapur',
  },
  {
    id: 'hero-rooms',
    tabLabel: '03 Suites',
    tabShortLabel: '03',
    badge: 'ACCOMMODATION & COMFORT',
    titlePart1: 'Rooms &',
    titlePart2: 'Executive Suites',
    subtitle: 'Air-conditioned deluxe rooms, multi-bed quarters, and executive suites designed for restful retreats and wedding families.',
    locationDetails: '24/7 Room Service · High-Speed Wi-Fi · Premium Bedding',
    primaryLabel: 'BOOK A ROOM',
    secondaryLabel: 'EXPLORE ROOMS',
    tertiaryLabel: 'CALL RECEPTION',
    srcDesktop: '/images/rajwada-palace/verified/rajwada-suite-03-master.jpg',
    srcWebpDesktop: '/images/rajwada-palace/verified/rajwada-suite-03-master.webp',
    srcWebpTablet: '/images/rajwada-palace/verified/rajwada-suite-03-master.webp',
    srcMobile: '/images/rajwada-palace/verified/rajwada-suite-03-master.jpg',
    srcWebpMobile: '/images/rajwada-palace/verified/rajwada-suite-03-master-640.webp',
    alt: 'Hotel Rajwada Palace executive luxury suite bedroom with upholstered headboard and sitting sofa in Chandrapur',
  },
  {
    id: 'hero-dining',
    tabLabel: '04 Dining',
    tabShortLabel: '04',
    badge: 'FINE VEGETARIAN DINING',
    titlePart1: 'Rajwada',
    titlePart2: 'Dining Hall',
    subtitle: 'Delicious pure vegetarian Indian delicacies, festive celebration thalis, aromatic biryanis, and lavish celebration banquet feasts.',
    locationDetails: 'Pure Vegetarian · Banquet Catering · Warm Hospitality',
    primaryLabel: 'RESERVE A TABLE',
    secondaryLabel: 'FOOD MENU',
    tertiaryLabel: 'BOOK A STAY',
    srcDesktop: '/images/rajwada-palace/verified/rajwada-dining-01-master.jpg',
    srcWebpDesktop: '/images/rajwada-palace/verified/rajwada-dining-01-master.webp',
    srcWebpTablet: '/images/rajwada-palace/verified/rajwada-dining-01-master-1080.webp',
    srcMobile: '/images/rajwada-palace/verified/rajwada-dining-01-master.jpg',
    srcWebpMobile: '/images/rajwada-palace/verified/rajwada-dining-01-master-640.webp',
    alt: 'Hotel Rajwada Palace expansive main dining hall with upholstered emerald seating and ceiling chandeliers in Chandrapur',
  },
];
