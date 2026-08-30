import React from 'react'
import { Wrench, Zap, Droplets, Sparkles, Wind, Palette, Monitor } from 'lucide-react'

const iconMap = {
  Electrician: Zap,
  Plumber: Droplets,
  Cleaner: Sparkles,
  'AC Technician': Wind,
  Painter: Palette,
  'Computer Repair': Monitor,
}

export function ServiceCard({ category, active, onClick }) {
  const Icon = iconMap[category] || Wrench

  return (
    <button
      onClick={() => onClick(category)}
      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 ${
        active
          ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/30 scale-105'
          : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-teal-500'
      }`}
    >
      <div className={`p-2.5 rounded-xl ${active ? 'bg-white/20 text-white' : 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400'}`}>
        <Icon size={20} />
      </div>
      <span className="font-bold text-sm tracking-tight">{category}</span>
    </button>
  )
}
