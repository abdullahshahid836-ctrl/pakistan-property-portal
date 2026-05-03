import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const search = searchParams.get('search')

  let query = supabase
    .from('agents')
    .select('*')
    .order('rating', { ascending: false })

  if (city) query = query.eq('city', city)
  if (search) query = query.ilike('name', `%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ agents: data })
}
