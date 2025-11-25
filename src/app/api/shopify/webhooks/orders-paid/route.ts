import { NextResponse } from 'next/server'
import { verifyShopifyWebhook } from '@/lib/shopify/verifyWebhook'

const bizSdk = require('facebook-nodejs-business-sdk')
const { ServerEvent, EventRequest, UserData, CustomData, FacebookAdsApi } =
  bizSdk

const PIXEL_ID = process.env.META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

if (!PIXEL_ID) throw new Error('Missing META_PIXEL_ID')
if (!ACCESS_TOKEN) throw new Error('Missing META_SYSTEM_USER_TOKEN')

FacebookAdsApi.init(ACCESS_TOKEN)

interface ShopifyLineItem {
  variant_id?: number | string
  quantity?: number
  price?: string | number
}

interface ShopifyCustomer {
  id?: number | string
  email?: string
  phone?: string
}

interface ShopifyOrderPaidWebhook {
  id?: number | string
  currency?: string
  total_price?: string | number
  line_items?: ShopifyLineItem[]
  customer?: ShopifyCustomer
  client_ip?: string
  user_agent?: string
  confirmation_url?: string
  cookies?: {
    _fbp?: string
    _fbc?: string
  }
}

function safeString(value: string | number | undefined): string {
  return value !== undefined ? String(value) : ''
}

function safeNumber(value: string | number | undefined): number {
  return value !== undefined ? Number(value) : 0
}

export async function POST(request: Request) {
  const hmac = request.headers.get('x-shopify-hmac-sha256') ?? ''
  const rawBody = await request.text()

  const ok = verifyShopifyWebhook(rawBody, hmac)
  if (!ok) {
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 }
    )
  }

  let order: ShopifyOrderPaidWebhook
  try {
    order = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const userData = new UserData()

  if (order.customer?.email) {
    userData.setEmails([order.customer.email])
  }
  if (order.customer?.phone) {
    userData.setPhones([order.customer.phone])
  }
  if (order.customer?.id !== undefined) {
    userData.setExternalIds([String(order.customer.id)])
  }

  if (order.cookies?._fbp) userData.setFbp(order.cookies._fbp)
  if (order.cookies?._fbc) userData.setFbc(order.cookies._fbc)

  if (order.client_ip) userData.setClientIpAddress(order.client_ip)
  if (order.user_agent) userData.setClientUserAgent(order.user_agent)

  const contents =
    order.line_items
      ?.map(item => {
        const id = safeString(item.variant_id)
        if (!id) return null
        return {
          id,
          quantity: safeNumber(item.quantity),
          item_price: safeNumber(item.price)
        }
      })
      .filter(Boolean) ?? []

  const customData = new CustomData()
    .setCurrency(order.currency ?? 'NOK')
    .setValue(safeNumber(order.total_price))
    .setContents(contents)
    .setOrderId(safeString(order.id))
  const event = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(Math.floor(Date.now() / 1000))
    .setUserData(userData)
    .setCustomData(customData)

  if (order.confirmation_url) {
    event.setEventSourceUrl(order.confirmation_url)
  }

  try {
    const eventRequest = new EventRequest(ACCESS_TOKEN, PIXEL_ID).setEvents([
      event
    ])
    const response = await eventRequest.execute()

    return NextResponse.json({
      success: true,
      capi_response: response
    })
  } catch (err: any) {
    console.error('CAPI Purchase error FULL DETAILS:', {
      message: err?.message,
      status: err?.status,
      method: err?.method,
      url: err?.url,
      fb_error: err?.response?.data?.error ?? null
    })

    return NextResponse.json(
      {
        error: 'Meta CAPI purchase failed',
        fb_error: err?.response?.data?.error ?? null
      },
      { status: 500 }
    )
  }
}
