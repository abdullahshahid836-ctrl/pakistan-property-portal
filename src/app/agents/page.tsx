import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle, Star, MapPin, ChevronRight, Search, Users } from 'lucide-react'
import agentsData from '@/data/agents.json'
import { Agent } from '@/types'

const AgentsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Agents</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">Find Real Estate Agents</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Search & Filter */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 mb-10 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Search by agent name or agency..." 
              className="w-full h-12 pl-12 pr-4 text-sm bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#1E6BFF]"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="h-12 px-4 text-sm bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#1E6BFF] cursor-pointer flex-1">
              <option>All Cities</option>
              <option>Lahore</option>
              <option>Karachi</option>
              <option>Islamabad</option>
            </select>
            <button className="h-12 px-8 bg-[#1E6BFF] text-white text-sm font-bold rounded-2xl hover:bg-[#1554CC] transition-all">
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(agentsData as Agent[]).map((agent) => (
            <div 
              key={agent.id}
              className="bg-white rounded-3xl border border-[#E5E7EB] p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#EBF2FF] mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Image src={agent.photo} alt={agent.name} fill sizes="96px" className="object-cover" />
              </div>
              
              <h3 className="font-bold text-[#1A1A2E] group-hover:text-[#1E6BFF] transition-colors">{agent.name}</h3>
              <p className="text-xs text-[#9CA3AF] mb-3">{agent.agency}</p>
              
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#4A5568] mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#1E6BFF]" />
                {agent.city}
              </div>

              <div className="flex items-center justify-center gap-4 mb-6 py-3 bg-[#F8F9FA] rounded-2xl">
                <div className="text-center">
                  <div className="text-xs font-bold text-[#1A1A2E]">{agent.experience}</div>
                  <div className="text-[10px] text-[#9CA3AF] uppercase font-bold">Exp</div>
                </div>
                <div className="w-px h-6 bg-[#E5E7EB]" />
                <div className="text-center">
                  <div className="text-xs font-bold text-[#1A1A2E]">{agent.totalListings}</div>
                  <div className="text-[10px] text-[#9CA3AF] uppercase font-bold">Ads</div>
                </div>
                <div className="w-px h-6 bg-[#E5E7EB]" />
                <div className="text-center">
                  <div className="text-xs font-bold text-[#1A1A2E]">{agent.rating}</div>
                  <div className="text-[10px] text-[#9CA3AF] uppercase font-bold">Rating</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link 
                  href={`/agents/${agent.id}`}
                  className="py-2.5 bg-[#F8F9FA] text-[#1A1A2E] text-[11px] font-bold rounded-xl hover:bg-[#EBF2FF] hover:text-[#1E6BFF] transition-all border border-[#E5E7EB]"
                >
                  View Profile
                </Link>
                <button className="py-2.5 bg-[#1E6BFF] text-white text-[11px] font-bold rounded-xl hover:bg-[#1554CC] transition-all shadow-sm">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AgentsPage
