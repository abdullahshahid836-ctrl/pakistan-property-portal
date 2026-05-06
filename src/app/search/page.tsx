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
      <div className="bg-flecto-cream border-b border-flecto-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex items-center gap-2 text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
            <Link href="/" className="hover:text-flecto-green transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-flecto-green">Search Results</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-flecto-green font-syne tracking-tight">
            {purpose ? `Properties for ${purpose}` : 'Properties for Sale & Rent'} in <span className="text-flecto-green-light">{city || 'Pakistan'}</span>
          </h1>
          <p className="text-sm sm:text-base text-flecto-text-muted mt-4 font-inter font-medium">
            {loading ? 'Updating results...' : `${properties.length} verified listings available for you`}
          </p>
        </div>
      </div>

      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-flecto-green/5 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-flecto-text-muted group-focus-within:text-flecto-green transition-colors" />
              <input 
                type="text" 
                defaultValue={q || ''}
                placeholder="Find city, area or society..." 
                className="w-full h-12 pl-12 pr-4 text-sm bg-flecto-cream border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 transition-all font-inter"
              />
            </div>
            <button className="hidden sm:flex items-center gap-2 h-12 px-8 btn-primary text-sm">
              Search
            </button>
            <button className="flex items-center gap-2 h-12 px-6 bg-white text-flecto-green border border-flecto-green/10 text-sm font-bold rounded-full hover:bg-flecto-green hover:text-white transition-all font-syne">
              <MapIcon className="w-4 h-4" />
              <span className="hidden sm:inline">View Map</span>
            </button>
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex items-center justify-center w-12 h-12 bg-white border border-flecto-green/10 rounded-full text-flecto-green"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10 lg:gap-12">
          {/* Sidebar */}
          <SearchSidebar />

          {/* Results List */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-96 gap-4">
                <div className="w-12 h-12 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin" />
                <p className="text-sm font-bold text-flecto-green font-syne uppercase tracking-widest">Searching properties...</p>
              </div>
            ) : properties.length > 0 ? (
              <div className="space-y-8">
                {properties.map((prop) => (
                  <PropertyCardHorizontal key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-flecto-green/5 p-16 text-center shadow-xl shadow-flecto-green/[0.02]">
                <div className="w-20 h-20 bg-flecto-cream rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-flecto-green/20" />
                </div>
                <h3 className="text-2xl font-bold text-flecto-green mb-3 font-syne">No properties found</h3>
                <p className="text-base text-flecto-text-muted mb-10 max-w-sm mx-auto font-inter">Try adjusting your filters or search area to find what you're looking for.</p>
                <button 
                  onClick={() => window.location.href = '/search'}
                  className="btn-primary px-8 py-4 text-xs"
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
    <div className="min-h-screen bg-flecto-cream-dark">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-flecto-cream">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin" />
            <p className="text-sm font-bold text-flecto-green font-syne uppercase tracking-widest">Initializing Results...</p>
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </div>
  )
}

export default SearchPage

export default SearchPage

