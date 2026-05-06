'use client'

import React, { use, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, MessageSquare, Heart, Share2, Flag, ArrowLeft, Send, AlertCircle, Loader2 } from 'lucide-react'
import forumData from '@/data/forum-topics.json'

interface Reply {
  id: string
  author: string
  author_role: string
  author_avatar: string
  content: string
  created_at: string
  likes: number
}

export default function ForumTopicPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const [replies, setReplies] = useState<Reply[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [newReply, setNewReply] = useState('')
  const [tableMissing, setTableMissing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Find topic in any category (static fallback for topic info)
  let staticTopic: any = null
  let category: any = null
  
  for (const cat of forumData.categories) {
    const found = cat.topics.find(t => t.id === params.id)
    if (found) {
      staticTopic = found
      category = cat
      break
    }
  }

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await fetch(`/api/forum/replies?topicId=${params.id}`)
        const data = await res.json()
        if (data.tableMissing) {
          setTableMissing(true)
        } else {
          setReplies(data.replies || [])
        }
      } catch (err) {
        console.error('Failed to fetch replies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReplies()
  }, [params.id])

  const handlePostReply = async () => {
    if (!newReply.trim()) return

    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/forum/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: params.id,
          content: newReply,
          author: 'Me (Demo User)', // In a real app, this would be the logged in user
          authorRole: 'Member'
        })
      })

      const data = await res.json()
      if (res.ok) {
        setReplies([...replies, data.reply])
        setNewReply('')
      } else {
        if (data.tableMissing) setTableMissing(true)
        setError(data.error || 'Failed to post reply')
      }
    } catch (err) {
      setError('An error occurred while posting your reply.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!staticTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-4">Topic Not Found</h1>
          <Link href="/forum" className="text-[#1E6BFF] font-bold">Back to Forum</Link>
        </div>
      </div>
    )
  }

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
            <span className="text-[#1A1A2E] line-clamp-1">{staticTopic.title}</span>
          </div>
          
          <Link href={`/forum/${category.slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#1E6BFF] mb-4 hover:underline">
            <ArrowLeft className="w-3 h-3" /> Back to {category.name}
          </Link>
          
          <h1 className="text-xl sm:text-3xl font-black text-[#1A1A2E] mb-6 leading-tight">
            {staticTopic.title}
          </h1>

          <div className="flex items-center justify-between py-4 border-t border-[#F3F4F6]">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#EBF2FF]">
                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt={staticTopic.author} fill className="object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#1A1A2E]">{staticTopic.author}</div>
                <div className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">Posted {staticTopic.lastActivity || 'Yesterday'}</div>
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
              Hello everyone, I'm planning to invest in this area. I've heard mixed reviews lately about the market cooling down. What are your thoughts on the current prices? Is it a good time for long-term investment (3-5 years)? 
              <br /><br />
              Any advice from seasoned investors would be highly appreciated. Also, which block would you recommend for the best capital gain?
            </p>
            
            <div className="flex items-center gap-4 py-4 border-t border-[#F3F4F6]">
              <button className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF] hover:text-[#1E6BFF] transition-colors">
                <Heart className="w-4 h-4" /> {staticTopic.views > 100 ? '45' : '12'} Likes
              </button>
              <button className="flex items-center gap-2 text-xs font-bold text-[#1E6BFF]">
                <MessageSquare className="w-4 h-4" /> {staticTopic.replies} Replies
              </button>
            </div>
          </div>

          {/* Table Missing Alert */}
          {tableMissing && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-amber-900 mb-1">Database Setup Required</h4>
                <p className="text-xs text-amber-700 leading-relaxed mb-3">
                  The <code className="bg-amber-100 px-1 rounded">forum_replies</code> table is missing in your database. To enable posting replies, please run the SQL script in your Supabase Dashboard.
                </p>
                <div className="bg-amber-900/5 p-3 rounded-lg font-mono text-[10px] text-amber-900 overflow-x-auto">
                  CREATE TABLE forum_replies ( <br />
                    &nbsp;&nbsp;id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), <br />
                    &nbsp;&nbsp;topic_id TEXT NOT NULL, <br />
                    &nbsp;&nbsp;author TEXT NOT NULL, <br />
                    &nbsp;&nbsp;author_role TEXT, <br />
                    &nbsp;&nbsp;author_avatar TEXT, <br />
                    &nbsp;&nbsp;content TEXT NOT NULL, <br />
                    &nbsp;&nbsp;likes INTEGER DEFAULT 0, <br />
                    &nbsp;&nbsp;created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP <br />
                  );
                </div>
              </div>
            </div>
          )}

          {/* Replies Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#1A1A2E] px-2 flex items-center gap-2">
              All Replies <span className="text-[10px] bg-[#E5E7EB] px-1.5 py-0.5 rounded">{replies.length}</span>
            </h3>
            
            {loading ? (
              <div className="py-10 text-center">
                <Loader2 className="w-6 h-6 text-[#1E6BFF] animate-spin mx-auto mb-2" />
                <p className="text-xs text-[#9CA3AF]">Loading replies...</p>
              </div>
            ) : replies.length > 0 ? (
              replies.map((reply) => (
                <div key={reply.id} className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#EBF2FF]">
                        <Image src={reply.author_avatar} alt={reply.author} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1A1A2E]">{reply.author}</span>
                          <span className="text-[9px] font-bold text-white bg-[#1E6BFF] px-1.5 py-0.5 rounded uppercase">{reply.author_role}</span>
                        </div>
                        <div className="text-[9px] text-[#9CA3AF] font-bold uppercase">{new Date(reply.created_at).toLocaleDateString()}</div>
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
              ))
            ) : !tableMissing && (
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-10 text-center">
                <p className="text-sm text-[#9CA3AF]">No replies yet. Be the first to share your advice!</p>
              </div>
            )}
          </div>

          {/* Quick Reply */}
          <div className="bg-[#1A1A2E] rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-white text-lg font-bold mb-4">Your Reply</h3>
            <div className="relative">
              <textarea 
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write your advice or question here..."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#1E6BFF] transition-all resize-none mb-4"
                disabled={submitting}
              />
              {error && <p className="text-red-400 text-[10px] mb-4 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
              <button 
                onClick={handlePostReply}
                disabled={submitting || !newReply.trim()}
                className="w-full sm:w-auto px-8 py-3 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} 
                Post Reply
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
