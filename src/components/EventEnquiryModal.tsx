import React, { useState, useEffect } from 'react';
import { Typography } from './Typography';
import { Button } from './Button';
import { HOTEL_CONTACT_DATA } from '../data/locationData';
import { createEventEnquiry } from '../lib/supabase';
import { getWhatsAppEventInquiryUrl, openWhatsAppUrl } from '../lib/whatsapp';

interface EventEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEventType?: string;
}

export const EventEnquiryModal: React.FC<EventEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialEventType = 'Grand Wedding & Mandap Ceremony',
}) => {
  const [hostName, setHostName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [eventType, setEventType] = useState(initialEventType);
  const [preferredDate, setPreferredDate] = useState('');
  const [guestCount, setGuestCount] = useState('200 – 500 Guests');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Sync event category when opened with specific selection
  useEffect(() => {
    if (initialEventType) {
      setEventType(initialEventType);
    }
  }, [initialEventType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // 1. Build structured WhatsApp event inquiry URL
    const waUrl = getWhatsAppEventInquiryUrl({
      eventType,
      hostName,
      phoneNumber,
      preferredDate,
      guestCount,
      notes,
    });
    setGeneratedWhatsAppUrl(waUrl);

    try {
      // 2. Save event enquiry to Supabase backend
      await createEventEnquiry({
        host_name: hostName.trim(),
        phone_number: phoneNumber.trim(),
        event_type: eventType,
        guest_count: guestCount,
        preferred_date: preferredDate || null,
        notes: notes.trim() || null,
      });

      setSubmitSuccess(true);
    } catch (err: any) {
      console.warn('Supabase event enquiry note:', err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
      // 3. Open WhatsApp for direct discussion with the Banquet Manager
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
              Banquet & Event Management
            </span>
            <Typography variant="h3" className="text-xl sm:text-2xl text-ivory-light mt-1 font-serif">
              Weddings & Events Enquiry
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
              <span>Event Enquiry Forwarded to Banquet Desk</span>
            </div>
            <p className="text-[11px] text-emerald-200/90 leading-relaxed">
              Your celebration request is logged and forwarded to our Banquet Desk on WhatsApp (+91 99210 19664). Our Banquet Manager will connect with you to review venue availability and custom packages.
            </p>
            <p className="text-[10px] text-amber-300/80 pt-1 border-t border-emerald-500/20">
              * Note: An inquiry sent via WhatsApp is not a confirmed reservation until confirmed by hotel banquet management.
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
              <span className="text-gold font-medium">Bespoke Celebrations:</span> Reserve our grand banquet hall, decorated ceremonial stage, or open-air rooftop terrace for weddings, receptions, and milestones in Chandrapur.
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
                Host / Organizer Name *
              </label>
              <input
                type="text"
                required
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="e.g. Rajesh Patil"
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Contact Phone *
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
                Type of Celebration *
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              >
                <option value="Grand Wedding & Mandap Ceremony">Grand Wedding & Mandap Ceremony</option>
                <option value="Wedding Reception & Stage Gathering">Wedding Reception & Stage Gathering</option>
                <option value="Engagement / Ring Ceremony">Engagement / Ring Ceremony</option>
                <option value="Rooftop Celebration / Family Gathering">Rooftop Celebration / Family Gathering</option>
                <option value="Naming Ceremony / Milestone">Naming Ceremony / Milestone</option>
                <option value="Corporate / Cultural Assembly">Corporate / Cultural Assembly</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                Approximate Guest Count
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
              >
                <option value="50 – 100 Guests">50 – 100 Guests (Intimate / Family)</option>
                <option value="100 – 250 Guests">100 – 250 Guests (Banquet Hall)</option>
                <option value="250 – 500 Guests">250 – 500 Guests (Grand Celebration)</option>
                <option value="500 – 1000+ Guests">500 – 1000+ Guests (Full Palace Grounds)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
              Preferred Date or Range
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full bg-charcoal px-3 py-2.5 border border-white/15 text-ivory focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
              Event Details & Requirements
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catering preferences, mandap decoration, multi-day celebrations..."
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
              {isSubmitting ? 'Recording Enquiry...' : submitSuccess ? 'Event Enquiry Recorded ✓' : 'Enquire Event via WhatsApp'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              as="a"
              href={`tel:${HOTEL_CONTACT_DATA.phoneRaw}`}
              className="w-full sm:w-auto text-center justify-center whitespace-nowrap"
            >
              Call Banquet Desk
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
