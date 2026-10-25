/**
 * WHATSAPP ROUTING & INQUIRY ARCHITECTURE
 * Centralized, verified WhatsApp destination and inquiry message generator
 * for Hotel Rajwada Palace, Chandrapur.
 *
 * OFFICIAL VERIFIED WHATSAPP NUMBER: +91 99210 19664
 */

export const HOTEL_WHATSAPP_NUMBER = '919921019664';
export const HOTEL_WHATSAPP_BASE_URL = `https://wa.me/${HOTEL_WHATSAPP_NUMBER}`;

export interface WhatsAppRoomBookingParams {
  roomType: string;
  checkIn?: string;
  checkOut?: string;
  guestCount?: number | string;
  guestName?: string;
  mobile?: string;
  email?: string;
  specialRequests?: string;
}

/**
 * Generates room-specific WhatsApp booking inquiry URL with structured guest parameters.
 */
export function getWhatsAppRoomBookingUrl(params: WhatsAppRoomBookingParams): string {
  const lines: string[] = [
    `*Room Booking Inquiry — Hotel Rajwada Palace*`,
    params.guestName ? `• *Guest Name:* ${params.guestName.trim()}` : '',
    params.mobile ? `• *Mobile Number:* ${params.mobile.trim()}` : '',
    params.email ? `• *Email:* ${params.email.trim()}` : '',
    `• *Room Category:* ${params.roomType || 'Palace Executive Suite'}`,
    params.checkIn ? `• *Check-in Date:* ${params.checkIn}` : '',
    params.checkOut ? `• *Check-out Date:* ${params.checkOut}` : '',
    params.guestCount ? `• *Guests:* ${params.guestCount} Guest${Number(params.guestCount) > 1 ? 's' : ''}` : '',
    params.specialRequests ? `• *Special Requests:* ${params.specialRequests.trim()}` : '',
    '',
    `Namaste, please confirm room availability and booking tariff. (Sent via website reservation desk)`,
  ].filter(Boolean);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `${HOTEL_WHATSAPP_BASE_URL}?text=${encoded}`;
}

/**
 * Direct room-specific quick inquiry URL for immediate inquiry without filling the full form.
 */
export function getWhatsAppQuickRoomInquiryUrl(roomType: string): string {
  const msg = `*Room Availability Inquiry — Hotel Rajwada Palace*
Namaste, I am interested in booking the *${roomType}* at Hotel Rajwada Palace, Chandrapur. Please share current availability and tariff details.`;
  return `${HOTEL_WHATSAPP_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

/**
 * General inquiry URL for website header, footer, and floating contact actions.
 */
export function getWhatsAppGeneralInquiryUrl(): string {
  const msg = `*Inquiry — Hotel Rajwada Palace, Chandrapur*
Namaste, I am reaching out through your official website to inquire about hotel room reservations, banquet celebrations, and dining services. Please assist me.`;
  return `${HOTEL_WHATSAPP_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export interface WhatsAppEventInquiryParams {
  eventType: string;
  hostName?: string;
  phoneNumber?: string;
  preferredDate?: string;
  guestCount?: string;
  notes?: string;
}

/**
 * Wedding, banquet & grand celebrations inquiry URL.
 */
export function getWhatsAppEventInquiryUrl(params: WhatsAppEventInquiryParams): string {
  const lines: string[] = [
    `*Weddings & Events Enquiry — Hotel Rajwada Palace*`,
    params.hostName ? `• *Host Name:* ${params.hostName.trim()}` : '',
    params.phoneNumber ? `• *Phone Number:* ${params.phoneNumber.trim()}` : '',
    `• *Event Type:* ${params.eventType}`,
    params.preferredDate ? `• *Preferred Date:* ${params.preferredDate}` : '',
    params.guestCount ? `• *Approximate Guest Count:* ${params.guestCount}` : '',
    params.notes ? `• *Event Details / Mandap / Catering Notes:* ${params.notes.trim()}` : '',
    '',
    `Please share venue availability, hall dimensions, and celebration package details.`,
  ].filter(Boolean);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `${HOTEL_WHATSAPP_BASE_URL}?text=${encoded}`;
}

export interface WhatsAppDiningInquiryParams {
  serviceType?: string;
  customerName?: string;
  phoneNumber?: string;
  guestCount?: string;
  diningDate?: string;
  mealTime?: string;
  preferences?: string;
}

/**
 * Restaurant table reservation and dining inquiry URL.
 */
export function getWhatsAppDiningInquiryUrl(params: WhatsAppDiningInquiryParams): string {
  const lines: string[] = [
    `*Restaurant & Dining Enquiry — Hotel Rajwada Palace*`,
    params.customerName ? `• *Customer Name:* ${params.customerName.trim()}` : '',
    params.phoneNumber ? `• *Phone:* ${params.phoneNumber.trim()}` : '',
    `• *Service Requested:* ${params.serviceType || 'Table Reservation'}`,
    params.guestCount ? `• *Party Size:* ${params.guestCount}` : '',
    params.diningDate ? `• *Preferred Date:* ${params.diningDate}` : '',
    params.mealTime ? `• *Meal Time:* ${params.mealTime}` : '',
    params.preferences ? `• *Special Dietary / Seating Request:* ${params.preferences.trim()}` : '',
    '',
    `Please confirm table seating and banquet dining options.`,
  ].filter(Boolean);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `${HOTEL_WHATSAPP_BASE_URL}?text=${encoded}`;
}

/**
 * Safe helper to open WhatsApp destination in a new tab without security vulnerabilities.
 */
export function openWhatsAppUrl(url: string): void {
  try {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  } catch (err) {
    console.error('Failed to open WhatsApp window:', err);
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  }
}
