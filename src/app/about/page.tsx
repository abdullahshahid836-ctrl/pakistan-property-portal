'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ShieldCheck, Eye, Users, Zap } from 'lucide-react'

const AnimatedStepsCard = dynamic(
  () => import('@/components/about/AnimatedStepsCard'),
  { ssr: false }
)

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
]

// ─── Right column: crossfade bg photos + Ken Burns + floating steps ──────────
function RightColumn() {
  const [scrollY, setScrollY] = useState(0)
  const [bgIndex, setBgIndex] = useState(0)

  // Parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // FIX 6 — crossfade between 2 photos every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((i) => (i + 1) % BG_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden min-h-[50vh] lg:min-h-0">
      {/* Ken Burns keyframes injected inline */}
      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
      `}</style>

      {/* Two stacked bg images — crossfade */}
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${src}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`,
            animation: 'kenBurns 8s ease-in-out infinite alternate',
            opacity: i === bgIndex ? 1 : 0,
            transition: 'opacity 1500ms ease-in-out',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(0,71,55,0.3) 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Floating steps — no card, positioned absolute */}
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

        {/* ── LEFT COLUMN — FIX 1: correct sizes, timing, minimal pills ── */}
        <div
          className="bg-[#004737] flex flex-col justify-center min-h-[60vh] lg:min-h-0"
          style={{ padding: 'clamp(60px, 10vw, 120px) clamp(24px, 6vw, 60px)' }}
        >
          {/* MISSION block */}
          <div style={{ marginBottom: '40px' }}>
            {/* Mission label — minimal, no colored dot */}
            <div
              className="animate-fade-up"
              style={{
                animationDelay: '100ms',
                animationFillMode: 'both',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.2)',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontFamily: 'var(--font-syne, sans-serif)',
                }}
              >
                Mission
              </span>
            </div>

            {/* Mission text — white, huge, delay 300ms */}
            <p
              className="animate-fade-up"
              style={{
                animationDelay: '300ms',
                animationFillMode: 'both',
                fontFamily: 'var(--font-syne, sans-serif)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: '#FFFFFF',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              We connect thousands of buyers and tenants with verified properties across Pakistan.
            </p>
          </div>

          {/* Divider — 48px wide, subtle white */}
          <div
            style={{
              width: '48px',
              height: '1px',
              background: 'rgba(255,255,255,0.3)',
              margin: '32px 0',
            }}
          />

          {/* VISION block */}
          <div>
            {/* Vision label — minimal */}
            <div
              className="animate-fade-up"
              style={{
                animationDelay: '400ms',
                animationFillMode: 'both',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.2)',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontFamily: 'var(--font-syne, sans-serif)',
                }}
              >
                Vision
              </span>
            </div>

            {/* Vision text — same size, much more muted, delay 600ms */}
            <p
              className="animate-fade-up"
              style={{
                animationDelay: '600ms',
                animationFillMode: 'both',
                fontFamily: 'var(--font-syne, sans-serif)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              by making property ownership and renting accessible to every Pakistani family.
            </p>
          </div>

          {/* Scroll indicator */}
          <div
            className="animate-fade-up"
            style={{
              animationDelay: '800ms',
              animationFillMode: 'both',
              marginTop: '48px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ width: '20px', height: '1px', background: 'rgba(200,245,90,0.6)' }} />
              <div style={{ width: '32px', height: '1px', background: '#C8F55A' }} />
              <div style={{ width: '20px', height: '1px', background: 'rgba(200,245,90,0.6)' }} />
            </div>
            <span style={{ color: '#A8C4BB', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'var(--font-inter, sans-serif)' }}>
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
