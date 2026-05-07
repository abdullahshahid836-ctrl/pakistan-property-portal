'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Reveal from '@/components/shared/Reveal'
import locationsData from '@/data/locations.json'

const PopularLocations = () => {
  const [activeType, setActiveType] = useState('Plots')
  const [activeCity, setActiveCity] = useState('Lahore')

  const types = ['Plots', 'Flats', 'Houses', 'Rent']
  const cities = ['Lahore', 'Karachi', 'Islamabad']

  return (
    <section className="py-16 sm:py-32 bg-[#F5F0E8] relative z-10 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] -mr-64 -mt-64 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <Reveal direction="up">
            <div className="flex justify-center mb-6">
               <span className="pill-label bg-[#004737] text-[#C8F55A] shadow-xl px-8 py-2">MARKET REACH</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl text-[#0D1B17] uppercase tracking-tight leading-none mb-6">
              Prime <br />
              <span className="text-[#004737] italic">Destinations.</span>
            </h2>
            <p className="text-[#3D5249] text-base sm:text-lg max-w-xl mx-auto font-inter font-medium opacity-60 leading-relaxed">
              Discover localized opportunities in the most high-growth residential sectors across Pakistan.
            </p>
          </Reveal>
        </div>

        {/* High-Fidelity Filter System */}
        <Reveal direction="up" delay={0.4} className="flex flex-col items-center gap-6 mb-16">
          <div className="bg-white p-2 rounded-[2rem] border border-[#DDD8CF] shadow-xl flex flex-wrap justify-center sm:flex-nowrap gap-1">
            {types.map(type => (
              <button 
                key={type} 
                onClick={() => setActiveType(type)}
                className={cn(
                  'px-6 sm:px-8 py-3 text-[9px] sm:text-[10px] font-black font-syne uppercase tracking-widest rounded-2xl transition-all duration-500 relative overflow-hidden',
                  activeType === type
                    ? 'bg-[#004737] text-[#C8F55A] shadow-lg'
                    : 'text-[#7A9088] hover:bg-[#F5F0E8]'
                )}
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            {cities.map(city => (
              <button 
                key={city} 
                onClick={() => setActiveCity(city)}
                className={cn(
                  'px-6 py-2 text-[9px] font-black font-syne uppercase tracking-[0.2em] transition-all duration-300 border-b-4',
                  activeCity === city
                    ? 'border-[#004737] text-[#0D1B17]'
                    : 'border-transparent text-[#7A9088] opacity-50 hover:opacity-100'
                )}
              >
                {city}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Cinematic List Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          <AnimatePresence mode="wait">
            {cities.map((cityName, ci) => {
              const city = locationsData.cities.find(c => c.name === cityName)
              if (!city || (cityName !== activeCity && activeCity !== 'All')) return null
              
              return (
                <motion.div 
                  key={cityName}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
                  className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {city.areas.slice(0, 12).map((area, idx) => {
                    const counts = [487, 312, 256, 198, 143, 421, 367, 275]
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="group"
                      >
                        <Link href={`/search?city=${cityName}&area=${area}&type=${activeType}`}
                          className="flex flex-col p-5 sm:p-6 bg-white rounded-[1.5rem] border border-[#DDD8CF] shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,71,55,0.08)] hover:border-[#004737]/20 transition-all duration-500 h-full overflow-hidden relative"
                        >
                          <div className="flex items-center justify-between mb-4">
                             <div className="w-10 h-10 rounded-xl bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-500">
                                <MapPin className="w-5 h-5 text-[#004737] group-hover:text-[#C8F55A]" />
                             </div>
                             <div className="text-[10px] font-black font-mono text-[#004737]/30 group-hover:text-[#004737] transition-colors">
                                #{idx + 1}
                             </div>
                          </div>
                          
                          <h3 className="text-lg sm:text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight group-hover:text-[#004737] transition-colors mb-2 leading-tight break-words">
                            {area}
                          </h3>
                          <p className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-widest opacity-60">
                             {cityName}
                          </p>

                          <div className="mt-6 pt-4 border-t border-[#F5F0E8] flex items-center justify-between">
                             <span className="text-[10px] font-black font-syne text-[#004737] bg-[#C8F55A] px-2.5 py-1 rounded-lg">
                                {counts[idx % counts.length]}+ LISTINGS
                             </span>
                             <div className="w-6 h-6 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#004737] opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                                <ArrowRight className="w-3 h-3" />
                             </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Global Network Section */}
        <Reveal direction="up" className="mt-24 pt-20 border-t border-[#DDD8CF] text-center">
          <div className="flex justify-center items-center gap-2 mb-8">
             <TrendingUp className="w-5 h-5 text-[#004737]" />
             <h3 className="font-syne font-black text-xl text-[#0D1B17] uppercase tracking-tight">
               National Footprint
             </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Lahore',     count: '24,139' },
              { name: 'Karachi',    count: '12,580' },
              { name: 'Islamabad',  count: '9,775' },
              { name: 'Rawalpindi', count: '4,093' },
              { name: 'Multan',     count: '1,736' },
              { name: 'Faisalabad', count: '996' },
              { name: 'Peshawar',   count: '648' },
              { name: 'Gujranwala', count: '1,270' },
            ].map((city, i) => (
              <motion.div key={city.name} whileHover={{ scale: 1.1, rotate: 2 }}>
                <Link href={`/search?city=${city.name}`}
                  className="flex items-center gap-3 px-6 py-3 bg-white border border-[#DDD8CF] rounded-2xl text-[10px] font-black font-syne text-[#0D1B17] uppercase tracking-widest hover:border-[#004737] hover:bg-[#004737] hover:text-[#C8F55A] transition-all duration-500 shadow-sm"
                >
                  {city.name}
                  <span className="opacity-40 text-[8px]">{city.count}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default PopularLocations
