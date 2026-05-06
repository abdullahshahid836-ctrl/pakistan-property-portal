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

  // Handle both snake_case (Supabase) and camelCase (types)
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
    <div className="bg-white rounded-3xl border border-flecto-green/5 shadow-xl shadow-flecto-green/[0.02] hover:shadow-2xl hover:shadow-flecto-green/[0.05] transition-all duration-500 flex flex-col sm:flex-row overflow-hidden group">
      
      {/* Image Side */}
      <div className="sm:w-80 lg:w-96 h-64 sm:h-auto relative shrink-0 overflow-hidden">
        <Image 
          src={images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'} 
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="px-3 py-1.5 text-[10px] font-bold uppercase bg-flecto-green/90 text-flecto-cream rounded-full backdrop-blur-md shadow-sm font-inter tracking-widest">
            {property.type}
          </span>
          {isVerified && (
            <div className="bg-flecto-lime text-flecto-green px-3 py-1.5 text-[10px] font-bold rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-sm font-inter tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
            </div>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist()
          }}
          disabled={wishlistLoading}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm hover:bg-white transition-all duration-300 group/heart z-10 border border-flecto-green/5"
        >
          {wishlistLoading ? (
            <Loader2 className="w-4 h-4 text-flecto-green animate-spin" />
          ) : (
            <Heart className={cn("w-4.5 h-4.5 transition-all duration-300", isInWishlist ? "fill-red-500 text-red-500 scale-110" : "text-flecto-green group-hover/heart:text-red-500 group-hover/heart:scale-110")} />
          )}
        </button>

        {isFeatured && (
          <div className="absolute bottom-4 left-4 bg-flecto-lime text-flecto-green px-4 py-1.5 text-[10px] font-bold rounded-full shadow-lg font-inter tracking-[0.2em]">
            FEATURED
          </div>
        )}
      </div>

      {/* Info Side */}
      <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-flecto-green-light bg-flecto-cream px-3 py-1.5 rounded-full font-inter">
              FOR {property.purpose.toUpperCase()}
            </span>
            <div className="flex items-center gap-2 text-[11px] font-bold text-flecto-text-muted font-inter">
              <Eye className="w-4 h-4" />
              {views.toLocaleString()}
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xs font-bold text-flecto-text-muted font-inter uppercase tracking-widest">PKR</span>
            <span className="text-2xl sm:text-3xl font-bold text-flecto-green font-syne tracking-tight">
              {priceLabel}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-flecto-green mb-3 group-hover:text-flecto-green-light transition-colors line-clamp-2 font-syne leading-tight">
            {property.title}
          </h3>

          <div className="flex items-start gap-2 text-sm text-flecto-text-muted font-inter font-medium">
            <MapPin className="w-4 h-4 text-flecto-green shrink-0 mt-0.5" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-8 mt-8 pt-8 border-t border-flecto-green/5">
            {bedrooms > 0 && (
              <div className="flex items-center gap-2.5 text-sm font-bold text-flecto-green font-syne">
                <Bed className="w-5 h-5 text-flecto-green-light" />
                {bedrooms} <span className="text-flecto-text-muted font-medium font-inter">Beds</span>
              </div>
            )}
            {bathrooms > 0 && (
              <div className="flex items-center gap-2.5 text-sm font-bold text-flecto-green font-syne">
                <Bath className="w-5 h-5 text-flecto-green-light" />
                {bathrooms} <span className="text-flecto-text-muted font-medium font-inter">Baths</span>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-sm font-bold text-flecto-green font-syne">
              <Move className="w-5 h-5 text-flecto-green-light" />
              {areaSize} <span className="text-flecto-text-muted font-medium font-inter">{areaUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <Link 
              href={`/property/${property.id}`}
              className="flex-1 sm:flex-none px-8 py-4 text-xs font-bold text-flecto-green border border-flecto-green/10 rounded-full hover:bg-flecto-green hover:text-white transition-all duration-300 text-center font-syne uppercase tracking-widest"
            >
              Details
            </Link>
            <button className="flex-1 sm:flex-none px-8 py-4 text-xs font-bold btn-primary">
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCardHorizontal

