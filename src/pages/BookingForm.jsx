import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, FileText, AlertCircle, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function BookingForm() {
  const { providerId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    location: '',
    description: '',
  })

  useEffect(() => {
    async function loadProvider() {
      setLoading(true)
      const data = await api.getProviderById(providerId)
      setProvider(data)
      if (data) {
        setFormData((prev) => ({
          ...prev,
          service: data.service || data.service_category || data.category || 'General Service',
        }))
      }
      setLoading(false)
    }
    loadProvider()
  }, [providerId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Validation
    if (!formData.service.trim()) return setErrorMsg('Service category is required.')
    if (!formData.date) return setErrorMsg('Please select an appointment date.')
    if (!formData.time) return setErrorMsg('Please specify an appointment time.')
    if (!formData.location.trim()) return setErrorMsg('Service location address is required.')
    if (!formData.description.trim()) return setErrorMsg('Please describe the service required.')

    try {
      setSubmitting(true)
      const newBooking = await api.createBooking({
        customer_id: user?.id || 'cust-101',
        customer_name: user?.name || 'Jane Doe',
        provider_id: provider?.id || providerId,
        provider_name: provider?.name || 'Service Provider',
        service: formData.service,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        description: formData.description,
      })

      setSubmitting(false)
      setSuccessMsg(`Booking request ${newBooking.booking_id} created successfully! Redirecting...`)

      setTimeout(() => {
        navigate('/customer/dashboard', { state: { newBookingId: newBooking.booking_id } })
      }, 1500)
    } catch (err) {
      setSubmitting(false)
      setErrorMsg(err.message || 'Failed to submit booking request.')
    }
  }

  if (loading) {
    return <LoadingSpinner message="Preparing booking request form..." />
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        to={`/provider/${providerId}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-600 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Provider Profile
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8 shadow-xl space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 text-xs font-bold mb-2">
            <Sparkles size={13} /> Verified Booking Workflow
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Book Appointment</h1>
          <p className="text-xs text-gray-500 mt-1">
            Requesting appointment with <strong className="text-gray-900 dark:text-white">{provider?.name}</strong> (${provider?.price || 50}/hr)
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 rounded-2xl text-rose-600 dark:text-rose-400 text-xs flex items-center gap-3">
            <AlertCircle size={20} className="shrink-0" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 rounded-2xl text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle2 size={20} className="shrink-0" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Service Category
              </label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Service Location Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. 100 Innovation Way, Suite 400, Downtown"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Job Description & Specific Instructions
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Describe the job, issues faced, access instructions, or special requests..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-lg shadow-teal-600/30 transition-all text-sm hover:scale-[1.01]"
          >
            {submitting ? 'Creating Booking Request...' : 'Confirm & Request Booking (QS-2026-XXX)'}
          </button>
        </form>
      </div>
    </div>
  )
}
