import { cleanShopifyId } from '@/lib/utils/cleanShopifyId'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const GA_API_SECRET = process.env.GA_API_SECRET

interface GA4EventParams {
  name: string
  client_id: string
  session_id?: string
  params: Record<string, any>
}

export async function sendGA4Event({
  name,
  client_id,
  session_id,
  params
}: GA4EventParams) {
  if (!GA_MEASUREMENT_ID || !GA_API_SECRET) {
    console.warn('Mangler GA4 credentials')
    return
  }

  const payload = {
    client_id,
    events: [
      {
        name,
        params: {
          ...params,
          session_id: session_id ? session_id : undefined,
          engagement_time_msec: 100 // Default engasjement for server-events
        }
      }
    ]
  }

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify(payload)
      }
    )

    if (!response.ok) {
      console.error('GA4 Server Error:', await response.text())
    }
  } catch (error) {
    console.error('GA4 Network Error:', error)
  }
}
