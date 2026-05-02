'use client'

import React, { useState } from 'react'
import { Check, ChevronRight, ChevronLeft, Upload, MapPin, Building2, Home, Landmark, Warehouse, Bed, Bath, Move, DollarSign, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  "Property Type",
  "Purpose",
  "Location",
  "Details",
  "Features",
  "Photos",
  "Contact"
]

const AddPropertyPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    type: '',
    purpose: '',
    city: '',
    area: '',
    address: '',
    price: '',
    beds: '',
    baths: '',
    size: '',
    unit: 'Marla',
    title: '',
    description: ''
  })

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 7))
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A2E] mb-2">List Your Property</h1>
          <p className="text-sm text-[#9CA3AF]">Fill in the details to reach thousands of potential buyers and tenants</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-[#1E6BFF] uppercase tracking-widest">Step {currentStep} of 7</span>
            <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">{steps[currentStep-1]}</span>
          </div>
          <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1E6BFF] transition-all duration-500" 
              style={{ width: `${(currentStep / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 sm:p-12 shadow-md min-h-[400px] flex flex-col justify-between">
          
          <div>
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">Select Property Type</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <TypeCard icon={<Home />} label="House" active={formData.type === 'House'} onClick={() => setFormData({...formData, type: 'House'})} />
                  <TypeCard icon={<Building2 />} label="Flat" active={formData.type === 'Flat'} onClick={() => setFormData({...formData, type: 'Flat'})} />
                  <TypeCard icon={<Landmark />} label="Plot" active={formData.type === 'Plot'} onClick={() => setFormData({...formData, type: 'Plot'})} />
                  <TypeCard icon={<Warehouse />} label="Commercial" active={formData.type === 'Commercial'} onClick={() => setFormData({...formData, type: 'Commercial'})} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-8 text-center">What is the Purpose?</h3>
                <div className="flex justify-center gap-6">
                  <PurposeCard label="Sell" active={formData.purpose === 'Sale'} onClick={() => setFormData({...formData, purpose: 'Sale'})} />
                  <PurposeCard label="Rent" active={formData.purpose === 'Rent'} onClick={() => setFormData({...formData, purpose: 'Rent'})} />
                </div>
              </div>
            )}

            {currentStep > 2 && (
              <div className="flex items-center justify-center h-64 text-[#9CA3AF] flex-col gap-4 animate-in fade-in duration-500">
                <Info className="w-12 h-12 text-[#1E6BFF]/20" />
                <p className="font-medium">Form for step "{steps[currentStep-1]}" would go here.</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#F3F4F6]">
            <button 
              onClick={handleBack}
              disabled={currentStep === 1}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all",
                currentStep === 1 ? "text-[#9CA3AF] opacity-50 cursor-not-allowed" : "text-[#4A5568] hover:bg-[#F8F9FA]"
              )}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all shadow-lg"
            >
              {currentStep === 7 ? 'Submit Property' : 'Next Step'}
              {currentStep < 7 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TypeCard = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group",
      active ? "bg-[#EBF2FF] border-[#1E6BFF] text-[#1E6BFF]" : "bg-white border-[#E5E7EB] text-[#4A5568] hover:border-[#1E6BFF]/50"
    )}
  >
    <div className={cn(
      "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors",
      active ? "bg-[#1E6BFF] text-white" : "bg-[#F8F9FA] group-hover:bg-[#EBF2FF]"
    )}>
      {React.cloneElement(icon, { className: "w-6 h-6" })}
    </div>
    <span className="text-sm font-bold">{label}</span>
  </button>
)

const PurposeCard = ({ label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-40 py-10 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all",
      active ? "bg-[#EBF2FF] border-[#1E6BFF] text-[#1E6BFF]" : "bg-white border-[#E5E7EB] text-[#4A5568] hover:border-[#1E6BFF]/50"
    )}
  >
    <div className={cn(
      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
      active ? "border-[#1E6BFF]" : "border-[#E5E7EB]"
    )}>
      {active && <div className="w-3 h-3 bg-[#1E6BFF] rounded-full" />}
    </div>
    <span className="text-lg font-bold">{label}</span>
  </button>
)

export default AddPropertyPage
