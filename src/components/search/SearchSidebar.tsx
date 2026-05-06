'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const SearchSidebar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentPurpose = searchParams.get('purpose') || 'Sale'
  const currentType = searchParams.get('type') || 'All Types'
  const currentBeds = searchParams.get('bedrooms') || 'Any'

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'Any' || value === 'All Types' || !value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`/search?${params.toString()}`)
  }

  return (
    <aside className="hidden md:block w-72 lg:w-80 shrink-0">
      <div className="bg-white rounded-3xl border border-flecto-green/5 shadow-xl shadow-flecto-green/[0.02] p-8 sticky top-24">
        
        <div className="flex items-center justify-between mb-10">
          <span className="text-base font-bold text-flecto-green font-syne">Filters</span>
          <button 
            onClick={() => router.push('/search')}
            className="text-[11px] font-bold text-flecto-green-light uppercase tracking-[0.2em] hover:text-flecto-green transition-colors font-inter"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-10">
          {/* PURPOSE */}
          <div>
            <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] block mb-5 font-inter">
              Purpose
            </label>
            <div className="flex gap-3">
              {['Sale', 'Rent'].map((p) => (
                <button
                  key={p}
                  onClick={() => updateFilters('purpose', p)}
                  className={cn(
                    "flex-1 py-3 text-xs font-bold rounded-xl transition-all duration-300 font-syne",
                    currentPurpose === p 
                      ? "bg-flecto-green text-flecto-cream shadow-lg shadow-flecto-green/10" 
                      : "bg-flecto-cream text-flecto-green border border-flecto-green/5 hover:bg-flecto-green/5"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-flecto-green/5" />

          {/* PROPERTY TYPE */}
          <div>
            <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] block mb-5 font-inter">
              Property Type
            </label>
            <div className="space-y-3">
              {['All Types', 'House', 'Flat', 'Plot', 'Commercial'].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={currentType === type}
                      onChange={() => updateFilters('type', type)}
                      className="peer appearance-none w-5 h-5 border-2 border-flecto-green/10 rounded-full checked:border-flecto-green transition-all" 
                    />
                    <div className="absolute w-2 h-2 bg-flecto-green rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className={cn("text-sm font-medium font-inter transition-colors", currentType === type ? "text-flecto-green font-bold" : "text-flecto-text-muted group-hover:text-flecto-green")}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-flecto-green/5" />

          {/* BEDROOMS */}
          <div>
            <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] block mb-5 font-inter">
              Bedrooms
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Any', '1', '2', '3', '4', '5+'].map((bed) => (
                <button
                  key={bed}
                  onClick={() => updateFilters('bedrooms', bed)}
                  className={cn(
                    "h-10 text-xs font-bold rounded-xl transition-all duration-300 font-syne",
                    currentBeds === bed 
                      ? "bg-flecto-green text-flecto-cream" 
                      : "bg-flecto-cream text-flecto-green hover:bg-flecto-green/5"
                  )}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-flecto-green/5" />

          {/* PRICE RANGE */}
          <div>
            <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] block mb-5 font-inter">
              Price Range (PKR)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="number" 
                placeholder="Min" 
                defaultValue={searchParams.get('minPrice') || ''}
                onBlur={(e) => updateFilters('minPrice', e.target.value)}
                className="w-full h-11 px-4 text-xs bg-flecto-cream border border-flecto-green/5 rounded-xl focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium" 
              />
              <input 
                type="number" 
                placeholder="Max" 
                defaultValue={searchParams.get('maxPrice') || ''}
                onBlur={(e) => updateFilters('maxPrice', e.target.value)}
                className="w-full h-11 px-4 text-xs bg-flecto-cream border border-flecto-green/5 rounded-xl focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium" 
              />
            </div>
          </div>
        </div>

        {/* PROMO BOX */}
        <div className="bg-flecto-green rounded-2xl p-6 mt-10 relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-flecto-cream mb-2 font-syne">Post your ad free</h4>
            <p className="text-[11px] text-flecto-cream/60 leading-relaxed mb-6 font-inter font-medium">Reach thousands of buyers instantly across Pakistan</p>
            <button 
              onClick={() => router.push('/add-property')}
              className="btn-lime w-full py-3.5 text-[11px]"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> ADD PROPERTY
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-flecto-lime/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
        </div>
      </div>
    </aside>
  )
}

export default SearchSidebar

export default SearchSidebar

