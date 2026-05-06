import React from 'react'
import Link from 'next/link'
import { Building2, Calculator, Home, Map, Search, TrendingUp, ArrowLeftRight, BarChart2 } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

const tools = [
  { 
    icon: Building2, 
    name: "New Projects", 
    desc: "Best investment opportunities", 
    href: "/new-projects" 
  },
  { 
    icon: Calculator, 
    name: "Construction Cost", 
    desc: "Get cost estimate", 
    href: "/tools/construction-cost-calculator" 
  },
  { 
    icon: Home, 
    name: "Home Loan", 
    desc: "Find loan packages", 
    href: "/tools/home-loan-calculator" 
  },
  { 
    icon: Map, 
    name: "Area Guides", 
    desc: "Explore housing societies", 
    href: "/area-guides" 
  },
  { 
    icon: Search, 
    name: "Plot Finder", 
    desc: "Find plots in any society", 
    href: "/plotfinder" 
  },
  { 
    icon: TrendingUp, 
    name: "Property Index", 
    desc: "Track price changes", 
    href: "/property-index" 
  },
  { 
    icon: ArrowLeftRight, 
    name: "Unit Converter", 
    desc: "Convert area units", 
    href: "/tools/area-unit-converter" 
  },
  { 
    icon: BarChart2, 
    name: "Trends", 
    desc: "Find popular areas", 
    href: "/trends" 
  },
]

const ExploreTools = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="EXPLORE"
          heading="Real Estate Tools"
          sub="Everything you need to make smart property decisions in Pakistan's dynamic market"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {tools.map((tool, idx) => (
            <Link 
              key={idx} 
              href={tool.href}
              className="group flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#1E6BFF]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EBF2FF] mb-4 flex items-center justify-center group-hover:bg-[#1E6BFF] transition-all duration-300">
                <tool.icon className="w-6 h-6 text-[#1E6BFF] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#1A1A2E] mb-1">
                {tool.name}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#9CA3AF] leading-relaxed">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreTools
