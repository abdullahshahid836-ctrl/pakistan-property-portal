import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Map, Search, MapPin, ChevronRight, Filter, Compass, Building2, Grid } from 'lucide-react'
import { cn } from '@/lib/utils'

const PlotFinderPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Plot Finder</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A2E]">Plot Finder & Society Maps</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] p-4 mb-10 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Search Society (e.g. DHA Phase 6, Bahria Town...)" 
              className="w-full h-12 pl-12 pr-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#1E6BFF] text-sm"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none h-12 px-6 bg-white border border-[#E5E7EB] rounded-2xl text-sm font-bold text-[#4A5568] flex items-center justify-center gap-2 hover:border-[#1E6BFF] hover:text-[#1E6BFF] transition-all">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex-1 md:flex-none h-12 px-8 bg-[#1E6BFF] text-white text-sm font-bold rounded-2xl hover:bg-[#1554CC] transition-all shadow-lg shadow-blue-200">
              Find Plots
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content: Featured Societies */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-lg font-bold text-[#1A1A2E] flex items-center gap-2">
              <Map className="w-5 h-5 text-[#1E6BFF]" /> Featured Society Maps
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'DHA Phase 6', city: 'Lahore', plots: '1,240+', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800' },
                { name: 'Bahria Town Phase 8', city: 'Rawalpindi', plots: '2,100+', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' },
                { name: 'Gulberg Residencia', city: 'Islamabad', plots: '850+', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
                { name: 'DHA City', city: 'Karachi', plots: '3,400+', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
              ].map((society, idx) => (
                <div key={idx} className="group bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={society.image} alt={society.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-bold text-lg">{society.name}</h3>
                      <p className="text-white/80 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {society.city}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-widest block mb-1">Available Plots</span>
                      <span className="text-sm font-bold text-[#1A1A2E]">{society.plots} Listings</span>
                    </div>
                    <button className="px-4 py-2 bg-[#EBF2FF] text-[#1E6BFF] text-xs font-bold rounded-xl hover:bg-[#1E6BFF] hover:text-white transition-all">
                      View Map
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Plot Categories */}
            <div className="pt-10">
              <h2 className="text-lg font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                <Grid className="w-5 h-5 text-[#1E6BFF]" /> Browse by Plot Type
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: '5 Marla', icon: Building2 },
                  { label: '10 Marla', icon: Building2 },
                  { label: '1 Kanal', icon: Building2 },
                  { label: '2 Kanal', icon: Building2 },
                  { label: 'Commercial', icon: Building2 },
                  { label: 'Files', icon: Building2 },
                  { label: 'Industrial', icon: Building2 },
                  { label: 'Agricultural', icon: Building2 },
                ].map((type, idx) => (
                  <button key={idx} className="p-6 bg-white border border-[#E5E7EB] rounded-3xl hover:border-[#1E6BFF] hover:shadow-md transition-all group text-center">
                    <div className="w-10 h-10 rounded-2xl bg-[#F8F9FA] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#EBF2FF] transition-colors">
                      <type.icon className="w-5 h-5 text-[#4A5568] group-hover:text-[#1E6BFF]" />
                    </div>
                    <span className="text-sm font-bold text-[#1A1A2E]">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#1A1A2E] rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <Compass className="w-10 h-10 text-[#1E6BFF] mb-4 group-hover:rotate-45 transition-transform duration-700" />
                <h3 className="text-xl font-bold mb-2">Need a Plot Map?</h3>
                <p className="text-xs text-white/50 mb-6 leading-relaxed">
                  Download high-resolution maps for all major societies in Pakistan.
                </p>
                <button className="w-full py-3 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl hover:bg-[#1554CC] transition-all">
                  Browse Maps
                </button>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1E6BFF]/10 rounded-full blur-3xl" />
            </div>

            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-6">Popular Locations</h3>
              <div className="space-y-4">
                {['DHA Lahore', 'Bahria Town Karachi', 'Gulberg Islamabad', 'DHA Multan', 'Citi Housing'].map((loc, idx) => (
                  <Link key={idx} href="#" className="flex items-center justify-between group">
                    <span className="text-xs font-medium text-[#4A5568] group-hover:text-[#1E6BFF] transition-colors">{loc}</span>
                    <ChevronRight className="w-3 h-3 text-[#9CA3AF] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PlotFinderPage
