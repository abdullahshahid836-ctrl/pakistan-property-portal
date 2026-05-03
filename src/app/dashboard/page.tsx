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
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="w-10 h-10 border-4 border-[#1E6BFF] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const tabs = [
    { label: 'My Listings', icon: Home, count: listings.length },
    { label: 'My Wishlist', icon: Heart, count: wishlist.length },
    { label: 'Messages', icon: MessageSquare, count: 0 },
    { label: 'Account Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="bg-white border-b border-[#E5E7EB] pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-[#EBF2FF] rounded-3xl flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                {profile?.avatar_url ? (
                  <Image src={profile.avatar_url} alt={profile.full_name} width={80} height={80} />
                ) : (
                  <span className="text-2xl font-black text-[#1E6BFF] uppercase">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#1A1A2E]">{profile?.full_name || 'User'}</h1>
                <p className="text-sm text-[#9CA3AF] font-bold uppercase tracking-widest">{profile?.role || 'User'} · {profile?.city || 'Pakistan'}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/add-property" className="flex items-center gap-2 px-6 py-3 bg-[#1E6BFF] text-white text-sm font-bold rounded-2xl hover:bg-[#1554CC] transition-all shadow-lg shadow-blue-100">
                <Plus className="w-4 h-4" /> Add Listing
              </Link>
              <button onClick={() => supabase.auth.signOut()} className="p-3 bg-white border border-[#E5E7EB] text-[#4A5568] rounded-2xl hover:text-red-500 hover:border-red-100 transition-all">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-4">
            {tabs.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "w-full flex items-center justify-between p-5 rounded-3xl border transition-all",
                  activeTab === item.label ? "bg-white border-[#1E6BFF] shadow-sm" : "bg-white/50 border-[#E5E7EB] hover:bg-white hover:border-[#1E6BFF]"
                )}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={cn("w-5 h-5", activeTab === item.label ? "text-[#1E6BFF]" : "text-[#9CA3AF]")} />
                  <span className={cn("text-sm font-bold", activeTab === item.label ? "text-[#1A1A2E]" : "text-[#4A5568]")}>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="px-2.5 py-1 bg-[#F8F9FA] text-[10px] font-bold text-[#4A5568] rounded-lg border border-[#E5E7EB]">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-black text-[#1A1A2E]">{activeTab}</h2>
            
            {activeTab === 'My Listings' && (
              listings.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-[#E5E7EB] rounded-3xl p-20 text-center">
                  <Building2 className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest mb-6">No properties found</p>
                  <Link href="/add-property" className="inline-flex items-center gap-2 px-8 py-3 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl hover:bg-[#1554CC] transition-all">
                    Post Your First Listing <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {listings.map((prop) => (
                    <div key={prop.id} className="bg-white border border-[#E5E7EB] rounded-3xl p-4 flex gap-4 hover:shadow-xl transition-all group">
                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                        <Image src={prop.images[0] || 'https://via.placeholder.com/400x300'} alt={prop.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#1E6BFF] uppercase tracking-widest">{prop.type} · FOR {prop.purpose.toUpperCase()}</span>
                            <span className={cn(
                              "px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-md",
                              prop.is_active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            )}>
                              {prop.is_active ? 'Active' : 'Draft'}
                            </span>
                          </div>
                          <h3 className="font-bold text-[#1A1A2E] mt-1 group-hover:text-[#1E6BFF] transition-colors line-clamp-1">{prop.title}</h3>
                          <p className="text-[10px] text-[#9CA3AF] font-bold uppercase flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {prop.area}, {prop.city}
                          </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-[#F3F4F6] pt-3 mt-3">
                          <span className="text-sm font-black text-[#1A1A2E]">PKR {prop.price_label}</span>
                          <div className="flex gap-2">
                            <Link href={`/add-property?edit=${prop.id}`} className="text-[10px] font-bold text-[#1E6BFF] uppercase tracking-widest hover:underline">Edit</Link>
                            <button onClick={() => handleDelete(prop.id)} className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline">Delete</button>
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
                <div className="bg-white border-2 border-dashed border-[#E5E7EB] rounded-3xl p-20 text-center">
                  <Heart className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">Your wishlist is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map((item) => (
                    <Link key={item.id} href={`/property/${item.properties.id}`} className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden group">
                       <div className="relative h-40">
                         <Image src={item.properties.images[0]} alt={item.properties.title} fill className="object-cover" />
                       </div>
                       <div className="p-4">
                         <h4 className="font-bold text-[#1A1A2E] line-clamp-1 group-hover:text-[#1E6BFF] transition-colors">{item.properties.title}</h4>
                         <p className="text-sm font-black text-[#1E6BFF] mt-1">PKR {item.properties.price_label}</p>
                       </div>
                    </Link>
                  ))}
                </div>
              )
            )}

            {activeTab === 'Messages' && (
              <div className="bg-white border-2 border-dashed border-[#E5E7EB] rounded-3xl p-20 text-center">
                <MessageSquare className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4 opacity-20" />
                <p className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest">No messages yet</p>
              </div>
            )}

            {activeTab === 'Account Settings' && (
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Full Name</label>
                     <input 
                       type="text" 
                       value={profile?.full_name || ''} 
                       onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                       className="w-full h-12 px-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl text-sm outline-none focus:border-[#1E6BFF]" 
                     />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-[#9CA3AF] uppercase mb-2 block">Email</label>
                     <input type="text" value={user?.email} disabled className="w-full h-12 px-4 bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl text-sm outline-none cursor-not-allowed" />
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
                  className="px-8 py-3 bg-[#1E6BFF] text-white text-xs font-bold rounded-xl hover:bg-[#1554CC] transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Update Profile'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
