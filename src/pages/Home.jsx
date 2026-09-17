import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ShieldCheck,
  Check,
  CalendarDays,
  Wrench,
  RefreshCw,
  Star,
  QrCode,
  ArrowRight,
  Clock,
  ThumbsUp,
  Lock,
  Smartphone,
} from 'lucide-react'
import { api, INITIAL_CATEGORIES, CATEGORY_METADATA } from '../services/api'
import { ProviderCard } from '../components/ProviderCard'
import { SearchBar } from '../components/SearchBar'
import { ServiceCard } from '../components/ServiceCard'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { SecurityQRModal } from '../components/SecurityQRModal'

export function Home() {
  const [providers, setProviders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All services')
  const [loading, setLoading] = useState(true)
  const [securityModalOpen, setSecurityModalOpen] = useState(false)

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
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION (Inspired by reference design) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F5] to-[#FAF8F5] pt-12 pb-16 sm:pb-24 border-b border-stone-200/60">
        {/* Soft atmospheric ambient pastel glows */}
        <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-2xs text-stone-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Verified Doorstep Professionals</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.1]">
                Reliable Home Services,{' '}
                <span className="relative inline-block">
                  Right at your doorstep
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-amber-300 -z-10"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 font-medium max-w-xl leading-relaxed">
                From cleaning and repairs to electrical, plumbing, and tech diagnostics — book vetted local professionals with just a click.
              </p>

              {/* Pill Search Bar */}
              <div className="pt-1">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  categories={INITIAL_CATEGORIES}
                />
              </div>

              {/* Customer Rating Proof & Avatars */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                  />
                  <div className="inline-flex h-10 w-10 rounded-full ring-2 ring-white bg-stone-900 text-white text-xs font-bold items-center justify-center">
                    +15k
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                    <span className="font-extrabold text-xs text-stone-900 ml-1">4.9 / 5</span>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">Rated by 15,000+ happy homeowners</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card with Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Worker Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-stone-100 to-stone-50">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                    alt="Service Professionals"
                    className="w-full h-[430px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-between border border-stone-200/80 shadow-md">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <span className="text-xs font-black text-stone-900 block leading-tight">Doorstep Security Pass</span>
                        <span className="text-[10px] text-stone-500">QR Code Verified Identity</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSecurityModalOpen(true)}
                      className="px-3 py-1.5 bg-stone-900 text-white text-[11px] font-bold rounded-full hover:bg-stone-800 transition-colors flex items-center gap-1"
                    >
                      <QrCode size={12} />
                      <span>Scan Code</span>
                    </button>
                  </div>
                </div>

                {/* Floating Customer Badge Top-Left */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3 shadow-xl border border-stone-100 flex items-center gap-3 animate-fade-in hidden sm:flex">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Emily Johnson"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-stone-900">Emily Johnson</h4>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 font-semibold">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span>5.0 • AC Servicing</span>
                    </div>
                  </div>
                </div>

                {/* Floating Customer Badge Bottom-Right */}
                <div className="absolute top-24 -right-4 sm:-right-6 bg-white rounded-2xl p-3 shadow-xl border border-stone-100 flex items-center gap-3 animate-fade-in hidden sm:flex">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                    alt="Sophia Lee"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-stone-900">Sophia Lee</h4>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 font-semibold">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span>4.9 • Deep Cleaning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY THOUSANDS BENTO GRID (Exact section from reference image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
            Why Homeowners Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mt-1">
            Trusted By Thousands Of Homeowners.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-normal leading-relaxed">
            For years, we've been helping families take care of their homes by providing reliable, professional services that make life easier and more convenient. Our mission is to simplify home maintenance.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Pastel Yellow */}
          <div className="p-7 rounded-3xl bg-pastel-yellow border border-amber-200/70 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow min-h-[190px]">
            <div>
              <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">15k+</span>
              <h3 className="text-sm font-extrabold text-stone-800 mt-1">Homes Served</h3>
            </div>
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              Across multiple cities, neighborhoods, and residential communities.
            </p>
          </div>

          {/* Card 2: Pastel Coral */}
          <div className="p-7 rounded-3xl bg-pastel-coral border border-rose-200/70 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow min-h-[190px]">
            <div>
              <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">95%</span>
              <h3 className="text-sm font-extrabold text-stone-800 mt-1">On-Time Arrival</h3>
            </div>
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              We value your busy schedule and guarantee punctual service delivery.
            </p>
          </div>

          {/* Card 3: Photo Card 1 */}
          <div className="rounded-3xl overflow-hidden border border-stone-200/80 shadow-2xs min-h-[190px] relative group">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
              alt="Service in Kitchen"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
              <span className="text-xs font-bold text-white leading-tight">
                Kitchen, Bath & Plumbing Care
              </span>
            </div>
          </div>

          {/* Card 4: Pastel Blue */}
          <div className="p-7 rounded-3xl bg-pastel-blue border border-sky-200/70 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow min-h-[190px]">
            <div>
              <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">4.9/5</span>
              <h3 className="text-sm font-extrabold text-stone-800 mt-1">Customer Rating</h3>
            </div>
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              Based on thousands of verified reviews from completed appointments.
            </p>
          </div>

          {/* Card 5: Photo Card 2 */}
          <div className="rounded-3xl overflow-hidden border border-stone-200/80 shadow-2xs min-h-[190px] relative group">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
              alt="Professional Technician"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
              <span className="text-xs font-bold text-white leading-tight">
                Vetted & Background Checked
              </span>
            </div>
          </div>

          {/* Card 6: Pastel Mint */}
          <div className="p-7 rounded-3xl bg-pastel-mint border border-emerald-200/70 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow min-h-[190px]">
            <div>
              <span className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">500+</span>
              <h3 className="text-sm font-extrabold text-stone-800 mt-1">Certified Professionals</h3>
            </div>
            <p className="text-xs text-stone-600 font-medium leading-relaxed">
              Trained, insured, and vetted experts ready to assist 7 days a week.
            </p>
          </div>

          {/* Card 7: Security QR Feature Block */}
          <div className="sm:col-span-2 p-7 rounded-3xl bg-stone-900 text-white flex flex-col justify-between shadow-md min-h-[190px]">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold">
                  <ShieldCheck size={14} /> Doorstep Security Feature
                </span>
                <h3 className="text-xl font-black mt-2">QR Code Doorstep Verification</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <QrCode size={24} className="text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-stone-300 max-w-sm">
                Every booking generates an encrypted QR pass & PIN to eliminate fraud and verify pro identity on arrival.
              </p>
              <button
                onClick={() => setSecurityModalOpen(true)}
                className="px-4 py-2 rounded-full bg-white text-stone-900 hover:bg-stone-100 text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                View Security Pass
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION WITH RICH IMAGES (Matching the reference design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
              Our Professional Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mt-1">
              Popular Home Services
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Select a service category with transparent pricing and top-rated providers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCategory('All services')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === 'All services'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900'
              }`}
            >
              Show All ({INITIAL_CATEGORIES.length - 1})
            </button>
          </div>
        </div>

        {/* Services Grid with Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* 4. THE REASONS PEOPLE COUNT ON US (Reference design split photo + mint card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Photo Side */}
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-stone-200 shadow-md min-h-[360px] relative">
            <img
              src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
              alt="Home Cleaning & Maintenance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
              <span className="text-white font-bold text-sm">
                100% Satisfaction & Safety Guarantee
              </span>
            </div>
          </div>

          {/* Mint Checklist Card */}
          <div className="lg:col-span-7 bg-pastel-mint rounded-3xl p-8 sm:p-12 border border-emerald-200/80 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                  Trust & Safety
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mt-1">
                  The Reasons People Count On Us
                </h2>
                <p className="text-xs sm:text-sm text-stone-700 mt-2 leading-relaxed">
                  We understand that inviting a service professional into your private home requires absolute trust. That's why we enforce strict vetting and safety checks on every job.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: 'Verified & Vetted Pros', desc: 'Background checked with certified licenses' },
                  { title: 'Transparent Upfront Pricing', desc: 'No surprise fees or hidden costs' },
                  { title: 'On-Time Service Guarantee', desc: 'Arrives promptly as scheduled' },
                  { title: 'Doorstep QR Pass Security', desc: 'Instant cryptographic ID scan upon arrival' },
                  { title: 'Gated 1-5 Star Reviews', desc: 'Only customers with completed jobs can review' },
                  { title: '24/7 Dedicated Support', desc: 'Fast resolution and hackathon assistance' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white/80 rounded-2xl p-3.5 border border-emerald-300/40">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-stone-900 leading-tight">{item.title}</h4>
                      <p className="text-[11px] text-stone-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 flex items-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-full shadow-sm transition-all flex items-center gap-2"
              >
                <span>Get Started Now</span>
                <ArrowRight size={14} />
              </Link>
              <button
                onClick={() => setSecurityModalOpen(true)}
                className="px-5 py-3 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs rounded-full border border-stone-300 shadow-2xs transition-all flex items-center gap-2"
              >
                <QrCode size={14} />
                <span>Verify QR Pass</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED SERVICE PROVIDERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
              Verified Professionals Available Now
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {selectedCategory === 'All services' ? 'All Service Providers' : `${selectedCategory} Experts`}
            </h2>
          </div>
          <span className="text-xs font-bold px-3.5 py-1.5 bg-stone-200/80 text-stone-800 rounded-full">
            {filteredProviders.length} professionals found
          </span>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading verified service providers..." />
        ) : filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <Wrench className="mx-auto text-stone-400" size={40} />
            <h3 className="text-lg font-bold text-stone-900">No service providers match your search</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search terms or selecting a different service category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All services')
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white font-bold text-xs rounded-full shadow-sm"
            >
              <RefreshCw size={14} /> Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 6. TESTIMONIALS (Loved By Thousands Of Happy Homeowners) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-stone-500">
            Real Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mt-1">
            Loved By Thousands Of Happy Homeowners
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Every review is verified and tied directly to completed booking IDs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Daniel K.',
              service: 'Plumbing Repair',
              text: 'Quick, reliable, and professional! The technician arrived within 20 minutes, scanned the QR code at my door, identified the leak, and fixed it right away.',
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
            },
            {
              name: 'Sarah M.',
              service: 'Deep Cleaning',
              text: 'The cleaning team exceeded my expectations. They arrived on time, were polite and attentive to detail, and left my entire house spotless. Will book again!',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
            },
            {
              name: 'Maya R.',
              service: 'Electrical Fixtures',
              text: 'Super easy booking and fair prices with no hidden charges. The pro explained everything clearly and finished early. Highly recommend QuickServe!',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-stone-100">
                <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-black text-stone-900">{item.name}</h4>
                  <span className="text-[10px] text-stone-400">{item.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER (Matching bottom card in reference design) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-stone-300 rounded-3xl p-8 sm:p-14 text-center space-y-5 shadow-sm">
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Need Help Today? We're Just A Click Away.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Schedule your verified service in seconds and enjoy total peace of mind with doorstep QR verification.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/register"
              className="px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-full shadow-md transition-all hover:scale-105"
            >
              Book Service Now
            </Link>
            <button
              onClick={() => setSecurityModalOpen(true)}
              className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs rounded-full border border-stone-300 transition-all shadow-xs flex items-center gap-2"
            >
              <QrCode size={14} />
              <span>Doorstep QR Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Global Security QR Pass Modal Preview */}
      {securityModalOpen && (
        <SecurityQRModal
          isOpen={securityModalOpen}
          onClose={() => setSecurityModalOpen(false)}
          type="booking"
          data={{
            booking_id: 'QS-2026-001',
            service: 'Electrician & Safety Check',
            provider_name: 'Ahmed Electrician (Verified Pro)',
            customer_name: 'Jane Doe',
          }}
        />
      )}
    </div>
  )
}
