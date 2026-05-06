import RevealWrapper from '@/components/shared/RevealWrapper'

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
    <section className="bg-flecto-cream py-20 sm:py-24 lg:py-32 relative z-10 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-flecto-lime/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealWrapper animation="fade-up">
          <SectionHeader 
            eyebrow="Market Essentials"
            heading="Premium Real Estate Tools"
            sub="Empowering your property journey with data-driven insights and financial planning tools designed for the Pakistani market."
          />
        </RevealWrapper>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {tools.map((tool, idx) => (
            <RevealWrapper key={idx} animation="fade-up" delay={idx * 0.05}>
              <Link 
                href={tool.href}
                className="flecto-card group flex flex-col items-start p-8 h-full bg-white"
              >
                <div className="w-14 h-14 rounded-2xl bg-flecto-green/5 mb-6 flex items-center justify-center group-hover:bg-flecto-green transition-all duration-500 transform group-hover:rotate-6">
                  <tool.icon className="w-6 h-6 text-flecto-green group-hover:text-flecto-lime transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-flecto-green mb-2 font-syne">
                  {tool.name}
                </h3>
                <p className="text-sm text-flecto-text-muted leading-relaxed font-inter">
                  {tool.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-flecto-green font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Explore Now
                  <div className="w-4 h-4 rounded-full bg-flecto-lime flex items-center justify-center">
                    <span className="text-[10px]">→</span>
                  </div>
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
