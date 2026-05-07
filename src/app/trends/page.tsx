'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, MapPin, ChevronRight, ArrowUpRight, BarChart3, PieChart, Activity, Sparkles, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { cn } from '@/lib/utils'
import Reveal from '@/components/shared/Reveal'

const data = [
  { month: 'Jan', price: 4500000 },
  { month: 'Feb', price: 4800000 },
  { month: 'Mar', price: 4700000 },
  { month: 'Apr', price: 5200000 },
  { month: 'May', price: 5900000 },
  { month: 'Jun', price: 6300000 },
]

export default function TrendsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
        <Loader2 className="w-12 h-12 text-[#004737] animate-spin" />
        <span className="font-syne font-black text-[#004737] tracking-[0.4em] text-[10px] uppercase">Synthesizing Market Intelligence...</span>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-24">
      {/* Cinematic Header */}
      <div className="bg-[#004737] pt-32 pb-24 relative overflow-hidden">
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
              <span className="opacity-60">Strategic Analytics</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-syne text-white mb-6 uppercase tracking-tight leading-[0.9]">
               Market <br />
               <span className="text-[#C8F55A] italic">Intelligence.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#A8C4BB] font-inter max-w-xl mx-auto font-medium opacity-80 leading-relaxed">
              Synthesizing real-time pricing data and sector growth metrics to empower your investment strategy.
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
        
        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Historical Index Graph */}
          <Reveal direction="up" className="lg:col-span-2">
            <div className="bg-white rounded-[3.5rem] border border-[#DDD8CF] p-10 sm:p-14 shadow-[0_40px_100px_rgba(0,71,55,0.08)] relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5F0E8] rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#004737] flex items-center justify-center shadow-xl">
                    <Activity className="w-7 h-7 text-[#C8F55A]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight leading-none mb-1">Price Evolution</h3>
                    <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] opacity-60">LAHORE METRO INDEX</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   {['1M', '6M', '1Y', 'ALL'].map(t => (
                     <button key={t} className={cn("px-4 py-2 text-[9px] font-black font-syne rounded-xl transition-all", t === '6M' ? "bg-[#004737] text-[#C8F55A]" : "bg-[#F5F0E8] text-[#7A9088] hover:bg-[#DDD8CF]")}>{t}</button>
                   ))}
                </div>
              </div>

              <div className="h-[400px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C8F55A" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#C8F55A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F0E8" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#7A9088', fontSize: 10, fontWeight: 900, fontFamily: 'var(--font-syne)'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#7A9088', fontSize: 10, fontWeight: 900, fontFamily: 'var(--font-syne)'}} tickFormatter={(v) => `${v/1000000}M`} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,71,55,0.1)', fontFamily: 'var(--font-syne)', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase'}} />
                    <Area type="monotone" dataKey="price" stroke="#004737" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          {/* Market Sentiment Sidebar */}
          <div className="space-y-10">
            <Reveal direction="left" delay={0.4}>
              <div className="bg-[#004737] rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                       <Sparkles className="w-6 h-6 text-[#C8F55A]" />
                       <span className="text-[10px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em]">AI SENTIMENT</span>
                    </div>
                    <h4 className="text-3xl font-black font-syne mb-6 uppercase tracking-tight leading-none">BULLISH <br />PHASE.</h4>
                    <p className="text-sm text-[#A8C4BB] mb-10 leading-relaxed font-inter font-medium opacity-80">Market indicators suggest a 12% appreciation in the upcoming quarter for high-density residential sectors.</p>
                    <div className="flex items-center gap-4 py-4 px-6 bg-white/5 rounded-2xl border border-white/10">
                       <TrendingUp className="w-5 h-5 text-[#C8F55A]" />
                       <span className="text-[11px] font-black font-syne uppercase tracking-widest text-white">+14.2% YOY GROWTH</span>
                    </div>
                 </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.6}>
              <div className="bg-white rounded-[3rem] border border-[#DDD8CF] p-10 shadow-[0_40px_100px_rgba(0,71,55,0.06)]">
                 <h4 className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] mb-10">Top Performing Sectors</h4>
                 <div className="space-y-6">
                    {[
                      { area: 'DHA PHASE 6', growth: '+18.4%', color: 'text-green-600' },
                      { area: 'BAHRIA TOWN', growth: '+12.1%', color: 'text-green-600' },
                      { area: 'GULBERG', growth: '+9.8%', color: 'text-green-600' },
                      { area: 'E-11 ISLAMABAD', growth: '+15.2%', color: 'text-green-600' },
                    ].map((item, i) => (
                      <motion.div key={i} whileHover={{ x: 5 }} className="flex items-center justify-between p-4 bg-[#F5F0E8]/50 rounded-2xl border border-[#DDD8CF]/30">
                        <span className="text-[10px] font-black font-syne text-[#0D1B17] uppercase tracking-widest">{item.area}</span>
                        <span className={cn("text-[10px] font-black font-syne uppercase tracking-widest", item.color)}>{item.growth}</span>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Tactical Intel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <StatCard icon={<BarChart3 />} label="MARKET LIQUIDITY" value="HIGH" color="text-blue-600" delay={0.1} />
          <StatCard icon={<PieChart />} label="INVESTOR INTEREST" value="94%" color="text-purple-600" delay={0.2} />
          <StatCard icon={<TrendingUp />} label="AVG PRICE / SQFT" value="12,450" color="text-[#004737]" delay={0.3} />
          <StatCard icon={<Activity />} label="VERIFIED LISTINGS" value="50k+" color="text-[#004737]" delay={0.4} />
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, label, value, color, delay }: any) => (
  <Reveal direction="up" delay={delay}>
    <motion.div whileHover={{ y: -8 }} className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-sm hover:shadow-xl transition-all duration-500 text-center">
       <div className="w-12 h-12 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#004737]">
          {React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })}
       </div>
       <div className={cn("text-2xl font-black font-syne uppercase tracking-tighter mb-1", color)}>{value}</div>
       <div className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] opacity-60">{label}</div>
    </motion.div>
  </Reveal>
)
