'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ShieldCheck, Users, Target, Building2, ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const AboutPage = () => {
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
            <span className="opacity-60">About Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Our Mission</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Redefining the real estate landscape in Pakistan through transparency, technology and a premium user experience.
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
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" 
                alt="Our Office" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-[#004737]/20" />
            </div>
            {/* Stats Overlay */}
            <div className="absolute -bottom-10 -right-10 bg-white rounded-[2rem] p-8 shadow-2xl border border-[#F5F0E8] hidden sm:block">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-black font-syne text-[#004737]">12+</p>
                  <p className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-widest">YEARS EXP</p>
                </div>
                <div className="w-px h-10 bg-[#F5F0E8]" />
                <div className="text-center">
                  <p className="text-3xl font-black font-syne text-[#004737]">50K+</p>
                  <p className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-widest">MEMBERS</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="w-16 h-1 bg-[#C8F55A]" />
            <h2 className="text-3xl sm:text-4xl font-black font-syne text-[#0D1B17] uppercase tracking-tight leading-tight">
              PAKISTAN'S MOST TRUSTED <br className="hidden sm:block" /> PROPERTY NETWORK
            </h2>
            <p className="text-lg font-inter text-[#3D5249] leading-relaxed">
              Founded in 2012, Pakistan Property Portal has evolved from a listing directory into a comprehensive ecosystem for real estate investment and management.
            </p>
            <p className="text-base font-inter text-[#7A9088] leading-relaxed">
              We understand that property isn't just about square feet — it's about life's biggest milestones. Our platform combines deep local expertise with world-class technology to ensure every transaction is secure, transparent and efficient.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Verified Listings Only',
                'Transparent Market Data',
                'Expert Legal Guidance',
                'Premium User Support'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004737]" />
                  <span className="text-sm font-black font-syne text-[#3D5249] uppercase tracking-wide">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">Our Core Values</h2>
              <div className="w-20 h-1.5 bg-[#C8F55A] mx-auto mt-4 rounded-full" />
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Integrity First', desc: 'We maintain the highest standards of ethics and transparency in every property listing and transaction.', icon: ShieldCheck },
                { title: 'Innovation', desc: 'Leveraging data and technology to simplify the complex world of real estate investment.', icon: Target },
                { title: 'Community', desc: 'Building lasting relationships between buyers, sellers and agents across Pakistan.', icon: Users },
              ].map((val, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] p-10 border border-[#DDD8CF] shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.1)] hover:-translate-y-2 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F0E8] flex items-center justify-center mb-8 group-hover:bg-[#004737] transition-all duration-500">
                    <val.icon className="w-7 h-7 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                  </div>
                  <h3 className="text-xl font-black font-syne text-[#0D1B17] mb-4 uppercase tracking-tight">{val.title}</h3>
                  <p className="text-sm font-inter text-[#7A9088] leading-relaxed">{val.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#004737] rounded-[3rem] p-10 sm:p-20 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black font-syne mb-6 uppercase tracking-tight">Ready to find your future?</h2>
            <p className="text-base sm:text-lg font-inter text-[#A8C4BB] mb-10 max-w-2xl mx-auto opacity-80">
              Join thousands of Pakistanis who trust our platform for their residential and commercial property needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-[#C8F55A] text-[#004737] text-xs font-black font-syne rounded-2xl hover:bg-white transition-all uppercase tracking-widest shadow-xl">
                JOIN THE NETWORK
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-black font-syne rounded-2xl transition-all uppercase tracking-widest">
                CONTACT SUPPORT
              </Link>
            </div>
          </div>
          {/* Patterns */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C8F55A]/5 rounded-full blur-3xl" />
        </div>

      </div>
    </div>
  )
}

export default AboutPage
