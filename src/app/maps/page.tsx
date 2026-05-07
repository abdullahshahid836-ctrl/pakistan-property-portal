'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Map, Download, Search, ChevronRight, Compass, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const MapsPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
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
            <span className="opacity-60">Society Maps</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Approved Layouts</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            High-resolution, verified master plans for all major residential and commercial societies across Pakistan.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <h3 className="text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-6 px-2">Filter by City</h3>
              <div className="space-y-2">
                {['All Cities', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan'].map((city, idx) => (
                  <button 
                    key={idx} 
                    className={cn(
                      "w-full text-left px-5 py-3 rounded-2xl text-[11px] font-black font-syne uppercase tracking-wider transition-all",
                      idx === 0 ? "bg-[#004737] text-[#C8F55A] shadow-lg" : "text-[#3D5249] hover:bg-[#F5F0E8] border border-transparent"
                    )}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Maps Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 stagger-children">
              {[
                { name: 'DHA Lahore Phase 6', format: 'PDF', size: '2.4 MB' },
                { name: 'Bahria Town Karachi Precinct 1', format: 'JPG', size: '1.8 MB' },
                { name: 'DHA Islamabad Phase 2', format: 'PDF', size: '3.1 MB' },
                { name: 'Gulberg Residencia Block A', format: 'JPG', size: '1.2 MB' },
                { name: 'DHA City Karachi Sector 1', format: 'PDF', size: '4.5 MB' },
                { name: 'DHA Multan Sector A', format: 'PDF', size: '2.9 MB' },
              ].map((map, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] transition-all duration-500 group flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-500">
                      <Map className="w-7 h-7 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                    </div>
                    <div className="px-3 py-1.5 bg-green-50 text-green-700 text-[9px] font-black font-syne uppercase tracking-widest rounded-lg border border-green-100 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED
                    </div>
                  </div>
                  <h3 className="text-xl font-black font-syne text-[#0D1B17] mb-2 uppercase tracking-tight group-hover:text-[#004737] transition-colors">{map.name}</h3>
                  <p className="text-[10px] text-[#7A9088] font-black font-syne uppercase tracking-[0.2em] mb-8">
                    {map.format} ARCHIVE · {map.size}
                  </p>
                  <button className="flex items-center justify-center gap-3 w-full py-4 bg-[#F5F0E8] text-[#0D1B17] text-[10px] font-black font-syne uppercase tracking-widest rounded-2xl group-hover:bg-[#004737] group-hover:text-[#C8F55A] group-hover:shadow-lg transition-all mt-auto">
                    <Download className="w-4 h-4" /> Download Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapsPage
