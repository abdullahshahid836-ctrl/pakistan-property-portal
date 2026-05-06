'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Building2, ChevronDown, Settings, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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
      } catch (err) {
        console.error('Failed to fetch suggestions:', err)
      } finally {
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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-flecto-cream pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <RevealWrapper animation="fade-in-left" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-flecto-green/5 border border-flecto-green/10 rounded-full">
                <div className="w-2 h-2 bg-flecto-lime rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-flecto-green uppercase tracking-widest font-inter">
                  Pakistan's Premier Property Portal
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-flecto-green leading-[1.1] font-syne mb-8 tracking-tight">
                Find your <br />
                <span className="text-flecto-green-light italic">dream home</span> <br />
                in Pakistan.
              </h1>

              <p className="text-lg text-flecto-text-2 mb-10 max-w-lg font-inter leading-relaxed">
                Explore thousands of verified listings across Lahore, Karachi, Islamabad & more with our AI-powered property matching.
              </p>

              {/* SEARCH BOX */}
              <div className="flecto-card p-2 sm:p-3 max-w-2xl bg-white/50 backdrop-blur-sm">
                <div className="flex gap-2 mb-3 px-2">
                  {['BUY', 'RENT', 'PROJECTS'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={cn(
                        "px-4 py-2 text-[10px] font-bold tracking-widest rounded-full transition-all duration-300 font-syne",
                        activeTab === tab 
                          ? "bg-flecto-green text-flecto-cream" 
                          : "text-flecto-green hover:bg-flecto-green/5"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSearchSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1 group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        {loadingSuggestions ? (
                          <Loader2 className="w-4 h-4 text-flecto-green animate-spin" />
                        ) : (
                          <MapPin className="w-4 h-4 text-flecto-text-muted group-focus-within:text-flecto-green transition-colors" />
                        )}
                      </div>
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="City, area or society..."
                        className="w-full h-14 pl-11 pr-4 text-sm text-flecto-text bg-flecto-cream/50 border border-flecto-green/5 rounded-2xl focus:outline-none focus:border-flecto-green focus:bg-white transition-all font-inter"
                      />
                      
                      {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-flecto-green/5 shadow-2xl z-50 overflow-hidden">
                          {suggestions.map((s, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSearchQuery(s.label)
                                setSuggestions([])
                              }}
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-flecto-text-2 hover:bg-flecto-cream transition-colors border-b last:border-0 border-flecto-green/5"
                            >
                              <MapPin className="w-3.5 h-3.5 text-flecto-green" />
                              <div className="text-left">
                                <span className="font-semibold block">{s.label}</span>
                                <span className="text-[9px] font-bold text-flecto-text-muted uppercase">{s.type}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn-primary h-14 sm:w-auto w-full group">
                      <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Search
                    </button>
                  </div>
                </form>
              </div>

              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-flecto-cream bg-flecto-green/10 overflow-hidden">
                      <Image src={`/agent-${i}.jpg`} alt="Agent" width={40} height={40} className="object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-flecto-cream bg-flecto-lime flex items-center justify-center text-[10px] font-bold text-flecto-green">
                    +2k
                  </div>
                </div>
                <div className="text-xs text-flecto-text-2 font-inter">
                  <span className="font-bold text-flecto-green">2,500+</span> agents ready to help you
                </div>
              </div>
            </RevealWrapper>
          </div>

          {/* RIGHT VISUAL - Video/Image Split */}
          <div className="relative">
            <RevealWrapper animation="scale-in" delay={0.4}>
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl group">
                <Image 
                  src="/hero-bg.png"
                  alt="Premium Pakistan Real Estate"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-flecto-green/80 via-transparent to-transparent opacity-60" />
                
                {/* Floating UI Elements for premium feel */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glass-card p-6 border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-flecto-green font-bold font-syne">DHA Phase 6, Lahore</h4>
                        <p className="text-flecto-text-muted text-xs font-inter">Modern Luxury Villa</p>
                      </div>
                      <div className="text-flecto-green font-black text-lg font-syne">
                        PKR 8.5 Cr
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-flecto-green/60 uppercase tracking-widest">
                      <span>4 Beds</span>
                      <span>5 Baths</span>
                      <span>1 Kanal</span>
                    </div>
                  </div>
                </div>

                {/* Video Play Button Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                    <div className="w-16 h-16 bg-flecto-lime rounded-full flex items-center justify-center shadow-xl">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-flecto-green border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-flecto-lime rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-flecto-green rounded-full blur-3xl opacity-10" />
            </RevealWrapper>
          </div>

        </div>
      </div>
    </section>
  )
}

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div>
    <div className="text-3xl font-bold text-flecto-green font-syne">{value}</div>
    <div className="text-[10px] text-flecto-text-muted uppercase tracking-[0.2em] mt-1 font-bold font-inter">{label}</div>
  </div>
)

export default HeroSearch

