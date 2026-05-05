import React from 'react'
import Link from 'next/link'
import { Landmark, Search, ChevronRight, ShieldCheck, ExternalLink, Info } from 'lucide-react'

const LandRecordsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">
            <Link href="/" className="hover:text-[#1E6BFF]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#1A1A2E]">Online Land Records</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A2E] mb-4">Online Land Records Portal</h1>
          <p className="text-sm text-[#4A5568] max-w-2xl">Access official land ownership records and verify property documents from provincial authorities across Pakistan.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { province: 'Punjab', authority: 'PLRA', desc: 'Punjab Land Records Authority', color: 'bg-green-600', url: 'https://www.punjab-zameen.gov.pk/' },
            { province: 'Sindh', authority: 'LARMIS', desc: 'Sindh Land Records Information System', color: 'bg-blue-600', url: 'https://sindhzameen.gos.pk/' },
            { province: 'Khyber Pakhtunkhwa', authority: 'ZAMEEN', desc: 'KP Land Records Management System', color: 'bg-emerald-600', url: 'https://larmis.kp.gov.pk/' },
            { province: 'Balochistan', authority: 'LRMIS', desc: 'Balochistan Land Records Portal', color: 'bg-red-600', url: 'http://balochistanlrmis.org/' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className={cn("h-2 w-full", item.color)} />
              <div className="p-8">
                <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center mb-6">
                  <Landmark className="w-6 h-6 text-[#1A1A2E]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-1">{item.province}</h3>
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-4">{item.authority}</p>
                <p className="text-xs text-[#4A5568] leading-relaxed mb-8 h-10">{item.desc}</p>
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#1A1A2E] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all"
                >
                  Access Records <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-3xl border border-[#E5E7EB] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-[#1E6BFF]" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#1A1A2E] mb-2">Why Verify Land Records?</h4>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              Verifying land records is the most critical step in buying property in Pakistan. Online systems allow you to check the 'Fard', ownership history, and any existing encumbrances or stay orders on the land. Always cross-verify online data with the local Patwari or Registrar office before making payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default LandRecordsPage
