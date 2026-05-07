'use client'

import React from 'react'
import Link from 'next/link'
import { X, ChevronRight, Plus, Home, Building2, Map, Search, TrendingUp, BarChart2, Calculator, MapPin, MessageSquare, Users, BookOpen, LayoutDashboard, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#004737]/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#F5F0E8] z-[70] shadow-[24px_0_80px_rgba(0,0,0,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-[#DDD8CF]/50 shrink-0 bg-white">
              <Link href="/" className="flex items-center gap-3" onClick={onClose}>
                <div className="w-9 h-9 bg-[#004737] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-[#C8F55A] font-black text-base font-syne">P</span>
                </div>
                <div>
                  <div className="text-[11px] font-black font-syne text-[#0D1B17] tracking-tight leading-none uppercase">PAKISTAN</div>
                  <div className="text-[8px] font-black text-[#7A9088] tracking-widest leading-none mt-1 uppercase">Property Portal</div>
                </div>
              </Link>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center bg-[#F5F0E8] text-[#004737] rounded-xl hover:bg-[#004737] hover:text-[#C8F55A] transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-10">
              
              <section>
                <div className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] mb-6 ml-1">Asset Portfolios</div>
                <div className="grid grid-cols-1 gap-2">
                  <NavItem href="/homes" icon={<Home className="w-4 h-4" />} label="Homes for Sale" onClick={onClose} />
                  <NavItem href="/flats" icon={<Building2 className="w-4 h-4" />} label="Flats & Apartments" onClick={onClose} />
                  <NavItem href="/plots" icon={<Map className="w-4 h-4" />} label="Strategic Plots" onClick={onClose} />
                  <NavItem href="/rentals" icon={<Search className="w-4 h-4" />} label="Rental Assets" onClick={onClose} />
                  <NavItem href="/new-projects" icon={<TrendingUp className="w-4 h-4" />} label="New Developments" onClick={onClose} />
                </div>
              </section>
              
              <section>
                <div className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-[0.3em] mb-6 ml-1">Intelligence Suite</div>
                <div className="grid grid-cols-1 gap-2">
                  <NavItem href="/tools/home-loan-calculator" icon={<Calculator className="w-4 h-4" />} label="Loan Calculator" onClick={onClose} />
                  <NavItem href="/area-guides" icon={<MapPin className="w-4 h-4" />} label="Area Intelligence" onClick={onClose} />
                  <NavItem href="/blog" icon={<BookOpen className="w-4 h-4" />} label="Market Insights" onClick={onClose} />
                  <NavItem href="/forum" icon={<MessageSquare className="w-4 h-4" />} label="Community Hub" onClick={onClose} />
                  <NavItem href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="User Console" onClick={onClose} />
                </div>
              </section>

              <section className="pb-10">
                 <div className="bg-[#004737] rounded-[2rem] p-6 text-white relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                    <div className="relative z-10">
                       <h4 className="font-black font-syne text-lg uppercase tracking-tight mb-2">Monetize.</h4>
                       <p className="text-[10px] font-inter text-[#A8C4BB] mb-5 leading-relaxed font-medium">List your property in our premium ecosystem for free.</p>
                       <Link href="/add-property" onClick={onClose} className="flex items-center justify-center gap-2 w-full py-3 bg-[#C8F55A] text-[#004737] text-[10px] font-black font-syne uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-xl shadow-black/10">
                          <Plus className="w-4 h-4" /> Publish Listing
                       </Link>
                    </div>
                 </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#DDD8CF]/50 bg-white">
               <div className="flex items-center justify-between px-2">
                  <div className="flex gap-4">
                     <Users className="w-4 h-4 text-[#7A9088]" />
                     <Settings className="w-4 h-4 text-[#7A9088]" />
                  </div>
                  <span className="text-[8px] font-black font-syne text-[#7A9088] uppercase tracking-widest opacity-40">v2.4.0 FLECTO</span>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const NavItem = ({ href, icon, label, onClick }: { href: string, icon: React.ReactNode, label: string, onClick: () => void }) => (
  <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center justify-between px-4 py-4 text-[11px] font-black font-syne uppercase tracking-widest text-[#3D5249] hover:text-[#004737] hover:bg-white rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md border border-transparent hover:border-[#DDD8CF]/50"
    >
      <div className="flex items-center gap-4">
        <span className="text-[#7A9088] group-hover:text-[#004737] transition-colors">{icon}</span>
        {label}
      </div>
      <ChevronRight className="w-4 h-4 text-[#DDD8CF] group-hover:text-[#004737] transition-all transform group-hover:translate-x-1" />
    </Link>
  </motion.div>
)

export default MobileDrawer
