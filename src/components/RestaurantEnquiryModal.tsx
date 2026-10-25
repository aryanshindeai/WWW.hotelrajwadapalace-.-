import React, { useState, useEffect } from 'react';
import { Typography } from './Typography';
import { Button } from './Button';
import { HOTEL_CONTACT_DATA } from '../data/locationData';
import { createDiningEnquiry } from '../lib/supabase';
import { getWhatsAppDiningInquiryUrl, openWhatsAppUrl } from '../lib/whatsapp';

interface RestaurantEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const RestaurantEnquiryModal: React.FC<RestaurantEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Table Reservation',
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceType, setServiceType] = useState(initialService);
  const [guestCount, setGuestCount] = useState('2-4 Guests');
  const [diningDate, setDiningDate] = useState('');
  const [mealTime, setMealTime] = useState('Dinner (7:00 PM – 10:30 PM)');
  const [preferences, setPreferences] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Sync service type when opened with specific selection
  useEffect(() => {
    if (initialService) {
      setServiceType(initialService);
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // 1. Build structured WhatsApp dining inquiry URL
    const waUrl = getWhatsAppDiningInquiryUrl({
      serviceType,
      customerName,
      phoneNumber,
      guestCount,
      diningDate,
      mealTime,
      preferences,
    });
    setGeneratedWhatsAppUrl(waUrl);

    try {
      // 2. Save to Supabase backend
      await createDiningEnquiry({
        customer_name: customerName.trim(),
        phone_number: phoneNumber.trim(),
        service_type: serviceType,
        guest_count: guestCount,
        dining_date: diningDate || null,
        meal_time: mealTime,
        preferences: preferences.trim() || null,
      });

      setSubmitSuccess(true);
    } catch (err: any) {
      console.warn('Supabase dining enquiry note:', err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
      // 3. Open WhatsApp for instant live communication
      openWhatsAppUrl(waUrl);
    }
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
              Rajwada Dining Desk
            </span>
            <Typography variant="h3" className="text-xl sm:text-2xl text-ivory-light mt-1 font-serif">
              Restaurant & Dining Enquiry
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

        {/* Notice / Feedback Banner */}
        {submitSuccess ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 mb-6 text-xs text-emerald-200 rounded-sm space-y-2">
            <div className="flex items-center gap-2 font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dining Enquiry Forwarded to Restaurant Desk</span>
            </div>
            <p className="text-[11px] text-emerald-200/90 leading-relaxed">
              Your dining enquiry has been recorded and forwarded to our Restaurant Desk on WhatsApp (+91 99210 19664). Our dining staff will connect with you to confirm table seating and timings.
            </p>
            <p className="text-[10px] text-amber-300/80 pt-1 border-t border-emerald-500/20">
              * Note: A dining inquiry sent via WhatsApp is not a guaranteed table reservation until confirmed by restaurant management.
            </p>
            {generatedWhatsAppUrl && (
              <div className="pt-2">
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs uppercase tracking-wider rounded transition-colors w-full text-center"
                >
                  <span>Continue on WhatsApp (Click if not opened)</span>
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 bg-charcoal/80 border border-gold/20 mb-6 text-xs text-sand leading-relaxed">
            <p className="text-ivory-warm">
              <span className="text-gold font-medium">Distinct Culinary Journey:</span> Reserve table seating in our main dining hall, book group banquet catering, or order celebratory feast arrangements.
            </p>
          </div>
        )}

        {submitError && (
          <div className="p-2.5 bg-amber-950/30 border border-amber-500/30 mb-4 text-xs text-amber-200">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Anand Deshmukh"
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
                placeholder="e.g. +91 99210 19664"
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Dining Experience
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              >
                <option value="Main Dining Hall Table">Main Dining Hall Table</option>
                <option value="Rooftop Terrace Dining">Rooftop Terrace Dining</option>
                <option value="Family Banquet Feast">Family Banquet Feast</option>
                <option value="Group Catering / Parcel Service">Group Catering / Parcel Order</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Number of Guests
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              >
                <option value="1-2 Guests">1-2 Guests</option>
                <option value="2-4 Guests">2-4 Guests</option>
                <option value="5-10 Family Group">5-10 Family Group</option>
                <option value="10-25 Celebration Party">10-25 Celebration Party</option>
                <option value="25+ Banquet Gathering">25+ Banquet Gathering</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={diningDate}
                onChange={(e) => setDiningDate(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Meal Preference
              </label>
              <select
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              >
                <option value="Lunch (12:30 PM – 3:30 PM)">Lunch (12:30 PM – 3:30 PM)</option>
                <option value="Evening High Tea (4:30 PM – 6:30 PM)">Evening High Tea (4:30 PM – 6:30 PM)</option>
                <option value="Dinner (7:00 PM – 10:30 PM)">Dinner (7:00 PM – 10:30 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
              Dietary Preferences or Special Requests
            </label>
            <textarea
              rows={2}
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="Pure Veg requirements, spice preference, birthday cake request..."
              className="w-full bg-charcoal px-3 py-2 border border-white/15 text-ivory focus:border-gold focus:outline-none"
            />
          </div>

          <div className="pt-3 flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="w-full sm:flex-1 text-center justify-center"
            >
              {isSubmitting ? 'Recording Enquiry...' : submitSuccess ? 'Reservation Recorded ✓' : 'Enquire Dining via WhatsApp'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              as="a"
              href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
              className="w-full sm:w-auto text-center justify-center whitespace-nowrap"
            >
              Call Restaurant Desk
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
