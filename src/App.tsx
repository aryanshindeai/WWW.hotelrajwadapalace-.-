import { useState } from 'react';
import {
  Navigation,
  CinematicHero,
  RoomsSection,
  DiningSection,
  CelebrationsSection,
  ExperienceSection,
  GallerySection,
  TrustSection,
  LocationSection,
  BookingCTASection,
  Footer,
  Container,
  Section,
  SectionHeading,
  Typography,
  HotelBookingModal,
  RestaurantEnquiryModal,
  FoodOrderModal,
  EventEnquiryModal,
} from './components';









export function App() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('Sanctuary Deluxe Room');
  const [diningModalOpen, setDiningModalOpen] = useState(false);
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookRoom = (roomName?: string) => {
    if (roomName) setSelectedRoomType(roomName);
    setRoomModalOpen(true);
  };

  const handleEnquireDining = () => {
    setDiningModalOpen(true);
  };

  const handleOrderFood = () => {
    setFoodModalOpen(true);
  };

  const handleEnquireEvent = () => {
    setEventModalOpen(true);
  };

  const handleExplore = () => {
    const overviewEl = document.getElementById('overview');
    if (overviewEl) {
      overviewEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col antialiased selection:bg-gold/25 selection:text-gold-light">
      {/* 1. Global Floating Pill Navigation Bar */}
      <Navigation
        activeSectionId={activeSection}
        onSelectSection={handleSelectSection}
        onBookRoom={() => handleBookRoom()}
        onReserveTable={handleEnquireDining}
        onOrderFood={handleOrderFood}
      />

      {/* 2. Step 3 Cinematic Hero with Automatic Image Carousel */}
      <CinematicHero
        onBookRoom={() => handleBookRoom()}
        onReserveTable={handleEnquireDining}
        onOrderFood={handleOrderFood}
        onEnquireEvent={handleEnquireEvent}
        onSelectSection={handleSelectSection}
        onExplore={handleExplore}
        scrollTargetId="overview"
      />

      {/* Main Content Sections: Overview & Architectural Anchor Foundations */}
      <main id="overview" className="flex-1">
        {/* Step 3 Overview & Architectural Verification */}
        <Section spacing="md" variant="surface">
          <Container size="xl">
            <SectionHeading
              eyebrow="Architectural Presence"
              title="A Distinguished Sanctuary in Chandrapur"
              subtitle="Reflecting genuine palatial grandeur and bespoke hospitality at the gateway to the Tadoba corridor."
              align="center"
              className="mb-14"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sand text-sm leading-relaxed border-t border-b border-white/5 py-10">
              <div className="space-y-3">
                <span className="font-cinzel text-xs text-gold tracking-[0.2em] uppercase block">
                  Location & Gateway
                </span>
                <Typography variant="body" className="text-ivory-warm">
                  Situated near Major Gate beside Sargam Petrol Pump on Durgapur Road, Hotel Rajwada Palace welcomes business travelers, family gatherings, and wilderness explorers visiting Chandrapur.
                </Typography>
              </div>

              <div className="space-y-3">
                <span className="font-cinzel text-xs text-gold tracking-[0.2em] uppercase block">
                  Celebrations & Banquets
                </span>
                <Typography variant="body" className="text-ivory-warm">
                  Verified as a premier hotel and banquet hall, providing spacious celebratory grounds for weddings, formal receptions, and distinguished gatherings.
                </Typography>
              </div>

              <div className="space-y-3">
                <span className="font-cinzel text-xs text-gold tracking-[0.2em] uppercase block">
                  Guest Distinction
                </span>
                <Typography variant="body" className="text-ivory-warm">
                  Recognized with a 4.2 rating across 460 verified Google reviews, reflecting thoughtful service and genuine regional hospitality.
                </Typography>
              </div>
            </div>
          </Container>
        </Section>

        {/* Step 5 Rooms & Suites Experience */}
        <RoomsSection onCheckAvailability={() => handleBookRoom()} />

        {/* Step 6 Dining Experience (Separated from Hotel Booking) */}
        <DiningSection
          onCheckAvailability={handleEnquireDining}
          onEnquireDining={handleEnquireDining}
          onOrderFood={handleOrderFood}
        />

        {/* Step 7 Celebrations & Banquets Experience */}
        <CelebrationsSection
          onEnquire={handleEnquireEvent}
          onExploreSpace={() => handleSelectSection('gallery')}
        />

        {/* Step 8 The Tadoba & Chandrapur Experience */}
        <ExperienceSection
          onCheckAvailability={() => handleBookRoom()}
          onExploreLocation={() => handleSelectSection('contact')}
        />

        {/* Step 9 Dedicated Luxury Gallery Experience */}
        <GallerySection
          onBookRoom={handleBookRoom}
          onEnquireDining={handleEnquireDining}
          onEnquireEvent={handleEnquireEvent}
        />

        {/* Step 10 Reviews / Trust Experience */}
        <TrustSection onExploreLocation={() => handleSelectSection('contact')} />

        {/* Step 11 Verified Location / Contact Experience */}
        <LocationSection />

        {/* Step 12 Final Booking / Conversion Experience */}
        <BookingCTASection onCheckAvailability={() => handleBookRoom()} />
      </main>

      {/* Step 13 Global Luxury Footer */}
      <Footer
        onCheckAvailability={() => handleBookRoom()}
        onNavigateSection={handleSelectSection}
      />

      {/* Dedicated Customer Journey Modals (Strictly Separated) */}
      <HotelBookingModal
        isOpen={roomModalOpen}
        onClose={() => setRoomModalOpen(false)}
        initialRoomType={selectedRoomType}
      />

      <RestaurantEnquiryModal
        isOpen={diningModalOpen}
        onClose={() => setDiningModalOpen(false)}
      />

      <FoodOrderModal
        isOpen={foodModalOpen}
        onClose={() => setFoodModalOpen(false)}
      />

      <EventEnquiryModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
      />
    </div>
  );
}

export default App;
