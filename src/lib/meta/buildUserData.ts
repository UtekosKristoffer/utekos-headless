import { normalizeAndHash } from '@/lib/route-logic/normalizeHash'
import type { OrderPaid, CheckoutAttribution, MetaUserData } from '@types'

export function buildUserData(
  order: OrderPaid,
  attrib: CheckoutAttribution | null
): MetaUserData {
  const userData: MetaUserData = {}

  if (attrib?.userData?.fbp) userData.fbp = attrib.userData.fbp
  if (attrib?.userData?.fbc) userData.fbc = attrib.userData.fbc
  if (attrib?.userData?.client_user_agent)
    userData.client_user_agent = attrib.userData.client_user_agent
  if (attrib?.userData?.client_ip_address)
    userData.client_ip_address = attrib.userData.client_ip_address
  if (attrib?.userData?.external_id)
    userData.external_id = attrib.userData.external_id

  const email = normalizeAndHash(order.contact_email ?? order.customer?.email)
  if (email) userData.em = [email]

  const phone = normalizeAndHash(
    order.customer?.phone
      ?? order.billing_address?.phone
      ?? order.shipping_address?.phone
      ?? (typeof order.phone === 'string' ? order.phone : null)
  )
  if (phone) userData.ph = [phone]

  const fn = normalizeAndHash(
    order.customer?.first_name
      ?? order.billing_address?.first_name
      ?? order.shipping_address?.first_name
  )
  if (fn) userData.fn = [fn]

  const ln = normalizeAndHash(
    order.customer?.last_name
      ?? order.billing_address?.last_name
      ?? order.shipping_address?.last_name
  )
  if (ln) userData.ln = [ln]

  const billing = order.billing_address
  const shipping = order.shipping_address
  const city = normalizeAndHash(billing?.city ?? shipping?.city)
  if (city) userData.ct = [city]

  const st = normalizeAndHash(billing?.province_code ?? shipping?.province_code)
  if (st) userData.st = [st]

  const zp = normalizeAndHash(billing?.zip ?? shipping?.zip)
  if (zp) userData.zp = [zp]

  const country = normalizeAndHash(
    billing?.country_code ?? shipping?.country_code
  )
  if (country) userData.country = [country]

  Object.keys(userData).forEach(key => {
    const K = key as keyof MetaUserData
    if (Array.isArray(userData[K]) && (userData[K] as string[]).length === 0) {
      delete userData[K]
    } else if (userData[K] == null) {
      delete userData[K]
    }
  })

  return userData
}
