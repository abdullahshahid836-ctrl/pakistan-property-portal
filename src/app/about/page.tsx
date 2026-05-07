'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ShieldCheck, Target, Users, Zap, Heart, Compass, ArrowRight, RotateCcw } from 'lucide-react'

// ─────────────────────────────────────────────
// EASE: Flecto's signature quintic ease-out
// ─────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

// ─────────────────────────────────────────────
// LINE-REVEAL: Single text line mask reveal
// ─────────────────────────────────────────────
const Line = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
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

// ─────────────────────────────────────────────
// FADE-UP: Generic reveal
// ─────────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => (
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

// ─────────────────────────────────────────────
// ORBIT PILL: CSS-based orbit pill (no JS scroll)
// ─────────────────────────────────────────────
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

const AboutPage = () => {
  const timelineRef = useRef(null)
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 30%']
  })
  const lineHeight = useTransform(timelineProgress, [0, 1], ['0%', '100%'])

  const values = [
    { icon: Users,      title: 'Teamwork',   desc: 'We value people that empower team-members to grow.' },
    { icon: Zap,        title: 'Innovation', desc: 'We trust everyone to identify major improvement opportunities.' },
    { icon: Heart,      title: 'Impact',     desc: 'We promote a sustainable and healthy mentality with positive spirit.' },
    { icon: Compass,    title: 'Freedom',    desc: 'Total independence & maximum accountability. Freedom to decide how, when, why.' },
    { icon: ShieldCheck,title: 'Resilience', desc: 'Persistence, constant improvement and growth mentality is highly promoted.' },
  ]

  const journey = [
    { year: '2012', title: 'The Launch',       desc: 'Started as Pakistan\'s first verified property listing directory.' },
    { year: '2016', title: 'Data Era',         desc: 'Expanded with market analytics, area guides, and price transparency.' },
    { year: '2020', title: 'Full Ecosystem',   desc: 'Transformed into a full-scale platform for rental and sales management.' },
    { year: 'Now',  title: 'National Leader',  desc: 'Pakistan\'s most trusted property network — 50K+ members and growing.' },
  ]

  return (
    <>
      {/* ─── CSS for orbit animation ─── */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(var(--start-angle, 0deg)) translateX(180px) rotate(calc(-1 * var(--start-angle, 0deg))); }
          to   { transform: rotate(calc(var(--start-angle, 0deg) + 360deg)) translateX(180px) rotate(calc(-1 * (var(--start-angle, 0deg) + 360deg))); }
        }
        .orbit-pill {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          animation: orbit 8s linear infinite;
        }
        .orbit-pill span { transform: translateX(-50%) translateY(-50%); display:block; }
      `}</style>

      <div className="bg-[#F5F0E8] min-h-screen overflow-x-hidden">

        {/* ═══════════════════════════════════════════════════
            1. HERO — Two overlapping "ear-tab" cards
        ═══════════════════════════════════════════════════ */}
        <section className="relative min-h-screen bg-[#F5F0E8] flex items-center justify-center pt-28 pb-20 overflow-hidden">

          {/* Background subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'radial-gradient(circle, #004737 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

              {/* Left: Headline */}
              <div>
                <FadeUp delay={0.1}>
                  <span className="inline-block mb-10 px-5 py-2 bg-[#004737] text-[#C8F55A] font-syne font-black text-[10px] uppercase tracking-[0.3em] rounded-full">
                    About Us
                  </span>
                </FadeUp>

                <Line delay={0.2} className="mb-2">
                  <h1 className="font-syne font-black text-[clamp(3rem,8vw,7rem)] text-[#0D1B17] uppercase tracking-tighter leading-[0.85]">
                    Pakistan&apos;s
                  </h1>
                </Line>
                <Line delay={0.3} className="mb-2">
                  <h1 className="font-syne font-black text-[clamp(3rem,8vw,7rem)] text-[#004737] italic uppercase tracking-tighter leading-[0.85]">
                    Most Trusted
                  </h1>
                </Line>
                <Line delay={0.4}>
                  <h1 className="font-syne font-black text-[clamp(3rem,8vw,7rem)] text-[#0D1B17] uppercase tracking-tighter leading-[0.85]">
                    Network.
                  </h1>
                </Line>

                <FadeUp delay={0.6}>
                  <p className="mt-10 text-lg text-[#3D5249] font-inter leading-relaxed max-w-lg opacity-70">
                    Redefining the real estate landscape in Pakistan through transparency, technology, and a premium user experience.
                  </p>
                </FadeUp>
              </div>

              {/* Right: Two Stacked/Overlapping Cards with Ear-Tab */}
              <div className="relative h-[500px] sm:h-[600px]">

                {/* MISSION CARD — dark green, ear at top-right */}
                <motion.div
                  initial={{ opacity: 0, y: 60, rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 3 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
                  className="absolute top-0 right-0 w-72 sm:w-80 z-10"
                >
                  {/* Ear Tab */}
                  <div className="absolute -top-0 right-8 w-24 h-8 bg-[#004737] rounded-t-2xl flex items-center justify-center">
                    <span className="text-[#C8F55A] font-syne font-black text-[9px] uppercase tracking-widest">Mission</span>
                  </div>
                  <div className="bg-[#004737] rounded-[2.5rem] rounded-tr-none p-10 shadow-2xl">
                    <p className="text-[#C8F55A] font-syne font-black text-3xl uppercase leading-tight mb-6">
                      Our Mission Defined.
                    </p>
                    <p className="text-[#A8C4BB] font-inter text-sm leading-relaxed">
                      Founded in 2012, Pakistan Property Portal has evolved into a comprehensive ecosystem for real estate investment.
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C8F55A] flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-[#004737]" />
                      </div>
                      <span className="text-[#A8C4BB] font-syne font-black text-xs uppercase tracking-widest">Verified Platform</span>
                    </div>
                  </div>
                </motion.div>

                {/* VISION CARD — lime green, ear at top-left */}
                <motion.div
                  initial={{ opacity: 0, y: 100, rotate: -3 }}
                  animate={{ opacity: 1, y: 140, rotate: -3 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
                  className="absolute bottom-0 left-0 w-72 sm:w-80 z-20"
                >
                  {/* Ear Tab */}
                  <div className="absolute -top-0 left-8 w-24 h-8 bg-[#C8F55A] rounded-t-2xl flex items-center justify-center">
                    <span className="text-[#004737] font-syne font-black text-[9px] uppercase tracking-widest">Vision</span>
                  </div>
                  <div className="bg-[#C8F55A] rounded-[2.5rem] rounded-tl-none p-10 shadow-2xl">
                    <p className="text-[#004737] font-syne font-black text-3xl uppercase leading-tight mb-6">
                      12+ Years Experience.
                    </p>
                    <p className="text-[#004737]/70 font-inter text-sm leading-relaxed">
                      50,000+ active members trust Pakistan Property Portal for their biggest life milestones.
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#004737] flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#C8F55A]" />
                      </div>
                      <span className="text-[#004737] font-syne font-black text-xs uppercase tracking-widest">Market Leader</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
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
            <Line>
              <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-white uppercase tracking-tighter leading-none">
                Connecting Buyers,
              </h2>
            </Line>
            <Line delay={0.1}>
              <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-[#C8F55A] italic uppercase tracking-tighter leading-none">
                Sellers & Renters.
              </h2>
            </Line>

            {/* Orbit Ring */}
            <FadeUp delay={0.3} className="mt-24">
              <div className="relative w-[400px] h-[400px] mx-auto">
                {/* SVG Circle Path */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <circle
                    cx="200" cy="200" r="180"
                    fill="none"
                    stroke="#C8F55A"
                    strokeWidth="1"
                    strokeDasharray="6 8"
                    opacity="0.3"
                  />
                </svg>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#C8F55A]/10 border border-[#C8F55A]/30 flex items-center justify-center">
                    <RotateCcw className="w-10 h-10 text-[#C8F55A]" />
                  </div>
                </div>

                {/* Orbiting Pills */}
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
            3. VALUES — Large Cream Card with Ear Tab (top-right)
        ═══════════════════════════════════════════════════ */}
        <section className="relative bg-[#004737] pb-40">
          <div className="max-w-7xl mx-auto px-6 relative">

            {/* Ear Notch at top-right of the cream card */}
            <div className="absolute top-0 right-6 sm:right-24 w-32 h-16 bg-[#F5F0E8] rounded-b-3xl z-10" />

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="bg-[#F5F0E8] rounded-[3rem] rounded-tr-none pt-32 pb-24 px-10 sm:px-24 relative overflow-hidden shadow-2xl"
            >
              {/* Subtle lime accent */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#C8F55A]/10 rounded-full blur-[80px] -ml-32 -mt-32" />

              <div className="relative z-10">
                <Line>
                  <h2 className="font-syne font-black text-[clamp(2.5rem,5vw,5rem)] text-[#0D1B17] uppercase tracking-tighter leading-none mb-6">
                    We stand for
                  </h2>
                </Line>
                <Line delay={0.1}>
                  <h2 className="font-syne font-black text-[clamp(2.5rem,5vw,5rem)] text-[#004737] italic uppercase tracking-tighter leading-none mb-20">
                    Core Values.
                  </h2>
                </Line>

                <div className="space-y-0 divide-y divide-[#DDD8CF]">
                  {values.map((v, i) => (
                    <FadeUp key={i} delay={i * 0.1}>
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
            4. JOURNEY TIMELINE — Dotted line, circle markers
        ═══════════════════════════════════════════════════ */}
        <section className="py-40 bg-[#F5F0E8]" ref={timelineRef}>
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-32">
              <Line>
                <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-[#0D1B17] uppercase tracking-tighter">
                  Our Journey.
                </h2>
              </Line>
            </div>

            <div className="relative">
              {/* Static dotted line */}
              <div className="absolute left-8 sm:left-16 top-0 bottom-0 w-px border-l-2 border-dashed border-[#004737]/20" />
              {/* Growing solid line overlay */}
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-8 sm:left-16 top-0 w-px bg-[#004737] origin-top"
              />

              <div className="space-y-24">
                {journey.map((item, i) => (
                  <JourneyItem key={i} item={item} i={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            5. "MEET US" FOOTER CTA — Dual-notch cream card
        ═══════════════════════════════════════════════════ */}
        <section className="bg-[#004737]">
          {/* Dual ear notches at top */}
          <div className="relative flex justify-between px-6 sm:px-24">
            <div className="w-28 h-14 bg-[#F5F0E8] rounded-b-3xl" />
            <div className="w-28 h-14 bg-[#F5F0E8] rounded-b-3xl" />
          </div>

          <div className="bg-[#F5F0E8] mx-6 sm:mx-24 rounded-[3rem] p-16 sm:p-32 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8F55A]/20 rounded-full blur-[100px] -mr-32 -mt-32" />

            <div className="relative z-10">
              <Line>
                <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-[#0D1B17] uppercase tracking-tighter leading-none mb-4">
                  Ready to find
                </h2>
              </Line>
              <Line delay={0.1}>
                <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,6rem)] text-[#004737] italic uppercase tracking-tighter leading-none mb-12">
                  your future?
                </h2>
              </Line>

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

              {/* Partner Logos / Trust Signals */}
              <FadeUp delay={0.6} className="mt-20 pt-16 border-t border-[#DDD8CF]">
                <p className="text-[10px] font-syne font-black text-[#7A9088] uppercase tracking-[0.3em] mb-8">Trusted Across Pakistan</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-30 grayscale">
                  {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'].map((city) => (
                    <span key={city} className="font-syne font-black text-sm text-[#004737] uppercase tracking-widest">{city}</span>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mx-6 sm:mx-24 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-syne font-black text-white/20 uppercase tracking-widest">
            <span>© 2026 Pakistan Property Portal</span>
            <div className="flex gap-8">
              <Link href="/privacy" className="hover:text-[#C8F55A] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#C8F55A] transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

const JourneyItem = ({ item, i }: { item: any; i: number }) => {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE }}
      className="flex items-start gap-10 sm:gap-20 relative z-10"
    >
      {/* Year Circle */}
      <div className="shrink-0 relative">
        <motion.div
          animate={isInView ? { scale: 1, backgroundColor: '#004737' } : { scale: 0.5, backgroundColor: '#DDD8CF' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#F5F0E8] bg-[#004737] flex items-center justify-center shadow-xl -ml-0 sm:-ml-2"
        >
          <span className="text-[#C8F55A] font-syne font-black text-xs leading-none text-center">{item.year}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-3">
        <div className="bg-white rounded-[2rem] p-10 border border-[#DDD8CF] shadow-sm hover:shadow-xl hover:border-[#004737]/20 transition-all duration-500">
          <h3 className="font-syne font-black text-2xl text-[#0D1B17] uppercase mb-4">{item.title}</h3>
          <p className="text-sm font-inter text-[#7A9088] leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutPage
