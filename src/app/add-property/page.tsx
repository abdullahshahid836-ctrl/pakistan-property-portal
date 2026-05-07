'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, ChevronRight, ChevronLeft, ChevronDown, Building2, Home, Landmark, Warehouse, Bed, Bath, Move, DollarSign, Loader2, X, Plus, UploadCloud, MapPin, Type, List, Image as ImageIcon, Contact, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Reveal from '@/components/shared/Reveal'

const steps = [
  { name: "Type", icon: Type }, 
  { name: "Purpose", icon: List }, 
  { name: "Location", icon: MapPin }, 
  { name: "Details", icon: Move }, 
  { name: "Description", icon: Check }, 
  { name: "Photos", icon: ImageIcon }, 
  { name: "Contact", icon: Contact }
]

function AddPropertyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    type: 'House',
    purpose: 'Sale',
    city: '',
    area: '',
    address: '',
    price: '',
    bedrooms: '3',
    bathrooms: '3',
    area_size: '',
    area_unit: 'Marla',
    title: '',
    description: '',
    features: [] as string[],
    sender_name: '',
    sender_phone: '',
    sender_email: ''
  })

  useEffect(() => {
    if (editId) {
      const fetchProperty = async () => {
        try {
          const res = await fetch(`/api/properties/${editId}`)
          const data = await res.json()
          if (data) {
            setFormData({
              type: data.type || 'House',
              purpose: data.purpose || 'Sale',
              city: data.city || '',
              area: data.area || '',
              address: data.address || '',
              price: data.price?.toString() || '',
              bedrooms: data.bedrooms?.toString() || '3',
              bathrooms: data.bathrooms?.toString() || '3',
              area_size: data.area_size?.toString() || '',
              area_unit: data.area_unit || 'Marla',
              title: data.title || '',
              description: data.description || '',
              features: data.features || [],
              sender_name: '',
              sender_phone: '',
              sender_email: ''
            })
            setImages(data.images || [])
          }
        } catch (err) {
          console.error('Fetch error:', err)
        }
      }
      fetchProperty()
    }
  }, [editId])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fData = new FormData()
      fData.append('file', file)
      fData.append('bucket', 'property-images')

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fData })
        const data = await res.json()
        if (data.url) setImages(prev => [...prev, data.url])
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }
    setUploading(false)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const url = editId ? `/api/properties/${editId}` : '/api/properties/create'
      const method = editId ? 'PATCH' : 'POST'
      
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          area_size: parseFloat(formData.area_size),
          images: images
        })
      })
      
      const result = await res.json()
      
      if (res.ok && (result.success || result.id)) {
        router.push('/dashboard?success=true')
      } else {
        alert(`Submission failed: ${result.error}`)
      }
    } catch (err) {
      alert('An error occurred during submission')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => currentStep === 7 ? handleSubmit() : setCurrentStep(prev => prev + 1)
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-24">
      {/* Cinematic Header */}
      <div className="bg-[#004737] pt-32 pb-24 relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal direction="down">
            <div className="flex items-center justify-center gap-2 text-[10px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em] mb-6">
              <Link href="/" className="hover:underline underline-offset-8 transition-all">CENTRAL</Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="opacity-60">Listing Wizard</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne text-white mb-6 uppercase tracking-tight leading-[0.9]">
               {editId ? 'Refine' : 'Publish'} <br />
               <span className="text-[#C8F55A] italic">Asset.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A8C4BB] font-inter max-w-xl mx-auto font-medium opacity-80 leading-relaxed">
              Leverage Pakistan's elite property ecosystem to maximize your asset's market presence.
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
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as any }}
              fill="#F5F0E8" 
            />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* Advanced Horizontal Stepper */}
        <Reveal direction="up" delay={0.3}>
          <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-6 mb-10 shadow-[0_20px_50px_rgba(0,71,55,0.1)] overflow-hidden">
             <div className="flex justify-between items-center relative px-4">
                {steps.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isActive = currentStep === stepNum;
                  const isCompleted = currentStep > stepNum;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-3 relative z-10 flex-1">
                      <motion.div 
                        initial={false}
                        animate={isActive ? { scale: 1.15, rotate: 0 } : isCompleted ? { scale: 1, rotate: 0 } : { scale: 1 }}
                        className={cn(
                          "w-12 h-12 rounded-[1.25rem] flex items-center justify-center transition-all duration-700 border-4",
                          isActive ? "bg-[#004737] border-[#004737] text-[#C8F55A] shadow-2xl" : 
                          isCompleted ? "bg-[#C8F55A] border-[#C8F55A] text-[#004737]" : 
                          "bg-white border-[#F5F0E8] text-[#DDD8CF]"
                        )}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                      </motion.div>
                      <span className={cn(
                        "hidden sm:block text-[9px] font-black font-syne uppercase tracking-[0.2em] transition-colors duration-500",
                        isActive ? "text-[#004737]" : "text-[#7A9088]/30"
                      )}>{step.name}</span>
                    </div>
                  )
                })}
                {/* Dynamic Progress Line */}
                <div className="absolute top-6 left-12 right-12 h-1 bg-[#F5F0E8] -z-0 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
                    className="h-full bg-[#C8F55A]"
                   />
                </div>
             </div>
          </div>
        </Reveal>

        {/* Cinematic Form Container */}
        <Reveal direction="up" delay={0.5}>
          <div className="bg-white rounded-[3.5rem] border border-[#DDD8CF] p-8 sm:p-20 shadow-[0_40px_100px_rgba(0,71,55,0.12)] min-h-[650px] flex flex-col relative overflow-hidden">
            {/* Ambient Background Pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5F0E8] rounded-full blur-3xl -mr-40 -mt-40" />

            <div className="flex-1 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  {currentStep === 1 && (
                    <div>
                      <div className="text-center mb-16">
                         <h3 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter mb-3">Asset Classification</h3>
                         <p className="text-base font-inter text-[#7A9088] font-medium opacity-60">Specify the structural category of your property.</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {[
                          { id: 'House', icon: <Home /> },
                          { id: 'Flat', icon: <Building2 /> },
                          { id: 'Plot', icon: <Landmark /> },
                          { id: 'Commercial', icon: <Warehouse /> }
                        ].map(t => (
                          <TypeCard key={t.id} icon={t.icon} label={t.id} active={formData.type === t.id} onClick={() => setFormData({...formData, type: t.id})} />
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div>
                      <div className="text-center mb-16">
                         <h3 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter mb-3">Transaction Purpose</h3>
                         <p className="text-base font-inter text-[#7A9088] font-medium opacity-60">Define the primary commercial objective for this listing.</p>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-center gap-10">
                        <PurposeCard label="Sale" active={formData.purpose === 'Sale'} onClick={() => setFormData({...formData, purpose: 'Sale'})} />
                        <PurposeCard label="Rent" active={formData.purpose === 'Rent'} onClick={() => setFormData({...formData, purpose: 'Rent'})} />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-12">
                      <div className="text-center mb-4">
                         <h3 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter mb-3">Precision Location</h3>
                         <p className="text-base font-inter text-[#7A9088] font-medium opacity-60">Map the asset's coordinates within our database.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">METRO CITY</label>
                          <input type="text" placeholder="e.g. Lahore" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full h-18 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">RESIDENTIAL SECTOR</label>
                          <input type="text" placeholder="e.g. DHA Phase 6" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full h-18 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                        </div>
                        <div className="sm:col-span-2 space-y-4">
                          <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">MASTER ADDRESS STRING</label>
                          <input type="text" placeholder="Street protocol, House identifier or Landmark..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full h-18 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-12">
                      <div className="text-center mb-4">
                         <h3 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter mb-3">Asset Specifications</h3>
                         <p className="text-base font-inter text-[#7A9088] font-medium opacity-60">Pricing benchmarks and spatial engineering data.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">VALUATION (PKR)</label>
                          <div className="relative">
                            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[#004737] font-black text-[11px] font-syne opacity-40 tracking-[0.2em]">PKR</div>
                            <input type="number" placeholder="25,000,000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full h-18 pl-20 pr-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-4">
                            <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">AREA QUANTUM</label>
                            <input type="number" value={formData.area_size} onChange={e => setFormData({...formData, area_size: e.target.value})} className="w-full h-18 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                          </div>
                          <div className="w-40 space-y-4">
                            <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">UNIT</label>
                            <div className="relative">
                              <select value={formData.area_unit} onChange={e => setFormData({...formData, area_unit: e.target.value})} className="w-full h-18 px-6 bg-white border border-[#DDD8CF] rounded-2xl text-[10px] font-black font-syne uppercase tracking-widest text-[#0D1B17] outline-none cursor-pointer shadow-sm appearance-none focus:border-[#004737]">
                                <option>Marla</option><option>Kanal</option><option>Sq. Ft.</option>
                              </select>
                              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737] pointer-events-none opacity-40" />
                            </div>
                          </div>
                        </div>
                        {formData.type !== 'Plot' && (
                          <>
                            <div className="space-y-4">
                              <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">BEDROOM COUNT</label>
                              <div className="relative">
                                <select value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} className="w-full h-18 px-8 bg-white border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne text-[#0D1B17] outline-none cursor-pointer shadow-sm appearance-none focus:border-[#004737]">
                                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737] pointer-events-none opacity-40" />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">BATHROOM COUNT</label>
                              <div className="relative">
                                <select value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} className="w-full h-18 px-8 bg-white border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne text-[#0D1B17] outline-none cursor-pointer shadow-sm appearance-none focus:border-[#004737]">
                                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737] pointer-events-none opacity-40" />
                              </div>
                            </div>
                          </>
                        )}
                        <div className="sm:col-span-2 space-y-4">
                          <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">LISTING HEADLINE (STRATEGIC)</label>
                          <input type="text" placeholder="e.g. Designer 5 Marla Villa with Premium Finish" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-18 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div>
                      <div className="text-center mb-16">
                         <h3 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter mb-3">Narrative Intelligence</h3>
                         <p className="text-base font-inter text-[#7A9088] font-medium opacity-60">Synthesize the unique selling points and lifestyle narrative.</p>
                      </div>
                      <textarea rows={10} placeholder="Synthesize interior spatial data, structural highlights, and local ecosystem advantages..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-10 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-[3rem] text-base font-inter text-[#3D5249] focus:border-[#004737] outline-none resize-none transition-all shadow-inner leading-relaxed font-medium" />
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div>
                      <div className="text-center mb-16">
                         <h3 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter mb-3">Visual Architecture</h3>
                         <p className="text-base font-inter text-[#7A9088] font-medium opacity-60">High-fidelity optical data significantly accelerates acquisition.</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <AnimatePresence>
                          {images.map((url, idx) => (
                            <motion.div 
                              key={url} 
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="relative aspect-square rounded-[2rem] overflow-hidden border-8 border-[#F5F0E8] group shadow-2xl"
                            >
                              <Image src={url} alt="upload" fill className="object-cover" />
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} 
                                className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-2xl"
                              >
                                <X className="w-5 h-5" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {uploading ? (
                          <div className="aspect-square rounded-[2rem] border-4 border-dashed border-[#DDD8CF] flex flex-col items-center justify-center bg-[#F5F0E8]/30">
                            <Loader2 className="w-10 h-10 text-[#004737] animate-spin mb-4" />
                            <span className="text-[9px] font-black font-syne text-[#004737] uppercase tracking-widest">UPLOADING...</span>
                          </div>
                        ) : (
                          <motion.label 
                            whileHover={{ scale: 1.02 }}
                            className="aspect-square rounded-[2rem] border-4 border-dashed border-[#DDD8CF] hover:border-[#004737] hover:bg-[#F5F0E8] transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group shadow-sm"
                          >
                            <div className="w-16 h-16 rounded-2xl bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-700">
                              <UploadCloud className="w-8 h-8 text-[#004737] group-hover:text-[#C8F55A]" />
                            </div>
                            <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] group-hover:text-[#004737]">ADD MEDIA</span>
                            <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                          </motion.label>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 7 && (
                    <div className="space-y-12">
                      <div className="text-center mb-4">
                         <h3 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter mb-3">Acquisition Point</h3>
                         <p className="text-base font-inter text-[#7A9088] font-medium opacity-60">Authorize the designated strategic advisor for inquiries.</p>
                      </div>
                      <div className="space-y-8 max-w-lg mx-auto">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">FULL IDENTIFIER</label>
                          <input type="text" placeholder="e.g. Abdullah Shahid" value={formData.sender_name} onChange={e => setFormData({...formData, sender_name: e.target.value})} className="w-full h-18 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">MOBILE PROTOCOL</label>
                          <input type="tel" placeholder="e.g. +92 300 1234567" value={formData.sender_phone} onChange={e => setFormData({...formData, sender_phone: e.target.value})} className="w-full h-18 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] ml-1">OFFICIAL EMAIL CHANNEL</label>
                          <input type="email" placeholder="e.g. hello@official.pk" value={formData.sender_email} onChange={e => setFormData({...formData, sender_email: e.target.value})} className="w-full h-18 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-inner" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-20 pt-12 border-t border-[#F5F0E8]">
              <motion.button 
                whileHover={{ x: -5 }}
                onClick={handleBack} 
                disabled={currentStep === 1 || loading} 
                className="flex items-center gap-4 px-10 py-6 text-[11px] font-black font-syne text-[#004737] uppercase tracking-[0.3em] transition-all disabled:opacity-20 hover:bg-[#F5F0E8] rounded-[1.5rem]"
              >
                <ChevronLeft className="w-6 h-6" /> RETURN
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext} 
                disabled={loading} 
                className="flex items-center gap-6 px-14 py-6 bg-[#004737] text-[#C8F55A] text-[11px] font-black font-syne rounded-[1.5rem] hover:bg-black transition-all shadow-2xl disabled:opacity-50 uppercase tracking-[0.4em] h-18"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : currentStep === 7 ? 'FINALIZE & PUBLISH' : 'PROCEED TO NEXT'}
                {currentStep < 7 && !loading && <ChevronRight className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default function AddPropertyPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center bg-[#F5F0E8] min-h-screen flex items-center justify-center flex-col">
      <Loader2 className="w-12 h-12 text-[#004737] animate-spin mb-6" />
      <span className="font-syne font-black text-[#004737] tracking-[0.4em] text-[10px] uppercase">Initializing Wizard Engine...</span>
    </div>}>
      <AddPropertyContent />
    </Suspense>
  )
}

function TypeCard({ icon, label, active, onClick }: any) {
  return (
    <motion.button 
      whileHover={{ y: -8 }}
      onClick={onClick} 
      className={cn(
        "flex flex-col items-center justify-center p-10 rounded-[3rem] border-4 transition-all duration-700 group", 
        active 
          ? "bg-[#004737] border-[#C8F55A] text-[#C8F55A] shadow-2xl scale-105" 
          : "bg-white border-[#F5F0E8] text-[#3D5249] hover:border-[#004737]/30 shadow-sm"
      )}
    >
      <div className={cn(
        "w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-6 transition-all duration-700", 
        active ? "bg-[#C8F55A] text-[#004737]" : "bg-[#F5F0E8] group-hover:bg-[#004737] group-hover:text-[#C8F55A]"
      )}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-8 h-8" })}
      </div>
      <span className="text-[11px] font-black font-syne uppercase tracking-[0.25em]">{label}</span>
    </motion.button>
  )
}

function PurposeCard({ label, active, onClick }: any) {
  return (
    <motion.button 
      whileHover={{ y: -8 }}
      onClick={onClick} 
      className={cn(
        "flex-1 max-w-[300px] py-20 rounded-[3.5rem] border-4 flex flex-col items-center gap-8 transition-all duration-700 group", 
        active 
          ? "bg-[#004737] border-[#C8F55A] text-[#C8F55A] shadow-2xl scale-105" 
          : "bg-white border-[#F5F0E8] text-[#3D5249] hover:border-[#004737]/30 shadow-sm"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl border-4 flex items-center justify-center transition-all duration-700", 
        active ? "border-[#C8F55A] bg-[#C8F55A]" : "border-[#DDD8CF] group-hover:border-[#004737]"
      )}>
        {active && <Check className="w-5 h-5 text-[#004737]" strokeWidth={4} />}
      </div>
      <span className="text-2xl font-black font-syne uppercase tracking-tighter">{label}</span>
    </motion.button>
  )
}
