'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/shared/SectionHeader'
import projectsData from '@/data/projects.json'
import { Project } from '@/types'

const FeaturedProjects = () => {
  const trendingProjects = projectsData.filter(p => p.isTrending).slice(0, 3)

  return (
    <section className="bg-[#F8F9FA] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="🔥 TRENDING"
          heading="New Projects"
          align="left"
          right={
            <Link href="/new-projects" className="text-sm text-[#1E6BFF] hover:text-[#1554CC] font-bold flex items-center gap-1.5 transition-all">
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProjects.map((project) => (
            <ProjectCard key={project.id} project={project as Project} />
          ))}
        </div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project }: { project: Project }) => (
  <Link href={`/new-projects/${project.slug}`}
    className="group bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
    
    <div className="relative h-52 sm:h-56 overflow-hidden">
      <Image 
        src={project.coverImage} 
        alt={project.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      
      <div className={cn(
        "absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase rounded-full text-white shadow-sm z-10",
        project.status === 'Under Construction' ? "bg-orange-500" : 
        project.status === 'Ready' ? "bg-green-500" : "bg-[#1E6BFF]"
      )}>
        {project.status}
      </div>

      <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors z-10">
        <Heart className="w-4 h-4 text-[#4A5568] hover:text-red-500 transition-colors" />
      </button>
    </div>

    <div className="p-5">
      <h3 className="text-base sm:text-lg font-bold text-[#1A1A2E] mb-2 group-hover:text-[#1E6BFF] transition-colors line-clamp-1">
        {project.name}
      </h3>
      
      <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mb-4">
        <MapPin className="w-3.5 h-3.5 text-[#1E6BFF]" />
        {project.location}
      </div>

      <div className="pt-4 border-t border-[#F3F4F6] flex items-end justify-between">
        <div>
          <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest block mb-1">
            Starting From
          </span>
          <span className="text-base sm:text-lg font-bold text-[#1E6BFF]">
            {project.priceLabel}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest block mb-1">
            Developer
          </span>
          <span className="text-xs font-semibold text-[#4A5568]">
            {project.developer.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  </Link>
)

export default FeaturedProjects
