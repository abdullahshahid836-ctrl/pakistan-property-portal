'use client'

import React from 'react'
import Link from 'next/link'
import { X, ChevronRight, Plus, Home, Building2, Map, Search, TrendingUp, BarChart2, Calculator, MapPin, MessageSquare, Users, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        "fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-[4px_0_20px_rgba(0,0,0,0.15)] transform transition-transform duration-300 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E7EB] shrink-0">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 bg-[#1E6BFF] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">P</span>
            </div>
            <div className="text-xs font-bold text-[#1A1A2E] leading-none">
              PAKISTAN PROPERTY
            </div>
          </Link>
          <button onClick={onClose} className="p-2 text-[#4A5568] hover:bg-[#F8F9FA] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-4 py-2 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">
            Main Menu
          </div>
          
          <NavItem href="/homes" icon={<Home className="w-4 h-4" />} label="Homes for Sale" onClick={onClose} />
          <NavItem href="/flats" icon={<Building2 className="w-4 h-4" />} label="Flats & Apartments" onClick={onClose} />
          <NavItem href="/plots" icon={<Map className="w-4 h-4" />} label="Plots for Sale" onClick={onClose} />
          <NavItem href="/rentals" icon={<Search className="w-4 h-4" />} label="Properties for Rent" onClick={onClose} />
          <NavItem href="/new-projects" icon={<TrendingUp className="w-4 h-4" />} label="New Projects" onClick={onClose} />
          
          <div className="px-4 py-4 mt-2 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider border-t border-[#F3F4F6]">
            Tools & Resources
          </div>
          
          <NavItem href="/tools/home-loan-calculator" icon={<Calculator className="w-4 h-4" />} label="Home Loan Calculator" onClick={onClose} />
          <NavItem href="/area-guides" icon={<MapPin className="w-4 h-4" />} label="Area Guides" onClick={onClose} />
          <NavItem href="/blog" icon={<BookOpen className="w-4 h-4" />} label="Real Estate Blog" onClick={onClose} />
          <NavItem href="/forum" icon={<MessageSquare className="w-4 h-4" />} label="Community Forum" onClick={onClose} />
          <NavItem href="/agents" icon={<Users className="w-4 h-4" />} label="Find Agents" onClick={onClose} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5E7EB]">
          <Link 
            href="/add-property"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#1E6BFF] text-white text-sm font-bold rounded-xl shadow-sm hover:bg-[#1554CC] transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Property Free
          </Link>
        </div>
      </div>
    </>
  )
}

const NavItem = ({ href, icon, label, onClick }: { href: string, icon: React.ReactNode, label: string, onClick: () => void }) => (
  <Link 
    href={href} 
    onClick={onClick}
    className="flex items-center justify-between px-4 py-3.5 text-sm font-medium text-[#4A5568] hover:text-[#1E6BFF] hover:bg-[#F8F9FA] transition-all group"
  >
    <div className="flex items-center gap-3">
      <span className="text-[#9CA3AF] group-hover:text-[#1E6BFF] transition-colors">{icon}</span>
      {label}
    </div>
    <ChevronRight className="w-4 h-4 text-[#E5E7EB] group-hover:text-[#1E6BFF] transition-colors" />
  </Link>
)

export default MobileDrawer
