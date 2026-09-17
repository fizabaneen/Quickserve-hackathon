import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, ArrowRight, Wrench, ShieldCheck, QrCode } from 'lucide-react'
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-yellow text-stone-900 text-xs font-bold mb-2 border border-amber-300">
            <ShieldCheck size={13} className="text-emerald-700" />
            <span>Customer Security Portal</span>
          </div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Customer Dashboard</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Track appointment status in real-time, view your Doorstep QR Passes, and leave verified reviews.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-full shadow-md transition-all shrink-0 hover:scale-105"
        >
          <span>Book New Service</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-stone-900">
            My Appointments & Security Passes ({bookings.length})
          </h2>
          <span className="text-xs text-stone-500 flex items-center gap-1">
            <QrCode size={13} /> QR Verified System
          </span>
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
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <Wrench className="mx-auto text-stone-400" size={36} />
            <h3 className="text-base font-black text-stone-900">No bookings yet</h3>
            <p className="text-xs text-stone-500">Browse service professionals and request your first verified appointment.</p>
            <Link to="/" className="inline-block text-stone-900 font-bold text-xs pt-2 underline">
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
