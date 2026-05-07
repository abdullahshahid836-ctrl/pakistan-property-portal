'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, TrendingUp, ChevronRight, Filter, Loader2 } from 'lucide-react'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

export default function NewProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeStatus, setActiveStatus] = useState('All Status')

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      try {
        const url = activeStatus === 'All Status' ? '/api/projects' : `/api/projects?status=${activeStatus}`
        const res = await fetch(url)
        const data = await res.json()
        setProjects(data.projects || [])
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [activeStatus])

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
            <span className="opacity-60">Investment Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4">New Projects in Pakistan</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Discover upcoming developments, high-yield commercial projects and luxury residential schemes.
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
        
        {/* Status Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-3">
            {['All Status', 'Under Construction', 'Ready', 'Pre-Launch'].map(status => (
              <button 
                key={status} 
                onClick={() => setActiveStatus(status)}
                className={cn(
                  "px-6 py-3 text-xs font-black font-syne rounded-xl border-2 transition-all uppercase tracking-wider",
                  activeStatus === status 
                    ? "bg-[#004737] text-[#C8F55A] border-[#004737] shadow-lg" 
                    : "bg-white border-[#DDD8CF] text-[#3D5249] hover:border-[#004737]/30 hover:bg-[#F5F0E8]"
                )}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="sm:ml-auto flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-[#DDD8CF]">
            <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest">SORT BY:</span>
            <select className="bg-transparent text-xs font-black font-syne text-[#004737] border-none focus:ring-0 cursor-pointer uppercase tracking-wider">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 text-[#004737] animate-spin" />
            <span className="font-syne font-bold text-[#004737] tracking-widest text-xs uppercase text-center">Scanning Projects...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 stagger-children">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                href={`/new-projects/${project.slug}`}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#DDD8CF] shadow-[0_4px_12px_rgba(0,71,55,0.04)] hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={project.coverImage || project.cover_image || '/placeholder-project.png'} 
                    alt={project.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-5 left-5">
                    <span className={cn(
                      "px-4 py-1.5 text-[10px] font-black font-syne uppercase tracking-widest text-white rounded-xl shadow-lg backdrop-blur-md border border-white/20",
                      project.status === 'Under Construction' ? "bg-orange-600/80" : 
                      project.status === 'Ready' ? "bg-green-600/80" : "bg-[#004737]/80"
                    )}>
                      {project.status}
                    </span>
                  </div>
                  {project.isTrending && (
                    <div className="absolute bottom-5 left-5 bg-[#C8F55A] text-[#004737] px-4 py-1.5 text-[10px] font-black font-syne rounded-xl flex items-center gap-2 shadow-xl">
                      <TrendingUp className="w-3.5 h-3.5" /> TRENDING NOW
                    </div>
                  )}
                </div>

                <div className="p-10">
                  <h3 className="text-2xl font-black font-syne text-[#0D1B17] mb-3 group-hover:text-[#004737] transition-colors leading-snug">{project.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-inter text-[#7A9088] mb-8">
                    <MapPin className="w-4 h-4 text-[#004737]" />
                    {project.location}
                  </div>

                  <div className="pt-8 border-t border-[#F5F0E8] flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.15em] block mb-2">Starting From</span>
                      <span className="text-2xl font-black font-syne text-[#004737] leading-none tracking-tight">PKR {project.price_label || project.priceLabel}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.15em] block mb-2">Developer</span>
                      <span className="text-xs font-black font-syne text-[#3D5249] uppercase">{project.developer}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
