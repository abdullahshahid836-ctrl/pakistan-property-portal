'use client'

import React from 'react'
import Link from 'next/link'
import { Landmark, Search, ChevronRight, ShieldCheck, ExternalLink, Info, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const LandRecordsPage = () => {
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
            <span className="opacity-60">Legal Verification</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Land Records</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Access official government portals to verify ownership, track transfer history and authenticate property documents.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          {[
            { province: 'Punjab', authority: 'PLRA', desc: 'Punjab Land Records Authority (Zameen Portal)', accent: 'bg-[#C8F55A]', url: 'https://www.punjab-zameen.gov.pk/' },
            { province: 'Sindh', authority: 'LARMIS', desc: 'Sindh Land Records Information Management System', accent: 'bg-blue-400', url: 'https://sindhzameen.gos.pk/' },
            { province: 'Khyber Pakhtunkhwa', authority: 'LARMIS', desc: 'KP Land Records & Revenue Management System', accent: 'bg-emerald-400', url: 'https://larmis.kp.gov.pk/' },
            { province: 'Balochistan', authority: 'LRMIS', desc: 'Balochistan Digitized Land Records Portal', accent: 'bg-red-400', url: 'http://balochistanlrmis.org/' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] border border-[#DDD8CF] overflow-hidden shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] hover:-translate-y-2 transition-all duration-700 group flex flex-col">
              <div className={cn("h-2.5 w-full", item.accent)} />
              <div className="p-10 flex flex-col flex-1">
                <div className="w-16 h-16 rounded-2xl bg-[#F5F0E8] flex items-center justify-center mb-8 group-hover:bg-[#004737] transition-all duration-500">
                  <Landmark className="w-8 h-8 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                </div>
                <h3 className="text-xl font-black font-syne text-[#0D1B17] mb-1 uppercase tracking-tight">{item.province}</h3>
                <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-6">{item.authority}</p>
                <p className="text-xs font-inter text-[#3D5249] leading-relaxed mb-10 opacity-70 flex-1">{item.desc}</p>
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#004737] text-[#C8F55A] text-[10px] font-black font-syne rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all uppercase tracking-widest shadow-lg"
                >
                  ACCESS PORTAL <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#004737] rounded-[3rem] p-10 sm:p-14 text-white flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
          <div className="w-24 h-24 rounded-[2rem] bg-[#C8F55A] flex items-center justify-center shrink-0 shadow-xl relative z-10">
            <ShieldCheck className="w-12 h-12 text-[#004737]" />
          </div>
          <div className="relative z-10 text-center lg:text-left">
            <h4 className="text-2xl font-black font-syne mb-4 uppercase tracking-tight">Security & Verification</h4>
            <p className="text-base font-inter text-[#A8C4BB] leading-relaxed max-w-4xl opacity-90">
              Verifying land records is the most critical step in property acquisition. Online systems provide instant access to <span className="text-white font-bold italic">Ownership Deeds (Fard)</span> and transaction history. We strongly recommend cross-referencing digital records with physical verification at the local <span className="text-white font-bold">Patwar Khana</span> or Registrar office before committing to any financial transaction.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8F55A]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  )
}

export default LandRecordsPage
