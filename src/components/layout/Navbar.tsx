'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, Plus, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import MobileDrawer from './MobileDrawer'

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Properties', dropdown: [
      { label: 'Homes for Sale', href: '/homes' },
      { label: 'Flats / Apartments', href: '/flats' },
      { label: 'Plots', href: '/plots' },
      { label: 'Commercial', href: '/commercial' },
      { label: 'Rooms', href: '/rooms' },
      { label: 'Rentals', href: '/rentals' },
    ]},
    { label: 'Plot Finder', href: '/plotfinder' },
    { label: 'New Projects', href: '/new-projects' },
    { label: 'Area Guides', href: '/area-guides' },
    { label: 'Tools', dropdown: [
      { label: 'Home Loan Calculator', href: '/tools/home-loan-calculator' },
      { label: 'Area Unit Converter', href: '/tools/area-unit-converter' },
      { label: 'Construction Cost', href: '/tools/construction-cost-calculator' },
      { label: 'Land Records', href: '/tools/land-records' },
    ]},
    { label: 'More', dropdown: [
      { label: 'Maps', href: '/maps' },
      { label: 'Forum', href: '/forum' },
      { label: 'Property Index', href: '/property-index' },
      { label: 'Trends', href: '/trends' },
      { label: 'Agents', href: '/agents' },
    ]}
  ]

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
          scrolled
            ? 'h-16 bg-[#F5F0E8]/80 backdrop-blur-xl border-b border-[#DDD8CF]/50 shadow-[0_8px_32px_rgba(0,71,55,0.05)]'
            : 'h-20 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 bg-[#004737] rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:shadow-[#004737]/20"
            >
              <span className="text-[#C8F55A] font-black text-lg font-syne">P</span>
            </motion.div>
            <div className="hidden sm:block">
              <div className="text-[13px] font-black font-syne text-[#0D1B17] tracking-tight leading-none">PAKISTAN</div>
              <div className="text-[9px] font-black text-[#7A9088] tracking-[0.2em] leading-none mt-1">PROPERTY PORTAL</div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, idx) => (
              <div key={idx} className="relative group">
                {link.dropdown ? (
                  <>
                    <button className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-black font-syne uppercase tracking-wider text-[#3D5249] hover:text-[#004737] rounded-xl transition-all duration-300 hover:bg-[#004737]/5">
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-40 group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-500 ease-out z-50">
                      <div className="w-56 bg-white rounded-[2rem] border border-[#DDD8CF] shadow-[0_24px_80px_rgba(0,71,55,0.12)] p-3 overflow-hidden">
                        {link.dropdown.map((item, i) => (
                          <Link key={i} href={item.href}
                            className="block px-4 py-3 text-[11px] font-black font-syne uppercase tracking-widest text-[#3D5249] hover:text-[#004737] hover:bg-[#F5F0E8] rounded-2xl transition-all duration-300"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={link.href!} className="relative px-4 py-2 text-[11px] font-black font-syne uppercase tracking-wider text-[#3D5249] hover:text-[#004737] rounded-xl transition-all duration-300 hover:bg-[#004737]/5">
                    {link.label}
                    <motion.div 
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#C8F55A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/add-property"
                className="flex items-center gap-2 px-6 py-3 text-[10px] font-black font-syne uppercase tracking-widest text-[#C8F55A] bg-[#004737] hover:bg-black rounded-2xl transition-all duration-500 shadow-xl shadow-[#004737]/10"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Property</span>
              </Link>
            </motion.div>
            
            <button 
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-12 h-12 flex items-center justify-center text-[#004737] hover:bg-[#004737]/5 rounded-2xl transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default Navbar
