'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MapPin, Bed, Bath, Move, CheckCircle2, Phone, Mail, MessageCircle, Heart, Share2, ArrowLeft, ChevronRight, Star, Calendar, Eye, ShieldCheck, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Property, Agent } from '@/types'
import { formatPrice } from '@/lib/formatters'

const PropertyDetailPage = () => {
  const params = useParams()
  const propertyId = params.id as string
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySent, setInquirySent] = useState(false)

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
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <Loader2 className="w-10 h-10 text-[#1E6BFF] animate-spin" />
    </div>
  )

  if (!property) return <div className="p-20 text-center">Property not found</div>

  const agent = property.agents || {}

  const images = property.images || property.property_images || []

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-[#1E6BFF] cursor-pointer">{property.city}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-[#1E6BFF] cursor-pointer">{property.area}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E] line-clamp-1">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative h-[300px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-card group">
                <Image 
                  src={images[activeImage] || images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200'} 
                  alt={property.title || 'Property Image'}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={cn(
                    "px-4 py-1.5 text-xs font-bold text-white rounded-xl shadow-lg backdrop-blur-md",
                    (property.purpose || 'Sale') === 'Sale' ? "bg-[#1E6BFF]/80" : "bg-green-500/80"
                  )}>
                    FOR {(property.purpose || 'Sale').toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all group/icon">
                    <Heart className="w-5 h-5 text-[#4A5568] group-hover/icon:text-red-500 transition-colors" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all">
                    <Share2 className="w-5 h-5 text-[#4A5568]" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-3">
                {images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative h-20 rounded-xl overflow-hidden border-2 transition-all",
                      activeImage === idx ? "border-[#1E6BFF] scale-95 shadow-md" : "border-transparent hover:border-[#1E6BFF]/50"
                    )}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info Card */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 mt-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm font-semibold text-[#9CA3AF]">PKR</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A2E]">
                      {property.price_label || property.priceLabel}
                    </h2>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-[#4A5568]">
                    <MapPin className="w-4 h-4 text-[#1E6BFF]" />
                    {property.address}
                  </div>
                </div>
                {property.is_verified && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-xl border border-green-100 self-start">
                    <ShieldCheck className="w-4 h-4" /> Verified Listing
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F8F9FA] rounded-2xl border border-[#F3F4F6]">
                <SpecItem icon={<Bed className="w-5 h-5" />} value={property.bedrooms} label="Bedrooms" />
                <SpecItem icon={<Bath className="w-5 h-5" />} value={property.bathrooms} label="Bathrooms" />
                <SpecItem icon={<Move className="w-5 h-5" />} value={property.area_size || property.areaSize} label={property.area_unit || property.areaUnit} />
                <SpecItem icon={<Eye className="w-5 h-5" />} value={property.views} label="Views" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 mt-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">About This Property</h3>
              <p className="text-[#4A5568] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 mt-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-6">Features & Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                {(property.features || []).map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-[#EBF2FF] flex items-center justify-center group-hover:bg-[#1E6BFF] transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6BFF] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-[#4A5568]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Agent Card */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-card sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#EBF2FF]">
                  <Image src={agent.photo_url || agent.photo || 'https://via.placeholder.com/100'} alt={agent.name || 'Agent Photo'} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A2E]">{agent.name || 'Portal Agent'}</h4>
                  <p className="text-xs text-[#9CA3AF] font-medium">{agent.agency || 'Verified Partner'}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-bold text-[#4A5568]">{agent.rating || 5.0} · {agent.review_count || agent.reviewCount || 0} reviews</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-2 w-full py-3 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl shadow-button hover:bg-[#1554CC] transition-all">
                  <Phone className="w-4 h-4" /> Call Agent
                </a>
                <a href={`https://wa.me/${agent.whatsapp}`} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white text-xs font-bold rounded-xl shadow-button hover:bg-green-600 transition-all">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>

              <div className="h-px bg-[#F3F4F6] mb-6" />

              <h5 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">Quick Inquiry</h5>
              {inquirySent ? (
                <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-2xl text-center">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs font-bold">Inquiry Sent Successfully!</p>
                  <p className="text-[10px] mt-1 opacity-80">The agent will contact you soon.</p>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={handleInquiry}>
                  <input name="name" type="text" required placeholder="Your Name" className="w-full h-11 px-4 text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]" />
                  <input name="phone" type="tel" required placeholder="Phone Number" className="w-full h-11 px-4 text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]" />
                  <input name="email" type="email" required placeholder="Email Address" className="w-full h-11 px-4 text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]" />
                  <textarea name="message" required placeholder="Message" rows={3} className="w-full px-4 py-3 text-xs bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF] resize-none" defaultValue={`I'm interested in this property. Please contact me.`}></textarea>
                  <button type="submit" disabled={inquiryLoading} className="w-full py-3.5 bg-[#1A1A2E] text-white text-xs font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                    {inquiryLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>

            {/* Support Promo */}
            <div className="bg-[#1A1A2E] rounded-3xl p-6 text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-2">Need Help?</h4>
                <p className="text-xs text-white/60 mb-6 leading-relaxed">Our property experts are here to help you find the perfect home in {property.city}.</p>
                <button className="flex items-center gap-2 text-xs font-bold text-[#1E6BFF] bg-white px-5 py-2.5 rounded-xl group-hover:scale-105 transition-transform">
                  Contact Support <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#1E6BFF]/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpecItem = ({ icon, value, label }: { icon: React.ReactNode, value: any, label: string }) => (
  <div className="flex flex-col items-center justify-center text-center">
    <div className="text-[#1E6BFF] mb-1.5">{icon}</div>
    <div className="text-sm font-bold text-[#1A1A2E]">{value || 0}</div>
    <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mt-0.5">{label}</div>
  </div>
)

export default PropertyDetailPage

