'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Map as MapIcon, ChevronRight, SlidersHorizontal, Loader2 } from 'lucide-react'
import SearchSidebar from '@/components/search/SearchSidebar'
import PropertyCardHorizontal from '@/components/property/PropertyCardHorizontal'
import { Property } from '@/types'
import Link from 'next/link'

const SearchContent = () => {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const city = searchParams.get('city')
  const purpose = searchParams.get('purpose')
  const type = searchParams.get('type')
  const q = searchParams.get('q')

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      const params = new URLSearchParams(searchParams.toString())
      
      try {
        const res = await fetch(`/api/properties?${params.toString()}`)
        const data = await res.json()
        setProperties(data.properties || [])
      } catch (err) {
        console.error('Failed to fetch properties:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams])

  return (
    <>
      {/* Top Header */}
      <div className="bg-[#004737] pt-24 pb-12 relative overflow-hidden">
         {/* Dot grid texture */}
         <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">Search Results</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-syne text-white mb-2 uppercase tracking-tight">
            {purpose ? `${purpose} Properties` : 'Search Properties'} in {city || 'Pakistan'}
          </h1>
          <p className="text-sm font-inter text-[#A8C4BB] font-medium">
            {loading ? 'REFRESHING DATABASE...' : `${properties.length} VERIFIED LISTINGS FOUND`}
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      {/* Top Bar / Search Input */}
      <div className="bg-white border-b border-[#DDD8CF] sticky top-16 z-30 shadow-[0_4px_12px_rgba(0,71,55,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737]/40 group-focus-within:text-[#004737] transition-colors" />
              <input 
                type="text" 
                defaultValue={q || ''}
                placeholder="Find city, area or society..." 
                className="w-full h-12 pl-12 pr-6 text-sm bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] transition-all font-inter"
              />
            </div>
            <button className="hidden sm:flex items-center gap-2 h-12 px-8 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-md uppercase tracking-wider">
              Search
            </button>
            <button className="flex items-center gap-2 h-12 px-6 bg-white text-[#004737] border-2 border-[#004737] text-xs font-black font-syne rounded-2xl hover:bg-[#F5F0E8] transition-all uppercase tracking-wider">
              <MapIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Map View</span>
            </button>
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center justify-center w-12 h-12 bg-white border-2 border-[#DDD8CF] rounded-2xl text-[#004737]"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10 lg:gap-14">
          {/* Sidebar */}
          <SearchSidebar />

          {/* Results List */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <Loader2 className="w-10 h-10 text-[#004737] animate-spin" />
                <span className="font-syne font-bold text-[#004737] tracking-widest text-[10px] uppercase">UPDATING RESULTS...</span>
              </div>
            ) : properties.length > 0 ? (
              <div className="space-y-8 stagger-children">
                {properties.map((prop) => (
                  <PropertyCardHorizontal key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[3rem] border border-[#DDD8CF] p-20 text-center shadow-[0_4px_12px_rgba(0,71,55,0.04)]">
                <div className="w-20 h-20 bg-[#F5F0E8] rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-[#004737]/30" />
                </div>
                <h3 className="text-xl font-black font-syne text-[#0D1B17] mb-2">No properties found</h3>
                <p className="text-sm font-inter text-[#7A9088] mb-10 max-w-sm mx-auto leading-relaxed">Try adjusting your filters or searching in a broader area to find your dream property.</p>
                <button 
                  onClick={() => window.location.href = '/search'}
                  className="px-10 py-4 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-lg uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Suspense fallback={<div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-[#004737] animate-spin" />
        <span className="font-syne font-bold text-[#004737] tracking-widest text-[10px] uppercase">Loading results...</span>
      </div>}>
        <SearchContent />
      </Suspense>
    </div>
  )
}

export default SearchPage
