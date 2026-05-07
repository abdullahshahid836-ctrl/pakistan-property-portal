'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle, Star, MapPin, ChevronRight, Search, Users, Loader2, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Agent } from '@/types'
import { cn } from '@/lib/utils'
import Reveal from '@/components/shared/Reveal'

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchQuery) params.set('search', searchQuery)
        if (selectedCity !== 'All Cities') params.set('city', selectedCity)
        
        const res = await fetch(`/api/agents?${params.toString()}`)
        const data = await res.json()
        setAgents(data.agents || [])
      } catch (err) {
        console.error('Failed to fetch agents:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAgents()
  }, [searchQuery, selectedCity])

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-24">
      {/* Cinematic Header */}
      <div className="bg-[#004737] pt-32 pb-24 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal direction="down">
            <div className="flex items-center justify-center gap-2 text-[10px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em] mb-6">
              <Link href="/" className="hover:underline underline-offset-8 transition-all">CENTRAL</Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span className="opacity-60">Professional Network</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne text-white mb-6 uppercase tracking-tight leading-[0.9]">
               Strategic <br />
               <span className="text-[#C8F55A] italic">Advisors.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A8C4BB] font-inter max-w-xl mx-auto font-medium opacity-80 leading-relaxed">
              Connect with Pakistan's elite real estate professionals to facilitate your next high-value acquisition.
            </p>
          </Reveal>
        </div>

        {/* Dynamic Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              initial={{ d: "M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" }}
              animate={{ d: [
                "M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z",
                "M0 40L1440 40L1440 5C1200 35 960 -5 720 15C480 35 240 -5 0 5L0 40Z",
                "M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z"
              ]}}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              fill="#F5F0E8" 
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        
        {/* Advanced Search & Filter Bar */}
        <Reveal direction="up" delay={0.3}>
          <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-5 shadow-[0_24px_80px_rgba(0,71,55,0.1)] flex flex-col lg:flex-row gap-5 items-center">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-[#004737] group-hover:scale-110 transition-transform duration-300 opacity-40" />
              <input 
                type="text" 
                placeholder="Initialize search by advisor name or agency identifier..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-18 pl-16 pr-8 text-[11px] font-black font-syne uppercase tracking-widest bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] transition-all shadow-inner"
              />
            </div>
            <div className="w-full lg:w-72">
              <div className="relative">
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="h-18 px-8 text-[10px] font-black font-syne uppercase tracking-widest bg-white border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] cursor-pointer w-full appearance-none shadow-sm"
                >
                  <option>All Cities</option>
                  <option>Lahore</option>
                  <option>Karachi</option>
                  <option>Islamabad</option>
                  <option>Peshawar</option>
                  <option>Rawalpindi</option>
                  <option>Multan</option>
                </select>
                <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737] rotate-90 opacity-40 pointer-events-none" />
              </div>
            </div>
          </div>
        </Reveal>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-8">
            <div className="relative">
              <Loader2 className="w-14 h-14 text-[#004737] animate-spin" />
              <div className="absolute inset-0 bg-[#004737]/5 rounded-full blur-xl" />
            </div>
            <span className="font-syne font-black text-[#004737] tracking-[0.4em] text-[10px] uppercase">Decrypting Network Data...</span>
          </div>
        ) : agents.length === 0 ? (
          <Reveal direction="up" className="w-full">
            <div className="text-center py-40 bg-white rounded-[3.5rem] border-4 border-dashed border-[#DDD8CF]/50 mt-12">
              <div className="w-24 h-24 bg-[#F5F0E8] rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                 <Users className="w-12 h-12 text-[#004737] opacity-20" />
              </div>
              <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">Zero Network Matches</h3>
              <p className="text-sm text-[#7A9088] font-inter mt-4 opacity-60">Adjust your strategic filters to expand the search radius.</p>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
            <AnimatePresence mode="popLayout">
              {agents.map((agent, i) => (
                <Reveal key={agent.id} delay={i * 0.05} direction="up">
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="bg-white rounded-[3rem] border border-[#DDD8CF] p-8 text-center shadow-[0_8px_24px_rgba(0,71,55,0.03)] hover:shadow-[0_40px_100px_rgba(0,71,55,0.12)] hover:border-[#004737]/20 transition-all duration-700 group flex flex-col h-full relative overflow-hidden"
                  >
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5F0E8] rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-[#C8F55A]/20 transition-colors duration-700" />
                    
                    <div className="relative w-32 h-32 rounded-[2.5rem] overflow-hidden border-8 border-[#F5F0E8] mx-auto mb-8 group-hover:scale-110 transition-transform duration-700 shadow-xl group-hover:shadow-[#004737]/10">
                      <Image src={agent.photo || (agent as any).photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'} alt={agent.name} fill sizes="128px" className="object-cover" />
                    </div>
                    
                    <div className="flex justify-center mb-4">
                       <span className="px-4 py-1.5 bg-[#F5F0E8] text-[#004737] text-[8px] font-black font-syne uppercase tracking-widest rounded-xl border border-[#DDD8CF]/50 group-hover:bg-[#004737] group-hover:text-[#C8F55A] transition-all duration-500">
                          VERIFIED ADVISOR
                       </span>
                    </div>

                    <h3 className="font-black font-syne text-[#0D1B17] text-xl mb-1 group-hover:text-[#004737] transition-colors leading-none uppercase tracking-tight">{agent.name}</h3>
                    <p className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-6 opacity-60">{agent.agency || 'Independent Partner'}</p>
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] font-black font-syne text-[#3D5249] mb-8 uppercase tracking-widest">
                      <MapPin className="w-4 h-4 text-[#004737] opacity-30" />
                      {agent.city}
                    </div>

                    <div className="grid grid-cols-3 gap-1 mb-10 py-5 bg-[#F5F0E8]/50 rounded-[1.5rem] mt-auto border border-[#DDD8CF]/30">
                      <div className="text-center border-r border-[#DDD8CF]">
                        <div className="text-sm font-black font-syne text-[#0D1B17]">{agent.experience || '3'}+</div>
                        <div className="text-[7px] text-[#7A9088] uppercase font-black font-syne tracking-widest opacity-60">EXP</div>
                      </div>
                      <div className="text-center border-r border-[#DDD8CF]">
                        <div className="text-sm font-black font-syne text-[#004737]">{(agent as any).properties?.[0]?.count || 12}</div>
                        <div className="text-[7px] text-[#7A9088] uppercase font-black font-syne tracking-widest opacity-60">ADS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-black font-syne text-[#0D1B17] flex items-center justify-center gap-1">
                          {agent.rating || '5.0'}
                        </div>
                        <div className="text-[7px] text-[#7A9088] uppercase font-black font-syne tracking-widest opacity-60">RANK</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Link 
                        href={`/search?agent=${agent.id}`}
                        className="py-4 bg-white text-[#0D1B17] text-[9px] font-black font-syne rounded-2xl hover:bg-[#F5F0E8] transition-all border border-[#DDD8CF] uppercase tracking-widest shadow-sm"
                      >
                        PORTFOLIO
                      </Link>
                      <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/${agent.whatsapp?.replace(/[^0-9]/g, '') || '923001234567'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-4 bg-[#004737] text-[#C8F55A] text-[9px] font-black font-syne rounded-2xl hover:bg-black transition-all shadow-xl shadow-[#004737]/10 flex items-center justify-center gap-2 uppercase tracking-widest"
                      >
                        <MessageCircle className="w-4 h-4" />
                        INITIATE
                      </motion.a>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
