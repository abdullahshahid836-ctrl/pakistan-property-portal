import React from 'react'
import Link from 'next/link'
import { MessageSquare, Users, TrendingUp, ChevronRight, Search, Plus, MessageCircle, Key, Building } from 'lucide-react'
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
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Forum</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">Community Forum</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Categories List */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search Bar */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex gap-3 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input 
                  type="text" 
                  placeholder="Search discussions, questions or topics..." 
                  className="w-full h-11 pl-12 pr-4 text-sm bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#1E6BFF]"
                />
              </div>
              <button className="h-11 px-6 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" /> Start Topic
              </button>
            </div>

            <div className="space-y-4">
              {forumData.categories.map((cat) => {
                const Icon = icons[cat.slug as keyof typeof icons] || MessageSquare
                return (
                  <div key={cat.id} className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="p-6 border-b border-[#F3F4F6] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#1E6BFF]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#1A1A2E]">{cat.name}</h3>
                          <p className="text-xs text-[#9CA3AF]">{cat.description}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-[#1A1A2E]">{cat.topicCount}</div>
                        <div className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest">Discussions</div>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-[#F3F4F6]">
                      {cat.topics.slice(0, 3).map((topic) => (
                        <Link 
                          key={topic.id}
                          href={`/forum/topic/${topic.id}`}
                          className="flex items-center justify-between p-4 hover:bg-[#F8F9FA] transition-colors group"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-sm font-semibold text-[#4A5568] group-hover:text-[#1E6BFF] transition-colors line-clamp-1">
                              {topic.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">{topic.author}</span>
                              <span className="text-[10px] text-[#E5E7EB]">•</span>
                              <span className="text-[10px] text-[#9CA3AF]">{topic.lastActivity}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 shrink-0">
                            <div className="text-center hidden sm:block">
                              <div className="text-xs font-bold text-[#4A5568]">{topic.replies}</div>
                              <div className="text-[9px] text-[#9CA3AF] font-bold uppercase">Replies</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#E5E7EB] group-hover:text-[#1E6BFF]" />
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/forum/${cat.slug}`}
                      className="block p-4 text-center text-xs font-bold text-[#1E6BFF] bg-[#F8F9FA] hover:bg-[#EBF2FF] transition-colors"
                    >
                      View all {cat.name} discussions
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1E6BFF]" /> Trending Topics
              </h3>
              <div className="space-y-4">
                {forumData.categories[0].topics.slice(0, 5).map((topic, idx) => (
                  <Link key={idx} href="#" className="block group">
                    <h4 className="text-xs font-bold text-[#4A5568] group-hover:text-[#1E6BFF] transition-colors mb-1 line-clamp-2">
                      {topic.title}
                    </h4>
                    <span className="text-[10px] text-[#9CA3AF]">{topic.replies} replies</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#1A1A2E] rounded-3xl p-8 text-white text-center relative overflow-hidden">
              <div className="relative z-10">
                <Users className="w-10 h-10 text-[#1E6BFF] mx-auto mb-4" />
                <h4 className="text-lg font-bold mb-2">Expert Community</h4>
                <p className="text-xs text-white/50 mb-6 leading-relaxed">Get advice from Pakistan's top real estate experts and experienced investors.</p>
                <Link 
                  href="/register"
                  className="block w-full py-3 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl hover:bg-[#1554CC] transition-all"
                >
                  Join the Community
                </Link>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1E6BFF]/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumPage
