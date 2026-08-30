import React, { useEffect, useState } from 'react'
import { Sparkles, ShieldCheck, Check, CalendarDays, Wrench, RefreshCw } from 'lucide-react'
import { api, INITIAL_CATEGORIES } from '../services/api'
import { ProviderCard } from '../components/ProviderCard'
import { SearchBar } from '../components/SearchBar'
import { ServiceCard } from '../components/ServiceCard'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function Home() {
  const [providers, setProviders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All services')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const data = await api.getProviders()
      setProviders(data)
      setLoading(false)
    }
    loadData()
  }, [])

  const filteredProviders = providers.filter((p) => {
    const cat = p.service || p.service_category || p.category || ''
    const matchesCategory = selectedCategory === 'All services' || cat === selectedCategory
    const searchTarget = `${p.name} ${cat} ${p.location} ${p.description || ''}`.toLowerCase()
    const matchesSearch = searchTarget.includes(searchQuery.toLowerCase().trim())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-emerald-900 to-gray-900 text-white p-8 sm:p-12 md:p-16 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles size={14} /> QuickServe Local Hackathon Edition
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Find & Book Local Experts <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">In Seconds.</span>
          </h1>

          <p className="text-base sm:text-lg text-teal-100/80 font-normal max-w-2xl">
            Book verified electricians, plumbers, cleaners, painters, AC technicians, and computer repair experts directly near you.
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={INITIAL_CATEGORIES}
            />
          </div>

          {/* Trust Row */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-teal-200/90">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-400" /> Identity Vetted
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={16} className="text-emerald-400" /> Fixed Prices
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} className="text-emerald-400" /> Instant Confirmation
            </span>
          </div>
        </div>
      </section>

      {/* Service Category Buttons */}
      <section className="space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Browse Service Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {INITIAL_CATEGORIES.slice(1).map((cat) => (
            <ServiceCard
              key={cat}
              category={cat}
              active={selectedCategory === cat}
              onClick={(c) => setSelectedCategory(selectedCategory === c ? 'All services' : c)}
            />
          ))}
        </div>
      </section>

      {/* Provider Cards Grid Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Verified Professionals
            </span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {selectedCategory === 'All services' ? 'All Service Providers' : `${selectedCategory} Professionals`}
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
            {filteredProviders.length} providers available
          </span>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading local service providers..." />
        ) : filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8 space-y-4">
            <Wrench className="mx-auto text-gray-400" size={40} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No service providers match your search</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search terms or selecting a different service category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All services')
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold text-xs rounded-xl shadow-md"
            >
              <RefreshCw size={14} /> Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
