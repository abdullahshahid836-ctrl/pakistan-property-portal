'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, ChevronRight, MessageSquare, Globe, Clock, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      {/* Header */}
      <div className="bg-[#004737] pt-24 pb-16 relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-black font-syne text-[#C8F55A] uppercase tracking-[0.2em] mb-4">
            <Link href="/" className="hover:underline underline-offset-4">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="opacity-60">Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-syne text-white mb-4 uppercase tracking-tight">Contact Us</h1>
          <p className="text-base text-[#A8C4BB] font-inter max-w-xl mx-auto">
            Our specialized team of real estate experts and support staff are here to assist you 24/7.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
               <h2 className="text-3xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">Let's connect</h2>
               <p className="text-base font-inter text-[#7A9088] leading-relaxed">
                 Whether you're looking for investment advice or technical support, we're just a message away.
               </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Phone, label: 'Helpline', value: '+92-51-111-999-888', sub: 'Available 24/7' },
                { icon: Mail, label: 'Email Support', value: 'support@pakistanproperty.pk', sub: 'Avg. response: 2 hours' },
                { icon: MapPin, label: 'HQ Address', value: '7th Floor, Blue Area, Islamabad', sub: 'Mon - Sat: 9 AM - 6 PM' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] p-8 border border-[#DDD8CF] shadow-[0_4px_12px_rgba(0,71,55,0.04)] flex gap-6 group hover:border-[#004737] transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F0E8] flex items-center justify-center shrink-0 group-hover:bg-[#004737] transition-all duration-500">
                    <item.icon className="w-6 h-6 text-[#004737] group-hover:text-[#C8F55A] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black font-syne text-[#7A9088] uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-base font-black font-syne text-[#0D1B17] uppercase tracking-tight">{item.value}</p>
                    <p className="text-xs font-inter text-[#7A9088] mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="p-8 bg-[#004737] rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
               <div className="relative z-10 flex items-center gap-6">
                 <div className="w-12 h-12 bg-[#C8F55A] rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[#004737]" />
                 </div>
                 <div>
                    <p className="text-xs font-black font-syne uppercase tracking-widest mb-1">Response Guarantee</p>
                    <p className="text-sm font-inter text-[#A8C4BB] opacity-80">98% of inquiries resolved within 24 hours.</p>
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-[3rem] p-10 sm:p-14 border border-[#DDD8CF] shadow-[0_40px_100px_rgba(0,71,55,0.06)] relative overflow-hidden">
               {/* Pattern */}
               <div className="absolute top-0 right-0 w-40 h-40 bg-[#F5F0E8] rounded-full blur-3xl -mr-20 -mt-20" />

               {submitted ? (
                 <div className="text-center py-20 relative z-10">
                   <div className="w-20 h-20 bg-[#C8F55A] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <CheckCircle2 className="w-10 h-10 text-[#004737]" />
                   </div>
                   <h3 className="text-3xl font-black font-syne text-[#0D1B17] mb-4 uppercase tracking-tight">Message Received</h3>
                   <p className="text-base font-inter text-[#7A9088] mb-10 max-w-sm mx-auto">Thank you for reaching out. One of our property advisors will contact you shortly.</p>
                   <button 
                     onClick={() => setSubmitted(false)}
                     className="px-10 py-5 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-lg uppercase tracking-widest"
                   >
                     SEND ANOTHER MESSAGE
                   </button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] ml-2">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Zeeshan Ali"
                          className="w-full h-16 px-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter transition-all"
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] ml-2">Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="zeeshan@example.com"
                          className="w-full h-16 px-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter transition-all"
                        />
                     </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] ml-2">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+92 300 1234567"
                          className="w-full h-16 px-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter transition-all"
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] ml-2">Subject</label>
                        <select className="w-full h-16 px-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter transition-all appearance-none cursor-pointer">
                           <option>General Inquiry</option>
                           <option>Investment Advice</option>
                           <option>Technical Support</option>
                           <option>Partnership</option>
                        </select>
                     </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] ml-2">Your Message</label>
                      <textarea 
                        required
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className="w-full p-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl focus:outline-none focus:border-[#004737] font-inter transition-all resize-none"
                      ></textarea>
                   </div>

                   <button 
                     type="submit"
                     className="w-full py-6 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center gap-4 uppercase tracking-widest"
                   >
                     SEND MESSAGE <Send className="w-5 h-5" />
                   </button>
                 </form>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
