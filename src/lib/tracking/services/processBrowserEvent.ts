import { prepareEventContext } from '@/lib/tracking/services/prepareEventContext'
import type { MetaEventPayload, EventCookies } from '@types'
import type { TrackingDependencies } from '@types'

export async function processBrowserEvent(
  body: MetaEventPayload,
  cookies: EventCookies,
  metadata: { clientIp: string; userAgent: string },
  deps: TrackingDependencies
) {
  const { userData, sourceInfo } = prepareEventContext(
    body,
    cookies,
    metadata.clientIp,
    metadata.userAgent
  )

  const pinPromise = deps.sendPinterest(body, userData, cookies.epik)

  const tiktokPromise = deps.sendTikTok(body, userData, {
    ...(cookies.ttclid ? { ttclid: cookies.ttclid } : {}),
    ...(cookies.ttp ? { ttp: cookies.ttp } : {})
  })

  const googlePromise = deps.sendGoogle(body, {
    clientIp: metadata.clientIp,
    userAgent: metadata.userAgent
  })

  const snapchatPromise =
    deps.sendSnapchat ?
      deps.sendSnapchat(body, userData, {
        ...(cookies.scCid ? { sc_cookie1: cookies.scCid } : {}),
        ...(cookies.scCid ? { sc_click_id: cookies.scCid } : {})
      })
    : Promise.resolve()

  try {
    const metaResponse = await deps.sendMeta(body, userData)

    await Promise.all([
      pinPromise,
      tiktokPromise,
      googlePromise,
      snapchatPromise
    ])

    await deps.logger(
      'INFO',
      `${sourceInfo.emoji} ${sourceInfo.name} | CAPI: ${body.eventName}`,
      {
        eventId: body.eventId,
        events_received: metaResponse.events_received,
        fbtrace_id: metaResponse.fbtrace_id
      },
      {
        actionSource: body.actionSource || 'website',
        source: sourceInfo.name,
        scCid: cookies.scCid ? '***Found***' : 'Missing',
        epik: cookies.epik ? '***Found***' : 'Missing',
        ttclid: cookies.ttclid ? '***Found***' : 'Missing',
        hasFbp: !!userData.fbp,
        hasFbc: !!userData.fbc,
        hasExtId: !!userData.external_id,
        hasEmail: !!userData.email || !!userData.email_hash,
        clientIp: userData.client_ip_address,
        hasGA4: !!body.ga4Data?.client_id
      }
    )

    return {
      success: true,
      events_received: metaResponse.events_received,
      fbtrace_id: metaResponse.fbtrace_id
    }
  } catch (error: any) {
    const errorData = error.response?.data || {}

    await deps.logger(
      'ERROR',
      `CAPI Failed: ${body.eventName}`,
      {
        error: error.message || 'Unknown Error',
        details: errorData,
        type: errorData.error?.type,
        code: errorData.error?.code
      },
      { eventId: body.eventId }
    )

    return {
      success: false,
      error: 'Failed to send event to Meta',
      details: errorData.error?.message || error.message
    }
  }
}
