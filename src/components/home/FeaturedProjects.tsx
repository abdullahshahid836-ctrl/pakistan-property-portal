'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '@/components/shared/Reveal'
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
    <section className="py-24 sm:py-32 bg-[#EDE8DF] relative z-10 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#004737]/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C8F55A]/10 rounded-full blur-[80px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <Reveal direction="right">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 rounded-xl bg-[#004737] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C8F55A]" />
               </div>
               <span className="text-[10px] font-black font-syne text-[#004737] uppercase tracking-[0.3em]">TRENDING NOW</span>
            </div>
            <h2 className="font-syne font-black text-2xl sm:text-6xl text-[#0D1B17] uppercase leading-[0.9] tracking-tighter">
              Featured <br />
              <span className="text-[#004737] opacity-40">Developments</span>
            </h2>
          </Reveal>
          <Reveal direction="left" delay={0.4}>
            <Link href="/new-projects"
              className="group flex items-center gap-3 px-8 py-4 bg-white border border-[#DDD8CF] rounded-2xl text-[10px] font-black font-syne text-[#004737] uppercase tracking-[0.2em] hover:bg-[#004737] hover:text-[#C8F55A] transition-all duration-500 shadow-xl shadow-[#004737]/5"
            >
              Explore all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-[3rem] h-[450px] skeleton-shimmer border border-[#DDD8CF] shadow-xl" />
            ))
          ) : (
            projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.15} direction="up">
                <motion.div
                  whileHover={{ y: -15 }}
                  className="group relative"
                >
                  <Link href={`/new-projects/${project.slug}`} className="block">
                    <div className="bg-white rounded-[3rem] overflow-hidden border border-[#DDD8CF] shadow-[0_20px_50px_rgba(0,71,55,0.06)] group-hover:shadow-[0_40px_100px_rgba(0,71,55,0.15)] transition-all duration-700 h-full flex flex-col">
                      
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.coverImage || project.cover_image || '/placeholder-project.png'}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        />
                        
                        {/* Status Overlay */}
                        <div className="absolute top-6 left-6">
                          <motion.span 
                            whileHover={{ scale: 1.05 }}
                            className={`px-5 py-2 rounded-2xl text-[9px] font-black font-syne uppercase tracking-widest shadow-xl backdrop-blur-md ${
                              project.status === 'Ready'
                                ? 'bg-[#C8F55A]/90 text-[#004737]'
                                : 'bg-[#004737]/80 text-[#C8F55A]'
                            }`}
                          >
                            {project.status}
                          </motion.span>
                        </div>

                        {/* Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#004737]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>

                      <div className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                           <MapPin className="w-3.5 h-3.5 text-[#004737] opacity-30" />
                           <span className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest">{project.location}</span>
                        </div>
                        
                        <h3 className="font-syne font-black text-2xl text-[#0D1B17] mb-2 uppercase tracking-tight group-hover:text-[#004737] transition-colors leading-tight">
                          {project.name}
                        </h3>
                        
                        <p className="text-xs font-inter text-[#7A9088] line-clamp-2 mb-8 opacity-60 leading-relaxed">
                           Elite luxury development featuring state-of-the-art architecture and premium lifestyle amenities.
                        </p>

                        <div className="mt-auto pt-6 border-t border-[#F5F0E8] flex items-end justify-between">
                          <div>
                            <div className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-1">Starting From</div>
                            <div className="text-2xl font-black text-[#004737] font-syne uppercase tracking-tight">
                              PKR {project.price_label || project.priceLabel}
                            </div>
                          </div>
                          <motion.div 
                            whileHover={{ x: 5 }}
                            className="w-12 h-12 rounded-2xl bg-[#F5F0E8] flex items-center justify-center group-hover:bg-[#004737] group-hover:text-[#C8F55A] transition-all duration-500"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
