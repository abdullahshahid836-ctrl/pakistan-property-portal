'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RevealWrapper } from '@/components/shared/RevealWrapper'
import locationsData from '@/data/locations.json'

const PopularLocations = () => {
  const [activeType, setActiveType] = useState('Plots')
  const [activeCity, setActiveCity] = useState('Lahore')

  const types = ['Plots', 'Flats', 'Houses', 'Rent']
  const cities = ['Lahore', 'Karachi', 'Islamabad']

  return (
    <section className="py-16 sm:py-20 bg-[#F5F0E8] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <RevealWrapper className="text-center mb-10">
          <span className="pill-label">📍 DISCOVER</span>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0D1B17] mt-4 leading-tight">
            Popular Locations
          </h2>
          <p className="text-[#3D5249] text-base mt-4 max-w-xl mx-auto font-inter leading-relaxed">
            Discover the most sought-after housing societies in Pakistan's major cities
          </p>
        </RevealWrapper>

        {/* Filters */}
        <RevealWrapper className="flex flex-col items-center gap-4 mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {types.map(type => (
              <button key={type} onClick={() => setActiveType(type)}
                className={cn(
                  'px-5 py-2 text-sm font-bold font-syne rounded-xl transition-all duration-200 border',
                  activeType === type
                    ? 'bg-[#004737] text-[#C8F55A] border-[#004737]'
                    : 'bg-white text-[#3D5249] border-[#DDD8CF] hover:border-[#004737] hover:text-[#004737]'
                )}>
                {type}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {cities.map(city => (
              <button key={city} onClick={() => setActiveCity(city)}
                className={cn(
                  'px-5 py-1.5 text-xs font-bold font-syne rounded-xl transition-all duration-200 border uppercase tracking-wider',
                  activeCity === city
                    ? 'bg-[#0D1B17] text-[#F5F0E8] border-[#0D1B17]'
                    : 'bg-white text-[#7A9088] border-[#DDD8CF] hover:border-[#0D1B17] hover:text-[#0D1B17]'
                )}>
                {city}
              </button>
            ))}
          </div>
        </RevealWrapper>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((cityName, ci) => {
            const city = locationsData.cities.find(c => c.name === cityName)
            if (!city) return null
            return (
              <RevealWrapper key={cityName} delay={ci * 80}>
                <div className="bg-white rounded-2xl border border-[#DDD8CF] p-6 shadow-[0_2px_8px_rgba(0,71,55,0.06)] hover:shadow-[0_16px_40px_rgba(0,71,55,0.10)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-[#C8F55A]">
                    <h3 className="text-xs font-black font-syne uppercase tracking-[0.15em] text-[#004737]">
                      {cityName} SOCIETIES
                    </h3>
                    <span className="text-[10px] font-bold font-inter text-[#7A9088] bg-[#004737]/8 px-2 py-0.5 rounded-md">
                      TRENDING
                    </span>
                  </div>

                  <div className="space-y-0">
                    {city.areas.slice(0, 8).map((area, idx) => {
                      const counts = [487, 312, 256, 198, 143, 421, 367, 275]
                      return (
                        <Link key={idx}
                          href={`/search?city=${cityName}&area=${area}&type=${activeType}`}
                          className="flex items-center justify-between py-2.5 border-b border-[#DDD8CF] last:border-0 group transition-all">
                          <span className="text-sm font-inter text-[#3D5249] group-hover:text-[#004737] group-hover:font-medium transition-all">
                            {area}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#7A9088] bg-[#004737]/8 px-2 py-0.5 rounded-md group-hover:bg-[#004737] group-hover:text-[#C8F55A] transition-colors">
                            {counts[idx % counts.length]}+
                          </span>
                        </Link>
                      )
                    })}
                  </div>

                  <Link href={`/search?city=${cityName}`}
                    className="flex items-center justify-center gap-2 mt-5 py-3 text-xs font-bold font-syne text-[#004737] bg-[#004737]/8 hover:bg-[#004737] hover:text-[#C8F55A] rounded-xl transition-all">
                    View all in {cityName} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </RevealWrapper>
            )
          })}
        </div>

        {/* Popular Cities */}
        <RevealWrapper className="mt-16 text-center">
          <h3 className="font-syne font-bold text-lg sm:text-xl text-[#0D1B17] mb-6">
            Popular Cities to Buy Properties
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Lahore',     count: '24,139' },
              { name: 'Karachi',    count: '12,580' },
              { name: 'Islamabad',  count: '9,775' },
              { name: 'Rawalpindi', count: '4,093' },
              { name: 'Multan',     count: '1,736' },
              { name: 'Faisalabad', count: '996' },
              { name: 'Peshawar',   count: '648' },
              { name: 'Gujranwala', count: '1,270' },
            ].map(city => (
              <Link key={city.name} href={`/search?city=${city.name}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#DDD8CF] rounded-2xl text-sm font-inter text-[#3D5249] hover:border-[#004737] hover:text-[#004737] hover:bg-[#004737]/5 transition-all group">
                <MapPin className="w-3.5 h-3.5 text-[#7A9088] group-hover:text-[#004737] transition-colors" />
                {city.name}
                <span className="text-[10px] text-[#7A9088] font-bold">({city.count})</span>
              </Link>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default PopularLocations
