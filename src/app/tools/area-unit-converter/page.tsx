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
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span>Tools</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Area Unit Converter</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">Area Unit Converter</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 bg-[#EBF2FF] rounded-2xl flex items-center justify-center mx-auto mb-8">
            <ArrowLeftRight className="w-8 h-8 text-[#1E6BFF]" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
            <div className="flex-1 w-full">
              <input 
                type="number" 
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-14 px-6 text-xl font-bold bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#1E6BFF] transition-all text-center sm:text-left"
              />
            </div>
            
            <div className="flex-1 w-full">
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full h-14 px-6 text-sm font-bold bg-white border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#1E6BFF] cursor-pointer appearance-none text-center"
              >
                {Object.keys(units).map(u => <option key={u}>{u}</option>)}
              </select>
            </div>

            <div className="p-2 text-[#9CA3AF]">
              <ArrowLeftRight className="w-5 h-5 hidden sm:block" />
              <span className="sm:hidden text-xs font-bold uppercase tracking-widest">To</span>
            </div>

            <div className="flex-1 w-full">
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full h-14 px-6 text-sm font-bold bg-white border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#1E6BFF] cursor-pointer appearance-none text-center"
              >
                {Object.keys(units).map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-12">
            <div className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">Result</div>
            <div className="text-4xl sm:text-5xl font-black text-[#1E6BFF]">
              {convert(value, fromUnit, toUnit).toLocaleString(undefined, { maximumFractionDigits: 4 })}
              <span className="text-xl sm:text-2xl text-[#4A5568] ml-3 font-bold">{toUnit}</span>
            </div>
          </div>
        </div>

        {/* Conversion Table */}
        <div className="mt-12 bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#F3F4F6] bg-[#F8F9FA]">
            <h3 className="font-bold text-[#1A1A2E]">Common Conversions (Punjab Standard)</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#F3F4F6] bg-[#F8F9FA]/50">
                <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Unit</th>
                <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Marla</th>
                <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Kanal</th>
                <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Sq. Ft.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              <ConversionRow unit="1 Marla" marla="1" kanal="0.05" sqft="225" />
              <ConversionRow unit="1 Kanal" marla="20" kanal="1" sqft="4,500" />
              <ConversionRow unit="1 Acre" marla="160" kanal="8" sqft="36,000" />
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-[#EBF2FF] rounded-2xl p-6 border border-[#1E6BFF]/20 flex gap-4">
          <Info className="w-6 h-6 text-[#1E6BFF] shrink-0" />
          <p className="text-xs text-[#4A5568] leading-relaxed">
            <span className="font-bold text-[#1A1A2E]">Note:</span> In Pakistan, the size of a Marla can vary by region. While 225 sq. ft. is the modern standard used in most urban societies like DHA and Bahria, some older settlements still use the traditional 272.25 sq. ft. measurement.
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
