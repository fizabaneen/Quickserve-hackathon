import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, MapPin, Briefcase, ArrowRight } from 'lucide-react'
import { StarRating } from './StarRating'

export function ProviderCard({ provider }) {
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
    <article className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner"
            style={{ backgroundColor: color || '#e0f2fe', color: accent || '#0284c7' }}
          >
            {avatarInitials}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-200/60 dark:border-teal-800/60">
            <ShieldCheck size={13} /> Verified Pro
          </span>
        </div>

        {/* Name & Category */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-teal-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-3">{displayCategory}</p>

        {/* Details Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-5">
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-gray-400" /> {location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Briefcase size={13} className="text-gray-400" /> {displayExp} exp
          </span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">${displayPrice}</span>
            <span className="text-xs text-gray-400 font-medium">/ hr</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <StarRating rating={rating} size={13} />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{rating}</span>
            <span className="text-[11px] text-gray-400">({displayReviews})</span>
          </div>
        </div>

        <Link
          to={`/provider/${id}`}
          className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-teal-600 text-gray-700 dark:text-gray-200 group-hover:text-white flex items-center justify-center transition-all shadow-xs group-hover:scale-105"
          aria-label={`View profile and book ${name}`}
        >
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  )
}
