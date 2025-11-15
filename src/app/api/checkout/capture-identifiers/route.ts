import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis'
import type { CheckoutAttribution, UserData } from '@types' // Importer UserData

interface CaptureBody {
  cartId?: string | null
  checkoutUrl: string
  eventId?: string
  userData: UserData
}

/**
 * Parser ut checkout-tokenen (en 30-tegns alfanumerisk streng) fra
 * de ulike Shopify URL-formatene.
 *
 * Eksempler:
 * - .../cart/c/hWN5HJ1FX9Yg8O0eSfAtPz1f?key=...
 * - .../checkouts/cn/hWN5HJ1FX9Yg8O0eSfAtPz1f/nb-no?_r=...
 */
function parseCheckoutToken(
  checkoutUrl: string | undefined
): string | undefined {
  if (!checkoutUrl) return undefined

  try {
    // Regex for å finne en 30-tegns alfanumerisk streng (case-sensitiv)
    // som er en del av URL-stien.
    const match = checkoutUrl.match(/\/([a-zA-Z0-9]{30})(?=[/?]|$)/)

    if (match && match[1]) {
      return match[1]
    }

    // Fallback: Prøv å hente fra 'token' query-parameter (som i den gamle koden)
    const url = new URL(checkoutUrl)
    const queryToken = url.searchParams.get('token')
    if (queryToken) {
      return queryToken
    }

    // Hvis ingen av metodene fant noe
    return undefined
  } catch (e) {
    console.error('Error parsing checkout URL:', e, 'URL:', checkoutUrl)
    return undefined
  }
}

export async function POST(req: NextRequest) {
  let body: CaptureBody // Bruk den nye typen
  try {
    body = (await req.json()) as CaptureBody
    console.log(
      'Received body in /capture-identifiers:',
      JSON.stringify(body, null, 2)
    )
  } catch {
    console.error('Invalid JSON received in /capture-identifiers')
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const token = parseCheckoutToken(body.checkoutUrl)
  if (!token) {
    console.error('Could not parse checkout token from URL:', body.checkoutUrl)
    return NextResponse.json(
      { error: 'Missing or invalid checkout token in checkoutUrl' },
      { status: 400 }
    )
  }

  const proxiedIp = req.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim()

  const userDataToSave: UserData = {}
  if (body.userData?.fbp) userDataToSave.fbp = body.userData.fbp
  if (body.userData?.fbc) userDataToSave.fbc = body.userData.fbc
  if (body.userData?.client_user_agent)
    userDataToSave.client_user_agent = body.userData.client_user_agent
  const ipToUse = body.userData?.client_ip_address ?? proxiedIp // Fallback til header IP
  if (ipToUse) userDataToSave.client_ip_address = ipToUse
  if (body.userData?.external_id)
    userDataToSave.external_id = body.userData.external_id

  const payload: CheckoutAttribution = {
    cartId: body.cartId ?? null,
    checkoutUrl: body.checkoutUrl,
    userData: userDataToSave,
    ts: Date.now(),
    ...(body.eventId && { eventId: body.eventId })
  }

  try {
    const redisKey = `checkout:${token}`
    await redisSet(redisKey, payload, 60 * 60 * 24 * 7) // 7d TTL
    console.log(`Successfully saved data to Redis key: ${redisKey}`)
    return NextResponse.json({ ok: true })
  } catch (redisError) {
    console.error('Error saving data to Redis:', redisError)
    return NextResponse.json(
      { error: 'Failed to save checkout data' },
      { status: 500 }
    )
  }
}
