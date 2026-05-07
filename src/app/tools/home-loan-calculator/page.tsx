'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calculator, Info, ChevronRight, ArrowRight, Download, Printer } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    
    if (monthlyRate === 0) {
      const pmt = loanAmount / numberOfPayments
      setMonthlyInstallment(pmt)
      setTotalPayment(loanAmount)
      setTotalInterest(0)
    } else {
      const pmt = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      setMonthlyInstallment(pmt)
      setTotalPayment(pmt * numberOfPayments)
      setTotalInterest((pmt * numberOfPayments) - loanAmount)
    }
  }, [propertyPrice, downPaymentPct, tenure, interestRate])

  const formatPKR = (val: number) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(val)
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      {/* Header */}
      <div className="bg-[#004737] pt-24 pb-16 relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">Mortgage Tools</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Loan Calculator</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Plan your property investment with precision. Calculate monthly installments, total interest and repayment schedules.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Inputs Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <div className="space-y-12">
                <SliderInput 
                  label="PROPERTY VALUE" 
                  value={propertyPrice} 
                  onChange={setPropertyPrice} 
                  min={1000000} 
                  max={500000000} 
                  step={100000}
                  format={formatPKR}
                />
                
                <SliderInput 
                  label="DOWN PAYMENT (%)" 
                  value={downPaymentPct} 
                  onChange={setDownPaymentPct} 
                  min={10} 
                  max={80} 
                  step={1}
                  format={(val) => `${val}% (${formatPKR(propertyPrice * (val/100))})`}
                />

                <SliderInput 
                  label="LOAN TENURE (YEARS)" 
                  value={tenure} 
                  onChange={setTenure} 
                  min={1} 
                  max={25} 
                  step={1}
                  format={(val) => `${val} YEARS`}
                />

                <SliderInput 
                  label="ANNUAL INTEREST RATE (%)" 
                  value={interestRate} 
                  onChange={setInterestRate} 
                  min={5} 
                  max={25} 
                  step={0.1}
                  format={(val) => `${val}%`}
                />
              </div>
            </div>

            {/* Contextual Guidance */}
            <div className="bg-[#004737] rounded-[2rem] p-8 text-white flex gap-6 relative overflow-hidden shadow-xl">
              <div className="w-14 h-14 bg-[#C8F55A] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                <Info className="w-7 h-7 text-[#004737]" />
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-black font-syne mb-2 uppercase tracking-tight">Market Insight</h4>
                <p className="text-sm font-inter text-[#A8C4BB] leading-relaxed opacity-80">
                  Most banks in Pakistan offer home financing at KIBOR + a spread. Current benchmark rates vary between 12% to 18%. Down payments typically range from 20% to 30% of the property value.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Results Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] border border-[#DDD8CF] p-10 shadow-[0_40px_100px_rgba(0,71,55,0.1)] relative overflow-hidden">
              {/* Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F0E8] rounded-full blur-3xl -mr-16 -mt-16" />

              <div className="relative z-10">
                <h3 className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4">MONTHLY INSTALLMENT</h3>
                <div className="text-3xl sm:text-4xl font-black font-syne text-[#004737] mb-10 tracking-tight leading-none">
                  {formatPKR(monthlyInstallment)}
                </div>

                <div className="space-y-5 pt-8 border-t border-[#F5F0E8]">
                  <ResultRow label="PRINCIPAL LOAN" value={formatPKR(propertyPrice * (1 - downPaymentPct/100))} />
                  <ResultRow label="TOTAL INTEREST" value={formatPKR(totalInterest)} />
                  <ResultRow label="TOTAL REPAYMENT" value={formatPKR(totalPayment)} />
                </div>

                <button className="w-full mt-10 py-5 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest">
                  GET BANK QUOTES <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Supplementary Action */}
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_4px_12px_rgba(0,71,55,0.04)] flex flex-col items-center text-center group hover:bg-[#F5F0E8] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-[#004737] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6 text-[#C8F55A]" />
              </div>
              <h4 className="text-sm font-black font-syne text-[#0D1B17] mb-2 uppercase tracking-tight">REPAYMENT SCHEDULE</h4>
              <p className="text-xs font-inter text-[#7A9088] mb-6 px-4">Download a detailed monthly breakdown of principal and interest components.</p>
              <button className="text-[10px] font-black font-syne text-[#004737] uppercase tracking-widest border-b-2 border-[#C8F55A] pb-1 hover:border-[#004737] transition-all">DOWNLOAD PDF REPORT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SliderInput = ({ label, value, onChange, min, max, step, format }: { label: string, value: number, onChange: (val: number) => void, min: number, max: number, step: number, format?: (val: number) => string }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">{label}</label>
      <span className="text-sm font-black font-syne text-[#004737] bg-[#F5F0E8] px-4 py-2 rounded-xl border border-[#DDD8CF]">
        {format ? format(value) : value}
      </span>
    </div>
    <div className="relative h-2 w-full bg-[#F5F0E8] rounded-full overflow-hidden border border-[#DDD8CF]">
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full bg-transparent appearance-none cursor-pointer z-10 accent-[#004737]"
      />
      <div 
        className="absolute left-0 top-0 h-full bg-[#C8F55A]" 
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
  </div>
)

const ResultRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest">{label}</span>
    <span className="text-sm font-black font-syne text-[#3D5249]">{value}</span>
  </div>
)

export default HomeLoanCalculator
