import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, MapPin, Briefcase, Star, ArrowRight, CheckCircle2, Clock, QrCode } from 'lucide-react'
import { api } from '../services/api'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { SecurityQRModal } from '../components/SecurityQRModal'

export function ProviderProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    async function loadProvider() {
      setLoading(true)
      const data = await api.getProviderById(id)
      setProvider(data)
      setLoading(false)
    }
    loadProvider()
  }, [id])

  if (loading) {
    return <LoadingSpinner message="Loading provider profile details..." />
  }

  if (!provider) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-black text-stone-900">Provider Not Found</h2>
        <p className="text-xs text-stone-500">The service provider profile you requested could not be found.</p>
        <Link to="/" className="inline-block text-stone-900 font-bold text-xs underline">
          ← Return to All Services
        </Link>
      </div>
    )
  }

  const {
    name,
    service,
    service_category,
    category,
    location,
    experience,
    experience_years,
    price,
    hourly_price,
    rating,
    reviews_count,
    reviews,
    description,
    bio,
    availability,
    initials,
    color,
    accent,
  } = provider

  const displayService = service || service_category || category || 'Service Pro'
  const displayExp = experience || experience_years || '5+ yrs'
  const displayPrice = price || hourly_price || 50
  const displayReviews = reviews_count !== undefined ? reviews_count : reviews || 42
  const displayDesc = description || bio || `${name} is an experienced ${displayService} committed to delivering high quality work.`
  const avatarInitials = initials || name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to All Service Providers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center font-black text-2xl shadow-xs shrink-0"
                    style={{ backgroundColor: color || '#FEF6DA', color: accent || '#18181B' }}
                  >
                    {avatarInitials}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <ShieldCheck size={13} className="text-emerald-600" /> Verified Pro
                      </span>
                    </div>
                    <h1 className="text-3xl font-black text-stone-900 tracking-tight">{name}</h1>
                    <p className="text-xs font-bold text-stone-500">{displayService}</p>
                  </div>
                </div>

                {/* Scannable QR Pass Trigger */}
                <button
                  type="button"
                  onClick={() => setShowQR(true)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-full border border-stone-300 flex items-center gap-2 transition-colors shrink-0"
                >
                  <QrCode size={14} />
                  <span>Verify Security QR</span>
                </button>
              </div>

              {/* Key Stats Bar */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-stone-50 rounded-2xl text-center border border-stone-100">
                <div>
                  <div className="flex items-center justify-center gap-1 font-black text-lg text-stone-900">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span>{rating}</span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">{displayReviews} reviews</span>
                </div>
                <div className="border-x border-stone-200">
                  <div className="font-black text-lg text-stone-900">{displayExp}</div>
                  <span className="text-[11px] text-stone-500 font-medium">experience</span>
                </div>
                <div>
                  <div className="font-black text-lg text-stone-900">${displayPrice}</div>
                  <span className="text-[11px] text-stone-500 font-medium">per hour</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                  Service Description & Specialization
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {displayDesc}
                </p>
              </div>

              {/* Protection Guarantee */}
              <div className="p-4 bg-pastel-mint border border-emerald-300/60 rounded-2xl flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <strong className="text-emerald-900 block font-black">Doorstep Security & Protection Guarantee</strong>
                  <span className="text-emerald-800">
                    All jobs include a unique cryptographic QR Pass, fixed pricing, and verified status check-in.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-md space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">Hourly Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-stone-900">${displayPrice}</span>
                    <span className="text-xs text-stone-500 font-medium">/ hour</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider">Availability</span>
                  <span className="block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mt-0.5">
                    {availability || 'Available Today'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <strong className="text-stone-900">{location}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Service Category</span>
                  <strong className="text-stone-900">{displayService}</strong>
                </div>
              </div>

              <Link
                to={`/booking/${id}`}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-full shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] text-center text-xs"
              >
                <span>Book Appointment</span>
                <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                onClick={() => setShowQR(true)}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-full border border-stone-300 transition-colors flex items-center justify-center gap-2 text-xs"
              >
                <QrCode size={14} />
                <span>Show Verified ID QR</span>
              </button>

              <p className="text-[11px] text-stone-400 text-center">
                Generates unique booking ID with encrypted QR check-in.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showQR && (
        <SecurityQRModal
          isOpen={showQR}
          onClose={() => setShowQR(false)}
          type="provider"
          data={provider}
        />
      )}
    </>
  )
}
