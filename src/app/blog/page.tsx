'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, ChevronRight, Loader2 } from 'lucide-react'
import { BlogPost } from '@/types'

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog')
        const data = await res.json()
        setPosts(data.posts || [])
      } catch (err) {
        console.error('Failed to fetch blog posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#1E6BFF] animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Blog</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">Real Estate Blog</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['All', 'Investment', 'Market Update', 'Guides', 'Legal'].map(cat => (
            <button key={cat} className="px-5 py-2 text-xs font-bold rounded-full bg-white border border-[#E5E7EB] text-[#4A5568] hover:border-[#1E6BFF] hover:text-[#1E6BFF] transition-all">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const coverImg = post.coverImage || post.cover_image || 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800'
            const authorImg = post.authorPhoto || post.author_photo || 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
            
            return (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={coverImg} 
                    alt={post.title || 'Blog Post'} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#1E6BFF] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#1E6BFF]" />
                      {post.publishDate || post.publish_date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#1E6BFF]" />
                      {post.readTime || post.read_time}
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-[#1A1A2E] mb-3 group-hover:text-[#1E6BFF] transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-sm text-[#9CA3AF] mb-6 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6]">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#E5E7EB]">
                        <Image src={authorImg} alt={post.author || 'Author'} fill sizes="24px" className="object-cover" />
                      </div>
                      <span className="text-xs font-bold text-[#4A5568]">{post.author}</span>
                    </div>
                    <div className="text-[#1E6BFF]">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
