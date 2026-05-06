import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Globe, Share2, Users, Search, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#1A1A2E] text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand & Contact */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1E6BFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">P</span>
              </div>
              <div className="text-sm font-bold text-white leading-none">
                PAKISTAN PROPERTY
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              Pakistan's premier property portal, connecting buyers, sellers, and renters with the best real estate opportunities across the country.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-white/60">
                <Phone className="w-3.5 h-3.5 text-[#1E6BFF] shrink-0" />
                <span>+92-51-111-999-888</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/60">
                <Mail className="w-3.5 h-3.5 text-[#1E6BFF] shrink-0" />
                <span>info@pakistanproperty.pk</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-white/60">
                <MapPin className="w-3.5 h-3.5 text-[#1E6BFF] shrink-0" />
                <span>7th Floor, Blue Area, Islamabad</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              {[Globe, Share2, Users, Search, ExternalLink].map((Icon, idx) => (
                <a key={idx} href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#1E6BFF] flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Properties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Properties</h4>
            <div className="space-y-2">
              <FooterLink href="/homes" label="Homes for Sale" />
              <FooterLink href="/flats" label="Flats / Apartments" />
              <FooterLink href="/plots" label="Plots for Sale" />
              <FooterLink href="/commercial" label="Commercial" />
              <FooterLink href="/rentals" label="Rentals" />
              <FooterLink href="/new-projects" label="New Projects" />
            </div>
          </div>

          {/* Column 3 - Tools & Data */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Tools & Data</h4>
            <div className="space-y-2">
              <FooterLink href="/tools/home-loan-calculator" label="Home Loan Calculator" />
              <FooterLink href="/tools/area-unit-converter" label="Area Unit Converter" />
              <FooterLink href="/tools/construction-cost-calculator" label="Construction Cost" />
              <FooterLink href="/tools/land-records" label="Land Records" />
              <FooterLink href="/property-index" label="Property Index" />
              <FooterLink href="/trends" label="Trends" />
            </div>
          </div>

          {/* Column 4 - Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Explore</h4>
            <div className="space-y-2">
              <FooterLink href="/new-projects" label="New Projects" />
              <FooterLink href="/area-guides" label="Area Guides" />
              <FooterLink href="/plotfinder" label="Plot Finder" />
              <FooterLink href="/maps" label="Maps" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/forum" label="Forum" />
            </div>
          </div>

          {/* Column 5 - Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Company</h4>
            <div className="space-y-2">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/agents" label="Agents" />
              <FooterLink href="/contact" label="Contact" />
              <FooterLink href="/add-property" label="Add Property" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Use" />
            </div>
          </div>
        </div>

        {/* Browse by city */}
        <div className="border-t border-white/10 pt-6 mt-2">
          <div className="flex flex-wrap items-center gap-y-2">
            <span className="text-xs text-white/40 mr-3">Browse by City:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Quetta', 'Multan'].map(city => (
                <Link key={city} href={`/search?city=${city}`} className="text-xs text-white/60 hover:text-[#1E6BFF] transition-colors">
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © 2025 Pakistan Property Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white/60">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60">Terms of Use</Link>
            <span className="flex items-center gap-1 text-green-500/60">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Verified Portal
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, label }: { href: string, label: string }) => (
  <Link href={href} className="block text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-200 py-0.5">
    {label}
  </Link>
)

export default Footer
