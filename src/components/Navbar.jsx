import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Wrench, User, LogOut, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, role, logout, switchRole } = useAuth()

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/80 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Wrench size={20} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
              Quick<span className="text-teal-600 dark:text-teal-400">Serve</span>
              <span className="bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-teal-300/50 dark:border-teal-800">MVP</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 dark:bg-gray-800/60 p-1 rounded-xl text-sm font-medium">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive('/')
                ? 'bg-white dark:bg-gray-900 text-teal-600 dark:text-teal-400 shadow-xs font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Find Service Pros
          </Link>
          <Link
            to="/customer/dashboard"
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive('/customer/dashboard')
                ? 'bg-white dark:bg-gray-900 text-teal-600 dark:text-teal-400 shadow-xs font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Customer Bookings
          </Link>
          <Link
            to="/provider/dashboard"
            className={`px-4 py-2 rounded-lg transition-all ${
              isActive('/provider/dashboard')
                ? 'bg-white dark:bg-gray-900 text-teal-600 dark:text-teal-400 shadow-xs font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Provider Dashboard
          </Link>
        </nav>

        {/* User Actions & Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Demo Role Switcher */}
              <button
                onClick={() => switchRole(role === 'customer' ? 'provider' : 'customer')}
                className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800/60 bg-teal-50/50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 transition-colors"
                title="Quick switch role for hackathon testing"
              >
                <Sparkles size={13} />
                <span>Role: <strong className="uppercase">{role}</strong></span>
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
                <Link
                  to="/profile"
                  className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 font-bold text-xs flex items-center justify-center border border-teal-300 dark:border-teal-700 hover:ring-2 hover:ring-teal-500 transition-all"
                  title="View Profile Account"
                >
                  {user.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
                </Link>
                <Link to="/profile" className="hidden sm:flex flex-col hover:opacity-80">
                  <span className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">{user.name}</span>
                  <span className="text-[10px] text-gray-500 capitalize">{user.role}</span>
                </Link>
                <button
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  className="p-1.5 text-gray-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors ml-1"
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
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-teal-600 px-3 py-2"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl shadow-sm shadow-teal-600/20 transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
