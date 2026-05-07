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
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">New Projects</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">New Projects in Pakistan</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['All Status', 'Under Construction', 'Ready', 'Pre-Launch'].map(status => (
            <button 
              key={status} 
              onClick={() => setActiveStatus(status)}
              className={cn(
                "px-5 py-2.5 text-xs font-bold rounded-full border transition-all",
                activeStatus === status 
                  ? "bg-[#1E6BFF] text-white border-[#1E6BFF]" 
                  : "bg-white border-[#E5E7EB] text-[#4A5568] hover:border-[#1E6BFF] hover:text-[#1E6BFF]"
              )}
            >
              {status}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-bold text-[#9CA3AF]">Sort By:</span>
            <select className="bg-transparent text-xs font-bold text-[#1A1A2E] border-none focus:ring-0 cursor-pointer">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-[#1E6BFF] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                href={`/new-projects/${project.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={project.coverImage || project.cover_image || '/placeholder-project.png'} 
                    alt={project.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-xl shadow-lg backdrop-blur-md",
                      project.status === 'Under Construction' ? "bg-orange-500/80" : 
                      project.status === 'Ready' ? "bg-green-500/80" : "bg-[#1E6BFF]/80"
                    )}>
                      {project.status}
                    </span>
                  </div>
                  {project.isTrending && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[#1E6BFF] px-3 py-1 text-[10px] font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
                      <TrendingUp className="w-3 h-3" /> TRENDING
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-2 group-hover:text-[#1E6BFF] transition-colors">{project.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mb-6">
                    <MapPin className="w-3.5 h-3.5 text-[#1E6BFF]" />
                    {project.location}
                  </div>

                  <div className="pt-6 border-t border-[#F3F4F6] flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest block mb-1">Starting From</span>
                      <span className="text-xl font-black text-[#1E6BFF]">PKR {project.price_label || project.priceLabel}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest block mb-1">Developer</span>
                      <span className="text-xs font-bold text-[#4A5568]">{project.developer}</span>
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

