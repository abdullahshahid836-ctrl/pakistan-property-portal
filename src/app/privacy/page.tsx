'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldAlert, Lock, Eye, FileText, ChevronRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const PrivacyPage = () => {
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
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Privacy Policy</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Your trust is our most valuable asset. Learn how we protect and manage your personal information.
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
        
        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Lock, title: 'Secure Storage', desc: 'Enterprise-grade encryption for all user data.' },
            { icon: Eye, title: 'Transparency', desc: 'Complete clarity on what data we collect and why.' },
            { icon: ShieldAlert, title: 'User Control', desc: 'You own your data. Manage or delete it anytime.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-8 border border-[#DDD8CF] text-center group hover:bg-[#004737] transition-all duration-500">
               <div className="w-14 h-14 rounded-2xl bg-[#F5F0E8] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C8F55A] transition-all duration-500">
                 <item.icon className="w-6 h-6 text-[#004737]" />
               </div>
               <h3 className="text-sm font-black font-syne text-[#0D1B17] mb-3 uppercase tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
               <p className="text-[11px] font-inter text-[#7A9088] leading-relaxed group-hover:text-[#A8C4BB] transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Detailed Content */}
        <div className="bg-white rounded-[3rem] p-10 sm:p-16 border border-[#DDD8CF] shadow-[0_40px_100px_rgba(0,71,55,0.06)] space-y-12">
          
          <section>
            <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C8F55A] rounded-full" />
              1. Information Collection
            </h2>
            <p className="text-sm font-inter text-[#3D5249] leading-relaxed mb-4">
              We collect information that you provide directly to us when you create an account, list a property, or communicate with us. This includes:
            </p>
            <ul className="space-y-3 ml-4">
               {['Name, Email and Phone Number', 'Property details and images', 'User preferences and search history', 'Communication logs with agents'].map((item, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm font-inter text-[#7A9088]">
                    <CheckCircle2 className="w-4 h-4 text-[#004737] mt-0.5 shrink-0" />
                    {item}
                 </li>
               ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C8F55A] rounded-full" />
              2. How We Use Data
            </h2>
            <p className="text-sm font-inter text-[#3D5249] leading-relaxed">
              We use your data to provide, maintain and improve our services, including to connect buyers with sellers, personalize your experience, and send you technical notices and support messages. We never sell your personal contact information to third-party marketing companies without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C8F55A] rounded-full" />
              3. Data Protection
            </h2>
            <p className="text-sm font-inter text-[#3D5249] leading-relaxed">
              We employ industry-standard security measures to protect your information from unauthorized access, alteration, or destruction. Our servers are located in secure environments with restricted access and 24/7 monitoring.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-[#C8F55A] rounded-full" />
              4. Your Choices
            </h2>
            <p className="text-sm font-inter text-[#3D5249] leading-relaxed">
              You can update your account information at any time via the user dashboard. If you wish to delete your account and all associated data, please contact our support team at <span className="text-[#004737] font-bold">privacy@pakistanproperty.pk</span>.
            </p>
          </section>

          <div className="pt-12 border-t border-[#F5F0E8] flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#004737]" />
                <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest">Last Modified: May 2025</span>
             </div>
             <Link href="/contact" className="text-[10px] font-black font-syne text-[#004737] uppercase tracking-widest border-b-2 border-[#C8F55A] pb-1 hover:border-[#004737] transition-all">
                HAVE QUESTIONS? CONTACT US
             </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
