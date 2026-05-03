import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Search, ChevronRight, BookOpen, Compass, Building2, Map } from 'lucide-react'

const AreaGuidesPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Hero */}
      <div className="bg-[#1A1A2E] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">Area Guides</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Everything you need to know about living, buying, and investing in Pakistan's top neighborhoods.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Search Area (e.g. DHA Phase 5, Bahria Karachi...)" 
              className="w-full h-14 pl-12 pr-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:bg-white focus:text-[#1A1A2E] text-white transition-all backdrop-blur-md"
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920" alt="Background" fill className="object-cover" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { city: 'Lahore', areas: ['DHA', 'Gulberg', 'Bahria Town', 'Model Town'], icon: Building2 },
            { city: 'Karachi', areas: ['Clifton', 'DHA', 'Gulshan-e-Iqbal', 'North Nazimabad'], icon: Building2 },
            { city: 'Islamabad', areas: ['E-7', 'F-6', 'G-11', 'Bahria Enclave'], icon: Building2 },
          ].map((city, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-[#E5E7EB] p-8 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] flex items-center justify-center mb-6 group-hover:bg-[#1E6BFF] transition-colors">
                <city.icon className="w-6 h-6 text-[#1E6BFF] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A2E] mb-4">{city.city} Guides</h3>
              <div className="space-y-3">
                {city.areas.map((area, aIdx) => (
                  <Link key={aIdx} href="#" className="flex items-center justify-between group/link">
                    <span className="text-sm text-[#4A5568] group-hover/link:text-[#1E6BFF] transition-colors">{area} Guide</span>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
              <button className="w-full mt-8 py-3 text-xs font-bold text-[#1E6BFF] border border-[#EBF2FF] rounded-xl hover:bg-[#EBF2FF] transition-all">
                View All {city.city} Guides
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AreaGuidesPage
