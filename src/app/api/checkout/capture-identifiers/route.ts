// app/api/checkout/capture-identifiers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis'
import type { CheckoutAttribution, UserData } from '@types' // Importer UserData

// Definer Body-typen mer presist her
interface CaptureBody {
  cartId?: string | null
  checkoutUrl: string
  eventId?: string
  userData: UserData
}

function parseCheckoutToken(
  checkoutUrl: string | undefined
): string | undefined {
  if (!checkoutUrl) return undefined // Håndter undefined
  try {
    const url = new URL(checkoutUrl)
    const parts = url.pathname.split('/').filter(Boolean)
    const checkoutIndex = parts.findIndex(p => p === 'checkouts')
    if (checkoutIndex !== -1 && parts[checkoutIndex + 1]) {
      const potentialToken = parts[checkoutIndex + 1]
      if (potentialToken && /^[a-f0-9]{32}$/i.test(potentialToken)) {
        return potentialToken
      }
    }
    // Fallback: Prøv query parameter (mindre vanlig nå)
    return url.searchParams.get('token') ?? undefined
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
    ) // <-- LOGGING
  } catch {
    console.error('Invalid JSON received in /capture-identifiers')
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // --- MER ROBUST TOKEN PARSING ---
  const token = parseCheckoutToken(body.checkoutUrl)
  if (!token) {
    console.error('Could not parse checkout token from URL:', body.checkoutUrl)
    return NextResponse.json(
      { error: 'Missing or invalid checkout token in checkoutUrl' },
      { status: 400 }
    )
  }
  // ---------------------------------

  const proxiedIp = req.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim()

  // Bygg userData objektet trygt
  const userDataToSave: UserData = {}
  if (body.userData?.fbp) userDataToSave.fbp = body.userData.fbp
  if (body.userData?.fbc) userDataToSave.fbc = body.userData.fbc
  if (body.userData?.client_user_agent)
    userDataToSave.client_user_agent = body.userData.client_user_agent
  const ipToUse = body.userData?.client_ip_address ?? proxiedIp // Fallback til header IP
  if (ipToUse) userDataToSave.client_ip_address = ipToUse
  if (body.userData?.external_id)
    userDataToSave.external_id = body.userData.external_id

  // Bygg payload for Redis
  const payload: CheckoutAttribution = {
    cartId: body.cartId ?? null,
    checkoutUrl: body.checkoutUrl,
    userData: userDataToSave,
    ts: Date.now(),
    ...(body.eventId && { eventId: body.eventId }) // Legg til eventId hvis den finnes
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
