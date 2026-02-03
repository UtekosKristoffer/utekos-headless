'use server'

import { z } from 'zod'
import { headers, cookies } from 'next/headers'
import { hashSnapData } from '@/lib/snapchat/hashSnapData'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'

const PINTEREST_TOKEN = process.env.PINTEREST_ACCESS_TOKEN
const PINTEREST_AD_ACCOUNT_ID = process.env.PINTEREST_AD_ACCOUNT_ID
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID

export type ActionState = {
  status: 'success' | 'error' | 'idle'
  message: string
}

export async function subscribeToNewsletter(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const emailSchema = z.string().email({
    message: 'Vennligst skriv inn en gyldig e-postadresse.'
  })

  const result = emailSchema.safeParse(formData.get('email'))

  if (!result.success) {
    const errorMessage =
      result.error.issues[0]?.message || 'Det oppstod en valideringsfeil.'
    return { status: 'error', message: errorMessage }
  }
  const email = result.data

  const mutation = `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    input: {
      email: email,
      emailMarketingConsent: {
        marketingState: 'SUBSCRIBED',
        marketingOptInLevel: 'SINGLE_OPT_IN',
        consentUpdatedAt: new Date().toISOString()
      }
    }
  }

  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN!
        },
        body: JSON.stringify({ query: mutation, variables })
      }
    )

    const data = await response.json()

    if (data.errors) {
      console.error('Shopify GraphQL API Errors:', data.errors)
      return {
        status: 'error',
        message: 'Kunne ikke kommunisere med Shopify. Sjekk API-nøkler.'
      }
    }

    if (!data.data) {
      return { status: 'error', message: 'Uventet svarformat fra Shopify.' }
    }

    const { customerCreate } = data.data

    let successMessage = ''
    let isSuccess = false

    if (customerCreate === null) {
      isSuccess = true
      successMessage = 'Takk! Sjekk e-posten din for rabattkoden.'
    } else if (customerCreate.userErrors.length > 0) {
      const errorMessage = customerCreate.userErrors[0]?.message
      if (errorMessage?.includes('Email has already been taken')) {
        isSuccess = true
        successMessage = 'Du står allerede på listen! Sjekk innboksen din.'
      } else {
        return {
          status: 'error',
          message: errorMessage || 'En ukjent feil oppstod hos Shopify.'
        }
      }
    } else if (customerCreate.customer) {
      isSuccess = true
      successMessage = 'Takk! Velkomstmail er på vei til din innboks.'
    } else {
      return { status: 'error', message: 'En uforutsett feil oppstod.' }
    }

    if (isSuccess) {
      trackLeadEvent(email).catch(err => console.error('Tracking failed:', err))
    }

    return {
      status: 'success',
      message: successMessage
    }
  } catch (error) {
    console.error('Shopify API call failed:', error)
    return {
      status: 'error',
      message: 'Noe gikk galt på serveren. Prøv igjen senere.'
    }
  }
}

async function trackLeadEvent(email: string) {
  const headersList = await headers()
  const cookieStore = await cookies()

  const forwardedFor = headersList.get('x-forwarded-for')
  const userAgent = headersList.get('user-agent') || ''
  const referer = headersList.get('referer') || 'https://utekos.no'

  let clientIp = '0.0.0.0'
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]
    if (firstIp) {
      clientIp = firstIp.trim()
    }
  }

  const clickId = cookieStore.get('_epik')?.value
  const ttclid = cookieStore.get('ute_ttclid')?.value
  const ttp = cookieStore.get('_ttp')?.value
  const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(7)}`

  const sendPinterestLead = async () => {
    if (!PINTEREST_TOKEN || !PINTEREST_AD_ACCOUNT_ID) return

    try {
      const pinPayload = {
        event_name: 'lead',
        action_source: 'web',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: referer,
        user_data: {
          em: [hashSnapData(email)],
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          click_id: clickId || undefined
        },
        custom_data: {
          content_name: 'Newsletter'
        }
      }

      const res = await fetch(
        `https://api.pinterest.com/v5/ad_accounts/${PINTEREST_AD_ACCOUNT_ID}/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PINTEREST_TOKEN}`
          },
          body: JSON.stringify({ data: [pinPayload] })
        }
      )

      if (res.ok) {
        await logToAppLogs(
          'INFO',
          '❤️ Pinterest CAPI: Lead Sent',
          { eventId },
          {
            clickId: clickId ? 'Found' : 'Missing',
            source: 'Newsletter Action'
          }
        )
      } else {
        const errText = await res.text()
        console.error('[Pinterest CAPI] Lead Failed:', errText)
      }
    } catch (e) {
      console.error('[Pinterest CAPI] Error:', e)
    }
  }

  const sendTikTokLead = async () => {
    if (!TIKTOK_ACCESS_TOKEN || !TIKTOK_PIXEL_ID) return

    try {
      const payload = {
        event_source: 'web',
        event_source_id: TIKTOK_PIXEL_ID,
        data: [
          {
            event: 'CompleteRegistration',
            event_id: eventId,
            event_time: Math.floor(Date.now() / 1000),
            user: {
              ttclid: ttclid,
              ttp: ttp,
              email: hashSnapData(email),
              ip: clientIp,
              user_agent: userAgent
            },
            page: {
              url: referer
            }
          }
        ]
      }

      const res = await fetch(
        'https://business-api.tiktok.com/open_api/v1.3/event/track/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Token': TIKTOK_ACCESS_TOKEN
          },
          body: JSON.stringify(payload)
        }
      )

      const data = await res.json()
      if (data.code === 0) {
        await logToAppLogs(
          'INFO',
          '🎵 TikTok CAPI: Lead Sent',
          { eventId },
          { ttclid: ttclid ? 'Found' : 'Missing' }
        )
      } else {
        console.error('[TikTok CAPI] Error:', JSON.stringify(data))
      }
    } catch (e) {
      console.error('[TikTok CAPI] Exception:', e)
    }
  }

  await Promise.all([sendPinterestLead(), sendTikTokLead()])
}
