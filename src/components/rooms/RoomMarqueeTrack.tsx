import React, { useState, useRef } from 'react';

export interface RoomMarqueeItem {
  id: string;
  tag: string;
  title: string;
  tariff: string;
  description: string;
  image: string;
  imageWebp?: string;
  roomIndex?: number;
}

export const ROOM_MARQUEE_ITEMS: RoomMarqueeItem[] = [
  {
    id: 'marquee-deluxe',
    tag: '01 · DELUXE ROOM',
    title: 'Sanctuary Deluxe Room',
    tariff: 'From ₹2,400',
    description: 'Double Bed · AC · High-Speed Wi-Fi · Attached Bath',
    image: '/images/rajwada-palace/verified/rajwada-room-01.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-room-01.webp',
    roomIndex: 0,
  },
  {
    id: 'marquee-family',
    tag: '02 · FAMILY ROOM',
    title: 'Family & Group Quarters',
    tariff: 'From ₹3,200',
    description: 'Multi-Bed Layout · Wedding Party · Spacious Luggage Wing',
    image: '/images/rajwada-palace/verified/rajwada-room-02-master.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-room-02-master.webp',
    roomIndex: 1,
  },
  {
    id: 'marquee-suite',
    tag: '03 · PALACE SUITE',
    title: 'Palace Executive Suite',
    tariff: 'From ₹4,000',
    description: 'King Bed · Velvet Sitting Lounge Sofa · Ambient Vanity',
    image: '/images/rajwada-palace/verified/rajwada-suite-03-master.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-suite-03-master.webp',
    roomIndex: 2,
  },
  {
    id: 'marquee-foyer',
    tag: 'ARRIVAL · CONCIERGE',
    title: 'Reception Foyer & Welcome',
    tariff: '24/7 Front Desk',
    description: 'Round-the-Clock Guest Assistance & Room Service Desk',
    image: '/images/rajwada-palace/verified/rajwada-reception-foyer-master.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-reception-foyer-master.webp',
  },
  {
    id: 'marquee-lounge',
    tag: 'INTERIOR ARCHITECTURE',
    title: 'Palace Interior Lounge',
    tariff: 'Restful Ambiance',
    description: 'Grand Chandelier Living Spaces & Serene Hallways',
    image: '/images/rajwada-palace/verified/google_photo_02.jpg',
  },
  {
    id: 'marquee-rooftop',
    tag: 'ROOFTOP · OPEN-AIR',
    title: 'Open Sky Sunset Terrace',
    tariff: 'Scenic Views',
    description: 'Evening Strolls & Fresh Air Over Chandrapur Skyline',
    image: '/images/rajwada-palace/verified/rajwada-rooftop-terrace-master.jpg',
    imageWebp: '/images/rajwada-palace/verified/rajwada-rooftop-terrace-master.webp',
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
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Duplicate items twice to achieve seamless infinite loop
  const duplicatedItems = [...ROOM_MARQUEE_ITEMS, ...ROOM_MARQUEE_ITEMS];

  const handleCardClick = (item: RoomMarqueeItem) => {
    if (typeof item.roomIndex === 'number' && onSelectRoom) {
      onSelectRoom(item.roomIndex);
    } else if (onBookRoom) {
      onBookRoom();
    }
  };

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Track Header & Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5 sm:mb-6 px-1">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" aria-hidden="true" />
          <span className="text-xs uppercase tracking-[0.16em] text-gold font-mono font-medium">
            Live Showcase · Rooms & Interiors
          </span>
          <span className="hidden sm:inline-block text-xs text-sand/60">
            (Hover or tap to pause)
          </span>
        </div>

        {/* Play/Pause and Manual Scroll Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-charcoal-surface/80 border border-white/10 text-ivory/80 hover:text-gold hover:border-gold/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label={isPaused ? 'Resume auto-movement' : 'Pause auto-movement'}
          >
            {isPaused ? (
              <>
                <span>▶</span>
                <span>Resume</span>
              </>
            ) : (
              <>
                <span>⏸</span>
                <span>Pause</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleManualScroll('left')}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-charcoal-surface/80 border border-white/10 text-ivory/80 hover:text-gold hover:border-gold/40 transition-colors text-xs cursor-pointer"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll('right')}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-charcoal-surface/80 border border-white/10 text-ivory/80 hover:text-gold hover:border-gold/40 transition-colors text-xs cursor-pointer"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Marquee Track Container with Vignette Fade Masks */}
      <div
        className="relative w-full overflow-hidden rounded-2xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
      >
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

        {/* Moving Track */}
        <div
          ref={scrollContainerRef}
          className={`flex gap-5 sm:gap-6 py-2 ${
            isPaused ? 'animate-marquee-paused overflow-x-auto scrollbar-none' : 'animate-marquee-track'
          }`}
          style={{ width: 'max-content' }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => handleCardClick(item)}
              className="relative w-[280px] sm:w-[350px] md:w-[400px] flex-shrink-0 rounded-2xl overflow-hidden bg-charcoal-surface border border-white/10 hover:border-gold/50 transition-all duration-500 shadow-xl group/card cursor-pointer select-none"
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
                      {typeof item.roomIndex === 'number' ? 'View Details & Book' : 'Property Amenity'}
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
