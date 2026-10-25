import React from 'react';
import { ScrollReveal } from '../motion/ScrollReveal';

export interface RoomShowcaseItem {
  id: string;
  tag: string;
  title: string;
  tariff: string;
  description: string;
  image: string;
  imageWebp?: string;
  roomIndex: number;
}

export const ROOM_SHOWCASE_ITEMS: RoomShowcaseItem[] = [
  {
    id: 'showcase-suite',
    tag: '01 · EXECUTIVE SUITE',
    title: 'Palace Executive Suite',
    tariff: 'From ₹4,000',
    description: 'King Bed · Velvet Sitting Lounge Sofa · Ambient Vanity',
    image: '/images/rajwada-palace/verified/rajwada-suite-03-master.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-suite-03-master.webp',
    roomIndex: 0,
  },
  {
    id: 'showcase-deluxe',
    tag: '02 · DELUXE ROOM',
    title: 'Sanctuary Deluxe Room',
    tariff: 'From ₹2,400',
    description: 'Double Bed · AC · High-Speed Wi-Fi · Attached Bath',
    image: '/images/rajwada-palace/verified/rajwada-room-01.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-room-01.webp',
    roomIndex: 1,
  },
  {
    id: 'showcase-dormitory',
    tag: '03 · DORMITORY (FAMILY ROOM)',
    title: 'Dormitory (Family Room)',
    tariff: 'From ₹3,200',
    description: 'Multi-Bed Dormitory Layout · Group & Wedding Stays · Spacious Luggage Wing',
    image: '/images/rajwada-palace/verified/rajwada-room-02-master.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-room-02-master.webp',
    roomIndex: 2,
  },
];

interface RoomMarqueeTrackProps {
  onSelectRoom?: (index: number) => void;
  onBookRoom?: (roomName?: string) => void;
  className?: string;
}

export const RoomMarqueeTrack: React.FC<RoomMarqueeTrackProps> = ({
  onSelectRoom,
  onBookRoom,
  className = '',
}) => {
  const handleCardClick = (item: RoomShowcaseItem) => {
    if (typeof item.roomIndex === 'number' && onSelectRoom) {
      onSelectRoom(item.roomIndex);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 3 Evenly Distributed Luxury Room Cards with Staggered Kinetic Entrances */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-stretch">
        {ROOM_SHOWCASE_ITEMS.map((item, index) => (
          <ScrollReveal
            key={item.id}
            variant="fade-up"
            delayMs={index * 120}
            durationMs={650}
            className="h-full"
          >
            <div
              onClick={() => handleCardClick(item)}
              className="room-card-hover group relative flex flex-col h-full rounded-2xl overflow-hidden bg-charcoal-surface border border-white/10 hover:border-gold/50 shadow-xl cursor-pointer select-none"
            >
              {/* Image Container with Consistent 16:10 Aspect Ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <picture className="w-full h-full block">
                  {item.imageWebp && <source type="image/webp" srcSet={item.imageWebp} />}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.2,0.9,0.3,1)] group-hover:scale-105"
                  />
                </picture>

                {/* Dark Luxury Vignette Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/40 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Badges: Category Tag and Price Pill */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wider bg-charcoal-deep/85 backdrop-blur-md border border-white/10 text-gold uppercase">
                    {item.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-sans font-bold tracking-tight bg-gold text-charcoal-deep shadow-md">
                    {item.tariff}
                  </span>
                </div>

                {/* Bottom Card Content inside Image Overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="font-serif text-lg sm:text-xl text-ivory-light font-medium tracking-tight mb-1 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-ivory-muted/90 font-light line-clamp-1 mb-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookRoom?.(item.title);
                      }}
                      className="text-[10px] uppercase font-mono tracking-widest text-gold hover:text-gold-light transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Book Room</span>
                      <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-sand/60">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export const RoomCardsShowcase = RoomMarqueeTrack;
