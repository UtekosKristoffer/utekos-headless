import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const cartId = body.cartId || 'Ukjent CartID'

    console.log(`🛒 KASSE STARTET: Bruker går til kassen. CartID: ${cartId}`)

    return NextResponse.json(
      { success: true, message: 'Logget: Kasse Startet' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Feil ved logging av checkout-start:', error)
    return NextResponse.json(
      { success: false, message: 'Logg-feil' },
      { status: 500 }
    )
  }
}
