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
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A2E] mb-2">
            {editId ? 'Edit Your Property' : 'List Your Property'}
          </h1>
          <p className="text-sm text-[#9CA3AF]">Reach thousands of potential buyers and tenants across Pakistan</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-[#1E6BFF] uppercase tracking-widest">Step {currentStep} of 7</span>
            <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">{steps[currentStep-1]}</span>
          </div>
          <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
            <div className="h-full bg-[#1E6BFF] transition-all duration-500" style={{ width: `${(currentStep / 7) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 sm:p-12 shadow-md min-h-[450px] flex flex-col justify-between">
          <div className="space-y-8">
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">Select Property Type</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">What is the Purpose?</h3>
                <div className="flex justify-center gap-6">
                  <PurposeCard label="Sale" active={formData.purpose === 'Sale'} onClick={() => setFormData({...formData, purpose: 'Sale'})} />
                  <PurposeCard label="Rent" active={formData.purpose === 'Rent'} onClick={() => setFormData({...formData, purpose: 'Rent'})} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">Where is it Located?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">City</label>
                    <input type="text" placeholder="e.g. Lahore" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Area / Society</label>
                    <input type="text" placeholder="e.g. DHA Phase 6" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Full Address</label>
                    <input type="text" placeholder="Street number, House number..." value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">Property Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Price (PKR)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                      <input type="number" placeholder="e.g. 25000000" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full h-12 pl-12 pr-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Area Size</label>
                      <input type="number" value={formData.area_size} onChange={e => setFormData({...formData, area_size: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                    </div>
                    <div className="w-24">
                      <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Unit</label>
                      <select value={formData.area_unit} onChange={e => setFormData({...formData, area_unit: e.target.value})} className="w-full h-12 px-2 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm outline-none">
                        <option>Marla</option><option>Kanal</option><option>Sq. Ft.</option>
                      </select>
                    </div>
                  </div>
                  {formData.type !== 'Plot' && (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Bedrooms</label>
                        <select value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm outline-none">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Bathrooms</label>
                        <select value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm outline-none">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                    </>
                  )}
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Property Title</label>
                    <input type="text" placeholder="e.g. Modern 5 Marla House in DHA Phase 6" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">Description</h3>
                <textarea rows={8} placeholder="Tell us more about the property, its condition, neighborhood, etc." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-6 bg-[#F8F9FA] border border-[#E5E7EB] rounded-3xl text-sm focus:border-[#1E6BFF] outline-none resize-none" />
              </div>
            )}

            {currentStep === 6 && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">Upload Photos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-[#E5E7EB] group">
                      <Image src={url} alt="upload" fill className="object-cover" />
                      <button onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {uploading ? (
                    <div className="aspect-square rounded-2xl border-2 border-dashed border-[#E5E7EB] flex flex-col items-center justify-center bg-[#F8F9FA]">
                      <Loader2 className="w-6 h-6 text-[#1E6BFF] animate-spin" />
                    </div>
                  ) : (
                    <label className="aspect-square rounded-2xl border-2 border-dashed border-[#E5E7EB] hover:border-[#1E6BFF] hover:bg-[#EBF2FF]/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group">
                      <Plus className="w-6 h-6 text-[#9CA3AF] group-hover:text-[#1E6BFF]" />
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest group-hover:text-[#1E6BFF]">Add Photo</span>
                      <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">Contact Information</h3>
                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Your Name</label>
                    <input type="text" placeholder="John Doe" value={formData.sender_name} onChange={e => setFormData({...formData, sender_name: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Phone Number</label>
                    <input type="tel" placeholder="+92 300 1234567" value={formData.sender_phone} onChange={e => setFormData({...formData, sender_phone: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Email Address (Optional)</label>
                    <input type="email" placeholder="john@example.com" value={formData.sender_email} onChange={e => setFormData({...formData, sender_email: e.target.value})} className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#F3F4F6]">
            <button onClick={handleBack} disabled={currentStep === 1 || loading} className="flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={handleNext} disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all shadow-lg disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : currentStep === 7 ? 'Submit Property' : 'Next Step'}
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
    <Suspense fallback={<div className="p-20 text-center"><Loader2 className="w-8 h-8 text-[#1E6BFF] animate-spin mx-auto mb-4" />Loading form...</div>}>
      <AddPropertyContent />
    </Suspense>
  )
}

function TypeCard({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group", active ? "bg-[#EBF2FF] border-[#1E6BFF] text-[#1E6BFF]" : "bg-white border-[#E5E7EB] text-[#4A5568] hover:border-[#1E6BFF]/50")}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-2", active ? "bg-[#1E6BFF] text-white" : "bg-[#F8F9FA] group-hover:bg-[#EBF2FF]")}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5" })}
      </div>
      <span className="text-xs font-bold">{label}</span>
    </button>
  )
}

function PurposeCard({ label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("w-32 py-8 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all", active ? "bg-[#EBF2FF] border-[#1E6BFF] text-[#1E6BFF]" : "bg-white border-[#E5E7EB] text-[#4A5568] hover:border-[#1E6BFF]/50")}>
      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", active ? "border-[#1E6BFF]" : "border-[#E5E7EB]")}>
        {active && <div className="w-2.5 h-2.5 bg-[#1E6BFF] rounded-full" />}
      </div>
      <span className="text-sm font-bold">{label}</span>
    </button>
  )
}
