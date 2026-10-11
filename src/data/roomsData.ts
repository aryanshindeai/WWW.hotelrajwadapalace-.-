/**
 * ROOMS & SUITES DATA ARCHITECTURE
 * Structured format for verified room categories, authentic details, and pricing.
 *
 * EXACT PHOTO RULE:
 * 1. All images are bound to HOTEL_IMAGE_REGISTRY.
 * 2. Real verified photographs of Rajwada Palace rooms.
 */

import { HOTEL_IMAGE_REGISTRY } from './hotelImageRegistry';

export interface RoomDetailItem {
  label: string;
  value: string;
}

export interface RoomCategory {
  id: string;
  code: string; // e.g. "01", "02", "03"
  categoryTag: string;
  title: string;
  subtitle: string;
  description: string;
  imageDesktop: string;
  imageMobile: string;
  imageAlt: string;
  isPlaceholderData: boolean;
  tariffEstimate: string;
  occupancy: string;
  bedType: string;
  details: RoomDetailItem[];
}

export const ROOMS_DATA: RoomCategory[] = [
  {
    id: 'room-category-01',
    code: '01',
    categoryTag: 'EXECUTIVE SUITE',
    title: 'Palace Executive Suite',
    subtitle: 'Ceremonial Living & Lounge · Private Luxury',
    description:
      'The premier accommodation of Hotel Rajwada Palace, offering expansive sitting lounge with upholstered plush sofa, luxury headboard, ambient vanity lighting, and dedicated hospitality service.',
    imageDesktop: HOTEL_IMAGE_REGISTRY['room-category-03'].src,
    imageMobile: HOTEL_IMAGE_REGISTRY['room-category-03'].src,
    imageAlt: HOTEL_IMAGE_REGISTRY['room-category-03'].alt,
    isPlaceholderData: false,
    tariffEstimate: 'Starting ₹4,000 / night',
    occupancy: '2 Adults + Living Area',
    bedType: 'King Bed + Sofa Suite',
    details: [
      { label: 'Check-In', value: '12:00 PM' },
      { label: 'Check-Out', value: '10:00 AM' },
      { label: 'Special', value: 'Sitting Lounge Sofa' },
      { label: 'Ambience', value: 'Executive Decor' },
    ],
  },
  {
    id: 'room-category-02',
    code: '02',
    categoryTag: 'DELUXE ROOM',
    title: 'Sanctuary Deluxe Room',
    subtitle: 'Quiet Courtyard Wing · Air Conditioned',
    description:
      'Air-conditioned guest room featuring double bed, clean timber furniture, complimentary Wi-Fi, and private attached bathroom. Designed for restful retreats after Tadoba tiger safaris or regional travels.',
    imageDesktop: HOTEL_IMAGE_REGISTRY['room-category-01'].src,
    imageMobile: HOTEL_IMAGE_REGISTRY['room-category-01'].src,
    imageAlt: HOTEL_IMAGE_REGISTRY['room-category-01'].alt,
    isPlaceholderData: false,
    tariffEstimate: 'Starting ₹2,400 / night',
    occupancy: '2 Adults (1 Child)',
    bedType: 'Comfort Double Bed',
    details: [
      { label: 'Check-In', value: '12:00 PM' },
      { label: 'Check-Out', value: '10:00 AM' },
      { label: 'Connectivity', value: 'High-speed Wi-Fi' },
      { label: 'Comfort', value: 'Air Conditioning' },
    ],
  },
  {
    id: 'room-category-03',
    code: '03',
    categoryTag: 'DORMITORY (FAMILY ROOM)',
    title: 'Dormitory (Family Room)',
    subtitle: 'Spacious Multi-Bed Layout · Group & Wedding Stays',
    description:
      'Generous room proportions and multi-bed dormitory layout tailored for visiting families, wedding party guests, and groups attending banquets in Chandrapur. Features multiple comfortable beds and dedicated luggage space.',
    imageDesktop: HOTEL_IMAGE_REGISTRY['room-category-02'].src,
    imageMobile: HOTEL_IMAGE_REGISTRY['room-category-02'].src,
    imageAlt: HOTEL_IMAGE_REGISTRY['room-category-02'].alt,
    isPlaceholderData: false,
    tariffEstimate: 'Starting ₹3,200 / night',
    occupancy: '3–5 Guests',
    bedType: 'Multi-Bed Configuration',
    details: [
      { label: 'Check-In', value: '12:00 PM' },
      { label: 'Check-Out', value: '10:00 AM' },
      { label: 'Space', value: 'Dormitory & Family Sized' },
      { label: 'Service', value: 'Room Service & Parking' },
    ],
  },
];
