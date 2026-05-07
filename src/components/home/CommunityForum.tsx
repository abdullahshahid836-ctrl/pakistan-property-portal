import React from 'react'
import Link from 'next/link'
import { MessageCircle, Key, Building, MessageSquare, ArrowRight, Users } from 'lucide-react'
import { RevealWrapper } from '@/components/shared/RevealWrapper'
import forumData from '@/data/forum-topics.json'

const icons = {
  'buying-property':    MessageCircle,
  'renting-property':   Key,
  'new-projects':       Building,
  'general-discussion': MessageSquare,
}

const CommunityForum = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#EDE8DF] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <RevealWrapper className="text-center mb-12">
          <span className="pill-label">COMMUNITY</span>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0D1B17] mt-4 leading-tight">
            Pakistan Property Forum
          </h2>
          <p className="text-[#3D5249] text-base mt-4 max-w-xl mx-auto font-inter leading-relaxed">
            Join thousands of buyers, sellers and renters discussing the real estate market
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {forumData.categories.map((cat, i) => {
            const Icon = icons[cat.slug as keyof typeof icons] || MessageSquare
            return (
              <RevealWrapper key={cat.id} delay={i * 80} direction="scale">
                <Link href={`/forum/${cat.slug}`}
                  className="group block p-6 bg-white rounded-2xl border border-[#DDD8CF] shadow-[0_2px_8px_rgba(0,71,55,0.04)] hover:shadow-[0_16px_40px_rgba(0,71,55,0.12)] hover:-translate-y-1 hover:border-[#004737]/20 transition-all duration-300 flex flex-col">

                  <div className="w-12 h-12 rounded-2xl bg-[#004737] mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#C8F55A]" />
                  </div>

                  <h3 className="font-syne font-bold text-base text-[#0D1B17] mb-1 group-hover:text-[#004737] transition-colors">
                    {cat.name}
                  </h3>

                  <div className="flex items-center gap-3 mt-2 mb-4">
                    <span className="text-xs font-inter text-[#7A9088]">
                      {cat.topicCount.toLocaleString()} Topics
                    </span>
                    {cat.newTopics > 0 && (
                      <span className="text-[10px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1 font-inter">
                        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        {cat.newTopics} New
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mt-auto text-xs font-bold font-syne text-[#7A9088] group-hover:text-[#004737] transition-colors">
                    Browse Discussions <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </RevealWrapper>
            )
          })}
        </div>

        <RevealWrapper className="mt-12 text-center">
          <Link href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#004737] text-[#C8F55A] text-sm font-bold font-syne tracking-wide rounded-2xl hover:bg-[#003329] hover:shadow-[0_8px_24px_rgba(0,71,55,0.3)] hover:-translate-y-0.5 transition-all duration-300">
            <Users className="w-4 h-4" />
            Join the Community
          </Link>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default CommunityForum
