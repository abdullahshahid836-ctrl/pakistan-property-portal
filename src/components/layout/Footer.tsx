import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Globe, Share2, Users, Search, ExternalLink, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-flecto-green text-flecto-cream relative z-10 pt-20 sm:pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12 sm:gap-16 mb-20">
          
          {/* Brand & Contact */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 bg-flecto-lime rounded-xl flex items-center justify-center transform rotate-3">
                <span className="text-flecto-green font-black text-lg">P</span>
              </div>
              <div className="text-base font-bold text-flecto-cream leading-tight font-syne tracking-tight">
                PAKISTAN <br />
                PROPERTY
              </div>
            </Link>
            <p className="text-sm text-flecto-cream/60 leading-relaxed mb-10 max-w-xs font-inter font-medium">
              Empowering your property journey with premium data-driven insights and the most trusted network in Pakistan.
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3 text-sm text-flecto-cream/60 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-flecto-lime group-hover:text-flecto-green transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="pt-1">+92-51-111-999-888</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-flecto-cream/60 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-flecto-lime group-hover:text-flecto-green transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="pt-1">info@pakistanproperty.pk</span>
              </div>
            </div>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-flecto-lime hover:text-flecto-green flex items-center justify-center transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Properties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-flecto-lime mb-8 font-syne">Properties</h4>
            <div className="space-y-4">
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
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-flecto-lime mb-8 font-syne">Tools & Data</h4>
            <div className="space-y-4">
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
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-flecto-lime mb-8 font-syne">Explore</h4>
            <div className="space-y-4">
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
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-flecto-lime mb-8 font-syne">Company</h4>
            <div className="space-y-4">
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
        <div className="border-t border-white/5 pt-10 mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <span className="text-xs font-bold text-flecto-cream/40 tracking-[0.1em] font-syne uppercase whitespace-nowrap">Browse Cities</span>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Quetta', 'Multan'].map(city => (
                <Link key={city} href={`/search?city=${city}`} className="text-xs font-bold text-flecto-cream/50 hover:text-flecto-lime transition-all font-inter">
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 mt-10 flex flex-col sm:flex-row justify-between items-center gap-8">
          <p className="text-xs font-bold text-flecto-cream/30 font-inter">
            © 2025 Pakistan Property Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[11px] font-bold text-flecto-cream/40 uppercase tracking-widest font-syne">
            <Link href="/privacy" className="hover:text-flecto-lime transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-flecto-lime transition-colors">Terms</Link>
            <span className="flex items-center gap-2 text-flecto-lime/60">
              <span className="w-1.5 h-1.5 rounded-full bg-flecto-lime animate-pulse" />
              Verified Hub
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, label }: { href: string, label: string }) => (
  <Link href={href} className="block text-sm text-flecto-cream/60 hover:text-flecto-lime hover:translate-x-1 transition-all duration-300 font-inter font-medium">
    {label}
  </Link>
)

export default Footer
