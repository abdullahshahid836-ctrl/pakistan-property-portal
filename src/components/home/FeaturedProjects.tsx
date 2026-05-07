'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { RevealWrapper } from '@/components/shared/RevealWrapper'
import { Project } from '@/types'

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
    <section className="py-16 sm:py-20 bg-[#EDE8DF] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-10">
          <RevealWrapper direction="left">
            <span className="pill-label">🔥 TRENDING</span>
            <h2 className="font-syne font-bold text-4xl text-[#0D1B17] mt-3">New Projects</h2>
          </RevealWrapper>
          <RevealWrapper direction="right">
            <Link href="/new-projects"
              className="text-sm font-bold font-syne text-[#004737] flex items-center gap-1.5 hover:gap-2.5 transition-all underline-offset-4 hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-[380px] skeleton-shimmer border border-[#DDD8CF]" />
            ))
          ) : (
            projects.map((project, i) => (
              <RevealWrapper key={project.id} delay={i * 80} direction="up">
                <Link href={`/new-projects/${project.slug}`}
                  className="group block bg-white rounded-3xl overflow-hidden border border-[#DDD8CF] hover:shadow-[0_20px_50px_rgba(0,71,55,0.15)] hover:-translate-y-1 transition-all duration-300">

                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.coverImage || project.cover_image || '/placeholder-project.png'}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black font-syne uppercase tracking-wider ${
                        project.status === 'Ready'
                          ? 'bg-[#C8F55A] text-[#004737]'
                          : 'bg-[#004737] text-[#C8F55A]'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-syne font-bold text-lg text-[#0D1B17] mb-1 line-clamp-1 group-hover:text-[#004737] transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#7A9088] mb-4 font-inter">
                      <MapPin className="w-3 h-3 text-[#004737]" />
                      {project.location}
                    </div>
                    <div className="flex items-end justify-between pt-4 border-t border-[#EDE8DF]">
                      <div>
                        <div className="text-[10px] text-[#7A9088] uppercase tracking-wider font-inter">Starting From</div>
                        <div className="text-xl font-black text-[#004737] font-syne">
                          PKR {project.price_label || project.priceLabel}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#7A9088] text-right font-inter">
                        {project.developer}
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealWrapper>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
