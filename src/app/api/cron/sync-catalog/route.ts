// Path: src/app/api/cron/sync-catalog/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { syncProductsToMetaCatalog } from '@/lib/meta/catalogSync'

export const maxDuration = 60

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
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
