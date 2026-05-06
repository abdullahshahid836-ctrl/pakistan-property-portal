'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, Plus, X, Search, MapPin, Building2, Calculator, Home, Map, TrendingUp, ArrowLeftRight, BarChart2, Phone, Mail, MessageCircle, Heart, CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileDrawer from './MobileDrawer'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-[#E5E7EB] transition-all duration-200",
        scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.08)]" : ""
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#1E6BFF] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">P</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-[#1A1A2E] leading-none">
                PAKISTAN
              </div>
              <div className="text-[10px] text-[#9CA3AF] tracking-widest leading-none mt-0.5">
                PROPERTY PORTAL
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">

            {/* PROPERTIES dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#4A5568] hover:text-[#1E6BFF] rounded-lg hover:bg-[#F8F9FA] transition-all">
                Properties
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl border border-[#E5E7EB] shadow-[0_10px_40px_rgba(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {[
                    { label: 'Homes for Sale', href: '/homes' },
                    { label: 'Flats / Apartments', href: '/flats' },
                    { label: 'Plots', href: '/plots' },
                    { label: 'Commercial', href: '/commercial' },
                    { label: 'Rooms', href: '/rooms' },
                    { label: 'Rentals', href: '/rentals' },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      className="block px-3 py-2 text-sm text-[#4A5568] hover:text-[#1E6BFF] hover:bg-[#F8F9FA] rounded-lg transition-all">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct links */}
            <Link href="/plotfinder" className="px-3 py-2 text-sm font-medium text-[#4A5568] hover:text-[#1E6BFF] rounded-lg hover:bg-[#F8F9FA] transition-all">
              Plot Finder
            </Link>
            <Link href="/new-projects" className="px-3 py-2 text-sm font-medium text-[#4A5568] hover:text-[#1E6BFF] rounded-lg hover:bg-[#F8F9FA] transition-all">
              New Projects
            </Link>
            <Link href="/area-guides" className="px-3 py-2 text-sm font-medium text-[#4A5568] hover:text-[#1E6BFF] rounded-lg hover:bg-[#F8F9FA] transition-all">
              Area Guides
            </Link>
            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-[#4A5568] hover:text-[#1E6BFF] rounded-lg hover:bg-[#F8F9FA] transition-all">
              Blog
            </Link>

            {/* TOOLS dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#4A5568] hover:text-[#1E6BFF] rounded-lg hover:bg-[#F8F9FA] transition-all">
                Tools
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl border border-[#E5E7EB] shadow-[0_10px_40px_rgba(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {[
                    { label: 'Home Loan Calculator', href: '/tools/home-loan-calculator' },
                    { label: 'Area Unit Converter', href: '/tools/area-unit-converter' },
                    { label: 'Construction Cost', href: '/tools/construction-cost-calculator' },
                    { label: 'Land Records', href: '/tools/land-records' },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      className="block px-3 py-2 text-sm text-[#4A5568] hover:text-[#1E6BFF] hover:bg-[#F8F9FA] rounded-lg transition-all">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* MORE dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#4A5568] hover:text-[#1E6BFF] rounded-lg hover:bg-[#F8F9FA] transition-all">
                More
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-44 bg-white rounded-xl border border-[#E5E7EB] shadow-[0_10px_40px_rgba(0,0,0,0.12)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {[
                    { label: 'Maps', href: '/maps' },
                    { label: 'Forum', href: '/forum' },
                    { label: 'Property Index', href: '/property-index' },
                    { label: 'Trends', href: '/trends' },
                    { label: 'Agents', href: '/agents' },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      className="block px-3 py-2 text-sm text-[#4A5568] hover:text-[#1E6BFF] hover:bg-[#F8F9FA] rounded-lg transition-all">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#4A5568] border border-[#E5E7EB] rounded-lg hover:border-[#1E6BFF] hover:text-[#1E6BFF] transition-all">
              PKR
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#4A5568] border border-[#E5E7EB] rounded-lg hover:border-[#1E6BFF] hover:text-[#1E6BFF] transition-all">
              Marla
              <ChevronDown className="w-3 h-3" />
            </button>
            <Link href="/add-property"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1E6BFF] hover:bg-[#1554CC] rounded-lg shadow-sm transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Property</span>
            </Link>
            <button onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 text-[#4A5568] hover:text-[#1E6BFF] hover:bg-[#F8F9FA] rounded-lg transition-all">
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
