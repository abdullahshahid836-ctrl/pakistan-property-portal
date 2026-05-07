'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Map as MapIcon, ChevronRight, SlidersHorizontal, Loader2 } from 'lucide-react'
import SearchSidebar from '@/components/search/SearchSidebar'
import PropertyCardHorizontal from '@/components/property/PropertyCardHorizontal'
import { Property } from '@/types'

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
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <span className="hover:text-[#1E6BFF] cursor-pointer">Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Search Results</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">
            {purpose ? `Properties for ${purpose}` : 'Properties for Sale & Rent'} in {city || 'Pakistan'}
          </h1>
          <p className="text-sm text-[#9CA3AF] mt-1 font-medium">
            {loading ? 'Updating results...' : `${properties.length} verified listings available`}
          </p>
        </div>
      </div>

      {/* Top Bar */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#1E6BFF] transition-colors" />
              <input 
                type="text" 
                defaultValue={q || ''}
                placeholder="Find city, area or society..." 
                className="w-full h-11 pl-10 pr-4 text-sm bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF] transition-all"
              />
            </div>
            <button className="hidden sm:flex items-center gap-2 h-11 px-6 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all shadow-button">
              Search
            </button>
            <button className="flex items-center gap-2 h-11 px-4 sm:px-6 bg-white text-[#1E6BFF] border border-[#1E6BFF] text-sm font-bold rounded-xl hover:bg-[#EBF2FF] transition-all">
              <MapIcon className="w-4 h-4" />
              <span className="hidden sm:inline">View Map</span>
            </button>
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center justify-center w-11 h-11 bg-white border border-[#E5E7EB] rounded-xl text-[#4A5568]"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 lg:gap-10">
          {/* Sidebar */}
          <SearchSidebar />

          {/* Results List */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-[#1E6BFF] animate-spin" />
              </div>
            ) : properties.length > 0 ? (
              <div className="space-y-6">
                {properties.map((prop) => (
                  <PropertyCardHorizontal key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center">
                <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#9CA3AF]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">No properties found</h3>
                <p className="text-sm text-[#9CA3AF] mb-6">Try adjusting your filters or search area to find what you're looking for.</p>
                <button 
                  onClick={() => window.location.href = '/search'}
                  className="px-6 py-2.5 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl hover:bg-[#1554CC] transition-all"
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
    <div className="min-h-screen bg-[#F8F9FA]">
      <Suspense fallback={<div className="p-20 text-center">Loading search results...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  )
}

export default SearchPage

