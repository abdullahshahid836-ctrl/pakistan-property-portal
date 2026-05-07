import React from 'react'
import Link from 'next/link'
import { Building2, Calculator, Home, Map, Search, TrendingUp, ArrowLeftRight, BarChart2, ArrowRight } from 'lucide-react'
import { RevealWrapper } from '@/components/shared/RevealWrapper'

const tools = [
  { icon: Building2,    name: 'New Projects',     desc: 'Best investment opportunities',     href: '/new-projects' },
  { icon: Calculator,   name: 'Construction Cost', desc: 'Get cost estimate',                href: '/tools/construction-cost-calculator' },
  { icon: Home,         name: 'Home Loan',         desc: 'Find loan packages',               href: '/tools/home-loan-calculator' },
  { icon: Map,          name: 'Area Guides',       desc: 'Explore housing societies',        href: '/area-guides' },
  { icon: Search,       name: 'Plot Finder',       desc: 'Find plots in any society',        href: '/plotfinder' },
  { icon: TrendingUp,   name: 'Property Index',    desc: 'Track price changes',              href: '/property-index' },
  { icon: ArrowLeftRight, name: 'Unit Converter',  desc: 'Convert area units',               href: '/tools/area-unit-converter' },
  { icon: BarChart2,    name: 'Trends',            desc: 'Find popular areas',               href: '/trends' },
]

const ExploreTools = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F0E8] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <RevealWrapper className="text-center mb-12">
          <span className="pill-label">EXPLORE</span>
          <h2 className="font-syne font-bold text-4xl lg:text-5xl text-[#0D1B17] mt-4">
            Real Estate Tools
          </h2>
          <p className="text-[#3D5249] text-base mt-4 max-w-xl mx-auto font-inter leading-relaxed">
            Everything you need to make smart property decisions in Pakistan's dynamic market
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 stagger-children">
          {tools.map((tool, i) => (
            <RevealWrapper key={tool.href} delay={i * 60} direction="scale">
              <Link href={tool.href}
                className="group block bg-white rounded-2xl p-5 border border-[#DDD8CF] shadow-[0_2px_8px_rgba(0,71,55,0.04)] hover:shadow-[0_16px_40px_rgba(0,71,55,0.12)] hover:-translate-y-1 hover:border-[#004737]/20 transition-all duration-300">

                <div className="w-12 h-12 rounded-2xl bg-[#004737] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <tool.icon className="w-6 h-6 text-[#C8F55A]" />
                </div>

                <div className="font-syne font-bold text-sm text-[#0D1B17] mb-1">
                  {tool.name}
                </div>
                <div className="text-xs text-[#7A9088] font-inter leading-relaxed">
                  {tool.desc}
                </div>

                <div className="flex items-center gap-1 mt-3 text-xs font-semibold font-syne text-[#004737] opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-200">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreTools
