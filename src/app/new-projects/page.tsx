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
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
            <span>Home</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            <span className="text-flecto-green-light">New Projects</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-flecto-green font-syne tracking-tight">New Projects in Pakistan</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {['All Status', 'Under Construction', 'Ready', 'Pre-Launch'].map(status => (
            <button 
              key={status} 
              onClick={() => setActiveStatus(status)}
              className={cn(
                "px-6 py-3 text-xs font-bold rounded-full border transition-all duration-500 font-syne uppercase tracking-widest",
                activeStatus === status 
                  ? "bg-flecto-green text-flecto-cream border-flecto-green shadow-xl shadow-flecto-green/20" 
                  : "bg-white border-flecto-green/5 text-flecto-green-light hover:border-flecto-lime hover:text-flecto-green"
              )}
            >
              {status}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-flecto-green/5 shadow-sm">
            <span className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-widest font-inter">Sort:</span>
            <select className="bg-transparent text-xs font-bold text-flecto-green border-none focus:ring-0 cursor-pointer font-syne uppercase tracking-wider p-0">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <div className="w-12 h-12 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-flecto-green uppercase tracking-[0.2em] font-inter">Curating Projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                href={`/new-projects/${project.slug}`}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-flecto-green/5 shadow-2xl shadow-flecto-green/[0.04] hover:shadow-flecto-green/[0.08] transition-all duration-700 transform hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image 
                    src={project.coverImage || project.cover_image || '/placeholder-project.png'} 
                    alt={project.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className={cn(
                      "px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-flecto-cream rounded-full shadow-2xl backdrop-blur-md font-inter",
                      project.status === 'Under Construction' ? "bg-orange-500/90" : 
                      project.status === 'Ready' ? "bg-flecto-green/90" : "bg-flecto-green-light/90"
                    )}>
                      {project.status}
                    </span>
                  </div>
                  {project.isTrending && (
                    <div className="absolute bottom-6 left-6 bg-flecto-lime text-flecto-green px-4 py-2 text-[10px] font-bold rounded-full flex items-center gap-2 shadow-2xl font-inter uppercase tracking-widest">
                      <TrendingUp className="w-3.5 h-3.5" /> TRENDING
                    </div>
                  )}
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-flecto-green mb-3 group-hover:text-flecto-green-light transition-colors font-syne leading-tight">{project.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-flecto-text-muted mb-8 font-inter font-medium">
                    <MapPin className="w-4 h-4 text-flecto-lime" />
                    {project.location}
                  </div>

                  <div className="mt-auto pt-8 border-t border-flecto-green/5 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-flecto-text-muted font-bold uppercase tracking-[0.2em] block mb-2 font-inter">Starting Price</span>
                      <span className="text-2xl font-bold text-flecto-green font-syne tracking-tight">
                        <span className="text-xs mr-1 opacity-40">PKR</span>
                        {project.price_label || project.priceLabel}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-flecto-text-muted font-bold uppercase tracking-[0.2em] block mb-2 font-inter">Developer</span>
                      <span className="text-xs font-bold text-flecto-green-light font-syne uppercase tracking-wider">{project.developer}</span>
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

