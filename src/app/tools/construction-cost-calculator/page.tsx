'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Calculator, Home, Building2, ChevronRight, Hammer, Info, ArrowRight } from 'lucide-react'
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
            <span className="opacity-60">Estimators</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Construction Cost</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Accurately estimate the total expenditure for your building project based on the latest market rates for materials and labor.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Inputs Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <div className="flex items-center gap-3 mb-10">
                 <Hammer className="w-5 h-5 text-[#004737]" />
                 <h3 className="text-xs font-black font-syne text-[#0D1B17] uppercase tracking-[0.2em]">Project Parameters</h3>
              </div>
              
              <div className="space-y-10">
                <div>
                  <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-4 ml-1">TOTAL PLOT AREA</label>
                  <div className="flex gap-4">
                    <input 
                      type="number" 
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="flex-1 h-14 px-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:outline-none focus:border-[#004737] transition-all"
                    />
                    <select 
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-40 h-14 px-5 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne text-[#3D5249] uppercase tracking-wider focus:outline-none focus:border-[#004737] appearance-none cursor-pointer"
                    >
                      <option>Marla</option>
                      <option>Kanal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-4 ml-1">BUILD QUALITY</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Standard', 'Premium', 'Luxury'].map((q) => (
                      <button 
                        key={q}
                        onClick={() => setQuality(q)}
                        className={cn(
                          "py-4 rounded-xl text-[10px] font-black font-syne uppercase tracking-widest transition-all border-2",
                          quality === q 
                            ? "bg-[#004737] text-[#C8F55A] border-[#004737] shadow-lg" 
                            : "bg-white text-[#3D5249] border-[#DDD8CF] hover:border-[#004737]/30"
                        )}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#004737] rounded-[2rem] p-8 text-white flex gap-6 shadow-xl relative overflow-hidden">
              <div className="w-14 h-14 bg-[#C8F55A] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Info className="w-7 h-7 text-[#004737]" />
              </div>
              <div className="relative z-10">
                <p className="text-sm font-inter text-[#A8C4BB] leading-relaxed opacity-90">
                  Estimates are calculated using current benchmark rates for grey structure and standard finishing in major hubs like Lahore, Karachi and Islamabad.
                </p>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Result Column */}
          <div className="bg-white rounded-[3rem] border border-[#DDD8CF] p-10 sm:p-14 text-center relative overflow-hidden flex flex-col justify-center shadow-[0_40px_100px_rgba(0,71,55,0.1)] group">
            {/* Pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#F5F0E8] rounded-full blur-3xl -mr-20 -mt-20" />

            <div className="relative z-10">
              <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-6">TOTAL ESTIMATED EXPENDITURE</span>
              <div className="flex items-baseline justify-center gap-3 mb-4">
                <span className="text-xl font-black font-syne text-[#004737] opacity-40">PKR</span>
                <h2 className="text-4xl sm:text-6xl font-black font-syne text-[#0D1B17] tracking-tight">{estimatedCost.toLocaleString()}</h2>
              </div>
              <p className="text-sm font-black font-syne text-[#004737] bg-[#C8F55A] px-6 py-2 rounded-full inline-block mb-12 uppercase tracking-widest shadow-md">
                ~ PKR {(estimatedCost / 1000000).toFixed(2)} CRORE
              </p>
              
              <div className="h-px bg-[#F5F0E8] w-full mb-12" />
              
              <div className="grid grid-cols-2 gap-10 text-left">
                <div>
                  <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-2">GREY STRUCTURE</span>
                  <span className="text-base font-black font-syne text-[#0D1B17]">PKR {(estimatedCost * 0.6).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] block mb-2">FINISHING</span>
                  <span className="text-base font-black font-syne text-[#0D1B17]">PKR {(estimatedCost * 0.4).toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full mt-14 py-5 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest">
                CONSULT ARCHITECT <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#C8F55A]/10 rounded-full blur-3xl group-hover:bg-[#C8F55A]/20 transition-all duration-700" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ConstructionCostCalculator
