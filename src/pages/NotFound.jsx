import React from 'react'
import { Link } from 'react-router-dom'
import { Wrench, ArrowLeft, Home } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 text-center py-16">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-300 flex items-center justify-center mx-auto shadow-inner">
          <Wrench size={32} />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-gray-900 dark:text-white">404</h1>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Page Not Found</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            The page or booking URL you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-600/30 transition-all hover:scale-105"
        >
          <Home size={16} /> Return to Home
        </Link>
      </div>
    </div>
  )
}
