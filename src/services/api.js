import { isSupabaseConfigured, supabase } from '../lib/supabase'

export const INITIAL_CATEGORIES = [
  'All services',
  'Electrician',
  'Plumber',
  'Cleaner',
  'AC Technician',
  'Painter',
  'Computer Repair',
]

export const INITIAL_PROVIDERS = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    user_id: 'user-p1',
    name: 'Ahmed Electrician',
    service: 'Electrician',
    location: 'Downtown',
    experience: '12 yrs',
    price: 85,
    rating: 4.9,
    reviews_count: 128,
    availability: 'Available Today',
    description: 'Licensed electrician providing high quality residential & commercial wiring, panel upgrades, and emergency electrical fixes.',
    initials: 'AE',
    color: '#d7f5e9',
    accent: '#0b8f68',
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    user_id: 'user-p2',
    name: 'Ali Plumbing Services',
    service: 'Plumber',
    location: 'Northside',
    experience: '8 yrs',
    price: 72,
    rating: 4.8,
    reviews_count: 94,
    availability: 'Same Day Service',
    description: 'Expert plumbing solutions for clogged drains, pipe leaks, water heater repair, and bathroom fixture installation.',
    initials: 'AP',
    color: '#e3edff',
    accent: '#3973d5',
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    user_id: 'user-p3',
    name: 'Sara Cleaning Services',
    service: 'Cleaner',
    location: 'West End',
    experience: '6 yrs',
    price: 45,
    rating: 4.7,
    reviews_count: 76,
    availability: 'Available Tomorrow',
    description: 'Deep home and commercial cleaning service using eco-friendly non-toxic products with customizable schedules.',
    initials: 'SC',
    color: '#fff1d6',
    accent: '#d88a17',
  },
  {
    id: '10000000-0000-0000-0000-000000000004',
    user_id: 'user-p4',
    name: 'Hassan AC Services',
    service: 'AC Technician',
    location: 'Lakeside',
    experience: '9 yrs',
    price: 68,
    rating: 4.8,
    reviews_count: 88,
    availability: 'Available Today',
    description: 'Specialized in central AC repair, HVAC gas refilling, duct cleaning, and seasonal maintenance.',
    initials: 'HA',
    color: '#dff3f5',
    accent: '#2697a2',
  },
  {
    id: '10000000-0000-0000-0000-000000000005',
    user_id: 'user-p5',
    name: 'Ayesha Painting Services',
    service: 'Painter',
    location: 'East Village',
    experience: '10 yrs',
    price: 65,
    rating: 4.9,
    reviews_count: 104,
    availability: 'Available Next Day',
    description: 'Interior and exterior painting, wall texture finishes, wallpapering, and wood staining with clean estimates.',
    initials: 'AP',
    color: '#f7e1df',
    accent: '#ca5d55',
  },
  {
    id: '10000000-0000-0000-0000-000000000006',
    user_id: 'user-p6',
    name: 'Bilal Computer Repair',
    service: 'Computer Repair',
    location: 'South Market',
    experience: '7 yrs',
    price: 55,
    rating: 4.9,
    reviews_count: 112,
    availability: 'Available Today',
    description: 'Fast diagnostic and hardware repair for laptops, PCs, virus removal, network setup, and SSD upgrades.',
    initials: 'BC',
    color: '#e9e1ff',
    accent: '#7655c9',
  },
]

const STORAGE_KEYS = {
  PROVIDERS: 'quickserve_providers_v3',
  BOOKINGS: 'quickserve_bookings_v3',
  REVIEWS: 'quickserve_reviews_v3',
  USERS: 'quickserve_users_v3',
  COUNTER: 'quickserve_booking_counter',
}

function getLocal(key, defaultValue) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err)
    return defaultValue
  }
}

function setLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err)
  }
}

// Helper to generate unique booking ID like "QS-2026-001"
function generateBookingCode() {
  const currentCount = getLocal(STORAGE_KEYS.COUNTER, 100)
  const nextCount = currentCount + 1
  setLocal(STORAGE_KEYS.COUNTER, nextCount)
  const padded = String(nextCount).padStart(3, '0')
  return `QS-2026-${padded}`
}

// Initial storage setup
if (!localStorage.getItem(STORAGE_KEYS.PROVIDERS)) {
  setLocal(STORAGE_KEYS.PROVIDERS, INITIAL_PROVIDERS)
}

if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
  setLocal(STORAGE_KEYS.BOOKINGS, [
    {
      id: crypto.randomUUID(),
      booking_id: 'QS-2026-001',
      customer_id: 'cust-101',
      customer_name: 'Jane Doe',
      provider_id: '10000000-0000-0000-0000-000000000001',
      provider_name: 'Ahmed Electrician',
      service: 'Electrician',
      date: '2026-09-05',
      time: '10:00',
      location: '123 Main Street, Apt 4B',
      description: 'Need to repair kitchen circuit breaker and install 2 ceiling fixtures.',
      status: 'pending',
      created_at: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      booking_id: 'QS-2026-002',
      customer_id: 'cust-101',
      customer_name: 'Jane Doe',
      provider_id: '10000000-0000-0000-0000-000000000002',
      provider_name: 'Ali Plumbing Services',
      service: 'Plumber',
      date: '2026-09-02',
      time: '14:30',
      location: '742 Evergreen Terrace',
      description: 'Leaking bathroom sink faucet replacement.',
      status: 'completed',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ])
}

