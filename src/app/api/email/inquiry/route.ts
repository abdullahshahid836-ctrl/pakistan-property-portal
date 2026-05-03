import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const InquirySchema = z.object({
  property_id: z.string(),
  agent_id: z.string(),
  sender_name: z.string().min(2),
  sender_email: z.string().email(),
  sender_phone: z.string().min(10),
  message: z.string().min(10)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = InquirySchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const data = validated.data

    // Save inquiry to database
    await supabaseAdmin.from('inquiries').insert({
      property_id: data.property_id,
      agent_id: data.agent_id,
      sender_name: data.sender_name,
      sender_email: data.sender_email,
      sender_phone: data.sender_phone,
      message: data.message
    })

    // Get agent email and property title
    const [{ data: agent }, { data: property }] = await Promise.all([
      supabaseAdmin.from('agents').select('email, name').eq('id', data.agent_id).single(),
      supabaseAdmin.from('properties').select('title, city, price_label').eq('id', data.property_id).single()
    ])

    // Send email to agent
    if (agent?.email) {
      await resend.emails.send({
        from: 'Pakistan Property Portal <noreply@pakistanproperty.pk>',
        to: agent.email,
        subject: `New inquiry for: ${property?.title}`,
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1E6BFF; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">
                New Property Inquiry
              </h1>
            </div>
            <div style="background: #F8F9FA; padding: 24px; border-radius: 0 0 12px 12px;">
              <p>Hi ${agent.name},</p>
              <p>You have a new inquiry for your listing:</p>
              <div style="background: white; padding: 16px; border-radius: 8px;
                          border: 1px solid #E5E7EB; margin: 16px 0;">
                <strong>${property?.title}</strong><br/>
                <span style="color: #9CA3AF;">${property?.city} · PKR ${property?.price_label}</span>
              </div>
              <p><strong>From:</strong> ${data.sender_name}</p>
              <p><strong>Phone:</strong> ${data.sender_phone}</p>
              <p><strong>Email:</strong> ${data.sender_email}</p>
              <div style="background: white; padding: 16px; border-radius: 8px;
                          border: 1px solid #E5E7EB; margin: 16px 0;">
                <strong>Message:</strong><br/>
                <p style="color: #4A5568;">${data.message}</p>
              </div>
              <a href="tel:${data.sender_phone}"
                 style="display: inline-block; background: #1E6BFF; color: white;
                        padding: 12px 24px; border-radius: 8px; text-decoration: none;
                        font-weight: 600; margin-top: 8px;">
                Call ${data.sender_name}
              </a>
            </div>
          </div>
        `
      })
    }

    // Send confirmation to buyer
    if (data.sender_email) {
      await resend.emails.send({
        from: 'Pakistan Property Portal <noreply@pakistanproperty.pk>',
        to: data.sender_email,
        subject: 'Your inquiry has been sent',
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Inquiry Sent!</h2>
            <p>Hi ${data.sender_name},</p>
            <p>Your inquiry for <strong>${property?.title}</strong> has been sent to the agent.
               They will contact you within 24 hours.</p>
            <p>Thank you for using Pakistan Property Portal.</p>
          </div>
        `
      })
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Email error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
