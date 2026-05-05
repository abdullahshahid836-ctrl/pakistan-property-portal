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
    // Auto-refresh every 5 minutes to simulate "live" updates
    const interval = setInterval(fetchTrends, 300000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#1E6BFF] animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Fetching Live Market Data...</p>
        </div>
      </div>
    )
  }

  // Prepare chart data from API stats
  const chartData = data?.stats?.[0]?.history.map((h: any, idx: number) => {
    const point: any = { month: h.month }
    data.stats.forEach((s: any) => {
      point[s.city.toLowerCase()] = s.history[idx].value
    })
    return point
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
              <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#1A1A2E]">Property Trends</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-full border border-red-100">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                LIVE MARKET
              </div>
              <button 
                onClick={fetchTrends}
                disabled={refreshing}
                className="p-2 hover:bg-[#F8F9FA] rounded-xl transition-colors disabled:opacity-50"
                title="Refresh Market Data"
              >
                <RefreshCw className={cn("w-4 h-4 text-[#9CA3AF]", refreshing && "animate-spin")} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A2E]">Property Trends in Pakistan</h1>
              <p className="text-sm text-[#9CA3AF] mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 
                Last Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#9CA3AF] font-bold uppercase tracking-widest">Top Cities:</span>
              <div className="flex gap-2">
                {['Karachi', 'Lahore', 'Islamabad'].map(city => (
                  <Link 
                    key={city} 
                    href={`/search?city=${city}`}
                    className="text-xs font-bold text-[#1E6BFF] hover:bg-[#EBF2FF] px-3 py-1.5 rounded-lg transition-all"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Market Status Info */}
        <div className="mb-8 bg-[#1A1A2E] rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-14 h-14 bg-[#1E6BFF] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">Market Sentiment: <span className="text-green-400">Bullish</span></h2>
              <p className="text-xs text-white/50 max-w-xl">
                The property index is up 1.4% this week. Search volume for residential plots in DHA and Bahria Town has increased by 12% in the last 24 hours.
              </p>
            </div>
          </div>
          <Link href="/new-projects" className="relative z-10 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl text-xs font-bold transition-all">
            View Investment Opportunities
          </Link>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1E6BFF]/10 rounded-full blur-3xl group-hover:bg-[#1E6BFF]/20 transition-all duration-700" />
        </div>

        {/* Live Index Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {data.stats.slice(0, 4).map((s: any) => (
            <div key={s.city} className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center group-hover:bg-[#EBF2FF] transition-colors">
                  <TrendingUp className={cn("w-5 h-5", s.isDown ? "text-red-500" : "text-[#1E6BFF]")} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg",
                  s.isDown ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                )}>
                  {s.isDown ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                  {s.trend}
                </div>
              </div>
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">{s.city}</p>
              <h4 className="text-sm font-black text-[#1A1A2E] mb-1">Market Index</h4>
              <div className="text-xl font-black text-[#1E6BFF]">
                PKR {s.currentAvg > 10000000 ? (s.currentAvg / 10000000).toFixed(2) + ' Cr' : (s.currentAvg / 100000).toFixed(1) + ' Lac'}
              </div>
              {/* Sparkline simulation */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#F3F4F6]">
                <div 
                  className={cn("h-full transition-all duration-1000", s.isDown ? "bg-red-500" : "bg-green-500")} 
                  style={{ width: s.isDown ? '30%' : '70%' }} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price Index Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-base font-bold text-[#1A1A2E]">Property Value Growth</h3>
                <p className="text-xs text-[#9CA3AF]">Average price appreciation across major cities (Last 6 Months)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1E6BFF]" />
                  <span className="text-[10px] font-bold text-[#4A5568]">Lahore</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-[10px] font-bold text-[#4A5568]">Karachi</span>
                </div>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorLhr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E6BFF" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1E6BFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF'}} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#9CA3AF'}}
                    tickFormatter={(val) => val > 10000000 ? (val/10000000).toFixed(1) + 'C' : (val/100000).toFixed(0) + 'L'}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    formatter={(val: number) => [val.toLocaleString(), 'PKR']}
                  />
                  <Area type="monotone" dataKey="lahore" stroke="#1E6BFF" strokeWidth={3} fillOpacity={1} fill="url(#colorLhr)" />
                  <Area type="monotone" dataKey="karachi" stroke="#10B981" strokeWidth={2} fillOpacity={0} />
                  <Area type="monotone" dataKey="islamabad" stroke="#8B5CF6" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Gainers Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1E6BFF]" /> Monthly Top Gainers
              </h3>
              <div className="space-y-4">
                {[
                  { area: 'DHA Phase 9, Lahore', gain: '+4.2%', color: 'text-green-500' },
                  { area: 'Bahria Town, Karachi', gain: '+3.8%', color: 'text-green-500' },
                  { area: 'Gulberg Residencia, ISB', gain: '+3.1%', color: 'text-green-500' },
                  { area: 'Emaar Canyon Views', gain: '+2.9%', color: 'text-green-500' },
                  { area: 'Eighteen, Islamabad', gain: '+2.5%', color: 'text-green-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#F8F9FA] rounded-2xl">
                    <span className="text-xs font-medium text-[#4A5568]">{item.area}</span>
                    <span className={cn("text-xs font-black", item.color)}>{item.gain}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-4">Market Outlook</h3>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[11px] text-[#1E6BFF] leading-relaxed italic">
                  "Interest rate cuts expected in the next quarter are likely to drive increased liquidity into the residential sector. Investors are currently favoring plot files in developing societies for high ROI."
                </p>
                <p className="text-[10px] font-bold text-[#1A1A2E] mt-3">— Portal Research Team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 flex items-start gap-6">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
              <Info className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#1A1A2E] mb-2">Buy Low, Sell High</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Use the Trends tool to identify areas that are currently undervalued or showing signs of recovery before they hit peak prices.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 flex items-start gap-6">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-bold text-[#1A1A2E] mb-2">Portfolio Diversification</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Track different cities to balance your real estate portfolio against localized market risks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
