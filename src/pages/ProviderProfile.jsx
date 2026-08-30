import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, MapPin, Briefcase, Star, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { api } from '../services/api'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function ProviderProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)

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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Provider Not Found</h2>
        <p className="text-xs text-gray-500">The service provider profile you requested could not be found.</p>
        <Link to="/" className="inline-block text-teal-600 font-semibold text-xs">
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-teal-600 transition-colors"
      >
        <ArrowLeft size={16} /> Back to All Service Providers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center font-extrabold text-2xl shadow-inner shrink-0"
                style={{ backgroundColor: color || '#e0f2fe', color: accent || '#0284c7' }}
              >
                {avatarInitials}
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200/60 dark:border-teal-800">
                  <ShieldCheck size={14} /> QuickServe Verified Pro
                </span>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">{name}</h1>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400">{displayService}</p>
              </div>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl text-center">
              <div>
                <div className="flex items-center justify-center gap-1 font-extrabold text-lg text-gray-900 dark:text-white">
                  <Star size={18} className="text-amber-400 fill-amber-400" />
                  <span>{rating}</span>
                </div>
                <span className="text-[11px] text-gray-500 font-medium">{displayReviews} reviews</span>
              </div>
              <div className="border-x border-gray-200 dark:border-gray-700">
                <div className="font-extrabold text-lg text-gray-900 dark:text-white">{displayExp}</div>
                <span className="text-[11px] text-gray-500 font-medium">experience</span>
              </div>
              <div>
                <div className="font-extrabold text-lg text-teal-600 dark:text-teal-400">${displayPrice}</div>
                <span className="text-[11px] text-gray-500 font-medium">per hour</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Service Description & Specialization
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {displayDesc}
              </p>
            </div>

            {/* Protection Guarantee */}
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 rounded-2xl flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <strong className="text-emerald-900 dark:text-emerald-200 block">QuickServe Hackathon Protection</strong>
                <span className="text-emerald-700 dark:text-emerald-400">
                  Fixed pricing, validated booking IDs, and strict status workflow tracking.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Booking CTA */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-6 shadow-xl space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-xs text-gray-400 font-medium">Hourly Rate</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">${displayPrice}</span>
                  <span className="text-xs text-gray-500 font-medium">/ hour</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 font-medium">Availability</span>
                <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {availability || 'Available Today'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-between">
                <span>Location</span>
                <strong className="text-gray-900 dark:text-white">{location}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Service Category</span>
                <strong className="text-teal-600 dark:text-teal-400">{displayService}</strong>
              </div>
            </div>

            <Link
              to={`/booking/${id}`}
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] text-center text-sm"
            >
              <span>Book Now with {name.split(' ')[0]}</span>
              <ArrowRight size={18} />
            </Link>

            <p className="text-[11px] text-gray-400 text-center">
              Requires validation. Generates unique booking ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
