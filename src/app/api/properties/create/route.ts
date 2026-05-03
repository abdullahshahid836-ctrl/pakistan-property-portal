import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { z } from 'zod'

const PropertySchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  type: z.enum(['House','Flat','Plot','Commercial','Room']),
  purpose: z.enum(['Sale','Rent']),
  price: z.number().positive('Price must be positive'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  address: z.string().min(5),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  area_size: z.number().positive(),
  area_unit: z.enum(['Marla','Kanal','Sq. Ft.']),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  sender_name: z.string().min(2),
  sender_phone: z.string().min(10),
  sender_email: z.string().email().optional()
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const body = await request.json()

    // Validate with Zod
    const validated = PropertySchema.safeParse(body)
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validated.error.flatten() },
        { status: 400 }
      )
    }

    const data = validated.data

    // Get the current user (optional — property can be submitted by guests too)
    const { data: { user } } = await supabase.auth.getUser()

    // Format price label
    const priceLabel = data.price >= 10000000
      ? `${(data.price / 10000000).toFixed(1)} Crore`
      : data.price >= 100000
      ? `${(data.price / 100000).toFixed(0)} Lac`
      : data.price.toLocaleString()

    // Insert property
    const { data: property, error } = await supabase
      .from('properties')
      .insert({
        title: data.title,
        type: data.type,
        purpose: data.purpose,
        price: data.price,
        price_label: priceLabel,
        city: data.city,
        area: data.area,
        address: data.address,
        bedrooms: data.bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        area_size: data.area_size,
        area_unit: data.area_unit,
        description: data.description,
        features: data.features || [],
        images: data.images || [],
        lat: data.lat,
        lng: data.lng,
        posted_by: user?.id || null,
        is_active: true,
        is_verified: false,
        is_featured: false
      })
      .select()
      .single()

    if (error) throw error

    // Send confirmation email (non-blocking)
    if (process.env.RESEND_API_KEY) {
      fetch(`${request.nextUrl.origin}/api/email/property-submitted`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: data.sender_name,
          senderEmail: data.sender_email,
          propertyTitle: data.title,
          propertyId: property.id
        })
      })
    }

    return NextResponse.json({
      success: true,
      property: { id: property.id, title: property.title }
    })

  } catch (error: any) {
    console.error('Property creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create property' },
      { status: 500 }
    )
  }
}
