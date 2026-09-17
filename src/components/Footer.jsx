import React from 'react'
import { Wrench, ShieldCheck, Heart, QrCode } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-white">
            <Wrench size={16} />
          </div>
          <span className="font-black text-lg tracking-tight text-stone-900">
            Quick<span className="text-stone-600">Serve</span>
          </span>
          <span className="text-xs text-stone-500 pl-3 border-l border-stone-200">
            Verified Home Services & Doorstep Security
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500">
          <span className="flex items-center gap-1 font-semibold text-stone-800">
            <ShieldCheck size={14} className="text-emerald-600" /> 100% Vetted Pros
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-semibold text-stone-800">
            <QrCode size={13} className="text-stone-600" /> Doorstep QR Security
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Built with <Heart size={12} className="text-rose-500 fill-rose-500" /> for Hackathon
          </span>
        </div>
      </div>
    </footer>
  )
}
