import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Globe, Share2, Users, Search, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#0D1B17] text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">

        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">

          {/* Brand & Contact */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#004737] rounded-lg flex items-center justify-center">
                <span className="text-[#C8F55A] font-black text-sm font-syne">P</span>
              </div>
              <div className="text-sm font-bold font-syne text-[#F5F0E8] leading-none">
                PAKISTAN PROPERTY
              </div>
            </Link>
            <p className="text-sm font-inter text-[#7A9088] leading-relaxed mb-6 max-w-xs">
              Pakistan's premier property portal, connecting buyers, sellers, and renters with the best real estate opportunities across the country.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs font-inter text-[#7A9088]">
                <Phone className="w-3.5 h-3.5 text-[#C8F55A] shrink-0 mt-0.5" />
                <span>+92-51-111-999-888</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-inter text-[#7A9088]">
                <Mail className="w-3.5 h-3.5 text-[#C8F55A] shrink-0 mt-0.5" />
                <span>info@pakistanproperty.pk</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-inter text-[#7A9088]">
                <MapPin className="w-3.5 h-3.5 text-[#C8F55A] shrink-0 mt-0.5" />
                <span>7th Floor, Blue Area, Islamabad</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              {[Globe, Share2, Users, Search, ExternalLink].map((Icon, idx) => (
                <a key={idx} href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#004737] flex items-center justify-center transition-colors group">
                  <Icon className="w-4 h-4 text-[#7A9088] group-hover:text-[#C8F55A] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-xs font-black font-syne uppercase tracking-[0.15em] text-[#F5F0E8] mb-4">Properties</h4>
            <div className="space-y-1">
              <FooterLink href="/homes"        label="Homes for Sale" />
              <FooterLink href="/flats"        label="Flats / Apartments" />
              <FooterLink href="/plots"        label="Plots for Sale" />
              <FooterLink href="/commercial"   label="Commercial" />
              <FooterLink href="/rentals"      label="Rentals" />
              <FooterLink href="/new-projects" label="New Projects" />
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-xs font-black font-syne uppercase tracking-[0.15em] text-[#F5F0E8] mb-4">Tools & Data</h4>
            <div className="space-y-1">
              <FooterLink href="/tools/home-loan-calculator"         label="Home Loan Calculator" />
              <FooterLink href="/tools/area-unit-converter"          label="Area Unit Converter" />
              <FooterLink href="/tools/construction-cost-calculator" label="Construction Cost" />
              <FooterLink href="/tools/land-records"                 label="Land Records" />
              <FooterLink href="/property-index"                     label="Property Index" />
              <FooterLink href="/trends"                             label="Trends" />
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-black font-syne uppercase tracking-[0.15em] text-[#F5F0E8] mb-4">Explore</h4>
            <div className="space-y-1">
              <FooterLink href="/new-projects" label="New Projects" />
              <FooterLink href="/area-guides"  label="Area Guides" />
              <FooterLink href="/plotfinder"   label="Plot Finder" />
              <FooterLink href="/maps"         label="Maps" />
              <FooterLink href="/blog"         label="Blog" />
              <FooterLink href="/forum"        label="Forum" />
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-black font-syne uppercase tracking-[0.15em] text-[#F5F0E8] mb-4">Company</h4>
            <div className="space-y-1">
              <FooterLink href="/about"        label="About Us" />
              <FooterLink href="/agents"       label="Agents" />
              <FooterLink href="/contact"      label="Contact" />
              <FooterLink href="/add-property" label="Add Property" />
              <FooterLink href="/privacy"      label="Privacy Policy" />
              <FooterLink href="/terms"        label="Terms of Use" />
            </div>
          </div>
        </div>

        {/* Browse by city */}
        <div className="border-t border-white/5 pt-6 mt-2">
          <div className="flex flex-wrap items-center gap-y-2">
            <span className="text-xs font-inter text-[#7A9088]/60 mr-3">Browse by City:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Quetta', 'Multan'].map(city => (
                <Link key={city} href={`/search?city=${city}`}
                  className="text-xs font-inter text-[#7A9088] hover:text-[#C8F55A] transition-colors">
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-inter text-[#7A9088]/60">
            © 2025 Pakistan Property Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-inter text-[#7A9088]/60">
            <Link href="/privacy" className="hover:text-[#7A9088]">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-[#7A9088]">Terms of Use</Link>
            <span className="flex items-center gap-1 text-[#C8F55A]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F55A]" />
              Verified Portal
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href}
    className="block text-sm font-inter text-[#7A9088] hover:text-[#C8F55A] hover:translate-x-1 transition-all duration-200 py-0.5">
    {label}
  </Link>
)

export default Footer
