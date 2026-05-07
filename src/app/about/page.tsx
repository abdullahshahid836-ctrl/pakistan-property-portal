'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Target } from 'lucide-react'

// ─────────────────────────────────────────────
// EASE: Flecto's signature Quart Out ease
// ─────────────────────────────────────────────
const EASE = [0.33, 1, 0.68, 1] as const

const Line = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: '110%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  </div>
)

const AboutPage = () => {
  return (
    <div className="bg-[#004737] min-h-screen overflow-x-hidden selection:bg-[#5EEB9E] selection:text-[#004737]">
      
      {/* 1. HERO SECTION: Flecto Exact Replica */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        
        {/* Background Visual (Grayscale Leaf/Eye Motif) */}
        <div className="absolute top-1/2 right-[-10%] w-[60%] h-[80%] -translate-y-1/2 pointer-events-none opacity-20">
           <img 
             src="https://images.unsplash.com/photo-1544933863-4528192cdbb1?w=1200" 
             alt="Organic Texture" 
             className="w-full h-full object-contain grayscale"
           />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT: THE HEADLINE */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-10 px-5 py-2 border border-[#5EEB9E]/20 text-[#5EEB9E] font-syne font-black text-[10px] uppercase tracking-[0.4em] rounded-full"
            >
              WHO WE ARE
            </motion.div>

            <div className="space-y-0">
               <Line delay={0.3}>
                 <h1 className="font-syne font-black text-[clamp(3.5rem,8.5vw,9rem)] text-white uppercase tracking-[-0.04em] leading-[0.85]">
                   Unlocking
                 </h1>
               </Line>
               <Line delay={0.4}>
                 <h1 className="font-syne font-black text-[clamp(3.5rem,8.5vw,9rem)] text-[#5EEB9E] italic uppercase tracking-[-0.04em] leading-[0.85]">
                   Pakistan's
                 </h1>
               </Line>
               <Line delay={0.5}>
                 <h1 className="font-syne font-black text-[clamp(3.5rem,8.5vw,9rem)] text-white uppercase tracking-[-0.04em] leading-[0.85]">
                   Future.
                 </h1>
               </Line>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-12 text-lg sm:text-xl text-white font-inter leading-relaxed max-w-lg"
            >
              At Pakistan Property Portal, we help individuals and businesses do better business through sustainable access models and verified property data.
            </motion.p>
          </div>

          {/* RIGHT: THE STACKED CARDS */}
          <div className="relative h-[600px] w-full flex items-center justify-center">
            
            {/* MISSION CARD (Dark Green, Notch Top-Right) */}
            <motion.div
              initial={{ opacity: 0, x: -100, y: -100, rotate: -5 }}
              animate={{ opacity: 1, x: -40, y: -40, rotate: 2 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
              className="absolute w-[320px] sm:w-[480px] z-10"
            >
               {/* Label Tab */}
               <div className="flex justify-end">
                  <div className="bg-[#004737] px-8 py-3 rounded-t-2xl border-t border-x border-[#5EEB9E]/20">
                     <span className="text-[#5EEB9E] font-syne font-black text-[10px] uppercase tracking-[0.2em]">MISSION</span>
                  </div>
               </div>
               <div className="bg-[#004737] rounded-[3rem] rounded-tr-none p-12 border border-[#5EEB9E]/20 shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
                  <h3 className="font-syne font-black text-4xl text-[#5EEB9E] uppercase leading-tight mb-8">
                     Build good <br /> business better.
                  </h3>
                  <p className="text-white/60 font-inter text-sm leading-relaxed mb-10">
                     Managing sustainable businesses is no longer an idea on the horizon: it is the factor that determines success.
                  </p>
                  <div className="flex items-center gap-4 text-[#5EEB9E]">
                     <ShieldCheck className="w-8 h-8" />
                     <span className="font-syne font-black text-xs uppercase tracking-[0.2em]">VERIFIED NETWORK</span>
                  </div>
               </div>
            </motion.div>

            {/* VISION CARD (Mint Green, Notch Top-Left) */}
            <motion.div
              initial={{ opacity: 0, x: 100, y: 100, rotate: 5 }}
              animate={{ opacity: 1, x: 60, y: 80, rotate: -3 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
              className="absolute w-[280px] sm:w-[380px] z-20"
            >
               {/* Label Tab */}
               <div className="flex justify-start">
                  <div className="bg-[#5EEB9E] px-8 py-3 rounded-t-2xl">
                     <span className="text-[#004737] font-syne font-black text-[10px] uppercase tracking-[0.2em]">VISION</span>
                  </div>
               </div>
               <div className="bg-[#5EEB9E] rounded-[3rem] rounded-tl-none p-10 shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                  <h3 className="font-syne font-black text-3xl text-[#004737] uppercase leading-tight mb-6">
                     12+ Years <br /> Experience.
                  </h3>
                  <div className="flex items-center gap-4 text-[#004737]">
                     <Target className="w-6 h-6" />
                     <span className="font-syne font-black text-xs uppercase tracking-[0.2em]">MARKET LEADER</span>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* REST OF PAGE (Placeholders for now as we focus on Hero) */}
      <div className="h-screen bg-white" />

    </div>
  )
}

export default AboutPage
