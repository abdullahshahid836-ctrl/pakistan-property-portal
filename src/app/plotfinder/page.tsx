'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Map, Search, MapPin, ChevronRight, Filter, Building2, Grid, Loader2, X, Home, Bed, Bath, Move, SlidersHorizontal, ArrowRight, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Property } from '@/types'

const CITIES = ['All Cities', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad']
const PLOT_SIZES = ['All Sizes', '3 Marla', '5 Marla', '7 Marla', '10 Marla', '1 Kanal', '2 Kanal']
const PURPOSES = ['All', 'Sale', 'Rent']

const SOCIETIES = [
  { name: 'DHA Phase 6', city: 'Lahore', plots: '1,240+', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', priceFrom: '2.2 Cr' },
  { name: 'Bahria Town Phase 8', city: 'Rawalpindi', plots: '2,100+', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', priceFrom: '1.4 Cr' },
  { name: 'Gulberg Residencia', city: 'Islamabad', plots: '850+', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', priceFrom: '3.8 Cr' },
  { name: 'DHA City', city: 'Karachi', plots: '3,400+', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', priceFrom: '95 Lac' },
]

const PLOT_TYPES = [
  { label: '3 Marla', icon: '🏠', size: '3 Marla' },
  { label: '5 Marla', icon: '🏡', size: '5 Marla' },
  { label: '10 Marla', icon: '🏘️', size: '10 Marla' },
  { label: '1 Kanal', icon: '🏗️', size: '1 Kanal' },
  { label: '2 Kanal', icon: '🏰', size: '2 Kanal' },
  { label: 'Commercial', icon: '🏢', size: 'Commercial' },
]

function formatPrice(price: number): string {
  if (price >= 10000000) return `${(price / 10000000).toFixed(1)} Cr`
  if (price >= 100000) return `${(price / 100000).toFixed(0)} Lac`
  return price.toLocaleString()
}

export default function PlotFinderPage() {
  const [plots, setPlots] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [city, setCity] = useState('All Cities')
  const [purpose, setPurpose] = useState('All')
  const [plotSize, setPlotSize] = useState('All Sizes')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const fetchPlots = useCallback(async (selectedCity?: string) => {
    setLoading(true)
    setSearched(true)
    try {
      const activeCity = selectedCity || city
      const params = new URLSearchParams()
      params.set('type', 'Plot')
      if (activeCity !== 'All Cities') params.set('city', activeCity)
      if (purpose !== 'All') params.set('purpose', purpose)
      if (minPrice) params.set('minPrice', minPrice)
      if (maxPrice) params.set('maxPrice', maxPrice)

      const res = await fetch(`/api/properties?${params.toString()}`)
      const data = await res.json()
      let results: Property[] = data.properties || []

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        results = results.filter(p =>
          p.title?.toLowerCase().includes(q) ||
          p.area?.toLowerCase().includes(q) ||
          p.city?.toLowerCase().includes(q)
        )
      }
      if (plotSize !== 'All Sizes') {
        results = results.filter(p =>
          p.area_unit?.toLowerCase().includes(plotSize.toLowerCase()) ||
          p.title?.toLowerCase().includes(plotSize.toLowerCase())
        )
      }

      setPlots(results)
    } catch { setPlots([]) }
    finally { setLoading(false) }
  }, [city, purpose, plotSize, minPrice, maxPrice, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchPlots()
  }

  const handleSocietyClick = (society: typeof SOCIETIES[0]) => {
    setCity(society.city)
    setSearchQuery(society.name)
    setTimeout(() => fetchPlots(), 100)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setCity('All Cities')
    setPurpose('All')
    setPlotSize('All Sizes')
    setMinPrice('')
    setMaxPrice('')
    setSearched(false)
    setPlots([])
  }

  const hasActiveFilters = city !== 'All Cities' || purpose !== 'All' || plotSize !== 'All Sizes' || minPrice || maxPrice

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      {/* Header */}
      <div className="bg-[#004737] pt-24 pb-16 relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">Plot Finder</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Find Your Perfect Plot</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Search residential and commercial plots across Pakistan's most prestigious societies and gated communities.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">

        {/* Premium Search Bar */}
        <form onSubmit={handleSearch} className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-4 sm:p-6 mb-12 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737]/40 group-focus-within:text-[#004737]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search society, city or area..."
                className="w-full h-14 pl-14 pr-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] text-sm font-inter transition-all"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="h-14 px-5 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-wider focus:border-[#004737] outline-none min-w-[140px] appearance-none"
              >
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>

              <select
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                className="h-14 px-5 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-wider focus:border-[#004737] outline-none min-w-[110px] appearance-none"
              >
                {PURPOSES.map(p => <option key={p} value={p}>{p === 'All' ? 'ANY PURPOSE' : `FOR ${p.toUpperCase()}`}</option>)}
              </select>

              <button
                type="button"
                onClick={() => setShowFilters(f => !f)}
                className={cn(
                  "h-14 px-6 border-2 rounded-2xl text-[11px] font-black font-syne uppercase tracking-wider flex items-center justify-center gap-3 transition-all", 
                  showFilters || hasActiveFilters ? "bg-[#004737] text-[#C8F55A] border-[#004737]" : "bg-white border-[#DDD8CF] text-[#3D5249] hover:border-[#004737]"
                )}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-14 px-10 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 uppercase tracking-widest"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              FIND PLOTS
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-[#F5F0E8] grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-3 ml-1">PLOT SIZE</label>
                <select
                  value={plotSize}
                  onChange={e => setPlotSize(e.target.value)}
                  className="w-full h-12 px-5 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-xl text-sm font-inter focus:border-[#004737] outline-none appearance-none"
                >
                  {PLOT_SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-3 ml-1">MIN PRICE (PKR)</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  placeholder="e.g. 5,000,000"
                  className="w-full h-12 px-5 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-xl text-sm font-inter focus:border-[#004737] outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-3 ml-1">MAX PRICE (PKR)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder="e.g. 50,000,000"
                  className="w-full h-12 px-5 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-xl text-sm font-inter focus:border-[#004737] outline-none"
                />
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="sm:col-span-3 flex items-center gap-2 text-[10px] font-black font-syne text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest"
                >
                  <X className="w-4 h-4" /> Clear all filters
                </button>
              )}
            </div>
          )}
        </form>

        {/* Quick Type Selection */}
        <div className="flex flex-wrap gap-3 mb-12">
          {PLOT_TYPES.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setPlotSize(prev => prev === t.size ? 'All Sizes' : t.size)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl border-2 text-[11px] font-black font-syne transition-all uppercase tracking-wider",
                plotSize === t.size 
                  ? "bg-[#004737] text-[#C8F55A] border-[#004737] shadow-lg" 
                  : "bg-white text-[#3D5249] border-[#DDD8CF] hover:border-[#004737]/30"
              )}
            >
              <span className="text-lg">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">

            {/* Results Section */}
            {searched && (
              <div className="stagger-children">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">
                    {loading ? 'Scanning Market...' : `${plots.length} verified plots found`}
                  </h2>
                  {!loading && plots.length > 0 && searched && (
                    <button onClick={clearFilters} className="text-[10px] font-black font-syne text-[#7A9088] hover:text-red-500 flex items-center gap-2 uppercase tracking-widest border-b border-[#DDD8CF]">
                      <X className="w-3.5 h-3.5" /> Clear Search
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 text-[#004737] animate-spin" />
                    <span className="font-syne font-bold text-[#004737] tracking-widest text-[10px] uppercase">Retrieving Listings...</span>
                  </div>
                ) : plots.length === 0 ? (
                  <div className="bg-white rounded-[3rem] border border-[#DDD8CF] p-24 text-center">
                    <div className="w-16 h-16 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Map className="w-8 h-8 text-[#004737]/30" />
                    </div>
                    <h3 className="text-xl font-black font-syne text-[#0D1B17] mb-3 uppercase tracking-tight">No plots found</h3>
                    <p className="text-sm font-inter text-[#7A9088] mb-10 max-w-sm mx-auto">Try broadening your search or adjusting the price filters to find available inventory.</p>
                    <button onClick={clearFilters} className="px-10 py-4 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-lg uppercase tracking-widest">
                      Reset Search
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {plots.map(plot => (
                      <Link
                        key={plot.id}
                        href={`/property/${plot.id}`}
                        className="flex flex-col sm:flex-row bg-white rounded-[2.5rem] border border-[#DDD8CF] overflow-hidden hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] transition-all duration-500 group"
                      >
                        <div className="relative w-full sm:w-52 h-52 flex-shrink-0">
                          <Image
                            src={plot.images?.[0] || plot.property_images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400'}
                            alt={plot.title}
                            fill
                            sizes="208px"
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={cn(
                              "px-3 py-1 text-[9px] font-black font-syne uppercase tracking-widest text-white rounded-lg border border-white/20", 
                              plot.purpose === 'Sale' ? "bg-[#004737]/80" : "bg-green-600/80"
                            )}>
                              FOR {plot.purpose.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-black font-syne text-[#0D1B17] group-hover:text-[#004737] transition-colors mb-2 line-clamp-1 uppercase tracking-tight">{plot.title}</h3>
                            <div className="flex items-center gap-2 text-xs font-inter text-[#7A9088] mb-4">
                              <MapPin className="w-4 h-4 text-[#004737]" />
                              {plot.area}, {plot.city}
                            </div>
                            <div className="flex items-center gap-6 text-[10px] font-black font-syne text-[#3D5249] uppercase tracking-widest">
                              <span className="flex items-center gap-2">
                                <Move className="w-4 h-4 text-[#004737]/40" /> {plot.area_size} {plot.area_unit}
                              </span>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-[#F5F0E8] flex items-center justify-between">
                            <span className="text-xl font-black font-syne text-[#0D1B17]">PKR {formatPrice(plot.price)}</span>
                            <div className="w-10 h-10 bg-[#F5F0E8] rounded-xl flex items-center justify-center group-hover:bg-[#004737] transition-all duration-300">
                               <ArrowRight className="w-4 h-4 text-[#004737] group-hover:text-[#C8F55A] group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Default State: Featured Content */}
            {!searched && (
              <div className="stagger-children">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-xl bg-[#004737] flex items-center justify-center">
                      <Map className="w-5 h-5 text-[#C8F55A]" />
                   </div>
                   <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">Prime Societies</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {SOCIETIES.map((society, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSocietyClick(society)}
                      className="text-left group bg-white rounded-[2.5rem] overflow-hidden border border-[#DDD8CF] shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] hover:-translate-y-2 transition-all duration-700"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image src={society.image} alt={society.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#004737]/90 via-[#004737]/20 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                          <h3 className="text-white font-black font-syne text-lg uppercase tracking-tight mb-1">{society.name}</h3>
                          <p className="text-[#A8C4BB] text-[10px] font-black font-syne uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#C8F55A]" /> {society.city}
                          </p>
                        </div>
                        <div className="absolute top-4 right-4 bg-[#C8F55A] text-[#004737] text-[9px] font-black font-syne px-3 py-1.5 rounded-xl shadow-xl uppercase tracking-widest border border-white/20">
                          FROM {society.priceFrom}
                        </div>
                      </div>
                      <div className="p-8 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-2">Available Supply</span>
                          <span className="text-sm font-black font-syne text-[#0D1B17] uppercase">{society.plots} ACTIVE ADS</span>
                        </div>
                        <div className="w-12 h-12 bg-[#F5F0E8] rounded-2xl flex items-center justify-center group-hover:bg-[#004737] transition-all duration-500">
                          <ArrowRight className="w-5 h-5 text-[#004737] group-hover:text-[#C8F55A] group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Navigation */}
          <div className="space-y-8">
            <div className="bg-[#004737] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                  <Building2 className="w-7 h-7 text-[#C8F55A]" />
                </div>
                <h3 className="text-2xl font-black font-syne mb-3 uppercase tracking-tight leading-tight">Hot Spots By City</h3>
                <p className="text-sm font-inter text-[#A8C4BB] mb-8 leading-relaxed">Instantly access verified plot inventory in major Pakistani hubs.</p>
                <div className="space-y-2">
                  {CITIES.slice(1, 6).map(c => (
                    <button
                      key={c}
                      onClick={() => { setCity(c); fetchPlots(c) }}
                      className="w-full flex items-center justify-between py-4 px-6 bg-white/5 hover:bg-[#C8F55A] hover:text-[#004737] rounded-2xl text-[11px] font-black font-syne uppercase tracking-widest transition-all group/city"
                    >
                      <span>{c}</span>
                      <ChevronRight className="w-4 h-4 text-white/40 group-hover/city:text-[#004737] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C8F55A]/5 rounded-full blur-3xl" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <div className="flex items-center gap-3 mb-8">
                 <TrendingUp className="w-5 h-5 text-[#004737]" />
                 <h3 className="text-xs font-black font-syne text-[#0D1B17] uppercase tracking-[0.2em]">Plot Size Guide</h3>
              </div>
              <div className="space-y-4">
                {[
                  { size: '5 Marla', sqft: '1,125 SQ.FT.', bestFor: 'FAMILY HOMES' },
                  { size: '10 Marla', sqft: '2,250 SQ.FT.', bestFor: 'LARGE VILLAS' },
                  { size: '1 Kanal', sqft: '4,500 SQ.FT.', bestFor: 'ESTATE LIVING' },
                  { size: '2 Kanal', sqft: '9,000 SQ.FT.', bestFor: 'LUXURY MANORS' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 border-b border-[#F5F0E8] last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-black font-syne text-[#0D1B17] uppercase tracking-tight">{item.size}</p>
                      <p className="text-[9px] font-inter text-[#7A9088] font-bold mt-1 tracking-widest">{item.sqft}</p>
                    </div>
                    <span className="text-[9px] font-black font-syne text-[#004737] bg-[#C8F55A] px-3 py-1.5 rounded-lg uppercase tracking-widest">{item.bestFor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#C8F55A] rounded-[2.5rem] p-10 text-[#004737] text-center shadow-xl">
              <h3 className="font-black font-syne text-2xl mb-3 uppercase tracking-tight">Sell Faster</h3>
              <p className="text-sm font-inter font-medium mb-8 leading-relaxed opacity-80">List your plot on Pakistan's #1 premium property portal for maximum exposure.</p>
              <Link href="/add-property" className="block w-full py-5 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all uppercase tracking-[0.2em] shadow-lg">
                + ADD LISTING
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
