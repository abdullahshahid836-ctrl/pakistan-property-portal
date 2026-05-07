'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Search, ChevronRight, Building2, TrendingUp, Home, Loader2, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const cities = [
  {
    city: 'Lahore',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    areas: [
      { name: 'DHA Lahore', avgPrice: '2.5 Cr', pricePerMarla: '28 Lac', trend: '+12%', type: 'Residential' },
      { name: 'Gulberg', avgPrice: '3.8 Cr', pricePerMarla: '42 Lac', trend: '+8%', type: 'Commercial/Residential' },
      { name: 'Bahria Town Lahore', avgPrice: '1.8 Cr', pricePerMarla: '20 Lac', trend: '+15%', type: 'Gated Community' },
      { name: 'Model Town', avgPrice: '4.2 Cr', pricePerMarla: '48 Lac', trend: '+6%', type: 'Residential' },
      { name: 'Johar Town', avgPrice: '1.4 Cr', pricePerMarla: '16 Lac', trend: '+10%', type: 'Residential' },
      { name: 'Garden Town', avgPrice: '3.5 Cr', pricePerMarla: '40 Lac', trend: '+5%', type: 'Residential' },
    ],
    highlights: ['Cultural Capital', 'Best Schools', 'Food Scene', 'Business Hub'],
    description: 'Lahore offers some of Pakistan\'s most diverse real estate options, from historic neighbourhoods to modern gated communities. DHA and Bahria Town are the most sought-after addresses for families, while Gulberg and MM Alam Road dominate the commercial landscape.',
  },
  {
    city: 'Karachi',
    image: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=800',
    areas: [
      { name: 'DHA Karachi', avgPrice: '3.2 Cr', pricePerMarla: '36 Lac', trend: '+9%', type: 'Residential' },
      { name: 'Clifton', avgPrice: '5.5 Cr', pricePerMarla: '60 Lac', trend: '+7%', type: 'Luxury' },
      { name: 'Bahria Town Karachi', avgPrice: '1.2 Cr', pricePerMarla: '14 Lac', trend: '+18%', type: 'Gated Community' },
      { name: 'Gulshan-e-Iqbal', avgPrice: '1.5 Cr', pricePerMarla: '17 Lac', trend: '+11%', type: 'Residential' },
      { name: 'North Nazimabad', avgPrice: '1.1 Cr', pricePerMarla: '12 Lac', trend: '+8%', type: 'Residential' },
      { name: 'Malir Cantonment', avgPrice: '95 Lac', pricePerMarla: '10 Lac', trend: '+14%', type: 'Cantonment' },
    ],
    highlights: ['Business Capital', 'Port City', 'Finance Hub', 'Largest City'],
    description: 'Karachi is Pakistan\'s commercial and economic capital with the country\'s most active real estate market. Clifton and DHA offer premium living while Bahria Town Karachi has seen explosive growth among middle-income buyers.',
  },
  {
    city: 'Islamabad',
    image: 'https://images.unsplash.com/photo-1564507004663-b6a511b4f7c2?w=800',
    areas: [
      { name: 'E-7 Islamabad', avgPrice: '6.5 Cr', pricePerMarla: '72 Lac', trend: '+6%', type: 'Luxury' },
      { name: 'F-6 / F-7', avgPrice: '8.2 Cr', pricePerMarla: '92 Lac', trend: '+5%', type: 'Luxury' },
      { name: 'G-11 / G-13', avgPrice: '3.8 Cr', pricePerMarla: '42 Lac', trend: '+10%', type: 'Residential' },
      { name: 'Bahria Enclave', avgPrice: '2.2 Cr', pricePerMarla: '24 Lac', trend: '+13%', type: 'Gated Community' },
      { name: 'DHA Islamabad', avgPrice: '2.8 Cr', pricePerMarla: '31 Lac', trend: '+11%', type: 'Residential' },
      { name: 'Pwrra / Park Enclave', avgPrice: '4.5 Cr', pricePerMarla: '50 Lac', trend: '+8%', type: 'Govt Scheme' },
    ],
    highlights: ['Capital City', 'Safest City', 'Green & Clean', 'Diplomatic Zone'],
    description: 'Islamabad is Pakistan\'s most planned and green city. CDA sectors like F-6 and E-7 are among the country\'s most exclusive addresses, while Bahria Enclave and DHA offer modern gated living at relatively accessible price points.',
  },
]

