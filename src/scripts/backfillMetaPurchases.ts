// scripts/backfillMetaPurchases.ts
//
// Formål:
// Backfille manglende Purchase-events til Meta Conversions API
// for ordre i et gitt dato-intervall.
//
// Forutsetninger:
// - Du har allerede facebook-nodejs-business-sdk installert
// - Du har miljøvariabler:
//   META_PIXEL_ID
//   META_ACCESS_TOKEN  (system user token / CAPI-token)
// - Du implementerer fetchShopifyOrdersInRange() selv mot Shopify Admin API

import 'dotenv/config'

const bizSdk = require('facebook-nodejs-business-sdk')
const { ServerEvent, EventRequest, UserData, CustomData, FacebookAdsApi } =
  bizSdk

const PIXEL_ID: string | undefined = process.env.META_PIXEL_ID
const ACCESS_TOKEN: string | undefined = process.env.META_ACCESS_TOKEN
const TEST_EVENT_CODE: string | undefined = process.env.META_TEST_EVENT_CODE // valgfritt

if (!PIXEL_ID) throw new Error('Missing META_PIXEL_ID')
if (!ACCESS_TOKEN) throw new Error('Missing META_ACCESS_TOKEN')

FacebookAdsApi.init(ACCESS_TOKEN)

const DEFAULT_EVENT_SOURCE_URL = 'https://kasse.utekos.no/checkouts/thank-you'

const BATCH_SIZE = 25

interface ShopifyCustomer {
  id?: number | string
  email?: string
  phone?: string
}

interface ShopifyAddress {
  first_name?: string
  last_name?: string
  city?: string
  province?: string
  province_code?: string
  zip?: string
  country?: string
  country_code?: string
}

interface ShopifyLineItem {
  id?: number | string
  variant_id?: number | string
  quantity?: number
  price?: string | number
}

interface ShopifyOrder {
  id: number | string
  created_at: string
  processed_at?: string
  total_price: string | number
  currency?: string
  line_items: ShopifyLineItem[]
  customer?: ShopifyCustomer
  billing_address?: ShopifyAddress
  shipping_address?: ShopifyAddress
  client_ip?: string
  user_agent?: string
  _fbp_cookie_value?: string | null
  _fbc_cookie_value?: string | null
}

function cleanShopifyId(id: string | number | null | undefined): string | null {
  if (!id) return null
  return String(id).split('/').pop()?.split('?')[0] || null
}

/**
 * Konverterer Shopify-tidsstempel (ISO) til Unix-sekunder
 */
function toUnixSeconds(dateString: string): number {
  return Math.floor(new Date(dateString).getTime() / 1000)
}

/**
 * Velg beste adresse (shipping > billing)
 */
function pickBestAddress(
  order: ShopifyOrder
): ShopifyAddress | Record<string, never> {
  return order.shipping_address || order.billing_address || {}
}

