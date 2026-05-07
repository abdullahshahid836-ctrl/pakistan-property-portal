'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, ShieldCheck, Users, Target, Building2, ChevronRight, ArrowRight, Sparkles, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/shared/Reveal'

const AboutPage = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F5F0E8] overflow-hidden">
      
      {/* 1. FLECTO HERO: Overlapping Cards + Parallax */}
      <section className="relative h-[90vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8] via-transparent to-[#F5F0E8]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal direction="down">
             <div className="flex justify-center mb-8">
                <span className="pill-label bg-[#004737] text-[#C8F55A] px-10 py-3 text-xs shadow-2xl">WHO WE ARE</span>
             </div>
          </Reveal>
          
          <Reveal direction="line-mask" delay={0.2}>
            <h1 className="font-syne font-black text-5xl sm:text-8xl lg:text-9xl text-[#0D1B17] uppercase tracking-tighter leading-[0.85] mb-12">
              Pakistan's <br />
              <span className="text-[#004737] italic">Property</span> <br />
              Network.
            </h1>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-6 mt-16">
            <motion.div style={{ y: y1 }}>
              <Reveal direction="scale" delay={0.4}>
                 <div className="flecto-tab-tl bg-white p-10 w-72 text-left shadow-2xl border border-[#DDD8CF] hover:scale-105 transition-transform duration-500">
                    <Sparkles className="w-8 h-8 text-[#004737] mb-6" />
                    <h3 className="font-syne font-black text-xl text-[#0D1B17] uppercase mb-4">Visionary</h3>
                    <p className="text-xs font-inter text-[#7A9088] leading-relaxed">Redefining the real estate landscape through premium technology.</p>
                 </div>
              </Reveal>
            </motion.div>
            <motion.div style={{ y: y2 }}>
              <Reveal direction="scale" delay={0.6}>
                 <div className="flecto-tab-tr bg-[#004737] p-10 w-72 text-left shadow-2xl border border-[#0A5A46] hover:scale-105 transition-transform duration-500">
                    <Globe className="w-8 h-8 text-[#C8F55A] mb-6" />
                    <h3 className="font-syne font-black text-xl text-white uppercase mb-4">National</h3>
                    <p className="text-xs font-inter text-[#A8C4BB] leading-relaxed">A comprehensive ecosystem spanning across major residential hubs.</p>
                 </div>
              </Reveal>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MISSION & CORE: Orbiting Cards Layout */}
      <section className="flecto-section py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-5 space-y-12">
                 <Reveal direction="left">
                    <div className="w-20 h-2 bg-[#C8F55A] mb-10" />
                    <h2 className="font-syne font-black text-4xl sm:text-6xl text-[#0D1B17] uppercase tracking-tighter leading-[0.9]">
                      Our Mission <br />
                      <span className="text-[#004737] italic">Defined.</span>
                    </h2>
                    <p className="text-xl font-inter text-[#3D5249] leading-relaxed mt-10">
                      Founded in 2012, Pakistan Property Portal has evolved from a listing directory into a comprehensive ecosystem for real estate investment and management.
                    </p>
                 </Reveal>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                    {[
                      { icon: ShieldCheck, title: 'Integrity First', desc: 'Standards of ethics and transparency in every transaction.' },
                      { icon: Target, title: 'Innovation', desc: 'Leveraging data and technology to simplify real estate.' }
                    ].map((val, i) => (
                      <Reveal key={i} delay={i * 0.2}>
                         <div className="space-y-4">
                            <val.icon className="w-6 h-6 text-[#004737]" />
                            <h4 className="font-syne font-black text-lg text-[#0D1B17] uppercase">{val.title}</h4>
                            <p className="text-[10px] font-inter text-[#7A9088] uppercase tracking-widest leading-loose">{val.desc}</p>
                         </div>
                      </Reveal>
                    ))}
                 </div>
              </div>

              <div className="lg:col-span-7 relative h-[600px] flex items-center justify-center">
                 {/* Orbiting Elements */}
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 flex items-center justify-center"
                 >
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-10 left-10 w-48 h-48 flecto-tab-tl bg-[#F5F0E8] p-8 flex flex-col justify-between shadow-xl"
                    >
                       <p className="text-4xl font-black font-syne text-[#004737]">12+</p>
                       <p className="text-[8px] font-black font-syne text-[#7A9088] uppercase tracking-widest">YEARS EXP</p>
                    </motion.div>
                    
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="absolute -bottom-10 right-10 w-48 h-48 flecto-tab-tr bg-[#004737] p-8 flex flex-col justify-between text-white shadow-xl"
                    >
                       <p className="text-4xl font-black font-syne text-[#C8F55A]">50K+</p>
                       <p className="text-[8px] font-black font-syne text-[#A8C4BB] uppercase tracking-widest">MEMBERS</p>
                    </motion.div>
                 </motion.div>

                 {/* Center Concept */}
                 <div className="relative w-full max-w-lg h-96 rounded-[3rem] overflow-hidden shadow-2xl z-10">
                    <Image 
                      src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200" 
                      alt="Property Concept" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 bg-[#004737]/40 backdrop-blur-sm flex items-center justify-center p-10 text-center">
                       <p className="text-white font-syne font-black text-xl uppercase leading-tight italic">
                          "Property isn't just about square feet — it's about life's biggest milestones."
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. JOURNEY: Timeline with Double-Tabbed Cards */}
      <section className="py-32 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4">
           <div className="text-center mb-24">
              <Reveal direction="down">
                 <h2 className="font-syne font-black text-4xl sm:text-6xl text-[#0D1B17] uppercase tracking-tighter">Our Journey</h2>
              </Reveal>
           </div>

           <div className="relative space-y-12">
              {/* Animated Timeline Line */}
              <motion.div 
                className="absolute left-16 top-0 bottom-0 w-1 bg-[#004737]/10 origin-top hidden sm:block"
                style={{ scaleY: scrollYProgress }}
              />

              {[
                { year: '2012', title: 'The Genesis', desc: 'Launched as a pioneering property listing platform with a focus on verified assets.' },
                { year: '2016', title: 'Market Integration', desc: 'Expanded to include comprehensive market data and specialized area guides.' },
                { year: '2020', title: 'Tech Overhaul', desc: 'Introduced high-precision analytical tools and a premium user ecosystem.' },
                { year: 'Present', title: 'National Leader', desc: 'Pakistan\'s most trusted property network with over 50,000 active members.' }
              ].map((item, i) => (
                <Reveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                   <div className="group flex gap-12 items-center relative z-10">
                      <div className="text-3xl font-black font-syne text-[#004737] w-32 shrink-0 bg-[#F5F0E8] relative z-10 text-center">
                         {item.year}
                      </div>
                      <div className="flecto-double-tab bg-white p-10 border border-[#DDD8CF] shadow-xl flex-grow group-hover:shadow-2xl group-hover:border-[#004737]/20 transition-all duration-500">
                         <h3 className="font-syne font-black text-xl text-[#0D1B17] uppercase mb-4 tracking-tight">{item.title}</h3>
                         <p className="text-sm font-inter text-[#7A9088] leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* 4. THE "EAR" CTA: Giant Custom Shaped Footer CTA */}
      <section className="pb-32 bg-[#F5F0E8] relative z-10 px-4 sm:px-10">
        <Reveal direction="up">
           <div className="flecto-ear-cta bg-white max-w-7xl mx-auto p-12 sm:p-32 text-center shadow-[0_100px_200px_rgba(0,71,55,0.1)] border-x border-b border-[#DDD8CF] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#F5F0E8] rounded-full blur-3xl -ml-16 -mt-16 opacity-40" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8F55A] rounded-full blur-3xl -mr-16 -mt-16 opacity-20" />
              
              <div className="relative z-10">
                <h2 className="font-syne font-black text-4xl sm:text-7xl text-[#0D1B17] uppercase tracking-tighter leading-[0.85] mb-12">
                   Ready to find <br />
                   <span className="text-[#004737] italic">your future?</span>
                </h2>
                <p className="text-lg sm:text-xl font-inter text-[#3D5249] mb-16 max-w-2xl mx-auto opacity-70">
                   Join thousands of Pakistanis who trust our platform for their residential and commercial property needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                   <Link href="/register" className="w-full sm:w-auto px-12 py-6 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all uppercase tracking-[0.3em] shadow-2xl">
                      JOIN THE NETWORK
                   </Link>
                   <Link href="/contact" className="w-full sm:w-auto px-12 py-6 bg-[#F5F0E8] text-[#004737] text-xs font-black font-syne rounded-2xl border border-[#DDD8CF] hover:bg-white transition-all uppercase tracking-[0.3em]">
                      CONTACT SUPPORT
                   </Link>
                </div>
              </div>
           </div>
        </Reveal>
      </section>

    </div>
  )
}

export default AboutPage
