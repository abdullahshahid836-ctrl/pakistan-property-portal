import RevealWrapper from '@/components/shared/RevealWrapper'

const PopularLocations = () => {
  const [activeType, setActiveType] = useState('Plots')
  const [activeCity, setActiveCity] = useState('Lahore')

  const types = ['Plots', 'Flats', 'Houses', 'Rent']
  const cities = ['Lahore', 'Karachi', 'Islamabad']

  return (
    <section className="bg-flecto-cream py-20 sm:py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealWrapper animation="fade-up">
          <SectionHeader 
            eyebrow="Market Trends"
            heading="Popular Locations"
            sub="Discover the most sought-after housing societies in Pakistan's major cities based on search volume and verified listings."
          />
        </RevealWrapper>

        {/* Filters */}
        <div className="flex flex-col items-center gap-6 mb-16">
          <RevealWrapper animation="fade-up" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={cn(
                    "px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 font-syne",
                    activeType === type 
                      ? "bg-flecto-green text-flecto-cream shadow-xl shadow-flecto-green/20" 
                      : "bg-white text-flecto-green border border-flecto-green/10 hover:bg-flecto-green/5"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </RevealWrapper>
          
          <RevealWrapper animation="fade-up" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={cn(
                    "px-6 py-2 text-[11px] font-bold rounded-full transition-all duration-300 border uppercase tracking-[0.2em] font-inter",
                    activeCity === city 
                      ? "bg-flecto-green-light text-white border-flecto-green-light" 
                      : "bg-white text-flecto-text-muted border-flecto-green/5 hover:border-flecto-green hover:text-flecto-green"
                  )}
                >
                  {city}
                </button>
              ))}
            </div>
          </RevealWrapper>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {cities.map((cityName, cityIdx) => {
            const city = locationsData.cities.find(c => c.name === cityName)
            if (!city) return null
            
            return (
              <RevealWrapper key={cityName} animation="fade-up" delay={0.3 + cityIdx * 0.1}>
                <div className="flecto-card bg-white p-8">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-flecto-green/5">
                    <h3 className="text-sm font-bold text-flecto-green uppercase tracking-[0.2em] font-syne">
                      {cityName} Societies
                    </h3>
                    <div className="w-2 h-2 bg-flecto-lime rounded-full" />
                  </div>

                  <div className="space-y-2">
                    {city.areas.slice(0, 8).map((area, idx) => {
                      const counts = [487, 312, 256, 198, 143, 421, 367, 275]
                      return (
                      <Link 
                        key={idx}
                        href={`/search?city=${cityName}&area=${area}&type=${activeType}`}
                        className="flex items-center justify-between py-3 px-4 rounded-xl group hover:bg-flecto-cream transition-all duration-300"
                      >
                        <span className="text-sm text-flecto-text-2 group-hover:text-flecto-green font-inter font-medium transition-colors">
                          {area}
                        </span>
                        <span className="text-[10px] font-bold text-flecto-text-muted bg-flecto-green/5 px-2.5 py-1 rounded-full group-hover:bg-flecto-lime group-hover:text-flecto-green transition-all">
                          {counts[idx % counts.length]}+
                        </span>
                      </Link>
                      )
                    })}
                  </div>

                  <Link href={`/search?city=${cityName}`} 
                    className="btn-lime w-full mt-8 py-4 text-xs">
                    View all in {cityName} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </RevealWrapper>
            )
          })}
        </div>

        {/* Popular Cities Sub-section */}
        <RevealWrapper animation="fade-up" delay={0.6}>
          <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold text-flecto-green mb-10 font-syne">
              Explore Major Hubs
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Lahore', count: '24k' },
                { name: 'Karachi', count: '12k' },
                { name: 'Islamabad', count: '9k' },
                { name: 'Rawalpindi', count: '4k' },
                { name: 'Multan', count: '2k' },
                { name: 'Faisalabad', count: '1k' },
                { name: 'Peshawar', count: '600' },
                { name: 'Gujranwala', count: '1k' }
              ].map((city, idx) => (
                <Link 
                  key={city.name} 
                  href={`/search?city=${city.name}`}
                  className="flex items-center gap-3 px-6 py-4 bg-white border border-flecto-green/5 rounded-2xl text-sm font-bold text-flecto-green hover:border-flecto-green hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group font-syne"
                >
                  <MapPin className="w-4 h-4 text-flecto-green/30 group-hover:text-flecto-lime transition-colors" />
                  {city.name}
                  <span className="text-[11px] text-flecto-text-muted group-hover:text-flecto-green font-inter font-bold">({city.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default PopularLocations
