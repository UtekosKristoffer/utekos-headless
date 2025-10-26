import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

/**
 * En midlertidig Route Handler for å manuelt tømme
 * hele handlekurv-cachen på serveren.
 *
 * SIKKERHET: Denne filen bør slettes etter bruk.
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== 'TomCache456') {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    revalidateTag('cart')
    console.log('REVALIDATED CACHE TAG: cart')
    return NextResponse.json({
      revalidated: true,
      tag: 'cart',
      now: Date.now()
    })
  } catch (error) {
    console.error('Failed to revalidate tag "cart":', error)
    return NextResponse.json(
      { revalidated: false, message: (error as Error).message },
      { status: 500 }
    )
  }
}
