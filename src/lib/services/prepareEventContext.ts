import { normalize } from '@/lib/tracking/meta/normalization'
import type { MetaEventPayload, ClientUserData, EventCookies } from '@types'

export interface EnrichedEventContext {
  userData: ClientUserData
  clientIp: string
  userAgent: string
  sourceInfo: {
    emoji: string
    name: string
  }
}

export function prepareEventContext(
  body: MetaEventPayload,
  cookies: EventCookies,
  clientIp: string, // NYTT: Mottar ferdig uthentet IP
  userAgent: string // NYTT: Mottar ferdig uthentet UserAgent
): EnrichedEventContext {
  // 1. Identifiser kilde for logging
  let sourceEmoji = '🤷'
  let sourceName = 'Direct/Unknown'

  if (cookies.ttclid) {
    sourceEmoji = '🎵'
    sourceName = 'TikTok'
  } else if (cookies.epik) {
    sourceEmoji = '📌'
    sourceName = 'Pinterest'
  } else if (cookies.scCid) {
    sourceEmoji = '👻'
    sourceName = 'Snapchat'
  } else if (cookies.fbc) {
    sourceEmoji = '💙'
    sourceName = 'Meta'
  }

  // 2. Slå sammen UserData (Body > Cookie)
  // Vi setter ikke client_ip/agent her ennå, det gjøres i steg 4 for consistency
  const finalUserData: ClientUserData = {
    ...body.userData,
    fbp: body.userData?.fbp || cookies.fbp || undefined,
    fbc: body.userData?.fbc || cookies.fbc || undefined,
    external_id: body.userData?.external_id || cookies.externalId || undefined,
    email_hash: body.userData?.email_hash || cookies.userHash || undefined
  }

  // 3. Normalisering
  if (finalUserData.email)
    finalUserData.email = normalize.email(finalUserData.email)
  if (finalUserData.phone)
    finalUserData.phone = normalize.phone(finalUserData.phone)
  if (finalUserData.first_name)
    finalUserData.first_name = normalize.name(finalUserData.first_name)
  if (finalUserData.last_name)
    finalUserData.last_name = normalize.name(finalUserData.last_name)
  if (finalUserData.city)
    finalUserData.city = normalize.city(finalUserData.city)
  if (finalUserData.state)
    finalUserData.state = normalize.state(finalUserData.state)
  if (finalUserData.zip) finalUserData.zip = normalize.zip(finalUserData.zip)
  if (finalUserData.country)
    finalUserData.country = normalize.country(finalUserData.country)

  // 4. IP og User Agent
  // Vi prioriterer det som kom i body (sjelden), ellers bruker vi det som ble sendt inn (fra server context)
  const finalIp = finalUserData.client_ip_address || clientIp
  const finalUserAgent = finalUserData.client_user_agent || userAgent

  // Oppdater objektet slik at plattform-handlerne får alt på ett sted
  if (finalIp) finalUserData.client_ip_address = finalIp
  if (finalUserAgent) finalUserData.client_user_agent = finalUserAgent

  return {
    userData: finalUserData,
    clientIp: finalIp,
    userAgent: finalUserAgent,
    sourceInfo: { emoji: sourceEmoji, name: sourceName }
  }
}
