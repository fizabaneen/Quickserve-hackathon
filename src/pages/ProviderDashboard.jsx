import React, { useEffect, useState } from 'react'
import { Sparkles, AlertCircle, Wrench } from 'lucide-react'
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
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold mb-2">
              <Sparkles size={13} /> Provider Workspace
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Incoming Service Requests</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage incoming customer jobs and transition job statuses in real-time.
            </p>
          </div>
        </div>

        {/* Metric Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
            <span className="text-2xl font-black text-gray-900 dark:text-white block">{counts.total}</span>
            <span className="text-xs text-gray-500 font-semibold">Total Requests</span>
          </div>
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/40 rounded-2xl border border-amber-200/60 dark:border-amber-950">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 block">{counts.pending}</span>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">Pending Approval</span>
          </div>
          <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200/60 dark:border-indigo-950">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 block">{counts.in_progress + counts.accepted}</span>
            <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">Active Jobs</span>
          </div>
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200/60 dark:border-emerald-950">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 block">{counts.completed}</span>
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">Completed Jobs</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-600 dark:text-rose-400 text-xs flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <span className="font-semibold">{errorMsg}</span>
        </div>
      )}

      {/* Bookings Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Request Queue</h2>
          <span className="text-xs text-gray-500">Action required for pending requests</span>
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
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8">
            <Wrench className="mx-auto text-gray-400 mb-3" size={36} />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">No incoming requests</h3>
            <p className="text-xs text-gray-500 mt-1">When customers request your service, jobs will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
