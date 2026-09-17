import React, { useState } from 'react'
import { Star, AlertCircle, X } from 'lucide-react'
import { StarRating } from './StarRating'

export function ReviewForm({ booking, onSubmit, onClose }) {
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!review.trim()) {
      setError('Please write a brief review of your experience.')
      return
    }

    try {
      setSubmitting(true)
      await onSubmit({
        booking_id: booking.booking_id || booking.id,
        rating,
        review,
      })
      setSubmitting(false)
      onClose()
    } catch (err) {
      setSubmitting(false)
      setError(err.message || 'Failed to submit review.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-200 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Leave Service Review</span>
            <h3 className="text-xl font-black text-stone-900 mt-0.5">
              Review {booking.provider_name}
            </h3>
            <p className="text-xs text-stone-500">Booking ID: {booking.booking_id || booking.id.slice(0, 8)}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Star Rating (1 to 5 Stars)
            </label>
            <div className="flex items-center gap-3 p-3 bg-pastel-yellow rounded-2xl border border-amber-300/80">
              <StarRating rating={rating} size={24} interactive onChange={(val) => setRating(val)} />
              <span className="text-sm font-black text-stone-900">{rating} / 5 Stars</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Written Review
            </label>
            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share details about punctuality, service quality, and professionalism..."
              className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-900"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-stone-100 text-stone-700 font-bold rounded-full text-xs hover:bg-stone-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-full text-xs shadow-md transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Verified Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
