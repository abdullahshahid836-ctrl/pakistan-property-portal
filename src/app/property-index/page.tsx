import React from 'react'
import Link from 'next/link'
import { Building2, Home, Building, Warehouse, Map, Search, ChevronRight } from 'lucide-react'

const PropertyIndexPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-black text-[#1A1A2E] mb-2">Property Index</h1>
          <p className="text-sm text-[#4A5568]">A comprehensive directory of residential and commercial property types in Pakistan.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Residential', icon: Home, count: '45,230', links: [
              { label: 'Houses', slug: 'House' }, 
              { label: 'Flats', slug: 'Flat' }, 
              { label: 'Lower Portions', slug: 'Lower Portion' }, 
              { label: 'Upper Portions', slug: 'Upper Portion' }, 
              { label: 'Farm Houses', slug: 'Farm House' }, 
              { label: 'Rooms', slug: 'Room' }
            ] },
            { title: 'Plots', icon: Map, count: '12,850', links: [
              { label: 'Residential Plots', slug: 'Plot' }, 
              { label: 'Commercial Plots', slug: 'Commercial Plot' }, 
              { label: 'Plot Files', slug: 'Plot File' }, 
              { label: 'Industrial Plots', slug: 'Industrial Plot' }, 
              { label: 'Agricultural Land', slug: 'Agricultural Land' }
            ] },
            { title: 'Commercial', icon: Building, count: '8,420', links: [
              { label: 'Offices', slug: 'Office' }, 
              { label: 'Shops', slug: 'Shop' }, 
              { label: 'Warehouses', slug: 'Warehouse' }, 
              { label: 'Factories', slug: 'Factory' }, 
              { label: 'Buildings', slug: 'Building' }
            ] },
          ].map((cat, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-[#E5E7EB] p-8 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] flex items-center justify-center">
                  <cat.icon className="w-6 h-6 text-[#1E6BFF]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A2E]">{cat.title}</h2>
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{cat.count} Listings</p>
                </div>
              </div>
              <div className="space-y-3">
                {cat.links.map((link, lIdx) => (
                  <Link 
                    key={lIdx} 
                    href={`/search?type=${encodeURIComponent(link.slug)}`} 
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm text-[#4A5568] group-hover:text-[#1E6BFF] transition-colors">{link.label}</span>
                    <ChevronRight className="w-3 h-3 text-[#9CA3AF] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PropertyIndexPage
