'use client'

import React from 'react'
import Link from 'next/link'
import { MessageSquare, Users, TrendingUp, ChevronRight, Search, Plus, MessageCircle, Key, Building, ArrowRight } from 'lucide-react'
import forumData from '@/data/forum-topics.json'
import { cn } from '@/lib/utils'

const icons = {
  "buying-property": MessageCircle,
  "renting-property": Key,
  "new-projects": Building,
  "general-discussion": MessageSquare
}

const ForumPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      <div className="bg-[#004737] pt-24 pb-16 relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">Community Forum</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Property Talk</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Join the conversation with over 50,000 investors, buyers and real estate experts across Pakistan.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Categories List */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Search Bar */}
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-4 flex flex-col sm:flex-row gap-4 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737]/40" />
                <input 
                  type="text" 
                  placeholder="Search discussions, questions or topics..." 
                  className="w-full h-14 pl-14 pr-6 text-sm bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter"
                />
              </div>
              <button className="h-14 px-8 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 uppercase tracking-widest shadow-lg">
                <Plus className="w-5 h-5" /> Start Topic
              </button>
            </div>

            <div className="space-y-6">
              {forumData.categories.map((cat) => {
                const Icon = icons[cat.slug as keyof typeof icons] || MessageSquare
                return (
                  <div key={cat.id} className="bg-white rounded-[2.5rem] border border-[#DDD8CF] overflow-hidden shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.1)] transition-all duration-500 group">
                    <div className="p-8 border-b border-[#F5F0E8] flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] transition-all duration-500">
                          <Icon className="w-7 h-7 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">{cat.name}</h3>
                          <p className="text-xs font-inter text-[#7A9088] mt-1">{cat.description}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="text-xl font-black font-syne text-[#004737]">{cat.topicCount}</div>
                        <div className="text-[9px] text-[#7A9088] font-black font-syne uppercase tracking-widest">DISCUSSIONS</div>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-[#F5F0E8]">
                      {cat.topics.slice(0, 3).map((topic) => (
                        <Link 
                          key={topic.id}
                          href={`/forum/topic/${topic.id}`}
                          className="flex items-center justify-between p-6 hover:bg-[#F5F0E8]/50 transition-colors group/item"
                        >
                          <div className="flex-1 min-w-0 pr-6">
                            <h4 className="text-sm font-black font-syne text-[#3D5249] group-hover/item:text-[#004737] transition-colors line-clamp-1 uppercase tracking-wide">
                              {topic.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-wider">{topic.author}</span>
                              <span className="w-1 h-1 bg-[#DDD8CF] rounded-full" />
                              <span className="text-[10px] font-inter text-[#7A9088]">{topic.lastActivity}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-8 shrink-0">
                            <div className="text-center hidden sm:block">
                              <div className="text-xs font-black font-syne text-[#0D1B17]">{topic.replies}</div>
                              <div className="text-[9px] text-[#7A9088] font-black font-syne uppercase tracking-tighter">REPLIES</div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#F5F0E8] flex items-center justify-center group-hover/item:bg-[#004737] transition-all">
                               <ChevronRight className="w-4 h-4 text-[#004737] group-hover/item:text-[#C8F55A]" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/forum/${cat.slug}`}
                      className="block p-5 text-center text-[10px] font-black font-syne text-[#004737] bg-[#F5F0E8]/30 hover:bg-[#C8F55A] transition-all uppercase tracking-[0.2em]"
                    >
                      EXPLORE ALL {cat.name} DISCUSSIONS
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-8 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-5 h-5 text-[#004737]" />
                <h3 className="text-xs font-black font-syne text-[#0D1B17] uppercase tracking-[0.2em]">Trending Now</h3>
              </div>
              <div className="space-y-6">
                {forumData.categories[0].topics.slice(0, 5).map((topic, idx) => (
                  <Link key={idx} href="#" className="block group/trend border-b border-[#F5F0E8] pb-4 last:border-0 last:pb-0">
                    <h4 className="text-sm font-black font-syne text-[#3D5249] group-hover/trend:text-[#004737] transition-colors mb-2 line-clamp-2 uppercase tracking-tight">
                      {topic.title}
                    </h4>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase">{topic.replies} REPLIES</span>
                       <ArrowRight className="w-3.5 h-3.5 text-[#004737] opacity-0 group-hover/trend:opacity-100 group-hover/trend:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#004737] rounded-[2.5rem] p-10 text-white text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#C8F55A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Users className="w-8 h-8 text-[#004737]" />
                </div>
                <h4 className="text-2xl font-black font-syne mb-3 uppercase tracking-tight">Expert Network</h4>
                <p className="text-sm font-inter text-[#A8C4BB] mb-8 leading-relaxed">Connect with Pakistan's top real estate analysts and institutional investors.</p>
                <Link 
                  href="/register"
                  className="block w-full py-5 bg-[#C8F55A] text-[#004737] text-xs font-black font-syne rounded-2xl hover:bg-white transition-all uppercase tracking-widest"
                >
                  Join The Inner Circle
                </Link>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C8F55A]/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumPage
