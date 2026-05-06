import React from 'react'
import Link from 'next/link'
import { Landmark, Search, ChevronRight, ShieldCheck, ExternalLink, Info } from 'lucide-react'

const LandRecordsPage = () => {
  return (
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5 pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[9px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
            <Link href="/" className="hover:text-flecto-green transition-colors">Portfolio</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-flecto-green-light">Verified Land Registry</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-flecto-green font-syne tracking-tight mb-4">Official Registry Access</h1>
          <p className="text-base text-flecto-text-muted font-inter font-medium max-w-2xl">Access provincial databases to cryptographically verify asset ownership and regulatory compliance.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { province: 'Punjab', authority: 'PLRA', desc: 'Punjab Land Records Authority', url: 'https://www.punjab-zameen.gov.pk/' },
            { province: 'Sindh', authority: 'LARMIS', desc: 'Sindh Land Records Information System', url: 'https://sindhzameen.gos.pk/' },
            { province: 'Khyber Pakhtunkhwa', authority: 'ZAMEEN', desc: 'KP Land Records Management System', url: 'https://larmis.kp.gov.pk/' },
            { province: 'Balochistan', authority: 'LRMIS', desc: 'Balochistan Land Records Portal', url: 'http://balochistanlrmis.org/' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] border border-flecto-green/5 overflow-hidden shadow-2xl shadow-flecto-green/[0.03] hover:shadow-flecto-green/[0.08] hover:-translate-y-2 transition-all duration-700 group flex flex-col h-full relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-flecto-lime to-flecto-green" />
              <div className="p-8 flex flex-col flex-grow">
                <div className="w-14 h-14 rounded-2xl bg-flecto-cream flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Landmark className="w-6 h-6 text-flecto-green" />
                </div>
                <h3 className="text-2xl font-bold text-flecto-green mb-2 font-syne tracking-tight">{item.province}</h3>
                <p className="text-[10px] font-bold text-flecto-green-light uppercase tracking-widest mb-4 font-inter">{item.authority}</p>
                <p className="text-[11px] text-flecto-text-muted font-inter font-medium leading-relaxed mb-8 flex-grow">{item.desc}</p>
                
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-flecto-green text-flecto-cream text-[10px] font-bold rounded-full flex items-center justify-center gap-3 hover:bg-flecto-green-light transition-all duration-500 shadow-xl shadow-flecto-green/10 mt-auto font-syne uppercase tracking-widest"
                >
                  Query Database <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-flecto-green rounded-[3rem] p-10 sm:p-14 flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-flecto-green/30 relative overflow-hidden">
          <div className="relative z-10 w-20 h-20 rounded-3xl bg-flecto-lime flex items-center justify-center shrink-0 shadow-xl shadow-flecto-lime/20">
            <ShieldCheck className="w-10 h-10 text-flecto-green" />
          </div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-flecto-cream mb-4 font-syne tracking-tight">Due Diligence Protocol</h4>
            <p className="text-[11px] text-flecto-cream/70 font-inter font-medium leading-relaxed max-w-3xl">
              Verification of land titles is mandatory prior to capital deployment. Digital registries enable instantaneous querying of the 'Fard', historical chain of custody, and existing legal encumbrances. We advise cross-referencing digital outputs with physical municipal records for complete risk mitigation.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-flecto-lime/10 rounded-full blur-[60px]" />
        </div>
      </div>
    </div>
  )
}

export default LandRecordsPage
