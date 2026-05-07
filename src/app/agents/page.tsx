'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle, Star, MapPin, ChevronRight, Search, Users, Loader2 } from 'lucide-react'
import { Agent } from '@/types'
import { cn } from '@/lib/utils'

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
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      <div className="bg-[#004737] text-white pt-24 pb-16 relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">Verified Agents</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne mb-4">Find Your Property Partner</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Connect with the top-rated real estate professionals across Pakistan's major cities.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-4 sm:p-6 mb-12 shadow-[0_20px_50px_rgba(0,71,55,0.06)] flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737]" />
            <input 
              type="text" 
              placeholder="Search by agent name or agency..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 text-sm bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter transition-all"
            />
          </div>
          <div className="w-full sm:w-auto">
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-14 px-6 text-sm bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] cursor-pointer w-full sm:min-w-[180px] font-inter appearance-none"
            >
              <option>All Cities</option>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Islamabad</option>
              <option>Peshawar</option>
              <option>Rawalpindi</option>
              <option>Multan</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 text-[#004737] animate-spin" />
            <span className="font-syne font-bold text-[#004737] tracking-widest text-xs uppercase">Loading Experts...</span>
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-[#DDD8CF]">
            <div className="w-20 h-20 bg-[#F5F0E8] rounded-3xl flex items-center justify-center mx-auto mb-6">
               <Users className="w-10 h-10 text-[#004737]/30" />
            </div>
            <h3 className="text-xl font-black font-syne text-[#0D1B17]">No agents found</h3>
            <p className="text-sm text-[#7A9088] font-inter mt-2">Try a different city or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-children">
            {agents.map((agent) => (
              <div 
                key={agent.id}
                className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 text-center shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] hover:-translate-y-2 transition-all duration-500 group flex flex-col"
              >
                <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden border-4 border-[#F5F0E8] mx-auto mb-6 group-hover:scale-105 transition-transform duration-500">
                  <Image src={agent.photo || (agent as any).photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'} alt={agent.name} fill sizes="112px" className="object-cover" />
                </div>
                
                <h3 className="font-black font-syne text-[#0D1B17] text-lg mb-1 group-hover:text-[#004737] transition-colors">{agent.name}</h3>
                <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.15em] mb-4">{agent.agency || 'Verified Partner'}</p>
                
                <div className="flex items-center justify-center gap-2 text-xs font-inter text-[#3D5249] mb-6">
                  <MapPin className="w-4 h-4 text-[#004737]" />
                  {agent.city}
                </div>

                <div className="flex items-center justify-center gap-4 mb-8 py-4 bg-[#F5F0E8] rounded-2xl mt-auto">
                  <div className="text-center px-2">
                    <div className="text-xs font-black font-syne text-[#0D1B17]">{agent.experience || '3'}+</div>
                    <div className="text-[9px] text-[#7A9088] uppercase font-black font-syne tracking-tighter">YEARS</div>
                  </div>
                  <div className="w-px h-8 bg-[#DDD8CF]" />
                  <div className="text-center px-2">
                    <div className="text-xs font-black font-syne text-[#004737]">{(agent as any).properties?.[0]?.count || 12}</div>
                    <div className="text-[9px] text-[#7A9088] uppercase font-black font-syne tracking-tighter">ADS</div>
                  </div>
                  <div className="w-px h-8 bg-[#DDD8CF]" />
                  <div className="text-center px-2">
                    <div className="text-xs font-black font-syne text-[#0D1B17]">{agent.rating || '5.0'}</div>
                    <div className="text-[9px] text-[#7A9088] uppercase font-black font-syne tracking-tighter">RATING</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href={`/search?agent=${agent.id}`}
                    className="py-3.5 bg-white text-[#0D1B17] text-[10px] font-black font-syne rounded-xl hover:bg-[#004737] hover:text-[#C8F55A] transition-all border-2 border-[#F5F0E8] uppercase tracking-wider"
                  >
                    Ads
                  </Link>
                  <a 
                    href={`https://wa.me/${agent.whatsapp?.replace(/[^0-9]/g, '') || '923001234567'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 bg-[#004737] text-[#C8F55A] text-[10px] font-black font-syne rounded-xl hover:bg-black transition-all shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
