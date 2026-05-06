'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, ChevronRight, Building2, Calendar, TrendingUp,
  CheckCircle2, Phone, MessageSquare, Bed, Move, DollarSign,
  ChevronLeft, ChevronRight as ChevronRightIcon, Share2,
  Heart, ArrowLeft, Loader2, Star, Shield, Clock, Users
} from 'lucide-react'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

function ProjectDetailContent() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [inquiry, setInquiry] = useState({ name: '', phone: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/projects/${slug}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setProject(data)
      } catch (err) {
        console.error('Failed to fetch project:', err)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchProject()
  }, [slug])

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#1E6BFF] animate-spin mx-auto mb-4" />
          <p className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">Loading Project...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-[#9CA3AF]" />
          </div>
          <h1 className="text-2xl font-black text-[#1A1A2E] mb-2">Project Not Found</h1>
          <p className="text-sm text-[#9CA3AF] mb-6">This project may have been removed or the link is incorrect.</p>
          <Link href="/new-projects" className="px-6 py-3 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all">
            Browse All Projects
          </Link>
        </div>
      </div>
    )
  }

  const images = project.images?.length ? project.images : [project.coverImage || project.cover_image || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200']
  const statusColor = project.status === 'Under Construction' ? 'bg-orange-500' : project.status === 'Ready' ? 'bg-green-500' : 'bg-[#1E6BFF]'
  const units = (project as any).project_units || project.units || []

  return (
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      {/* Breadcrumb */}
      <div className="bg-flecto-cream border-b border-flecto-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">
            <Link href="/" className="hover:text-flecto-green transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            <Link href="/new-projects" className="hover:text-flecto-green transition-colors">New Projects</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
            <span className="text-flecto-green-light">{project.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT: Main Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Image Gallery */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-flecto-green/5 shadow-2xl shadow-flecto-green/[0.04]">
              <div className="relative h-96 sm:h-[500px] overflow-hidden">
                <Image
                  src={images[activeImage]}
                  alt={project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-all duration-1000 ease-out scale-100"
                  priority
                />
                {/* Status Badge */}
                <div className="absolute top-8 left-8">
                  <span className={cn("px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-flecto-cream rounded-full shadow-2xl backdrop-blur-md font-inter", statusColor === 'bg-orange-500' ? "bg-orange-500/90" : statusColor === 'bg-green-500' ? "bg-flecto-green/90" : "bg-flecto-green-light/90")}>
                    {project.status}
                  </span>
                </div>
                {/* Trending Badge */}
                {(project.isTrending || project.is_trending) && (
                  <div className="absolute top-8 right-8 bg-flecto-lime text-flecto-green px-5 py-2.5 text-[10px] font-bold rounded-full flex items-center gap-2 shadow-2xl font-inter uppercase tracking-widest">
                    <TrendingUp className="w-4 h-4" /> TRENDING
                  </div>
                )}
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-all duration-300 group"
                    >
                      <ChevronLeft className="w-6 h-6 text-flecto-green group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => setActiveImage(i => (i + 1) % images.length)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-all duration-300 group"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-flecto-green group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </>
                )}
                {/* Image Counter */}
                <div className="absolute bottom-8 right-8 bg-flecto-green/80 backdrop-blur-md text-flecto-cream text-[10px] font-bold px-4 py-2 rounded-full font-inter">
                  {activeImage + 1} / {images.length}
                </div>
              </div>
              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-4 p-6 overflow-x-auto bg-flecto-cream/30">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn("relative flex-shrink-0 w-24 h-16 rounded-[1rem] overflow-hidden border-2 transition-all duration-500", activeImage === idx ? "border-flecto-lime scale-105 shadow-xl" : "border-transparent opacity-60 hover:opacity-100")}
                    >
                      <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Header */}
            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-10 sm:p-14 shadow-2xl shadow-flecto-green/[0.04]">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-10">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-5xl font-bold text-flecto-green font-syne tracking-tight leading-tight">{project.name}</h1>
                  <div className="flex items-center gap-2 text-base text-flecto-text-muted font-inter font-medium">
                    <MapPin className="w-5 h-5 text-flecto-lime" />
                    {project.location}, {project.city}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsSaved(s => !s)}
                    className={cn("w-14 h-14 rounded-full border border-flecto-green/5 flex items-center justify-center transition-all duration-500 shadow-sm", isSaved ? "bg-red-50 text-red-500 border-red-100" : "bg-flecto-cream text-flecto-green-light hover:bg-white hover:border-flecto-lime")}
                  >
                    <Heart className={cn("w-6 h-6", isSaved ? "fill-red-500" : "")} />
                  </button>
                  <button className="w-14 h-14 rounded-full border border-flecto-green/5 bg-flecto-cream text-flecto-green-light flex items-center justify-center hover:bg-white hover:border-flecto-lime transition-all duration-500 shadow-sm">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-flecto-green/5">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">Starting From</p>
                  <p className="text-xl font-bold text-flecto-green font-syne">
                    <span className="text-xs mr-1 opacity-40 font-inter">PKR</span>
                    {project.price_label || project.priceLabel}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">Developer</p>
                  <p className="text-base font-bold text-flecto-green font-syne uppercase tracking-wider">{project.developer}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">Status</p>
                  <p className="text-base font-bold text-flecto-green-light font-syne uppercase tracking-wider">{project.status}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">Completion</p>
                  <p className="text-base font-bold text-flecto-green font-syne uppercase tracking-wider">{project.completion_date || project.completionDate || 'TBD'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-10 sm:p-14 shadow-2xl shadow-flecto-green/[0.04]">
              <h2 className="text-2xl font-bold text-flecto-green mb-6 font-syne uppercase tracking-tight">Visionary Outlook</h2>
              <p className="text-base text-flecto-text-muted leading-relaxed font-inter font-medium whitespace-pre-line">{project.description}</p>
            </div>

            {/* Unit Types */}
            {units.length > 0 && (
              <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-10 sm:p-14 shadow-2xl shadow-flecto-green/[0.04]">
                <h2 className="text-2xl font-bold text-flecto-green mb-8 font-syne uppercase tracking-tight">Configuration Options</h2>
                <div className="grid grid-cols-1 gap-4">
                  {units.map((unit: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-6 bg-flecto-cream rounded-[1.5rem] hover:bg-flecto-lime/5 border border-transparent hover:border-flecto-lime/20 transition-all duration-500 group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-flecto-green transition-all duration-500">
                          <Bed className="w-7 h-7 text-flecto-green-light group-hover:text-flecto-lime transition-all duration-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-flecto-green font-syne uppercase tracking-wider">{unit.unit_type || unit.type}</p>
                          <p className="text-xs font-bold text-flecto-text-muted uppercase tracking-widest font-inter">{unit.size}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-lg font-bold text-flecto-green font-syne">
                          <span className="text-[10px] mr-1 opacity-40 font-inter">PKR</span>
                          {unit.price}
                        </p>
                        <p className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">Premium Starting</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {project.amenities?.length > 0 && (
              <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-10 sm:p-14 shadow-2xl shadow-flecto-green/[0.04]">
                <h2 className="text-2xl font-bold text-flecto-green mb-8 font-syne uppercase tracking-tight">Lifestyle Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-5 bg-flecto-cream rounded-[1.25rem] border border-flecto-green/5 group hover:bg-white hover:border-flecto-lime/30 transition-all duration-500">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-flecto-green transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-flecto-lime group-hover:text-flecto-lime" />
                      </div>
                      <span className="text-sm font-bold text-flecto-green-light font-syne uppercase tracking-wider">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: Shield, label: "Verified Project", sub: "RERA Approved" },
                { icon: Star, label: "Premium Quality", sub: "Global Standards" },
                { icon: Clock, label: "Timely Delivery", sub: "Proven Track Record" },
              ].map(({ icon: Icon, label, sub }, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] border border-flecto-green/5 p-8 text-center shadow-2xl shadow-flecto-green/[0.03] group hover:border-flecto-lime/30 transition-all duration-500">
                  <div className="w-14 h-14 bg-flecto-cream rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-flecto-green transition-all duration-500">
                    <Icon className="w-6 h-6 text-flecto-green group-hover:text-flecto-lime transition-colors" />
                  </div>
                  <p className="text-xs font-bold text-flecto-green font-syne uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-widest font-inter">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-8">

            {/* Price Summary Card */}
            <div className="bg-flecto-green rounded-[2.5rem] p-10 text-flecto-cream shadow-2xl shadow-flecto-green/20 relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-flecto-cream/40 uppercase tracking-[0.2em] font-inter">Investment Horizon</p>
                  <p className="text-3xl font-bold font-syne">
                    <span className="text-xs mr-1 opacity-40 font-inter">PKR</span>
                    {project.price_label || project.priceLabel}
                  </p>
                  {(project.price_max || project.priceMax) && (
                    <p className="text-xs font-medium text-flecto-cream/60 font-inter">Scalable to PKR {(project.price_max || project.priceMax || 0).toLocaleString()}</p>
                  )}
                </div>

                {/* Inquiry Form */}
                {sent ? (
                  <div className="text-center py-10 bg-white/5 rounded-[2rem] backdrop-blur-md border border-white/10 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-flecto-lime rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-flecto-lime/40">
                      <CheckCircle2 className="w-10 h-10 text-flecto-green" />
                    </div>
                    <p className="text-xl font-bold font-syne uppercase tracking-tight mb-2">Request Lodged</p>
                    <p className="text-xs font-medium text-flecto-cream/60 font-inter px-6">Our senior advisors will connect within the business cycle.</p>
                    <button 
                      onClick={() => setSent(false)}
                      className="mt-6 text-[10px] font-bold text-flecto-lime uppercase tracking-[0.2em] hover:underline"
                    >
                      New Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquiry} className="space-y-4">
                    <h3 className="text-sm font-bold font-syne uppercase tracking-[0.2em] mb-6 text-flecto-lime">Request Prospectus</h3>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={inquiry.name}
                      onChange={e => setInquiry(i => ({...i, name: e.target.value}))}
                      required
                      className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-sm font-inter focus:bg-white/10 focus:border-flecto-lime/50 outline-none transition-all placeholder:text-white/20"
                    />
                    <input
                      type="tel"
                      placeholder="Verified Contact Number"
                      value={inquiry.phone}
                      onChange={e => setInquiry(i => ({...i, phone: e.target.value}))}
                      required
                      className="w-full h-14 px-6 bg-white/5 border border-white/10 rounded-2xl text-sm font-inter focus:bg-white/10 focus:border-flecto-lime/50 outline-none transition-all placeholder:text-white/20"
                    />
                    <textarea
                      placeholder="Specific requirements or questions..."
                      rows={4}
                      value={inquiry.message}
                      onChange={e => setInquiry(i => ({...i, message: e.target.value}))}
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-sm font-inter focus:bg-white/10 focus:border-flecto-lime/50 outline-none transition-all placeholder:text-white/20 resize-none"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full h-14 bg-flecto-lime text-flecto-green text-xs font-bold rounded-full hover:bg-white hover:scale-[1.02] transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 font-syne uppercase tracking-widest shadow-2xl shadow-flecto-lime/20"
                    >
                      {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                      {sending ? 'Processing...' : 'Engage Advisor'}
                    </button>
                    <a
                      href={`https://wa.me/923001234567?text=Hi, I'm interested in the ${project.name} project.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-14 bg-white/10 text-white text-xs font-bold rounded-full hover:bg-white/20 transition-all duration-500 flex items-center justify-center gap-3 font-syne uppercase tracking-widest border border-white/10"
                    >
                      <Phone className="w-4 h-4" />
                      Direct Access
                    </a>
                  </form>
                )}
              </div>
              {/* Abstract pattern bg */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-flecto-lime/10 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-flecto-green-light/10 rounded-full blur-[100px] -ml-32 -mb-32" />
            </div>

            {/* Developer Info */}
            <div className="bg-white rounded-[2.5rem] border border-flecto-green/5 p-10 shadow-2xl shadow-flecto-green/[0.03] group hover:border-flecto-lime/30 transition-all duration-500">
              <h3 className="text-xs font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-8 font-inter">Project Architect</h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-flecto-cream rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-flecto-green transition-all duration-500">
                  <Building2 className="w-8 h-8 text-flecto-green group-hover:text-flecto-lime transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-flecto-green text-lg font-syne uppercase tracking-wider leading-tight">{project.developer}</p>
                  <p className="text-[10px] font-bold text-flecto-green-light uppercase tracking-widest font-inter">Certified Developer</p>
                </div>
              </div>
              <div className="bg-flecto-lime/5 rounded-2xl p-5 border border-flecto-lime/10">
                <div className="flex items-center gap-3 text-[10px] font-bold text-flecto-green font-inter uppercase tracking-[0.1em]">
                  <Shield className="w-4 h-4 text-flecto-green-light" />
                  Verified Portfolio Standards
                </div>
              </div>
            </div>

            {/* Back Link */}
            <Link
              href="/new-projects"
              className="flex items-center justify-center gap-3 py-6 text-xs font-bold text-flecto-green-light hover:text-flecto-green transition-all duration-500 font-syne uppercase tracking-[0.2em] group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-flecto-cream flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin" />
        <p className="text-sm font-bold text-flecto-green font-syne uppercase tracking-widest">Securing Connection...</p>
      </div>
    }>
      <ProjectDetailContent />
    </Suspense>
  )
}
