'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const SearchSidebar = () => {
  return (
    <aside className="hidden md:block w-64 lg:w-72 shrink-0">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 sticky top-24">
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-bold text-[#1A1A2E]">Filters</span>
          <button className="text-[11px] font-bold text-[#1E6BFF] uppercase tracking-wider hover:underline">
            Clear all
          </button>
        </div>

        {/* Filter Section */}
        <div className="space-y-8">
          
          {/* CATEGORIES */}
          <div>
            <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-3">
              Categories
            </label>
            <div className="space-y-2">
              {['Residential', 'Plot', 'Commercial'].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="radio" name="category" className="peer appearance-none w-5 h-5 border-2 border-[#E5E7EB] rounded-full checked:border-[#1E6BFF] transition-all" />
                    <div className="absolute w-2 h-2 bg-[#1E6BFF] rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <span className="text-sm text-[#4A5568] group-hover:text-[#1A1A2E] transition-colors">{cat}</span>
                </label>
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
              {['House', 'Flat', 'Room', 'Farm House', 'Penthouse'].map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-md border-2 border-[#E5E7EB] accent-[#1E6BFF] cursor-pointer" />
                  <span className="text-sm text-[#4A5568] group-hover:text-[#1A1A2E] transition-colors">{type}</span>
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
                  className={cn(
                    "h-10 text-xs font-bold border rounded-xl transition-all",
                    bed === 'Any' ? "bg-[#1E6BFF] text-white border-[#1E6BFF]" : "bg-white text-[#4A5568] border-[#E5E7EB] hover:border-[#1E6BFF] hover:text-[#1E6BFF]"
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
              <input type="text" placeholder="Min" className="w-full h-10 px-3 text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]" />
              <input type="text" placeholder="Max" className="w-full h-10 px-3 text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]" />
            </div>
          </div>
        </div>

        {/* PROMO BOX */}
        <div className="bg-[#EBF2FF] rounded-2xl p-5 mt-8 border border-[#1E6BFF]/20 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-[#1A1A2E] mb-1">Post your ad free</h4>
            <p className="text-[11px] text-[#4A5568] leading-relaxed mb-4">Reach thousands of buyers instantly</p>
            <button className="w-full py-2.5 bg-[#1E6BFF] text-white text-[11px] font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-[#1554CC] transition-all">
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
