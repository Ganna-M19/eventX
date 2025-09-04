import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'user'
  created_at: string
}

export interface Event {
  _id: string
  name: string
  details: string
  eventDate: string
  eventTime: string
  location: string
  cost: number
  seatsTotal: number
  seatsAvailable: number
  imageUrl?: string
  createdBy: string
  createdAt: string
  status: 'upcoming' | 'active' | 'closed'
}

export interface Ticket {
  _id: string
  eventName: string
  eventDate: string
  eventTime: string
  location: string
  seatNumber: string
  qrData: string
  reservedAt: string
  status: 'confirmed' | 'checked_in' | 'cancelled'
}

export interface Analytics {
  total_events: number
  total_tickets_sold: number
  total_revenue: number
  attendee_demographics: {
    age_groups: { [key: string]: number }
    gender: { [key: string]: number }
    locations: { [key: string]: number }
  }
}