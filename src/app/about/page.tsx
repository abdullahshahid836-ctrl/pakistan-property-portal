'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ShieldCheck, Users, Zap, Heart, Compass, ArrowRight, RotateCcw, ChevronDown } from 'lucide-react'

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
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-[#DDD8CF] shadow-sm hover:shadow-xl hover:border-[#004737]/20 transition-all duration-500">
          <h3 className="font-syne font-black text-xl sm:text-2xl text-[#0D1B17] uppercase mb-3">{item.title}</h3>
          <p className="text-sm font-inter text-[#7A9088] leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
const AboutPage = () => {
  const [gsapReady, setGsapReady] = useState(false)

  // GSAP refs — Card 1 (Mission)
  const card1Ref    = useRef<HTMLDivElement>(null)
  const card1Label  = useRef<HTMLDivElement>(null)
  const card1Body   = useRef<HTMLDivElement>(null)
  // GSAP refs — Card 2 (Vision)
  const card2Ref    = useRef<HTMLDivElement>(null)
  const card2Label  = useRef<HTMLDivElement>(null)
  const card2Body   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gsapReady) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gsap = (window as any).gsap
    if (!gsap) return
    gsap.from(card1Ref.current,   { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', delay: 0.1 })
    gsap.from(card1Label.current, { opacity: 0, y: 15, duration: 0.6, ease: 'power2.out', delay: 0.4 })
    gsap.from(card1Body.current,  { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out', delay: 0.6 })
    gsap.from(card2Ref.current,   { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', delay: 0.3 })
    gsap.from(card2Label.current, { opacity: 0, y: 15, duration: 0.6, ease: 'power2.out', delay: 0.6 })
    gsap.from(card2Body.current,  { opacity: 0, y: 20, duration: 0.7, ease: 'power2.out', delay: 0.8 })
  }, [gsapReady])

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
      {/* GSAP CDN */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => setGsapReady(true)}
      />

      {/* Global CSS */}
      <style>{`
        /* ── Orbit ── */
        @keyframes orbit {
          from { transform: rotate(var(--start-angle, 0deg)) translateX(180px) rotate(calc(-1 * var(--start-angle, 0deg))); }
          to   { transform: rotate(calc(var(--start-angle, 0deg) + 360deg)) translateX(180px) rotate(calc(-1 * (var(--start-angle, 0deg) + 360deg))); }
        }
        .orbit-pill {
          position: absolute; top: 50%; left: 50%; width: 0; height: 0;
          animation: orbit 8s linear infinite;
        }
        .orbit-pill span { transform: translateX(-50%) translateY(-50%); display: block; }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        .scroll-bounce { animation: scrollBounce 1.5s ease-in-out infinite; }
      `}</style>

      <div className="overflow-x-hidden">

        {/* ═══════════════════════════════════════════════════
            1. HERO — Exact Flecto SVG balloon cards
            Mission: dark green #01382C, tab TOP-RIGHT
            Vision:  mint green #56F09F, tab TOP-LEFT, top:-45px
        ═══════════════════════════════════════════════════ */}
        <section
          className="relative min-h-screen flex flex-col overflow-hidden"
          style={{ background: '#004737' }}
        >
          {/* Full-cover background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ background: 'rgba(0,71,55,0.82)' }} />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 xl:gap-24 max-w-7xl mx-auto w-full px-6 lg:px-12 py-28">

            {/* LEFT: Heading */}
            <div className="flex-1 min-w-0">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-white/10 text-white/40 font-syne font-black text-[10px] uppercase tracking-[0.3em]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8F55A]" />
                About Us
              </motion.span>

              <div className="mb-10">
                <HeroLine delay={0.25}>
                  <h1 className="font-syne font-black text-white uppercase tracking-tighter leading-[0.82]" style={{ fontSize: 'clamp(3rem,6.5vw,7rem)' }}>
                    Pakistan&apos;s
                  </h1>
                </HeroLine>
                <HeroLine delay={0.4}>
                  <h1 className="font-syne font-black text-[#C8F55A] italic uppercase tracking-tighter leading-[0.82]" style={{ fontSize: 'clamp(3rem,6.5vw,7rem)' }}>
                    Most Trusted
                  </h1>
                </HeroLine>
                <HeroLine delay={0.55}>
                  <h1 className="font-syne font-black text-white uppercase tracking-tighter leading-[0.82]" style={{ fontSize: 'clamp(3rem,6.5vw,7rem)' }}>
                    Network.
                  </h1>
                </HeroLine>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                transition={{ duration: 1.2, delay: 0.85 }}
                className="text-white font-inter text-base sm:text-lg leading-relaxed max-w-md"
              >
                Redefining the real estate landscape in Pakistan through transparency, technology, and a premium user experience.
              </motion.p>
            </div>

            {/* RIGHT: .balloons-container — exact Flecto spec */}
            <div
              className="flex-1 min-w-0 flex items-end justify-center"
              style={{ position: 'relative', gap: 0 }}
            >
              {/* ── CARD 1: MISSION — tab notch TOP-RIGHT, #01382C ── */}
              <div
                ref={card1Ref}
                style={{ position: 'relative', width: 400, flexShrink: 0 }}
              >
                {/* Exact SVG path from spec */}
                <svg
                  viewBox="0 0 545.7 402.3"
                  width="400"
                  height="295"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'block' }}
                >
                  <path
                    fill="#01382C"
                    d="M13.62 47.225 L404.15 47.225 C404.15 47.225, 417.775 47.225, 417.775 33.601 L417.775 13.624 C417.775 13.624, 417.775 0, 431.398 0 L532.076 0 C532.076 0, 545.7 0, 545.7 13.624 L545.7 39.389 C545.7 39.389, 545.7 53.013, 532.076 53.013 L437.186 53.013 C437.186 53.013, 423.563 53.013, 423.563 66.636 L423.563 388.676 C423.563 388.676, 423.563 402.3, 409.939 402.3 L13.624 402.3 C13.624 402.3, 0 402.3, 0 388.676 L0 60.849 C0 60.849, 0 47.225, 13.624 47.225"
                  />
                </svg>

                {/* Tab label — top-right tab area */}
                <div
                  ref={card1Label}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 105,   /* tab width in rendered px (≈140/545.7*400) */
                    height: 38,   /* tab height in rendered px (≈53/402.3*295) */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 11, color: '#C8F55A', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    Mission
                  </span>
                </div>

                {/* Body text — large bottom-left area */}
                <div
                  ref={card1Body}
                  style={{
                    position: 'absolute',
                    top: 55,
                    left: 20,
                    right: 110, /* leave space for right tab notch column */
                    bottom: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: 14,
                  }}
                >
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 22, color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1.15, margin: 0 }}>
                    Our Mission Defined.
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(200,245,200,0.7)', lineHeight: 1.6, margin: 0 }}>
                    Founded in 2012, Pakistan Property Portal has evolved into a comprehensive ecosystem for real estate investment and management.
                  </p>
                </div>
              </div>

              {/* ── CARD 2: VISION — tab notch TOP-LEFT, #56F09F, top:-45px ── */}
              <div
                ref={card2Ref}
                style={{ position: 'relative', width: 400, flexShrink: 0, top: -45 }}
              >
                {/* Exact SVG path from spec */}
                <svg
                  viewBox="0 0 449.3 364.513"
                  width="400"
                  height="325"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: 'block' }}
                >
                  <path
                    fill="#56F09F"
                    d="M13.624 0 L112.901 0 C112.901 0, 126.525 0, 126.525 13.624 L126.525 34.176 C126.525 34.176, 126.525 47.8, 140.149 47.8 L435.676 47.8 C435.676 47.8, 449.3 47.8, 449.3 61.424 L449.3 350.889 C449.3 350.889, 449.3 364.512, 435.676 364.512 L137.261 364.512 C137.261 364.512, 123.638 364.512, 123.638 350.889 L123.638 64.311 C123.638 64.311, 123.638 50.688, 110.014 50.688 L13.624 50.688 C13.624 50.688, 0 50.688, 0 37.064 L0 13.624 C0 13.624, 0 0, 13.624 0"
                  />
                </svg>

                {/* Tab label — top-left tab area */}
                <div
                  ref={card2Label}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 113,  /* ≈126.525/449.3*400 */
                    height: 43,  /* ≈47.8/364.513*325 */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 11, color: '#01382C', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    Vision
                  </span>
                </div>

                {/* Body text — large bottom-right area */}
                <div
                  ref={card2Body}
                  style={{
                    position: 'absolute',
                    top: 65,
                    left: 125, /* after tab column */
                    right: 20,
                    bottom: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: 14,
                  }}
                >
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 22, color: '#01382C', textTransform: 'uppercase', lineHeight: 1.15, margin: 0 }}>
                    12+ Years Experience.
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(1,56,44,0.7)', lineHeight: 1.6, margin: 0 }}>
                    50,000+ active members trust Pakistan Property Portal for their biggest life milestones.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="relative z-10 flex flex-col items-center gap-2 pb-10"
          >
            <span className="text-white/20 font-syne font-black text-[9px] uppercase tracking-[0.4em]">Scroll</span>
            <div className="scroll-bounce text-white/20"><ChevronDown className="w-5 h-5" /></div>
          </motion.div>
        </section>


        {/* ═══════════════════════════════════════════════════
            2. CIRCULAR ECONOMY — CSS Orbit, no JS scroll
        ═══════════════════════════════════════════════════ */}
        <section className="relative bg-[#004737] py-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <FadeUp>
              <span className="inline-block mb-8 px-5 py-2 border border-[#C8F55A]/30 text-[#C8F55A] font-syne font-black text-[10px] uppercase tracking-[0.3em] rounded-full">
                Circular Economy
              </span>
            </FadeUp>
            <ScrollLine>
              <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-white uppercase tracking-tighter leading-none">
                Connecting Buyers,
              </h2>
            </ScrollLine>
            <ScrollLine delay={0.1}>
              <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-[#C8F55A] italic uppercase tracking-tighter leading-none">
                Sellers &amp; Renters.
              </h2>
            </ScrollLine>

            {/* Orbit Ring */}
            <FadeUp delay={0.3} className="mt-24">
              <div className="relative w-[360px] h-[360px] mx-auto">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 360">
                  <circle cx="180" cy="180" r="170" fill="none" stroke="#C8F55A" strokeWidth="1" strokeDasharray="6 8" opacity="0.25" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#C8F55A]/10 border border-[#C8F55A]/30 flex items-center justify-center">
                    <RotateCcw className="w-8 h-8 text-[#C8F55A]" />
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
                      <div className="flex items-start gap-10 py-10 group cursor-default">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 group-hover:bg-[#004737] transition-all duration-500 shadow-sm">
                          <v.icon className="w-6 h-6 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-syne font-black text-2xl text-[#0D1B17] uppercase group-hover:text-[#004737] transition-colors">{v.title}</h3>
                            <ArrowRight className="w-5 h-5 text-[#004737]/20 group-hover:text-[#004737] group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                          <p className="text-sm font-inter text-[#7A9088] leading-relaxed">{v.desc}</p>
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

              <FadeUp delay={0.4} className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  href="/register"
                  className="group flex items-center justify-center gap-3 px-10 py-5 bg-[#004737] text-[#C8F55A] font-syne font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all shadow-xl"
                >
                  JOIN THE NETWORK
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-10 py-5 bg-white text-[#0D1B17] border border-[#DDD8CF] font-syne font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-[#004737] hover:text-white hover:border-transparent transition-all"
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
