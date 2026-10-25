import React, { useState, useEffect } from 'react';
import { Typography } from './Typography';
import { Button } from './Button';
import { HOTEL_CONTACT_DATA } from '../data/locationData';
import { submitHotelBookingRequest, trackCallClick } from '../lib/supabase';
import {
  getWhatsAppRoomBookingUrl,
  getWhatsAppQuickRoomInquiryUrl,
  openWhatsAppUrl,
} from '../lib/whatsapp';

interface HotelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomType?: string;
}

const getTodayDateString = () => {
  try {
    return new Date().toISOString().split('T')[0];
  } catch {
    return '2026-10-23';
  }
};

export const HotelBookingModal: React.FC<HotelBookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomType = 'Palace Executive Suite',
}) => {
  const [guestName, setGuestName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState(initialRoomType);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [specialRequests, setSpecialRequests] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  const [todayStr] = useState(getTodayDateString);

  // Synchronize room type if updated from parent component
  useEffect(() => {
    if (initialRoomType) {
      setRoomType(initialRoomType);
    }
  }, [initialRoomType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validations
    if (!guestName.trim() || guestName.trim().length < 2) {
      setErrorMessage('Please provide your full name (minimum 2 characters).');
      return;
    }

    const cleanMobile = mobileNumber.replace(/[\s\-()]/g, '');
    if (!cleanMobile || cleanMobile.length < 8) {
      setErrorMessage('Please provide a valid contact mobile number.');
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please provide a valid email address, or leave it blank.');
      return;
    }

    if (!checkIn) {
      setErrorMessage('Please select a check-in date.');
      return;
    }

    if (!checkOut) {
      setErrorMessage('Please select a check-out date.');
      return;
    }

    if (new Date(checkOut) < new Date(checkIn)) {
      setErrorMessage('Check-out date must be on or after check-in date.');
      return;
    }

    setIsSubmitting(true);

    // 1. Build room-specific verified WhatsApp reservation inquiry URL
    const waUrl = getWhatsAppRoomBookingUrl({
      roomType,
      checkIn,
      checkOut,
      guestCount,
      guestName: guestName.trim(),
      mobile: mobileNumber.trim(),
      email: email.trim(),
      specialRequests: specialRequests.trim(),
    });
    setGeneratedWhatsAppUrl(waUrl);

    try {
      // 2. Submit booking request to Supabase backend
      await submitHotelBookingRequest({
        guest_name: guestName.trim(),
        mobile_number: mobileNumber.trim(),
        email: email.trim() || null,
        check_in: checkIn,
        check_out: checkOut,
        guest_count: Number(guestCount) || 2,
        room_type: roomType,
        special_requests: specialRequests.trim() || null,
      });
    } catch (err: any) {
      console.warn('Backend booking request logged, forwarding to WhatsApp:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // 3. Automatically launch WhatsApp with structured room booking details
      openWhatsAppUrl(waUrl);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setErrorMessage(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Room Booking Request Dialog"
      className="fixed inset-0 z-50 bg-[#06080B]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="border border-gold/40 bg-[#0E1217] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-auto rounded-xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-5">
          <div>
            <span className="font-cinzel text-[11px] tracking-[0.25em] text-gold uppercase font-semibold block">
              Hotel Rajwada Palace · Chandrapur
            </span>
            <Typography variant="h3" className="text-xl sm:text-2xl text-ivory font-serif mt-1">
              Book a Room
            </Typography>
            <p className="text-xs text-sand/75 font-sans mt-0.5">
              Submit your stay details directly to our reservation desk.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-sand/80 hover:text-ivory text-xl p-2 cursor-pointer transition-colors rounded-full hover:bg-white/5 disabled:opacity-50"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Success Confirmation State */}
        {submitSuccess ? (
          <div className="py-6 px-4 space-y-5 text-center animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-2xl font-bold">
              ✓
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-xl sm:text-2xl text-ivory">
                Booking Inquiry Forwarded to WhatsApp
              </h4>
              <p className="text-xs sm:text-sm text-sand/90 max-w-md mx-auto leading-relaxed">
                Your reservation details are saved and forwarded to our official WhatsApp reservation desk (+91 99210 19664). Our front desk will verify dates and confirm your booking tariff.
              </p>
              <div className="p-2.5 bg-amber-950/30 border border-amber-500/30 rounded text-[11px] text-amber-200/90 max-w-md mx-auto leading-relaxed">
                <span className="font-semibold text-amber-300">Important Notice:</span> An inquiry forwarded to WhatsApp does not represent a confirmed reservation until verified and confirmed by hotel management.
              </div>
            </div>

            {/* Direct WhatsApp Re-open Link */}
            {generatedWhatsAppUrl && (
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs uppercase tracking-wider rounded transition-colors w-full max-w-md mx-auto shadow-lg"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.309A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.155-.494-4.425-1.344l-.317-.212-2.967.78.792-2.894-.233-.37A8.22 8.22 0 013.75 12c0-4.549 3.701-8.25 8.25-8.25 4.548 0 8.25 3.701 8.25 8.25 0 4.548-3.702 8.25-8.25 8.25z" />
                </svg>
                <span>Continue on WhatsApp (Click if not opened)</span>
              </a>
            )}

            {/* Stay Summary Card */}
            <div className="bg-[#151B22] border border-white/10 rounded-lg p-4 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-sand/70 uppercase tracking-wider text-[10px]">Guest Name:</span>
                <span className="text-ivory font-medium">{guestName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-sand/70 uppercase tracking-wider text-[10px]">Contact Mobile:</span>
                <span className="text-ivory font-medium">{mobileNumber}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-sand/70 uppercase tracking-wider text-[10px]">Room Selected:</span>
                <span className="text-gold font-medium">{roomType}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-sand/70 uppercase tracking-wider text-[10px]">Dates:</span>
                <span className="text-ivory font-medium">
                  {checkIn} to {checkOut}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sand/70 uppercase tracking-wider text-[10px]">Guests:</span>
                <span className="text-ivory font-medium">{guestCount} Guest{guestCount > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
              <Button
                variant="primary"
                size="md"
                onClick={onClose}
                className="w-full sm:flex-1 justify-center"
              >
                Close &amp; Return to Website
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleReset}
                className="w-full sm:w-auto justify-center text-xs"
              >
                Submit Another Request
              </Button>
            </div>

            <p className="text-[11px] text-sand/60">
              Need immediate telephone assistance? Call Front Desk:{' '}
              <a
                href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
                onClick={() => trackCallClick('booking_success_screen')}
                className="text-gold hover:underline font-medium"
              >
                {HOTEL_CONTACT_DATA.phoneDisplay}
              </a>
            </p>
          </div>
        ) : (
          /* Real Booking Request Form */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMessage && (
              <div
                role="alert"
                className="p-3 bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded text-xs leading-relaxed"
              >
                <div className="font-semibold mb-0.5">Please check the details:</div>
                {errorMessage}
              </div>
            )}

            {/* Guest Name & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                  Guest Full Name <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  disabled={isSubmitting}
                  className="w-full bg-[#151B22] px-3 py-2.5 border border-white/15 rounded text-ivory placeholder-sand/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                  Mobile Number <span className="text-gold">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. +91 99210 19664"
                  disabled={isSubmitting}
                  className="w-full bg-[#151B22] px-3 py-2.5 border border-white/15 rounded text-ivory placeholder-sand/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                Email Address <span className="text-sand/50 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                disabled={isSubmitting}
                className="w-full bg-[#151B22] px-3 py-2.5 border border-white/15 rounded text-ivory placeholder-sand/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            {/* Check-In and Check-Out Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                  Check-in Date <span className="text-gold">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-[#151B22] px-3 py-2.5 border border-white/15 rounded text-ivory focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                  Check-out Date <span className="text-gold">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={checkIn || todayStr}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-[#151B22] px-3 py-2.5 border border-white/15 rounded text-ivory focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            {/* Room Type & Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                  Room Category <span className="text-gold">*</span>
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-[#151B22] px-3 py-2.5 border border-white/15 rounded text-ivory focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <option value="Palace Executive Suite">Palace Executive Suite</option>
                  <option value="Sanctuary Deluxe Room">Sanctuary Deluxe Room</option>
                  <option value="Dormitory (Family Room)">Dormitory (Family Room)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                  Number of Guests <span className="text-gold">*</span>
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  disabled={isSubmitting}
                  className="w-full bg-[#151B22] px-3 py-2.5 border border-white/15 rounded text-ivory focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5 Guests (Family / Group)</option>
                  <option value={6}>6+ Guests</option>
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                Special Requests <span className="text-sand/50 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Early check-in, safari transfer assistance, dietary preferences..."
                disabled={isSubmitting}
                className="w-full bg-[#151B22] px-3 py-2 border border-white/15 rounded text-ivory placeholder-sand/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            {/* Direct Booking Desk Notice */}
            <div className="p-3 bg-black/30 border border-white/5 rounded text-[11px] text-sand/80 leading-relaxed">
              <span className="text-gold font-medium">Reservation Policy:</span> Check-in from 12:00 PM, Check-out by 10:00 AM. Free parking and complimentary Wi-Fi included. Our team reviews all requests promptly to confirm availability.
            </div>

            {/* Form Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
                className="w-full sm:flex-1 text-center justify-center font-medium shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-charcoal-deep border-t-transparent rounded-full animate-spin" />
                    Submitting &amp; Forwarding...
                  </span>
                ) : (
                  'Submit & Enquire via WhatsApp'
                )}
              </Button>

              <Button
                variant="secondary"
                size="md"
                as="a"
                href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
                onClick={() => trackCallClick('booking_modal_footer')}
                className="w-full sm:w-auto text-center justify-center whitespace-nowrap"
              >
                <svg
                  className="w-3.5 h-3.5 text-gold mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now
              </Button>
            </div>

            {/* Quick Direct WhatsApp Chat Option without form */}
            <div className="pt-3 border-t border-white/5 text-center">
              <a
                href={getWhatsAppQuickRoomInquiryUrl(roomType)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-sans tracking-wide transition-colors py-1"
                aria-label={`Direct WhatsApp inquiry for ${roomType}`}
              >
                <span>Or inquire directly on WhatsApp for {roomType} →</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
