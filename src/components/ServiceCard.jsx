import React from 'react'
import { Wrench, Zap, Droplets, Sparkles, Wind, Palette, Monitor, ArrowRight } from 'lucide-react'
import { CATEGORY_METADATA } from '../services/api'

const iconMap = {
  Electrician: Zap,
  Plumber: Droplets,
  Cleaner: Sparkles,
  'AC Technician': Wind,
  Painter: Palette,
  'Computer Repair': Monitor,
}

export function ServiceCard({ category, active, onClick, compact = false }) {
  const Icon = iconMap[category] || Wrench
  const meta = CATEGORY_METADATA[category] || {
    title: category,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    description: 'Trusted, certified professionals ready to help with top-notch service.',
    startingPrice: 50,
    tag: 'Verified Pro',
  }

  if (compact) {
    return (
      <button
        onClick={() => onClick(category)}
        className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
          active
            ? 'bg-stone-900 text-white shadow-md'
            : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
        }`}
      >
        <Icon size={14} />
        <span>{category}</span>
      </button>
    )
  }

  return (
    <div
      onClick={() => onClick(category)}
      className={`group cursor-pointer rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between border ${
        active
          ? 'bg-white border-stone-900 shadow-xl ring-2 ring-stone-900 scale-[1.02]'
          : 'bg-white border-stone-200/90 shadow-xs hover:shadow-lg hover:border-stone-400 hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Card Image Thumbnail */}
        <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-4 bg-stone-100">
          <img
            src={meta.image}
            alt={meta.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-stone-800 shadow-xs">
            <Icon size={12} className="text-stone-700" />
            <span>{category}</span>
          </div>
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-stone-900/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
            From ${meta.startingPrice}/hr
          </div>
        </div>

        {/* Title and Short Description */}
        <h3 className="font-extrabold text-base text-stone-900 mb-1.5 tracking-tight group-hover:text-stone-700 transition-colors">
          {meta.title}
        </h3>
        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-4">
          {meta.description}
        </p>
      </div>

      {/* Pill Action Button */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          {meta.tag}
        </span>
        <button
          type="button"
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            active
              ? 'bg-stone-900 text-white shadow-md'
              : 'bg-stone-100 text-stone-800 hover:bg-stone-900 hover:text-white'
          }`}
        >
          <span>{active ? 'Selected' : 'Get Started'}</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}
