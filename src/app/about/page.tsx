'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { ShieldCheck, Eye, Users, Zap } from 'lucide-react'

const AnimatedStepsCard = dynamic(
  () => import('@/components/about/AnimatedStepsCard'),
  { ssr: false }
)

// ─── Parallax right column ───────────────────────────────────────────────────
function RightColumn() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden min-h-[50vh] lg:min-h-0">
      {/* Parallax background image */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80')",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,71,55,0.75) 0%, rgba(0,0,0,0.55) 100%)',
        }}
      />
      {/* Animated card */}
      <AnimatedStepsCard />
    </div>
  )
}

// ─── Values data ─────────────────────────────────────────────────────────────
const values = [
  {
    icon: ShieldCheck,
    title: 'Trust',
    desc: 'We verify every listing for authenticity and accuracy before it goes live.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'Clear pricing, no hidden fees — what you see is what you pay.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Connecting Pakistani families to homes across every city and town.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    desc: 'A technology-first platform built for the modern Pakistani property market.',
  },
]

const stats = [
  { number: '50,000+', label: 'Properties Listed' },
  { number: '2,000+',  label: 'Verified Agents' },
  { number: '25+',     label: 'Cities Covered' },
  { number: '1M+',     label: 'Happy Users' },
]

const team = [
  { initials: 'AK', name: 'Ahmed Khan',    role: 'CEO & Founder',     bio: 'Real estate veteran with 15+ years driving property innovation across Pakistan.' },
  { initials: 'FS', name: 'Fatima Sheikh', role: 'Head of Operations', bio: 'Operations strategist ensuring every listing meets our verified quality standard.' },
  { initials: 'UJ', name: 'Usman Javed',   role: 'CTO',               bio: 'Full-stack engineer building the technology behind Pakistan\'s #1 property platform.' },
]

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — 2-column layout
          LEFT  : dark green bg, Mission + Vision text blocks
          RIGHT : background photo + animated steps card + parallax
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ── LEFT COLUMN ── */}
        <div
          className="bg-[#004737] flex flex-col justify-center
                     px-6 py-[100px] sm:px-10 lg:px-[60px] lg:py-[120px]
                     min-h-[60vh] lg:min-h-0"
        >
          {/* MISSION */}
          <div className="mb-12 sm:mb-16 animate-fade-up" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-[#C8F55A]/15 border border-[#C8F55A]/30">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8F55A] animate-pulse" />
              <span className="text-[#C8F55A] text-[11px] font-bold uppercase tracking-[0.15em] font-syne">
                Mission
              </span>
            </div>

            {/* Mission text */}
            <p
              className="font-syne font-bold text-[#F5F0E8] text-2xl sm:text-3xl lg:text-4xl leading-[1.2] tracking-tight animate-fade-up"
              style={{ animationDelay: '200ms', animationFillMode: 'both' }}
            >
              We connect thousands of buyers and tenants with verified properties across Pakistan.
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-[#C8F55A]/40 mb-12" />

          {/* VISION */}
          <div className="animate-fade-up" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-white/10 border border-white/20">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.15em] font-syne">
                Vision
              </span>
            </div>

            {/* Vision text */}
            <p
              className="font-syne font-bold text-[#A8C4BB] text-2xl sm:text-3xl lg:text-4xl leading-[1.2] tracking-tight animate-fade-up"
              style={{ animationDelay: '400ms', animationFillMode: 'both' }}
            >
              by making property ownership and renting accessible to every Pakistani family.
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-16 flex items-center gap-3 animate-fade-up"
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
          >
            <div className="flex flex-col gap-1">
              <div className="w-5 h-px bg-[#C8F55A]/60" />
              <div className="w-8 h-px bg-[#C8F55A]" />
              <div className="w-5 h-px bg-[#C8F55A]/60" />
            </div>
            <span className="text-[#A8C4BB] text-xs font-inter uppercase tracking-[0.15em]">
              Scroll to explore
            </span>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <RightColumn />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — Who We Are
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F0E8] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-syne font-bold text-4xl text-[#0D1B17] mb-8 tracking-tight">
            About Pakistan Property Portal
          </h2>
          <div className="space-y-5 font-inter text-base text-[#3D5249] leading-relaxed">
            <p>
              Founded in 2012, Pakistan Property Portal began as the country&apos;s first fully verified property listing
              directory. What started as a simple idea — making property search honest and transparent — has grown
              into Pakistan&apos;s most comprehensive real estate ecosystem.
            </p>
            <p>
              Today, we serve over one million users across 25+ cities, connecting buyers, sellers, and renters with
              a network of 2,000+ verified agents. Our platform combines cutting-edge technology with deep local
              expertise to deliver an experience that truly understands the Pakistani property market.
            </p>
            <p>
              From first-time renters searching for affordable apartments in Lahore to seasoned investors scouting
              commercial opportunities in Karachi — Pakistan Property Portal is the platform every property journey
              starts on.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — Our Values
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#EDE8DF] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-syne font-bold text-4xl text-[#0D1B17] mb-12 tracking-tight text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-8 border border-[#DDD8CF] hover:shadow-lg hover:border-[#004737]/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#004737]/10 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-[#004737]" />
                </div>
                <h3 className="font-syne font-bold text-xl text-[#0D1B17] mb-3 uppercase tracking-tight">
                  {v.title}
                </h3>
                <p className="font-inter text-sm text-[#7A9088] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — Stats
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#004737] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-syne font-bold text-4xl text-[#C8F55A] mb-2">{s.number}</p>
                <p className="font-inter text-sm text-[#A8C4BB] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 — Team
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F0E8] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-syne font-bold text-4xl text-[#0D1B17] mb-12 tracking-tight text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-8 text-center border border-[#DDD8CF] hover:shadow-lg transition-all duration-300"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-[#004737] flex items-center justify-center mx-auto mb-5">
                  <span className="font-syne font-bold text-[#C8F55A] text-lg">{member.initials}</span>
                </div>
                <h3 className="font-syne font-bold text-lg text-[#0D1B17] mb-1">{member.name}</h3>
                <p className="font-syne text-xs text-[#004737] uppercase tracking-widest mb-4">{member.role}</p>
                <p className="font-inter text-sm text-[#7A9088] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
