import React from 'react'
import Link from 'next/link'
import { MessageCircle, Key, Building, MessageSquare, ArrowRight, Users } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import forumData from '@/data/forum-topics.json'

const icons = {
  "buying-property": MessageCircle,
  "renting-property": Key,
  "new-projects": Building,
  "general-discussion": MessageSquare
}

const CommunityForum = () => {
  return (
    <section className="bg-transparent py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="COMMUNITY"
          heading="Pakistan Property Forum"
          sub="Join thousands of buyers, sellers and renters discussing the real estate market"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {forumData.categories.map((cat) => {
            const Icon = icons[cat.slug as keyof typeof icons] || MessageSquare
            return (
              <Link 
                key={cat.id} 
                href={`/forum/${cat.slug}`}
                className="group p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_30px_rgba(30,107,255,0.08)] hover:border-[#1E6BFF]/30 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] mb-4 flex items-center justify-center group-hover:bg-[#1E6BFF] transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#1E6BFF] group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-base font-bold text-[#1A1A2E] mb-1 group-hover:text-[#1E6BFF] transition-colors">
                  {cat.name}
                </h3>
                
                <div className="flex items-center gap-3 mt-2 mb-4">
                  <span className="text-xs text-[#9CA3AF]">
                    {cat.topicCount.toLocaleString()} Topics
                  </span>
                  {cat.newTopics > 0 && (
                    <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                      {cat.newTopics} New
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-auto text-xs font-bold text-[#9CA3AF] group-hover:text-[#1E6BFF] transition-colors">
                  Browse Discussions <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E6BFF] text-white text-sm font-bold rounded-2xl hover:bg-[#1554CC] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-button"
          >
            <Users className="w-4 h-4" />
            Join the Community
          </Link>
        </div>

      </div>
    </section>
  )
}

export default CommunityForum
