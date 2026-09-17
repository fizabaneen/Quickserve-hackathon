import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, AlertCircle, ArrowLeft, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react'
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
      setSuccessMsg(`Booking request ${newBooking.booking_id} created successfully! Encrypted QR Pass issued. Redirecting...`)

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
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Provider Profile
      </Link>

      <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xl space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-yellow text-stone-900 text-xs font-bold mb-2 border border-amber-300/80">
            <ShieldCheck size={14} className="text-stone-800" />
            <span>Protected Booking with Doorstep QR Pass</span>
          </div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Book Appointment</h1>
          <p className="text-xs text-stone-500 mt-1">
            Requesting service with <strong className="text-stone-900">{provider?.name}</strong> (${provider?.price || 50}/hr)
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs flex items-center gap-3">
            <AlertCircle size={20} className="shrink-0" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-3">
            <CheckCircle2 size={20} className="shrink-0 text-emerald-600" />
            <span className="font-bold">{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Service Category
              </label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-900"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Service Location Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. 100 Innovation Way, Suite 400, Downtown"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Job Description & Specific Instructions
              </label>
              <div className="relative">
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Describe the job, issues faced, access instructions, or special requests..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-900"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-black rounded-full shadow-md transition-all text-xs hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <QrCode size={16} />
            <span>{submitting ? 'Generating Booking & QR Pass...' : 'Confirm Booking & Generate Security QR Pass'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
