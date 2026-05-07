'use client'

import React from 'react'
import Link from 'next/link'
import { MessageCircle, Key, Building, MessageSquare, ArrowRight, Users, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '@/components/shared/Reveal'
import forumData from '@/data/forum-topics.json'

const icons = {
  'buying-property':    MessageCircle,
  'renting-property':   Key,
  'new-projects':       Building,
  'general-discussion': MessageSquare,
}

const CommunityForum = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#EDE8DF] relative z-10 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#004737]/5 rounded-full blur-[100px] -ml-48 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C8F55A]/5 rounded-full blur-[80px] -mr-32 -mb-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-20">
          <Reveal direction="down">
            <div className="flex justify-center mb-6">
               <span className="pill-label bg-white border-[#DDD8CF] text-[#004737] px-8 py-2 shadow-xl">SOCIAL HUB</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl lg:text-7xl text-[#0D1B17] uppercase tracking-tighter leading-none mb-6">
              Property <br />
              <span className="text-[#004737] italic">Conversations.</span>
            </h2>
            <p className="text-[#3D5249] text-base sm:text-lg max-w-xl mx-auto font-inter font-medium opacity-60 leading-relaxed">
              Join the nation's largest community of real estate enthusiasts and professionals.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {forumData.categories.map((cat, i) => {
            const Icon = icons[cat.slug as keyof typeof icons] || MessageSquare
            return (
              <Reveal key={cat.id} delay={i * 0.1} direction="scale">
                <motion.div
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative h-full"
                >
                  <Link href={`/forum/${cat.slug}`}
                    className="flex flex-col p-8 bg-white rounded-[2.5rem] border border-[#DDD8CF] shadow-[0_8px_32px_rgba(0,71,55,0.04)] hover:shadow-[0_40px_100px_rgba(0,71,55,0.12)] hover:border-[#004737]/20 transition-all duration-700 h-full overflow-hidden relative"
                  >
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5F0E8] rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-[#C8F55A]/30 transition-colors duration-700" />

                    <div className="w-16 h-16 rounded-[1.5rem] bg-[#004737] mb-10 flex items-center justify-center shadow-xl shadow-[#004737]/10 group-hover:rotate-[10deg] transition-transform duration-500">
                      <Icon className="w-8 h-8 text-[#C8F55A]" />
                    </div>

                    <h3 className="font-syne font-black text-xl text-[#0D1B17] mb-3 uppercase tracking-tight group-hover:text-[#004737] transition-colors">
                      {cat.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 mb-10">
                      <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest bg-[#F5F0E8] px-3 py-1.5 rounded-xl group-hover:bg-[#004737] group-hover:text-[#C8F55A] transition-colors">
                        {cat.topicCount.toLocaleString()} Topics
                      </span>
                      {cat.newTopics > 0 && (
                        <span className="text-[9px] text-green-700 font-black font-syne uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-xl flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          {cat.newTopics} New
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center gap-3 text-[10px] font-black font-syne text-[#004737] uppercase tracking-[0.25em] group-hover:gap-5 transition-all duration-500">
                      Join Discussion <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            )
          })}
        </div>

        <Reveal direction="up" className="mt-20 text-center">
          <motion.div
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="inline-block"
          >
            <Link href="/register"
              className="flex items-center gap-4 px-12 py-6 bg-[#004737] text-[#C8F55A] text-[11px] font-black font-syne uppercase tracking-[0.3em] rounded-3xl hover:bg-black transition-all duration-500 shadow-2xl shadow-[#004737]/20"
            >
              <Users className="w-5 h-5" />
              CREATE COMMUNITY PROFILE
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

export default CommunityForum
