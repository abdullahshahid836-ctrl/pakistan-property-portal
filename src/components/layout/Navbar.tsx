'use client'
 
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ArrowRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Pages that have a light header background initially
  const isLightPage = pathname === '/about' || pathname?.startsWith('/blog') || pathname === '/contact'

  const navLinks = [
    { name: 'Properties', href: '/search' },
    { name: 'Projects', href: '/new-projects' },
    { name: 'Trends', href: '/trends' },
    { name: 'Forum', href: '/forum' },
  ]

  // Color scheme based on page type
  const textColor = isLightPage ? 'text-[#004737]' : 'text-white'
  const textMutedColor = isLightPage ? 'text-[#004737]/60' : 'text-white/80'
  const pillBg = isLightPage ? 'bg-[#004737]/5' : 'bg-white/10'
  const pillBorder = isLightPage ? 'border-[#004737]/10' : 'border-white/10'

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
      className="absolute top-0 left-0 right-0 z-50 py-6 sm:py-8 gpu-accelerated"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Left Side: Logo + Nav */}
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C8F55A] rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
               <Home className="w-5 h-5 text-[#004737]" />
            </div>
            <span className={cn("font-syne font-black text-xl sm:text-2xl uppercase tracking-tighter transition-colors", textColor)}>
              Pakistan <span className="text-[#004737] opacity-40">Property</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn("text-[11px] font-bold font-syne uppercase tracking-[0.2em] transition-colors relative group", textMutedColor, "hover:text-[#004737]")}
              >
                {link.name}
                <span className={cn("absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left", isLightPage ? "bg-[#004737]" : "bg-white")} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button className={cn("hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-300 text-[10px] font-bold font-syne uppercase tracking-widest", pillBg, pillBorder, textColor)}>
            EN <Globe className="w-3.5 h-3.5" />
          </button>

          {/* Book a Demo Style (List Asset) */}
          <Link href="/add-property" className={cn(
            "hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black font-syne uppercase tracking-widest transition-all duration-500 shadow-xl shadow-black/5",
            isLightPage ? "bg-white text-[#004737] border border-[#DDD8CF] hover:bg-[#004737] hover:text-white" : "bg-white text-[#004737] hover:bg-[#C8F55A]"
          )}>
             LIST ASSET <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Login Button */}
          <Link href="/login" className="px-8 py-2.5 rounded-full bg-[#C8F55A] text-[#004737] hover:bg-white text-[10px] font-black font-syne uppercase tracking-widest transition-all duration-500 shadow-xl shadow-[#C8F55A]/20">
             LOGIN
          </Link>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn("lg:hidden w-11 h-11 rounded-full flex items-center justify-center border", pillBg, pillBorder, textColor)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-[#004737]/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-8 z-50"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black font-syne text-white uppercase tracking-tighter hover:text-[#C8F55A] transition-colors">
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 bg-[#C8F55A] text-[#004737] rounded-2xl font-black font-syne uppercase tracking-widest text-xs flex items-center justify-center">
                  LOGIN / REGISTER
                </Link>
                <Link href="/add-property" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 bg-white text-[#004737] rounded-2xl font-black font-syne uppercase tracking-widest text-xs flex items-center justify-center">
                  LIST ASSET
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
