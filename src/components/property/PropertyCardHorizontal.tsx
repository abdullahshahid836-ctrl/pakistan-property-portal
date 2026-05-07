'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Move, Heart, CheckCircle2, Eye, Loader2 } from 'lucide-react'
import { Property } from '@/types'
import { formatPrice } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/hooks/useWishlist'

interface PropertyCardHorizontalProps {
  property: Property
}

const PropertyCardHorizontal: React.FC<PropertyCardHorizontalProps> = ({ property }) => {
  const { isSaved: isInWishlist, toggle: toggleWishlist, loading: wishlistLoading } = useWishlist(property.id)

  const images = property.images || (property as any).property_images || []
  const bedrooms = property.bedrooms ?? (property as any).beds ?? 0
  const bathrooms = property.bathrooms ?? (property as any).baths ?? 0
  const areaSize = property.areaSize ?? (property as any).area_size ?? 0
  const areaUnit = property.areaUnit ?? (property as any).area_unit ?? 'Marla'
  const views = property.views ?? (property as any).view_count ?? 0
  const price = property.price ?? 0
  const priceLabel = property.priceLabel ?? (property as any).price_label ?? formatPrice(price)
  const isVerified = property.isVerified ?? (property as any).is_verified ?? false
  const isFeatured = property.isFeatured ?? (property as any).is_featured ?? false

  return (
    <div className="bg-white rounded-2xl border border-[#DDD8CF] shadow-[0_2px_8px_rgba(0,71,55,0.06)] hover:shadow-[0_16px_40px_rgba(0,71,55,0.1)] hover:border-[#004737]/15 hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row mb-6 overflow-hidden group">
      
      {/* Image Side */}
      <div className="sm:w-72 lg:w-80 h-56 sm:h-auto relative shrink-0 overflow-hidden">
        <Image 
          src={images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'} 
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-3 py-1 text-[10px] font-bold font-syne uppercase bg-[#004737]/90 text-[#F5F0E8] rounded-lg backdrop-blur-sm shadow-sm">
            {property.type}
          </span>
          {isVerified && (
            <div className="bg-[#C8F55A]/90 text-[#004737] px-3 py-1 text-[10px] font-bold font-syne rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow-sm border border-[#004737]/10">
              <CheckCircle2 className="w-3 h-3" /> VERIFIED
            </div>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist()
          }}
          disabled={wishlistLoading}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors group/heart z-10"
        >
          {wishlistLoading ? (
            <Loader2 className="w-4 h-4 text-[#004737] animate-spin" />
          ) : (
            <Heart className={cn("w-4 h-4 transition-colors", isInWishlist ? "fill-red-500 text-red-500" : "text-[#4A5568] group-hover/heart:text-red-500")} />
          )}
        </button>

        {isFeatured && (
          <div className="absolute bottom-3 left-3 bg-[#004737] text-[#C8F55A] px-3 py-1 text-[10px] font-bold font-syne rounded-lg shadow-sm">
            FEATURED
          </div>
        )}
      </div>

      {/* Info Side */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold font-syne uppercase tracking-widest text-[#7A9088] bg-[#F5F0E8] px-2 py-0.5 rounded-md">
              FOR {property.purpose.toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#7A9088] font-inter">
              <Eye className="w-3.5 h-3.5" />
              {views.toLocaleString()}
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xs font-semibold text-[#7A9088] font-inter">PKR</span>
            <span className="text-xl sm:text-2xl font-black text-[#0D1B17] font-syne">
              {priceLabel}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-[#0D1B17] font-syne mb-2 group-hover:text-[#004737] transition-colors line-clamp-2">
            {property.title}
          </h3>

          <div className="flex items-start gap-1.5 text-xs text-[#7A9088] font-inter">
            <MapPin className="w-3.5 h-3.5 text-[#004737] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mt-5 pt-5 border-t border-[#F5F0E8]">
            <div className="bg-[#F5F0E8] rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-[#3D5249] font-inter">
              <Bed className="w-4 h-4 text-[#004737]" />
              {bedrooms} <span className="hidden lg:inline text-[#7A9088] font-normal">Beds</span>
            </div>
            <div className="bg-[#F5F0E8] rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-[#3D5249] font-inter">
              <Bath className="w-4 h-4 text-[#004737]" />
              {bathrooms} <span className="hidden lg:inline text-[#7A9088] font-normal">Baths</span>
            </div>
            <div className="bg-[#F5F0E8] rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-[#3D5249] font-inter">
              <Move className="w-4 h-4 text-[#004737]" />
              {areaSize} {areaUnit}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <Link 
              href={`/property/${property.id}`}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold font-syne text-[#004737] border-2 border-[#004737] rounded-xl hover:bg-[#004737] hover:text-[#C8F55A] transition-all text-center"
            >
              Details
            </Link>
            <button className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold font-syne text-[#004737] bg-[#C8F55A] rounded-xl hover:bg-[#B8E84A] transition-all shadow-[0_2px_8px_rgba(200,245,90,0.3)]">
              Inquire
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCardHorizontal
