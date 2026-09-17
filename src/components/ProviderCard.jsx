import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, MapPin, Briefcase, ArrowRight, QrCode } from 'lucide-react'
import { StarRating } from './StarRating'
import { SecurityQRModal } from './SecurityQRModal'

export function ProviderCard({ provider }) {
  const [showQR, setShowQR] = useState(false)

  const {
    id,
    name,
    service_category,
    category,
    location,
    experience_years,
    experience,
    hourly_price,
    price,
    rating,
    reviews_count,
    reviews,
    initials,
    color,
    accent,
  } = provider

  const displayCategory = service_category || category || 'Service Pro'
  const displayExp = experience_years || experience || '5+ yrs'
  const displayPrice = hourly_price || price || 50
  const displayReviews = reviews_count !== undefined ? reviews_count : reviews || 42
  const avatarInitials = initials || name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  return (
    <>
      <article className="group relative bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
        <div>
          {/* Top Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-xs"
              style={{ backgroundColor: color || '#FEF6DA', color: accent || '#18181B' }}
            >
              {avatarInitials}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Security QR Pass Trigger */}
              <button
                type="button"
                onClick={() => setShowQR(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-full border border-stone-300/80 transition-colors"
                title="Verify Pro Security QR Code"
              >
                <QrCode size={12} />
                <span>QR Pass</span>
              </button>

              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <ShieldCheck size={12} className="text-emerald-600" /> Verified
              </span>
            </div>
          </div>

          {/* Name & Category */}
          <h3 className="text-lg font-black text-stone-900 group-hover:text-stone-700 transition-colors">
            {name}
          </h3>
          <p className="text-xs font-bold text-stone-500 mb-3">{displayCategory}</p>

          {/* Details Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-5">
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-stone-400" /> {location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Briefcase size={13} className="text-stone-400" /> {displayExp} exp
            </span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-stone-900">${displayPrice}</span>
              <span className="text-xs text-stone-400 font-medium">/ hr</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <StarRating rating={rating} size={13} />
              <span className="text-xs font-bold text-stone-800">{rating}</span>
              <span className="text-[11px] text-stone-400">({displayReviews})</span>
            </div>
          </div>

          <Link
            to={`/provider/${id}`}
            className="px-4 py-2.5 rounded-full bg-stone-900 group-hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs group-hover:scale-105"
            aria-label={`View profile and book ${name}`}
          >
            <span>Book Now</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </article>

      {/* Security QR Pass Modal */}
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
