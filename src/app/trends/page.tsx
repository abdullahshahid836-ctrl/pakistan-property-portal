'use client'

import React from 'react'
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { TrendingUp, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const data = [
  { month: 'Jan', lahore: 120, karachi: 110, islamabad: 130 },
  { month: 'Feb', lahore: 125, karachi: 112, islamabad: 132 },
  { month: 'Mar', lahore: 122, karachi: 115, islamabad: 135 },
  { month: 'Apr', lahore: 130, karachi: 120, islamabad: 140 },
  { month: 'May', lahore: 135, karachi: 122, islamabad: 145 },
  { month: 'Jun', lahore: 142, karachi: 125, islamabad: 150 },
]

const TrendsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Property Trends</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">Property Trends in Pakistan</h1>
        </div>
        
        {/* Top Cities */}
        <div className="flex items-center justify-center gap-3 pb-4">
          <span className="text-xs text-[#9CA3AF]">Top Cities:</span>
          {['Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map(city => (
            <Link 
              key={city} 
              href={`/search?city=${city}`}
              className="text-xs text-[#1E6BFF] hover:text-[#1A1A2E] underline-offset-4 hover:underline transition-all"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TrendCard city="Lahore" price="▲ 12.3%" color="#1E6BFF" />
          <TrendCard city="Karachi" price="▲ 8.1%" color="#10B981" />
          <TrendCard city="Islamabad" price="▲ 15.4%" color="#8B5CF6" />
          <TrendCard city="Rawalpindi" price="▼ 2.1%" color="#EF4444" isDown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price Index Chart */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold text-[#1A1A2E] mb-8">Price Index History</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="lahore" stroke="#1E6BFF" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="karachi" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="islamabad" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Volume by Area */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold text-[#1A1A2E] mb-8">Demand by City (Search Volume)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="lahore" fill="#1E6BFF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="karachi" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#F3F4F6] bg-[#F8F9FA] flex items-center justify-between">
            <h3 className="font-bold text-[#1A1A2E]">Area-wise Performance</h3>
            <button className="text-xs font-bold text-[#1E6BFF] hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#F3F4F6] bg-[#F8F9FA]/50">
                <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Area</th>
                <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Avg Price (1 Kanal)</th>
                <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Avg Rent</th>
                <th className="px-6 py-4 text-xs font-bold text-[#9CA3AF] uppercase tracking-widest">Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              <AreaRow area="DHA Phase 6, Lahore" price="7.5 Crore" rent="2.8 Lac" yield="4.5%" />
              <AreaRow area="F-11, Islamabad" price="12.0 Crore" rent="4.5 Lac" yield="4.2%" />
              <AreaRow area="Clifton, Karachi" price="15.0 Crore" rent="5.5 Lac" yield="4.4%" />
              <AreaRow area="Bahria Town, Rawalpindi" price="3.8 Crore" rent="1.4 Lac" yield="4.1%" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const TrendCard = ({ city, price, color, isDown }: { city: string, price: string, color: string, isDown?: boolean }) => (
  <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
        <TrendingUp className="w-5 h-5" style={{ color }} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold",
        isDown ? "text-red-500" : "text-green-500"
      )}>
        {isDown ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
        {price}
      </div>
    </div>
    <h4 className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">{city}</h4>
    <div className="text-2xl font-black text-[#1A1A2E] mt-1">Property Index</div>
  </div>
)

const AreaRow = ({ area, price, rent, yield: y }: { area: string, price: string, rent: string, yield: string }) => (
  <tr>
    <td className="px-6 py-4 text-sm font-bold text-[#1A1A2E]">{area}</td>
    <td className="px-6 py-4 text-sm text-[#4A5568]">{price}</td>
    <td className="px-6 py-4 text-sm text-[#4A5568]">{rent}</td>
    <td className="px-6 py-4 text-sm font-bold text-green-600">{y}</td>
  </tr>
)

export default TrendsPage
