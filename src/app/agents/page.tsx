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
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
            <Link href="/" className="hover:text-flecto-green transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            <span className="text-flecto-green-light">Verified Partners</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-flecto-green font-syne tracking-tight">Market Experts</h1>
          <p className="text-base text-flecto-text-muted mt-2 font-inter font-medium uppercase tracking-widest text-[10px]">Secure consultations with Pakistan's premier real estate advisors</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search & Filter */}
        <div className="bg-white rounded-[2rem] border border-flecto-green/5 p-8 mb-12 shadow-2xl shadow-flecto-green/[0.04] flex flex-col sm:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-flecto-lime group-focus-within:scale-110 transition-transform duration-500" />
            <input 
              type="text" 
              placeholder="Identify agent or agency..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-16 pr-6 text-sm bg-flecto-cream-dark border border-transparent rounded-[1.25rem] focus:outline-none focus:bg-white focus:border-flecto-lime/50 transition-all duration-500 font-syne uppercase tracking-wider"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-14 px-8 text-xs font-bold bg-flecto-cream-dark border border-transparent rounded-[1.25rem] focus:outline-none focus:bg-white focus:border-flecto-lime/50 cursor-pointer flex-1 min-w-[180px] font-syne uppercase tracking-widest appearance-none transition-all duration-500"
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
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <div className="w-12 h-12 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-flecto-green uppercase tracking-[0.2em] font-inter">Syncing Experts...</p>
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-flecto-green/5 shadow-inner">
            <Users className="w-16 h-16 text-flecto-lime mx-auto mb-6 opacity-40" />
            <h3 className="text-xl font-bold text-flecto-green font-syne uppercase tracking-widest mb-2">No results identified</h3>
            <p className="text-xs text-flecto-text-muted font-inter font-medium uppercase tracking-[0.2em]">Adjust your criteria for broader discovery</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {agents.map((agent) => (
              <div 
                key={agent.id}
                className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-8 text-center shadow-2xl shadow-flecto-green/[0.04] hover:shadow-flecto-green/[0.08] transition-all duration-700 transform hover:-translate-y-2 group flex flex-col"
              >
                <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden border-4 border-flecto-cream mx-auto mb-6 group-hover:scale-105 transition-all duration-700 shadow-xl">
                  <Image src={agent.photo || (agent as any).photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'} alt={agent.name} fill sizes="112px" className="object-cover" />
                </div>
                
                <h3 className="text-lg font-bold text-flecto-green group-hover:text-flecto-green-light transition-colors line-clamp-1 font-syne uppercase tracking-tight">{agent.name}</h3>
                <p className="text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 line-clamp-1 font-inter">{agent.agency || (agent as any).agency_name || 'Strategic Advisor'}</p>
                
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-flecto-green-light mb-6 font-syne uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-flecto-lime" />
                  {agent.city}
                </div>

                <div className="flex items-center justify-center gap-4 mb-8 py-5 bg-flecto-cream rounded-[1.5rem] mt-auto border border-flecto-green/[0.02]">
                  <div className="text-center flex-1">
                    <div className="text-xs font-bold text-flecto-green font-syne">{agent.experience || (agent as any).years_experience || '3'}+</div>
                    <div className="text-[8px] text-flecto-text-muted uppercase font-bold tracking-widest">Years</div>
                  </div>
                  <div className="w-px h-6 bg-flecto-green/10" />
                  <div className="text-center flex-1">
                    <div className="text-xs font-bold text-flecto-green-light font-syne">{(agent as any).properties?.[0]?.count || 0}</div>
                    <div className="text-[8px] text-flecto-text-muted uppercase font-bold tracking-widest">Ads</div>
                  </div>
                  <div className="w-px h-6 bg-flecto-green/10" />
                  <div className="text-center flex-1">
                    <div className="text-xs font-bold text-flecto-green font-syne">{agent.rating || '5.0'}</div>
                    <div className="text-[8px] text-flecto-text-muted uppercase font-bold tracking-widest">Rating</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href={`/search?agent=${agent.id}`}
                    className="py-3.5 bg-flecto-cream text-flecto-green-light text-[10px] font-bold rounded-full hover:bg-white hover:text-flecto-green transition-all duration-500 border border-flecto-green/5 font-syne uppercase tracking-widest shadow-sm"
                  >
                    Ads
                  </Link>
                  <a 
                    href={`https://wa.me/${agent.whatsapp?.replace(/[^0-9]/g, '') || '923001234567'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 bg-flecto-green text-flecto-cream text-[10px] font-bold rounded-full hover:bg-flecto-green-light hover:scale-105 transition-all duration-500 shadow-xl shadow-flecto-green/20 flex items-center justify-center gap-2 font-syne uppercase tracking-widest border border-transparent"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-flecto-lime" />
                    Engage
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

