'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Home, Heart, MessageSquare, Settings, LogOut, Plus, ChevronRight, MapPin, Building2 } from 'lucide-react'
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-flecto-cream-dark gap-4">
      <div className="w-12 h-12 border-4 border-flecto-green/10 border-t-flecto-lime rounded-full animate-spin" />
      <p className="text-[10px] font-bold text-flecto-green uppercase tracking-[0.2em] font-inter">Syncing Account...</p>
    </div>
  )

  const tabs = [
    { label: 'My Listings', icon: Home, count: listings.length },
    { label: 'My Wishlist', icon: Heart, count: wishlist.length },
    { label: 'Messages', icon: MessageSquare, count: 0 },
    { label: 'Account Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-flecto-cream-dark pb-24">
      <div className="bg-flecto-cream border-b border-flecto-green/5 pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center overflow-hidden border-4 border-flecto-cream-dark shadow-2xl shadow-flecto-green/[0.05]">
                {profile?.avatar_url ? (
                  <Image src={profile.avatar_url} alt={profile.full_name} width={96} height={96} className="object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-flecto-green font-syne uppercase">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-flecto-green font-syne tracking-tight">{profile?.full_name || 'Strategic Partner'}</h1>
                <p className="text-[10px] text-flecto-text-muted font-bold uppercase tracking-[0.2em] mt-1 font-inter">
                  {profile?.role || 'Verified Member'} <span className="opacity-30 mx-2">|</span> {profile?.city || 'Pakistan'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/add-property" className="flex items-center gap-3 px-8 py-4 bg-flecto-green text-flecto-cream text-xs font-bold rounded-full hover:bg-flecto-green-light transition-all duration-500 shadow-2xl shadow-flecto-green/20 font-syne uppercase tracking-widest">
                <Plus className="w-4 h-4" /> Add Listing
              </Link>
              <button 
                onClick={() => supabase.auth.signOut()} 
                className="p-4 bg-white border border-flecto-green/5 text-flecto-green-light rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all duration-500 shadow-sm"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-3">
            {tabs.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "w-full flex items-center justify-between p-6 rounded-[1.5rem] border transition-all duration-500 group font-syne uppercase tracking-widest text-[10px] font-bold",
                  activeTab === item.label 
                    ? "bg-white border-flecto-green text-flecto-green shadow-xl shadow-flecto-green/[0.03]" 
                    : "bg-white/50 border-transparent text-flecto-text-muted hover:bg-white hover:border-flecto-green/10"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={cn("w-4.5 h-4.5 transition-transform duration-500 group-hover:scale-110", activeTab === item.label ? "text-flecto-green-light" : "text-flecto-text-muted/40")} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[9px]",
                    activeTab === item.label ? "bg-flecto-green text-flecto-cream" : "bg-flecto-cream text-flecto-text-muted"
                  )}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-flecto-green font-syne uppercase tracking-tight">{activeTab}</h2>
            </div>
            
            {activeTab === 'My Listings' && (
              listings.length === 0 ? (
                <div className="bg-white border border-flecto-green/5 rounded-[3rem] p-24 text-center shadow-inner">
                  <Building2 className="w-16 h-16 text-flecto-lime mx-auto mb-6 opacity-30" />
                  <p className="text-xs font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-8 font-inter">No properties identified in your portfolio</p>
                  <Link href="/add-property" className="inline-flex items-center gap-3 px-10 py-4 bg-flecto-green text-flecto-cream text-[10px] font-bold rounded-full hover:bg-flecto-green-light transition-all duration-500 shadow-2xl shadow-flecto-green/20 font-syne uppercase tracking-widest">
                    Post Your First Listing <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listings.map((prop) => (
                    <div key={prop.id} className="bg-white border border-flecto-green/5 rounded-[2.5rem] p-5 flex flex-col gap-5 hover:shadow-2xl hover:shadow-flecto-green/[0.05] transition-all duration-700 group">
                      <div className="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden">
                        <Image src={prop.images[0] || 'https://via.placeholder.com/400x300'} alt={prop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute top-4 right-4">
                          <span className={cn(
                            "px-4 py-1.5 text-[8px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md border",
                            prop.is_active 
                              ? "bg-flecto-lime/90 text-flecto-green border-flecto-lime/20" 
                              : "bg-white/90 text-red-500 border-red-100"
                          )}>
                            {prop.is_active ? 'Active' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between px-2">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-bold text-flecto-green-light uppercase tracking-[0.2em] font-inter">{prop.type} <span className="opacity-30 mx-1">/</span> For {prop.purpose}</span>
                          </div>
                          <h3 className="text-lg font-bold text-flecto-green group-hover:text-flecto-green-light transition-colors line-clamp-1 font-syne uppercase tracking-tight">{prop.title}</h3>
                          <p className="text-[10px] text-flecto-text-muted font-bold uppercase tracking-widest flex items-center gap-1.5 mt-2 font-inter">
                            <MapPin className="w-3.5 h-3.5 text-flecto-lime" /> {prop.area}, {prop.city}
                          </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-flecto-green/5 pt-5 mt-6">
                          <span className="text-lg font-bold text-flecto-green font-syne">PKR {prop.price_label}</span>
                          <div className="flex gap-4">
                            <Link href={`/add-property?edit=${prop.id}`} className="text-[10px] font-bold text-flecto-green-light uppercase tracking-widest hover:text-flecto-green transition-colors font-syne border-b border-transparent hover:border-flecto-green-light">Edit</Link>
                            <button onClick={() => handleDelete(prop.id)} className="text-[10px] font-bold text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors font-syne border-b border-transparent hover:border-red-400">Delete</button>
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
                <div className="bg-white border border-flecto-green/5 rounded-[3rem] p-24 text-center shadow-inner">
                  <Heart className="w-16 h-16 text-flecto-lime mx-auto mb-6 opacity-30" />
                  <p className="text-xs font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">Curate your desired acquisitions</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlist.map((item) => (
                    <Link key={item.id} href={`/property/${item.properties.id}`} className="bg-white border border-flecto-green/5 rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-flecto-green/[0.05] transition-all duration-700">
                       <div className="relative aspect-[16/9]">
                         <Image src={item.properties.images[0]} alt={item.properties.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                         <div className="absolute inset-0 bg-gradient-to-t from-flecto-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                       </div>
                       <div className="p-6">
                         <h4 className="text-base font-bold text-flecto-green line-clamp-1 group-hover:text-flecto-green-light transition-colors font-syne uppercase tracking-tight">{item.properties.title}</h4>
                         <p className="text-sm font-bold text-flecto-green-light mt-2 font-syne">PKR {item.properties.price_label}</p>
                       </div>
                    </Link>
                  ))}
                </div>
              )
            )}

            {activeTab === 'Messages' && (
              <div className="bg-white border border-flecto-green/5 rounded-[3rem] p-24 text-center shadow-inner">
                <MessageSquare className="w-16 h-16 text-flecto-lime mx-auto mb-6 opacity-30" />
                <p className="text-xs font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">Secure communications pending</p>
              </div>
            )}

            {activeTab === 'Account Settings' && (
              <div className="bg-white border border-flecto-green/5 rounded-[3rem] p-10 sm:p-16 space-y-10 shadow-2xl shadow-flecto-green/[0.04]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div>
                     <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 block font-inter">Full Name</label>
                     <input 
                       type="text" 
                       value={profile?.full_name || ''} 
                       onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                       className="w-full h-14 px-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 font-inter font-medium" 
                     />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 block font-inter">Email Address</label>
                     <input type="text" value={user?.email} disabled className="w-full h-14 px-6 bg-flecto-cream-dark border border-flecto-green/5 rounded-2xl text-sm outline-none cursor-not-allowed opacity-60 font-inter font-medium" />
                   </div>
                </div>
                <div className="flex justify-start">
                  <button 
                    onClick={async () => {
                      setLoading(true)
                      const { error } = await supabase
                        .from('user_profiles')
                        .update({ full_name: profile.full_name })
                        .eq('id', user.id)
                      
                      if (error) {
                        alert('Failed to synchronize profile')
                      } else {
                        alert('Profile successfully updated')
                      }
                      setLoading(false)
                    }}
                    disabled={loading}
                    className="px-10 py-4 bg-flecto-green text-flecto-cream text-[10px] font-bold rounded-full hover:bg-flecto-green-light transition-all duration-500 shadow-2xl shadow-flecto-green/20 disabled:opacity-50 font-syne uppercase tracking-widest"
                  >
                    {loading ? 'Processing...' : 'Update Identity'}
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
