'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Search, ChevronRight, Building2, TrendingUp, Home, Loader2, X } from 'lucide-react'
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
  {
    city: 'Rawalpindi',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    areas: [
      { name: 'Bahria Town Phase 8', avgPrice: '1.4 Cr', pricePerMarla: '16 Lac', trend: '+14%', type: 'Gated Community' },
      { name: 'Askari 14', avgPrice: '1.8 Cr', pricePerMarla: '20 Lac', trend: '+9%', type: 'Cantonment' },
      { name: 'Saddar', avgPrice: '90 Lac', pricePerMarla: '10 Lac', trend: '+7%', type: 'Commercial' },
      { name: 'Chaklala Scheme 3', avgPrice: '1.2 Cr', pricePerMarla: '13 Lac', trend: '+10%', type: 'Residential' },
    ],
    highlights: ['Military Hub', 'Twin Cities', 'Affordable', 'Growth Potential'],
    description: 'Rawalpindi is the sister city to Islamabad and offers significantly more affordable real estate. Bahria Town Phase 8 remains the most popular destination for families seeking gated-community living at lower prices than Islamabad.',
  },
  {
    city: 'Peshawar',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    areas: [
      { name: 'Hayatabad', avgPrice: '1.8 Cr', pricePerMarla: '20 Lac', trend: '+12%', type: 'Residential' },
      { name: 'University Town', avgPrice: '2.2 Cr', pricePerMarla: '24 Lac', trend: '+8%', type: 'Residential' },
      { name: 'Defence Phase 1', avgPrice: '1.5 Cr', pricePerMarla: '17 Lac', trend: '+15%', type: 'Gated Community' },
    ],
    highlights: ['Gateway to KPK', 'Heritage City', 'Growing Market', 'CPEC Benefit'],
    description: 'Peshawar\'s real estate market has grown rapidly, fuelled by CPEC projects and urbanisation. Hayatabad remains the premier residential address in the city.',
  },
  {
    city: 'Multan',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    areas: [
      { name: 'DHA Multan', avgPrice: '1.1 Cr', pricePerMarla: '12 Lac', trend: '+20%', type: 'Gated Community' },
      { name: 'Gulgasht Colony', avgPrice: '85 Lac', pricePerMarla: '9 Lac', trend: '+10%', type: 'Residential' },
      { name: 'Bahria Town Multan', avgPrice: '95 Lac', pricePerMarla: '10 Lac', trend: '+16%', type: 'Gated Community' },
    ],
    highlights: ['City of Saints', 'Mango Capital', 'Fast Growing', 'Affordable'],
    description: 'Multan is one of Pakistan\'s fastest-growing real estate markets. DHA Multan has emerged as a game-changer, attracting investors from across the country with strong appreciation potential.',
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
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      {/* Hero */}
      <div className="bg-flecto-green pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MapPin className="w-4 h-4 text-flecto-lime" />
            <span className="text-[10px] font-bold text-flecto-lime uppercase tracking-[0.2em] font-inter">Territorial Intelligence</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-flecto-cream mb-6 font-syne tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">Area Guides</h1>
          <p className="text-lg sm:text-xl text-flecto-cream/60 max-w-2xl mx-auto mb-12 font-inter font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Decrypt Pakistan's premier neighborhoods — price vectors, yield trends, and infrastructural benchmarks.
          </p>
          <div className="max-w-2xl mx-auto relative group animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-flecto-lime group-focus-within:scale-110 transition-transform duration-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by city or specific sector..."
              className="w-full h-20 pl-16 pr-16 bg-white/5 border border-white/10 rounded-[2.5rem] focus:outline-none focus:bg-white focus:text-flecto-green text-flecto-cream placeholder:text-white/20 transition-all duration-700 backdrop-blur-xl font-syne text-lg shadow-2xl"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <X className="w-4 h-4 text-flecto-cream" />
              </button>
            )}
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-flecto-lime/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-flecto-green-light/20 rounded-full blur-[100px] -ml-48 -mb-48" />
      </div>

      {/* City filter pills */}
      <div className="bg-flecto-cream border-b border-flecto-green/5 sticky top-20 z-30 backdrop-blur-xl bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex gap-3 overflow-x-auto no-scrollbar items-center justify-center">
          <button
            onClick={() => setSelectedCity(null)}
            className={cn(
              "flex-shrink-0 px-8 py-3 text-[10px] font-bold rounded-full transition-all duration-500 border font-sy uppercase tracking-[0.2em]", 
              !selectedCity ? "bg-flecto-green text-flecto-cream border-flecto-green shadow-xl shadow-flecto-green/20" : "bg-white text-flecto-green-light border-flecto-green/5 hover:border-flecto-lime hover:text-flecto-green"
            )}
          >All Regions</button>
          {cities.map(c => (
            <button
              key={c.city}
              onClick={() => setSelectedCity(c.city === selectedCity ? null : c.city)}
              className={cn(
                "flex-shrink-0 px-8 py-3 text-[10px] font-bold rounded-full transition-all duration-500 border whitespace-nowrap font-syne uppercase tracking-[0.2em]", 
                selectedCity === c.city ? "bg-flecto-green text-flecto-cream border-flecto-green shadow-xl shadow-flecto-green/20" : "bg-white text-flecto-green-light border-flecto-green/5 hover:border-flecto-lime hover:text-flecto-green"
              )}
            >
              {c.city}
              {!loadingCounts && propertyCounts[c.city] ? (
                <span className="ml-2 opacity-40 font-inter">[{propertyCounts[c.city]}]</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Area Detail Modal */}
        {selectedArea && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-flecto-green/80 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setSelectedArea(null)}>
            <div className="bg-white rounded-[3rem] p-10 sm:p-14 max-w-xl w-full shadow-2xl border border-white/20 animate-in zoom-in-95 duration-500" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-flecto-green font-syne tracking-tight uppercase leading-none">{selectedArea.name}</h2>
                  <p className="text-xs font-bold text-flecto-green-light uppercase tracking-[0.2em] font-inter">
                    {selectedArea.cityName} <span className="mx-2 opacity-20">|</span> {selectedArea.type}
                  </p>
                </div>
                <button onClick={() => setSelectedArea(null)} className="w-12 h-12 rounded-full bg-flecto-cream flex items-center justify-center hover:bg-flecto-green hover:text-flecto-lime transition-all duration-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="bg-flecto-cream-dark rounded-[2rem] p-6 text-center border border-flecto-green/5">
                  <p className="text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-2 font-inter">Valuation</p>
                  <p className="text-sm font-bold text-flecto-green font-syne uppercase">PKR {selectedArea.avgPrice}</p>
                </div>
                <div className="bg-flecto-cream-dark rounded-[2rem] p-6 text-center border border-flecto-green/5">
                  <p className="text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-2 font-inter">Unit Rate</p>
                  <p className="text-sm font-bold text-flecto-green font-syne uppercase">{selectedArea.pricePerMarla}</p>
                </div>
                <div className="bg-flecto-lime/10 rounded-[2rem] p-6 text-center border border-flecto-lime/20">
                  <p className="text-[9px] font-bold text-flecto-green/40 uppercase tracking-[0.2em] mb-2 font-inter">Yield Trend</p>
                  <p className="text-sm font-bold text-flecto-green font-syne uppercase">{selectedArea.trend}</p>
                </div>
              </div>

              <Link
                href={`/search?area=${encodeURIComponent(selectedArea.name)}&city=${encodeURIComponent(selectedArea.cityName)}`}
                className="w-full flex items-center justify-center gap-3 h-16 bg-flecto-green text-flecto-cream text-xs font-bold rounded-full hover:bg-flecto-green-light hover:scale-[1.02] transition-all duration-500 font-syne uppercase tracking-widest shadow-2xl shadow-flecto-green/20"
              >
                <Home className="w-4 h-4 text-flecto-lime" />
                Analyze Available Inventory
              </Link>
            </div>
          </div>
        )}

        {/* City cards */}
        <div className="space-y-16">
          {active.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-flecto-green/5 shadow-inner">
              <p className="text-flecto-text-muted font-bold font-syne uppercase tracking-widest text-lg mb-6">No geometric matches for "{search}"</p>
              <button onClick={() => setSearch('')} className="px-8 py-3 bg-flecto-green text-flecto-lime rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">Reset Parameters</button>
            </div>
          )}
          {active.map((city, idx) => (
            <div key={idx} className="bg-white rounded-[3rem] border border-flecto-green/5 overflow-hidden shadow-2xl shadow-flecto-green/[0.04] hover:shadow-flecto-green/[0.08] transition-all duration-700">
              {/* City Hero Strip */}
              <div className="relative h-64 overflow-hidden group">
                <Image src={city.image} alt={city.city} fill sizes="100vw" className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-r from-flecto-green to-transparent opacity-90" />
                <div className="absolute inset-0 p-10 sm:p-14 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-flecto-lime flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-flecto-green" />
                      </div>
                      <span className="text-[10px] font-bold text-flecto-lime uppercase tracking-[0.3em] font-inter">Strategic Node</span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-bold text-flecto-cream mb-4 font-syne tracking-tight uppercase leading-none">{city.city}</h2>
                    <div className="flex flex-wrap gap-3">
                      {city.highlights.map((h, i) => (
                        <span key={i} className="px-5 py-2 bg-white/5 backdrop-blur-md text-white text-[9px] font-bold rounded-full border border-white/10 uppercase tracking-widest font-inter">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    {loadingCounts ? (
                      <div className="w-10 h-10 border-2 border-white/10 border-t-flecto-lime rounded-full animate-spin" />
                    ) : (
                      <div className="space-y-1">
                        <p className="text-5xl font-bold text-flecto-lime font-syne leading-none">{propertyCounts[city.city] || '—'}</p>
                        <p className="text-[9px] text-flecto-cream/40 font-bold uppercase tracking-[0.2em] font-inter">Live Nodes</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-10 sm:p-14">
                <p className="text-lg text-flecto-text-muted leading-relaxed mb-12 font-inter font-medium max-w-4xl">{city.description}</p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] flex-grow bg-flecto-green/5" />
                  <h3 className="text-[10px] font-bold text-flecto-green-light uppercase tracking-[0.3em] font-inter whitespace-nowrap">Tactical Price Guide</h3>
                  <div className="h-[1px] flex-grow bg-flecto-green/5" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                  {city.areas.map((area, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => setSelectedArea({ ...area, cityName: city.city })}
                      className="text-left p-8 bg-flecto-cream-dark rounded-[2.5rem] hover:bg-white hover:border-flecto-lime/30 border border-flecto-green/5 transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <p className="text-base font-bold text-flecto-green font-syne uppercase tracking-wider group-hover:text-flecto-green-light transition-colors">{area.name}</p>
                          <span className="text-[9px] font-bold text-flecto-green bg-flecto-lime px-3 py-1 rounded-full uppercase tracking-widest font-inter">{area.trend}</span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.1em] font-inter">Classification</span>
                            <span className="text-[10px] font-bold text-flecto-green-light uppercase font-syne">{area.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.1em] font-inter">Average Value</span>
                            <span className="text-[11px] font-bold text-flecto-green font-syne uppercase tracking-wider">PKR {area.avgPrice}</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-flecto-lime/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-10 border-t border-flecto-green/5">
                  <Link
                    href={`/search?city=${encodeURIComponent(city.city)}`}
                    className="flex items-center gap-3 px-10 py-4 bg-flecto-green text-flecto-cream text-xs font-bold rounded-full hover:bg-flecto-green-light hover:scale-105 transition-all duration-500 font-syne uppercase tracking-widest shadow-xl shadow-flecto-green/10"
                  >
                    <Home className="w-4 h-4 text-flecto-lime" />
                    Explore {city.city} Portfolio
                  </Link>
                  <Link
                    href={`/search?city=${encodeURIComponent(city.city)}&type=Plot`}
                    className="flex items-center gap-3 px-10 py-4 bg-white border border-flecto-green/5 text-flecto-green-light text-xs font-bold rounded-full hover:border-flecto-lime hover:text-flecto-green transition-all duration-500 font-syne uppercase tracking-widest shadow-sm"
                  >
                    <TrendingUp className="w-4 h-4" />
                    View Plot Dynamics
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
