import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Wrench, User, LogOut, ShieldCheck, Sparkles, LayoutDashboard, Calendar } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, role, logout, switchRole } = useAuth()

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF8F5]/90 border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-stone-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Wrench size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-stone-900 flex items-center gap-1.5">
              Quick<span className="text-stone-600">Serve</span>
              <span className="bg-pastel-yellow text-stone-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-stone-300">
                Verified
              </span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/90 p-1.5 rounded-full text-xs font-bold">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full transition-all ${
              isActive('/')
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Services
          </Link>
          <Link
            to="/customer/dashboard"
            className={`px-4 py-2 rounded-full transition-all ${
              isActive('/customer/dashboard')
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Customer Bookings
          </Link>
          <Link
            to="/provider/dashboard"
            className={`px-4 py-2 rounded-full transition-all ${
              isActive('/provider/dashboard')
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Provider Portal
          </Link>
        </nav>

        {/* User Actions & Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Quick Role Switcher Pill */}
              <button
                onClick={() => switchRole(role === 'customer' ? 'provider' : 'customer')}
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-100 transition-colors shadow-2xs"
                title="Quick switch role for hackathon testing"
              >
                <Sparkles size={13} className="text-amber-500" />
                <span>Role: <strong className="uppercase">{role}</strong></span>
              </button>

              <div className="flex items-center gap-2.5 pl-2 border-l border-stone-200">
                <Link
                  to="/profile"
                  className="w-9 h-9 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center shadow-xs hover:ring-2 hover:ring-stone-400 transition-all overflow-hidden"
                  title="View Profile Account"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name ? user.name.slice(0, 2).toUpperCase() : 'QS'
                  )}
                </Link>
                <Link to="/profile" className="hidden sm:flex flex-col hover:opacity-80 text-left">
                  <span className="text-xs font-bold text-stone-900 leading-tight">{user.name}</span>
                  <span className="text-[10px] text-stone-500 capitalize">{user.role}</span>
                </Link>
                <button
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  className="p-2 text-stone-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors ml-1"
                  title="Log out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-stone-700 hover:text-stone-900 px-3 py-2"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-full shadow-sm transition-all hover:scale-105"
              >
                Book Service
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
