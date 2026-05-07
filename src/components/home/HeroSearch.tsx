'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, ChevronDown, Loader2, Home, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import Reveal from '@/components/shared/Reveal'

const HeroSearch = () => {
  const router = useRouter()
  const containerRef = useRef(null)
  const [activeTab, setActiveTab] = useState<'BUY' | 'RENT' | 'PROJECTS'>('BUY')
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

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

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#004737] overflow-hidden flex flex-col items-center justify-center pt-20 gpu-accelerated">
      
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y, scale, opacity }}
        className="absolute inset-0 pointer-events-none hidden sm:block"
      >
        <div className="absolute inset-0 opacity-10" 
          style={{ backgroundImage: 'radial-gradient(circle, #C8F55A 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} 
        />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#C8F55A]/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#006B55]/40 rounded-full blur-[150px]" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        
        <Reveal direction="clip" delay={0.1}>
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#C8F55A] text-[10px] font-black font-syne uppercase tracking-[0.3em] mb-10">
            <span className="w-2 h-2 rounded-full bg-[#C8F55A] animate-pulse" />
            Pakistan's Premier Real Estate Protocol
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h1 className="text-flecto-h1 text-white mb-10">
            Elevate Your <br />
            <span className="text-[#C8F55A] italic">Lifestyle.</span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="text-lg sm:text-xl text-[#A8C4BB] max-w-2xl mx-auto mb-10 sm:mb-16 font-medium leading-relaxed">
            Discover a curated collection of verified high-value assets across Pakistan's most prestigious sectors.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4} className="w-full">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-2 mb-0 ml-4">
              {(['BUY', 'RENT', 'PROJECTS'] as const).map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-10 py-5 text-[10px] font-black font-syne tracking-[0.3em] rounded-t-[2rem] transition-all duration-700 relative overflow-hidden uppercase',
                    activeTab === tab ? 'bg-[#F5F0E8] text-[#004737]' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="bg-[#F5F0E8] rounded-[2rem] sm:rounded-[3rem] sm:rounded-tl-none p-5 sm:p-10 shadow-[0_60px_120px_rgba(0,0,0,0.4)] border-4 sm:border-8 border-white/5">
               <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <div className="relative">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#004737] opacity-40" />
                    <input
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="IDENTIFY SECTOR OR AREA..."
                      className="w-full h-14 sm:h-18 pl-14 pr-6 bg-white border border-[#DDD8CF] rounded-2xl text-[10px] sm:text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:outline-none focus:border-[#004737] transition-all shadow-inner"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="relative">
                       <select className="w-full h-14 sm:h-18 px-6 bg-white border border-[#DDD8CF] rounded-2xl text-[10px] sm:text-[11px] font-black font-syne uppercase tracking-widest text-[#0D1B17] focus:outline-none appearance-none cursor-pointer shadow-inner">
                          <option>ALL ASSETS</option>
                          <option>HOMES</option>
                          <option>PLOTS</option>
                          <option>COMMERCIAL</option>
                       </select>
                       <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737] opacity-40" />
                    </div>
                    <button type="submit" className="h-14 sm:h-18 bg-[#004737] text-[#C8F55A] rounded-2xl text-[10px] sm:text-[11px] font-black font-syne uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl">
                      <Search className="w-4 h-4" /> INITIATE
                    </button>
                  </div>
               </form>
            </div>
          </div>
        </Reveal>

        {/* Dynamic Stats Stagger */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
           {[
             { val: '50K+', label: 'ASSETS' },
             { val: '12K+', label: 'VERIFIED' },
             { val: '25+',  label: 'SECTORS' },
             { val: '0.8s', label: 'LATENCY' }
           ].map((stat, i) => (
             <Reveal key={i} direction="up" delay={0.6 + (i * 0.1)}>
                <div className="group cursor-pointer">
                  <div className="text-4xl font-black font-syne text-white mb-2 group-hover:text-[#C8F55A] transition-colors tracking-tighter">{stat.val}</div>
                  <div className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.4em] group-hover:text-white transition-colors">{stat.label}</div>
                </div>
             </Reveal>
           ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#C8F55A] to-transparent opacity-40" />
        <span className="text-[8px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.4em] rotate-90 origin-left">SCROLL</span>
      </motion.div>

    </section>
  )
}

export default HeroSearch
