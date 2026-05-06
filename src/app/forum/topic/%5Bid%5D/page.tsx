'use client'

import React, { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, MessageSquare, Heart, Share2, Flag, ArrowLeft, Send } from 'lucide-react'
import forumData from '@/data/forum-topics.json'

export default function ForumTopicPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  
  // Find topic in any category
  let topic: any = null
  let category: any = null
  
  for (const cat of forumData.categories) {
    const found = cat.topics.find(t => t.id === params.id)
    if (found) {
      topic = found
      category = cat
      break
    }
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-4">Topic Not Found</h1>
          <Link href="/forum" className="text-[#1E6BFF] font-bold">Back to Forum</Link>
        </div>
      </div>
    )
  }

  // Mock replies for demonstration
  const mockReplies = [
    {
      id: "reply-1",
      author: "Ahmed Raza",
      authorRole: "Expert",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      content: "DHA Phase 9 Prism is definitely a long-term play. If you have a 3-5 year horizon, the infrastructure development there is very promising. However, make sure you're buying at the right price point as there was some overheating recently.",
      date: "2 hours ago",
      likes: 12
    },
    {
      id: "reply-2",
      author: "Sara Malik",
      authorRole: "Investor",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      content: "I completely agree with Ahmed. I recently visited the site and the road network is almost 70% complete. For those looking for immediate possession, Phase 6 or 7 might be better, but for capital gain, Prism is the winner.",
      date: "1 hour ago",
      likes: 8
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/forum" className="hover:text-[#1E6BFF]">Forum</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/forum/${category.slug}`} className="hover:text-[#1E6BFF]">{category.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E] line-clamp-1">{topic.title}</span>
          </div>
          
          <Link href={`/forum/${category.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#1E6BFF] mb-4 hover:underline">
            <ArrowLeft className="w-3 h-3" /> Back to {category.name}
          </Link>
          
          <h1 className="text-xl sm:text-3xl font-black text-[#1A1A2E] mb-6 leading-tight">
            {topic.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-t border-[#F3F4F6]">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#EBF2FF]">
                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt={topic.author} fill className="object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1A1A2E]">{topic.author}</div>
                <div className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">Posted {topic.lastActivity || 'Yesterday'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl border border-[#E5E7EB] text-[#4A5568] hover:bg-[#F8F9FA] transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-xl border border-[#E5E7EB] text-[#4A5568] hover:bg-[#F8F9FA] transition-all">
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {/* Main Topic Content */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm">
            <p className="text-[#4A5568] leading-relaxed mb-8">
              Hello everyone, I'm planning to invest in DHA Lahore Phase 9 Prism. I've heard mixed reviews lately about the market cooling down. What are your thoughts on the current prices? Is it a good time to buy a 10 Marla or 1 Kanal plot for long-term investment (3-5 years)? 
              <br /><br />
              Any advice from seasoned investors would be highly appreciated. Also, which block would you recommend for the best capital gain?
            </p>
            
            <div className="flex items-center gap-4 py-4 border-t border-[#F3F4F6]">
              <button className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF] hover:text-[#1E6BFF] transition-colors">
                <Heart className="w-4 h-4" /> {topic.views > 100 ? '45' : '12'} Likes
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-[#1E6BFF]">
                <MessageSquare className="w-4 h-4" /> {topic.replies} Replies
              </button>
            </div>
          </div>

          {/* Replies Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A2E] px-2 flex items-center gap-2">
              All Replies <span className="text-[10px] bg-[#E5E7EB] px-1.5 py-0.5 rounded">{mockReplies.length}</span>
            </h3>
            
            {mockReplies.map((reply) => (
              <div key={reply.id} className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#EBF2FF]">
                      <Image src={reply.authorAvatar} alt={reply.author} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1A1A2E]">{reply.author}</span>
                        <span className="text-[9px] font-bold text-white bg-[#1E6BFF] px-1.5 py-0.5 rounded uppercase">{reply.authorRole}</span>
                      </div>
                      <div className="text-[9px] text-[#9CA3AF] font-bold uppercase">{reply.date}</div>
                    </div>
                  </div>
                  <button className="text-[#9CA3AF] hover:text-red-500 transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                  {reply.content}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Reply */}
          <div className="bg-[#1A1A2E] rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-white text-lg font-bold mb-4">Your Reply</h3>
            <div className="relative">
              <textarea 
                placeholder="Write your advice or question here..."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#1E6BFF] transition-all resize-none mb-4"
              />
              <button className="w-full sm:w-auto px-8 py-3 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Post Reply
              </button>
            </div>
            <p className="text-[10px] text-white/30 mt-4 text-center">
              Please be respectful and follow our community guidelines.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
