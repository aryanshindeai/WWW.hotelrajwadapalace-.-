import React, { useState } from 'react';
import { Typography } from './Typography';
import { Button } from './Button';
import { HOTEL_CONTACT_DATA } from '../data/locationData';

interface HotelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomType?: string;
}

export const HotelBookingModal: React.FC<HotelBookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomType = 'Palace Executive Suite',
}) => {
  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState(initialRoomType);
  const [guestsCount, setGuestsCount] = useState('2 Guests');
  const [specialRequests, setSpecialRequests] = useState('');

  if (!isOpen) return null;

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*Hotel Room Enquiry — Hotel Rajwada Palace*
• *Guest Name:* ${guestName || 'Guest'}
• *Contact Phone:* ${phoneNumber || 'Not provided'}
• *Room Type:* ${roomType}
• *Check-in Date:* ${checkIn || 'Dates to be confirmed'}
• *Check-out Date:* ${checkOut || 'Dates to be confirmed'}
• *Guests:* ${guestsCount}
${specialRequests ? `• *Special Note:* ${specialRequests}` : ''}

Please confirm availability and current tariff for these dates.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919921019664?text=${encoded}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-charcoal-deep/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
    >
      <div className="border border-gold/40 bg-charcoal-surface max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <span className="font-cinzel text-xs tracking-[0.25em] text-gold uppercase block">
              Hotel Rajwada Palace
            </span>
            <Typography variant="h3" className="text-xl sm:text-2xl text-ivory-light mt-1 font-serif">
              Book a Room Enquiry
            </Typography>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sand/80 hover:text-ivory text-xl p-2 cursor-pointer transition-colors"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Clear Notice */}
        <div className="p-3 bg-charcoal/80 border border-gold/20 mb-6 text-xs text-sand leading-relaxed">
          <p className="text-ivory-warm">
            <span className="text-gold font-medium">Direct Reservation Desk:</span> Submitting sends your exact stay dates directly to our front desk via WhatsApp or phone.
          </p>
        </div>

        <form onSubmit={handleSubmitWhatsApp} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Room Category
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              >
                <option value="Palace Executive Suite">Palace Executive Suite</option>
                <option value="Sanctuary Deluxe Room">Sanctuary Deluxe Room</option>
                <option value="Dormitory (Family Room)">Dormitory (Family Room)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Guests Count
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              >
                <option value="1 Guest">1 Guest</option>
                <option value="2 Guests">2 Guests</option>
                <option value="3 Guests">3 Guests</option>
                <option value="4+ Family">4+ Family Members</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
              Special Requests or Tadoba Safari Notes
            </label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Early check-in, safari transportation, extra bed..."
              className="w-full bg-charcoal px-3 py-2 border border-white/15 text-ivory focus:border-gold focus:outline-none"
            />
          </div>

          <div className="pt-3 flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:flex-1 text-center justify-center"
            >
              Send Enquiry via WhatsApp
            </Button>
            <Button
              variant="secondary"
              size="md"
              as="a"
              href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
              className="w-full sm:w-auto text-center justify-center whitespace-nowrap"
            >
              Call Front Desk
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
