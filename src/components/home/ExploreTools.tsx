'use client'

import React from 'react'
import Link from 'next/link'
import { Building2, Calculator, Home, Map, Search, TrendingUp, ArrowLeftRight, BarChart2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Reveal from '@/components/shared/Reveal'

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
    <section className="py-24 sm:py-32 bg-[#F5F0E8] relative z-10 overflow-hidden">
      {/* Decorative text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none">
         <h2 className="text-[20vw] font-black font-syne uppercase tracking-tighter whitespace-nowrap">PREMIUM TOOLS</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-20">
          <Reveal direction="down">
            <div className="flex justify-center mb-6">
               <span className="pill-label bg-white border-[#DDD8CF] text-[#004737] shadow-lg px-8 py-2">DIGITAL ECOSYSTEM</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-6xl lg:text-7xl text-[#0D1B17] uppercase tracking-tight leading-none">
              Intelligence <br />
              <span className="text-[#004737] italic">Suite.</span>
            </h2>
            <p className="text-[#3D5249] text-base sm:text-lg mt-8 max-w-xl mx-auto font-inter font-medium opacity-60 leading-relaxed">
              Empowering your real estate journey with high-precision analytical tools and market intelligence.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <Reveal key={tool.href} delay={i * 0.05} direction="scale">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <Link href={tool.href}
                  className="block bg-white rounded-[2rem] p-6 sm:p-8 border border-[#DDD8CF] shadow-[0_4px_12px_rgba(0,71,55,0.03)] hover:shadow-[0_32px_80px_rgba(0,71,55,0.12)] hover:border-[#004737]/20 transition-all duration-500 h-full overflow-hidden"
                >
                  {/* Glass background effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F0E8] rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#C8F55A]/20 transition-colors duration-700" />

                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      whileTap={{ rotate: 360 }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1] as any
                      }}
                      className="w-16 h-16 rounded-2xl bg-[#004737] flex items-center justify-center mb-8 shadow-xl shadow-[#004737]/10"
                    >
                      <tool.icon className="w-7 h-7 text-[#C8F55A]" />
                    </motion.div>

                    <h3 className="font-syne font-black text-lg sm:text-xl text-[#0D1B17] mb-2 uppercase tracking-tighter group-hover:text-[#004737] transition-colors leading-[1.1] break-words">
                      {tool.name}
                    </h3>
                    <p className="text-xs font-inter text-[#7A9088] leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                      {tool.desc}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-black font-syne text-[#004737] uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-500">
                      INITIALIZE <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExploreTools
