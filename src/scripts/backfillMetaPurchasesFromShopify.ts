// src/scripts/backfillMetaPurchasesFromShopify.ts

import 'dotenv/config'
import type {
  GqlOrderNode,
  GqlAddress,
  NormalizedOrder,
  GqlOrdersResponse
} from './types'

const bizSdk = require('facebook-nodejs-business-sdk')
const { ServerEvent, EventRequest, UserData, CustomData, FacebookAdsApi } =
  bizSdk

const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-10'
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN // f.eks. erling-7921.myshopify.com
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN

const META_PIXEL_ID = process.env.META_PIXEL_ID
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE // valgfritt

if (!SHOPIFY_STORE_DOMAIN) throw new Error('Missing SHOPIFY_STORE_DOMAIN')
if (!SHOPIFY_ADMIN_API_TOKEN) throw new Error('Missing SHOPIFY_ADMIN_API_TOKEN')
if (!META_PIXEL_ID) throw new Error('Missing META_PIXEL_ID')
if (!META_ACCESS_TOKEN) throw new Error('Missing META_ACCESS_TOKEN')

FacebookAdsApi.init(META_ACCESS_TOKEN)

const DEFAULT_EVENT_SOURCE_URL = 'https://kasse.utekos.no/checkouts/thank-you'

const BATCH_SIZE = 100

function cleanShopifyId(id: string | number | null | undefined): string | null {
  if (!id) return null
  return String(id).split('/').pop()?.split('?')[0] || null
}

function toUnixSeconds(dateString: string): number {
  return Math.floor(new Date(dateString).getTime() / 1000)
}

function pickBestAddress(o: GqlOrderNode): GqlAddress | {} {
  return o.shippingAddress || o.billingAddress || {}
}

function normalizeOrder(node: GqlOrderNode): NormalizedOrder {
  const processedAt = node.processedAt || node.createdAt
  const money = node.currentTotalPriceSet?.shopMoney
  const value = money ? Number(money.amount) : 0
  const currency = (money?.currencyCode || node.currencyCode || 'NOK') as string

  const address = pickBestAddress(node) as GqlAddress

  const lineItems = node.lineItems.edges.map(({ node: li }) => {
    const price =
      li.originalUnitPriceSet?.shopMoney?.amount != null ?
        Number(li.originalUnitPriceSet.shopMoney.amount)
      : 0
    const variantId = li.variant?.id ? cleanShopifyId(li.variant.id) : null
    return {
      variantId,
      quantity: li.quantity || 1,
      itemPrice: price
    }
  })

  return {
    id: node.id,
    createdAt: node.createdAt,
    processedAt,
    totalValue: value,
    currency,
    customer: {
      ...(node.customer?.id && { id: node.customer.id }),
      ...(node.customer?.email && { email: node.customer.email }),
      ...(node.customer?.phone && { phone: node.customer.phone })
    },
    address: {
      ...(address.firstName && { firstName: address.firstName }),
      ...(address.lastName && { lastName: address.lastName }),
      ...(address.city && { city: address.city }),
      ...(address.province && { province: address.province }),
      ...(address.provinceCode && { provinceCode: address.provinceCode }),
      ...(address.zip && { zip: address.zip }),
      ...(address.countryCode && { countryCode: address.countryCode })
    },
    ...(node.clientIp && { clientIp: node.clientIp }),
    lineItems
  }
}

// --- 4. GraphQL-kall mot Shopify Admin ---

const ORDERS_FOR_META_BACKFILL = `
  query OrdersForMetaBackfill($query: String!, $cursor: String) {
    orders(
      first: 100
      after: $cursor
      query: $query
      sortKey: PROCESSED_AT
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          createdAt
          processedAt
          currencyCode
          currentTotalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          customer {
            id
            email
            phone
          }
          billingAddress {
            firstName
            lastName
            city
            province
            provinceCode
            zip
            countryCode
          }
          shippingAddress {
            firstName
            lastName
            city
            province
            provinceCode
            zip
            countryCode
          }
          clientIp
          lineItems(first: 100) {
            edges {
              node {
                id
                quantity
                originalUnitPriceSet {
                  shopMoney {
                    amount
                  }
                }
                variant {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`

