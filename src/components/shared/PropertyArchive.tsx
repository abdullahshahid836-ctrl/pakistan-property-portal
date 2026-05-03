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
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">{title}</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A1A2E] mb-2">{title}</h1>
          <p className="text-sm text-[#4A5568]">{subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#1E6BFF]" /> Filter Results
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">City</label>
                  <select className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#1E6BFF]">
                    <option>All Cities</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">Price Range</label>
                  <select className="w-full h-10 px-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#1E6BFF]">
                    <option>Any Price</option>
                    <option>Below 50 Lac</option>
                    <option>50 Lac - 1 Crore</option>
                    <option>Above 1 Crore</option>
                  </select>
                </div>
                <button className="w-full py-3 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl hover:bg-[#1554CC] transition-all">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#4A5568] uppercase tracking-widest">
                {loading ? 'Searching...' : `Showing ${properties.length} Results`}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Sort By:</span>
                <select className="bg-transparent text-xs font-bold text-[#1E6BFF] focus:outline-none cursor-pointer">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              ) : properties.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-[#E5E7EB]">
                  <p className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">No properties found matching this category.</p>
                </div>
              ) : (
                properties.map((property) => (
                  <Link 
                    key={property.id}
                    href={`/property/${property.id}`}
                    className="group bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image 
                        src={(property.images || (property as any).property_images || [])[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'} 
                        alt={property.title || 'Property Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={cn(
                          "px-3 py-1 text-[10px] font-bold text-white rounded-lg shadow-lg",
                          property.purpose === 'Sale' ? "bg-[#1E6BFF]" : "bg-green-500"
                        )}>
                          FOR {(property.purpose || 'Sale').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-[10px] font-bold text-[#1E6BFF]">PKR</span>
                        <span className="text-xl font-black text-[#1A1A2E]">{property.priceLabel || property.price_label}</span>
                      </div>
                      <h3 className="font-bold text-[#1A1A2E] line-clamp-1 mb-1 group-hover:text-[#1E6BFF] transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest flex items-center gap-1 mb-4">
                        <MapPin className="w-3 h-3 text-[#1E6BFF]" /> {property.area}, {property.city}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-[#F3F4F6]">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-[#4A5568]" />
                          <span className="text-xs font-bold text-[#4A5568]">{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-[#4A5568]" />
                          <span className="text-xs font-bold text-[#4A5568]">{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Move className="w-4 h-4 text-[#4A5568]" />
                          <span className="text-xs font-bold text-[#4A5568]">{property.areaSize || property.area_size} {property.areaUnit || property.area_unit}</span>
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

