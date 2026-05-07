'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Sparkles, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '@/components/shared/Reveal'

const Footer = () => {
  return (
    <footer className="bg-[#0D1B17] text-[#F5F0E8] pt-24 pb-12 relative overflow-hidden">
      
      {/* Cinematic Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C8F55A]/5 rounded-full blur-[150px] -mr-300 -mt-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Identity */}
          <Reveal direction="up" className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-[#C8F55A] rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <span className="text-[#004737] font-black text-xl font-syne">P</span>
              </div>
              <div>
                <div className="text-[12px] font-black font-syne text-white tracking-widest leading-none">PAKISTAN</div>
                <div className="text-[9px] font-black text-[#7A9088] tracking-[0.2em] leading-none mt-1 uppercase">Property Portal</div>
              </div>
            </Link>
            <p className="text-[#7A9088] text-sm leading-relaxed mb-8 font-inter font-medium opacity-80">
              The nation's most sophisticated real estate ecosystem, bridging the gap between elite assets and global investors.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.1 }}
                  href="#" 
                  className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#C8F55A] hover:bg-[#C8F55A] hover:text-[#004737] transition-all duration-500 shadow-xl"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </Reveal>

          {/* Strategic Navigation */}
          <Reveal direction="up" delay={0.2} className="lg:col-span-1">
            <h4 className="text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
               <Sparkles className="w-4 h-4" /> ASSET CLASSES
            </h4>
            <ul className="space-y-6">
              {[
                { label: 'HOMES FOR SALE', href: '/homes' },
                { label: 'FLATS & APARTMENTS', href: '/flats' },
                { label: 'DEVELOPMENT PLOTS', href: '/plots' },
                { label: 'COMMERCIAL ASSETS', href: '/commercial' },
                { label: 'RENTAL PORTFOLIO', href: '/rentals' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="group flex items-center gap-2 text-[10px] font-black font-syne text-[#7A9088] hover:text-white uppercase tracking-widest transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8F55A] scale-0 group-hover:scale-100 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Ecosystem Tools */}
          <Reveal direction="up" delay={0.4} className="lg:col-span-1">
            <h4 className="text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
               <Globe className="w-4 h-4" /> INTEL SUITE
            </h4>
            <ul className="space-y-6">
              {[
                { label: 'HOME LOAN CALCULATOR', href: '/tools/home-loan-calculator' },
                { label: 'UNIT CONVERSION ENGINE', href: '/tools/area-unit-converter' },
                { label: 'CONSTRUCTION COSTING', href: '/tools/construction-cost-calculator' },
                { label: 'LAND RECORD DATABASE', href: '/tools/land-records' },
                { label: 'MARKET TREND ANALYTICS', href: '/trends' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="group flex items-center gap-2 text-[10px] font-black font-syne text-[#7A9088] hover:text-white uppercase tracking-widest transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8F55A] scale-0 group-hover:scale-100 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Command Center */}
          <Reveal direction="up" delay={0.6} className="lg:col-span-1">
            <h4 className="text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.3em] mb-10">HEADQUARTERS</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#C8F55A]" />
                </div>
                <p className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-widest leading-relaxed">Elite Plaza, Sector G-11/3, <br />Islamabad, Pakistan</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C8F55A]" />
                </div>
                <p className="text-[10px] font-black font-syne text-white uppercase tracking-widest">+92 300 123 4567</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#C8F55A]" />
                </div>
                <p className="text-[10px] font-black font-syne text-white uppercase tracking-widest">OPS@PORTAL.PK</p>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Cinematic Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <Reveal direction="up">
            <p className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.4em] opacity-40">
              © 2026 PAKISTAN PROPERTY PORTAL. ALL RIGHTS RESERVED.
            </p>
          </Reveal>
          
          <Reveal direction="up" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { label: 'PRIVACY PROTOCOL', href: '/privacy' },
                { label: 'SERVICE TERMS', href: '/terms' },
                { label: 'ABOUT THE PORTAL', href: '/about' },
                { label: 'CONTACT HQ', href: '/contact' },
              ].map(item => (
                <Link key={item.label} href={item.href} className="text-[9px] font-black font-syne text-[#7A9088] hover:text-[#C8F55A] uppercase tracking-[0.2em] transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  )
}

export default Footer
