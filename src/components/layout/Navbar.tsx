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
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Properties', href: '#', hasDropdown: true },
    { label: 'Plot Finder', href: '/plotfinder' },
    { label: 'New Projects', href: '/new-projects' },
    { label: 'Area Guides', href: '/area-guides' },
    { label: 'Tools', href: '#', hasDropdown: true },
    { label: 'More', href: '#', hasDropdown: true },
  ]

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 flex items-center",
        scrolled 
          ? "bg-flecto-cream/90 backdrop-blur-xl border-b border-flecto-green/10 shadow-sm" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 bg-flecto-green rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
              <span className="text-flecto-lime font-black text-xl font-syne">P</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-flecto-green leading-none font-syne tracking-tight">
                PAKISTAN
              </div>
              <div className="text-[10px] text-flecto-green/60 uppercase tracking-[0.2em] leading-none mt-1 font-inter font-semibold">
                Property Portal
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.hasDropdown ? (
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-flecto-green hover:text-flecto-green-light transition-all font-syne">
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                ) : (
                  <Link href={link.href} className="px-4 py-2 text-sm font-bold text-flecto-green hover:text-flecto-green-light transition-all font-syne">
                    {link.label}
                  </Link>
                )}
                
                {link.hasDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="p-2 bg-white rounded-2xl border border-flecto-green/5 shadow-2xl">
                      {/* Sub-menu items placeholder - keeping logic same but styling improved */}
                      <div className="space-y-1">
                        {link.label === 'Properties' && [
                          { label: 'Homes for Sale', href: '/homes' },
                          { label: 'Flats / Apartments', href: '/flats' },
                          { label: 'Plots', href: '/plots' },
                          { label: 'Commercial', href: '/commercial' },
                        ].map(sub => (
                          <Link key={sub.label} href={sub.href} className="block px-4 py-2.5 text-sm font-medium text-flecto-text-2 hover:bg-flecto-cream rounded-xl transition-colors">
                            {sub.label}
                          </Link>
                        ))}
                        {link.label === 'Tools' && [
                          { label: 'Home Loan Calculator', href: '/tools/home-loan-calculator' },
                          { label: 'Area Unit Converter', href: '/tools/area-unit-converter' },
                        ].map(sub => (
                          <Link key={sub.label} href={sub.href} className="block px-4 py-2.5 text-sm font-medium text-flecto-text-2 hover:bg-flecto-cream rounded-xl transition-colors">
                            {sub.label}
                          </Link>
                        ))}
                        {link.label === 'More' && [
                          { label: 'Agents', href: '/agents' },
                          { label: 'Blog', href: '/blog' },
                        ].map(sub => (
                          <Link key={sub.label} href={sub.href} className="block px-4 py-2.5 text-sm font-medium text-flecto-text-2 hover:bg-flecto-cream rounded-xl transition-colors">
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-flecto-green/5 rounded-full p-1 border border-flecto-green/5">
              <button className="px-3 py-1.5 text-[10px] font-bold text-flecto-green hover:bg-white rounded-full transition-all uppercase tracking-wider">
                PKR
              </button>
              <button className="px-3 py-1.5 text-[10px] font-bold text-flecto-green/40 hover:text-flecto-green rounded-full transition-all uppercase tracking-wider">
                USD
              </button>
            </div>
            
            <Link href="/add-property"
              className="btn-lime px-6 py-2.5 text-xs">
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Link>

            <button onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 text-flecto-green hover:bg-flecto-green/5 rounded-xl transition-all">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default Navbar
