'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Building2, ChevronDown, Settings, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

import ParticleBackground from '@/components/shared/ParticleBackground'

const HeroSearch = () => {
  const router = useRouter()
  // ... (keeping state logic same)
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
      } catch (err) {
        console.error('Failed to fetch suggestions:', err)
      } finally {
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
    <section className="relative min-h-[85vh] lg:min-h-screen flex flex-col items-center justify-center bg-[#0B1120] overflow-hidden">
      {/* Background with Particles */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
        <span className="inline-block px-3 py-1 mb-4 text-[11px] font-semibold tracking-[0.2em] uppercase bg-[#1E6BFF]/20 text-white border border-[#1E6BFF]/30 rounded-full">
          Pakistan's Premier Property Portal
        </span>

        <h1 className="flex flex-col mb-4">
          <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            Search properties for
          </span>
          <span className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1E6BFF] leading-tight italic">
            {activeTab === 'BUY' ? 'sale' : activeTab === 'RENT' ? 'rent' : 'investment'} in Pakistan
          </span>
        </h1>

        <p className="text-sm sm:text-base text-white/70 mt-3 mb-8 max-w-lg mx-auto">
          Explore thousands of verified listings across Lahore, Karachi, Islamabad & more
        </p>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto w-full text-left">
          {/* Tabs */}
          <div className="flex mb-0">
            {['BUY', 'RENT', 'PROJECTS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-6 py-3 text-xs font-bold tracking-wider transition-all duration-200",
                  "first:rounded-tl-xl last:rounded-tr-xl",
                  activeTab === tab 
                    ? "bg-white text-[#1E6BFF]" 
                    : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Box */}
          <div className="bg-white rounded-b-2xl rounded-tr-2xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <form onSubmit={handleSearchSubmit}>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Location Input */}
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    {loadingSuggestions ? (
                      <Loader2 className="w-4 h-4 text-[#1E6BFF] animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4 text-[#9CA3AF]" />
                    )}
                  </div>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter city, area or society..."
                    className="w-full h-12 pl-11 pr-4 text-sm text-[#1A1A2E] bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF] transition-all"
                  />
                  {/* Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-[#E5E7EB] shadow-dropdown z-50 overflow-hidden">
                      {suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSearchQuery(s.label)
                            setSuggestions([])
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#4A5568] hover:bg-[#F8F9FA] transition-colors border-b last:border-0 border-[#F3F4F6]"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#1E6BFF]" />
                          <div>
                            <span className="font-semibold">{s.label}</span>
                            <span className="text-[10px] font-bold text-[#9CA3AF] uppercase ml-2">{s.type}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Property Type */}
                <div className="relative sm:w-44">
                  <select className="w-full h-12 px-4 appearance-none text-sm text-[#1A1A2E] bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF] cursor-pointer">
                    <option>All Types</option>
                    <option>House</option>
                    <option>Flat</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                </div>

                {/* Submit Button */}
                <button type="submit" className="sm:w-auto px-6 py-0 h-12 text-sm font-bold bg-[#1E6BFF] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#1554CC] transition-all shadow-button">
                  <Search className="w-4 h-4" />
                  FIND PROPERTIES
                </button>
              </div>

              {/* Row 2 - Filters */}
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <div className="relative flex-1">
                  <select className="w-full h-11 px-4 appearance-none text-sm text-[#4A5568] bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF] cursor-pointer">
                    <option>Any Price</option>
                    <option>Up to 50 Lac</option>
                    <option>50 Lac – 1 Cr</option>
                    <option>1 Cr – 2 Cr</option>
                    <option>2 Cr – 5 Cr</option>
                    <option>5 Cr+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
                </div>
                <div className="relative flex-1">
                  <select className="w-full h-11 px-4 appearance-none text-sm text-[#4A5568] bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF] cursor-pointer">
                    <option>Any Area</option>
                    <option>Up to 5 Marla</option>
                    <option>5 – 10 Marla</option>
                    <option>10 – 20 Marla</option>
                    <option>1 Kanal+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF] pointer-events-none" />
                </div>
              </div>

              {/* Advanced Toggle */}
              <button 
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1.5 mt-3 text-[11px] font-bold text-[#9CA3AF] hover:text-[#1E6BFF] uppercase tracking-wider transition-colors"
              >
                <Settings className={cn("w-3.5 h-3.5 transition-transform", showAdvanced && "rotate-90")} />
                Advanced Filters
              </button>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="mt-4 pt-4 border-t border-[#F3F4F6] animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-[#4A5568] uppercase tracking-widest">Bedrooms:</span>
                    <div className="flex gap-2">
                      {['Any', '1', '2', '3', '4', '5+'].map((bed) => (
                        <button
                          key={bed}
                          type="button"
                          className={cn(
                            "w-10 h-10 flex items-center justify-center text-xs font-semibold border rounded-lg transition-all",
                            bed === 'Any' ? "bg-[#1E6BFF] text-white border-[#1E6BFF]" : "bg-[#F8F9FA] text-[#4A5568] border-[#E5E7EB] hover:border-[#1E6BFF] hover:text-[#1E6BFF]"
                          )}
                        >
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

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 pt-8 border-t border-white/20 max-w-3xl mx-auto">
          <StatItem value="50k+" label="LISTINGS" />
          <StatItem value="2k+" label="AGENTS" />
          <StatItem value="25+" label="CITIES" />
          <StatItem value="1M+" label="USERS" />
        </div>

        {/* Top Cities */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="text-xs text-white/50">Top Cities:</span>
          {['Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map(city => (
            <Link 
              key={city} 
              href={`/search?city=${city}`}
              className="text-xs text-white/80 hover:text-white underline-offset-4 hover:underline transition-all"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div>
    <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
    <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-1 font-semibold">{label}</div>
  </div>
)

export default HeroSearch

