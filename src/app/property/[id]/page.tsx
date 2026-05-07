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
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-[#004737] animate-spin" />
        <span className="font-syne font-bold text-[#004737] tracking-widest text-xs uppercase">Loading Property...</span>
      </div>
    </div>
  )

  if (!property) return <div className="p-20 text-center font-syne text-[#0D1B17]">Property not found</div>

  const agent = property.agents || {}
  const images = property.images || property.property_images || []

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      {/* Header / Breadcrumb Bar */}
      <div className="bg-[#004737] text-white pt-24 pb-8 overflow-hidden relative">
         {/* Dot grid texture */}
         <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">{property.city}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">{property.area}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white line-clamp-1">{property.title}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne leading-tight mb-4">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-[#A8C4BB] font-inter">
                <MapPin className="w-4 h-4 text-[#C8F55A]" />
                {property.address}
              </div>
            </div>
            <div className="flex items-baseline gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-6 py-4 rounded-[2rem]">
              <span className="text-xs font-black font-syne text-[#C8F55A] uppercase">PKR</span>
              <span className="text-3xl sm:text-4xl font-black font-syne">
                {property.price_label || property.priceLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative h-[300px] sm:h-[450px] lg:h-[550px] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,71,55,0.15)] group border-4 border-white">
                <Image 
                  src={images[activeImage] || images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200'} 
                  alt={property.title || 'Property Image'}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className={cn(
                    "px-5 py-2 text-[10px] font-black font-syne text-white rounded-2xl shadow-xl backdrop-blur-md uppercase tracking-widest",
                    (property.purpose || 'Sale') === 'Sale' ? "bg-[#004737]/80" : "bg-[#006B55]/80"
                  )}>
                    FOR {(property.purpose || 'Sale').toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-6 right-6 flex gap-3">
                  <button 
                    onClick={() => toggleWishlist()}
                    disabled={wishlistLoading}
                    className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white transition-all group/icon"
                  >
                    {wishlistLoading ? (
                      <Loader2 className="w-5 h-5 text-[#004737] animate-spin" />
                    ) : (
                      <Heart className={cn("w-5 h-5 transition-colors", isInWishlist ? "fill-red-500 text-red-500" : "text-[#4A5568] group-hover/icon:text-red-500")} />
                    )}
                  </button>
                  <button className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white transition-all">
                    <Share2 className="w-5 h-5 text-[#4A5568]" />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative h-24 w-32 shrink-0 rounded-2xl overflow-hidden border-4 transition-all duration-300",
                      activeImage === idx ? "border-[#004737] scale-105 shadow-lg" : "border-white hover:border-[#004737]/30"
                    )}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill sizes="128px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <SpecChip icon={<Bed className="w-5 h-5" />} value={property.bedrooms} label="Bedrooms" />
              <SpecChip icon={<Bath className="w-5 h-5" />} value={property.bathrooms} label="Bathrooms" />
              <SpecChip icon={<Move className="w-5 h-5" />} value={property.area_size || property.areaSize} label={property.area_unit || property.areaUnit} />
              <SpecChip icon={<Eye className="w-5 h-5" />} value={property.views} label="Total Views" />
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 sm:p-12 shadow-[0_4px_12px_rgba(0,71,55,0.04)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-[#004737] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#C8F55A]" />
                </div>
                <h3 className="text-xl font-black font-syne text-[#0D1B17]">About This Property</h3>
              </div>
              <p className="text-[#3D5249] text-base sm:text-lg leading-relaxed whitespace-pre-line font-inter">
                {property.description}
              </p>
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 sm:p-12 shadow-[0_4px_12px_rgba(0,71,55,0.04)]">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-2xl bg-[#004737] flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#C8F55A]" />
                </div>
                <h3 className="text-xl font-black font-syne text-[#0D1B17]">Features & Amenities</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                {(property.features || []).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-xl bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-300">
                      <CheckCircle2 className="w-4 h-4 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                    </div>
                    <span className="text-sm font-bold font-syne text-[#3D5249] group-hover:text-[#0D1B17] transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Agent Contact Card */}
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_20px_50px_rgba(0,71,55,0.12)] sticky top-24">
              <div className="flex items-center gap-5 mb-8">
                <div className="relative w-20 h-20 rounded-[1.5rem] overflow-hidden border-4 border-[#F5F0E8]">
                  <Image src={agent.photo_url || agent.photo || 'https://via.placeholder.com/100'} alt={agent.name || 'Agent Photo'} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <h4 className="font-black font-syne text-[#0D1B17] text-lg leading-tight mb-1">{agent.name || 'Portal Agent'}</h4>
                  <p className="text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-widest">{agent.agency || 'Verified Partner'}</p>
                  <div className="flex items-center gap-1.5 mt-2 bg-[#F5F0E8] w-fit px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-[#004737] fill-[#004737]" />
                    <span className="text-[10px] font-black font-syne text-[#004737]">{agent.rating || 5.0} · {agent.review_count || 0}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <a href={`tel:${agent.phone}`} className="flex flex-col items-center justify-center gap-2 h-20 bg-[#004737] text-[#C8F55A] rounded-2xl hover:bg-[#003329] transition-all group">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black font-syne uppercase tracking-wider">Call Agent</span>
                </a>
                <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" className="flex flex-col items-center justify-center gap-2 h-20 bg-[#006B55] text-white rounded-2xl hover:bg-[#005544] transition-all group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black font-syne uppercase tracking-wider">WhatsApp</span>
                </a>
              </div>

              <div className="h-px bg-[#DDD8CF] mb-8" />

              <h5 className="text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-6">Quick Inquiry</h5>
              {inquirySent ? (
                <div className="bg-[#004737] text-white p-8 rounded-[1.5rem] text-center">
                  <div className="w-12 h-12 bg-[#C8F55A] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#004737]" />
                  </div>
                  <p className="text-sm font-black font-syne uppercase tracking-wider">Message Sent!</p>
                  <p className="text-[11px] mt-2 text-[#A8C4BB] font-inter">The agent will contact you soon.</p>
                  <button 
                    onClick={() => setInquirySent(false)}
                    className="mt-6 text-[10px] font-black font-syne text-[#C8F55A] hover:underline underline-offset-4 uppercase"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleInquiry}>
                  <div className="space-y-3">
                    <input name="name" type="text" required placeholder="Your Full Name" className="w-full h-12 px-5 text-sm bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter" />
                    <input name="phone" type="tel" required placeholder="Phone Number" className="w-full h-12 px-5 text-sm bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter" />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full h-12 px-5 text-sm bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter" />
                    <textarea name="message" required placeholder="Your Message..." rows={4} className="w-full px-5 py-4 text-sm bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter resize-none" defaultValue={`I'm interested in ${property.title}. Please contact me.`}></textarea>
                  </div>
                  <button type="submit" disabled={inquiryLoading} className="w-full py-4.5 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 uppercase tracking-[0.1em] h-14">
                    {inquiryLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEND ENQUIRY'}
                  </button>
                </form>
              )}
            </div>

            {/* Expert Support Card */}
            <div className="bg-[#004737] rounded-[2.5rem] p-10 text-white overflow-hidden relative group">
              {/* Dot grid */}
              <div className="absolute inset-0 opacity-[0.05]" style={{
                backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />
              
              <div className="relative z-10">
                <h4 className="text-2xl font-black font-syne mb-3">Need Expert Advice?</h4>
                <p className="text-sm text-[#A8C4BB] mb-8 leading-relaxed font-inter">Our specialized consultants are here to guide you through the process in {property.city}.</p>
                <a 
                  href="https://wa.me/923001234567"
                  target="_blank"
                  className="flex items-center justify-center gap-3 text-xs font-black font-syne text-[#004737] bg-[#C8F55A] px-6 py-4 rounded-2xl group-hover:scale-105 transition-all shadow-[0_8px_30px_rgba(200,245,90,0.3)] uppercase tracking-wider"
                >
                  <MessageCircle className="w-5 h-5" /> CHAT WITH EXPERT
                </a>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#C8F55A]/10 rounded-full blur-[60px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpecChip = ({ icon, value, label }: { icon: React.ReactNode, value: any, label: string }) => (
  <div className="bg-white border border-[#DDD8CF] rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-[0_2px_8px_rgba(0,71,55,0.04)] hover:shadow-lg transition-all duration-300">
    <div className="text-[#004737] mb-2">{icon}</div>
    <div className="text-lg font-black font-syne text-[#0D1B17]">{value || 0}</div>
    <div className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.1em] mt-1">{label}</div>
  </div>
)

export default PropertyDetailPage