export default function AreaGuidesPage() {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<(typeof cities[0]['areas'][0] & { cityName: string }) | null>(null)
  const [propertyCounts, setPropertyCounts] = useState<Record<string, number>>({})
  const [loadingCounts, setLoadingCounts] = useState(true)

  useEffect(() => {
    const fetchCounts = async () => {
      setLoadingCounts(true)
      try {
        const res = await fetch('/api/properties')
        const data = await res.json()
        const props: any[] = data.properties || []
        const counts: Record<string, number> = {}
        props.forEach(p => {
          const c = p.city
          if (c) counts[c] = (counts[c] || 0) + 1
        })
        setPropertyCounts(counts)
      } catch { /* silent */ }
      finally { setLoadingCounts(false) }
    }
    fetchCounts()
  }, [])

  const filtered = cities.filter(c =>
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.areas.some(a => a.name.toLowerCase().includes(search.toLowerCase()))
  )

  const active = selectedCity ? filtered.filter(c => c.city === selectedCity) : filtered

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      {/* Hero */}
      <div className="bg-[#004737] pt-32 pb-24 relative overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="pill-label-light mb-6">INSIGHTS</span>
          <h1 className="text-4xl sm:text-6xl font-black font-syne text-white mb-6 uppercase tracking-tight">Area Guides</h1>
          <p className="text-lg sm:text-xl text-[#A8C4BB] max-w-2xl mx-auto mb-12 font-inter leading-relaxed">
            Uncover Pakistan's top neighborhoods — current prices, growth trends, and detailed local amenities.
          </p>
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8F55A]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search city or area (e.g. DHA Phase 5...)"
              className="w-full h-16 pl-16 pr-14 bg-white/10 border border-white/20 rounded-[2rem] focus:outline-none focus:bg-white focus:text-[#0D1B17] text-white placeholder-white/40 transition-all backdrop-blur-md font-inter"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-6 top-1/2 -translate-y-1/2">
                <X className="w-5 h-5 text-white/60 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      {/* City filter sticky bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#DDD8CF] sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCity(null)}
            className={cn(
              "flex-shrink-0 px-6 py-2.5 text-[11px] font-black font-syne rounded-full border-2 transition-all uppercase tracking-widest", 
              !selectedCity ? "bg-[#004737] text-[#C8F55A] border-[#004737]" : "bg-white text-[#4A5568] border-[#DDD8CF] hover:border-[#004737]"
            )}
          >ALL CITIES</button>
          {cities.map(c => (
            <button
              key={c.city}
              onClick={() => setSelectedCity(c.city === selectedCity ? null : c.city)}
              className={cn(
                "flex-shrink-0 px-6 py-2.5 text-[11px] font-black font-syne rounded-full border-2 transition-all whitespace-nowrap uppercase tracking-widest", 
                selectedCity === c.city ? "bg-[#004737] text-[#C8F55A] border-[#004737]" : "bg-white text-[#4A5568] border-[#DDD8CF] hover:border-[#004737]"
              )}
            >
              {c.city}
              {!loadingCounts && propertyCounts[c.city] ? (
                <span className="ml-1.5 opacity-60">({propertyCounts[c.city]})</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        {/* Area Detail Modal */}
        {selectedArea && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#004737]/60 backdrop-blur-lg" onClick={() => setSelectedArea(null)}>
            <div className="bg-white rounded-[3rem] p-10 sm:p-14 max-w-xl w-full shadow-[0_40px_100px_rgba(0,0,0,0.3)] relative overflow-hidden" onClick={e => e.stopPropagation()}>
               {/* Pattern overlay */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8F55A]/20 rounded-full blur-3xl -mr-16 -mt-16" />

              <div className="flex justify-between items-start mb-10 relative z-10">
                <div>
                  <h2 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">{selectedArea.name}</h2>
                  <p className="text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">{selectedArea.cityName} · {selectedArea.type}</p>
                </div>
                <button onClick={() => setSelectedArea(null)} className="w-12 h-12 rounded-2xl bg-[#F5F0E8] flex items-center justify-center hover:bg-[#004737] group transition-all">
                  <X className="w-5 h-5 text-[#004737] group-hover:text-[#C8F55A]" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-10 relative z-10">
                <div className="bg-[#F5F0E8] rounded-2xl p-5 text-center border border-[#DDD8CF]">
                  <p className="text-[9px] font-black font-syne text-[#7A9088] uppercase mb-2 tracking-widest">Avg Price</p>
                  <p className="text-sm font-black font-syne text-[#0D1B17]">PKR {selectedArea.avgPrice}</p>
                </div>
                <div className="bg-[#F5F0E8] rounded-2xl p-5 text-center border border-[#DDD8CF]">
                  <p className="text-[9px] font-black font-syne text-[#7A9088] uppercase mb-2 tracking-widest">Per Marla</p>
                  <p className="text-sm font-black font-syne text-[#0D1B17]">PKR {selectedArea.pricePerMarla}</p>
                </div>
                <div className="bg-[#C8F55A]/30 rounded-2xl p-5 text-center border border-[#C8F55A]/50">
                  <p className="text-[9px] font-black font-syne text-[#004737] uppercase mb-2 tracking-widest">Growth</p>
                  <p className="text-sm font-black font-syne text-[#006B55]">{selectedArea.trend}</p>
                </div>
              </div>

              <Link
                href={`/search?area=${encodeURIComponent(selectedArea.name)}&city=${encodeURIComponent(selectedArea.cityName)}`}
                className="w-full flex items-center justify-center gap-3 h-16 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-xl uppercase tracking-widest relative z-10"
              >
                <Home className="w-5 h-5" />
                EXPLORE PROPERTIES
              </Link>
            </div>
          </div>
        )}

        {/* City cards */}
        <div className="space-y-16">
          {active.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-[#DDD8CF]">
              <p className="text-[#7A9088] font-black font-syne uppercase tracking-widest">No results found for "{search}"</p>
              <button onClick={() => setSearch('')} className="mt-6 text-[#004737] text-xs font-black font-syne uppercase tracking-widest border-b-2 border-[#C8F55A] pb-1">Clear Search</button>
            </div>
          )}
          {active.map((city, idx) => (
            <div key={idx} className="bg-white rounded-[3rem] border border-[#DDD8CF] overflow-hidden shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_40px_100px_rgba(0,71,55,0.1)] transition-all duration-700 group">
              {/* City Hero Strip */}
              <div className="relative h-64 overflow-hidden">
                <Image src={city.image} alt={city.city} fill sizes="100vw" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#004737]/90 via-[#004737]/70 to-transparent" />
                <div className="absolute inset-0 p-10 sm:p-14 flex items-center justify-between">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#C8F55A] flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#004737]" />
                      </div>
                      <span className="text-[10px] font-black font-syne text-[#A8C4BB] uppercase tracking-[0.3em]">PAKISTAN</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black font-syne text-white mb-6 uppercase tracking-tight">{city.city}</h2>
                    <div className="flex flex-wrap gap-3">
                      {city.highlights.map((h, i) => (
                        <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[9px] font-black font-syne rounded-xl border border-white/10 uppercase tracking-widest">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right hidden lg:block bg-white/10 backdrop-blur-md px-10 py-6 rounded-[2.5rem] border border-white/10">
                    {loadingCounts ? (
                      <Loader2 className="w-8 h-8 text-[#C8F55A] animate-spin" />
                    ) : (
                      <>
                        <p className="text-5xl font-black font-syne text-[#C8F55A] leading-none mb-2">{propertyCounts[city.city] || '—'}</p>
                        <p className="text-[9px] text-[#A8C4BB] font-black font-syne uppercase tracking-widest">ACTIVE ADS</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-10 sm:p-14">
                <p className="text-base sm:text-lg text-[#3D5249] leading-relaxed mb-12 font-inter max-w-4xl">{city.description}</p>

                <div className="flex items-center gap-3 mb-8">
                   <TrendingUp className="w-5 h-5 text-[#004737]" />
                   <h3 className="text-xs font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">Top Areas & Price Guide</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {city.areas.map((area, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => setSelectedArea({ ...area, cityName: city.city })}
                      className="text-left p-6 bg-[#F5F0E8] rounded-[2rem] hover:bg-[#004737] border border-[#DDD8CF] hover:border-[#004737] transition-all duration-300 group/item relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-base font-black font-syne text-[#0D1B17] group-hover/item:text-[#C8F55A] transition-colors">{area.name}</p>
                          <span className="text-[10px] font-black font-syne text-[#006B55] bg-[#C8F55A] px-2 py-1 rounded-lg flex-shrink-0">{area.trend}</span>
                        </div>
                        <p className="text-[10px] font-black font-syne text-[#7A9088] group-hover/item:text-[#A8C4BB] mb-4 uppercase tracking-widest">{area.type}</p>
                        <div className="flex items-baseline gap-1">
                           <span className="text-[9px] font-black font-syne text-[#7A9088] group-hover/item:text-[#A8C4BB] uppercase tracking-tighter">AVG:</span>
                           <p className="text-sm font-black font-syne text-[#0D1B17] group-hover/item:text-white">PKR {area.avgPrice}</p>
                        </div>
                      </div>
                      {/* Arrow icon on hover */}
                      <ChevronRight className="absolute right-4 bottom-4 w-5 h-5 text-[#C8F55A] translate-x-10 group-hover/item:translate-x-0 transition-transform duration-300" />
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/search?city=${encodeURIComponent(city.city)}`}
                    className="flex items-center gap-3 px-8 py-4 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-md uppercase tracking-widest"
                  >
                    <Home className="w-4 h-4" />
                    BROWSE {city.city}
                  </Link>
                  <Link
                    href={`/search?city=${encodeURIComponent(city.city)}&type=Plot`}
                    className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#004737] text-[#004737] text-xs font-black font-syne rounded-2xl hover:bg-[#F5F0E8] transition-all uppercase tracking-widest"
                  >
                    <TrendingUp className="w-4 h-4" />
                    VIEW PLOTS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
