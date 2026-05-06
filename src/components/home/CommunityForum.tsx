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

import RevealWrapper from '@/components/shared/RevealWrapper'

const icons = {
  "buying-property": MessageCircle,
  "renting-property": Key,
  "new-projects": Building,
  "general-discussion": MessageSquare
}

const CommunityForum = () => {
  return (
    <section className="bg-flecto-cream-dark py-20 sm:py-24 lg:py-32 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealWrapper animation="fade-up">
          <SectionHeader 
            eyebrow="The Knowledge Hub"
            heading="Community Discussions"
            sub="Connect with thousands of property enthusiasts, experts, and real estate professionals across Pakistan."
          />
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {forumData.categories.map((cat, idx) => {
            const Icon = icons[cat.slug as keyof typeof icons] || MessageSquare
            return (
              <RevealWrapper key={cat.id} animation="fade-up" delay={idx * 0.1}>
                <Link 
                  href={`/forum/${cat.slug}`}
                  className="flecto-card group p-8 bg-white flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-flecto-green/5 mb-6 flex items-center justify-center group-hover:bg-flecto-green transition-all duration-500">
                    <Icon className="w-6 h-6 text-flecto-green group-hover:text-flecto-lime transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-flecto-green mb-2 font-syne group-hover:text-flecto-green-light transition-colors">
                    {cat.name}
                  </h3>
                  
                  <div className="flex items-center gap-3 mt-2 mb-8">
                    <span className="text-xs text-flecto-text-muted font-medium font-inter">
                      {cat.topicCount.toLocaleString()} Topics
                    </span>
                    {cat.newTopics > 0 && (
                      <span className="text-[10px] text-flecto-green font-bold bg-flecto-lime px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-flecto-green animate-pulse" />
                        {cat.newTopics} New
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-auto text-xs font-bold text-flecto-green group-hover:text-flecto-green-light transition-all uppercase tracking-wider font-inter">
                    Join Discussion <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </RevealWrapper>
            )
          })}
        </div>

        <RevealWrapper animation="fade-up" delay={0.4}>
          <div className="mt-16 text-center">
            <Link 
              href="/register"
              className="btn-primary px-10 py-4 text-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Join the Community
            </Link>
          </div>
        </RevealWrapper>

      </div>
    </section>
  )
}

export default CommunityForum
