import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const status = searchParams.get('status')
  const trending = searchParams.get('trending')

  let query = supabase
    .from('projects')
    .select('*, project_units(*)')
    .order('created_at', { ascending: false })

  if (city) query = query.eq('city', city)
  if (status) query = query.eq('status', status)
  if (trending === 'true') query = query.eq('is_trending', true)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ projects: data })
}