async function fetchShopifyOrdersInRange(params: {
  since: Date
  until: Date
}): Promise<NormalizedOrder[]> {
  const { since, until } = params

  const fromIso = since.toISOString().replace(/\.\d{3}Z$/, 'Z')
  const toIso = until.toISOString().replace(/\.\d{3}Z$/, 'Z')

  const searchQuery = `processed_at:>=${fromIso} processed_at:<=${toIso} financial_status:paid`

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`

  let cursor: string | undefined
  let hasNextPage = true
  const normalized: NormalizedOrder[] = []

  while (hasNextPage) {
    const body = JSON.stringify({
      query: ORDERS_FOR_META_BACKFILL,
      variables: {
        query: searchQuery,
        cursor: cursor || null
      }
    })

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN!
      },
      body
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(
        `Shopify GraphQL error: ${res.status} ${res.statusText} – ${text}`
      )
    }

    const json = (await res.json()) as GqlOrdersResponse

    if (json.errors) {
      console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2))
      throw new Error('Shopify GraphQL returned errors')
    }

    const ordersConnection = json.data?.orders
    if (!ordersConnection) break

    for (const edge of ordersConnection.edges) {
      normalized.push(normalizeOrder(edge.node))
    }

    hasNextPage = ordersConnection.pageInfo.hasNextPage
    cursor = ordersConnection.pageInfo.endCursor || undefined
  }

  return normalized
}

async function backfillMetaPurchases(params: { since: Date; until: Date }) {
  const { since, until } = params

  console.log(
    `Backfiller Meta Purchase (GraphQL) for ordre mellom ${since.toISOString()} og ${until.toISOString()}`
  )

  const orders = await fetchShopifyOrdersInRange({ since, until })
  console.log(`Fant ${orders.length} ordre i perioden.`)

  if (!orders.length) {
    console.log('Ingen ordre å backfille.')
    return
  }

  const events: (typeof ServerEvent)[] = []

  for (const order of orders) {
    // Her kan du legge inn logikk hvis du vil hoppe over ordre som allerede er sendt til Meta.
    // f.eks. basert på intern DB/metafields.

    const eventTime = toUnixSeconds(order.processedAt)
    const currency = order.currency || 'NOK'
    const value = order.totalValue

    const contents = order.lineItems.map(li => ({
      id: li.variantId || undefined,
      quantity: li.quantity,
      item_price: li.itemPrice
    }))

    const userData = new UserData()
      .setEmail(order.customer.email)
      .setPhone(order.customer.phone)
      .setFirstName(order.address.firstName)
      .setLastName(order.address.lastName)
      .setCity(order.address.city)
      .setState(order.address.province || order.address.provinceCode)
      .setZip(order.address.zip)
      .setCountry(order.address.countryCode || 'NO')
      .setExternalId(
        order.customer.id ?
          cleanShopifyId(order.customer.id) || undefined
        : undefined
      )
      .setClientIpAddress(order.clientIp)
    // Hvis du får tak i historisk _fbp/_fbc for ordren, sett dem her:
    // .setFbp(order._fbp)
    // .setFbc(order._fbc)
    // (felt må da inn på NormalizedOrder)

    const customData = new CustomData().setCurrency(currency).setValue(value)

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

  console.log(`Klargjort ${events.length} Purchase-events til Meta.`)

  for (let i = 0; i < events.length; i += BATCH_SIZE) {
    const slice = events.slice(i, i + BATCH_SIZE)
    const request = new EventRequest(
      META_ACCESS_TOKEN,
      META_PIXEL_ID
    ).setEvents(slice)

    if (META_TEST_EVENT_CODE) {
      request.setTestEventCode(META_TEST_EVENT_CODE)
    }

    try {
      const response = await request.execute()
      console.log(
        `Sendte batch ${i / BATCH_SIZE + 1} (${slice.length} events). Respons:`,
        JSON.stringify(response, null, 2)
      )
    } catch (err) {
      console.error('Feil ved sending til Meta:', err)
    }
  }

  console.log('Backfill fullført.')
}

// --- 6. CLI entrypoint ---

async function main() {
  const [fromArg, toArg] = process.argv.slice(2)

  if (!fromArg || !toArg) {
    console.error(
      'Bruk: ts-node src/scripts/backfillMetaPurchasesFromShopify.ts <from-YYYY-MM-DD> <to-YYYY-MM-DD>'
    )
    process.exit(1)
  }

  const since = new Date(`${fromArg}T00:00:00.000Z`)
  const until = new Date(`${toArg}T23:59:59.999Z`)

  await backfillMetaPurchases({ since, until })
}

if (require.main === module) {
  main().catch(err => {
    console.error(err)
    process.exit(1)
  })
}
