// =======================================
// ALTERNATIV: API Route versjon
// =======================================
// Path: src/app/api/send/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { EmailTemplate } from '@/components/email/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, country, orderNumber, message } = body

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!, // F.eks: "Utekos <noreply@utekos.no>"
      to: 'info@utekos.no',
      replyTo: email,
      subject: `Kontakt | ${name} (${email})`,
      react: EmailTemplate({
        name,
        email,
        phone,
        country,
        orderNumber,
        message
      }),
      text: `Navn: ${name}\nE-post: ${email}\nTelefon: ${phone || '—'}\nLand: ${country}\nOrdrenummer: ${orderNumber || '—'}\n\nMelding:\n${message}`
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'E-post sendt!',
      data
    })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