async function backfillMetaPurchases(params: { since: Date; until: Date }) {
  const { since, until } = params

  console.log(
    `Backfiller Meta Purchase for ordre mellom ${since.toISOString()} og ${until.toISOString()}`
  )

  // 4.1. Hent ordre i intervallet fra Shopify
  const orders = await fetchShopifyOrdersInRange({ since, until })

  console.log(`Fant ${orders.length} ordre i valgt periode.`)

  const events: (typeof ServerEvent)[] = []

  for (const order of orders) {
    // Her kan du filtrere bort ordre som DU vet allerede er sendt til Meta
    // f.eks. ved å sjekke et eget flagg i db eller metafields.
    // if (orderAlreadySentToMeta(order.id)) continue

    const eventTime = toUnixSeconds(order.processed_at || order.created_at)
    const address = pickBestAddress(order)
    const currency = order.currency || 'NOK'
    const value = Number(order.total_price || 0)

    // 4.2. Bygg contents / content_ids
    const contents = []
    const contentIds = []

    for (const item of order.line_items || []) {
      const variantId = cleanShopifyId(item.variant_id || item.id)
      if (!variantId) continue

      contentIds.push(variantId)
      contents.push({
        id: variantId,
        quantity: item.quantity || 1,
        item_price: Number(item.price || 0)
      })
    }

    const customData = new CustomData()
      .setCurrency(currency)
      .setValue(value)
      .setContents(contents)
      .setOrderId(String(order.id))
    // valgfritt: du kan også sette content_type, content_ids osv. direkte
    // .setContentType('product')
    // .setContentIds(contentIds)

    const userData = new UserData()
      .setEmail(order.customer?.email)
      .setPhone(order.customer?.phone)
      .setFirstName(address.first_name)
      .setLastName(address.last_name)
      .setCity(address.city)
      .setState(address.province || address.province_code)
      .setZip(address.zip)
      .setCountry(address.country_code || address.country || 'NO')
      .setExternalId(cleanShopifyId(order.customer?.id) || undefined)
      .setClientIpAddress(order.client_ip)
      .setClientUserAgent(order.user_agent)
      .setFbp(order._fbp_cookie_value || undefined)
      .setFbc(order._fbc_cookie_value || undefined)

    // Eget event_id for backfill, ingen deduplisering mot eksisterende Purchase
    const eventId = `backfill_order_${cleanShopifyId(order.id)}`

    const serverEvent = new ServerEvent()
      .setEventId(eventId)
      .setEventName('Purchase')
      .setEventTime(eventTime)
      .setActionSource('website')
      .setEventSourceUrl(DEFAULT_EVENT_SOURCE_URL)
      .setUserData(userData)
      .setCustomData(customData)

    events.push(serverEvent)
  }

  if (!events.length) {
    console.log('Ingen events å sende.')
    return
  }

  console.log(`Klargjør ${events.length} Purchase-events til Meta ...`)

  // 4.3. Send i batcher
  for (let i = 0; i < events.length; i += BATCH_SIZE) {
    const slice = events.slice(i, i + BATCH_SIZE)

    const request = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents(slice)

    if (TEST_EVENT_CODE) {
      // La deg backfille i Test Events først, hvis ønskelig
      request.setTestEventCode(TEST_EVENT_CODE)
    }

    try {
      const response = await request.execute()
      console.log(
        `Sendte batch ${i / BATCH_SIZE + 1} (${slice.length} events). Meta-respons:`,
        JSON.stringify(response, null, 2)
      )
    } catch (err) {
      console.error('Feil ved sending av batch til Meta:', err)
    }
  }

  console.log('Backfill fullført.')
}

async function main() {
  // Enkelt CLI-interface:
  // node dist/backfillMetaPurchases.js 2025-11-20 2025-11-30
  const [fromArg, toArg] = process.argv.slice(2)

  if (!fromArg || !toArg) {
    console.error(
      'Bruk: ts-node scripts/backfillMetaPurchases.ts <from-YYYY-MM-DD> <to-YYYY-MM-DD>'
    )
    process.exit(1)
  }

  const since = new Date(`${fromArg}T00:00:00.000Z`)
  const until = new Date(`${toArg}T23:59:59.999Z`)

  await backfillMetaPurchases({ since, until })
}

// Kjør kun hvis scriptet kjøres direkte (ikke importeres)
if (require.main === module) {
  main().catch(err => {
    console.error(err)
    process.exit(1)
  })
}

/**
 * Hent Shopify-ordre i et gitt intervall.
 * Denne er en ren placeholder som du må knytte mot din eksisterende Shopify Admin-klient.
 */
async function fetchShopifyOrdersInRange(params: {
  since: Date
  until: Date
}): Promise<ShopifyOrder[]> {
  const { since, until } = params

  // IMPLEMENTER SELV:
  // - Bruk Shopify Admin REST / GraphQL API
  // - Begrens til ordre med financial_status/fulfillment_status som du anser som "kjøp"
  // - Filtrér på created_at / processed_at mellom since og until
  //
  // Eksempel med REST (i pseudo):
  // GET /admin/api/2024-10/orders.json?status=any&processed_at_min=...&processed_at_max=...
  //
  // Returner array av ShopifyOrder med feltene definert over.

  throw new Error(
    `fetchShopifyOrdersInRange() er ikke implementert. Implementer denne mot Shopify Admin API.`
  )
}
