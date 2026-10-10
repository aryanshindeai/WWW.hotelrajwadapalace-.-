import React, { useState } from 'react';
import { Section } from '../Section';
import { Container } from '../Container';
import { SectionHeading } from '../SectionHeading';
import { RoomShowcase } from './RoomShowcase';
import { RoomMarqueeTrack } from './RoomMarqueeTrack';
import { ROOMS_DATA } from '../../data/roomsData';

interface RoomsSectionProps {
  onCheckAvailability?: () => void;
  className?: string;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onCheckAvailability,
  className = '',
}) => {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  const handleSelectRoomFromMarquee = (index: number) => {
    setSelectedRoomIndex(index);
    const detailEl = document.getElementById('room-detail-showcase');
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <Section
      id="rooms"
      variant="primary"
      spacing="lg"
      className={`relative ${className}`}
    >
      <Container size="xl">
        {/* Section Introduction */}
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            eyebrow="ROOMS & SUITES"
            title="A Quiet Place to Unwind"
            subtitle="Thoughtfully proportioned sanctuaries designed for restorative rest, celebration stays, and leisurely retreats in Chandrapur."
            align="left"
          />
        </div>

        {/* 1. Auto-Moving Room & Interior Showcase Track */}
        <div className="mb-14 sm:mb-20">
          <RoomMarqueeTrack
            onSelectRoom={handleSelectRoomFromMarquee}
            onBookRoom={onCheckAvailability}
          />
        </div>

        {/* 2. Detailed Room & Suite Inspection Panel */}
        <div id="room-detail-showcase" className="pt-2">
          <RoomShowcase
            rooms={ROOMS_DATA}
            currentIndex={selectedRoomIndex}
            onSelectIndex={setSelectedRoomIndex}
            onCheckAvailability={onCheckAvailability}
          />
        </div>
      </Container>
    </Section>
  );
};
