'use client'

import React from 'react'
import Link from 'next/link'
import { Building2, Home, Building, Warehouse, Map, Search, ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PropertyIndexPage = () => {
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
            <span className="opacity-60">Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Property Index</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            A comprehensive master directory of residential and commercial inventory across Pakistan's major real estate hubs.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 stagger-children">
          {[
            { title: 'Residential', icon: Home, count: '45,230', links: [
              { label: 'Houses', slug: 'House' }, 
              { label: 'Flats', slug: 'Flat' }, 
              { label: 'Lower Portions', slug: 'Lower Portion' }, 
              { label: 'Upper Portions', slug: 'Upper Portion' }, 
              { label: 'Farm Houses', slug: 'Farm House' }, 
              { label: 'Rooms', slug: 'Room' }
            ] },
            { title: 'Plots', icon: Map, count: '12,850', links: [
              { label: 'Residential Plots', slug: 'Plot' }, 
              { label: 'Commercial Plots', slug: 'Commercial Plot' }, 
              { label: 'Plot Files', slug: 'Plot File' }, 
              { label: 'Industrial Plots', slug: 'Industrial Plot' }, 
              { label: 'Agricultural Land', slug: 'Agricultural Land' }
            ] },
            { title: 'Commercial', icon: Building, count: '8,420', links: [
              { label: 'Offices', slug: 'Office' }, 
              { label: 'Shops', slug: 'Shop' }, 
              { label: 'Warehouses', slug: 'Warehouse' }, 
              { label: 'Factories', slug: 'Factory' }, 
              { label: 'Buildings', slug: 'Building' }
            ] },
          ].map((cat, idx) => (
            <div key={idx} className="bg-white rounded-[3rem] border border-[#DDD8CF] p-10 shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] transition-all duration-700 group">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-500">
                  <cat.icon className="w-8 h-8 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                </div>
                <div>
                  <h2 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">{cat.title}</h2>
                  <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mt-1">{cat.count} LISTINGS</p>
                </div>
              </div>
              <div className="space-y-4">
                {cat.links.map((link, lIdx) => (
                  <Link 
                    key={lIdx} 
                    href={`/search?type=${encodeURIComponent(link.slug)}`} 
                    className="flex items-center justify-between group/link py-3 border-b border-[#F5F0E8] last:border-0"
                  >
                    <span className="text-sm font-inter text-[#3D5249] group-hover/link:text-[#004737] group-hover/link:font-bold transition-all uppercase tracking-wide">{link.label}</span>
                    <div className="w-8 h-8 rounded-lg bg-[#F5F0E8] flex items-center justify-center group-hover/link:bg-[#004737] transition-all">
                       <ArrowRight className="w-3.5 h-3.5 text-[#004737] group-hover/link:text-[#C8F55A] transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PropertyIndexPage
