import React from 'react'
import Link from 'next/link'
import { Plus, Check } from 'lucide-react'

const ListPropertyCTA = () => {
  return (
    <section className="bg-[#1E6BFF] py-16 sm:py-20 overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-white/20 text-white border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
          <Check className="w-3 h-3" /> For Property Owners
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          List Your Property <span className="italic font-serif text-white/90">Free</span> and Reach Millions
        </h2>
        
        <p className="text-base sm:text-lg text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
          Join Pakistan's largest real estate network. List your home, apartment or plot in minutes and connect with verified buyers and tenants instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/add-property"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1E6BFF] text-sm font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all w-full sm:w-auto group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Add Your Property Now
          </Link>
          <Link 
            href="/agents"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1A1A2E] text-white text-sm font-bold rounded-2xl hover:bg-[#252545] transition-all w-full sm:w-auto"
          >
            Find an Agent
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/60 text-xs font-medium uppercase tracking-widest">
          <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> 100% Free Listing</span>
          <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Verified Buyers</span>
          <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Expert Support</span>
        </div>
      </div>
    </section>
  )
}

export default ListPropertyCTA
