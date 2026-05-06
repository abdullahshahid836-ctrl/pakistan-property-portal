'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { ChevronRight, MessageSquare, Search, Plus, Filter, MessageCircle, Key, Building, TrendingUp, Users } from 'lucide-react'
import forumData from '@/data/forum-topics.json'
import { cn } from '@/lib/utils'

const icons = {
  "buying-property": MessageCircle,
  "renting-property": Key,
  "new-projects": Building,
  "general-discussion": MessageSquare
}

export default function ForumCategoryPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise)
  const category = forumData.categories.find(c => c.slug === params.slug)

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-4">Category Not Found</h1>
          <Link href="/forum" className="text-[#1E6BFF] font-bold">Back to Forum</Link>
        </div>
      </div>
    )
  }

  const Icon = icons[category.slug as keyof typeof icons] || MessageSquare

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/forum" className="hover:text-[#1E6BFF]">Forum</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">{category.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2FF] flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#1E6BFF]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">{category.name} Discussions</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex flex-col sm:flex-row gap-3 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input 
                  type="text" 
                  placeholder={`Search in ${category.name}...`}
                  className="w-full h-11 pl-12 pr-4 text-sm bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]"
                />
              </div>
              <div className="flex gap-2">
                <button className="h-11 px-4 bg-white border border-[#E5E7EB] text-[#4A5568] rounded-xl flex items-center gap-2 hover:bg-[#F8F9FA] transition-all">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="h-11 px-6 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all flex items-center gap-2 whitespace-nowrap">
                  <Plus className="w-4 h-4" /> Start Topic
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-sm">
              <div className="bg-[#F8F9FA] px-6 py-3 border-b border-[#E5E7EB] hidden sm:flex items-center">
                <div className="flex-1 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Topic</div>
                <div className="w-24 text-center text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Replies</div>
                <div className="w-32 text-right text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Last Activity</div>
              </div>
              
              <div className="divide-y divide-[#F3F4F6]">
                {category.topics.map((topic) => (
                  <Link 
                    key={topic.id}
                    href={`/forum/topic/${topic.id}`}
                    className="flex items-center p-6 hover:bg-[#F8F9FA] transition-colors group"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="text-sm font-bold text-[#1A1A2E] group-hover:text-[#1E6BFF] transition-colors mb-1">
                        {topic.title}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-[#1E6BFF] uppercase bg-[#EBF2FF] px-2 py-0.5 rounded">
                          {topic.author}
                        </span>
                        {topic.isHot && (
                          <span className="text-[10px] font-bold text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                            Hot
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-24 text-center hidden sm:block">
                      <div className="text-sm font-bold text-[#4A5568]">{topic.replies}</div>
                    </div>
                    
                    <div className="w-32 text-right hidden sm:block">
                      <div className="text-xs text-[#9CA3AF]">{topic.lastActivity || '2h ago'}</div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-[#E5E7EB] group-hover:text-[#1E6BFF] ml-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1E6BFF]" /> Related Categories
              </h3>
              <div className="space-y-3">
                {forumData.categories.filter(c => c.id !== category.id).map((c) => (
                  <Link 
                    key={c.id} 
                    href={`/forum/${c.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#F3F4F6] hover:border-[#1E6BFF]/30 hover:bg-[#F8F9FA] transition-all group"
                  >
                    <span className="text-xs font-bold text-[#4A5568] group-hover:text-[#1E6BFF]">{c.name}</span>
                    <span className="text-[10px] font-bold text-[#9CA3AF]">{c.topicCount}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A2E] rounded-3xl p-8 text-white text-center relative overflow-hidden">
              <div className="relative z-10">
                <Users className="w-10 h-10 text-[#1E6BFF] mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">Need Help?</h4>
                <p className="text-xs text-white/50 mb-6 leading-relaxed">Our moderators and experts are here to help you with your property journey.</p>
                <Link 
                  href="/register"
                  className="block w-full py-3 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl hover:bg-[#1554CC] transition-all"
                >
                  Join Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
