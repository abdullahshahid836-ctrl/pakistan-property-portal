'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ShieldCheck, Users, Zap, Heart, Compass, ArrowRight, RotateCcw, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Flecto's signature quintic ease-out
const EASE = [0.16, 1, 0.3, 1] as const

// LINE-REVEAL: Animates on page load (not scroll) — for hero headings
const HeroLine = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: '110%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  </div>
)

// SCROLL-LINE: For sections below fold
const ScrollLine = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: '110%' }}
      whileInView={{ y: '0%' }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  </div>
)

// FADE-UP: Generic scroll reveal
const FadeUp = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.8, ease: EASE, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

// ORBIT PILL: CSS-based orbit (GPU-accelerated, no JS scroll)
const OrbitPill = ({ label, startAngle }: { label: string; startAngle: number }) => (
  <div
    className="orbit-pill"
    style={{ '--start-angle': `${startAngle}deg` } as React.CSSProperties}
  >
    <span className="px-5 py-2 bg-[#C8F55A] text-[#004737] font-syne font-black text-xs uppercase tracking-widest rounded-full shadow-lg whitespace-nowrap">
      {label}
    </span>
  </div>
)

// JOURNEY ITEM: Extracted to satisfy React rules-of-hooks
const JourneyItem = ({ item, i }: { item: { year: string; title: string; desc: string }; i: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className="flex items-start gap-10 sm:gap-16 relative z-10"
    >
      <div className="shrink-0">
        <motion.div
          animate={isInView
            ? { scale: 1, backgroundColor: '#004737' }
            : { scale: 0.6, backgroundColor: '#DDD8CF' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#F5F0E8] flex items-center justify-center shadow-xl"
        >
          <span className="text-[#C8F55A] font-syne font-black text-[10px] leading-none text-center">{item.year}</span>
        </motion.div>
      </div>
      <div className="flex-1 pt-2">
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 border border-[#DDD8CF] shadow-sm hover:shadow-xl hover:border-[#004737]/20 transition-all duration-500">
          <h3 className="font-syne font-black text-lg sm:text-2xl text-[#0D1B17] uppercase mb-2 sm:mb-3">{item.title}</h3>
          <p className="text-xs sm:text-sm font-inter text-[#7A9088] leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
const AboutPage = () => {
  const missionRef = useRef<HTMLDivElement>(null)
  const visionRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mission = missionRef.current
    const vision = visionRef.current
    const section = sectionRef.current
    if (!mission || !vision || !section) return

    // Setup initial states for expansion effect
    // Mission expands from its top-right notch
    gsap.set(mission, { 
      x: 200, 
      scale: 0.2,
      opacity: 0,
      transformOrigin: "85% 10%" 
    })

    // Vision expands from its top-left notch
    gsap.set(vision, { 
      x: -200,
      scale: 0.2,
      opacity: 0,
      transformOrigin: "15% 10%"
    })

    // Hide internal content initially
    const missionContent = mission.querySelectorAll('h3, p, span')
    const visionContent = vision.querySelectorAll('h3, p, span')
    gsap.set([missionContent, visionContent], { opacity: 0, y: 10 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        once: true,
      }
    })

    // 1. Mission Expansion
    tl.to(mission, {
      x: 0,
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: "expo.out",
    })
    // 2. Mission Content Reveal
    .to(missionContent, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.8")

    // 3. Vision Expansion (Starts after Mission is settled)
    .to(vision, {
      x: 0,
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: "expo.out",
    }, "-=0.4")
    // 4. Vision Content Reveal
    .to(visionContent, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.8")

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const timelineRef = useRef(null)
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 30%']
  })
  const lineHeight = useTransform(timelineProgress, [0, 1], ['0%', '100%'])

  const values = [
    { icon: Users,       title: 'Teamwork',   desc: 'We value people that empower team-members to grow.' },
    { icon: Zap,         title: 'Innovation', desc: 'We trust everyone to identify major improvement opportunities.' },
    { icon: Heart,       title: 'Impact',     desc: 'We promote a sustainable and healthy mentality with positive spirit.' },
    { icon: Compass,     title: 'Freedom',    desc: 'Total independence & maximum accountability. Freedom to decide how, when, why.' },
    { icon: ShieldCheck, title: 'Resilience', desc: 'Persistence, constant improvement and growth mentality is highly promoted.' },
  ]

  const journey = [
    { year: '2012', title: 'The Launch',      desc: "Started as Pakistan's first verified property listing directory." },
    { year: '2016', title: 'Data Era',        desc: 'Expanded with market analytics, area guides, and price transparency.' },
    { year: '2020', title: 'Full Ecosystem',  desc: 'Transformed into a full-scale platform for rental and sales management.' },
    { year: 'Now',  title: 'National Leader', desc: "Pakistan's most trusted property network — 50K+ members and growing." },
  ]

  return (
    <>
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .scroll-bounce { animation: scrollBounce 1.5s ease-in-out infinite; }
      `}</style>

      <div className="overflow-x-hidden">
        {/* 1. HERO — Responsive Flecto Design */}
        <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#004737] px-4 py-10 sm:py-20">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt=""
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#004737]/90 via-[#004737]/80 to-[#0D2B1F]/95" />
          </div>

          <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col items-center justify-center px-4 sm:px-10">
            {/* Balloon cards — Centralized and Larger */}
            <div className="w-full flex flex-col lg:flex-row items-center justify-center relative -mt-5 lg:-mt-56 gap-16 lg:gap-0 px-4 sm:px-10">
              {/* Card 1: MISSION — Notch TOP-RIGHT */}
              <div
                ref={missionRef}
                style={{ opacity: 0 }}
                className="relative w-full lg:w-[55%] max-w-[920px] aspect-[545/402] z-20"
              >
                <svg viewBox="0 0 545.7 402.3" className="w-full h-full drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)]" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#01382C" d="M13.62 47.225 L404.15 47.225 C404.15 47.225, 417.775 47.225, 417.775 33.601 L417.775 13.624 C417.775 13.624, 417.775 0, 431.398 0 L532.076 0 C532.076 0, 545.7 0, 545.7 13.624 L545.7 39.389 C545.7 39.389, 545.7 53.013,532.076 53.013 L437.186 53.013 C437.186 53.013, 423.563 53.013, 423.563 66.636 L423.563 388.676 C423.563 388.676, 423.563 402.3, 409.939 402.3 L13.624 402.3 C13.624 402.3, 0 402.3, 0 388.676 L0 60.849 C0 60.849, 0 47.225, 13.624 47.225" />
                </svg>
                <div className="absolute inset-0 pointer-events-none">
                  <span className="absolute top-[4%] right-[4%] w-[20%] text-center font-syne font-black text-[#C8F55A] text-[clamp(11px,1.4vw,18px)] uppercase tracking-[0.3em]">Mission</span>
                  <div className="absolute top-[26%] sm:top-[25%] left-[8%] right-[30%] bottom-[10%] flex flex-col justify-start">
                    <h3 className="font-syne font-black text-white uppercase text-[clamp(18px,3.5vw,48px)] leading-[0.9] mb-4 sm:mb-12 break-words">Our Mission<br/>Defined.</h3>
                    <p className="font-inter text-white/50 text-[clamp(11px,1.4vw,20px)] leading-relaxed max-w-[500px]">Founded in 2012, Pakistan Property Portal has evolved into a comprehensive ecosystem for real estate excellence.</p>
                  </div>
                </div>
              </div>

              {/* Card 2: VISION — Notch TOP-LEFT */}
              <div
                ref={visionRef}
                style={{ opacity: 0 }}
                className="relative w-full lg:w-[50%] max-w-[920px] aspect-[449/364] lg:mt-[60%] lg:-ml-[2%] z-10"
              >
                <svg viewBox="0 0 449.3 364.513" className="w-full h-full drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)]" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#56F09F" d="M13.624 0 L112.901 0 C112.901 0, 126.525 0, 126.525 13.624 L126.525 34.176 C126.525 34.176, 126.525 47.8, 140.149 47.8 L435.676 47.8 C435.676 47.8, 449.3 47.8, 449.3 61.424 L449.3 350.889 C449.3 350.889, 449.3 364.512, 435.676 364.512 L137.261 364.512 C137.261 364.512, 123.638 364.512, 123.638 350.889 L123.638 64.311 C123.638 64.311, 123.638 50.688, 110.014 50.688 L13.624 50.688 C13.624 50.688, 0 50.688, 0 37.064 L0 13.624 C0 13.624, 0 0, 13.624 0" />
                </svg>
                <div className="absolute inset-0 pointer-events-none">
                  <span className="absolute top-[4.5%] left-[3%] w-[25%] text-center font-syne font-black text-[#01382C] text-[clamp(11px,1.4vw,18px)] uppercase tracking-[0.3em]">Vision</span>
                  <div className="absolute top-[28%] sm:top-[26%] left-[32%] right-[10%] bottom-[10%] flex flex-col justify-start">
                    <h3 className="font-syne font-black text-[#01382C] uppercase text-[clamp(18px,3.5vw,48px)] leading-[0.9] mb-4 sm:mb-12 break-words">12+ Years<br/>Experience.</h3>
                    <p className="font-inter text-[#01382C]/60 text-[clamp(11px,1.4vw,20px)] leading-relaxed">50,000+ active members trust Pakistan Property Portal for their biggest life milestones.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-white/20 font-syne font-black text-[9px] uppercase tracking-[0.4em]">Scroll</span>
            <div className="scroll-bounce text-white/20"><ChevronDown className="w-5 h-5" /></div>
          </div>
        </section>

        {/* 2. CIRCULAR ECONOMY */}
        <section className="relative bg-[#004737] py-20 sm:py-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <FadeUp>
              <span className="inline-block mb-8 px-5 py-2 border border-[#C8F55A]/30 text-[#C8F55A] font-syne font-black text-[10px] uppercase tracking-[0.3em] rounded-full">
                Circular Economy
              </span>
            </FadeUp>
            <ScrollLine>
              <h2 className="font-syne font-black text-[clamp(2rem,6vw,6rem)] text-white uppercase tracking-tighter leading-none">
                Connecting Buyers,
              </h2>
            </ScrollLine>
            <ScrollLine delay={0.1}>
              <h2 className="font-syne font-black text-[clamp(2rem,6vw,6rem)] text-[#C8F55A] italic uppercase tracking-tighter leading-none">
                Sellers &amp; Renters.
              </h2>
            </ScrollLine>

            {/* Orbit Ring */}
            <FadeUp delay={0.3} className="mt-16 sm:mt-24">
              <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] mx-auto">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 360">
                  <circle cx="180" cy="180" r="170" fill="none" stroke="#C8F55A" strokeWidth="1" strokeDasharray="6 8" opacity="0.25" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C8F55A]/10 border border-[#C8F55A]/30 flex items-center justify-center text-[#C8F55A]">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                </div>
                <OrbitPill label="Property Listed" startAngle={0} />
                <OrbitPill label="Buyer Connected" startAngle={180} />
              </div>
            </FadeUp>

            <FadeUp delay={0.5} className="mt-16">
              <p className="text-[#A8C4BB] font-inter text-lg max-w-2xl mx-auto opacity-70 leading-relaxed">
                Our platform enables a higher turnover of property transactions, creating a sustainable cycle that benefits buyers, sellers, and the national economy.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            3. VALUES — Large Cream Card with Ear Notch
        ═══════════════════════════════════════════════════ */}
        <section className="relative bg-[#004737] pb-40">
          <div className="max-w-7xl mx-auto px-6 relative">
            {/* Ear notch at top-right */}
            <div className="absolute top-0 right-6 sm:right-24 w-32 h-16 bg-[#F5F0E8] rounded-b-3xl z-10" />

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="bg-[#F5F0E8] rounded-[3rem] rounded-tr-none pt-32 pb-24 px-10 sm:px-24 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#C8F55A]/10 rounded-full blur-[80px] -ml-32 -mt-32" />
              <div className="relative z-10">
                <ScrollLine>
                  <h2 className="font-syne font-black text-[clamp(2.5rem,5vw,5rem)] text-[#0D1B17] uppercase tracking-tighter leading-none mb-4">
                    We stand for
                  </h2>
                </ScrollLine>
                <ScrollLine delay={0.1}>
                  <h2 className="font-syne font-black text-[clamp(2.5rem,5vw,5rem)] text-[#004737] italic uppercase tracking-tighter leading-none mb-20">
                    Core Values.
                  </h2>
                </ScrollLine>

                <div className="divide-y divide-[#DDD8CF]">
                  {values.map((v, i) => (
                    <FadeUp key={i} delay={i * 0.08}>
                      <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10 py-8 sm:py-10 group cursor-default">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shrink-0 group-hover:bg-[#004737] transition-all duration-500 shadow-sm">
                          <v.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <h3 className="font-syne font-black text-xl sm:text-2xl text-[#0D1B17] uppercase group-hover:text-[#004737] transition-colors">{v.title}</h3>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#004737]/20 group-hover:text-[#004737] group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                          <p className="text-xs sm:text-sm font-inter text-[#7A9088] leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            4. JOURNEY TIMELINE
        ═══════════════════════════════════════════════════ */}
        <section className="py-40 bg-[#F5F0E8]" ref={timelineRef}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-32">
              <ScrollLine>
                <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-[#0D1B17] uppercase tracking-tighter">
                  Our Journey.
                </h2>
              </ScrollLine>
            </div>

            <div className="relative">
              {/* Dotted background line */}
              <div className="absolute left-8 sm:left-10 top-0 bottom-0 border-l-2 border-dashed border-[#004737]/20" />
              {/* Growing solid overlay */}
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-8 sm:left-10 top-0 w-0.5 bg-[#004737] origin-top"
              />
              <div className="space-y-20">
                {journey.map((item, i) => (
                  <JourneyItem key={i} item={item} i={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            5. FOOTER CTA — Dual-notch cream card on green
        ═══════════════════════════════════════════════════ */}
        <section className="bg-[#004737]">
          {/* Dual ear notches */}
          <div className="flex justify-between px-6 sm:px-24">
            <div className="w-28 h-14 bg-[#F5F0E8] rounded-b-3xl" />
            <div className="w-28 h-14 bg-[#F5F0E8] rounded-b-3xl" />
          </div>

          <div className="bg-[#F5F0E8] mx-6 sm:mx-24 rounded-[3rem] p-16 sm:p-32 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8F55A]/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10">
              <ScrollLine>
                <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-[#0D1B17] uppercase tracking-tighter leading-none mb-2">
                  Ready to find
                </h2>
              </ScrollLine>
              <ScrollLine delay={0.1}>
                <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-[#004737] italic uppercase tracking-tighter leading-none mb-12">
                  your future?
                </h2>
              </ScrollLine>

              <FadeUp delay={0.3}>
                <p className="text-lg font-inter text-[#3D5249] max-w-xl mx-auto opacity-70 mb-16 leading-relaxed">
                  Join thousands of Pakistanis who trust our platform for their residential and commercial property needs.
                </p>
              </FadeUp>

              <FadeUp delay={0.4} className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
                <Link
                  href="/register"
                  className="group flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#004737] text-[#C8F55A] font-syne font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] rounded-xl sm:rounded-2xl hover:bg-black transition-all shadow-xl"
                >
                  JOIN THE NETWORK
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#0D1B17] border border-[#DDD8CF] font-syne font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] rounded-xl sm:rounded-2xl hover:bg-[#004737] hover:text-white hover:border-transparent transition-all"
                >
                  CONTACT SUPPORT
                </Link>
              </FadeUp>

              <FadeUp delay={0.6} className="mt-20 pt-16 border-t border-[#DDD8CF]">
                <p className="text-[10px] font-syne font-black text-[#7A9088] uppercase tracking-[0.3em] mb-8">Trusted Across Pakistan</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-30">
                  {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'].map((city) => (
                    <span key={city} className="font-syne font-black text-sm text-[#004737] uppercase tracking-widest">{city}</span>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>

          <div className="mx-6 sm:mx-24 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-syne font-black text-white/20 uppercase tracking-widest">
            <span>© 2026 Pakistan Property Portal</span>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-[#C8F55A] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#C8F55A] transition-colors">Terms &amp; Conditions</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default AboutPage
