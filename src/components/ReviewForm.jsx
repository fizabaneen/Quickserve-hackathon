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
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-200 dark:border-gray-800 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Leave Service Review</span>
            <h3 className="text-xl font-black text-gray-900 dark:text-white mt-0.5">
              Review {booking.provider_name}
            </h3>
            <p className="text-xs text-gray-500">Booking ID: {booking.booking_id || booking.id.slice(0, 8)}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Star Rating (1 to 5 Stars)
            </label>
            <div className="flex items-center gap-3 p-3 bg-amber-50/50 dark:bg-amber-950/30 rounded-2xl border border-amber-200/60 dark:border-amber-800/60">
              <StarRating rating={rating} size={24} interactive onChange={(val) => setRating(val)} />
              <span className="text-sm font-black text-amber-600 dark:text-amber-400">{rating} / 5 Stars</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Written Review
            </label>
            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share details about punctuality, service quality, and professionalism..."
              className="w-full p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow-md shadow-amber-500/20"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
