'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Move, ChevronRight, Filter, Search, Loader2, Sparkles, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Property } from '@/types'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import SkeletonCard from '@/components/shared/SkeletonCard'
import Reveal from '@/components/shared/Reveal'

interface PropertyArchiveProps {
  title: string
  subtitle: string
  filterType?: string
  filterPurpose?: string
}

const PropertyArchive = ({ title, subtitle, filterType, filterPurpose }: PropertyArchiveProps) => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      const params = new URLSearchParams(searchParams.toString())
      if (filterType && !params.has('type')) params.append('type', filterType)
      if (filterPurpose && !params.has('purpose')) params.append('purpose', filterPurpose)
      
      try {
        const res = await fetch(`/api/properties?${params.toString()}`)
        const data = await res.json()
        setProperties(data.properties || [])
      } catch (err) {
        console.error('Failed to fetch properties:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams, filterType, filterPurpose])

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-24">
      {/* Cinematic Header */}
      <div className="bg-[#004737] pt-32 pb-24 relative overflow-hidden">
        {/* Animated background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal direction="down">
            <div className="flex items-center justify-center gap-2 text-[10px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em] mb-6">
              <Link href="/" className="hover:underline underline-offset-8 transition-all">CENTRAL</Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="opacity-60">{title.split(' ')[0]}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne text-white mb-6 uppercase tracking-tight leading-[0.9]">
               {title.split(' ').slice(0, 2).join(' ')} <br />
               <span className="text-[#C8F55A] italic">{title.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A8C4BB] font-inter max-w-2xl mx-auto font-medium opacity-80 leading-relaxed">
              {subtitle}
            </p>
          </Reveal>
        </div>

        {/* Dynamic Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              initial={{ d: "M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" }}
              animate={{ d: [
                "M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z",
                "M0 40L1440 40L1440 5C1200 35 960 -5 720 15C480 35 240 -5 0 5L0 40Z",
                "M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z"
              ]}}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              fill="#F5F0E8" 
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Advanced Filter Sidebar */}
          <div className="hidden lg:block space-y-8">
            <Reveal direction="right" delay={0.3}>
              <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_20px_50px_rgba(0,71,55,0.08)] sticky top-28 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5F0E8] rounded-full blur-3xl -mr-12 -mt-12" />
                
                <h3 className="text-[11px] font-black font-syne text-[#0D1B17] mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                  <div className="w-8 h-8 rounded-xl bg-[#004737] flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4 text-[#C8F55A]" />
                  </div> 
                  Filter Intel
                </h3>
                
                <div className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">METRO CITY</label>
                    <select className="w-full h-14 px-5 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[10px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:outline-none focus:border-[#004737] appearance-none cursor-pointer transition-all">
                      <option>All Locations</option>
                      <option>Lahore</option>
                      <option>Karachi</option>
                      <option>Islamabad</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">PRICE QUANTUM</label>
                    <select className="w-full h-14 px-5 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[10px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:outline-none focus:border-[#004737] appearance-none cursor-pointer transition-all">
                      <option>Any Range</option>
                      <option>Below 50 Lac</option>
                      <option>50 Lac - 1 Crore</option>
                      <option>Above 1 Crore</option>
                    </select>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-[#004737] text-[#C8F55A] text-[10px] font-black font-syne rounded-2xl hover:bg-black transition-all tracking-[0.3em] shadow-xl uppercase"
                  >
                    REFINE LIST
                  </motion.button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Listings Engine */}
          <div className="lg:col-span-3 space-y-10">
            <div className="flex items-center justify-between px-2">
              <Reveal direction="left" delay={0.4}>
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#004737] animate-pulse" />
                   <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em]">
                    {loading ? 'ANALYZING MARKET...' : `${properties.length} ASSETS DISCOVERED`}
                  </span>
                </div>
              </Reveal>
              
              <Reveal direction="right" delay={0.4}>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">SORT ENGINE:</span>
                  <select className="bg-transparent text-[10px] font-black font-syne text-[#004737] focus:outline-none cursor-pointer uppercase tracking-[0.1em] border-b-2 border-[#C8F55A] pb-1">
                    <option>NEWEST ENTRIES</option>
                    <option>PRICE: ASCENDING</option>
                    <option>PRICE: DESCENDING</option>
                  </select>
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array(4).fill(0).map((_, i) => (
                    <motion.div 
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <SkeletonCard />
                    </motion.div>
                  ))
                ) : properties.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full py-32 text-center bg-white rounded-[3.5rem] border-4 border-dashed border-[#DDD8CF]/50"
                  >
                    <div className="w-20 h-20 bg-[#F5F0E8] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <Search className="w-10 h-10 text-[#004737] opacity-20" />
                    </div>
                    <p className="text-sm font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">ZERO MATCHES FOUND IN SECTOR</p>
                    <Link href="/" className="inline-block mt-8 text-[10px] font-black font-syne text-[#004737] bg-[#C8F55A] px-10 py-4 rounded-2xl hover:bg-black hover:text-white transition-all shadow-xl uppercase tracking-widest">RETURN TO BASE</Link>
                  </motion.div>
                ) : (
                  properties.map((property, i) => (
                    <Reveal key={property.id} delay={i * 0.1} direction="up">
                      <motion.div whileHover={{ y: -12 }} className="h-full">
                        <Link 
                          href={`/property/${property.id}`}
                          className="group block bg-white rounded-[3rem] overflow-hidden border border-[#DDD8CF] shadow-[0_8px_24px_rgba(0,71,55,0.03)] hover:shadow-[0_40px_100px_rgba(0,71,55,0.15)] transition-all duration-700 h-full flex flex-col"
                        >
                          <div className="relative h-64 overflow-hidden">
                            <Image 
                              src={(property.images || (property as any).property_images || [])[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'} 
                              alt={property.title || 'Property Image'}
                              fill
                              sizes="(max-width: 768px) 100vw, 400px"
                              className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                            <div className="absolute top-6 left-6">
                              <span className={cn(
                                "px-5 py-2 text-[9px] font-black font-syne text-white rounded-2xl shadow-xl backdrop-blur-md uppercase tracking-[0.2em]",
                                property.purpose === 'Sale' ? "bg-[#004737]/80" : "bg-[#006B55]/80"
                              )}>
                                FOR {(property.purpose || 'Sale').toUpperCase()}
                              </span>
                            </div>
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#004737]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          </div>
                          
                          <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-[10px] font-black font-syne text-[#004737]/40 uppercase tracking-widest">PKR</span>
                              <span className="text-3xl font-black font-syne text-[#0D1B17] tracking-tight">
                                {property.priceLabel || property.price_label}
                              </span>
                            </div>
                            
                            <h3 className="font-syne font-black text-xl text-[#0D1B17] line-clamp-2 mb-4 group-hover:text-[#004737] transition-colors leading-tight uppercase tracking-tight">
                              {property.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 mb-8">
                               <MapPin className="w-4 h-4 text-[#004737] opacity-30" />
                               <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">{property.area}, {property.city}</span>
                            </div>
                            
                            <div className="mt-auto flex items-center gap-3 pt-8 border-t border-[#F5F0E8]">
                              <div className="flex-1 flex items-center gap-2 bg-[#F5F0E8] rounded-2xl px-4 py-3 group-hover:bg-[#004737]/5 transition-colors">
                                <Bed className="w-4 h-4 text-[#004737]" />
                                <span className="text-[11px] font-black font-syne text-[#3D5249]">{property.bedrooms}</span>
                              </div>
                              <div className="flex-1 flex items-center gap-2 bg-[#F5F0E8] rounded-2xl px-4 py-3 group-hover:bg-[#004737]/5 transition-colors">
                                <Bath className="w-4 h-4 text-[#004737]" />
                                <span className="text-[11px] font-black font-syne text-[#3D5249]">{property.bathrooms}</span>
                              </div>
                              <div className="flex-[1.5] flex items-center gap-2 bg-[#F5F0E8] rounded-2xl px-4 py-3 group-hover:bg-[#004737]/5 transition-colors">
                                <Move className="w-4 h-4 text-[#004737]" />
                                <span className="text-[10px] font-black font-syne text-[#3D5249] uppercase tracking-tighter truncate">
                                  {property.areaSize || property.area_size} {property.areaUnit || property.area_unit}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </Reveal>
                  )))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyArchive
