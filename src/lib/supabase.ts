import { createClient } from '@supabase/supabase-js';
import type {
  Database,
  HotelBookingRequestInsert,
  HotelBookingRequestRow,
  RoomBookingInsert,
  DiningEnquiryInsert,
  EventEnquiryInsert,
  FoodOrderInsert,
} from '../types/supabase';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://mgdbdefxjyowtsogrpik.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nZGJkZWZ4anlvd3Rzb2dycGlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2ODQzOTAsImV4cCI6MjEwODI2MDM5MH0.sbKG1XkEsCh-MPez1TSgtWb4vGKuWPCQDjpcutk9cPQ';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface BookingSubmissionPayload {
  guest_name: string;
  mobile_number: string;
  email?: string | null;
  check_in: string;
  check_out: string;
  guest_count: number;
  room_type: string;
  special_requests?: string | null;
}

/**
 * Validates and securely saves a direct Room Booking Request to Supabase.
 * Returns { success: true } only when the database genuinely confirms the write.
 */
export async function submitHotelBookingRequest(
  payload: BookingSubmissionPayload
): Promise<{ success: boolean; id?: string }> {
  // 1. Client-side sanitization & validation
  const guest_name = payload.guest_name.trim();
  const mobile_number = payload.mobile_number.trim();
  const email = payload.email?.trim() || null;
  const check_in = payload.check_in.trim();
  const check_out = payload.check_out.trim();
  const room_type = payload.room_type.trim();
  const guest_count = Math.max(1, Math.min(50, Number(payload.guest_count) || 2));
  const special_requests = payload.special_requests?.trim() || null;

  if (!guest_name || guest_name.length < 2) {
    throw new Error('Please enter a valid guest full name (minimum 2 characters).');
  }

  // Mobile number verification (allowing international prefixes +91 or standard 10 digits)
  const cleanPhone = mobile_number.replace(/[\s\-()]/g, '');
  if (!cleanPhone || cleanPhone.length < 8) {
    throw new Error('Please enter a valid mobile number with at least 8 digits.');
  }

  if (!check_in) {
    throw new Error('Please select a valid check-in date.');
  }

  if (!check_out) {
    throw new Error('Please select a valid check-out date.');
  }

  if (new Date(check_out) < new Date(check_in)) {
    throw new Error('Check-out date must be on or after the check-in date.');
  }

  if (!room_type) {
    throw new Error('Please select a room category.');
  }

  // 2. Perform direct insert into hotel_booking_requests
  const recordToInsert: HotelBookingRequestInsert = {
    guest_name,
    mobile_number,
    email,
    check_in,
    check_out,
    guest_count,
    room_type,
    special_requests,
    status: 'pending',
  };

  const { error } = await supabase
    .from('hotel_booking_requests')
    .insert([recordToInsert]);

  if (error) {
    console.error('Supabase booking request insert error:', error);
    throw new Error(error.message || 'Failed to submit booking request to database.');
  }

  return { success: true };
}

/**
 * Non-blocking Call Now tracking to record interactions securely.
 * Prioritizes opening the dialer immediately without interfering.
 */
export function trackCallClick(ctaLocation: string): void {
  try {
    void (async () => {
      try {
        const { error } = await supabase
          .from('call_click_events')
          .insert([
            {
              event_type: 'call_button_clicked',
              cta_location: ctaLocation || 'unknown',
            },
          ]);
        if (error) {
          console.warn('Call tracking event not recorded:', error.message);
        }
      } catch (err) {
        console.warn('Call tracking fetch error:', err);
      }
    })();
  } catch {
    // Fail silently so phone dialer is never interrupted
  }
}

/**
 * Authenticated Staff API: Fetch booking requests for authorized staff review
 */
export async function getStaffBookingRequests(
  filterStatus?: 'pending' | 'reviewed' | 'confirmed' | 'cancelled' | 'all'
): Promise<HotelBookingRequestRow[]> {
  let query = supabase
    .from('hotel_booking_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (filterStatus && filterStatus !== 'all') {
    query = query.eq('status', filterStatus);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching booking requests:', error);
    throw error;
  }

  return (data as HotelBookingRequestRow[]) || [];
}

/**
 * Authenticated Staff API: Update status of a booking request
 */
export async function updateStaffBookingStatus(
  id: string,
  newStatus: 'pending' | 'reviewed' | 'confirmed' | 'cancelled'
): Promise<void> {
  const { error } = await supabase
    .from('hotel_booking_requests')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
}

/**
 * Legacy room booking method preserved for existing components
 */
export async function createRoomBooking(
  booking: Omit<RoomBookingInsert, 'id' | 'created_at' | 'status' | 'source'>
) {
  const { error } = await supabase.from('room_bookings').insert([
    {
      ...booking,
      status: 'new',
      source: 'website',
    },
  ]);

  if (error) {
    console.error('Error saving room booking to Supabase:', error);
    throw error;
  }

  return { success: true };
}

/**
 * Restaurant / Dining enquiry
 */
export async function createDiningEnquiry(
  enquiry: Omit<DiningEnquiryInsert, 'id' | 'created_at' | 'status' | 'source'>
) {
  const { error } = await supabase.from('dining_enquiries').insert([
    {
      ...enquiry,
      status: 'new',
      source: 'website',
    },
  ]);

  if (error) {
    console.error('Error saving dining enquiry to Supabase:', error);
    throw error;
  }

  return { success: true };
}

/**
 * Weddings & Banquets event enquiry
 */
export async function createEventEnquiry(
  enquiry: Omit<EventEnquiryInsert, 'id' | 'created_at' | 'status' | 'source'>
) {
  const { error } = await supabase.from('event_enquiries').insert([
    {
      ...enquiry,
      status: 'new',
      source: 'website',
    },
  ]);

  if (error) {
    console.error('Error saving event enquiry to Supabase:', error);
    throw error;
  }

  return { success: true };
}

/**
 * Restaurant Food Order
 */
export async function createFoodOrder(
  order: Omit<FoodOrderInsert, 'id' | 'created_at' | 'status' | 'source'>
) {
  const { error } = await supabase.from('food_orders').insert([
    {
      ...order,
      status: 'received',
      source: 'website',
    },
  ]);

  if (error) {
    console.error('Error saving food order to Supabase:', error);
    throw error;
  }

  return { success: true };
}
