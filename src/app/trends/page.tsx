'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from 'recharts'
import { TrendingUp, ArrowUpRight, ArrowDownRight, ChevronRight, Clock, Loader2, RefreshCw, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TrendsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchTrends = async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/trends')
      const json = await res.json()
      setData(json)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchTrends()
    const interval = setInterval(fetchTrends, 300000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#004737] animate-spin mx-auto mb-4" />
          <p className="text-[10px] font-black font-syne text-[#004737] uppercase tracking-[0.2em]">Analyzing Market Trends...</p>
        </div>
      </div>
    )
  }

  const chartData = data?.stats?.[0]?.history.map((h: any, idx: number) => {
    const point: any = { month: h.month }
    data.stats.forEach((s: any) => {
      point[s.city.toLowerCase()] = s.history[idx].value
    })
    return point
  })

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      {/* Header */}
      <div className="bg-[#004737] pt-24 pb-16 relative overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em]">
              <Link href="/" className="hover:underline underline-offset-4">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="opacity-60">Property Trends</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 text-[#C8F55A] text-[9px] font-black font-syne rounded-full border border-white/5 shadow-lg">
                <span className="w-2 h-2 bg-[#C8F55A] rounded-full animate-pulse shadow-[0_0_8px_#C8F55A]" />
                LIVE MARKET
              </div>
              <button 
                onClick={fetchTrends}
                disabled={refreshing}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
              >
                <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Market Intelligence</h1>
              <p className="text-sm font-inter text-[#A8C4BB] flex items-center gap-2">
                <Clock className="w-4 h-4" /> 
                LAST UPDATED: {new Date(data.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black font-syne text-[#A8C4BB] uppercase tracking-[0.2em]">HUBS:</span>
              <div className="flex gap-2">
                {['Karachi', 'Lahore', 'Islamabad'].map(city => (
                  <Link 
                    key={city} 
                    href={`/search?city=${city}`}
                    className="text-[10px] font-black font-syne text-[#C8F55A] bg-white/5 hover:bg-[#C8F55A] hover:text-[#004737] px-4 py-2 rounded-xl transition-all border border-white/10 uppercase tracking-widest"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        
        {/* Market Status Card */}
        <div className="mb-12 bg-[#004737] rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative group shadow-2xl">
          <div className="relative z-10 flex items-center gap-8">
            <div className="w-16 h-16 bg-[#C8F55A] rounded-2xl flex items-center justify-center shrink-0 shadow-xl">
              <TrendingUp className="w-8 h-8 text-[#004737]" />
            </div>
            <div>
              <h2 className="text-2xl font-black font-syne mb-2 uppercase tracking-tight">Market Sentiment: <span className="text-[#C8F55A]">Bullish</span></h2>
              <p className="text-sm font-inter text-[#A8C4BB] max-w-xl leading-relaxed opacity-80">
                The property index is up 1.4% this week. Search volume for residential plots in DHA and Bahria Town has increased by 12% in the last 24 hours.
              </p>
            </div>
          </div>
          <Link href="/new-projects" className="relative z-10 px-10 py-5 bg-white text-[#004737] text-xs font-black font-syne rounded-2xl hover:bg-[#C8F55A] transition-all uppercase tracking-widest shadow-lg">
            View Opportunities
          </Link>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C8F55A]/5 rounded-full blur-3xl group-hover:bg-[#C8F55A]/10 transition-all duration-700" />
        </div>

        {/* Index Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 stagger-children">
          {data.stats.slice(0, 4).map((s: any) => (
            <div key={s.city} className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] transition-all duration-500 group relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-500">
                  <TrendingUp className={cn("w-6 h-6 transition-colors", s.isDown ? "text-red-500 group-hover:text-red-400" : "text-[#004737] group-hover:text-[#C8F55A]")} />
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 text-[10px] font-black font-syne px-3 py-1.5 rounded-xl border",
                  s.isDown ? "bg-red-50 text-red-600 border-red-100" : "bg-[#C8F55A]/20 text-[#006B55] border-[#C8F55A]/30"
                )}>
                  {s.isDown ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                  {s.trend}
                </div>
              </div>
              <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-2">{s.city}</p>
              <h4 className="text-base font-black font-syne text-[#0D1B17] mb-2 uppercase tracking-tight">Market Index</h4>
              <div className="text-2xl font-black font-syne text-[#004737]">
                PKR {s.currentAvg > 10000000 ? (s.currentAvg / 10000000).toFixed(2) + ' Cr' : (s.currentAvg / 100000).toFixed(1) + ' Lac'}
              </div>
              {/* Sparkline line */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#F5F0E8]">
                <div 
                  className={cn("h-full transition-all duration-1000", s.isDown ? "bg-red-500" : "bg-[#C8F55A]")} 
                  style={{ width: s.isDown ? '30%' : '80%' }} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-[#DDD8CF] p-8 sm:p-12 shadow-[0_4px_12px_rgba(0,71,55,0.04)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
              <div>
                <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight mb-2">Value Appreciation</h3>
                <p className="text-xs font-inter text-[#7A9088] font-medium tracking-wide">Average price growth across major hubs (Last 6 Months)</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#004737]" />
                  <span className="text-[10px] font-black font-syne text-[#3D5249] uppercase tracking-widest">Lahore</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#C8F55A] border border-[#004737]/10" />
                  <span className="text-[10px] font-black font-syne text-[#3D5249] uppercase tracking-widest">Karachi</span>
                </div>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorLhr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#004737" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#004737" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F0E8" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#7A9088', fontWeight: 700}} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#7A9088', fontWeight: 700}}
                    tickFormatter={(val) => val > 10000000 ? (val/10000000).toFixed(1) + 'C' : (val/100000).toFixed(0) + 'L'}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 60px rgba(0,71,55,0.15)', fontSize: '12px', padding: '16px' }}
                    itemStyle={{ fontWeight: 900, fontFamily: 'Syne', textTransform: 'uppercase' }}
                    formatter={(val: any) => [Number(val).toLocaleString(), 'PKR']}
                  />
                  <Area type="monotone" dataKey="lahore" stroke="#004737" strokeWidth={4} fillOpacity={1} fill="url(#colorLhr)" />
                  <Area type="monotone" dataKey="karachi" stroke="#C8F55A" strokeWidth={4} fillOpacity={0} />
                  <Area type="monotone" dataKey="islamabad" stroke="#7A9088" strokeWidth={2} fillOpacity={0} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sidebar Insights */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-5 h-5 text-[#004737]" />
                <h3 className="text-xs font-black font-syne text-[#0D1B17] uppercase tracking-[0.2em]">Weekly Gainers</h3>
              </div>
              <div className="space-y-4">
                {[
                  { area: 'DHA Phase 9, Lahore', gain: '+4.2%', isUp: true },
                  { area: 'Bahria Town, Karachi', gain: '+3.8%', isUp: true },
                  { area: 'Gulberg Residencia, ISB', gain: '+3.1%', isUp: true },
                  { area: 'Emaar Canyon Views', gain: '+2.9%', isUp: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-[#F5F0E8] rounded-2xl border border-[#DDD8CF]/50">
                    <span className="text-[11px] font-black font-syne text-[#3D5249] uppercase tracking-wide">{item.area}</span>
                    <span className="text-[11px] font-black font-syne text-[#006B55] bg-[#C8F55A] px-2 py-1 rounded-lg">{item.gain}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                 <Info className="w-5 h-5 text-[#004737]" />
                 <h3 className="text-xs font-black font-syne text-[#0D1B17] uppercase tracking-[0.2em]">Expert Outlook</h3>
              </div>
              <div className="p-6 bg-[#004737] rounded-3xl relative overflow-hidden">
                <p className="text-[13px] font-inter text-[#A8C4BB] leading-relaxed italic relative z-10">
                  "Interest rate cuts expected in the next quarter are likely to drive increased liquidity into the residential sector. Investors are currently favoring plot files for high ROI."
                </p>
                <p className="text-[10px] font-black font-syne text-[#C8F55A] mt-5 uppercase tracking-widest relative z-10">— Portal Research</p>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
