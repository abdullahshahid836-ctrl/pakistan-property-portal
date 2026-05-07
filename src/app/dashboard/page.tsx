'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Home, Heart, MessageSquare, Settings, LogOut, Plus, ChevronRight, MapPin, Building2, User, LayoutDashboard, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>({})
  const [listings, setListings] = useState<any[]>([])
  const [wishlist, setWishlist] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUser(user)

      const [profileRes, listingsRes, wishlistRes] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('id', user.id).single(),
        supabase.from('properties').select('*').eq('posted_by', user.id).order('created_at', { ascending: false }),
        supabase.from('property_wishlists').select('*, properties(*)').eq('user_id', user.id)
      ])

      setProfile(profileRes.data)
      setListings(listingsRes.data || [])
      setWishlist(wishlistRes.data || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  const [activeTab, setActiveTab] = useState('My Listings')

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setListings(prev => prev.filter(p => p.id !== id))
      alert('Listing deleted successfully')
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete listing')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
       <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 text-[#004737] animate-spin" />
        <span className="font-syne font-bold text-[#004737] tracking-widest text-xs uppercase">Loading Portal...</span>
      </div>
    </div>
  )

  const tabs = [
    { label: 'My Listings', icon: Home, count: listings.length },
    { label: 'My Wishlist', icon: Heart, count: wishlist.length },
    { label: 'Messages', icon: MessageSquare, count: 0 },
    { label: 'Account Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#F5F0E8] pb-20">
      <div className="bg-[#004737] pt-24 pb-16 relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #C8F55A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-[#C8F55A] rounded-[2rem] flex items-center justify-center overflow-hidden border-4 border-white/10 shadow-2xl">
                {profile?.avatar_url ? (
                  <Image src={profile.avatar_url} alt={profile.full_name} width={96} height={96} className="object-cover" />
                ) : (
                  <span className="text-3xl font-black text-[#004737] uppercase font-syne">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-black font-syne text-white mb-2">{profile?.full_name || 'Dashboard'}</h1>
                <div className="flex items-center gap-2">
                   <span className="px-3 py-1 bg-white/10 text-[#C8F55A] text-[10px] font-black font-syne uppercase tracking-widest rounded-lg border border-white/5">
                      {profile?.role || 'User'}
                   </span>
                   <span className="text-sm font-inter text-[#A8C4BB]">{profile?.city || 'Pakistan'}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/add-property" className="flex items-center gap-2 px-8 py-4 bg-[#C8F55A] text-[#004737] text-sm font-black font-syne rounded-2xl hover:bg-[#B8E84A] transition-all shadow-[0_8px_30px_rgba(200,245,90,0.3)] hover:-translate-y-0.5">
                <Plus className="w-5 h-5" /> Add Listing
              </Link>
              <button onClick={() => supabase.auth.signOut()} className="w-14 h-14 bg-white/5 border border-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all group">
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 10C1200 40 960 0 720 20C480 40 240 0 0 10L0 40Z" fill="#F5F0E8" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-6 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
              <h3 className="text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-6 px-2">Navigation</h3>
              <div className="space-y-2">
                {tabs.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveTab(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                      activeTab === item.label 
                        ? "bg-[#004737] text-[#C8F55A]" 
                        : "bg-transparent text-[#4A5568] hover:bg-[#F5F0E8]"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon className={cn("w-5 h-5 transition-colors", activeTab === item.label ? "text-[#C8F55A]" : "text-[#7A9088] group-hover:text-[#004737]")} />
                      <span className="text-sm font-black font-syne uppercase tracking-wider">{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={cn(
                        "px-2 py-0.5 text-[9px] font-black rounded-lg border transition-all",
                        activeTab === item.label ? "bg-[#C8F55A] text-[#004737] border-white/10" : "bg-[#F5F0E8] text-[#7A9088] border-[#DDD8CF]"
                      )}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-black font-syne text-[#0D1B17] uppercase tracking-tight">{activeTab}</h2>
               <div className="h-px bg-[#DDD8CF] flex-1 mx-6 opacity-40" />
            </div>
            
            {activeTab === 'My Listings' && (
              listings.length === 0 ? (
                <div className="bg-white rounded-[3rem] border-2 border-dashed border-[#DDD8CF] p-24 text-center">
                  <div className="w-16 h-16 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mx-auto mb-6">
                     <Building2 className="w-8 h-8 text-[#004737]/30" />
                  </div>
                  <p className="text-sm font-black font-syne text-[#7A9088] uppercase tracking-widest mb-8">You haven't listed any properties yet</p>
                  <Link href="/add-property" className="inline-flex items-center gap-3 px-10 py-4.5 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-lg uppercase tracking-wider">
                    Post Your First Listing <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {listings.map((prop) => (
                    <div key={prop.id} className="bg-white rounded-[2.5rem] border border-[#DDD8CF] p-5 flex flex-col sm:flex-row gap-6 hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] transition-all duration-500 group">
                      <div className="relative w-full sm:w-44 h-44 rounded-[2rem] overflow-hidden shrink-0 border-2 border-[#F5F0E8]">
                        <Image src={prop.images[0] || 'https://via.placeholder.com/400x300'} alt={prop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black font-syne text-[#004737] uppercase tracking-[0.2em]">{prop.type} · FOR {prop.purpose.toUpperCase()}</span>
                            <span className={cn(
                              "px-3 py-1 text-[8px] font-black uppercase tracking-[0.15em] rounded-lg border",
                              prop.is_active ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
                            )}>
                              {prop.is_active ? 'LIVE' : 'DRAFT'}
                            </span>
                          </div>
                          <h3 className="font-black font-syne text-lg text-[#0D1B17] mt-1 group-hover:text-[#004737] transition-colors line-clamp-1">{prop.title}</h3>
                          <p className="text-[11px] font-inter text-[#7A9088] flex items-center gap-1.5 mt-2">
                            <MapPin className="w-3.5 h-3.5 text-[#004737]" /> {prop.area}, {prop.city}
                          </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-[#F5F0E8] pt-4 mt-6">
                          <span className="text-xl font-black font-syne text-[#0D1B17]">PKR {prop.price_label}</span>
                          <div className="flex gap-4">
                            <Link href={`/add-property?edit=${prop.id}`} className="text-[10px] font-black font-syne text-[#004737] uppercase tracking-widest hover:underline underline-offset-4 decoration-2">Edit</Link>
                            <button onClick={() => handleDelete(prop.id)} className="text-[10px] font-black font-syne text-red-500 uppercase tracking-widest hover:underline underline-offset-4 decoration-2">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'My Wishlist' && (
              wishlist.length === 0 ? (
                <div className="bg-white rounded-[3rem] border-2 border-dashed border-[#DDD8CF] p-24 text-center">
                  <div className="w-16 h-16 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mx-auto mb-6">
                     <Heart className="w-8 h-8 text-[#004737]/30" />
                  </div>
                  <p className="text-sm font-black font-syne text-[#7A9088] uppercase tracking-widest">Your wishlist is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlist.map((item) => (
                    <Link key={item.id} href={`/property/${item.properties.id}`} className="bg-white rounded-[2.5rem] border border-[#DDD8CF] overflow-hidden group hover:shadow-[0_24px_60px_rgba(0,71,55,0.12)] transition-all duration-500">
                       <div className="relative h-48 overflow-hidden">
                         <Image src={item.properties.images[0]} alt={item.properties.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                       </div>
                       <div className="p-6">
                         <h4 className="font-black font-syne text-base text-[#0D1B17] line-clamp-1 group-hover:text-[#004737] transition-colors">{item.properties.title}</h4>
                         <p className="text-base font-black font-syne text-[#004737] mt-2">PKR {item.properties.price_label}</p>
                       </div>
                    </Link>
                  ))}
                </div>
              )
            )}

            {activeTab === 'Messages' && (
              <div className="bg-white rounded-[3rem] border-2 border-dashed border-[#DDD8CF] p-24 text-center">
                 <div className="w-16 h-16 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-8 h-8 text-[#004737]/30" />
                 </div>
                 <p className="text-sm font-black font-syne text-[#7A9088] uppercase tracking-widest">No messages yet</p>
              </div>
            )}

            {activeTab === 'Account Settings' && (
              <div className="bg-white rounded-[3rem] border border-[#DDD8CF] p-10 sm:p-14 shadow-[0_20px_50px_rgba(0,71,55,0.06)]">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                       <label className="text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-3 block">Full Name</label>
                       <input 
                         type="text" 
                         value={profile?.full_name || ''} 
                         onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                         className="w-full h-14 px-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-sm font-inter outline-none focus:border-[#004737] transition-all" 
                       />
                     </div>
                     <div>
                       <label className="text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-3 block">Email Address</label>
                       <input type="text" value={user?.email} disabled className="w-full h-14 px-6 bg-[#F5F0E8]/30 border border-[#DDD8CF] rounded-2xl text-sm font-inter outline-none cursor-not-allowed opacity-60" />
                     </div>
                  </div>
                  <button 
                    onClick={async () => {
                      setLoading(true)
                      const { error } = await supabase
                        .from('user_profiles')
                        .update({ full_name: profile.full_name })
                        .eq('id', user.id)
                      
                      if (error) {
                        alert('Failed to update profile')
                      } else {
                        alert('Profile updated successfully')
                      }
                      setLoading(false)
                    }}
                    disabled={loading}
                    className="px-12 py-4.5 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-[0_8px_30px_rgba(0,71,55,0.2)] disabled:opacity-50 uppercase tracking-widest h-14"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Profile'}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
