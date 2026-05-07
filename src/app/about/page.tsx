'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ChevronRight, ArrowRight, Sparkles, Globe, ShieldCheck, Target, Users, Zap, Award } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/shared/Reveal'

const AboutPage = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Hero Parallax
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, 5])
  
  // Timeline Growth
  const timelineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} className="flecto-noise min-h-screen bg-[#F5F0E8] overflow-hidden selection:bg-[#B5FFD9] selection:text-[#002B1B]">
      
      {/* 1. HERO SECTION: 1:1 Parity with Flecto */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Background Grain/Parallax */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-10 grayscale contrast-125 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0E8] via-transparent to-[#F5F0E8]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col items-center text-center">
            <Reveal direction="down">
               <div className="mb-8">
                  <span className="px-6 py-2 bg-[#002B1B] text-[#B5FFD9] font-syne font-black text-[10px] uppercase tracking-[0.4em] rounded-full shadow-2xl">
                    Pakistan Property Portal
                  </span>
               </div>
            </Reveal>

            <Reveal direction="line-mask" delay={0.2}>
               <h1 className="font-syne font-black text-[12vw] lg:text-[10vw] text-[#002B1B] leading-[0.8] tracking-tighter uppercase mb-16">
                  Unlocking <br />
                  <span className="italic font-normal font-syne">Real Estate.</span>
               </h1>
            </Reveal>

            {/* Overlapping Floating Cards */}
            <div className="relative w-full h-[400px] mt-12">
               <motion.div 
                 style={{ y: heroY, rotate: -2 }}
                 className="absolute left-0 top-0 w-72 h-80 flecto-notch-tl bg-white p-10 shadow-[0_50px_100px_rgba(0,43,27,0.1)] border border-[#DDD8CF] z-20"
               >
                  <Sparkles className="w-10 h-10 text-[#002B1B] mb-8" />
                  <h3 className="font-syne font-black text-2xl text-[#002B1B] uppercase mb-4 leading-none">Visionary <br /> Tech</h3>
                  <p className="text-xs font-inter text-[#7A9088] leading-relaxed">Pioneering the digital landscape of property investment since 2012.</p>
               </motion.div>

               <motion.div 
                 style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -200]), rotate: 2 }}
                 className="absolute right-0 bottom-0 w-80 h-96 flecto-notch-tr bg-[#002B1B] p-12 shadow-[0_50px_100px_rgba(0,43,27,0.2)] border border-[#0A5A46] z-30"
               >
                  <Globe className="w-10 h-10 text-[#B5FFD9] mb-8" />
                  <h3 className="font-syne font-black text-2xl text-white uppercase mb-4 leading-none italic">National <br /> Reach</h3>
                  <p className="text-xs font-inter text-[#A8C4BB] leading-relaxed">The most comprehensive ecosystem for verified residential and commercial assets in Pakistan.</p>
                  <div className="mt-12 flex gap-4">
                     <div className="w-8 h-1 bg-[#B5FFD9]" />
                     <div className="w-8 h-1 bg-white/20" />
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CIRCULAR ECONOMY: Looping Orbit Section */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-12 relative z-10">
              <Reveal direction="left">
                 <h2 className="font-syne font-black text-5xl lg:text-7xl text-[#002B1B] uppercase tracking-tighter leading-[0.9]">
                    Our Circular <br />
                    <span className="italic font-normal">Mission.</span>
                 </h2>
                 <p className="text-xl font-inter text-[#3D5249] leading-relaxed max-w-lg mt-10">
                    We've evolved into a complete ecosystem that protects, connects, and empowers every stakeholder in the property journey.
                 </p>
              </Reveal>
              
              <div className="flex gap-12">
                 <div className="space-y-2">
                    <p className="text-4xl font-black font-syne text-[#002B1B]">12+</p>
                    <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em]">YEARS</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-4xl font-black font-syne text-[#002B1B]">50K+</p>
                    <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em]">USERS</p>
                 </div>
              </div>
           </div>

           <div className="relative h-[600px] flex items-center justify-center">
              {/* Continuous Orbit Container */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[500px] h-[500px] border border-dashed border-[#DDD8CF] rounded-full"
              >
                 {/* Orbiting Card 1 */}
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 flecto-notch-tl bg-[#F5F5DC] p-8 flex flex-col justify-between shadow-xl"
                 >
                    <ShieldCheck className="w-8 h-8 text-[#002B1B]" />
                    <div>
                       <p className="font-syne font-black text-sm uppercase mb-1">Integrity</p>
                       <p className="text-[8px] font-inter text-[#7A9088] leading-tight">100% verified listings and transparent documentation.</p>
                    </div>
                 </motion.div>

                 {/* Orbiting Card 2 */}
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute top-1/2 -right-16 -translate-y-1/2 w-48 h-48 flecto-notch-tr bg-[#002B1B] p-8 flex flex-col justify-between text-white shadow-xl"
                 >
                    <Target className="w-8 h-8 text-[#B5FFD9]" />
                    <div>
                       <p className="font-syne font-black text-sm uppercase mb-1 italic">Innovation</p>
                       <p className="text-[8px] font-inter text-[#A8C4BB] leading-tight">AI-driven market analysis and construction estimates.</p>
                    </div>
                 </motion.div>
              </motion.div>

              {/* Center Portrait */}
              <div className="relative w-80 h-[450px] rounded-[3rem] overflow-hidden shadow-2xl z-20 group">
                 <Image 
                   src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200" 
                   alt="Center Mission" 
                   fill 
                   className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                 />
                 <div className="absolute inset-0 bg-[#002B1B]/40 flex items-end p-10">
                    <p className="text-white font-syne font-black text-2xl uppercase leading-none tracking-tighter italic">
                       Impact <br /> Focused.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. VALUES: The Massive Notch Card */}
      <section className="py-40 bg-[#F5F5DC]">
         <div className="max-w-5xl mx-auto px-4">
            <Reveal direction="up">
               <div className="flecto-notch-tl bg-white p-12 sm:p-24 shadow-2xl border border-[#DDD8CF] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#B5FFD9]/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 max-w-2xl">
                     <h2 className="font-syne font-black text-4xl sm:text-6xl text-[#002B1B] uppercase tracking-tighter leading-[0.9] mb-12">
                        Everything we do <br />
                        <span className="italic font-normal">Starts with trust.</span>
                     </h2>
                     <div className="space-y-8">
                        {[
                          'Verified Listings Only - No duplicates, no fakes.',
                          'Transparent Market Data - Real-time pricing index.',
                          'Expert Legal Guidance - Protecting your investments.',
                          'Premium User Support - 24/7 dedicated assistance.'
                        ].map((text, i) => (
                           <div key={i} className="flex gap-6 items-start">
                              <CheckCircle2 className="w-6 h-6 text-[#002B1B] shrink-0 mt-1" />
                              <p className="text-lg font-inter text-[#3D5249]">{text}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </Reveal>
         </div>
      </section>

      {/* 4. TIMELINE: Painting Dotted Line */}
      <section className="py-40 bg-[#F5F5DC]">
        <div className="max-w-4xl mx-auto px-4">
           <div className="relative">
              {/* Dotted Background Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px border-l-2 border-dashed border-[#002B1B]/20" />
              {/* Growing Solid Line */}
              <motion.div 
                className="absolute left-8 top-0 w-px border-l-2 border-[#002B1B] origin-top"
                style={{ scaleY: timelineProgress }}
              />

              <div className="space-y-24">
                 {[
                   { year: '2012', title: 'The Genesis', desc: 'Launched as a pioneering property listing platform with a focus on verified assets.' },
                   { year: '2016', title: 'Market Integration', desc: 'Expanded to include comprehensive market data and specialized area guides.' },
                   { year: '2020', title: 'Tech Overhaul', desc: 'Introduced high-precision analytical tools and a premium user ecosystem.' },
                   { year: 'Present', title: 'National Leader', desc: 'Pakistan\'s most trusted property network with over 50,000 active members.' }
                 ].map((item, i) => (
                    <Reveal key={i} direction="up" delay={i * 0.1}>
                       <div className="flex gap-16 items-start relative pl-2">
                          <div className="w-12 h-12 bg-[#002B1B] rounded-full flex items-center justify-center shrink-0 z-10 shadow-xl">
                             <div className="w-2 h-2 bg-[#B5FFD9] rounded-full" />
                          </div>
                          <div className="space-y-4 pt-1">
                             <div className="font-syne font-black text-4xl text-[#002B1B] opacity-10 leading-none">{item.year}</div>
                             <h3 className="font-syne font-black text-2xl text-[#002B1B] uppercase tracking-tight">{item.title}</h3>
                             <p className="text-lg font-inter text-[#7A9088] leading-relaxed max-w-lg">{item.desc}</p>
                          </div>
                       </div>
                    </Reveal>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 5. TEAM: Side-Notched Cards Grid */}
      <section className="py-40 bg-white">
         <div className="max-w-7xl mx-auto px-4">
            <Reveal direction="down" className="mb-24">
               <h2 className="font-syne font-black text-5xl lg:text-7xl text-[#002B1B] uppercase tracking-tighter leading-none text-center">
                  The <span className="italic font-normal font-syne">Visionaries.</span>
               </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { name: 'Abdullah Shahid', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' },
                 { name: 'Sarah Ahmed', role: 'Operations Director', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800' },
                 { name: 'Zain Malik', role: 'Lead Architect', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800' }
               ].map((member, i) => (
                  <Reveal key={i} direction="scale" delay={i * 0.1}>
                     <div className="group relative overflow-hidden">
                        <div className="flecto-notch-side relative h-[500px] w-full overflow-hidden shadow-xl">
                           <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#002B1B]/80 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <h4 className="font-syne font-black text-xl text-white uppercase">{member.name}</h4>
                              <p className="text-[10px] font-black font-syne text-[#B5FFD9] uppercase tracking-widest mt-2">{member.role}</p>
                           </div>
                        </div>
                        <div className="mt-8 text-center sm:text-left group-hover:translate-x-2 transition-transform duration-500">
                           <p className="font-syne font-black text-lg text-[#002B1B] uppercase">{member.name}</p>
                           <p className="text-xs font-inter text-[#7A9088]">{member.role}</p>
                        </div>
                     </div>
                  </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* 6. SIGNATURE FOOTER CTA: Double-Notch */}
      <section className="pb-40 px-4 sm:px-10">
         <Reveal direction="up">
            <div className="flecto-double-notch bg-white max-w-7xl mx-auto p-12 sm:p-32 text-center shadow-[0_100px_200px_rgba(0,43,27,0.15)] border-x border-b border-[#DDD8CF] relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-64 h-64 bg-[#F5F5DC] rounded-full blur-3xl -ml-32 -mt-32 opacity-40 group-hover:bg-[#B5FFD9]/30 transition-colors duration-700" />
               
               <div className="relative z-10">
                  <h2 className="font-syne font-black text-5xl sm:text-8xl text-[#002B1B] uppercase tracking-tighter leading-[0.8] mb-12">
                     Ready to <br />
                     <span className="italic font-normal">Scale?</span>
                  </h2>
                  <p className="text-xl font-inter text-[#3D5249] mb-16 max-w-xl mx-auto opacity-70">
                     Join thousands of investors and homeowners who trust the digital standard of Pakistan real estate.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                     <Link href="/register" className="group/btn relative px-12 py-6 bg-[#002B1B] text-[#B5FFD9] text-[10px] font-black font-syne rounded-2xl overflow-hidden shadow-2xl">
                        <span className="relative z-10 tracking-[0.4em]">JOIN THE NETWORK</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                        <span className="absolute inset-0 z-20 flex items-center justify-center text-[#002B1B] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 tracking-[0.4em]">JOIN THE NETWORK</span>
                     </Link>
                     <Link href="/contact" className="px-12 py-6 bg-[#F5F5DC] text-[#002B1B] text-[10px] font-black font-syne rounded-2xl border border-[#DDD8CF] hover:bg-white transition-all uppercase tracking-[0.4em]">
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

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

export default AboutPage
