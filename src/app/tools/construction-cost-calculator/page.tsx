'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Calculator, Home, Building2, ChevronRight, Hammer, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const ConstructionCostCalculator = () => {
  const [area, setArea] = useState('5')
  const [unit, setUnit] = useState('Marla')
  const [quality, setQuality] = useState('Standard')

  const costs = {
    Standard: 3500,
    Premium: 4800,
    Luxury: 6500
  }

  const marlaToSqft = 225
  const totalSqft = unit === 'Kanal' 
    ? parseFloat(area) * 20 * marlaToSqft 
    : parseFloat(area) * marlaToSqft
  const estimatedCost = totalSqft * costs[quality as keyof typeof costs]

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Construction Cost Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] mb-4">Construction Cost Calculator</h1>
          <p className="text-sm text-[#4A5568] max-w-2xl mx-auto">Estimate the approximate cost of building your dream house in Pakistan based on current market rates.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Inputs */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                <Hammer className="w-4 h-4 text-[#1E6BFF]" /> Project Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-3">Total Area</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="flex-1 h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm font-bold text-[#1A1A2E] focus:outline-none focus:border-[#1E6BFF]"
                    />
                    <select 
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-32 h-12 px-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#4A5568] focus:outline-none focus:border-[#1E6BFF]"
                    >
                      <option>Marla</option>
                      <option>Kanal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-3">Construction Quality</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Standard', 'Premium', 'Luxury'].map((q) => (
                      <button 
                        key={q}
                        onClick={() => setQuality(q)}
                        className={cn(
                          "py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border",
                          quality === q ? "bg-[#1E6BFF] text-white border-[#1E6BFF] shadow-lg" : "bg-white text-[#4A5568] border-[#E5E7EB] hover:border-[#1E6BFF]"
                        )}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex gap-4">
              <Info className="w-5 h-5 text-[#1E6BFF] shrink-0 mt-0.5" />
              <p className="text-xs text-[#1E6BFF]/80 leading-relaxed font-medium">
                Calculations are based on average market rates in major cities. Costs include grey structure and basic finishing.
              </p>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#1A1A2E] rounded-3xl p-10 text-white flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-4">Estimated Total Cost</span>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-xl font-bold text-[#1E6BFF]">PKR</span>
                <h2 className="text-4xl sm:text-5xl font-black">{estimatedCost.toLocaleString()}</h2>
              </div>
              <p className="text-xs text-white/40 mb-8">Approx. PKR {(estimatedCost / 1000000).toFixed(2)} Crore</p>
              
              <div className="h-px bg-white/10 w-full mb-8" />
              
              <div className="grid grid-cols-2 gap-6 text-left">
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">Grey Structure</span>
                  <span className="text-sm font-bold">PKR {(estimatedCost * 0.6).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest block mb-1">Finishing</span>
                  <span className="text-sm font-bold">PKR {(estimatedCost * 0.4).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#1E6BFF]/10 rounded-full blur-3xl group-hover:bg-[#1E6BFF]/20 transition-all duration-700" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ConstructionCostCalculator
