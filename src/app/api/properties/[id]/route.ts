import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('properties')
    .select('*, agents(*)')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 })
  }

  // Increment views (fire and forget)
  supabase.rpc('increment_property_views', { property_id: params.id })

  return NextResponse.json(data)
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabaseClient()
    const body = await request.json()
    const { id } = params

    // Check ownership
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: existing } = await supabase
      .from('properties')
      .select('posted_by')
      .eq('id', id)
      .single()

    if (!existing || existing.posted_by !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { error } = await supabase
      .from('properties')
      .update({
        title: body.title,
        type: body.type,
        purpose: body.purpose,
        price: body.price,
        city: body.city,
        area: body.area,
        address: body.address,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        area_size: body.area_size,
        area_unit: body.area_unit,
        description: body.description,
        features: body.features,
        images: body.images,
        is_active: body.is_active ?? true
      })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Update error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
