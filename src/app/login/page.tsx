'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col justify-center py-20 px-6 lg:px-8 relative overflow-hidden">
       {/* Background pattern */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, #004737 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Link href="/" className="group">
            <div className="w-16 h-16 bg-[#004737] rounded-[1.5rem] flex items-center justify-center shadow-[0_8px_30px_rgba(0,71,55,0.2)] group-hover:scale-110 transition-transform duration-500">
              <span className="text-[#C8F55A] font-black font-syne text-2xl uppercase">P</span>
            </div>
          </Link>
        </div>
        <h2 className="text-center text-4xl font-black font-syne text-[#0D1B17] tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-3 text-center text-sm font-inter text-[#7A9088]">
          Access your premium property dashboard and manage your listings.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-12 px-8 sm:px-12 rounded-[3rem] border border-[#DDD8CF] shadow-[0_20px_60px_rgba(0,71,55,0.08)]">
          <form className="space-y-8" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 px-5 py-4 rounded-2xl text-[11px] font-black font-syne uppercase tracking-wider">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em] mb-3 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737]/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full h-14 pl-14 pr-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-sm font-inter focus:outline-none focus:border-[#004737] transition-all"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3 ml-1">
                  <label className="block text-[11px] font-black font-syne text-[#7A9088] uppercase tracking-[0.2em]">
                    Password
                  </label>
                  <Link href="#" className="text-[10px] font-black font-syne text-[#004737] uppercase tracking-widest hover:underline underline-offset-4">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004737]/40" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full h-14 pl-14 pr-6 bg-[#F5F0E8]/50 border border-[#DDD8CF] rounded-2xl text-sm font-inter focus:outline-none focus:border-[#004737] transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 h-14 bg-[#004737] text-[#C8F55A] text-xs font-black font-syne rounded-2xl hover:bg-black transition-all shadow-[0_8px_30px_rgba(0,71,55,0.2)] disabled:opacity-50 uppercase tracking-[0.15em]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  SIGN IN <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DDD8CF]"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black font-syne uppercase tracking-[0.2em]">
                <span className="bg-white px-5 text-[#7A9088]">NEW HERE?</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/register"
                className="text-xs font-black font-syne text-[#0D1B17] hover:text-[#004737] uppercase tracking-[0.1em] border-b-2 border-[#C8F55A] pb-1"
              >
                Create a Premium Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
