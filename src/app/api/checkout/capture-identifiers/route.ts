// app/api/checkout/capture-identifiers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { redisSet } from '@/lib/redis'
import type { CheckoutAttribution, UserData } from '@types'

interface CaptureBody {
  cartId: string | null | undefined // Endret til å forvente cartId
  checkoutUrl?: string // Gjør denne valgfri, vi bruker den ikke som nøkkel
  eventId?: string
  userData: UserData
}


export async function POST(req: NextRequest) {
  let body: CaptureBody
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

  // --- BRUK cartId SOM NØKKEL ---
  if (!body.cartId) {
    console.error('Missing cartId in request body for /capture-identifiers')
    return NextResponse.json({ error: 'Missing cartId' }, { status: 400 })
  }
  const cartId = body.cartId
  // ------------------------------

  const proxiedIp = req.headers.get('x-forwarded-for')?.split(',')?.[0]?.trim()

  // Bygg userData objektet trygt (som før)
  const userDataToSave: UserData = {
    /* ... som før ... */
  }
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
    cartId: cartId, // Bruk den validerte cartId
    checkoutUrl: body.checkoutUrl ?? null, // Lagre URL for info, men ikke bruk som nøkkel
    userData: userDataToSave,
    ts: Date.now(),
    ...(body.eventId && { eventId: body.eventId })
  }

  try {
    // Bruk cartId som (del av) Redis-nøkkel
    const redisKey = `cart:${cartId}:checkout_attribution` // Mer beskrivende nøkkel
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
