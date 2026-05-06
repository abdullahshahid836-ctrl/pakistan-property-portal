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
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5 pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
            <span>Home</span>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span>Analytical Tools</span>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-flecto-green-light">Capital Financing Calculator</span>
          </div>
          <h1 className="text-4xl font-bold text-flecto-green font-syne tracking-tight">Capital Financing Calculator</h1>
          <p className="text-base text-flecto-text-muted font-inter font-medium mt-2">Projecting long-term amortization and financing structures.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inputs */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3rem] border border-flecto-green/5 p-8 sm:p-12 shadow-2xl shadow-flecto-green/[0.04]">
              <div className="space-y-12">
                <SliderInput 
                  label="Asset Valuation" 
                  value={propertyPrice} 
                  onChange={setPropertyPrice} 
                  min={1000000} 
                  max={500000000} 
                  step={100000}
                  format={formatPKR}
                />
                
                <SliderInput 
                  label="Initial Capital (Down Payment %)" 
                  value={downPaymentPct} 
                  onChange={setDownPaymentPct} 
                  min={10} 
                  max={80} 
                  step={1}
                  format={(val) => `${val}% (${formatPKR(propertyPrice * (val/100))})`}
                />

                <SliderInput 
                  label="Financing Tenure (Years)" 
                  value={tenure} 
                  onChange={setTenure} 
                  min={1} 
                  max={25} 
                  step={1}
                  format={(val) => `${val} Years`}
                />

                <SliderInput 
                  label="Yield / Interest Rate (%)" 
                  value={interestRate} 
                  onChange={setInterestRate} 
                  min={5} 
                  max={25} 
                  step={0.1}
                  format={(val) => `${val}%`}
                />
              </div>
            </div>

            <div className="bg-flecto-lime/10 rounded-[2rem] p-8 border border-flecto-lime/20 flex gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                <Info className="w-6 h-6 text-flecto-green" />
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-flecto-green uppercase tracking-widest mb-2 font-syne">Market Insight: Financing in Pakistan</h4>
                <p className="text-[11px] text-flecto-green font-inter font-medium leading-relaxed opacity-80">
                  Tier-1 financial institutions typically benchmark residential financing against KIBOR benchmarks with a floating spread. Average market yields fluctuate between 12% to 18%, necessitating strategic capital allocation.
                </p>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-flecto-green rounded-[3rem] p-10 text-flecto-cream shadow-2xl shadow-flecto-green/30 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-flecto-cream/40 mb-8 font-inter">Monthly Commitment</h3>
                <div className="text-4xl sm:text-5xl font-bold text-flecto-lime mb-10 font-syne tracking-tight">
                  {formatPKR(monthlyInstallment)}
                </div>

                <div className="space-y-5 pt-8 border-t border-flecto-cream/10">
                  <ResultRow label="Principal Financed" value={formatPKR(propertyPrice * (1 - downPaymentPct/100))} />
                  <ResultRow label="Projected Interest" value={formatPKR(totalInterest)} />
                  <ResultRow label="Total Capital Outlay" value={formatPKR(totalPayment)} />
                </div>

                <button className="w-full mt-10 py-5 bg-flecto-lime text-flecto-green text-xs font-bold rounded-full hover:bg-white transition-all duration-500 shadow-xl shadow-flecto-lime/10 flex items-center justify-center gap-3 font-syne uppercase tracking-widest">
                  Initialize Financing <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-flecto-lime/5 rounded-full blur-3xl" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-8 shadow-2xl shadow-flecto-green/[0.04] flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-flecto-cream flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 shadow-inner">
                <Download className="w-6 h-6 text-flecto-green-light" />
              </div>
              <h4 className="text-xs font-bold text-flecto-green mb-2 font-syne uppercase tracking-widest">Amortization Schedule</h4>
              <p className="text-[10px] text-flecto-text-muted mb-6 font-inter font-medium leading-relaxed">Secure a granular breakdown of your projected repayment trajectory.</p>
              <button className="text-[10px] font-bold text-flecto-green-light hover:text-flecto-green transition-colors font-syne uppercase tracking-widest border-b border-flecto-green-light/20 pb-1">Download Archive</button>
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