export const api = {
  // Fetch providers list
  async getProviders() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('providers').select('*')
      if (!error && data && data.length > 0) return data
    }
    return getLocal(STORAGE_KEYS.PROVIDERS, INITIAL_PROVIDERS)
  },

  // Fetch single provider by ID
  async getProviderById(id) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('providers').select('*').eq('id', id).single()
      if (!error && data) return data
    }
    const list = getLocal(STORAGE_KEYS.PROVIDERS, INITIAL_PROVIDERS)
    return list.find((p) => String(p.id) === String(id)) || list[0]
  },

  // Fetch bookings with optional filter by role & userId
  async getBookings({ role, userId } = {}) {
    if (isSupabaseConfigured) {
      let query = supabase.from('bookings').select('*').order('created_at', { ascending: false })
      if (role === 'customer' && userId) query = query.eq('customer_id', userId)
      if (role === 'provider' && userId) query = query.eq('provider_id', userId)
      const { data, error } = await query
      if (!error && data) return data
    }

    const bookings = getLocal(STORAGE_KEYS.BOOKINGS, [])
    if (role === 'customer' && userId) {
      return bookings.filter((b) => b.customer_id === userId)
    }
    if (role === 'provider' && userId) {
      return bookings.filter((b) => b.provider_id === userId)
    }
    return bookings
  },

  // Create booking with validation and unique booking_id
  async createBooking(bookingData) {
    const { customer_id, customer_name, provider_id, provider_name, service, date, time, location, description } = bookingData

    if (!service || !date || !time || !location?.trim() || !description?.trim()) {
      throw new Error('All required booking fields must be completed.')
    }

    const booking_code = generateBookingCode()

    const newBooking = {
      id: crypto.randomUUID(),
      booking_id: booking_code,
      customer_id: customer_id || 'cust-101',
      customer_name: customer_name || 'Jane Doe',
      provider_id,
      provider_name: provider_name || 'Service Provider',
      service,
      date,
      time,
      location: location.trim(),
      description: description.trim(),
      status: 'pending',
      created_at: new Date().toISOString(),
    }

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('bookings').insert([newBooking]).select().single()
      if (!error && data) return data
    }

    const current = getLocal(STORAGE_KEYS.BOOKINGS, [])
    const updated = [newBooking, ...current]
    setLocal(STORAGE_KEYS.BOOKINGS, updated)
    return newBooking
  },

  // Update booking status with strict state machine
  async updateBookingStatus(bookingIdOrCode, newStatus) {
    const validStatuses = ['pending', 'accepted', 'in_progress', 'completed', 'rejected']
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status transition to ${newStatus}`)
    }

    const bookings = getLocal(STORAGE_KEYS.BOOKINGS, [])
    const booking = bookings.find((b) => b.id === bookingIdOrCode || b.booking_id === bookingIdOrCode)

    if (!booking) {
      throw new Error('Booking record not found.')
    }

    // Rule: Completed bookings cannot be edited
    if (booking.status === 'completed') {
      throw new Error('Completed bookings are final and cannot be edited.')
    }

    // Rule: Rejected bookings cannot move to in_progress
    if (booking.status === 'rejected') {
      throw new Error('Rejected bookings cannot be transitioned to in_progress or active states.')
    }

    const allowedTransitions = {
      pending: ['accepted', 'rejected'],
      accepted: ['in_progress'],
      in_progress: ['completed'],
    }

    if (!allowedTransitions[booking.status]?.includes(newStatus)) {
      throw new Error(`Cannot transition from '${booking.status}' to '${newStatus}'.`)
    }

    if (isSupabaseConfigured) {
      await supabase.from('bookings').update({ status: newStatus }).eq('id', booking.id)
    }

    booking.status = newStatus
    setLocal(STORAGE_KEYS.BOOKINGS, bookings)
    return booking
  },

  // Get reviews map indexed by booking_id
  async getReviews() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('reviews').select('*')
      if (!error && data) {
        const reviewMap = {}
        data.forEach((r) => { reviewMap[r.booking_id] = r })
        return reviewMap
      }
    }
    return getLocal(STORAGE_KEYS.REVIEWS, {})
  },

  // Submit review with validation rules
  async createReview({ booking_id, customer_id, provider_id, rating, review }) {
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5 stars.')
    }
    if (!review?.trim()) {
      throw new Error('Written review text is required.')
    }

    const bookings = getLocal(STORAGE_KEYS.BOOKINGS, [])
    const booking = bookings.find((b) => b.id === booking_id || b.booking_id === booking_id)

    // Rule: Customer cannot review before completion
    if (!booking || booking.status !== 'completed') {
      throw new Error('Reviews can only be submitted for completed bookings.')
    }

    const reviews = getLocal(STORAGE_KEYS.REVIEWS, {})
    const key = booking.booking_id || booking_id

    // Rule: Single review per booking ID
    if (reviews[key]) {
      throw new Error('A review has already been submitted for this booking ID.')
    }

    const newReview = {
      id: crypto.randomUUID(),
      booking_id: key,
      customer_id: customer_id || booking.customer_id,
      provider_id: provider_id || booking.provider_id,
      rating,
      review: review.trim(),
      created_at: new Date().toISOString(),
    }

    if (isSupabaseConfigured) {
      await supabase.from('reviews').insert([newReview])
    }

    reviews[key] = newReview
    setLocal(STORAGE_KEYS.REVIEWS, reviews)
    return newReview
  },
}
