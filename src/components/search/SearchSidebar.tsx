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
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 sticky top-24">
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-[#1A1A2E]">Filters</span>
          <button 
            onClick={() => router.push('/search')}
            className="text-[11px] font-bold text-[#1E6BFF] uppercase tracking-wider hover:underline"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-8">
          {/* PURPOSE */}
          <div>
            <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-3">
              Purpose
            </label>
            <div className="flex gap-2">
              {['Sale', 'Rent'].map((p) => (
                <button
                  key={p}
                  onClick={() => updateFilters('purpose', p)}
                  className={cn(
                    "flex-1 py-2 text-xs font-bold border rounded-xl transition-all",
                    currentPurpose === p ? "bg-[#1E6BFF] text-white border-[#1E6BFF]" : "bg-white text-[#4A5568] border-[#E5E7EB] hover:border-[#1E6BFF]"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#F3F4F6]" />

          {/* PROPERTY TYPE */}
          <div>
            <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-3">
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
                      className="peer appearance-none w-5 h-5 border-2 border-[#E5E7EB] rounded-full checked:border-[#1E6BFF] transition-all" 
                    />
                    <div className="absolute w-2 h-2 bg-[#1E6BFF] rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className={cn("text-sm transition-colors", currentType === type ? "text-[#1A1A2E] font-bold" : "text-[#4A5568] group-hover:text-[#1A1A2E]")}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#F3F4F6]" />

          {/* BEDROOMS */}
          <div>
            <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-3">
              Bedrooms
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Any', '1', '2', '3', '4', '5+'].map((bed) => (
                <button
                  key={bed}
                  onClick={() => updateFilters('bedrooms', bed)}
                  className={cn(
                    "h-10 text-xs font-bold border rounded-xl transition-all",
                    currentBeds === bed ? "bg-[#1E6BFF] text-white border-[#1E6BFF]" : "bg-white text-[#4A5568] border-[#E5E7EB] hover:border-[#1E6BFF] hover:text-[#1E6BFF]"
                  )}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-[#F3F4F6]" />

          {/* PRICE RANGE */}
          <div>
            <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-3">
              Price Range (PKR)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="number" 
                placeholder="Min" 
                defaultValue={searchParams.get('minPrice') || ''}
                onBlur={(e) => updateFilters('minPrice', e.target.value)}
                className="w-full h-10 px-3 text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]" 
              />
              <input 
                type="number" 
                placeholder="Max" 
                defaultValue={searchParams.get('maxPrice') || ''}
                onBlur={(e) => updateFilters('maxPrice', e.target.value)}
                className="w-full h-10 px-3 text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]" 
              />
            </div>
          </div>
        </div>

        {/* PROMO BOX */}
        <div className="bg-[#EBF2FF] rounded-2xl p-5 mt-8 border border-[#1E6BFF]/20 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-[#1A1A2E] mb-1">Post your ad free</h4>
            <p className="text-[11px] text-[#4A5568] leading-relaxed mb-4">Reach thousands of buyers instantly</p>
            <button 
              onClick={() => router.push('/add-property')}
              className="w-full py-2.5 bg-[#1E6BFF] text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-[#1554CC] transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> ADD PROPERTY
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#1E6BFF]/10 rounded-full blur-xl" />
        </div>
      </div>
    </aside>
  )
}

export default SearchSidebar

