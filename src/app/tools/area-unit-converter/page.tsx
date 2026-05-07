'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeftRight, ChevronRight, Info, Scale, Map, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const AreaUnitConverter = () => {
  const [value, setValue] = useState(1)
  const [fromUnit, setFromUnit] = useState('Marla')
  const [toUnit, setToUnit] = useState('Sq. Ft.')

  const units = {
    'Marla': 225, 
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
            <span className="opacity-60">Measurement Tools</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Unit Converter</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Switch between Marlas, Kanals, Acres and Square Feet instantly with our precise property area calculation engine.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="bg-white rounded-[3rem] border border-[#DDD8CF] p-10 sm:p-16 shadow-[0_40px_100px_rgba(0,71,55,0.1)] text-center relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#F5F0E8] rounded-full blur-3xl -mr-20 -mt-20" />

          <div className="w-20 h-20 bg-[#004737] rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-xl group hover:scale-110 transition-transform">
            <ArrowLeftRight className="w-10 h-10 text-[#C8F55A]" />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-6 max-w-3xl mx-auto mb-16">
            <div className="flex-1 w-full group">
              <label className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-2 block text-left ml-4">INPUT VALUE</label>
              <input 
                type="number" 
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-16 px-8 text-2xl font-black font-syne bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] transition-all text-[#0D1B17]"
              />
            </div>
            
            <div className="flex-1 w-full">
              <label className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-2 block text-left ml-4">FROM UNIT</label>
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full h-16 px-6 text-xs font-black font-syne bg-white border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] cursor-pointer appearance-none text-[#3D5249] uppercase tracking-widest shadow-sm"
              >
                {Object.keys(units).map(u => <option key={u}>{u}</option>)}
              </select>
            </div>

            <div className="p-2 text-[#004737]">
              <ArrowLeftRight className="w-6 h-6 hidden lg:block opacity-20" />
              <div className="lg:hidden w-10 h-1 bg-[#C8F55A] rounded-full my-2" />
            </div>

            <div className="flex-1 w-full">
              <label className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-2 block text-left ml-4">TO UNIT</label>
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full h-16 px-6 text-xs font-black font-syne bg-white border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] cursor-pointer appearance-none text-[#3D5249] uppercase tracking-widest shadow-sm"
              >
                {Object.keys(units).map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="bg-[#004737] rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="text-[10px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em] mb-4 relative z-10">CONVERSION RESULT</div>
            <div className="text-4xl sm:text-6xl font-black font-syne relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {convert(value, fromUnit, toUnit).toLocaleString(undefined, { maximumFractionDigits: 4 })}
              <span className="text-xl sm:text-2xl text-[#C8F55A] font-black uppercase tracking-widest opacity-80">{toUnit}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C8F55A]/5 rounded-full blur-3xl group-hover:bg-[#C8F55A]/10 transition-all duration-700" />
          </div>
        </div>

        {/* Conversion Table Card */}
        <div className="mt-12 bg-white rounded-[2.5rem] border border-[#DDD8CF] overflow-hidden shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
          <div className="p-8 border-b border-[#F5F0E8] bg-[#F5F0E8]/30 flex items-center gap-4">
             <Scale className="w-5 h-5 text-[#004737]" />
             <h3 className="text-xs font-black font-syne text-[#0D1B17] uppercase tracking-[0.2em]">Regional Standards (Punjab Hub)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F5F0E8] bg-white">
                  <th className="px-8 py-5 text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">UNIT TYPE</th>
                  <th className="px-8 py-5 text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">MARLA</th>
                  <th className="px-8 py-5 text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">KANAL</th>
                  <th className="px-8 py-5 text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">SQ. FT.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F0E8]">
                <ConversionRow unit="1 MARLA" marla="1" kanal="0.05" sqft="225" />
                <ConversionRow unit="1 KANAL" marla="20" kanal="1" sqft="4,500" />
                <ConversionRow unit="1 ACRE" marla="160" kanal="8" sqft="36,000" />
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 bg-[#004737] rounded-[2rem] p-8 text-white flex gap-6 shadow-xl relative overflow-hidden">
          <div className="w-14 h-14 bg-[#C8F55A] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <Info className="w-7 h-7 text-[#004737]" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-inter text-[#A8C4BB] leading-relaxed">
              <span className="font-black font-syne text-white uppercase tracking-widest mr-2 text-[10px]">Note:</span> In Pakistan, Marla sizing varies. Modern urban societies (DHA/Bahria) use the <span className="text-white font-bold">225 sq. ft.</span> standard, while traditional rural areas may use the <span className="text-white font-bold">272.25 sq. ft.</span> measure.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  )
}

const ConversionRow = ({ unit, marla, kanal, sqft }: any) => (
  <tr className="hover:bg-[#F5F0E8]/30 transition-colors">
    <td className="px-8 py-5 text-sm font-black font-syne text-[#0D1B17] uppercase tracking-tight">{unit}</td>
    <td className="px-8 py-5 text-sm font-inter text-[#3D5249]">{marla}</td>
    <td className="px-8 py-5 text-sm font-inter text-[#3D5249]">{kanal}</td>
    <td className="px-8 py-5 text-sm font-inter font-bold text-[#004737]">{sqft}</td>
  </tr>
)

export default AreaUnitConverter
