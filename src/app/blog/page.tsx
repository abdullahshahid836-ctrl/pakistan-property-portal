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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F0E8]">
       <Loader2 className="w-10 h-10 text-[#004737] animate-spin mb-4" />
       <span className="font-syne font-bold text-[#004737] tracking-widest text-[10px] uppercase">Curating insights...</span>
    </div>
  )

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
            <span className="opacity-60">Real Estate Blog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Market Intelligence</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Stay ahead with the latest trends, investment guides and legal updates from Pakistan's property sector.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {['All Posts', 'Investment', 'Market Update', 'Guides', 'Legal'].map(cat => (
            <button key={cat} className="px-6 py-3 text-[11px] font-black font-syne rounded-xl bg-white border-2 border-[#DDD8CF] text-[#0D1B17] hover:border-[#004737] hover:bg-[#F5F0E8] transition-all uppercase tracking-widest">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 stagger-children">
          {posts.map((post) => {
            const coverImg = post.coverImage || post.cover_image || 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800'
            const authorImg = post.authorPhoto || post.author_photo || 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
            
            return (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#DDD8CF] shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image 
                    src={coverImg} 
                    alt={post.title || 'Blog Post'} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 bg-[#C8F55A] text-[#004737] text-[10px] font-black font-syne uppercase tracking-widest rounded-xl shadow-lg border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#004737]" />
                      {post.publishDate || post.publish_date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#004737]" />
                      {post.readTime || post.read_time}
                    </div>
                  </div>

                  <h2 className="text-xl font-black font-syne text-[#0D1B17] mb-4 group-hover:text-[#004737] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-sm font-inter text-[#7A9088] mb-8 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-[#F5F0E8]">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-[0.75rem] overflow-hidden border-2 border-[#F5F0E8]">
                        <Image src={authorImg} alt={post.author || 'Author'} fill sizes="32px" className="object-cover" />
                      </div>
                      <span className="text-[11px] font-black font-syne text-[#3D5249] uppercase tracking-wider">{post.author}</span>
                    </div>
                    <div className="w-10 h-10 bg-[#F5F0E8] rounded-xl flex items-center justify-center group-hover:bg-[#004737] transition-all">
                      <ArrowRight className="w-4 h-4 text-[#004737] group-hover:text-[#C8F55A] group-hover:translate-x-0.5 transition-all" />
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
