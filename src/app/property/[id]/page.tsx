'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { MapPin, Bed, Bath, Move, CheckCircle2, Phone, Mail, MessageCircle, Heart, Share2, ArrowLeft, ChevronRight, Star, Calendar, Eye, ShieldCheck, Loader2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Property, Agent } from '@/types'
import { formatPrice } from '@/lib/formatters'
import { useWishlist } from '@/hooks/useWishlist'
import Reveal from '@/components/shared/Reveal'

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
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
           <Loader2 className="w-12 h-12 text-[#004737] animate-spin" />
           <div className="absolute inset-0 bg-[#004737]/10 rounded-full blur-xl" />
        </div>
        <span className="font-syne font-black text-[#004737] tracking-[0.3em] text-[10px] uppercase">Deciphering Asset Data...</span>
      </motion.div>
    </div>
  )

  if (!property) return <div className="p-20 text-center font-syne text-[#0D1B17]">Property not found</div>

  const agent = property.agents || {}
  const images = property.images || property.property_images || []

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-24">
      {/* Cinematic Header */}
      <div className="bg-[#004737] text-white pt-32 pb-16 overflow-hidden relative">
         {/* Animated Background */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal direction="down">
            <div className="flex items-center gap-2 text-[10px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em] mb-6">
              <Link href="/" className="hover:underline underline-offset-8">CENTRAL</Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="opacity-60">{property.city}</span>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="opacity-60 truncate max-w-[150px]">{property.title}</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-4xl">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne uppercase leading-[0.9] tracking-tighter mb-6">
                  {property.title}
                </h1>
                <div className="flex items-center gap-3 text-[#A8C4BB] font-inter font-medium">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#C8F55A]" />
                  </div>
                  {property.address}
                </div>
              </div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-baseline gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-10 py-6 rounded-[2.5rem] shadow-2xl shadow-black/20"
              >
                <span className="text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-widest">PKR</span>
                <span className="text-4xl sm:text-5xl font-black font-syne uppercase tracking-tighter">
                  {property.price_label || property.priceLabel}
                </span>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Visual Component */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Immersive Gallery */}
            <div className="space-y-6">
              <Reveal direction="scale" delay={0.5}>
                <motion.div className="relative h-[400px] sm:h-[600px] rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,71,55,0.2)] group border-8 border-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
                      className="absolute inset-0"
                    >
                      <Image 
                        src={images[activeImage] || images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200'} 
                        alt={property.title || 'Property Image'}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute top-8 left-8 flex gap-3">
                    <span className={cn(
                      "px-6 py-2.5 text-[10px] font-black font-syne text-white rounded-2xl shadow-2xl backdrop-blur-xl uppercase tracking-[0.2em] border border-white/20",
                      (property.purpose || 'Sale') === 'Sale' ? "bg-[#004737]/80" : "bg-[#006B55]/80"
                    )}>
                      FOR {(property.purpose || 'Sale').toUpperCase()}
                    </span>
                  </div>

                  <div className="absolute top-8 right-8 flex gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleWishlist()}
                      disabled={wishlistLoading}
                      className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-2xl hover:bg-white transition-all group/icon"
                    >
                      {wishlistLoading ? (
                        <Loader2 className="w-6 h-6 text-[#004737] animate-spin" />
                      ) : (
                        <Heart className={cn("w-6 h-6 transition-colors duration-500", isInWishlist ? "fill-red-500 text-red-500" : "text-[#0D1B17] group-hover/icon:text-red-500")} />
                      )}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-2xl hover:bg-white transition-all">
                      <Share2 className="w-6 h-6 text-[#0D1B17]" />
                    </motion.button>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                     {images.map((_: any, i: number) => (
                       <div key={i} className={cn("h-1.5 rounded-full transition-all duration-500", activeImage === i ? "w-8 bg-[#C8F55A] shadow-[0_0_15px_#C8F55A]" : "w-2 bg-white/50")} />
                     ))}
                  </div>
                </motion.div>
              </Reveal>
              
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide px-2">
                {images.map((img: string, idx: number) => (
                  <motion.button 
                    key={idx}
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative h-28 w-40 shrink-0 rounded-[1.5rem] overflow-hidden border-4 transition-all duration-500",
                      activeImage === idx ? "border-[#004737] scale-105 shadow-2xl" : "border-white hover:border-[#004737]/30"
                    )}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Performance Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <SpecChip icon={<Bed className="w-6 h-6" />} value={property.bedrooms} label="Bedrooms" delay={0.1} />
              <SpecChip icon={<Bath className="w-6 h-6" />} value={property.bathrooms} label="Bathrooms" delay={0.2} />
              <SpecChip icon={<Move className="w-6 h-6" />} value={property.area_size || property.areaSize} label={property.area_unit || property.areaUnit} delay={0.3} />
              <SpecChip icon={<Eye className="w-6 h-6" />} value={property.views} label="Total Views" delay={0.4} />
            </div>

            {/* Description & Narrative */}
            <Reveal direction="up" className="w-full">
              <div className="bg-white rounded-[3.5rem] border border-[#DDD8CF] p-10 sm:p-16 shadow-[0_4px_12px_rgba(0,71,55,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5F0E8] rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="flex items-center gap-4 mb-10 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#004737] flex items-center justify-center shadow-xl">
                    <ShieldCheck className="w-6 h-6 text-[#C8F55A]" />
                  </div>
                  <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">Narrative & Insight</h3>
                </div>
                <p className="text-[#3D5249] text-base sm:text-xl leading-[1.8] whitespace-pre-line font-inter relative z-10 font-medium opacity-80">
                  {property.description}
                </p>
              </div>
            </Reveal>

            {/* Features Ecosystem */}
            <Reveal direction="up" className="w-full">
              <div className="bg-white rounded-[3.5rem] border border-[#DDD8CF] p-10 sm:p-16 shadow-[0_4px_12px_rgba(0,71,55,0.03)]">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-[#004737] flex items-center justify-center shadow-xl">
                    <Star className="w-6 h-6 text-[#C8F55A]" />
                  </div>
                  <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">Features & Amenities</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12">
                  {(property.features || []).map((feature: string, idx: number) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-5 group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-500">
                        <CheckCircle2 className="w-5 h-5 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                      </div>
                      <span className="text-[11px] font-black font-syne text-[#3D5249] uppercase tracking-widest group-hover:text-[#0D1B17] transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Expert Sidebar */}
          <div className="space-y-12">
            
            {/* High-Fidelity Agent Card */}
            <Reveal direction="left" delay={0.6}>
              <div className="bg-white rounded-[3rem] border border-[#DDD8CF] p-10 shadow-[0_40px_100px_rgba(0,71,55,0.1)] sticky top-28 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F0E8] rounded-full blur-3xl -mr-16 -mt-16" />
                
                <div className="flex flex-col items-center text-center mb-10 relative z-10">
                  <div className="relative w-32 h-32 rounded-[2.5rem] overflow-hidden border-8 border-[#F5F0E8] shadow-xl mb-6">
                    <Image src={agent.photo_url || agent.photo || 'https://via.placeholder.com/200'} alt={agent.name || 'Agent Photo'} fill className="object-cover" />
                  </div>
                  <h4 className="font-black font-syne text-[#0D1B17] text-2xl leading-none mb-2 uppercase tracking-tight">{agent.name || 'Portal Agent'}</h4>
                  <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] mb-4">{agent.agency || 'Verified Partner'}</p>
                  <div className="flex items-center gap-2 bg-[#F5F0E8] px-4 py-2 rounded-2xl">
                    <Star className="w-4 h-4 text-[#004737] fill-[#004737]" />
                    <span className="text-[11px] font-black font-syne text-[#004737]">{agent.rating || 5.0} · {agent.review_count || 0} REVIEWS</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-10 relative z-10">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${agent.phone}`} 
                    className="flex items-center justify-center gap-4 h-16 bg-[#004737] text-[#C8F55A] rounded-2xl hover:bg-black transition-all shadow-xl shadow-[#004737]/10"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-[10px] font-black font-syne uppercase tracking-[0.2em]">AUDIO CONNECTION</span>
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/${agent.whatsapp}`} 
                    target="_blank" 
                    className="flex items-center justify-center gap-4 h-16 bg-[#006B55] text-white rounded-2xl hover:bg-[#005544] transition-all shadow-xl shadow-[#006B55]/10"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-[10px] font-black font-syne uppercase tracking-[0.2em]">DIRECT WHATSAPP</span>
                  </motion.a>
                </div>

                <div className="h-px bg-[#F5F0E8] mb-10 relative z-10" />

                <h5 className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] mb-8 text-center relative z-10">Intel Inquiry</h5>
                {inquirySent ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#004737] text-white p-10 rounded-[2rem] text-center shadow-2xl relative z-10"
                  >
                    <div className="w-16 h-16 bg-[#C8F55A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle2 className="w-8 h-8 text-[#004737]" />
                    </div>
                    <p className="text-[11px] font-black font-syne uppercase tracking-[0.3em] mb-3">DISPATCHED SUCCESSFUL</p>
                    <p className="text-xs font-inter text-[#A8C4BB] leading-relaxed opacity-80">The strategic advisor will initiate contact shortly.</p>
                  </motion.div>
                ) : (
                  <form className="space-y-6 relative z-10" onSubmit={handleInquiry}>
                    <input name="name" type="text" required placeholder="IDENTIFIER (NAME)" className="w-full h-14 px-6 text-[10px] font-black font-syne uppercase tracking-widest bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] shadow-inner" />
                    <input name="phone" type="tel" required placeholder="CONTACT NUMBER" className="w-full h-14 px-6 text-[10px] font-black font-syne uppercase tracking-widest bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] shadow-inner" />
                    <textarea name="message" required rows={4} className="w-full px-6 py-5 text-[10px] font-black font-syne uppercase tracking-widest bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] shadow-inner resize-none" defaultValue={`I'm expressing interest in this asset. Provide data.`}></textarea>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      disabled={inquiryLoading} 
                      className="w-full py-6 bg-[#004737] text-[#C8F55A] text-[10px] font-black font-syne rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 uppercase tracking-[0.3em] shadow-xl"
                    >
                      {inquiryLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'INITIALIZE INQUIRY'}
                    </motion.button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Strategic Insight Card */}
            <Reveal direction="left" delay={0.8}>
              <div className="bg-[#004737] rounded-[3rem] p-12 text-white overflow-hidden relative group shadow-2xl">
                <div className="absolute inset-0 opacity-[0.05]" style={{
                  backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <Sparkles className="w-6 h-6 text-[#C8F55A]" />
                     <span className="text-[10px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em]">EXPERT COUNCIL</span>
                  </div>
                  <h4 className="text-3xl font-black font-syne mb-6 uppercase tracking-tight leading-none">Consult <br />the Elite.</h4>
                  <p className="text-sm text-[#A8C4BB] mb-10 leading-relaxed font-inter font-medium opacity-80">Our specialized acquisitions team is ready to facilitate your investment in {property.city}.</p>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/923001234567"
                    target="_blank"
                    className="flex items-center justify-center gap-4 text-[10px] font-black font-syne text-[#004737] bg-[#C8F55A] px-8 py-5 rounded-2xl hover:bg-white transition-all shadow-2xl shadow-[#C8F55A]/20 uppercase tracking-[0.2em]"
                  >
                    <MessageCircle className="w-5 h-5" /> START CONSULTATION
                  </motion.a>
                </div>
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#C8F55A]/10 rounded-full blur-[80px]" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpecChip = ({ icon, value, label, delay }: { icon: React.ReactNode, value: any, label: string, delay: number }) => (
  <Reveal direction="up" delay={delay}>
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white border border-[#DDD8CF] rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.1)] transition-all duration-500"
    >
      <div className="text-[#004737] mb-4 bg-[#F5F0E8] w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter">{value || 0}</div>
      <div className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] mt-2 opacity-60">{label}</div>
    </motion.div>
  </Reveal>
)

export default PropertyDetailPage
