'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, Plus, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileDrawer from './MobileDrawer'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300',
        scrolled
          ? 'bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#DDD8CF] shadow-[0_1px_3px_rgba(0,71,55,0.08)]'
          : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#004737] rounded-lg flex items-center justify-center">
              <span className="text-[#C8F55A] font-black text-sm font-syne">P</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold font-syne text-[#0D1B17] leading-none">PAKISTAN</div>
              <div className="text-[10px] text-[#7A9088] tracking-widest leading-none mt-0.5">PROPERTY PORTAL</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">

            {/* PROPERTIES dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium font-inter text-[#3D5249] hover:text-[#004737] rounded-lg hover:bg-[#004737]/5 transition-all duration-200">
                Properties
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-2xl border border-[#DDD8CF] shadow-[0_16px_40px_rgba(0,71,55,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                {[
                  { label: 'Homes for Sale', href: '/homes' },
                  { label: 'Flats / Apartments', href: '/flats' },
                  { label: 'Plots', href: '/plots' },
                  { label: 'Commercial', href: '/commercial' },
                  { label: 'Rooms', href: '/rooms' },
                  { label: 'Rentals', href: '/rentals' },
                ].map(item => (
                  <Link key={item.href} href={item.href}
                    className="block px-3 py-2 text-sm font-inter text-[#3D5249] hover:text-[#004737] hover:bg-[#F5F0E8] rounded-xl transition-all">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/plotfinder" className="px-3 py-2 text-sm font-medium font-inter text-[#3D5249] hover:text-[#004737] rounded-lg hover:bg-[#004737]/5 transition-all">Plot Finder</Link>
            <Link href="/new-projects" className="px-3 py-2 text-sm font-medium font-inter text-[#3D5249] hover:text-[#004737] rounded-lg hover:bg-[#004737]/5 transition-all">New Projects</Link>
            <Link href="/area-guides" className="px-3 py-2 text-sm font-medium font-inter text-[#3D5249] hover:text-[#004737] rounded-lg hover:bg-[#004737]/5 transition-all">Area Guides</Link>
            <Link href="/blog" className="px-3 py-2 text-sm font-medium font-inter text-[#3D5249] hover:text-[#004737] rounded-lg hover:bg-[#004737]/5 transition-all">Blog</Link>

            {/* TOOLS dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium font-inter text-[#3D5249] hover:text-[#004737] rounded-lg hover:bg-[#004737]/5 transition-all duration-200">
                Tools
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl border border-[#DDD8CF] shadow-[0_16px_40px_rgba(0,71,55,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                {[
                  { label: 'Home Loan Calculator', href: '/tools/home-loan-calculator' },
                  { label: 'Area Unit Converter', href: '/tools/area-unit-converter' },
                  { label: 'Construction Cost', href: '/tools/construction-cost-calculator' },
                  { label: 'Land Records', href: '/tools/land-records' },
                ].map(item => (
                  <Link key={item.href} href={item.href}
                    className="block px-3 py-2 text-sm font-inter text-[#3D5249] hover:text-[#004737] hover:bg-[#F5F0E8] rounded-xl transition-all">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* MORE dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium font-inter text-[#3D5249] hover:text-[#004737] rounded-lg hover:bg-[#004737]/5 transition-all duration-200">
                More
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-44 bg-white rounded-2xl border border-[#DDD8CF] shadow-[0_16px_40px_rgba(0,71,55,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                {[
                  { label: 'Maps', href: '/maps' },
                  { label: 'Forum', href: '/forum' },
                  { label: 'Property Index', href: '/property-index' },
                  { label: 'Trends', href: '/trends' },
                  { label: 'Agents', href: '/agents' },
                ].map(item => (
                  <Link key={item.href} href={item.href}
                    className="block px-3 py-2 text-sm font-inter text-[#3D5249] hover:text-[#004737] hover:bg-[#F5F0E8] rounded-xl transition-all">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium font-inter text-[#3D5249] border border-[#DDD8CF] rounded-lg hover:border-[#004737] hover:text-[#004737] transition-all">
              PKR <ChevronDown className="w-3 h-3" />
            </button>
            <button className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium font-inter text-[#3D5249] border border-[#DDD8CF] rounded-lg hover:border-[#004737] hover:text-[#004737] transition-all">
              Marla <ChevronDown className="w-3 h-3" />
            </button>
            <Link href="/add-property"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold font-syne tracking-wide text-[#C8F55A] bg-[#004737] hover:bg-[#003329] rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,71,55,0.3)]">
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Property</span>
            </Link>
            <button onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 text-[#3D5249] hover:text-[#004737] hover:bg-[#004737]/5 rounded-lg transition-all">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default Navbar
