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
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Hero */}
      <div className="bg-[#1A1A2E] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Area Guides</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Explore Pakistan's top neighbourhoods — prices, trends, amenities and market insights.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search city or area (e.g. DHA Phase 5, Bahria Karachi...)"
              className="w-full h-14 pl-12 pr-12 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:bg-white focus:text-[#1A1A2E] text-white placeholder-white/50 transition-all backdrop-blur-md"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-white/60 hover:text-white" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920" alt="bg" fill className="object-cover" />
        </div>
      </div>

      {/* City filter pills */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCity(null)}
            className={cn("flex-shrink-0 px-4 py-2 text-xs font-bold rounded-full transition-all border", !selectedCity ? "bg-[#1E6BFF] text-white border-[#1E6BFF]" : "bg-white text-[#4A5568] border-[#E5E7EB] hover:border-[#1E6BFF]")}
          >All Cities</button>
          {cities.map(c => (
            <button
              key={c.city}
              onClick={() => setSelectedCity(c.city === selectedCity ? null : c.city)}
              className={cn("flex-shrink-0 px-4 py-2 text-xs font-bold rounded-full transition-all border whitespace-nowrap", selectedCity === c.city ? "bg-[#1E6BFF] text-white border-[#1E6BFF]" : "bg-white text-[#4A5568] border-[#E5E7EB] hover:border-[#1E6BFF]")}
            >
              {c.city}
              {!loadingCounts && propertyCounts[c.city] ? (
                <span className="ml-1.5 opacity-70">({propertyCounts[c.city]})</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Area Detail Modal */}
        {selectedArea && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedArea(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-black text-[#1A1A2E]">{selectedArea.name}</h2>
                  <p className="text-sm text-[#9CA3AF]">{selectedArea.cityName} · {selectedArea.type}</p>
                </div>
                <button onClick={() => setSelectedArea(null)} className="w-8 h-8 rounded-full bg-[#F8F9FA] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors">
                  <X className="w-4 h-4 text-[#4A5568]" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#F8F9FA] rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-1">Avg Price</p>
                  <p className="text-sm font-black text-[#1A1A2E]">PKR {selectedArea.avgPrice}</p>
                </div>
                <div className="bg-[#F8F9FA] rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-1">Per Marla</p>
                  <p className="text-sm font-black text-[#1A1A2E]">PKR {selectedArea.pricePerMarla}</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-1">1Y Trend</p>
                  <p className="text-sm font-black text-green-600">{selectedArea.trend}</p>
                </div>
              </div>
              <Link
                href={`/search?area=${encodeURIComponent(selectedArea.name)}&city=${encodeURIComponent(selectedArea.cityName)}`}
                className="w-full flex items-center justify-center gap-2 h-12 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all"
              >
                <Home className="w-4 h-4" />
                View Properties in {selectedArea.name}
              </Link>
            </div>
          </div>
        )}

        {/* City cards */}
        <div className="space-y-10">
          {active.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#9CA3AF] font-medium">No results for "{search}"</p>
              <button onClick={() => setSearch('')} className="mt-4 text-[#1E6BFF] text-sm font-bold">Clear Search</button>
            </div>
          )}
          {active.map((city, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-lg transition-all">
              {/* City Hero Strip */}
              <div className="relative h-48 overflow-hidden">
                <Image src={city.image} alt={city.city} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/90 to-[#1A1A2E]/40" />
                <div className="absolute inset-0 p-8 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-[#1E6BFF]" />
                      <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Pakistan</span>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">{city.city}</h2>
                    <div className="flex flex-wrap gap-2">
                      {city.highlights.map((h, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/20">{h}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    {loadingCounts ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : (
                      <>
                        <p className="text-3xl font-black text-white">{propertyCounts[city.city] || '—'}</p>
                        <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Active Listings</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                <p className="text-sm text-[#4A5568] leading-relaxed mb-8">{city.description}</p>

                <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">Top Areas & Price Guide</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {city.areas.map((area, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => setSelectedArea({ ...area, cityName: city.city })}
                      className="text-left p-4 bg-[#F8F9FA] rounded-2xl hover:bg-[#EBF2FF] hover:border-[#1E6BFF] border border-transparent transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-bold text-[#1A1A2E] group-hover:text-[#1E6BFF] transition-colors">{area.name}</p>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg flex-shrink-0">{area.trend}</span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] mb-1">{area.type}</p>
                      <p className="text-xs font-bold text-[#1A1A2E]">Avg: PKR {area.avgPrice}</p>
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/search?city=${encodeURIComponent(city.city)}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl hover:bg-[#1554CC] transition-all"
                  >
                    <Home className="w-3.5 h-3.5" />
                    Browse All {city.city} Properties
                  </Link>
                  <Link
                    href={`/search?city=${encodeURIComponent(city.city)}&type=Plot`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#F8F9FA] border border-[#E5E7EB] text-[#4A5568] text-xs font-bold rounded-xl hover:border-[#1E6BFF] hover:text-[#1E6BFF] transition-all"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    View Plots
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
