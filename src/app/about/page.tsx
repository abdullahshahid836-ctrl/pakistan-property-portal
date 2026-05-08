'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      {/* Global CSS */}
      <style>{`
        /* ── Hero card animations ── */
        @keyframes cardRiseA {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        @keyframes cardRiseB {
          from { opacity: 0; transform: translateY(55px); }
          to   { opacity: 1; transform: translateY(0px); }
        }
        @keyframes textFadeA {
          0%, 30% { opacity: 0; transform: translateY(12px); }
          100%    { opacity: 1; transform: translateY(0); }
        }
        @keyframes textFadeB {
          0%, 55% { opacity: 0; transform: translateY(12px); }
          100%    { opacity: 1; transform: translateY(0); }
        }
        .hero-card-mission { animation: cardRiseA 1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .hero-card-vision  { animation: cardRiseB 1s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .card-label-anim   { animation: textFadeA 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .card-body-anim-a  { animation: textFadeB 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .card-label-anim-b { animation: textFadeA 1.2s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .card-body-anim-b  { animation: textFadeB 1.2s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
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

        {/* ═══════════════════════════════════════════════════════════
            1. HERO — Exact Flecto layout
            Dual layered bg images · SVG-clipped tabbed cards
            Mission card: tab notch top-right
            Vision card:  tab notch top-left (mirror)
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#004737]">

          {/* ── Layered background images (crossfade depth) ── */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
              alt=""
              fill
              className="object-cover opacity-20"
              priority
            />
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
              alt=""
              fill
              className="object-cover opacity-10 mix-blend-luminosity"
            />
            {/* Deep green overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#004737]/90 via-[#004737]/80 to-[#0D2B1F]/95" />
          </div>

          {/* ── Main content ── */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32 flex flex-col lg:flex-row items-center gap-16 xl:gap-24">

            {/* LEFT: Heading block */}
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

            {/* RIGHT: SVG tabbed balloon cards */}
            <div className="flex-1 min-w-0 flex flex-col items-center justify-center relative" style={{ minHeight: '520px' }}>

              {/* ── HIDDEN SVG DEFS — clip paths for tabbed card shapes ── */}
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  {/*
                    Mission card: 400×340 canvas
                    Tab at top-RIGHT: notch cuts top-right corner
                    Tab rect: x=260..400, y=0..52  (140×52)
                    Main body: full width, y=52..340, with rounded bottom corners
                  */}
                  <clipPath id="clip-mission" clipPathUnits="userSpaceOnUse">
                    <path d="
                      M 0,52
                      L 0,312
                      Q 0,340 28,340
                      L 372,340
                      Q 400,340 400,312
                      L 400,52
                      L 272,52
                      Q 260,52 260,40
                      L 260,0
                      L 400,0
                      L 400,0
                      Z
                    " />
                  </clipPath>

                  {/*
                    Vision card: 360×300 canvas
                    Tab at top-LEFT: notch cuts top-left corner
                    Tab rect: x=0..140, y=0..48
                    Main body: full width, y=48..300
                  */}
                  <clipPath id="clip-vision" clipPathUnits="userSpaceOnUse">
                    <path d="
                      M 0,0
                      L 140,0
                      L 140,36
                      Q 140,48 152,48
                      L 360,48
                      L 360,276
                      Q 360,300 332,300
                      L 28,300
                      Q 0,300 0,276
                      Z
                    " />
                  </clipPath>
                </defs>
              </svg>

              {/* ── CARD 1: MISSION (tab notch top-right) ── */}
              <div
                className="hero-card-mission absolute"
                style={{ width: 400, left: '5%', top: 0, zIndex: 10 }}
              >
                {/* Tab label — top right */}
                <div
                  className="card-label-anim absolute flex items-center justify-center"
                  style={{ right: 0, top: 0, width: 140, height: 52, background: '#F5F0E8', borderRadius: '12px 12px 0 0' }}
                >
                  <span className="font-syne font-black text-[#004737] text-[10px] uppercase tracking-[0.3em]">Mission</span>
                </div>

                {/* Card body */}
                <div
                  style={{
                    width: 400,
                    height: 340,
                    clipPath: 'url(#clip-mission)',
                    background: '#F5F0E8',
                    paddingTop: 72,
                    paddingLeft: 36,
                    paddingRight: 36,
                    paddingBottom: 36,
                    boxSizing: 'border-box',
                  }}
                >
                  <p className="card-body-anim-a font-syne font-black text-[#0D1B17] uppercase text-2xl leading-tight mb-5">
                    Our Mission Defined.
                  </p>
                  <p className="card-body-anim-a font-inter text-[#3D5249] text-sm leading-relaxed" style={{ animationDelay: '0.65s' }}>
                    Founded in 2012, Pakistan Property Portal has evolved into a comprehensive ecosystem for real estate investment and management.
                  </p>
                </div>
              </div>

              {/* ── CARD 2: VISION (tab notch top-left, overlaps Mission, offset up) ── */}
              <div
                className="hero-card-vision absolute"
                style={{ width: 360, right: '2%', top: 200, zIndex: 20 }}
              >
                {/* Tab label — top left */}
                <div
                  className="card-label-anim-b absolute flex items-center justify-center"
                  style={{ left: 0, top: 0, width: 140, height: 48, background: '#C8F55A', borderRadius: '12px 12px 0 0' }}
                >
                  <span className="font-syne font-black text-[#004737] text-[10px] uppercase tracking-[0.3em]">Vision</span>
                </div>

                {/* Card body */}
                <div
                  style={{
                    width: 360,
                    height: 300,
                    clipPath: 'url(#clip-vision)',
                    background: '#004737',
                    paddingTop: 68,
                    paddingLeft: 32,
                    paddingRight: 32,
                    paddingBottom: 32,
                    boxSizing: 'border-box',
                  }}
                >
                  <p className="card-body-anim-b font-syne font-black text-[#C8F55A] uppercase text-2xl leading-tight mb-5">
                    12+ Years Experience.
                  </p>
                  <p className="card-body-anim-b font-inter text-[#A8C4BB] text-sm leading-relaxed" style={{ animationDelay: '0.9s' }}>
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
