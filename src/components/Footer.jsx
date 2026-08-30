import React from 'react'
import { Wrench, ShieldCheck, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white">
            <Wrench size={16} />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-gray-900 dark:text-white">
            Quick<span className="text-teal-600 dark:text-teal-400">Serve</span>
          </span>
          <span className="text-xs text-gray-500 pl-3 border-l border-gray-200 dark:border-gray-800">
            Instant Service Booking MVP
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-teal-600" /> Vetted Professionals
          </span>
          <span>•</span>
          <span>Supabase / Firebase Backend</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Built with <Heart size={12} className="text-rose-500 fill-rose-500" /> for Hackathon
          </span>
        </div>
      </div>
    </footer>
  )
}
