'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Move, ChevronRight, Filter, Search, Loader2 } from 'lucide-react'
import { Property } from '@/types'
import { formatPrice } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import SkeletonCard from '@/components/shared/SkeletonCard'

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
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      <div className="bg-[#004737] text-[#F5F0E8] relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex items-center gap-1.5 text-[11px] font-bold font-syne text-[#C8F55A] uppercase tracking-[0.15em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-70">{title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-syne text-white mb-4">{title}</h1>
          <p className="text-base sm:text-lg text-[#A8C4BB] font-inter max-w-2xl">{subtitle}</p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Filters Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-3xl border border-[#DDD8CF] p-6 shadow-[0_2px_8px_rgba(0,71,55,0.06)] sticky top-24">
              <h3 className="text-sm font-bold font-syne text-[#0D1B17] mb-5 flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#004737]" /> Filter Results
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-bold font-syne text-[#7A9088] uppercase tracking-[0.12em] block mb-2">City</label>
                  <select className="w-full h-11 px-4 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-xl text-xs font-inter focus:outline-none focus:border-[#004737] appearance-none cursor-pointer">
                    <option>All Cities</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold font-syne text-[#7A9088] uppercase tracking-[0.12em] block mb-2">Price Range</label>
                  <select className="w-full h-11 px-4 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-xl text-xs font-inter focus:outline-none focus:border-[#004737] appearance-none cursor-pointer">
                    <option>Any Price</option>
                    <option>Below 50 Lac</option>
                    <option>50 Lac - 1 Crore</option>
                    <option>Above 1 Crore</option>
                  </select>
                </div>
                <button className="w-full py-3.5 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-xl hover:bg-[#003329] transition-all tracking-wider">
                  APPLY FILTERS
                </button>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold font-syne text-[#7A9088] uppercase tracking-[0.15em]">
                {loading ? 'SEARCHING...' : `${properties.length} PROPERTIES FOUND`}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-syne text-[#7A9088] uppercase tracking-widest">SORT:</span>
                <select className="bg-transparent text-[11px] font-bold font-syne text-[#004737] focus:outline-none cursor-pointer uppercase tracking-wider">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-children">
              {loading ? (
                Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              ) : properties.length === 0 ? (
                <div className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-[#DDD8CF]">
                  <div className="w-16 h-16 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-[#004737]/30" />
                  </div>
                  <p className="text-sm font-bold font-syne text-[#7A9088] uppercase tracking-widest">No properties found matching this category.</p>
                  <Link href="/" className="inline-block mt-6 text-xs font-bold font-syne text-[#004737] hover:underline underline-offset-4">GO BACK HOME</Link>
                </div>
              ) : (
                properties.map((property) => (
                  <Link 
                    key={property.id}
                    href={`/property/${property.id}`}
                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#DDD8CF] shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] hover:-translate-y-1.5 transition-all duration-500"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <Image 
                        src={(property.images || (property as any).property_images || [])[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'} 
                        alt={property.title || 'Property Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute top-5 left-5">
                        <span className={cn(
                          "px-4 py-1.5 text-[10px] font-black font-syne text-white rounded-xl shadow-lg backdrop-blur-md uppercase tracking-[0.1em]",
                          property.purpose === 'Sale' ? "bg-[#004737]/80" : "bg-[#006B55]/80"
                        )}>
                          FOR {(property.purpose || 'Sale').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xs font-black font-syne text-[#004737]/50 uppercase">PKR</span>
                        <span className="text-2xl font-black font-syne text-[#0D1B17] leading-none">
                          {property.priceLabel || property.price_label}
                        </span>
                      </div>
                      <h3 className="font-syne font-bold text-lg text-[#0D1B17] line-clamp-2 mb-3 group-hover:text-[#004737] transition-colors leading-snug">
                        {property.title}
                      </h3>
                      <p className="text-[11px] text-[#7A9088] font-bold font-syne uppercase tracking-wider flex items-center gap-1.5 mb-6">
                        <MapPin className="w-3.5 h-3.5 text-[#004737]" /> {property.area}, {property.city}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-6 border-t border-[#F5F0E8]">
                        <div className="flex items-center gap-2 bg-[#F5F0E8] rounded-xl px-3 py-2">
                          <Bed className="w-4 h-4 text-[#004737]" />
                          <span className="text-xs font-bold font-syne text-[#3D5249]">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#F5F0E8] rounded-xl px-3 py-2">
                          <Bath className="w-4 h-4 text-[#004737]" />
                          <span className="text-xs font-bold font-syne text-[#3D5249]">{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#F5F0E8] rounded-xl px-3 py-2">
                          <Move className="w-4 h-4 text-[#004737]" />
                          <span className="text-xs font-bold font-syne text-[#3D5249]">{property.areaSize || property.area_size} {property.areaUnit || property.area_unit}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyArchive
