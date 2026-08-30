export const categories = ['All services', 'Electrician', 'Plumber', 'Cleaner', 'Carpenter', 'Mechanic', 'AC Repair']

export const providers = [
  { id: 'p1', name: 'Marcus Chen', category: 'Electrician', location: 'Downtown', experience: '12 yrs', price: 85, rating: 4.9, reviews: 128, initials: 'MC', color: '#d7f5e9', accent: '#0b8f68', bio: 'Residential and commercial electrical work, from quick fixes to full rewires. Known for clear estimates and tidy work.' },
  { id: 'p2', name: 'Aisha Williams', category: 'Plumber', location: 'Northside', experience: '8 yrs', price: 72, rating: 4.8, reviews: 94, initials: 'AW', color: '#e3edff', accent: '#3973d5', bio: 'Fast, friendly plumbing help for leaks, installations, and those jobs that simply cannot wait.' },
  { id: 'p3', name: 'Jon Bell', category: 'Cleaner', location: 'West End', experience: '6 yrs', price: 45, rating: 4.7, reviews: 76, initials: 'JB', color: '#fff1d6', accent: '#d88a17', bio: 'Detail-focused home and office cleaning with flexible recurring schedules and eco-friendly products.' },
  { id: 'p4', name: 'Sofia Ramirez', category: 'Carpenter', location: 'East Village', experience: '15 yrs', price: 95, rating: 5.0, reviews: 61, initials: 'SR', color: '#f7e1df', accent: '#ca5d55', bio: 'Custom carpentry and repairs with an eye for durable joinery, thoughtful design, and beautiful finishes.' },
  { id: 'p5', name: 'Dev Patel', category: 'Mechanic', location: 'South Market', experience: '10 yrs', price: 78, rating: 4.9, reviews: 112, initials: 'DP', color: '#e9e1ff', accent: '#7655c9', bio: 'Honest mobile mechanic for diagnostics, maintenance, and getting you safely back on the road.' },
  { id: 'p6', name: 'Nora Okafor', category: 'AC Repair', location: 'Lakeside', experience: '9 yrs', price: 68, rating: 4.8, reviews: 88, initials: 'NO', color: '#dff3f5', accent: '#2697a2', bio: 'AC repair and seasonal servicing for homes and small businesses, with same-day availability when possible.' },
]

export const statuses = ['Pending', 'Accepted', 'In Progress', 'Completed', 'Rejected']

const BOOKING_KEY = 'quickserve_bookings'
const REVIEW_KEY = 'quickserve_reviews'

export function getBookings() {
  try { return JSON.parse(localStorage.getItem(BOOKING_KEY) || '[]') } catch { return [] }
}

export function saveBookings(bookings) { localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings)) }
export function getReviews() {
  try { return JSON.parse(localStorage.getItem(REVIEW_KEY) || '{}') } catch { return {} }
}
export function saveReviews(reviews) { localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews)) }
export function generateBookingId() { return `BK-${Math.floor(10000 + Math.random() * 90000)}` }

export function updateBookingStatus(id, status) {
  const bookings = getBookings()
  const booking = bookings.find((item) => item.id === id)
  if (!booking || booking.status === 'Rejected' || booking.status === 'Completed') return false
  const allowed = { Pending: ['Accepted', 'Rejected'], Accepted: ['In Progress'], 'In Progress': ['Completed'] }
  if (!allowed[booking.status]?.includes(status)) return false
  booking.status = status
  saveBookings(bookings)
  return true
}
