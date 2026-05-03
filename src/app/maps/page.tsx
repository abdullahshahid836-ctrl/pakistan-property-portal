import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Map, Download, Search, ChevronRight, Compass, ShieldCheck } from 'lucide-react'

const MapsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Society Maps</span>
          </div>
          <h1 className="text-3xl font-black text-[#1A1A2E] mb-2">Download Society Maps</h1>
          <p className="text-sm text-[#4A5568]">High-resolution, approved maps for all major residential societies in Pakistan.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-4">Select City</h3>
              <div className="space-y-2">
                {['All Cities', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan'].map((city, idx) => (
                  <button key={idx} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${idx === 0 ? 'bg-[#1E6BFF] text-white shadow-md' : 'text-[#4A5568] hover:bg-[#F8F9FA]'}`}>
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'DHA Lahore Phase 6', format: 'PDF', size: '2.4 MB' },
                { name: 'Bahria Town Karachi Precinct 1', format: 'JPG', size: '1.8 MB' },
                { name: 'DHA Islamabad Phase 2', format: 'PDF', size: '3.1 MB' },
                { name: 'Gulberg Residencia Block A', format: 'JPG', size: '1.2 MB' },
                { name: 'DHA City Karachi Sector 1', format: 'PDF', size: '4.5 MB' },
                { name: 'DHA Multan Sector A', format: 'PDF', size: '2.9 MB' },
              ].map((map, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-[#E5E7EB] p-6 hover:shadow-xl transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center group-hover:bg-[#EBF2FF] transition-colors">
                      <Map className="w-6 h-6 text-[#1E6BFF]" />
                    </div>
                    <div className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg border border-green-100 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Approved
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] mb-1">{map.name}</h3>
                  <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest mb-6">
                    {map.format} · {map.size}
                  </p>
                  <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#F8F9FA] text-[#1A1A2E] text-xs font-bold rounded-xl group-hover:bg-[#1E6BFF] group-hover:text-white transition-all">
                    <Download className="w-4 h-4" /> Download Map
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapsPage
