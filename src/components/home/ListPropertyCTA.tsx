'use client'

import React from 'react'
import Link from 'next/link'
import { Plus, Sparkles, Search, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '@/components/shared/Reveal'

const ListPropertyCTA = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#004737] relative overflow-hidden z-10">

      {/* Cinematic Background Animations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C8F55A] rounded-full blur-[150px] pointer-events-none" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#006B55] rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Reveal direction="up">
          <div className="flex justify-center mb-8">
             <span className="pill-label-light border-[#C8F55A]/30 text-[#C8F55A] px-10 py-2.5">PREMIUM LISTING SERVICE</span>
          </div>

          <h2 className="font-syne font-black text-5xl sm:text-7xl lg:text-8xl text-[#F5F0E8] uppercase tracking-tighter leading-[0.9] mb-8">
            Monetize Your <br />
            <span className="text-[#C8F55A] italic">Asset.</span>
          </h2>

          <p className="text-[#A8C4BB] text-lg sm:text-2xl mt-8 max-w-2xl mx-auto font-inter font-medium opacity-80 leading-relaxed mb-12">
            Unlock the true potential of your property by reaching over 1 million verified buyers through Pakistan's elite property ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/add-property"
                className="bg-[#C8F55A] text-[#004737] font-syne font-black px-12 py-6 rounded-[2rem] text-sm tracking-[0.2em] hover:bg-white transition-all shadow-[0_20px_60px_rgba(200,245,90,0.3)] flex items-center gap-4 justify-center uppercase"
              >
                <Plus className="w-6 h-6" /> Start Listing
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/search"
                className="border-2 border-white/20 text-white font-syne font-black px-12 py-6 rounded-[2rem] text-sm tracking-[0.2em] hover:border-[#C8F55A] hover:text-[#C8F55A] transition-all flex items-center gap-4 justify-center uppercase"
              >
                <Search className="w-5 h-5" /> Browse Market
              </Link>
            </motion.div>
          </div>

          {/* Precision Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 pt-16 border-t border-white/5">
            {[
              { stat: '50k+', label: 'ASSETS MANAGED' },
              { stat: '100%',  label: 'ZERO COST ENTRY' },
              { stat: '24hrs', label: 'ACCELERATED GO-LIVE' },
              { stat: '1M+',   label: 'GLOBAL REACH' },
            ].map(item => (
              <div key={item.label} className="text-center group">
                <div className="text-3xl font-black text-[#C8F55A] font-syne tracking-tight group-hover:scale-110 transition-transform">{item.stat}</div>
                <div className="text-[10px] text-[#A8C4BB] font-black font-syne uppercase tracking-[0.3em] mt-3 opacity-60 group-hover:opacity-100 transition-opacity">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#C8F55A]" />
             </div>
             <p className="text-[10px] font-black font-syne text-[#A8C4BB] uppercase tracking-[0.2em]">Verified by the Real Estate Regulatory Authority</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ListPropertyCTA
