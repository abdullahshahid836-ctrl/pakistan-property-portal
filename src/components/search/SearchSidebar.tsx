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
    <aside className="hidden md:block w-64 lg:w-72 shrink-0">
      <div className="bg-white rounded-2xl border border-[#DDD8CF] shadow-[0_2px_8px_rgba(0,71,55,0.06)] p-6 sticky top-24">
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold font-syne text-[#0D1B17]">Filters</span>
          <button 
            onClick={() => router.push('/search')}
            className="text-[11px] font-bold text-[#004737] uppercase tracking-wider hover:underline font-syne"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-8">
          {/* PURPOSE */}
          <div>
            <label className="text-[11px] font-bold text-[#7A9088] uppercase tracking-[0.12em] block mb-3 font-syne">
              Purpose
            </label>
            <div className="flex gap-2">
              {['Sale', 'Rent'].map((p) => (
                <button
                  key={p}
                  onClick={() => updateFilters('purpose', p)}
                  className={cn(
                    "flex-1 py-2 text-xs font-bold font-syne border rounded-xl transition-all",
                    currentPurpose === p 
                      ? "bg-[#004737] text-[#C8F55A] border-[#004737]" 
                      : "bg-white text-[#3D5249] border-[#DDD8CF] hover:border-[#004737]"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#DDD8CF]" />

          {/* PROPERTY TYPE */}
          <div>
            <label className="text-[11px] font-bold text-[#7A9088] uppercase tracking-[0.12em] block mb-3 font-syne">
              Property Type
            </label>
            <div className="space-y-2">
              {['All Types', 'House', 'Flat', 'Plot', 'Commercial'].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={currentType === type}
                      onChange={() => updateFilters('type', type)}
                      className="peer appearance-none w-5 h-5 border-2 border-[#DDD8CF] rounded-full checked:border-[#004737] transition-all" 
                    />
                    <div className="absolute w-2 h-2 bg-[#004737] rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className={cn(
                    "text-sm transition-colors font-inter", 
                    currentType === type ? "text-[#0D1B17] font-bold" : "text-[#4A5568] group-hover:text-[#0D1B17]"
                  )}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#DDD8CF]" />

          {/* BEDROOMS */}
          <div>
            <label className="text-[11px] font-bold text-[#7A9088] uppercase tracking-[0.12em] block mb-3 font-syne">
              Bedrooms
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Any', '1', '2', '3', '4', '5+'].map((bed) => (
                <button
                  key={bed}
                  onClick={() => updateFilters('bedrooms', bed)}
                  className={cn(
                    "h-10 text-xs font-bold font-inter border rounded-xl transition-all",
                    currentBeds === bed 
                      ? "bg-[#004737] text-[#C8F55A] border-[#004737]" 
                      : "bg-white text-[#3D5249] border-[#DDD8CF] hover:border-[#004737] hover:text-[#004737]"
                  )}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#DDD8CF]" />

          {/* PRICE RANGE */}
          <div>
            <label className="text-[11px] font-bold text-[#7A9088] uppercase tracking-[0.12em] block mb-3 font-syne">
              Price Range (PKR)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="number" 
                placeholder="Min" 
                defaultValue={searchParams.get('minPrice') || ''}
                onBlur={(e) => updateFilters('minPrice', e.target.value)}
                className="w-full h-10 px-3 text-xs bg-white border border-[#DDD8CF] rounded-xl focus:outline-none focus:border-[#004737] font-inter" 
              />
              <input 
                type="number" 
                placeholder="Max" 
                defaultValue={searchParams.get('maxPrice') || ''}
                onBlur={(e) => updateFilters('maxPrice', e.target.value)}
                className="w-full h-10 px-3 text-xs bg-white border border-[#DDD8CF] rounded-xl focus:outline-none focus:border-[#004737] font-inter" 
              />
            </div>
          </div>
        </div>

        {/* PROMO BOX */}
        <div className="bg-[#004737] rounded-2xl p-5 mt-8 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-bold font-syne text-[#F5F0E8] mb-1">Post your ad free</h4>
            <p className="text-[11px] text-[#A8C4BB] leading-relaxed mb-4 font-inter">Reach thousands of buyers instantly</p>
            <button 
              onClick={() => router.push('/add-property')}
              className="w-full py-2.5 bg-[#C8F55A] text-[#004737] text-xs font-black font-syne rounded-xl flex items-center justify-center gap-2 hover:bg-[#B8E84A] transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> ADD PROPERTY
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#C8F55A]/10 rounded-full blur-xl" />
        </div>
      </div>
    </aside>
  )
}

export default SearchSidebar
