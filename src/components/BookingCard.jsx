import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Check, X, Play, CheckCircle2, Star, QrCode, ShieldCheck } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { SecurityQRModal } from './SecurityQRModal'

export function BookingCard({ booking, isProvider, onStatusChange, onOpenReview, isReviewed, reviewRating }) {
  const [showQR, setShowQR] = useState(false)

  const isCompleted = booking.status === 'completed'
  const isPending = booking.status === 'pending'
  const isAccepted = booking.status === 'accepted'
  const isInProgress = booking.status === 'in_progress'
  const isRejected = booking.status === 'rejected'

  return (
    <>
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:border-stone-300">
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1 bg-stone-100 text-stone-700 rounded-full border border-stone-200">
              {booking.booking_id || (booking.id ? booking.id.slice(0, 8) : 'BK-100')}
            </span>
            <h3 className="text-lg font-black text-stone-900">
              {isProvider ? booking.customer_name || 'Customer' : booking.service}
            </h3>
            <StatusBadge status={booking.status} />

            {/* Security QR Pass Button */}
            <button
              type="button"
              onClick={() => setShowQR(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-pastel-yellow hover:bg-amber-200 text-stone-900 rounded-full text-xs font-bold border border-amber-300 transition-colors shadow-2xs"
              title="Open Doorstep Security QR Pass"
            >
              <QrCode size={13} />
              <span>Doorstep QR Pass</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
            <span className="font-bold text-stone-900">
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

          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <MapPin size={13} className="shrink-0 text-stone-400" />
            <span>{booking.location}</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl text-xs text-stone-600 italic border border-stone-100">
            "{booking.description}"
          </div>
        </div>

        {/* Action Column */}
        <div className="shrink-0 w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
          {/* Provider Action Transitions */}
          {isProvider && isPending && (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => onStatusChange(booking.id, 'accepted')}
                className="flex-1 md:flex-initial px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-full shadow-xs flex items-center justify-center gap-1.5"
              >
                <Check size={14} /> Accept
              </button>
              <button
                onClick={() => onStatusChange(booking.id, 'rejected')}
                className="flex-1 md:flex-initial px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-full border border-rose-200 flex items-center justify-center gap-1.5"
              >
                <X size={14} /> Reject
              </button>
            </div>
          )}

          {isProvider && isAccepted && (
            <button
              onClick={() => onStatusChange(booking.id, 'in_progress')}
              className="w-full md:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-full shadow-xs flex items-center justify-center gap-1.5"
            >
              <Play size={14} /> Start Work
            </button>
          )}

          {isProvider && isInProgress && (
            <button
              onClick={() => onStatusChange(booking.id, 'completed')}
              className="w-full md:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-xs flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={14} /> Mark Completed
            </button>
          )}

          {/* Rejection / Completion Locks */}
          {isProvider && isRejected && (
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
              Rejected (Locked)
            </span>
          )}

          {isProvider && isCompleted && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              Completed (Immutable)
            </span>
          )}

          {/* Customer Review Button & Badges */}
          {!isProvider && isCompleted && !isReviewed && (
            <button
              onClick={() => onOpenReview(booking)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-1.5"
            >
              <Star size={14} className="fill-white" /> Leave Review (1–5 Stars)
            </button>
          )}

          {!isProvider && isReviewed && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 size={14} /> Reviewed ({reviewRating}★)
            </span>
          )}

          {!isProvider && !isCompleted && (
            <span className="text-[11px] text-stone-400 font-medium italic">
              Review unlocks upon completion
            </span>
          )}
        </div>
      </div>

      {/* Security QR Pass Modal */}
      {showQR && (
        <SecurityQRModal
          isOpen={showQR}
          onClose={() => setShowQR(false)}
          type="booking"
          data={booking}
        />
      )}
    </>
  )
}
