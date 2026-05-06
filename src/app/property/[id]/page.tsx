'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MapPin, Bed, Bath, Move, CheckCircle2, Phone, Mail, MessageCircle, Heart, Share2, ArrowLeft, ChevronRight, Star, Calendar, Eye, ShieldCheck, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Property, Agent } from '@/types'
import { formatPrice } from '@/lib/formatters'

import { useWishlist } from '@/hooks/useWishlist'

const PropertyDetailPage = () => {
  const params = useParams()
  const propertyId = params.id as string
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySent, setInquirySent] = useState(false)

  const { isSaved: isInWishlist, toggle: toggleWishlist, loading: wishlistLoading } = useWishlist(propertyId)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${propertyId}`)
        const data = await res.json()
        setProperty(data)
      } catch (err) {
        console.error('Failed to fetch property:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [propertyId])

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInquiryLoading(true)
    const formData = new FormData(e.currentTarget)
    const payload = {
      property_id: propertyId,
      agent_id: property.agent_id,
      sender_name: formData.get('name'),
      sender_phone: formData.get('phone'),
      sender_email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      await fetch('/api/email/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      setInquirySent(true)
    } catch (err) {
      alert('Failed to send inquiry. Please try again.')
    } finally {
      setInquiryLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-flecto-cream gap-4">
      <div className="w-12 h-12 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin" />
      <p className="text-sm font-bold text-flecto-green font-syne uppercase tracking-widest">Loading Property Details...</p>
    </div>
  )

  if (!property) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-flecto-cream p-4 text-center">
      <h2 className="text-3xl font-bold text-flecto-green font-syne mb-4">Property Not Found</h2>
      <p className="text-flecto-text-muted mb-8 font-inter">The property you are looking for might have been removed or is temporarily unavailable.</p>
      <Link href="/search" className="btn-primary px-8 py-4">Back to Search</Link>
    </div>
  )

  const agent = property.agents || {}
  const images = property.images || property.property_images || []

  return (
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-flecto-cream border-b border-flecto-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">
            <Link href="/" className="hover:text-flecto-green transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-flecto-green cursor-pointer uppercase">{property.city}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-flecto-green cursor-pointer uppercase">{property.area}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-flecto-green line-clamp-1 uppercase">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Gallery */}
            <div className="space-y-6">
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl shadow-flecto-green/10 group">
                <Image 
                  src={images[activeImage] || images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200'} 
                  alt={property.title || 'Property Image'}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  priority
                />
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className={cn(
                    "px-5 py-2 text-[10px] font-bold text-flecto-cream rounded-full shadow-lg backdrop-blur-md uppercase tracking-[0.2em] font-inter",
                    (property.purpose || 'Sale') === 'Sale' ? "bg-flecto-green/80" : "bg-green-700/80"
                  )}>
                    FOR {(property.purpose || 'Sale').toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-6 right-6 flex gap-3">
                  <button 
                    onClick={() => toggleWishlist()}
                    disabled={wishlistLoading}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 group/icon border border-flecto-green/5"
                  >
                    {wishlistLoading ? (
                      <Loader2 className="w-5 h-5 text-flecto-green animate-spin" />
                    ) : (
                      <Heart className={cn("w-5.5 h-5.5 transition-all duration-300", isInWishlist ? "fill-red-500 text-red-500 scale-110" : "text-flecto-green group-hover/icon:text-red-500 group-hover/icon:scale-110")} />
                    )}
                  </button>
                  <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 border border-flecto-green/5">
                    <Share2 className="w-5.5 h-5.5 text-flecto-green" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500 shrink-0",
                      activeImage === idx ? "border-flecto-green scale-95 shadow-xl" : "border-transparent hover:border-flecto-green/30"
                    )}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info Card */}
            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-8 sm:p-12 shadow-xl shadow-flecto-green/[0.02]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-10">
                <div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xs font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">PKR</span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-flecto-green font-syne tracking-tight">
                      {property.price_label || property.priceLabel}
                    </h2>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-flecto-green mb-4 font-syne leading-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-base text-flecto-text-muted font-inter font-medium">
                    <MapPin className="w-5 h-5 text-flecto-green-light" />
                    {property.address}
                  </div>
                </div>
                {property.is_verified && (
                  <div className="flex items-center gap-2.5 px-5 py-2.5 bg-flecto-lime/10 text-flecto-green text-xs font-bold rounded-full border border-flecto-lime/20 self-start font-inter tracking-widest uppercase">
                    <ShieldCheck className="w-4.5 h-4.5 text-flecto-green" /> Verified
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-flecto-cream rounded-[2rem] border border-flecto-green/5">
                <SpecItem icon={<Bed className="w-6 h-6" />} value={property.bedrooms} label="Beds" />
                <SpecItem icon={<Bath className="w-6 h-6" />} value={property.bathrooms} label="Baths" />
                <SpecItem icon={<Move className="w-6 h-6" />} value={property.area_size || property.areaSize} label={property.area_unit || property.areaUnit} />
                <SpecItem icon={<Eye className="w-6 h-6" />} value={property.views} label="Views" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-8 sm:p-12 shadow-xl shadow-flecto-green/[0.02]">
              <h3 className="text-2xl font-bold text-flecto-green mb-6 font-syne">About This Property</h3>
              <p className="text-flecto-text-muted text-base sm:text-lg leading-relaxed whitespace-pre-line font-inter font-medium">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-8 sm:p-12 shadow-xl shadow-flecto-green/[0.02]">
              <h3 className="text-2xl font-bold text-flecto-green mb-10 font-syne">Features & Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-10">
                {(property.features || []).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-flecto-cream flex items-center justify-center group-hover:bg-flecto-lime transition-all duration-300">
                      <CheckCircle2 className="w-4 h-4 text-flecto-green-light group-hover:text-flecto-green transition-all" />
                    </div>
                    <span className="text-base font-bold text-flecto-green font-syne">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            
            {/* Agent Card */}
            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-8 shadow-2xl shadow-flecto-green/[0.03] sticky top-28">
              <div className="flex items-center gap-5 mb-8">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-flecto-cream shadow-inner transform rotate-3">
                  <Image src={agent.photo_url || agent.photo || 'https://via.placeholder.com/100'} alt={agent.name || 'Agent Photo'} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-flecto-green font-syne">{agent.name || 'Portal Agent'}</h4>
                  <p className="text-xs text-flecto-text-muted font-bold uppercase tracking-widest font-inter mb-2">{agent.agency || 'Verified Partner'}</p>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-flecto-lime fill-flecto-lime" />
                    <span className="text-[11px] font-bold text-flecto-green font-inter">{agent.rating || 5.0} <span className="text-flecto-text-muted">({agent.review_count || agent.reviewCount || 0})</span></span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-3 w-full py-4 bg-flecto-green text-flecto-cream text-xs font-bold rounded-full shadow-xl shadow-flecto-green/20 hover:bg-flecto-green-light transition-all duration-300 font-syne uppercase tracking-widest">
                  <Phone className="w-4 h-4" /> Call Agent
                </a>
                <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 text-white text-xs font-bold rounded-full shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all duration-300 font-syne uppercase tracking-widest">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>

              <div className="h-px bg-flecto-green/5 mb-8" />

              <h5 className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-6 font-inter">Quick Inquiry</h5>
              {inquirySent ? (
                <div className="bg-flecto-lime/10 border border-flecto-lime/20 text-flecto-green p-8 rounded-[2rem] text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-flecto-green-light" />
                  <p className="text-sm font-bold font-syne uppercase tracking-widest mb-2">Sent Successfully!</p>
                  <p className="text-xs font-medium font-inter opacity-70">The agent will contact you shortly.</p>
                  <button 
                    onClick={() => setInquirySent(false)}
                    className="mt-6 text-[10px] font-bold text-flecto-green-light hover:text-flecto-green transition-colors uppercase tracking-widest font-inter"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleInquiry}>
                  <input name="name" type="text" required placeholder="Your Name" className="w-full h-12 px-6 text-xs bg-flecto-cream border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium" />
                  <input name="phone" type="tel" required placeholder="Phone Number" className="w-full h-12 px-6 text-xs bg-flecto-cream border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium" />
                  <input name="email" type="email" required placeholder="Email Address" className="w-full h-12 px-6 text-xs bg-flecto-cream border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium" />
                  <textarea name="message" required placeholder="Message" rows={4} className="w-full px-6 py-4 text-xs bg-flecto-cream border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 resize-none font-inter font-medium" defaultValue={`I'm interested in this property. Please contact me.`}></textarea>
                  <button type="submit" disabled={inquiryLoading} className="btn-primary w-full py-4 text-[11px]">
                    {inquiryLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SEND INQUIRY'}
                  </button>
                </form>
              )}
            </div>

            {/* Support Promo */}
            <div className="bg-flecto-green rounded-[2.5rem] p-10 text-flecto-cream overflow-hidden relative group shadow-2xl shadow-flecto-green/20">
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-3 font-syne tracking-tight">Need Help?</h4>
                <p className="text-sm text-flecto-cream/60 mb-8 leading-relaxed font-inter font-medium">Our property experts are here to help you find the perfect home in <span className="text-flecto-lime">{property.city}</span>.</p>
                <a 
                  href="https://wa.me/923001234567?text=Hi, I need help with a property on Pakistan Property Portal"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 text-xs font-bold text-flecto-green bg-flecto-lime px-8 py-4 rounded-full group-hover:scale-105 transition-transform duration-500 font-syne uppercase tracking-widest"
                >
                  Talk to Expert <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpecItem = ({ icon, value, label }: { icon: React.ReactNode, value: any, label: string }) => (
  <div className="flex flex-col items-center justify-center text-center group">
    <div className="text-flecto-green-light mb-3 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div className="text-lg font-bold text-flecto-green font-syne">{value || 0}</div>
    <div className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mt-1 font-inter">{label}</div>
  </div>
)

export default PropertyDetailPage

