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
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5 pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
            <Link href="/" className="hover:text-flecto-green transition-colors">Portfolio</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-flecto-green-light">{title}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-flecto-green font-syne tracking-tight mb-4">{title}</h1>
          <p className="text-base text-flecto-text-muted font-inter font-medium max-w-2xl">{subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-8 shadow-2xl shadow-flecto-green/[0.03]">
              <h3 className="text-xs font-bold text-flecto-green mb-8 flex items-center gap-3 font-syne uppercase tracking-widest">
                <Filter className="w-4 h-4 text-flecto-lime" /> Parameters
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] block mb-3 font-inter">Metropolitan Area</label>
                  <select className="w-full h-12 px-4 bg-flecto-cream border border-flecto-green/5 rounded-xl text-[10px] font-bold text-flecto-green uppercase tracking-widest outline-none focus:border-flecto-green/20">
                    <option>All Jurisdictions</option>
                    <option>Lahore</option>
                    <option>Karachi</option>
                    <option>Islamabad</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] block mb-3 font-inter">Capital Allocation</label>
                  <select className="w-full h-12 px-4 bg-flecto-cream border border-flecto-green/5 rounded-xl text-[10px] font-bold text-flecto-green uppercase tracking-widest outline-none focus:border-flecto-green/20">
                    <option>Flexible Budget</option>
                    <option>Below 50 Lac</option>
                    <option>50 Lac - 1 Crore</option>
                    <option>Above 1 Crore</option>
                  </select>
                </div>
                <button className="w-full py-4 bg-flecto-green text-flecto-cream text-[10px] font-bold rounded-full hover:bg-flecto-green-light transition-all duration-500 shadow-xl shadow-flecto-green/10 font-syne uppercase tracking-widest">
                  Refine Search
                </button>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-9 space-y-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">
                {loading ? 'Analyzing Market...' : `${properties.length} Verified Assets Found`}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold text-flecto-text-muted uppercase tracking-widest font-inter">Sortage:</span>
                <select className="bg-transparent text-[9px] font-bold text-flecto-green uppercase tracking-widest outline-none cursor-pointer font-syne">
                  <option>Recent Listings</option>
                  <option>Valuation: Ascending</option>
                  <option>Valuation: Descending</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading ? (
                Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              ) : properties.length === 0 ? (
                <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-flecto-green/5 shadow-inner">
                  <Search className="w-16 h-16 text-flecto-lime mx-auto mb-6 opacity-30" />
                  <p className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">No strategic assets match your current parameters.</p>
                </div>
              ) : (
                properties.map((property) => (
                  <Link 
                    key={property.id}
                    href={`/property/${property.id}`}
                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-flecto-green/5 shadow-2xl shadow-flecto-green/[0.03] hover:shadow-flecto-green/[0.08] transition-all duration-700"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image 
                        src={(property.images || (property as any).property_images || [])[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'} 
                        alt={property.title || 'Property Image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute top-5 left-5">
                        <span className={cn(
                          "px-4 py-1.5 text-[8px] font-bold text-flecto-green rounded-full shadow-xl backdrop-blur-md border border-flecto-lime/20",
                          property.purpose === 'Sale' ? "bg-flecto-lime/90" : "bg-white/90"
                        )}>
                          FOR {(property.purpose || 'Sale').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span className="text-[10px] font-bold text-flecto-green-light font-inter">PKR</span>
                        <span className="text-2xl font-bold text-flecto-green font-syne">{property.priceLabel || property.price_label}</span>
                      </div>
                      <h3 className="text-lg font-bold text-flecto-green line-clamp-1 mb-2 group-hover:text-flecto-green-light transition-colors font-syne uppercase tracking-tight">
                        {property.title}
                      </h3>
                      <p className="text-[10px] text-flecto-text-muted font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-6 font-inter">
                        <MapPin className="w-3.5 h-3.5 text-flecto-lime" /> {property.area}, {property.city}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-flecto-green/5">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Bed className="w-4 h-4 text-flecto-green-light" />
                            <span className="text-xs font-bold text-flecto-green font-inter">{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath className="w-4 h-4 text-flecto-green-light" />
                            <span className="text-xs font-bold text-flecto-green font-inter">{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Move className="w-4 h-4 text-flecto-green-light" />
                            <span className="text-xs font-bold text-flecto-green font-inter">{property.areaSize || property.area_size} {property.areaUnit || property.area_unit}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-flecto-lime opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
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

