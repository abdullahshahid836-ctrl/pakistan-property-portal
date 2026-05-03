'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useWishlist(propertyId: string) {
  const supabase = createClient()
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return

      const { data } = await supabase
        .from('property_wishlists')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('property_id', propertyId)
        .single()

      setIsSaved(!!data)
    }
    check()
  }, [propertyId])

  const toggle = async () => {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      window.location.href = '/login'
      return
    }

    if (isSaved) {
      await supabase.from('property_wishlists')
        .delete()
        .eq('user_id', session.user.id)
        .eq('property_id', propertyId)
      setIsSaved(false)
    } else {
      await supabase.from('property_wishlists')
        .insert({ user_id: session.user.id, property_id: propertyId })
      setIsSaved(true)
    }
    setLoading(false)
  }

  return { isSaved, toggle, loading }
}
