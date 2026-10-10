import React, { useState } from 'react';
import { type RoomCategory } from '../../data/roomsData';
import { RoomMedia } from './RoomMedia';
import { RoomInformation } from './RoomInformation';
import { RoomSelector } from './RoomSelector';

interface RoomShowcaseProps {
  rooms: RoomCategory[];
  currentIndex?: number;
  onSelectIndex?: (index: number) => void;
  onCheckAvailability?: () => void;
  className?: string;
}

export const RoomShowcase: React.FC<RoomShowcaseProps> = ({
  rooms,
  currentIndex,
  onSelectIndex,
  onCheckAvailability,
  className = '',
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = currentIndex !== undefined ? currentIndex : internalIndex;
  const setActiveIndex = onSelectIndex || setInternalIndex;

  const currentRoom = rooms[activeIndex] || rooms[0];

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % rooms.length);
  };

  const handlePrev = () => {
    setActiveIndex((activeIndex - 1 + rooms.length) % rooms.length);
  };

  return (
    <div className={`space-y-8 sm:space-y-12 ${className}`}>
      {/* 1. Minimal Editorial Room Selector on Top */}
      <div className="border-b border-white/5 pb-4">
        <RoomSelector
          rooms={rooms}
          currentIndex={activeIndex}
          onSelectIndex={setActiveIndex}
        />
      </div>

      {/* 2. Primary 65 / 35 Editorial Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Dominated by Large Room Imagery (7/12 cols ~ 60%) */}
        <div className="lg:col-span-7">
          <RoomMedia
            room={currentRoom}
            onNext={rooms.length > 1 ? handleNext : undefined}
            onPrev={rooms.length > 1 ? handlePrev : undefined}
          />
        </div>

        {/* Right Column: Room Information & Verification Panel (5/12 cols ~ 40%) */}
        <div className="lg:col-span-5">
          <RoomInformation
            room={currentRoom}
            onCheckAvailability={onCheckAvailability}
          />
        </div>
      </div>
    </div>
  );
};
