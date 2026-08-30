import React from 'react'
import { Search, ChevronDown, MapPin } from 'lucide-react'

export function SearchBar({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-3">
      {/* Search Input */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl sm:rounded-2xl w-full">
        <Search size={20} className="text-teal-600 dark:text-teal-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by pro name, service, or location..."
          className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative w-full sm:w-56 shrink-0">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full appearance-none px-4 py-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl sm:rounded-2xl text-sm font-semibold text-gray-900 dark:text-white focus:outline-none cursor-pointer pr-10 border border-transparent focus:border-teal-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="text-gray-900 dark:text-white">
              {cat}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}
