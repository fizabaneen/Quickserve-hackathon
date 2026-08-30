import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, ArrowRight, Wrench } from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { BookingCard } from '../components/BookingCard'
import { ReviewForm } from '../components/ReviewForm'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function CustomerDashboard() {
  const { user } = useAuth()
  const location = useLocation()
  const highlightCode = location.state?.newBookingId

  const [bookings, setBookings] = useState([])
  const [reviewsMap, setReviewsMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeReviewBooking, setActiveReviewBooking] = useState(null)

  const loadData = async () => {
    setLoading(true)
    const [bList, rMap] = await Promise.all([
      api.getBookings({ role: 'customer', userId: user?.id || 'cust-101' }),
      api.getReviews(),
    ])
    setBookings(bList)
    setReviewsMap(rMap)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [user])

  const handleReviewSubmit = async (reviewData) => {
    await api.createReview({
      ...reviewData,
      customer_id: user?.id || 'cust-101',
      provider_id: activeReviewBooking.provider_id,
    })
    await loadData()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 text-xs font-bold mb-2">
            <Sparkles size={13} /> Customer Portal
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Customer Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your appointment status, manage bookings, and leave reviews upon job completion.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-teal-600/20 transition-all shrink-0"
        >
          <span>Book Service</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Active & Past Bookings ({bookings.length})</h2>
          <span className="text-xs text-gray-500">Synced with Supabase database</span>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading customer bookings..." />
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const code = booking.booking_id || booking.id
              const reviewObj = reviewsMap[code] || reviewsMap[booking.id]

              return (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  isProvider={false}
                  onOpenReview={(b) => setActiveReviewBooking(b)}
                  isReviewed={Boolean(reviewObj)}
                  reviewRating={reviewObj?.rating}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8 space-y-3">
            <Wrench className="mx-auto text-gray-400" size={36} />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">No bookings yet</h3>
            <p className="text-xs text-gray-500">Browse service professionals and request your first service appointment.</p>
            <Link to="/" className="inline-block text-teal-600 font-bold text-xs pt-2">
              Browse Service Professionals →
            </Link>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {activeReviewBooking && (
        <ReviewForm
          booking={activeReviewBooking}
          onSubmit={handleReviewSubmit}
          onClose={() => setActiveReviewBooking(null)}
        />
      )}
    </div>
  )
}
