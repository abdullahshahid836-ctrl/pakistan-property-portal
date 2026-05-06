'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, ChevronRight, ChevronLeft, Building2, Home, Landmark, Warehouse, Bed, Bath, Move, DollarSign, Loader2, X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const steps = ["Type", "Purpose", "Location", "Details", "Features", "Photos", "Contact"]

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
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-flecto-green mb-4 font-syne tracking-tight">
            {editId ? 'Refine Your Listing' : 'List Your Property'}
          </h1>
          <p className="text-base text-flecto-text-muted font-inter font-medium max-w-lg mx-auto">Elevate your property's visibility and reach serious buyers across Pakistan's premier portal.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-[2rem] border border-flecto-green/5 p-6 sm:p-10 mb-10 shadow-2xl shadow-flecto-green/[0.03]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-bold text-flecto-green-light uppercase tracking-[0.2em] font-inter">Phase {currentStep} of 7</span>
            <span className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">{steps[currentStep-1]}</span>
          </div>
          <div className="h-2 w-full bg-flecto-cream rounded-full overflow-hidden">
            <div className="h-full bg-flecto-green transition-all duration-1000 ease-out" style={{ width: `${(currentStep / 7) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-10 sm:p-16 shadow-2xl shadow-flecto-green/[0.04] min-h-[550px] flex flex-col justify-between">
          <div className="space-y-12">
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h3 className="text-2xl font-bold text-flecto-green mb-10 text-center font-syne">Property Category</h3>
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
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h3 className="text-2xl font-bold text-flecto-green mb-10 text-center font-syne">Intended Purpose</h3>
                <div className="flex justify-center gap-8">
                  <PurposeCard label="Sale" active={formData.purpose === 'Sale'} onClick={() => setFormData({...formData, purpose: 'Sale'})} />
                  <PurposeCard label="Rent" active={formData.purpose === 'Rent'} onClick={() => setFormData({...formData, purpose: 'Rent'})} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                <h3 className="text-2xl font-bold text-flecto-green mb-10 text-center font-syne">Global Location</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">City</label>
                    <input type="text" placeholder="e.g. Lahore" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Area / Society</label>
                    <input type="text" placeholder="e.g. DHA Phase 6" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Full Address</label>
                    <input type="text" placeholder="Street number, House number..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                <h3 className="text-2xl font-bold text-flecto-green mb-10 text-center font-syne">Core Specification</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Price (PKR)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-flecto-green-light" />
                      <input type="number" placeholder="e.g. 25000000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full h-14 pl-14 pr-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Area Size</label>
                      <input type="number" value={formData.area_size} onChange={e => setFormData({...formData, area_size: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                    </div>
                    <div className="w-28">
                      <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Unit</label>
                      <select value={formData.area_unit} onChange={e => setFormData({...formData, area_unit: e.target.value})} className="w-full h-14 px-4 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm font-inter font-bold text-flecto-green outline-none">
                        <option>Marla</option><option>Kanal</option><option>Sq. Ft.</option>
                      </select>
                    </div>
                  </div>
                  {formData.type !== 'Plot' && (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Bedrooms</label>
                        <select value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm font-inter font-bold text-flecto-green outline-none">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Bathrooms</label>
                        <select value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm font-inter font-bold text-flecto-green outline-none">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </>
                  )}
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Listing Title</label>
                    <input type="text" placeholder="e.g. Modern 5 Marla House in DHA Phase 6" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h3 className="text-2xl font-bold text-flecto-green mb-10 text-center font-syne">Detailed Description</h3>
                <textarea rows={10} placeholder="Narrate the unique features of this property, its condition, the neighborhood, and anything that makes it stand out..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-8 bg-flecto-cream border border-flecto-green/5 rounded-[2rem] text-base font-inter font-medium focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 outline-none resize-none" />
              </div>
            )}

            {currentStep === 6 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h3 className="text-2xl font-bold text-flecto-green mb-10 text-center font-syne">Visual Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {images.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-[1.5rem] overflow-hidden border-2 border-flecto-cream shadow-xl group">
                      <Image src={url} alt="upload" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <button onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg border border-flecto-green/5">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {uploading ? (
                    <div className="aspect-square rounded-[1.5rem] border-2 border-dashed border-flecto-green/10 flex flex-col items-center justify-center bg-flecto-cream">
                      <div className="w-8 h-8 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin mb-3" />
                      <span className="text-[10px] font-bold text-flecto-green uppercase tracking-widest font-inter">Uploading...</span>
                    </div>
                  ) : (
                    <label className="aspect-square rounded-[1.5rem] border-2 border-dashed border-flecto-green/10 hover:border-flecto-lime hover:bg-flecto-lime/5 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-3 group">
                      <div className="w-12 h-12 rounded-full bg-flecto-cream flex items-center justify-center group-hover:bg-flecto-lime transition-all duration-500">
                        <Plus className="w-6 h-6 text-flecto-green-light group-hover:text-flecto-green" />
                      </div>
                      <span className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] group-hover:text-flecto-green font-inter">Add Photos</span>
                      <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                <h3 className="text-2xl font-bold text-flecto-green mb-10 text-center font-syne">Identity Verification</h3>
                <div className="space-y-6 max-w-md mx-auto">
                  <div>
                    <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Full Name</label>
                    <input type="text" placeholder="John Doe" value={formData.sender_name} onChange={e => setFormData({...formData, sender_name: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Contact Number</label>
                    <input type="tel" placeholder="+92 300 1234567" value={formData.sender_phone} onChange={e => setFormData({...formData, sender_phone: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-3 block font-inter">Email Address (Optional)</label>
                    <input type="email" placeholder="john@example.com" value={formData.sender_email} onChange={e => setFormData({...formData, sender_email: e.target.value})} className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium outline-none" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-16 pt-10 border-t border-flecto-green/5">
            <button 
              onClick={handleBack} 
              disabled={currentStep === 1 || loading} 
              className="flex items-center gap-3 px-8 py-4 text-xs font-bold text-flecto-green-light rounded-full border border-flecto-green/10 hover:bg-flecto-green hover:text-flecto-cream transition-all duration-500 disabled:opacity-20 font-syne uppercase tracking-widest"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button 
              onClick={handleNext} 
              disabled={loading} 
              className="flex items-center gap-3 px-10 py-4 bg-flecto-green text-flecto-cream text-xs font-bold rounded-full hover:bg-flecto-green-light transition-all duration-500 shadow-2xl shadow-flecto-green/20 disabled:opacity-50 font-syne uppercase tracking-widest"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : currentStep === 7 ? 'Finalize Listing' : 'Continue Phase'}
              {currentStep < 7 && !loading && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AddPropertyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-flecto-cream gap-4">
        <div className="w-12 h-12 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin" />
        <p className="text-sm font-bold text-flecto-green font-syne uppercase tracking-widest">Preparing Workspace...</p>
      </div>
    }>
      <AddPropertyContent />
    </Suspense>
  )
}

function TypeCard({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 transition-all duration-500 group", active ? "bg-flecto-lime/10 border-flecto-lime text-flecto-green" : "bg-flecto-cream border-transparent text-flecto-text-muted hover:border-flecto-lime/30")}>
      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500", active ? "bg-flecto-green text-flecto-lime shadow-xl shadow-flecto-green/20" : "bg-white text-flecto-green-light group-hover:bg-flecto-lime group-hover:text-flecto-green")}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-8 h-8" })}
      </div>
      <span className="text-xs font-bold font-syne uppercase tracking-widest">{label}</span>
    </button>
  )
}

function PurposeCard({ label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("w-48 py-12 rounded-[2.5rem] border-2 flex flex-col items-center gap-4 transition-all duration-500 group", active ? "bg-flecto-green border-flecto-green text-flecto-cream shadow-2xl shadow-flecto-green/20" : "bg-flecto-cream border-transparent text-flecto-text-muted hover:border-flecto-lime/30")}>
      <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500", active ? "border-flecto-lime" : "border-flecto-green/10")}>
        {active && <div className="w-3 h-3 bg-flecto-lime rounded-full shadow-lg shadow-flecto-lime/50" />}
      </div>
      <span className="text-sm font-bold font-syne uppercase tracking-[0.2em]">{label}</span>
    </button>
  )
}
