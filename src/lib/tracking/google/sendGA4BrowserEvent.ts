import { mapToGA4EventName } from './mapToGA$EventName'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const GA_API_SECRET = process.env.GA_API_SECRET

export async function sendGA4BrowserEvent(
  payload: any,
  userContext: { clientIp?: string; userAgent?: string }
) {
  if (!payload.ga4Data?.client_id || !GA_MEASUREMENT_ID || !GA_API_SECRET) {
    return {
      success: false,
      provider: 'google',
      error: 'Missing credentials or client_id'
    }
  }

  const { eventName, eventData, ga4Data } = payload
  const gaEventName = mapToGA4EventName(eventName)

  const body = {
    client_id: ga4Data.client_id,
    events: [
      {
        name: gaEventName,
        params: {
          session_id: ga4Data.session_id,
          currency: eventData?.currency || 'NOK',
          value: eventData?.value,
          items:
            eventData?.content_ids ?
              eventData.content_ids.map((id: string) => ({
                item_id: id,
                item_name: eventData.content_name
              }))
            : undefined,
          engagement_time_msec: 100,
          ip_override: userContext.clientIp,
          user_agent: userContext.userAgent
        }
      }
    ]
  }

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: 'POST',
        body: JSON.stringify(body)
      }
    )

    if (!response.ok) {
      console.error('GA4 Error:', await response.text())
      return { success: false, provider: 'google' }
    }

    return { success: true, provider: 'google' }
  } catch (error) {
    console.error('GA4 Network Exception:', error)
    return { success: false, provider: 'google', error }
  }
}
