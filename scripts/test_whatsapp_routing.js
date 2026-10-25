/**
 * AUTOMATED WHATSAPP ROUTING & AUDIT TEST SUITE
 * Validates every booking path, parameters, prefilled messages, and phone number consistency.
 */

import assert from 'node:assert';

const HOTEL_WHATSAPP_NUMBER = '919921019664';
const EXPECTED_PREFIX = `https://wa.me/${HOTEL_WHATSAPP_NUMBER}`;

console.log('--- STARTING WHATSAPP BOOKING AUDIT & TEST SUITE ---');

// Test 1: Room Booking Full Details
import {
  getWhatsAppRoomBookingUrl,
  getWhatsAppQuickRoomInquiryUrl,
  getWhatsAppGeneralInquiryUrl,
  getWhatsAppEventInquiryUrl,
  getWhatsAppDiningInquiryUrl,
} from '../src/lib/whatsapp.ts';

// Test 1.1: Room Booking
console.log('1. Testing Room Booking URL generation...');
const roomBookingUrl = getWhatsAppRoomBookingUrl({
  roomType: 'Palace Executive Suite',
  checkIn: '2026-11-01',
  checkOut: '2026-11-03',
  guestCount: 2,
  guestName: 'Rahul Verma',
  mobile: '9876543210',
  email: 'rahul@example.com',
  specialRequests: 'High floor, late arrival',
});

assert(roomBookingUrl.startsWith(EXPECTED_PREFIX), 'URL must point to verified WhatsApp number');
const decodedRoomMsg = decodeURIComponent(roomBookingUrl.split('?text=')[1]);
assert(decodedRoomMsg.includes('Palace Executive Suite'), 'Message must contain room type');
assert(decodedRoomMsg.includes('Rahul Verma'), 'Message must contain guest name');
assert(decodedRoomMsg.includes('9876543210'), 'Message must contain mobile');
assert(decodedRoomMsg.includes('2026-11-01'), 'Message must contain check-in date');
assert(decodedRoomMsg.includes('2026-11-03'), 'Message must contain check-out date');
assert(decodedRoomMsg.includes('2 Guests'), 'Message must contain guest count');
assert(decodedRoomMsg.includes('High floor, late arrival'), 'Message must contain special requests');
console.log('✓ Room Booking URL passed: Correct format and all params encoded.');

// Test 1.2: Room Booking for Sanctuary Deluxe Room
const deluxeUrl = getWhatsAppRoomBookingUrl({
  roomType: 'Sanctuary Deluxe Room',
  guestName: 'Priya Sharma',
  mobile: '9988776655',
  checkIn: '2026-12-10',
  checkOut: '2026-12-12',
  guestCount: 3,
});
const decodedDeluxeMsg = decodeURIComponent(deluxeUrl.split('?text=')[1]);
assert(decodedDeluxeMsg.includes('Sanctuary Deluxe Room'), 'Message must contain Sanctuary Deluxe Room');
console.log('✓ Sanctuary Deluxe Room booking passed.');

// Test 1.3: Quick Room Inquiries
console.log('2. Testing Quick Room Inquiries...');
['Palace Executive Suite', 'Sanctuary Deluxe Room', 'Dormitory (Family Room)'].forEach((category) => {
  const quickUrl = getWhatsAppQuickRoomInquiryUrl(category);
  assert(quickUrl.startsWith(EXPECTED_PREFIX), 'Quick URL must point to verified WhatsApp number');
  const msg = decodeURIComponent(quickUrl.split('?text=')[1]);
  assert(msg.includes(category), `Message must mention ${category}`);
  console.log(`✓ Quick inquiry for "${category}" passed.`);
});

// Test 1.4: General Inquiry URL
console.log('3. Testing General Inquiry URL...');
const generalUrl = getWhatsAppGeneralInquiryUrl();
assert(generalUrl.startsWith(EXPECTED_PREFIX), 'General URL must point to verified WhatsApp number');
const generalMsg = decodeURIComponent(generalUrl.split('?text=')[1]);
assert(generalMsg.includes('Hotel Rajwada Palace'), 'General message must reference property');
console.log('✓ General inquiry URL passed.');

// Test 1.5: Weddings & Events Inquiries
console.log('4. Testing Wedding & Event Inquiries...');
const eventUrl = getWhatsAppEventInquiryUrl({
  eventType: 'Grand Wedding & Mandap Ceremony',
  hostName: 'Amit Deshmukh',
  phoneNumber: '9123456789',
  preferredDate: '2026-12-25',
  guestCount: '500+ Guests',
  notes: 'Requires Mandap stage decoration & catering',
});
assert(eventUrl.startsWith(EXPECTED_PREFIX), 'Event URL must point to verified WhatsApp number');
const decodedEventMsg = decodeURIComponent(eventUrl.split('?text=')[1]);
assert(decodedEventMsg.includes('Grand Wedding & Mandap Ceremony'), 'Event message must include event type');
assert(decodedEventMsg.includes('Amit Deshmukh'), 'Event message must include host name');
assert(decodedEventMsg.includes('500+ Guests'), 'Event message must include guest count');
assert(decodedEventMsg.includes('Mandap stage decoration'), 'Event message must include notes');
console.log('✓ Wedding & Event inquiry passed: Event context preserved.');

// Test 1.6: Restaurant & Dining Inquiries
console.log('5. Testing Restaurant & Dining Inquiries...');
const diningUrl = getWhatsAppDiningInquiryUrl({
  serviceType: 'Table Reservation',
  customerName: 'Sneha Kulkarni',
  phoneNumber: '9822001122',
  guestCount: '4-6 Guests',
  diningDate: '2026-11-05',
  mealTime: 'Dinner (8:00 PM)',
  preferences: 'Vegetarian special thali & quiet table',
});
assert(diningUrl.startsWith(EXPECTED_PREFIX), 'Dining URL must point to verified WhatsApp number');
const decodedDiningMsg = decodeURIComponent(diningUrl.split('?text=')[1]);
assert(decodedDiningMsg.includes('Table Reservation'), 'Dining message must include service type');
assert(decodedDiningMsg.includes('Sneha Kulkarni'), 'Dining message must include customer name');
assert(decodedDiningMsg.includes('Dinner (8:00 PM)'), 'Dining message must include meal time');
assert(decodedDiningMsg.includes('Vegetarian special thali'), 'Dining message must include preferences');
console.log('✓ Dining table reservation inquiry passed.');

console.log('\n--- ALL WHATSAPP ROUTING & AUDIT TESTS PASSED (6/6) ---');
