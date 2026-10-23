export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      hotel_booking_requests: {
        Row: {
          id: string;
          guest_name: string;
          mobile_number: string;
          email: string | null;
          check_in: string;
          check_out: string;
          guest_count: number;
          room_type: string;
          special_requests: string | null;
          status: 'pending' | 'reviewed' | 'confirmed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          guest_name: string;
          mobile_number: string;
          email?: string | null;
          check_in: string;
          check_out: string;
          guest_count?: number;
          room_type: string;
          special_requests?: string | null;
          status?: 'pending' | 'reviewed' | 'confirmed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          guest_name?: string;
          mobile_number?: string;
          email?: string | null;
          check_in?: string;
          check_out?: string;
          guest_count?: number;
          room_type?: string;
          special_requests?: string | null;
          status?: 'pending' | 'reviewed' | 'confirmed' | 'cancelled';
          created_at?: string;
        };
        Relationships: [];
      };
      call_click_events: {
        Row: {
          id: string;
          event_type: string;
          cta_location: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type?: string;
          cta_location: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          cta_location?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      dining_enquiries: {
        Row: {
          id: string;
          customer_name: string;
          phone_number: string;
          service_type: string;
          guest_count: string;
          dining_date: string | null;
          meal_time: string;
          preferences: string | null;
          status: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          phone_number: string;
          service_type: string;
          guest_count: string;
          dining_date?: string | null;
          meal_time: string;
          preferences?: string | null;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          phone_number?: string;
          service_type?: string;
          guest_count?: string;
          dining_date?: string | null;
          meal_time?: string;
          preferences?: string | null;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      event_enquiries: {
        Row: {
          id: string;
          host_name: string;
          phone_number: string;
          event_type: string;
          guest_count: string;
          preferred_date: string | null;
          notes: string | null;
          status: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          host_name: string;
          phone_number: string;
          event_type: string;
          guest_count: string;
          preferred_date?: string | null;
          notes?: string | null;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          host_name?: string;
          phone_number?: string;
          event_type?: string;
          guest_count?: string;
          preferred_date?: string | null;
          notes?: string | null;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      food_orders: {
        Row: {
          id: string;
          customer_name: string;
          phone_number: string;
          order_type: string;
          table_or_address: string | null;
          items: Json;
          total_amount: number;
          total_items: number;
          status: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          phone_number: string;
          order_type: string;
          table_or_address?: string | null;
          items?: Json;
          total_amount?: number;
          total_items?: number;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          phone_number?: string;
          order_type?: string;
          table_or_address?: string | null;
          items?: Json;
          total_amount?: number;
          total_items?: number;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      room_bookings: {
        Row: {
          id: string;
          guest_name: string;
          phone_number: string;
          check_in_date: string | null;
          check_out_date: string | null;
          room_type: string;
          guests_count: string;
          special_requests: string | null;
          status: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          guest_name: string;
          phone_number: string;
          check_in_date?: string | null;
          check_out_date?: string | null;
          room_type: string;
          guests_count: string;
          special_requests?: string | null;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          guest_name?: string;
          phone_number?: string;
          check_in_date?: string | null;
          check_out_date?: string | null;
          room_type?: string;
          guests_count?: string;
          special_requests?: string | null;
          status?: string;
          source?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type HotelBookingRequestInsert = Database['public']['Tables']['hotel_booking_requests']['Insert'];
export type HotelBookingRequestRow = Database['public']['Tables']['hotel_booking_requests']['Row'];
export type CallClickEventInsert = Database['public']['Tables']['call_click_events']['Insert'];
export type RoomBookingInsert = Database['public']['Tables']['room_bookings']['Insert'];
export type DiningEnquiryInsert = Database['public']['Tables']['dining_enquiries']['Insert'];
export type EventEnquiryInsert = Database['public']['Tables']['event_enquiries']['Insert'];
export type FoodOrderInsert = Database['public']['Tables']['food_orders']['Insert'];
