'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, User, Phone, Loader2, ArrowRight, ShieldCheck } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [isAgent, setIsAgent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: phone,
          role: isAgent ? 'agent' : 'user'
        }
      }
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
    <div className="min-h-screen bg-flecto-cream-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="w-16 h-16 bg-flecto-green rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-flecto-green/20 hover:scale-110 transition-transform duration-500">
            <span className="text-flecto-lime font-bold text-2xl font-syne">P</span>
          </Link>
        </div>
        <h2 className="text-center text-4xl font-bold text-flecto-green font-syne tracking-tight">
          Join the Network
        </h2>
        <p className="mt-3 text-center text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] font-inter">
          Pakistan's premier destination for strategic acquisitions
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-12 px-8 sm:px-12 shadow-2xl shadow-flecto-green/[0.04] border border-flecto-green/5 sm:rounded-[3rem]">
          <form className="space-y-8" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-500 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest font-inter">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label className="block text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-flecto-lime group-focus-within:scale-110 transition-transform duration-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full h-14 pl-16 pr-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 transition-all duration-500 font-inter font-medium"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-flecto-lime group-focus-within:scale-110 transition-transform duration-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full h-14 pl-16 pr-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 transition-all duration-500 font-inter font-medium"
                    placeholder="name@flecto.io"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
                  Contact Number
                </label>
                <div className="relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-flecto-lime group-focus-within:scale-110 transition-transform duration-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full h-14 pl-16 pr-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 transition-all duration-500 font-inter font-medium"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-flecto-text-muted uppercase tracking-[0.2em] mb-4 font-inter">
                  Access Code
                </label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-flecto-lime group-focus-within:scale-110 transition-transform duration-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full h-14 pl-16 pr-6 bg-flecto-cream border border-flecto-green/5 rounded-2xl text-sm focus:outline-none focus:border-flecto-green/20 focus:ring-4 focus:ring-flecto-green/5 transition-all duration-500 font-inter font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-flecto-cream border border-flecto-green/5 rounded-[2rem] transition-all duration-500 hover:border-flecto-lime/30">
              <input
                type="checkbox"
                id="isAgent"
                checked={isAgent}
                onChange={(e) => setIsAgent(e.target.checked)}
                className="w-5 h-5 text-flecto-green border-flecto-green/10 rounded-lg focus:ring-flecto-lime cursor-pointer"
              />
              <label htmlFor="isAgent" className="text-[10px] font-bold text-flecto-green flex items-center gap-2 cursor-pointer font-sy uppercase tracking-widest">
                Professional Agent <ShieldCheck className="w-4 h-4 text-flecto-lime" />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 h-14 bg-flecto-green text-flecto-cream text-[10px] font-bold rounded-full hover:bg-flecto-green-light transition-all duration-500 shadow-2xl shadow-flecto-green/20 disabled:opacity-50 font-syne uppercase tracking-widest"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>
                  Register Identity <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] text-flecto-text-muted font-bold uppercase tracking-[0.2em] font-inter">
              Already a partner?{' '}
              <Link href="/login" className="text-flecto-green-light hover:text-flecto-green transition-colors font-syne tracking-widest">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

