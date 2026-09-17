import React, { useEffect, useState } from 'react'
import { Sparkles, AlertCircle, Wrench, ShieldCheck, QrCode } from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { BookingCard } from '../components/BookingCard'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function ProviderDashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const loadProviderBookings = async () => {
    setLoading(true)
    const data = await api.getBookings({ role: 'provider', userId: user?.id })
    setBookings(data)
    setLoading(false)
  }

  useEffect(() => {
    loadProviderBookings()
  }, [user])

  const handleStatusChange = async (bookingId, nextStatus) => {
    setErrorMsg('')
    try {
      await api.updateBookingStatus(bookingId, nextStatus)
      await loadProviderBookings()
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update booking status.')
    }
  }

  const counts = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    accepted: bookings.filter((b) => b.status === 'accepted').length,
    in_progress: bookings.filter((b) => b.status === 'in_progress').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    rejected: bookings.filter((b) => b.status === 'rejected').length,
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Workspace Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-mint text-stone-900 text-xs font-bold mb-2 border border-emerald-300">
              <ShieldCheck size={13} className="text-emerald-700" />
              <span>Provider Security Center</span>
            </div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tight">Incoming Service Requests</h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Accept jobs, verify Doorstep QR security passes upon arrival, and manage active service workflows.
            </p>
          </div>
        </div>

        {/* Metric Counter Cards with Pastels */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-2xl font-black text-stone-900 block">{counts.total}</span>
            <span className="text-xs text-stone-500 font-bold">Total Requests</span>
          </div>
          <div className="p-4 bg-pastel-yellow rounded-2xl border border-amber-300/70">
            <span className="text-2xl font-black text-stone-900 block">{counts.pending}</span>
            <span className="text-xs text-stone-700 font-bold">Pending Approval</span>
          </div>
          <div className="p-4 bg-pastel-blue rounded-2xl border border-sky-300/70">
            <span className="text-2xl font-black text-stone-900 block">{counts.in_progress + counts.accepted}</span>
            <span className="text-xs text-stone-700 font-bold">Active Jobs</span>
          </div>
          <div className="p-4 bg-pastel-mint rounded-2xl border border-emerald-300/70">
            <span className="text-2xl font-black text-stone-900 block">{counts.completed}</span>
            <span className="text-xs text-stone-700 font-bold">Completed Jobs</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <span className="font-semibold">{errorMsg}</span>
        </div>
      )}

      {/* Bookings Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-stone-900">Request Queue & Doorstep QR Passes</h2>
          <span className="text-xs text-stone-500 flex items-center gap-1">
            <QrCode size={13} /> QR Doorstep Check-In
          </span>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading incoming requests..." />
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                isProvider={true}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <Wrench className="mx-auto text-stone-400 mb-3" size={36} />
            <h3 className="text-base font-black text-stone-900">No incoming requests</h3>
            <p className="text-xs text-stone-500 mt-1">When customers request your service, jobs will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
