import { NextRequest, NextResponse } from 'next/server'
import { syncProductsToMetaCatalog } from '@/lib/meta/catalogSync'

export const maxDuration = 60

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const { searchParams } = new URL(request.url)
  const queryKey = searchParams.get('key')

  const cronSecret = process.env.CRON_SECRET

  // 1. Sjekk Authorization header (Brukes av Vercel Cron automatisk)
  const isValidHeader = authHeader === `Bearer ${cronSecret}`

  // 2. Sjekk Query Parameter (For manuell kjøring i nettleser)
  const isValidQuery = queryKey === cronSecret

  if (!cronSecret || (!isValidHeader && !isValidQuery)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const result = await syncProductsToMetaCatalog()
    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
