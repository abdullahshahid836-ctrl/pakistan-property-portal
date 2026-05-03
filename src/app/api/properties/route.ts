import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(request.url)

  const purpose = searchParams.get('purpose')
  const type = searchParams.get('type')
  const city = searchParams.get('city')
  const area = searchParams.get('area')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const minArea = searchParams.get('minArea')
  const maxArea = searchParams.get('maxArea')
  const beds = searchParams.get('beds')
  const featured = searchParams.get('featured')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')

  let query = supabase
    .from('properties')
    .select(`
      *,
      agents (
        id, name, agency, phone, whatsapp, photo_url, rating
      )
    `, { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (purpose) query = query.eq('purpose', purpose)
  if (type && type !== 'all') query = query.eq('type', type)
  if (city) query = query.eq('city', city)
  if (area) query = query.eq('area', area)
  if (minPrice) query = query.gte('price', parseInt(minPrice))
  if (maxPrice) query = query.lte('price', parseInt(maxPrice))
  if (minArea) query = query.gte('area_size', parseFloat(minArea))
  if (maxArea) query = query.lte('area_size', parseFloat(maxArea))
  if (beds && beds !== 'any') query = query.gte('bedrooms', parseInt(beds))
  if (featured === 'true') query = query.eq('is_featured', true)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ properties: data, total: count })
}
