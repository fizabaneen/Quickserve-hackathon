import React from 'react'
import { Search, ArrowRight, X } from 'lucide-react'

export function SearchBar({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories }) {
  return (
    <div className="bg-white p-2 sm:p-2.5 rounded-full shadow-lg border border-stone-200/90 flex items-center gap-2 max-w-xl transition-all hover:border-stone-300">
      <div className="flex-1 flex items-center gap-2.5 pl-3 sm:pl-4">
        <Search size={18} className="text-stone-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search electricians, plumbers, cleaners, or location..."
          className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none placeholder-stone-400 text-stone-900"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 mr-1"
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <button
        type="button"
        className="px-5 sm:px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-bold text-xs shrink-0 transition-all shadow-xs flex items-center gap-1.5"
      >
        <span>Search</span>
        <ArrowRight size={13} className="hidden sm:inline" />
      </button>
    </div>
  )
}
