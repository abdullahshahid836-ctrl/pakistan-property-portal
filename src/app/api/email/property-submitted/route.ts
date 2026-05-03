import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { senderName, senderEmail, propertyTitle } = await request.json()

  if (!senderEmail) return NextResponse.json({ skipped: true })

  await resend.emails.send({
    from: 'Pakistan Property Portal <noreply@pakistanproperty.pk>',
    to: senderEmail,
    subject: 'Your property listing has been submitted',
    html: `
      <h2>Listing Submitted!</h2>
      <p>Hi ${senderName},</p>
      <p>Your property <strong>"${propertyTitle}"</strong> has been submitted
         and is pending review. It will be live within 24 hours.</p>
      <p>Thank you for listing with Pakistan Property Portal.</p>
    `
  })

  return NextResponse.json({ success: true })
}
