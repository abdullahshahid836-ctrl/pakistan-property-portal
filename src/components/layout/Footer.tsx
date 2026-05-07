'use client'

import React from 'react'
import Link from 'next/link'
import { MessageCircle as Facebook, Camera as Instagram, Briefcase as Linkedin, Send as X, Mail, Phone, MapPin, ArrowUpRight, Sparkles, Globe, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '@/components/shared/Reveal'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Homes', href: '/homes' },
        { name: 'Plots', href: '/plots' },
        { name: 'Commercial', href: '/commercial' },
        { name: 'Rentals', href: '/rentals' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Property Trends', href: '/trends' },
        { name: 'Market Intelligence', href: '/trends' },
        { name: 'Community Forum', href: '/forum' },
        { name: 'Area Guides', href: '/area-guides' },
      ]
    }
  ]

  return (
    <footer className="bg-[#004737] pt-32 pb-10 overflow-hidden relative border-t border-[#0A5A46] gpu-accelerated">
      {/* Background Decorative Patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          <Reveal direction="left">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-10 group">
                <div className="w-14 h-14 bg-[#C8F55A] rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                  <Home className="w-7 h-7 text-[#004737]" />
                </div>
                <span className="font-syne font-black text-3xl text-white uppercase tracking-tighter">
                   Pakistan <span className="text-[#C8F55A]">Property</span>
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-syne text-white uppercase tracking-tighter leading-[0.9] mb-10">
                Ready to find <br />
                <span className="text-[#C8F55A] italic">your next asset?</span>
              </h2>
              <div className="flex flex-wrap gap-4">
                <Link href="/add-property" className="px-10 py-5 bg-[#C8F55A] text-[#004737] rounded-2xl font-black font-syne uppercase tracking-widest text-xs hover:bg-white transition-all shadow-2xl shadow-[#C8F55A]/10">
                  LIST PROPERTY
                </Link>
                <Link href="/search" className="px-10 py-5 bg-white/10 text-white border border-white/10 rounded-2xl font-black font-syne uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                  BROWSE ALL
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h4 className="text-[#C8F55A] font-black font-syne text-[10px] uppercase tracking-[0.3em] mb-8">{section.title}</h4>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-[#A8C4BB] font-black font-syne text-[11px] uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group">
                          {link.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Global Connection Points */}
        <div className="py-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#C8F55A]">
               <Phone className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[9px] font-black font-syne text-[#A8C4BB] uppercase tracking-[0.3em]">Direct Protocol</p>
               <p className="text-sm font-black font-syne text-white uppercase tracking-tighter">+92 300 123 4567</p>
             </div>
           </div>
           <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#C8F55A]">
               <Mail className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[9px] font-black font-syne text-[#A8C4BB] uppercase tracking-[0.3em]">Official Channel</p>
               <p className="text-sm font-black font-syne text-white uppercase tracking-tighter">hello@official.pk</p>
             </div>
           </div>
           <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#C8F55A]">
               <MapPin className="w-5 h-5" />
             </div>
             <div>
               <p className="text-[9px] font-black font-syne text-[#A8C4BB] uppercase tracking-[0.3em]">Central Hub</p>
               <p className="text-sm font-black font-syne text-white uppercase tracking-tighter">DHA Phase 6, Lahore</p>
             </div>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
            {[
              { icon: Facebook, href: '#' },
              { icon: Instagram, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: X, href: '#' },
            ].map((social, i) => (
              <motion.a 
                key={i}
                whileHover={{ scale: 1.1, rotate: 10 }}
                href={social.href}
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-[#C8F55A] hover:text-[#004737] transition-all duration-500 shadow-xl"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <div className="text-center sm:text-right">
            <p className="text-[10px] font-black font-syne text-[#A8C4BB] uppercase tracking-[0.3em] opacity-40 mb-2">
              © {currentYear} PAKISTAN PROPERTY PORTAL. ALL RIGHTS RESERVED.
            </p>
            <div className="flex justify-center sm:justify-end gap-6">
              <Link href="/privacy" className="text-[9px] font-black font-syne text-[#A8C4BB] uppercase tracking-widest hover:text-[#C8F55A]">Privacy</Link>
              <Link href="/terms" className="text-[9px] font-black font-syne text-[#A8C4BB] uppercase tracking-widest hover:text-[#C8F55A]">Terms</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
