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
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5 pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
            <Link href="/" className="hover:text-flecto-green transition-colors">Portfolio</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-flecto-green-light">Construction Estimation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-flecto-green font-syne tracking-tight mb-4">Construction Estimation</h1>
          <p className="text-base text-flecto-text-muted font-inter font-medium max-w-2xl">Projected capital requirements for ground-up development based on current material indexing.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-[3rem] border border-flecto-green/5 p-10 sm:p-12 shadow-2xl shadow-flecto-green/[0.04]">
              <h3 className="text-xs font-bold text-flecto-green mb-8 flex items-center gap-3 font-syne uppercase tracking-widest">
                <Hammer className="w-4 h-4 text-flecto-lime" /> Development Parameters
              </h3>
              
              <div className="space-y-10">
                <div>
                  <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] block mb-4 font-inter">Footprint Specification</label>
                  <div className="flex gap-4">
                    <input 
                      type="number" 
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="flex-1 h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-lg font-bold text-flecto-green focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 transition-all duration-500 font-syne"
                    />
                    <select 
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-32 h-14 px-4 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-[10px] font-bold text-flecto-green uppercase tracking-widest focus:outline-none focus:border-flecto-green/20 cursor-pointer font-inter"
                    >
                      <option>Marla</option>
                      <option>Kanal</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] block mb-4 font-inter">Material Grade</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Standard', 'Premium', 'Luxury'].map((q) => (
                      <button 
                        key={q}
                        onClick={() => setQuality(q)}
                        className={cn(
                          "py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border font-syne",
                          quality === q 
                            ? "bg-flecto-green text-flecto-cream border-flecto-green shadow-xl shadow-flecto-green/20" 
                            : "bg-flecto-cream border-transparent text-flecto-text-muted hover:border-flecto-green/20 hover:text-flecto-green"
                        )}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-flecto-lime/10 rounded-[2rem] p-8 border border-flecto-lime/20 flex gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <Info className="w-6 h-6 text-flecto-green" />
              </div>
              <p className="text-[11px] text-flecto-green font-inter font-medium leading-relaxed opacity-80 pt-1">
                Estimations represent aggregated market medians across primary metropolitan zones. Scope includes structural foundation and specified interior finishes.
              </p>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5">
            <div className="bg-flecto-green rounded-[3rem] p-10 sm:p-14 text-flecto-cream h-full flex flex-col justify-center relative overflow-hidden group shadow-2xl shadow-flecto-green/30">
              <div className="relative z-10 text-center">
                <span className="text-[10px] font-bold text-flecto-cream/40 uppercase tracking-[0.3em] block mb-8 font-inter">Projected Capital Outlay</span>
                <div className="flex items-baseline justify-center gap-3 mb-4">
                  <span className="text-xl font-bold text-flecto-lime font-syne">PKR</span>
                  <h2 className="text-5xl sm:text-6xl font-bold text-flecto-cream font-syne tracking-tight">{estimatedCost.toLocaleString()}</h2>
                </div>
                <p className="text-[10px] font-bold text-flecto-cream/30 uppercase tracking-widest mb-12 font-inter">Valuation: {(estimatedCost / 1000000).toFixed(2)} Million</p>
                
                <div className="h-px bg-flecto-cream/10 w-full mb-10" />
                
                <div className="grid grid-cols-2 gap-8 text-left">
                  <div>
                    <span className="text-[9px] font-bold text-flecto-lime uppercase tracking-widest block mb-2 font-inter">Structural Core</span>
                    <span className="text-sm font-bold text-flecto-cream font-syne">PKR {(estimatedCost * 0.6).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-flecto-lime uppercase tracking-widest block mb-2 font-inter">Interior Refinement</span>
                    <span className="text-sm font-bold text-flecto-cream font-syne">PKR {(estimatedCost * 0.4).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-flecto-lime/5 rounded-full blur-[80px] group-hover:bg-flecto-lime/10 transition-all duration-1000" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}


export default ConstructionCostCalculator
