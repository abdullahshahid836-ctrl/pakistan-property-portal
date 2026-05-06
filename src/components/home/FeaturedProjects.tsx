'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Heart, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/shared/SectionHeader'
import { Project } from '@/types'

import RevealWrapper from '@/components/shared/RevealWrapper'

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects?trending=true')
        const data = await res.json()
        setProjects(data.projects?.slice(0, 3) || [])
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section className="bg-flecto-cream-dark py-20 sm:py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealWrapper animation="fade-up">
          <SectionHeader 
            eyebrow="Prime Opportunities"
            heading="Featured New Projects"
            align="left"
            right={
              <Link href="/new-projects" className="btn-primary px-6 py-2.5 text-xs">
                View all projects <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            }
          />
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-[450px] animate-pulse border border-flecto-green/5" />
            ))
          ) : (
            projects.map((project, idx) => (
              <RevealWrapper key={project.id} animation="fade-up" delay={idx * 0.1}>
                <ProjectCard project={project} />
              </RevealWrapper>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project }: { project: Project }) => (
  <Link href={`/new-projects/${project.slug}`}
    className="flecto-card group bg-white flex flex-col h-full">
    
    <div className="relative h-64 overflow-hidden">
      <Image 
        src={project.coverImage || project.cover_image || '/placeholder-project.png'} 
        alt={project.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-110 transition-transform duration-1000"
      />
      
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        <div className={cn(
          "pill-label bg-white/90 backdrop-blur-md text-flecto-green shadow-lg",
          project.status === 'Under Construction' ? "text-orange-600" : 
          project.status === 'Ready' ? "text-green-600" : "text-flecto-green"
        )}>
          {project.status}
        </div>
      </div>

      <button className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-flecto-lime transition-all duration-300 z-10 group/heart">
        <Heart className="w-5 h-5 text-flecto-green group-hover/heart:fill-red-500 group-hover/heart:text-red-500 transition-all" />
      </button>
    </div>

    <div className="p-8 flex flex-col flex-1">
      <h3 className="text-xl sm:text-2xl font-bold text-flecto-green mb-3 font-syne group-hover:text-flecto-green-light transition-colors line-clamp-1">
        {project.name}
      </h3>
      
      <div className="flex items-center gap-2 text-sm text-flecto-text-muted mb-6 font-inter font-medium">
        <MapPin className="w-4 h-4 text-flecto-green/40" />
        {project.location}
      </div>

      <div className="mt-auto pt-6 border-t border-flecto-green/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-flecto-text-muted font-bold uppercase tracking-[0.2em] block mb-2 font-inter">
            Investment Starts
          </span>
          <span className="text-xl font-bold text-flecto-green font-syne">
            PKR {project.price_label || project.priceLabel}
          </span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-flecto-green/5 flex items-center justify-center group-hover:bg-flecto-lime transition-colors duration-500">
          <ArrowRight className="w-5 h-5 text-flecto-green" />
        </div>
      </div>
    </div>
  </Link>
)

export default FeaturedProjects

