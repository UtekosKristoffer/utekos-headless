import { normalize } from '@/lib/tracking/meta/normalization'
import type {
  CaptureBody,
  CheckoutAttribution,
  ExtendedUserData,
  CaptureContext
} from '@types'

export function prepareCaptureData(
  body: CaptureBody,
  context: CaptureContext
): CheckoutAttribution {
  const { cookies, clientIp, userAgent } = context
  const userData: ExtendedUserData = {
    fbp: body.userData?.fbp || cookies.fbp || undefined,
    fbc: body.userData?.fbc || cookies.fbc || undefined,
    external_id: body.userData?.external_id || cookies.externalId || undefined,
    email_hash: cookies.userHash || undefined, // Vi antar denne kun kommer fra cookie (ferdig hashet)
    scid: cookies.scid || undefined,
    click_id: cookies.click_id || undefined,
    epik: cookies.epik || undefined,
    client_user_agent:
      body.userData?.client_user_agent || userAgent || undefined,

    client_ip_address: body.userData?.client_ip_address ?? clientIp
  }

  if (userData.email) userData.email = normalize.email(userData.email)
  if (userData.phone) userData.phone = normalize.phone(userData.phone)
  if (userData.first_name)
    userData.first_name = normalize.name(userData.first_name)
  if (userData.last_name)
    userData.last_name = normalize.name(userData.last_name)
  if (userData.city) userData.city = normalize.city(userData.city)
  if (userData.state) userData.city = normalize.state(userData.state)
  if (userData.zip) userData.zip = normalize.zip(userData.zip)
  if (userData.country) userData.country = normalize.country(userData.country)

  return {
    cartId: body.cartId ?? null,
    checkoutUrl: body.checkoutUrl,
    userData,
    ga_client_id: cookies.gaClientId || undefined,
    ga_session_id: cookies.gaSessionId || undefined,
    ts: Date.now(),
    ...(body.eventId ? { eventId: body.eventId } : {})
  }
}
