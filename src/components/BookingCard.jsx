import React from 'react'
import { Calendar, Clock, MapPin, Check, X, Play, CheckCircle2, Star } from 'lucide-react'
import { StatusBadge } from './StatusBadge'

export function BookingCard({ booking, isProvider, onStatusChange, onOpenReview, isReviewed, reviewRating }) {
  const isCompleted = booking.status === 'completed'
  const isPending = booking.status === 'pending'
  const isAccepted = booking.status === 'accepted'
  const isInProgress = booking.status === 'in_progress'
  const isRejected = booking.status === 'rejected'

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:border-gray-300">
      <div className="space-y-3 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg">
            {booking.booking_id || booking.id.slice(0, 8)}
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {isProvider ? booking.customer_name || 'Customer' : booking.service}
          </h3>
          <StatusBadge status={booking.status} />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-teal-600 dark:text-teal-400">
            {isProvider ? booking.service : `Pro: ${booking.provider_name}`}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar size={13} /> {booking.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {booking.time}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin size={13} className="shrink-0" />
          <span>{booking.location}</span>
        </div>

        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-xs text-gray-600 dark:text-gray-300 italic">
          "{booking.description}"
        </div>
      </div>

      {/* Action Column */}
      <div className="shrink-0 w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
        {/* Provider Action Transitions */}
        {isProvider && isPending && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => onStatusChange(booking.id, 'accepted')}
              className="flex-1 md:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5"
            >
              <Check size={14} /> Accept
            </button>
            <button
              onClick={() => onStatusChange(booking.id, 'rejected')}
              className="flex-1 md:flex-initial px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5"
            >
              <X size={14} /> Reject
            </button>
          </div>
        )}

        {isProvider && isAccepted && (
          <button
            onClick={() => onStatusChange(booking.id, 'in_progress')}
            className="w-full md:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5"
          >
            <Play size={14} /> Start Work
          </button>
        )}

        {isProvider && isInProgress && (
          <button
            onClick={() => onStatusChange(booking.id, 'completed')}
            className="w-full md:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 size={14} /> Mark Completed
          </button>
        )}

        {/* Rejection / Completion Locks */}
        {isProvider && isRejected && (
          <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-200">
            Rejected (Locked)
          </span>
        )}

        {isProvider && isCompleted && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200">
            Completed (Immutable)
          </span>
        )}

        {/* Customer Review Button & Badges */}
        {!isProvider && isCompleted && !isReviewed && (
          <button
            onClick={() => onOpenReview(booking)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5"
          >
            <Star size={14} className="fill-white" /> Leave Review (1–5 Stars)
          </button>
        )}

        {!isProvider && isReviewed && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 size={14} /> Reviewed ({reviewRating}★)
          </span>
        )}

        {!isProvider && !isCompleted && (
          <span className="text-[11px] text-gray-400 font-medium italic">
            Review unlocks upon completion
          </span>
        )}
      </div>
    </div>
  )
}
