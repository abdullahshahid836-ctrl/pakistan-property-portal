'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/shared/SectionHeader'
import locationsData from '@/data/locations.json'

const PopularLocations = () => {
  const [activeType, setActiveType] = useState('Plots')
  const [activeCity, setActiveCity] = useState('Lahore')

  const types = ['Plots', 'Flats', 'Houses', 'Rent']
  const cities = ['Lahore', 'Karachi', 'Islamabad']

  return (
    <section className="bg-transparent py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          heading="Popular Locations"
          sub="Discover the most sought-after housing societies in Pakistan's major cities"
        />

        {/* Filters */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 border",
                  activeType === type 
                    ? "bg-[#1E6BFF] text-white border-[#1E6BFF] shadow-sm" 
                    : "bg-white/60 backdrop-blur-md text-[#4A5568] border-white/20 hover:border-[#1E6BFF] hover:text-[#1E6BFF]"
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={cn(
                  "px-5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 border uppercase tracking-wider",
                  activeCity === city 
                    ? "bg-[#1A1A2E] text-white border-[#1A1A2E]" 
                    : "bg-white/60 backdrop-blur-md text-[#9CA3AF] border-white/20 hover:border-[#1A1A2E] hover:text-[#1A1A2E]"
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map(cityName => {
            const city = locationsData.cities.find(c => c.name === cityName)
            if (!city) return null
            
            return (
              <div key={cityName} className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-[#1E6BFF]/10">
                  <h3 className="text-sm font-bold text-[#1E6BFF] uppercase tracking-widest">
                    {cityName} SOCIETIES
                  </h3>
                  <span className="text-[10px] font-bold text-[#9CA3AF] bg-[#F8F9FA] px-2 py-0.5 rounded-md">
                    TRENDING
                  </span>
                </div>

                <div className="space-y-1">
                  {city.areas.slice(0, 8).map((area, idx) => {
                    const counts = [487, 312, 256, 198, 143, 421, 367, 275]
                    return (
                    <Link 
                      key={idx}
                      href={`/search?city=${cityName}&area=${area}&type=${activeType}`}
                      className="flex items-center justify-between py-2.5 group transition-all"
                    >
                      <span className="text-sm text-[#4A5568] group-hover:text-[#1E6BFF] group-hover:pl-1 transition-all">
                        {area}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#9CA3AF] bg-[#F8F9FA] px-2 py-0.5 rounded-md group-hover:bg-[#EBF2FF] group-hover:text-[#1E6BFF] transition-colors">
                        {counts[idx % counts.length]}+
                      </span>
                    </Link>
                    )
                  })}
                </div>

                <Link href={`/search?city=${cityName}`} className="flex items-center justify-center gap-2 mt-6 py-3 text-xs font-bold text-[#1E6BFF] bg-[#EBF2FF] hover:bg-[#1E6BFF] hover:text-white rounded-xl transition-all">
                  View all in {cityName} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Popular Cities Sub-section */}
        <div className="mt-16 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A2E] mb-6">
            Popular Cities to Buy Properties
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Lahore', count: '24,139' },
              { name: 'Karachi', count: '12,580' },
              { name: 'Islamabad', count: '9,775' },
              { name: 'Rawalpindi', count: '4,093' },
              { name: 'Multan', count: '1,736' },
              { name: 'Faisalabad', count: '996' },
              { name: 'Peshawar', count: '648' },
              { name: 'Gujranwala', count: '1,270' }
            ].map(city => (
              <Link 
                key={city.name} 
                href={`/search?city=${city.name}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] rounded-2xl text-sm font-medium text-[#4A5568] hover:border-[#1E6BFF] hover:text-[#1E6BFF] hover:shadow-md transition-all group"
              >
                <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#1E6BFF] transition-colors" />
                {city.name}
                <span className="text-[10px] text-[#9CA3AF] font-bold">({city.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularLocations
