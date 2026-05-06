'use client'

import React, { useState } from 'react'
import { ArrowLeftRight, ChevronRight, Info } from 'lucide-react'

const AreaUnitConverter = () => {
  const [value, setValue] = useState(1)
  const [fromUnit, setFromUnit] = useState('Marla')
  const [toUnit, setToUnit] = useState('Sq. Ft.')

  const units = {
    'Marla': 225, // Assuming 225 for Punjab standard, though 272 is also used
    'Kanal': 4500,
    'Sq. Ft.': 1,
    'Sq. Yd.': 9,
    'Acre': 36000,
  }

  const convert = (val: number, from: string, to: string) => {
    const sqFt = val * (units[from as keyof typeof units])
    return sqFt / (units[to as keyof typeof units])
  }

  return (
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5 pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
            <span>Home</span>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span>Analytical Tools</span>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-flecto-green-light">Area Precision Converter</span>
          </div>
          <h1 className="text-4xl font-bold text-flecto-green font-syne tracking-tight">Area Precision Converter</h1>
          <p className="text-base text-flecto-text-muted font-inter font-medium mt-2">Standardizing land measurements across regional benchmarks.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-[3rem] border border-flecto-green/5 p-10 sm:p-16 shadow-2xl shadow-flecto-green/[0.04] text-center">
          <div className="w-20 h-20 bg-flecto-cream rounded-[1.75rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
            <ArrowLeftRight className="w-8 h-8 text-flecto-lime" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 max-w-2xl mx-auto">
            <div className="flex-1 w-full relative">
              <input 
                type="number" 
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-16 px-8 text-2xl font-bold bg-flecto-cream border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 transition-all duration-500 text-flecto-green font-syne text-center sm:text-left"
              />
            </div>
            
            <div className="flex-1 w-full">
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full h-16 px-8 text-[10px] font-bold text-flecto-green uppercase tracking-[0.2em] bg-flecto-cream border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green/20 cursor-pointer appearance-none text-center font-inter"
              >
                {Object.keys(units).map(u => <option key={u}>{u}</option>)}
              </select>
            </div>

            <div className="p-2 text-flecto-lime">
              <ArrowLeftRight className="w-6 h-6 hidden sm:block" />
              <span className="sm:hidden text-[10px] font-bold uppercase tracking-widest text-flecto-text-muted">Targeting</span>
            </div>

            <div className="flex-1 w-full">
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full h-16 px-8 text-[10px] font-bold text-flecto-green uppercase tracking-[0.2em] bg-flecto-cream border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green/20 cursor-pointer appearance-none text-center font-inter"
              >
                {Object.keys(units).map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-flecto-green/5">
            <div className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.3em] mb-4 font-inter">Calculated Area</div>
            <div className="text-5xl sm:text-7xl font-bold text-flecto-green font-syne tracking-tight">
              {convert(value, fromUnit, toUnit).toLocaleString(undefined, { maximumFractionDigits: 4 })}
              <span className="text-xl sm:text-2xl text-flecto-green-light ml-4 font-bold uppercase tracking-widest">{toUnit}</span>
            </div>
          </div>
        </div>

        {/* Conversion Table */}
        <div className="mt-16 bg-white rounded-[2.5rem] border border-flecto-green/5 overflow-hidden shadow-2xl shadow-flecto-green/[0.03]">
          <div className="p-8 border-b border-flecto-green/5 bg-flecto-cream">
            <h3 className="text-xs font-bold text-flecto-green font-syne uppercase tracking-widest">Regional Benchmarks (Punjab Standard)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-flecto-cream/30">
                  <th className="px-8 py-5 text-[10px] font-bold text-flecto-text-muted uppercase tracking-widest font-inter">Unit Basis</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-flecto-text-muted uppercase tracking-widest font-inter">Marla Equity</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-flecto-text-muted uppercase tracking-widest font-inter">Kanal Value</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-flecto-text-muted uppercase tracking-widest font-inter">Square Footage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-flecto-green/5">
                <ConversionRow unit="1 Marla" marla="1" kanal="0.05" sqft="225" />
                <ConversionRow unit="1 Kanal" marla="20" kanal="1" sqft="4,500" />
                <ConversionRow unit="1 Acre" marla="160" kanal="8" sqft="36,000" />
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 bg-flecto-lime/10 rounded-[2rem] p-8 border border-flecto-lime/20 flex gap-6">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
            <Info className="w-6 h-6 text-flecto-green" />
          </div>
          <p className="text-[11px] text-flecto-green font-inter font-medium leading-relaxed">
            <span className="font-bold uppercase tracking-widest block mb-1">Standardization Note</span>
            Marla metrics vary across administrative jurisdictions. While 225 sq. ft. is the contemporary standard for modern urban planning (DHA, Bahria), traditional settlements may utilize 272.25 sq. ft.
          </p>
        </div>
      </div>
    </div>

  )
}

const ConversionRow = ({ unit, marla, kanal, sqft }: any) => (
  <tr>
    <td className="px-6 py-4 text-sm font-bold text-[#1A1A2E]">{unit}</td>
    <td className="px-6 py-4 text-sm text-[#4A5568]">{marla}</td>
    <td className="px-6 py-4 text-sm text-[#4A5568]">{kanal}</td>
    <td className="px-6 py-4 text-sm text-[#4A5568]">{sqft}</td>
  </tr>
)

export default AreaUnitConverter
