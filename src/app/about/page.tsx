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

        {/* ═══════════════════════════════════════════════════════════════════
            HERO — Exact Flecto About Page Layout
            BG: Dark green #004737
            LEFT: Giant statement heading (line-by-line reveal) + subtitle
            RIGHT: Two overlapping ear-tab cards
              Card 1 (back)  — dark green #004737, "Mission" ear tab top-right
              Card 2 (front) — lime #C8F55A,  "Vision"  ear tab top-left
            BOTTOM: animated scroll chevron
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen bg-[#004737] flex flex-col overflow-hidden">

          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
          />

          {/* Content — takes full height, vertically centred */}
          <div className="flex-1 flex items-center pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* ── LEFT: Heading ── */}
                <div className="relative z-10">

                  {/* Small eyebrow label */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                    className="mb-8"
                  >
                    <span className="inline-flex items-center gap-2 text-[#C8F55A]/60 font-syne font-black text-[11px] uppercase tracking-[0.35em]">
                      <span className="w-8 h-px bg-[#C8F55A]/40" />
                      About Us
                    </span>
                  </motion.div>

                  {/* Giant heading — 3 lines, each clips up from overflow:hidden */}
                  <div className="mb-12 space-y-1">
                    <HeroLine delay={0.2}>
                      <h1 className="font-syne font-black text-white uppercase leading-[0.88] tracking-[-0.02em]"
                          style={{ fontSize: 'clamp(3.2rem, 7vw, 7.5rem)' }}>
                        Pakistan&apos;s
                      </h1>
                    </HeroLine>
                    <HeroLine delay={0.36}>
                      <h1 className="font-syne font-black text-[#C8F55A] italic uppercase leading-[0.88] tracking-[-0.02em]"
                          style={{ fontSize: 'clamp(3.2rem, 7vw, 7.5rem)' }}>
                        Most Trusted
                      </h1>
                    </HeroLine>
                    <HeroLine delay={0.52}>
                      <h1 className="font-syne font-black text-white uppercase leading-[0.88] tracking-[-0.02em]"
                          style={{ fontSize: 'clamp(3.2rem, 7vw, 7.5rem)' }}>
                        Network.
                      </h1>
                    </HeroLine>
                  </div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.5, y: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.85 }}
                    className="text-white font-inter text-base sm:text-[1.05rem] leading-relaxed max-w-[420px]"
                  >
                    Redefining the real estate landscape in Pakistan through
                    transparency, technology, and a premium user experience.
                  </motion.p>
                </div>

                {/* ── RIGHT: Two overlapping ear-tab cards ── */}
                <div className="relative h-[480px] sm:h-[540px]">

                  {/* ── CARD 1: Mission — dark green, ear tab at top-right ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 80, rotate: 5 }}
                    animate={{ opacity: 1, y: 0, rotate: 3 }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
                    className="absolute top-0 right-0 w-[290px] sm:w-[320px] z-10"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {/* Ear tab — top-right */}
                    <div className="absolute -top-0 right-10 w-[100px] h-9 bg-[#003328] rounded-t-2xl flex items-center justify-center z-20">
                      <span className="text-[#C8F55A] font-syne font-black text-[9px] uppercase tracking-[0.25em]">Mission</span>
                    </div>
                    {/* Card body */}
                    <div className="bg-[#003328] rounded-[2rem] rounded-tr-none pt-14 pb-10 px-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/5">
                      <p className="text-[#C8F55A] font-syne font-black text-[1.6rem] uppercase leading-tight mb-5">
                        Our Mission Defined.
                      </p>
                      <p className="text-white/40 font-inter text-sm leading-relaxed mb-8">
                        Founded in 2012, Pakistan Property Portal has evolved into a comprehensive ecosystem for real estate investment and discovery.
                      </p>
                      <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                        <div className="w-9 h-9 rounded-full bg-[#C8F55A]/10 border border-[#C8F55A]/20 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-4 h-4 text-[#C8F55A]" />
                        </div>
                        <span className="text-white/30 font-syne font-black text-[9px] uppercase tracking-widest">Verified Platform Since 2012</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── CARD 2: Vision — lime green, ear tab at top-left, overlaps Card 1 ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 100, rotate: -5 }}
                    animate={{ opacity: 1, y: 160, rotate: -3 }}
                    transition={{ duration: 1.3, ease: EASE, delay: 0.65 }}
                    className="absolute bottom-0 left-0 w-[290px] sm:w-[320px] z-20"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {/* Ear tab — top-left */}
                    <div className="absolute -top-0 left-10 w-[90px] h-9 bg-[#aad832] rounded-t-2xl flex items-center justify-center z-20">
                      <span className="text-[#004737] font-syne font-black text-[9px] uppercase tracking-[0.25em]">Vision</span>
                    </div>
                    {/* Card body */}
                    <div className="bg-[#C8F55A] rounded-[2rem] rounded-tl-none pt-14 pb-10 px-10 shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
                      <p className="text-[#004737] font-syne font-black text-[1.6rem] uppercase leading-tight mb-5">
                        12+ Years Experience.
                      </p>
                      <p className="text-[#004737]/60 font-inter text-sm leading-relaxed mb-8">
                        50,000+ active members trust Pakistan Property Portal for their biggest life milestones across every major city.
                      </p>
                      <div className="flex items-center gap-3 pt-6 border-t border-[#004737]/15">
                        <div className="w-9 h-9 rounded-full bg-[#004737] flex items-center justify-center shrink-0">
                          <ArrowRight className="w-4 h-4 text-[#C8F55A]" />
                        </div>
                        <span className="text-[#004737]/50 font-syne font-black text-[9px] uppercase tracking-widest">Pakistan&apos;s Market Leader</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </div>

          {/* Scroll indicator — bottom center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col items-center gap-2 pb-10 z-10"
          >
            <span className="text-white/20 font-syne font-black text-[9px] uppercase tracking-[0.4em]">Scroll</span>
            <div className="scroll-bounce text-white/20">
              <ChevronDown className="w-5 h-5" />
            </div>
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
