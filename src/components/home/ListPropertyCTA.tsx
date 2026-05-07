import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { RevealWrapper } from '@/components/shared/RevealWrapper'

const ListPropertyCTA = () => {
  return (
    <section className="py-20 bg-[#004737] relative overflow-hidden z-10">

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />

      {/* Glow orb */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8F55A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#006B55]/40 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <RevealWrapper>
          <span className="pill-label-light">FREE LISTING</span>

          <h2 className="font-syne font-bold text-4xl sm:text-5xl lg:text-6xl text-[#F5F0E8] mt-5 leading-tight">
            List Your Property
            <span className="text-[#C8F55A] italic"> Free.</span>
          </h2>

          <p className="text-[#A8C4BB] text-base sm:text-lg mt-5 max-w-lg mx-auto font-inter leading-relaxed">
            Reach thousands of buyers and tenants across Pakistan instantly with our verified platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/add-property"
              className="bg-[#C8F55A] text-[#004737] font-syne font-black px-8 py-4 rounded-2xl text-base tracking-wide hover:bg-[#B8E84A] transition-all shadow-[0_4px_20px_rgba(200,245,90,0.3)] hover:shadow-[0_8px_30px_rgba(200,245,90,0.4)] hover:-translate-y-0.5 flex items-center gap-2 justify-center">
              <Plus className="w-5 h-5" /> Add Property Now
            </Link>
            <Link href="/search"
              className="border-2 border-[#F5F0E8]/30 text-[#F5F0E8] font-syne font-bold px-8 py-4 rounded-2xl text-base hover:border-[#F5F0E8]/60 hover:bg-white/5 transition-all flex items-center gap-2 justify-center">
              Browse Listings
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10">
            {[
              { stat: '50,000+', label: 'Active Listings' },
              { stat: '100%',    label: 'Free to List' },
              { stat: '24hrs',   label: 'Go Live Fast' },
              { stat: '1M+',     label: 'Monthly Visitors' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="text-xl font-black text-[#C8F55A] font-syne">{item.stat}</div>
                <div className="text-[11px] text-[#A8C4BB] font-inter uppercase tracking-wider mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default ListPropertyCTA
