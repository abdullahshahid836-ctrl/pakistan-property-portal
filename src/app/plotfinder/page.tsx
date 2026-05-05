'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Map, Search, MapPin, ChevronRight, Filter, Building2, Grid, Loader2, X, Home, Bed, Bath, Move, SlidersHorizontal } from 'lucide-react'
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
  { name: 'Bahria Town Karachi', city: 'Karachi', plots: '4,800+', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', priceFrom: '1.1 Cr' },
  { name: 'DHA Multan', city: 'Multan', plots: '620+', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', priceFrom: '85 Lac' },
]

const PLOT_TYPES = [
  { label: '3 Marla', icon: '🏠', size: '3 Marla' },
  { label: '5 Marla', icon: '🏡', size: '5 Marla' },
  { label: '10 Marla', icon: '🏘️', size: '10 Marla' },
  { label: '1 Kanal', icon: '🏗️', size: '1 Kanal' },
  { label: '2 Kanal', icon: '🏰', size: '2 Kanal' },
  { label: 'Commercial', icon: '🏢', size: 'Commercial' },
  { label: 'Files', icon: '📄', size: 'File' },
  { label: 'Agricultural', icon: '🌾', size: 'Agricultural' },
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

      // Client-side filter for search query and plot size
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        results = results.filter(p =>
          p.title?.toLowerCase().includes(q) ||
          p.area?.toLowerCase().includes(q) ||
          p.city?.toLowerCase().includes(q) ||
          p.address?.toLowerCase().includes(q)
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

  const handlePlotTypeClick = (size: string) => {
    if (size === 'Commercial') {
      window.location.href = '/commercial'
      return
    }
    setPlotSize(prev => prev === size ? 'All Sizes' : size)
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
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Plot Finder</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">Plot Finder & Society Maps</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">Search residential and commercial plots across Pakistan's top societies</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white rounded-3xl border border-[#E5E7EB] p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by area, society or city..."
                className="w-full h-12 pl-12 pr-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#1E6BFF] text-sm"
              />
            </div>

            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl text-sm focus:border-[#1E6BFF] outline-none min-w-[140px]"
            >
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>

            <select
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              className="h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl text-sm focus:border-[#1E6BFF] outline-none min-w-[110px]"
            >
              {PURPOSES.map(p => <option key={p}>{p}</option>)}
            </select>

            <button
              type="button"
              onClick={() => setShowFilters(f => !f)}
              className={cn("h-12 px-5 border rounded-2xl text-sm font-bold flex items-center gap-2 transition-all", showFilters || hasActiveFilters ? "bg-[#EBF2FF] border-[#1E6BFF] text-[#1E6BFF]" : "bg-white border-[#E5E7EB] text-[#4A5568] hover:border-[#1E6BFF]")}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {hasActiveFilters && <span className="w-2 h-2 bg-[#1E6BFF] rounded-full" />}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="h-12 px-8 bg-[#1E6BFF] text-white text-sm font-bold rounded-2xl hover:bg-[#1554CC] transition-all shadow-lg shadow-blue-200 flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Find Plots
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-[#F3F4F6] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Plot Size</label>
                <select
                  value={plotSize}
                  onChange={e => setPlotSize(e.target.value)}
                  className="w-full h-10 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none"
                >
                  {PLOT_SIZES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Min Price (PKR)</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  placeholder="e.g. 5000000"
                  className="w-full h-10 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Max Price (PKR)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder="e.g. 50000000"
                  className="w-full h-10 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none"
                />
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="sm:col-span-3 flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Clear all filters
                </button>
              )}
            </div>
          )}
        </form>

        {/* Plot Size Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PLOT_TYPES.map((t, idx) => (
            <button
              key={idx}
              onClick={() => handlePlotTypeClick(t.size)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all",
                plotSize === t.size ? "bg-[#1E6BFF] text-white border-[#1E6BFF]" : "bg-white text-[#4A5568] border-[#E5E7EB] hover:border-[#1E6BFF] hover:text-[#1E6BFF]"
              )}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Search Results */}
            {searched && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-black text-[#1A1A2E]">
                    {loading ? 'Searching...' : `${plots.length} Plots Found`}
                    {city !== 'All Cities' && <span className="text-[#9CA3AF] font-normal"> in {city}</span>}
                  </h2>
                  {!loading && plots.length > 0 && searched && (
                    <button onClick={clearFilters} className="text-xs font-bold text-[#9CA3AF] hover:text-red-500 flex items-center gap-1">
                      <X className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="flex items-center justify-center h-40">
                    <Loader2 className="w-8 h-8 text-[#1E6BFF] animate-spin" />
                  </div>
                ) : plots.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-[#E5E7EB] p-12 text-center">
                    <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Map className="w-8 h-8 text-[#9CA3AF]" />
                    </div>
                    <h3 className="font-bold text-[#1A1A2E] mb-2">No plots found</h3>
                    <p className="text-sm text-[#9CA3AF] mb-6">Try adjusting your filters or search a different area.</p>
                    <button onClick={clearFilters} className="px-6 py-3 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all">
                      Reset Search
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {plots.map(plot => (
                      <Link
                        key={plot.id}
                        href={`/property/${plot.id}`}
                        className="flex bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-all group"
                      >
                        <div className="relative w-40 flex-shrink-0">
                          <Image
                            src={plot.images?.[0] || plot.property_images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400'}
                            alt={plot.title}
                            fill
                            sizes="160px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2">
                            <span className={cn("px-2 py-0.5 text-[9px] font-bold text-white rounded-lg", plot.purpose === 'Sale' ? "bg-[#1E6BFF]" : "bg-green-500")}>
                              {plot.purpose}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 p-5">
                          <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#1E6BFF] transition-colors mb-1 line-clamp-1">{plot.title}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mb-3">
                            <MapPin className="w-3 h-3 text-[#1E6BFF]" />
                            {plot.area}, {plot.city}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                            <span className="flex items-center gap-1">
                              <Move className="w-3 h-3" /> {plot.area_size} {plot.area_unit}
                            </span>
                          </div>
                          <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
                            <span className="text-base font-black text-[#1E6BFF]">PKR {formatPrice(plot.price)}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Featured Societies */}
            {!searched && (
              <div>
                <h2 className="text-lg font-black text-[#1A1A2E] flex items-center gap-2 mb-6">
                  <Map className="w-5 h-5 text-[#1E6BFF]" /> Featured Societies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {SOCIETIES.map((society, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSocietyClick(society)}
                      className="text-left group bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image src={society.image} alt={society.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-white font-bold text-base">{society.name}</h3>
                          <p className="text-white/70 text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {society.city}
                          </p>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#1E6BFF] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                          From {society.priceFrom}
                        </div>
                      </div>
                      <div className="p-5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest block mb-1">Available Plots</span>
                          <span className="text-sm font-bold text-[#1A1A2E]">{society.plots} Listings</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#EBF2FF] text-[#1E6BFF] text-xs font-bold rounded-xl group-hover:bg-[#1E6BFF] group-hover:text-white transition-all">
                          Search Plots <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick links */}
            <div className="bg-[#1A1A2E] rounded-3xl p-7 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-[#1E6BFF]/20 rounded-2xl flex items-center justify-center mb-4">
                  <Map className="w-5 h-5 text-[#1E6BFF]" />
                </div>
                <h3 className="text-lg font-bold mb-2">Browse by City</h3>
                <p className="text-xs text-white/50 mb-5 leading-relaxed">Find plots in Pakistan's top cities instantly.</p>
                <div className="space-y-2">
                  {CITIES.slice(1).map(c => (
                    <button
                      key={c}
                      onClick={() => { setCity(c); fetchPlots(c) }}
                      className="w-full flex items-center justify-between py-2.5 px-4 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-all"
                    >
                      <span>{c}</span>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1E6BFF]/10 rounded-full blur-3xl" />
            </div>

            {/* Plot Size Guide */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-black text-[#1A1A2E] mb-5">Plot Size Guide</h3>
              <div className="space-y-3">
                {[
                  { size: '3 Marla', sqft: '675 Sq. Ft.', bestFor: 'Budget Homes' },
                  { size: '5 Marla', sqft: '1,125 Sq. Ft.', bestFor: 'Small Families' },
                  { size: '10 Marla', sqft: '2,250 Sq. Ft.', bestFor: 'Medium Families' },
                  { size: '1 Kanal', sqft: '4,500 Sq. Ft.', bestFor: 'Large Families' },
                  { size: '2 Kanal', sqft: '9,000 Sq. Ft.', bestFor: 'Luxury Homes' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                    <div>
                      <p className="text-sm font-bold text-[#1A1A2E]">{item.size}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{item.sqft}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#1E6BFF] bg-[#EBF2FF] px-2 py-1 rounded-lg">{item.bestFor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#1E6BFF] to-[#1554CC] rounded-3xl p-7 text-white">
              <h3 className="font-bold text-lg mb-2">List Your Plot</h3>
              <p className="text-xs text-white/70 mb-5 leading-relaxed">Reach thousands of buyers across Pakistan. List your plot for free today.</p>
              <Link href="/add-property" className="w-full flex items-center justify-center h-11 bg-white text-[#1E6BFF] text-sm font-bold rounded-xl hover:bg-[#F8F9FA] transition-all">
                + Add Your Plot
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
