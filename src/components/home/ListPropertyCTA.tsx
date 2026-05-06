import RevealWrapper from '@/components/shared/RevealWrapper'

const ListPropertyCTA = () => {
  return (
    <section className="bg-flecto-green py-24 sm:py-32 overflow-hidden relative z-10">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-flecto-lime/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-flecto-lime/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <RevealWrapper animation="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 text-flecto-lime border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] font-inter">
            <Check className="w-3.5 h-3.5" /> For Property Owners
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-flecto-cream mb-8 leading-[1.1] font-syne tracking-tight">
            List your property <br />
            <span className="text-flecto-lime italic">for free</span> and reach millions.
          </h2>
          
          <p className="text-lg sm:text-xl text-flecto-cream/70 mb-12 leading-relaxed max-w-3xl mx-auto font-inter">
            Join Pakistan's most trusted real estate network. List your home, apartment or plot in minutes and connect with verified buyers and tenants instantly.
          </p>
        </RevealWrapper>

        <RevealWrapper animation="fade-up" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/add-property"
              className="btn-lime px-10 py-5 text-sm group"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-500" />
              Add Your Property Now
            </Link>
            <Link 
              href="/agents"
              className="flex items-center justify-center gap-2 px-10 py-5 bg-white/10 text-flecto-cream text-sm font-bold rounded-full hover:bg-white/20 transition-all w-full sm:w-auto font-syne border border-white/10"
            >
              Find an Agent
            </Link>
          </div>
        </RevealWrapper>

        <RevealWrapper animation="fade-up" delay={0.4}>
          <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-6 text-flecto-cream/50 text-[10px] font-bold uppercase tracking-[0.2em] font-inter">
            <span className="flex items-center gap-2.5"><Check className="w-4 h-4 text-flecto-lime" /> 100% Free Listing</span>
            <span className="flex items-center gap-2.5"><Check className="w-4 h-4 text-flecto-lime" /> Verified Buyers</span>
            <span className="flex items-center gap-2.5"><Check className="w-4 h-4 text-flecto-lime" /> Expert Support</span>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}

export default ListPropertyCTA
