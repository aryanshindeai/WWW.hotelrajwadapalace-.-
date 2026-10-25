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
  HotelBookingModal,
  RestaurantEnquiryModal,
  FoodOrderModal,
  EventEnquiryModal,
  OverviewSection,
} from './components';









export function App() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('Sanctuary Deluxe Room');
  const [diningModalOpen, setDiningModalOpen] = useState(false);
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState('Grand Wedding & Mandap Ceremony');
  const [cart, setCart] = useState<Record<string, number>>({});

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

  const handleEnquireEvent = (categoryTitle?: string) => {
    if (categoryTitle) setSelectedEventType(categoryTitle);
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
      <main className="flex-1">
        {/* Step 3 Overview & Architectural Verification with Warm Luxury Ivory Card */}
        <OverviewSection
          onBookRoom={() => handleBookRoom()}
          onExploreEvents={handleEnquireEvent}
          onExploreRooms={() => handleSelectSection('rooms')}
        />


        {/* Step 5 Rooms & Suites Experience */}
        <RoomsSection onCheckAvailability={handleBookRoom} />

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

        {/* Step 8 The Rajwada Dining Experience */}
        <ExperienceSection
          onExploreMenu={handleOrderFood}
          onOrderFood={handleOrderFood}
          onReserveTable={handleEnquireDining}
          cart={cart}
          onUpdateCart={setCart}
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
        cart={cart}
        onUpdateCart={setCart}
      />

      <EventEnquiryModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        initialEventType={selectedEventType}
      />
    </div>
  );
}

export default App;
