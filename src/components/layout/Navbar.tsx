'use client'
 
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar, ArrowRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isAboutPage = pathname === '/about'
  
  const navLinks = [
    { name: 'Properties', href: '/search' },
    { name: 'Projects', href: '/new-projects' },
    { name: 'Trends', href: '/trends' },
    { name: 'Forum', href: '/forum' },
  ]

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any
      }
    }
  }

  return (
    <motion.nav 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="absolute top-0 left-0 right-0 z-50 py-6 sm:py-8 gpu-accelerated"
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Left Side: Logo (or About Link) + Nav */}
        <div className="flex items-center gap-12">
          <motion.div variants={itemVariants}>
            {isAboutPage ? (
              <Link href="/about" className="font-syne font-black text-xl text-white uppercase tracking-tighter relative group">
                About
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white scale-x-100" />
              </Link>
            ) : (
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C8F55A] rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                   <Home className="w-5 h-5 text-[#004737]" />
                </div>
                <span className="font-syne font-black text-xl sm:text-2xl uppercase tracking-tighter transition-colors text-white">
                  Pakistan <span className="text-white opacity-40">Property</span>
                </span>
              </Link>
            )}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={itemVariants}>
                <Link 
                  href={link.href}
                  className="text-[11px] font-bold font-syne uppercase tracking-[0.2em] transition-colors relative group text-white/80 hover:text-white"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-white" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3">
          {/* List Asset (Book a Demo Style) */}
          <motion.div variants={itemVariants}>
            <Link href="/add-property" className="hidden sm:flex items-center gap-3 px-6 py-2.5 rounded-full text-[10px] font-black font-syne uppercase tracking-widest transition-all duration-500 shadow-xl shadow-black/5 bg-[#D1FAE5] text-[#004737] hover:bg-white">
               <Calendar className="w-4 h-4" /> LIST ASSET
            </Link>
          </motion.div>

          {/* Login Button */}
          <motion.div variants={itemVariants}>
            <Link href="/login" className="px-8 py-2.5 rounded-full bg-[#56F09F] text-[#004737] hover:bg-white text-[10px] font-black font-syne uppercase tracking-widest transition-all duration-500 shadow-xl shadow-[#56F09F]/20">
               LOGIN
            </Link>
          </motion.div>

          {/* Mobile Toggle */}
          <motion.button 
            variants={itemVariants}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center border bg-white/10 border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
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
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 bg-[#56F09F] text-[#004737] rounded-2xl font-black font-syne uppercase tracking-widest text-xs flex items-center justify-center">
                  LOGIN / REGISTER
                </Link>
                <Link href="/add-property" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 bg-[#D1FAE5] text-[#004737] rounded-2xl font-black font-syne uppercase tracking-widest text-xs flex items-center justify-center">
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
