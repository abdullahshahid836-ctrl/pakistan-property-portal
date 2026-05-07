'use client'

import React, { useState, useEffect } from 'react'
import { Calculator, Info, ChevronRight, ArrowRight, Download, Printer } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

const HomeLoanCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(15000000)
  const [downPaymentPct, setDownPaymentPct] = useState(20)
  const [tenure, setTenure] = useState(20)
  const [interestRate, setInterestRate] = useState(14)
  
  const [monthlyInstallment, setMonthlyInstallment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    const loanAmount = propertyPrice * (1 - downPaymentPct / 100)
    const monthlyRate = interestRate / 12 / 100
    const numberOfPayments = tenure * 12
    
    const pmt = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    setMonthlyInstallment(pmt)
    setTotalPayment(pmt * numberOfPayments)
    setTotalInterest((pmt * numberOfPayments) - loanAmount)
  }, [propertyPrice, downPaymentPct, tenure, interestRate])

  const formatPKR = (val: number) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(val)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span>Tools</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Home Loan Calculator</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">Home Loan Calculator</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
              <div className="space-y-8">
                {/* Price Slider */}
                <SliderInput 
                  label="Property Price" 
                  value={propertyPrice} 
                  onChange={setPropertyPrice} 
                  min={1000000} 
                  max={500000000} 
                  step={100000}
                  format={formatPKR}
                />
                
                {/* Down Payment Slider */}
                <SliderInput 
                  label="Down Payment (%)" 
                  value={downPaymentPct} 
                  onChange={setDownPaymentPct} 
                  min={10} 
                  max={80} 
                  step={1}
                  format={(val) => `${val}% (${formatPKR(propertyPrice * (val/100))})`}
                />

                {/* Tenure Slider */}
                <SliderInput 
                  label="Loan Tenure (Years)" 
                  value={tenure} 
                  onChange={setTenure} 
                  min={1} 
                  max={25} 
                  step={1}
                  format={(val) => `${val} Years`}
                />

                {/* Interest Rate Slider */}
                <SliderInput 
                  label="Interest Rate (%)" 
                  value={interestRate} 
                  onChange={setInterestRate} 
                  min={5} 
                  max={25} 
                  step={0.1}
                  format={(val) => `${val}%`}
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-[#EBF2FF] rounded-2xl p-6 border border-[#1E6BFF]/20 flex gap-4">
              <Info className="w-6 h-6 text-[#1E6BFF] shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-[#1A1A2E] mb-1">About Home Loans in Pakistan</h4>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Most banks in Pakistan offer home loans at Kibor + a spread. Interest rates usually vary between 12% to 18%. Down payments typically range from 20% to 30% of the property value.
                </p>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="space-y-6">
            <div className="bg-[#1A1A2E] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Monthly Installment</h3>
                <div className="text-3xl sm:text-4xl font-black text-[#1E6BFF] mb-8">
                  {formatPKR(monthlyInstallment)}
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <ResultRow label="Loan Amount" value={formatPKR(propertyPrice * (1 - downPaymentPct/100))} />
                  <ResultRow label="Total Interest" value={formatPKR(totalInterest)} />
                  <ResultRow label="Total Payment" value={formatPKR(totalPayment)} />
                </div>

                <button className="w-full mt-8 py-4 bg-[#1E6BFF] text-white text-sm font-bold rounded-2xl hover:bg-[#1554CC] transition-all shadow-lg flex items-center justify-center gap-2">
                  Apply for Loan <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E6BFF]/10 rounded-full blur-3xl" />
            </div>

            {/* CTA */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center mb-4">
                <Download className="w-5 h-5 text-[#1A1A2E]" />
              </div>
              <h4 className="text-sm font-bold text-[#1A1A2E] mb-2">Download Repayment Plan</h4>
              <p className="text-xs text-[#9CA3AF] mb-4">Get a detailed breakdown of your monthly payments.</p>
              <button className="text-xs font-bold text-[#1E6BFF] hover:underline">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SliderInput = ({ label, value, onChange, min, max, step, format }: { label: string, value: number, onChange: (val: number) => void, min: number, max: number, step: number, format?: (val: number) => string }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <label className="text-sm font-bold text-[#4A5568]">{label}</label>
      <span className="text-sm font-black text-[#1E6BFF] bg-[#EBF2FF] px-3 py-1 rounded-lg">
        {format ? format(value) : value}
      </span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-[#F3F4F6] rounded-lg appearance-none cursor-pointer accent-[#1E6BFF]"
    />
  </div>
)

const ResultRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs text-white/50">{label}</span>
    <span className="text-sm font-bold">{value}</span>
  </div>
)

export default HomeLoanCalculator
