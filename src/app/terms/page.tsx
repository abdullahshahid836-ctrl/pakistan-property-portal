'use client'

import React from 'react'
import Link from 'next/link'
import { Gavel, Scale, FileText, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const TermsPage = () => {
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
            <span className="opacity-60">Legal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Terms of Use</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Please read these terms carefully before using the Pakistan Property Portal services.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
        
        {/* Disclaimer Box */}
        <div className="bg-[#004737] rounded-[2rem] p-8 text-white flex gap-6 mb-16 relative overflow-hidden shadow-2xl">
           <div className="w-14 h-14 bg-[#C8F55A] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
             <AlertCircle className="w-7 h-7 text-[#004737]" />
           </div>
           <div className="relative z-10">
             <h4 className="text-sm font-black font-syne mb-2 uppercase tracking-tight">Important Notice</h4>
             <p className="text-sm font-inter text-[#A8C4BB] leading-relaxed opacity-90">
               By accessing our platform, you agree to be bound by these Terms. Our services are intended for users aged 18 and above.
             </p>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-[3rem] p-10 sm:p-16 border border-[#DDD8CF] shadow-[0_40px_100px_rgba(0,71,55,0.06)] space-y-12">
          
          <section>
            <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C8F55A] rounded-full" />
              1. Listing Accuracy
            </h2>
            <p className="text-sm font-inter text-[#3D5249] leading-relaxed">
              Users are responsible for ensuring that all information provided in property listings is accurate, up-to-date, and not misleading. Pakistan Property Portal reserves the right to remove any listing that violates our quality standards or contains fraudulent information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C8F55A] rounded-full" />
              2. User Conduct
            </h2>
            <p className="text-sm font-inter text-[#3D5249] leading-relaxed mb-4">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="space-y-3 ml-4">
               {['Posting duplicate or fake listings', 'Harassing other users or agents', 'Using automated scripts to scrape data', 'Violating local real estate regulations'].map((item, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm font-inter text-[#7A9088]">
                    <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    {item}
                 </li>
               ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C8F55A] rounded-full" />
              3. Limitation of Liability
            </h2>
            <p className="text-sm font-inter text-[#3D5249] leading-relaxed">
              While we strive to maintain the integrity of our platform, Pakistan Property Portal acts as a marketplace. We are not a party to any transaction and cannot guarantee the quality, safety, or legality of properties advertised. Users must perform their own due diligence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C8F55A] rounded-full" />
              4. Intellectual Property
            </h2>
            <p className="text-sm font-inter text-[#3D5249] leading-relaxed">
              All content on this site, including logos, text, graphics, and software, is the property of Pakistan Property Portal and protected by Pakistani and international copyright laws.
            </p>
          </section>

          <div className="pt-12 border-t border-[#F5F0E8] flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#004737]" />
                <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest">Effective Date: May 2025</span>
             </div>
             <Link href="/about" className="text-[10px] font-black font-syne text-[#004737] uppercase tracking-widest border-b-2 border-[#C8F55A] pb-1 hover:border-[#004737] transition-all">
                LEARN MORE ABOUT US
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TermsPage
