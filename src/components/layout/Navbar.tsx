'use client'
 
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, User, Home, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Properties', href: '/search' },
    { name: 'Projects', href: '/new-projects' },
    { name: 'Trends', href: '/trends' },
    { name: 'Forum', href: '/forum' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.22,1,0.36,1] gpu-accelerated',
        scrolled 
          ? 'py-4 px-4 sm:px-10' 
          : 'py-8 px-4 sm:px-16'
      )}
    >
      <div className={cn(
        "max-w-[1800px] mx-auto transition-all duration-500 ease-[0.22,1,0.36,1] rounded-[1.5rem] sm:rounded-[2rem] border flex items-center justify-between px-6 sm:px-8",
        scrolled 
          ? 'bg-white border-[#DDD8CF] shadow-[0_20px_50px_rgba(0,71,55,0.08)] h-14 sm:h-16' 
          : 'bg-[#004737] border-[#0A5A46] h-16 sm:h-20 shadow-2xl'
      )}>
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#004737] rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
             <Home className="w-5 h-5 text-[#C8F55A]" />
          </div>
          <span className={cn(
            "font-syne font-black text-lg sm:text-xl uppercase tracking-tighter transition-colors duration-500",
            scrolled ? "text-[#0D1B17]" : "text-[#F5F0E8]"
          )}>
            Pakistan <span className={scrolled ? "text-[#004737]" : "text-[#C8F55A]"}>Property</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "px-6 py-2 text-[10px] font-black font-syne uppercase tracking-widest rounded-full transition-all duration-500 relative group overflow-hidden",
                scrolled 
                  ? "text-[#3D5249] hover:text-[#004737] hover:bg-[#F5F0E8]" 
                  : "text-[#F5F0E8]/70 hover:text-white hover:bg-white/10"
              )}
            >
              {link.name}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8F55A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className={cn(
            "hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black font-syne uppercase tracking-widest transition-all duration-500 shadow-sm",
            scrolled 
              ? "bg-[#004737] text-[#C8F55A] hover:bg-black" 
              : "bg-[#F5F0E8] text-[#004737] hover:bg-[#C8F55A]"
          )}>
            <User className="w-4 h-4" /> LOGIN
          </Link>
          
          <Link href="/add-property" className={cn(
            "hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black font-syne uppercase tracking-widest border transition-all duration-500",
            scrolled
              ? "border-[#DDD8CF] text-[#0D1B17] hover:bg-[#F5F0E8]"
              : "border-white/20 text-white hover:bg-white/10"
          )}>
            LIST ASSET <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
              scrolled ? "bg-[#F5F0E8] text-[#004737]" : "bg-white/10 text-white"
            )}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Simplified integration) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 bg-white rounded-[2.5rem] border border-[#DDD8CF] shadow-2xl overflow-hidden p-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tighter">
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-[#F5F0E8] my-4" />
              <Link href="/login" className="w-full py-5 bg-[#004737] text-[#C8F55A] rounded-2xl font-black font-syne uppercase tracking-widest text-xs flex items-center justify-center">
                LOGIN / REGISTER
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
