'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, ChevronRight, ChevronLeft, Building2, Home, Landmark, Warehouse, Bed, Bath, Move, DollarSign, Loader2, X, Plus, UploadCloud, MapPin, Type, List, Image as ImageIcon, Contact } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-24">
      {/* Header */}
      <div className="bg-[#004737] pt-24 pb-20 relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">Listing Wizard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">
            {editId ? 'Refine Listing' : 'Publish Property'}
          </h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Reach over 1 million potential buyers across Pakistan with our premium listing experience.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        
        {/* Horizontal Stepper */}
        <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-4 sm:p-6 mb-10 shadow-[0_20px_50px_rgba(0,71,55,0.06)] overflow-hidden">
           <div className="flex justify-between items-center relative px-4">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isActive = currentStep === stepNum;
                const isCompleted = currentStep > stepNum;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 relative z-10 flex-1">
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2",
                      isActive ? "bg-[#004737] border-[#004737] text-[#C8F55A] scale-110 shadow-lg" : 
                      isCompleted ? "bg-[#C8F55A] border-[#C8F55A] text-[#004737]" : 
                      "bg-white border-[#F5F0E8] text-[#DDD8CF]"
                    )}>
                      {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                    </div>
                    <span className={cn(
                      "hidden sm:block text-[9px] font-black font-syne uppercase tracking-widest",
                      isActive ? "text-[#004737]" : "text-[#7A9088]/40"
                    )}>{step.name}</span>
                  </div>
                )
              })}
              {/* Progress Line */}
              <div className="absolute top-5 sm:top-6 left-12 right-12 h-0.5 bg-[#F5F0E8] -z-0" />
           </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-[3.5rem] border border-[#DDD8CF] p-8 sm:p-14 shadow-[0_40px_100px_rgba(0,71,55,0.08)] min-h-[600px] flex flex-col relative overflow-hidden">
          {/* Pattern */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5F0E8] rounded-full blur-3xl -mr-24 -mt-24" />

          <div className="flex-1 relative z-10">
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="text-center mb-12">
                   <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">Category selection</h3>
                   <p className="text-sm font-inter text-[#7A9088]">What type of property are you listing today?</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
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
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="text-center mb-12">
                   <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">Transaction Purpose</h3>
                   <p className="text-sm font-inter text-[#7A9088]">Are you selling this property or offering it for rent?</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-8">
                  <PurposeCard label="Sale" active={formData.purpose === 'Sale'} onClick={() => setFormData({...formData, purpose: 'Sale'})} />
                  <PurposeCard label="Rent" active={formData.purpose === 'Rent'} onClick={() => setFormData({...formData, purpose: 'Rent'})} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-10">
                <div className="text-center mb-4">
                   <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">Geographic location</h3>
                   <p className="text-sm font-inter text-[#7A9088]">Provide the precise location details of the asset.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="group">
                    <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">CITY</label>
                    <input type="text" placeholder="e.g. Lahore" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full h-16 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">AREA / SOCIETY</label>
                    <input type="text" placeholder="e.g. DHA Phase 6" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full h-16 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">MASTER ADDRESS</label>
                    <input type="text" placeholder="Street number, House number or Landmark..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full h-16 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-10">
                <div className="text-center mb-4">
                   <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">Technical details</h3>
                   <p className="text-sm font-inter text-[#7A9088]">Pricing and spatial specifications of the property.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div>
                    <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">VALUATION (PKR)</label>
                    <div className="relative">
                      <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[#004737] font-black text-sm font-syne opacity-40 tracking-widest">RS</div>
                      <input type="number" placeholder="25,000,000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full h-16 pl-16 pr-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">AREA SIZE</label>
                      <input type="number" value={formData.area_size} onChange={e => setFormData({...formData, area_size: e.target.value})} className="w-full h-16 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                    </div>
                    <div className="w-32">
                      <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">UNIT</label>
                      <select value={formData.area_unit} onChange={e => setFormData({...formData, area_unit: e.target.value})} className="w-full h-16 px-5 bg-white border border-[#DDD8CF] rounded-2xl text-xs font-black font-syne text-[#0D1B17] uppercase tracking-widest outline-none cursor-pointer shadow-sm appearance-none">
                        <option>Marla</option><option>Kanal</option><option>Sq. Ft.</option>
                      </select>
                    </div>
                  </div>
                  {formData.type !== 'Plot' && (
                    <>
                      <div>
                        <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">BEDROOMS</label>
                        <select value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} className="w-full h-16 px-8 bg-white border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] outline-none cursor-pointer shadow-sm appearance-none">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">BATHROOMS</label>
                        <select value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} className="w-full h-16 px-8 bg-white border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] outline-none cursor-pointer shadow-sm appearance-none">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </>
                  )}
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">LISTING HEADLINE</label>
                    <input type="text" placeholder="e.g. Designer 5 Marla Villa with Premium Finish" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-16 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="text-center mb-12">
                   <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">Detailed Narrative</h3>
                   <p className="text-sm font-inter text-[#7A9088]">Describe the unique features and value proposition of this property.</p>
                </div>
                <textarea rows={10} placeholder="Provide a thorough description of the interior, exterior, neighborhood and amenities..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-10 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-[3rem] text-base font-inter text-[#3D5249] focus:border-[#004737] outline-none resize-none transition-all shadow-inner leading-relaxed" />
              </div>
            )}

            {currentStep === 6 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="text-center mb-12">
                   <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">Visual gallery</h3>
                   <p className="text-sm font-inter text-[#7A9088]">High-quality imagery significantly increases engagement.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {images.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-[2rem] overflow-hidden border-8 border-[#F5F0E8] group shadow-xl">
                      <Image src={url} alt="upload" fill className="object-cover" />
                      <button onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-2xl scale-75 group-hover:scale-100">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {uploading ? (
                    <div className="aspect-square rounded-[2rem] border-4 border-dashed border-[#DDD8CF] flex flex-col items-center justify-center bg-[#F5F0E8]/30">
                      <Loader2 className="w-10 h-10 text-[#004737] animate-spin mb-4" />
                      <span className="text-[9px] font-black font-syne text-[#004737] uppercase tracking-widest">UPLOADING...</span>
                    </div>
                  ) : (
                    <label className="aspect-square rounded-[2rem] border-4 border-dashed border-[#DDD8CF] hover:border-[#004737] hover:bg-[#F5F0E8] transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group shadow-sm">
                      <div className="w-16 h-16 rounded-2xl bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-500">
                        <UploadCloud className="w-8 h-8 text-[#004737] group-hover:text-[#C8F55A]" />
                      </div>
                      <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] group-hover:text-[#004737]">ADD MEDIA</span>
                      <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-10">
                <div className="text-center mb-4">
                   <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">Point of contact</h3>
                   <p className="text-sm font-inter text-[#7A9088]">Who should interested buyers reach out to?</p>
                </div>
                <div className="space-y-8 max-w-lg mx-auto">
                  <div className="group">
                    <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">FULL NAME</label>
                    <input type="text" placeholder="e.g. Abdullah Shahid" value={formData.sender_name} onChange={e => setFormData({...formData, sender_name: e.target.value})} className="w-full h-16 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">PRIMARY PHONE</label>
                    <input type="tel" placeholder="e.g. +92 300 1234567" value={formData.sender_phone} onChange={e => setFormData({...formData, sender_phone: e.target.value})} className="w-full h-16 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4 block ml-1">EMAIL ADDRESS (OFFICIAL)</label>
                    <input type="email" placeholder="e.g. hello@official.pk" value={formData.sender_email} onChange={e => setFormData({...formData, sender_email: e.target.value})} className="w-full h-16 px-8 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-base font-black font-syne text-[#0D1B17] focus:border-[#004737] outline-none transition-all shadow-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-16 pt-12 border-t border-[#F5F0E8]">
            <button 
              onClick={handleBack} 
              disabled={currentStep === 1 || loading} 
              className="flex items-center gap-3 px-8 py-5 text-[10px] font-black font-syne text-[#004737] uppercase tracking-[0.2em] transition-all disabled:opacity-20 hover:bg-[#F5F0E8] rounded-2xl"
            >
              <ChevronLeft className="w-5 h-5" /> RETURN
            </button>
            <button 
              onClick={handleNext} 
              disabled={loading} 
              className="flex items-center gap-4 px-12 py-5 bg-[#004737] text-[#C8F55A] text-[10px] font-black font-syne rounded-2xl hover:bg-black transition-all shadow-2xl disabled:opacity-50 uppercase tracking-[0.2em] h-16"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : currentStep === 7 ? 'FINALIZE & PUBLISH' : 'PROCEED TO NEXT'}
              {currentStep < 7 && !loading && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AddPropertyPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center"><Loader2 className="w-10 h-10 text-[#004737] animate-spin mx-auto mb-4" /><span className="font-syne font-bold text-[#004737] tracking-widest text-xs uppercase">Initializing Wizard...</span></div>}>
      <AddPropertyContent />
    </Suspense>
  )
}

function TypeCard({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={cn(
      "flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-4 transition-all duration-500 group", 
      active 
        ? "bg-[#004737] border-[#C8F55A] text-[#C8F55A] shadow-2xl scale-105" 
        : "bg-white border-[#F5F0E8] text-[#3D5249] hover:border-[#004737]/30 hover:-translate-y-1 shadow-sm"
    )}>
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500", 
        active ? "bg-[#C8F55A] text-[#004737]" : "bg-[#F5F0E8] group-hover:bg-[#004737] group-hover:text-[#C8F55A]"
      )}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-8 h-8" })}
      </div>
      <span className="text-[11px] font-black font-syne uppercase tracking-widest">{label}</span>
    </button>
  )
}

function PurposeCard({ label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={cn(
      "flex-1 max-w-[260px] py-16 rounded-[3rem] border-4 flex flex-col items-center gap-6 transition-all duration-500 group", 
      active 
        ? "bg-[#004737] border-[#C8F55A] text-[#C8F55A] shadow-2xl scale-105" 
        : "bg-white border-[#F5F0E8] text-[#3D5249] hover:border-[#004737]/30 hover:-translate-y-1 shadow-sm"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all duration-500", 
        active ? "border-[#C8F55A] bg-[#C8F55A]" : "border-[#DDD8CF] group-hover:border-[#004737]"
      )}>
        {active && <Check className="w-4 h-4 text-[#004737]" strokeWidth={4} />}
      </div>
      <span className="text-xl font-black font-syne uppercase tracking-widest">{label}</span>
    </button>
  )
}
