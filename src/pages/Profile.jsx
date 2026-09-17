import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, ShieldCheck, MapPin, Briefcase, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Profile() {
  const { user, switchRole, logout } = useAuth()
  const [savedMsg, setSavedMsg] = useState('')

  if (!user) return null

  const handleSave = (e) => {
    e.preventDefault()
    setSavedMsg('Profile settings saved successfully.')
    setTimeout(() => setSavedMsg(''), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-stone-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-stone-900 text-white font-black text-xl flex items-center justify-center shadow-md overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name ? user.name.slice(0, 2).toUpperCase() : 'US'
              )}
            </div>
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-800 bg-pastel-yellow px-3 py-0.5 rounded-full border border-amber-300 uppercase">
                <ShieldCheck size={12} className="text-stone-700" /> {user.role} Account
                {user.isGoogleAuth && <span className="ml-1 text-blue-600 font-bold">• Google Verified</span>}
              </div>
              <h1 className="text-2xl font-black text-stone-900 mt-1">{user.name}</h1>
              <p className="text-xs text-stone-500">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => switchRole(user.role === 'customer' ? 'provider' : 'customer')}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-full border border-stone-300 transition-all"
            >
              Switch to {user.role === 'customer' ? 'Provider' : 'Customer'} Mode
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                <input
                  type="email"
                  defaultValue={user.email}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-stone-100 border border-stone-200 rounded-2xl text-xs text-stone-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Location Area
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                <input
                  type="text"
                  defaultValue="Downtown, Central District"
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-stone-900 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Account Type
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                <input
                  type="text"
                  value={user.role === 'customer' ? 'Customer Account (Verified)' : 'Service Provider Account (Verified)'}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-stone-100 border border-stone-200 rounded-2xl text-xs text-stone-500 capitalize cursor-not-allowed font-medium"
                />
              </div>
            </div>
          </div>

          {savedMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{savedMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-stone-100">
            <button
              type="submit"
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-full shadow-md transition-all"
            >
              Save Profile Changes
            </button>

            <Link
              to={user.role === 'provider' ? '/provider/dashboard' : '/customer/dashboard'}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:underline"
            >
              <span>Go to {user.role === 'provider' ? 'Provider Workspace' : 'My Bookings'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
