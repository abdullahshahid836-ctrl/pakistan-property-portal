'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ChevronDown, Settings, Loader2, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const HeroSearch = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'PROJECTS'>('BUY')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.length > 1) {
      setLoadingSuggestions(true)
      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(value)}`)
        const data = await res.json()
        setSuggestions(data.suggestions || [])
      } catch { /* silent */ } finally {
        setLoadingSuggestions(false)
      }
    } else {
      setSuggestions([])
    }
  }

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    params.set('purpose', activeTab === 'BUY' ? 'Sale' : activeTab === 'RENT' ? 'Rent' : 'Project')
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="relative min-h-screen bg-[#004737] overflow-hidden flex flex-col items-center justify-center">

      {/* Dot grid texture */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C8F55A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#006B55]/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating card LEFT */}
      <div className="absolute left-8 top-1/3 hidden xl:block animate-float-y" style={{ animationDelay: '0s' }}>
        <div className="bg-white rounded-2xl p-4 shadow-2xl w-64 border border-[#DDD8CF]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5F0E8] flex items-center justify-center">
              <Home className="w-5 h-5 text-[#004737]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#0D1B17] font-syne">DHA Phase 6</div>
              <div className="text-[10px] text-[#7A9088] font-inter">Lahore</div>
            </div>
          </div>
          <div className="text-lg font-black text-[#004737] font-syne">PKR 2.5 Crore</div>
          <div className="flex gap-3 mt-2">
            <span className="text-xs text-[#7A9088] font-inter">🛏 5 Beds</span>
            <span className="text-xs text-[#7A9088] font-inter">📐 1 Kanal</span>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[10px] text-green-600 font-semibold font-inter">VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Floating card RIGHT */}
      <div className="absolute right-8 top-1/2 hidden xl:block animate-float-x" style={{ animationDelay: '1s' }}>
        <div className="bg-[#0A5A46] rounded-2xl p-4 shadow-2xl w-56 border border-[#0D6B55]">
          <div className="text-[10px] text-[#A8C4BB] uppercase tracking-wider mb-2 font-inter">Just Listed</div>
          <div className="text-sm font-bold text-white font-syne mb-1">3 Bed Flat, Clifton</div>
          <div className="text-lg font-black text-[#C8F55A] font-syne">PKR 85 Lac</div>
          <div className="text-xs text-[#A8C4BB] mt-1 font-inter">Karachi</div>
        </div>
      </div>

      {/* Floating notification BOTTOM */}
      <div className="absolute bottom-36 left-1/4 hidden lg:block animate-float-y" style={{ animationDelay: '2s' }}>
        <div className="bg-white rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 border border-[#DDD8CF]">
          <div className="w-8 h-8 rounded-full bg-[#C8F55A] flex items-center justify-center text-sm">🏠</div>
          <div>
            <div className="text-xs font-bold text-[#0D1B17] font-syne">New listing in Islamabad</div>
            <div className="text-[10px] text-[#7A9088] font-inter">2 minutes ago</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center w-full">

        {/* Pill */}
        <div className="animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
          <span className="pill-label-light">🏠 Pakistan's Premier Property Portal</span>
        </div>

        {/* Heading */}
        <div className="animate-fade-up opacity-0 mt-6" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          <h1 className="font-syne font-bold text-[#F5F0E8] text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mx-auto">
            Find Your Perfect
            <span className="block text-[#C8F55A] italic">Home in Pakistan</span>
          </h1>
        </div>

        {/* Sub */}
        <div className="animate-fade-up opacity-0 mt-6" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
          <p className="text-[#A8C4BB] text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-inter">
            Explore 50,000+ verified listings across Karachi, Lahore, Islamabad and beyond.
          </p>
        </div>

        {/* Search form */}
        <div className="animate-fade-up opacity-0 mt-10" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
          <div className="max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-1 mb-0 justify-center sm:justify-start">
              {(['BUY', 'RENT', 'PROJECTS'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-5 py-2.5 text-xs font-bold font-syne tracking-wider rounded-t-xl transition-all',
                    activeTab === tab
                      ? 'bg-[#F5F0E8] text-[#004737]'
                      : 'bg-white/10 text-white/70 hover:bg-white/15'
                  )}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Box */}
            <form onSubmit={handleSearchSubmit} className="bg-[#F5F0E8] rounded-b-2xl rounded-tr-2xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Location */}
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {loadingSuggestions
                      ? <Loader2 className="w-4 h-4 text-[#004737] animate-spin" />
                      : <MapPin className="w-4 h-4 text-[#7A9088]" />}
                  </div>
                  <input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter city, area or society..."
                    className="w-full h-12 pl-10 pr-4 text-sm bg-white border border-[#DDD8CF] rounded-xl text-[#0D1B17] placeholder:text-[#7A9088] focus:outline-none focus:border-[#004737] focus:ring-2 focus:ring-[#004737]/10 font-inter transition-all"
                  />
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-[#DDD8CF] shadow-[0_16px_40px_rgba(0,71,55,0.12)] z-50 overflow-hidden">
                      {suggestions.map((s, idx) => (
                        <button key={idx} type="button"
                          onClick={() => { setSearchQuery(s.label); setSuggestions([]) }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#3D5249] hover:bg-[#F5F0E8] hover:text-[#004737] transition-colors border-b last:border-0 border-[#DDD8CF] font-inter">
                          <MapPin className="w-3.5 h-3.5 text-[#004737]" />
                          <div>
                            <span className="font-semibold">{s.label}</span>
                            <span className="text-[10px] font-bold text-[#7A9088] uppercase ml-2">{s.type}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Type */}
                <select className="sm:w-44 h-12 px-4 text-sm bg-white border border-[#DDD8CF] rounded-xl text-[#0D1B17] font-inter focus:outline-none focus:border-[#004737] appearance-none cursor-pointer">
                  <option>All Types</option>
                  <option>House</option>
                  <option>Flat</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                </select>

                {/* CTA */}
                <button type="submit" className="h-12 px-6 bg-[#004737] text-[#C8F55A] rounded-xl text-sm font-bold font-syne tracking-wide flex items-center justify-center gap-2 hover:bg-[#003329] transition-all hover:shadow-[0_4px_16px_rgba(0,71,55,0.4)] whitespace-nowrap">
                  <Search className="w-4 h-4" /> Find Property
                </button>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <select className="flex-1 h-11 px-4 text-sm bg-white border border-[#DDD8CF] rounded-xl text-[#0D1B17] font-inter appearance-none focus:outline-none focus:border-[#004737]">
                  <option>Any Price</option>
                  <option>Up to 50 Lac</option>
                  <option>50 Lac – 1 Cr</option>
                  <option>1 Cr – 2 Cr</option>
                  <option>2 Cr – 5 Cr</option>
                  <option>5 Cr+</option>
                </select>
                <select className="flex-1 h-11 px-4 text-sm bg-white border border-[#DDD8CF] rounded-xl text-[#0D1B17] font-inter appearance-none focus:outline-none focus:border-[#004737]">
                  <option>Any Area</option>
                  <option>Up to 5 Marla</option>
                  <option>5–10 Marla</option>
                  <option>10–20 Marla</option>
                  <option>1 Kanal+</option>
                </select>
              </div>

              {/* Advanced toggle */}
              <button type="button" onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1.5 mt-3 text-[11px] font-bold font-syne text-[#7A9088] hover:text-[#004737] uppercase tracking-wider transition-colors">
                <Settings className={cn('w-3.5 h-3.5 transition-transform', showAdvanced && 'rotate-90')} />
                Advanced Filters
              </button>

              {showAdvanced && (
                <div className="mt-4 pt-4 border-t border-[#DDD8CF]">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold font-syne text-[#3D5249] uppercase tracking-widest">Bedrooms:</span>
                    <div className="flex gap-2">
                      {['Any', '1', '2', '3', '4', '5+'].map((bed, i) => (
                        <button key={bed} type="button"
                          className={cn(
                            'w-10 h-10 flex items-center justify-center text-xs font-semibold border rounded-xl transition-all font-inter',
                            i === 0
                              ? 'bg-[#004737] text-[#C8F55A] border-[#004737]'
                              : 'bg-white text-[#3D5249] border-[#DDD8CF] hover:border-[#004737] hover:text-[#004737]'
                          )}>
                          {bed}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-up opacity-0 mt-12" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto pt-8 border-t border-white/10">
            {[
              { num: '50k+', label: 'LISTINGS' },
              { num: '2k+',  label: 'AGENTS' },
              { num: '25+',  label: 'CITIES' },
              { num: '1M+',  label: 'USERS' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white font-syne">{stat.num}</div>
                <div className="text-[10px] text-[#A8C4BB] uppercase tracking-[0.15em] font-inter mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top cities */}
        <div className="animate-fade-up opacity-0 mt-6" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-[#A8C4BB] font-inter">Top Cities:</span>
            {['Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map(city => (
              <Link key={city} href={`/search?city=${city}`}
                className="text-xs text-[#F5F0E8]/80 hover:text-[#C8F55A] font-inter underline-offset-4 hover:underline transition-all">
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 20C1200 80 960 0 720 40C480 80 240 0 0 20L0 80Z" fill="#F5F0E8" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSearch
