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
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/new-projects" className="hover:text-[#1E6BFF]">New Projects</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">{project.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Image Gallery */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm">
              <div className="relative h-80 sm:h-[440px] overflow-hidden">
                <Image
                  src={images[activeImage]}
                  alt={project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-all duration-700"
                  priority
                />
                {/* Status Badge */}
                <div className="absolute top-5 left-5">
                  <span className={cn("px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-xl shadow-lg", statusColor)}>
                    {project.status}
                  </span>
                </div>
                {/* Trending Badge */}
                {(project.isTrending || project.is_trending) && (
                  <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-[#1E6BFF] px-3 py-1 text-[10px] font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
                    <TrendingUp className="w-3 h-3" /> TRENDING
                  </div>
                )}
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImage(i => (i - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#1A1A2E]" />
                    </button>
                    <button
                      onClick={() => setActiveImage(i => (i + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                    >
                      <ChevronRightIcon className="w-5 h-5 text-[#1A1A2E]" />
                    </button>
                  </>
                )}
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-lg">
                  {activeImage + 1} / {images.length}
                </div>
              </div>
              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn("relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all", activeImage === idx ? "border-[#1E6BFF]" : "border-transparent")}
                    >
                      <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Header */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A2E] mb-2">{project.name}</h1>
                  <div className="flex items-center gap-1.5 text-sm text-[#9CA3AF]">
                    <MapPin className="w-4 h-4 text-[#1E6BFF]" />
                    {project.location}, {project.city}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsSaved(s => !s)}
                    className={cn("w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all", isSaved ? "border-red-500 bg-red-50" : "border-[#E5E7EB] hover:border-red-500")}
                  >
                    <Heart className={cn("w-4 h-4", isSaved ? "fill-red-500 text-red-500" : "text-[#9CA3AF]")} />
                  </button>
                  <button className="w-10 h-10 rounded-full border-2 border-[#E5E7EB] flex items-center justify-center hover:border-[#1E6BFF] transition-all">
                    <Share2 className="w-4 h-4 text-[#9CA3AF]" />
                  </button>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#F3F4F6]">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Starting From</p>
                  <p className="text-base font-black text-[#1E6BFF]">PKR {project.price_label || project.priceLabel}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Developer</p>
                  <p className="text-sm font-bold text-[#1A1A2E]">{project.developer}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-bold text-[#1A1A2E]">{project.status}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Completion</p>
                  <p className="text-sm font-bold text-[#1A1A2E]">{project.completion_date || project.completionDate || 'TBD'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm">
              <h2 className="text-lg font-black text-[#1A1A2E] mb-4">About This Project</h2>
              <p className="text-sm text-[#4A5568] leading-relaxed whitespace-pre-line">{project.description}</p>
            </div>

            {/* Unit Types */}
            {units.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm">
                <h2 className="text-lg font-black text-[#1A1A2E] mb-6">Available Units</h2>
                <div className="space-y-3">
                  {units.map((unit: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-2xl hover:bg-[#EBF2FF] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#1E6BFF] transition-colors">
                          <Bed className="w-4 h-4 text-[#1E6BFF] group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1A1A2E]">{unit.unit_type || unit.type}</p>
                          <p className="text-[10px] text-[#9CA3AF]">{unit.size}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#1E6BFF]">PKR {unit.price}</p>
                        <p className="text-[10px] text-[#9CA3AF]">Starting Price</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {project.amenities?.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm">
                <h2 className="text-lg font-black text-[#1A1A2E] mb-6">Amenities & Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-[#4A5568]">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: "Verified Project", sub: "RERA Approved" },
                { icon: Star, label: "Premium Quality", sub: "International Standards" },
                { icon: Clock, label: "On-Time Delivery", sub: "Track Record" },
              ].map(({ icon: Icon, label, sub }, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 text-center shadow-sm">
                  <div className="w-10 h-10 bg-[#EBF2FF] rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[#1E6BFF]" />
                  </div>
                  <p className="text-xs font-bold text-[#1A1A2E]">{label}</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="space-y-6">

            {/* Price Summary Card */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <div className="mb-6">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">Price Range</p>
                <p className="text-2xl font-black text-[#1E6BFF]">PKR {project.price_label || project.priceLabel}</p>
                {(project.price_max || project.priceMax) && (
                  <p className="text-sm text-[#9CA3AF] mt-0.5">Up to PKR {(project.price_max || project.priceMax || 0).toLocaleString()}</p>
                )}
              </div>

              {/* Inquiry Form */}
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                  </div>
                  <p className="font-bold text-[#1A1A2E] mb-1">Inquiry Sent!</p>
                  <p className="text-xs text-[#9CA3AF]">Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <h3 className="text-sm font-black text-[#1A1A2E] mb-4">Get More Details</h3>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={inquiry.name}
                    onChange={e => setInquiry(i => ({...i, name: e.target.value}))}
                    required
                    className="w-full h-11 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={inquiry.phone}
                    onChange={e => setInquiry(i => ({...i, phone: e.target.value}))}
                    required
                    className="w-full h-11 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    value={inquiry.email}
                    onChange={e => setInquiry(i => ({...i, email: e.target.value}))}
                    className="w-full h-11 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none"
                  />
                  <textarea
                    placeholder="Your message..."
                    rows={3}
                    value={inquiry.message}
                    onChange={e => setInquiry(i => ({...i, message: e.target.value}))}
                    className="w-full p-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm focus:border-[#1E6BFF] outline-none resize-none"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full h-12 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl hover:bg-[#1554CC] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                    {sending ? 'Sending...' : 'Send Inquiry'}
                  </button>
                  <a
                    href={`https://wa.me/923001234567?text=Hi, I'm interested in ${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </form>
              )}
            </div>

            {/* Developer Info */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-black text-[#1A1A2E] mb-4">Developer</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#EBF2FF] rounded-2xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#1E6BFF]" />
                </div>
                <div>
                  <p className="font-bold text-[#1A1A2E] text-sm">{project.developer}</p>
                  <p className="text-[10px] text-[#9CA3AF]">Verified Developer</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-50 rounded-xl p-3">
                <Shield className="w-3.5 h-3.5" />
                Trusted & Verified by Pakistan Property Portal
              </div>
            </div>

            {/* Back Link */}
            <Link
              href="/new-projects"
              className="flex items-center gap-2 text-sm font-bold text-[#1E6BFF] hover:text-[#1554CC] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Projects
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
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#1E6BFF] animate-spin" />
      </div>
    }>
      <ProjectDetailContent />
    </Suspense>
  )
}
