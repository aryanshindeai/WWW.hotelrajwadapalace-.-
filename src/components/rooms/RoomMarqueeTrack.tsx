import React from 'react';

export interface RoomMarqueeItem {
  id: string;
  tag: string;
  title: string;
  tariff: string;
  description: string;
  image: string;
  imageWebp?: string;
  roomIndex: number;
}

export const ROOM_MARQUEE_ITEMS: RoomMarqueeItem[] = [
  {
    id: 'marquee-executive',
    tag: '01 · EXECUTIVE SUITE',
    title: 'Palace Executive Suite',
    tariff: 'From ₹4,000',
    description: 'King Bed · Velvet Sitting Lounge Sofa · Ambient Vanity',
    image: '/images/rajwada-palace/verified/rajwada-suite-03-master.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-suite-03-master.webp',
    roomIndex: 0,
  },
  {
    id: 'marquee-deluxe',
    tag: '02 · DELUXE ROOM',
    title: 'Sanctuary Deluxe Room',
    tariff: 'From ₹2,400',
    description: 'Double Bed · AC · High-Speed Wi-Fi · Attached Bath',
    image: '/images/rajwada-palace/verified/rajwada-room-01.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-room-01.webp',
    roomIndex: 1,
  },
  {
    id: 'marquee-dormitory',
    tag: '03 · DORMITORY (FAMILY ROOM)',
    title: 'Dormitory (Family Room)',
    tariff: 'From ₹3,200',
    description: 'Multi-Bed Dormitory Layout · Group & Wedding Stays · Spacious Luggage',
    image: '/images/rajwada-palace/verified/rajwada-room-02-master.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-room-02-master.webp',
    roomIndex: 2,
  },
];

interface RoomMarqueeTrackProps {
  onSelectRoom?: (index: number) => void;
  onBookRoom?: () => void;
  className?: string;
}

export const RoomMarqueeTrack: React.FC<RoomMarqueeTrackProps> = ({
  onSelectRoom,
  onBookRoom,
  className = '',
}) => {
  // Repeated seamlessly for a continuous infinite ribbon
  const continuousCards = [
    ...ROOM_MARQUEE_ITEMS,
    ...ROOM_MARQUEE_ITEMS,
    ...ROOM_MARQUEE_ITEMS,
    ...ROOM_MARQUEE_ITEMS,
  ];

  const handleCardClick = (item: RoomMarqueeItem) => {
    if (typeof item.roomIndex === 'number' && onSelectRoom) {
      onSelectRoom(item.roomIndex);
    } else if (onBookRoom) {
      onBookRoom();
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Marquee Track Container with Vignette Fade Masks — Continuous Run */}
      <div className="relative w-full overflow-hidden rounded-2xl group select-none">
        {/* Left Edge Luxury Gradient Fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Right Edge Luxury Gradient Fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Moving Track — Glides Continuously without Interruption */}
        <div
          className="flex gap-5 sm:gap-6 py-2 animate-marquee-track"
          style={{ width: 'max-content' }}
        >
          {continuousCards.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleCardClick(item)}
              className="relative w-[280px] sm:w-[350px] md:w-[400px] flex-shrink-0 rounded-2xl overflow-hidden bg-charcoal-surface border border-white/10 hover:border-gold/50 transition-all duration-500 shadow-xl group/card cursor-pointer"
            >
              {/* Image Container with 16:10 Luxury Ratio */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <picture className="w-full h-full block">
                  {item.imageWebp && <source type="image/webp" srcSet={item.imageWebp} />}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                </picture>

                {/* Dark Vignette Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-charcoal-deep/40 to-transparent"
                  aria-hidden="true"
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wider bg-charcoal-deep/85 backdrop-blur-md border border-white/10 text-gold uppercase">
                    {item.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-sans font-bold tracking-tight bg-gold text-charcoal-deep shadow-md">
                    {item.tariff}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="font-serif text-lg sm:text-xl text-ivory-light font-medium tracking-tight mb-1 group-hover/card:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-ivory-muted/90 font-light line-clamp-1 mb-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-sand/80 group-hover/card:text-ivory transition-colors">
                      View Details & Book
                    </span>
                    <span className="text-gold text-xs group-hover/card:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
