'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ChevronDown, Settings, Loader2, Home, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import Reveal from '@/components/shared/Reveal'

const HeroSearch = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'PROJECTS'>('BUY')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.length > 1) {
      setLoadingSuggestions(true)
      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(value)}`)
        const data = await res.json()
        setSuggestions(data.suggestions || [])
      } catch { /* silent */ } finally {
        setLoadingSuggestions(false)
      }
    } else {
      setSuggestions([])
    }
  }

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    params.set('purpose', activeTab === 'BUY' ? 'Sale' : activeTab === 'RENT' ? 'Rent' : 'Project')
    router.push(`/search?${params.toString()}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    }
  }

  return (
    <section className="relative min-h-screen bg-[#004737] overflow-hidden flex flex-col items-center justify-center pt-20">

      {/* Animated Background Texture */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Dynamic Glow Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C8F55A] rounded-full blur-[150px] pointer-events-none" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#006B55] rounded-full blur-[120px] pointer-events-none" 
      />

      {/* Floating Interactive Cards */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
        className="absolute left-12 top-1/3 hidden xl:block z-20"
      >
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="bg-white rounded-3xl p-5 shadow-[0_32px_64px_rgba(0,71,55,0.2)] w-72 border border-[#DDD8CF] cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F0E8] flex items-center justify-center shadow-inner">
              <Home className="w-6 h-6 text-[#004737]" />
            </div>
            <div>
              <div className="text-xs font-black text-[#0D1B17] font-syne uppercase tracking-tight">DHA Phase 6</div>
              <div className="text-[10px] text-[#7A9088] font-black font-syne uppercase tracking-widest opacity-60">Lahore</div>
            </div>
          </div>
          <div className="text-xl font-black text-[#004737] font-syne uppercase tracking-tight">PKR 2.5 Crore</div>
          <div className="flex gap-4 mt-3">
            <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest">🛏 5 Beds</span>
            <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest">📐 1 Kanal</span>
          </div>
          <div className="mt-4 flex items-center gap-2 pt-4 border-t border-[#F5F0E8]">
            <div className="w-2 h-2 rounded-full bg-[#C8F55A] animate-pulse" />
            <span className="text-[9px] text-[#004737] font-black font-syne uppercase tracking-[0.2em]">PLATINUM VERIFIED</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] as any }}
        className="absolute right-12 top-1/2 hidden xl:block z-20"
      >
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="bg-[#003329] rounded-3xl p-6 shadow-[0_32px_64px_rgba(0,0,0,0.3)] w-64 border border-[#004737] cursor-pointer"
        >
          <div className="text-[9px] text-[#C8F55A] uppercase tracking-[0.3em] font-black font-syne mb-3">JUST LISTED</div>
          <div className="text-base font-black text-white font-syne mb-1 uppercase leading-tight">3 Bed Flat, Clifton</div>
          <div className="text-2xl font-black text-[#C8F55A] font-syne uppercase tracking-tight">PKR 85 Lac</div>
          <div className="text-[10px] text-[#A8C4BB] mt-2 font-black font-syne uppercase tracking-widest opacity-60">Karachi</div>
          <div className="mt-5 flex justify-end">
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <ArrowRight className="w-4 h-4" />
             </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 text-center w-full"
      >
        {/* Animated Pill */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="pill-label-light bg-[#F5F0E8]/10 backdrop-blur-md border-white/10 px-6 py-2">
            🏠 Pakistan's Premier Property Portal
          </div>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.div variants={itemVariants} className="mt-8">
          <h1 className="font-syne font-black text-[#F5F0E8] text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl mx-auto uppercase">
            Elevate Your <br />
            <span className="text-[#C8F55A] italic">Lifestyle.</span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-[#A8C4BB] text-base sm:text-xl max-w-xl mx-auto leading-relaxed font-inter font-medium opacity-80">
            Explore 50,000+ hand-picked verified listings across the nation's most prestigious locations.
          </p>
        </motion.div>

        {/* High-Fidelity Search Form */}
        <motion.div variants={itemVariants} className="mt-14 max-w-4xl mx-auto relative group">
          
          {/* Form Tabs */}
          <div className="flex gap-1.5 mb-0 justify-center sm:justify-start ml-2">
            {(['BUY', 'RENT', 'PROJECTS'] as const).map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-8 py-4 text-[10px] font-black font-syne tracking-[0.2em] rounded-t-[1.5rem] transition-all duration-500 relative overflow-hidden',
                  activeTab === tab
                    ? 'bg-[#F5F0E8] text-[#004737] shadow-[-10px_-10px_30px_rgba(0,0,0,0.1)]'
                    : 'bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10'
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8F55A]" />
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="bg-[#F5F0E8] rounded-[2.5rem] sm:rounded-tl-none p-5 sm:p-7 shadow-[0_40px_100px_rgba(0,0,0,0.3)] border-4 border-white/5">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Location Input */}
                <div className="relative flex-[2]">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2">
                    {loadingSuggestions
                      ? <Loader2 className="w-5 h-5 text-[#004737] animate-spin" />
                      : <MapPin className="w-5 h-5 text-[#004737] opacity-40" />}
                  </div>
                  <input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter city, area or society..."
                    className="w-full h-16 pl-14 pr-6 text-sm font-black font-syne uppercase tracking-wider bg-white border border-[#DDD8CF] rounded-2xl text-[#0D1B17] placeholder:text-[#7A9088] placeholder:font-bold focus:outline-none focus:border-[#004737] transition-all shadow-inner"
                  />
                  
                  {/* Suggestions List */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl border border-[#DDD8CF] shadow-[0_32px_80px_rgba(0,71,55,0.2)] z-50 overflow-hidden"
                      >
                        {suggestions.map((s, idx) => (
                          <button key={idx} type="button"
                            onClick={() => { setSearchQuery(s.label); setSuggestions([]) }}
                            className="flex items-center gap-4 w-full px-6 py-4 text-[11px] font-black font-syne uppercase tracking-widest text-[#3D5249] hover:bg-[#F5F0E8] hover:text-[#004737] transition-all border-b last:border-0 border-[#F5F0E8]"
                          >
                            <MapPin className="w-4 h-4 text-[#C8F55A]" />
                            <div className="text-left">
                              <span className="font-black">{s.label}</span>
                              <span className="text-[9px] opacity-40 ml-3 bg-[#004737]/5 px-2 py-0.5 rounded-lg">{s.type}</span>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Property Type Dropdown */}
                <div className="relative flex-1">
                  <select className="w-full h-16 px-6 text-[11px] font-black font-syne uppercase tracking-widest bg-white border border-[#DDD8CF] rounded-2xl text-[#0D1B17] focus:outline-none focus:border-[#004737] appearance-none cursor-pointer shadow-inner">
                    <option>All Types</option>
                    <option>House</option>
                    <option>Flat</option>
                    <option>Plot</option>
                    <option>Commercial</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737] pointer-events-none opacity-40" />
                </div>

                {/* Search CTA */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="h-16 px-10 bg-[#004737] text-[#C8F55A] rounded-2xl text-[11px] font-black font-syne tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-[0_12px_40px_rgba(0,71,55,0.3)] whitespace-nowrap uppercase"
                >
                  <Search className="w-4 h-4" /> FIND NOW
                </motion.button>
              </div>

              {/* Advanced Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div className="flex-1 relative">
                  <select className="w-full h-14 px-6 text-[10px] font-black font-syne uppercase tracking-widest bg-white border border-[#DDD8CF] rounded-2xl text-[#0D1B17] appearance-none focus:outline-none focus:border-[#004737] shadow-inner">
                    <option>Any Price</option>
                    <option>Up to 50 Lac</option>
                    <option>50 Lac – 1 Cr</option>
                    <option>1 Cr – 2 Cr</option>
                    <option>5 Cr+</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#004737] opacity-30" />
                </div>
                <div className="flex-1 relative">
                  <select className="w-full h-14 px-6 text-[10px] font-black font-syne uppercase tracking-widest bg-white border border-[#DDD8CF] rounded-2xl text-[#0D1B17] appearance-none focus:outline-none focus:border-[#004737] shadow-inner">
                    <option>Any Area</option>
                    <option>Up to 5 Marla</option>
                    <option>5–10 Marla</option>
                    <option>1 Kanal+</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#004737] opacity-30" />
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12 border-t border-white/5">
            {[
              { num: '50k+', label: 'Premium Listings' },
              { num: '2k+',  label: 'Expert Agents' },
              { num: '25+',  label: 'Prime Cities' },
              { num: '1M+',  label: 'Active Users' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label} 
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="text-3xl sm:text-4xl font-black text-white font-syne tracking-tighter group-hover:text-[#C8F55A] transition-colors">{stat.num}</div>
                <div className="text-[9px] text-[#7A9088] font-black font-syne uppercase tracking-[0.3em] mt-2 group-hover:text-[#A8C4BB] transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Cinematic Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            initial={{ d: "M0 100L1440 100L1440 50C1200 100 960 0 720 50C480 100 240 0 0 50L0 100Z" }}
            animate={{ d: [
              "M0 100L1440 100L1440 50C1200 100 960 0 720 50C480 100 240 0 0 50L0 100Z",
              "M0 100L1440 100L1440 40C1200 90 960 -10 720 40C480 90 240 -10 0 40L0 100Z",
              "M0 100L1440 100L1440 50C1200 100 960 0 720 50C480 100 240 0 0 50L0 100Z"
            ]}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as any }}
            fill="#F5F0E8" 
          />
        </svg>
      </div>
    </section>
  )
}

export default HeroSearch
