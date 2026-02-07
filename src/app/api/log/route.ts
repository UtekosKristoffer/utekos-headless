// Path: src/app/api/log/route.ts
import { NextRequest, NextResponse, connection } from 'next/server'
import { redisList } from '@/lib/redis/redisList'
import { logToAppLogs } from '@/lib/utils/logToAppLogs'
import type { LogPayload } from '@types'

export async function GET() {
  await connection()
  try {
    const logs = await redisList('app_logs', 0, 49)
    return NextResponse.json({ count: logs.length, logs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Kunne ikke hente logger' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LogPayload
    const { event, level = 'info', data, context } = body

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]
    const userAgent = req.headers.get('user-agent') || undefined
    const fbp = req.cookies.get('_fbp')?.value
    const fbc = req.cookies.get('_fbc')?.value
    const externalId = req.cookies.get('ute_ext_id')?.value

    const enrichedContext = {
      ...context,
      ip,
      userAgent,
      fbp,
      fbc,
      externalId,
      referer: req.headers.get('referer')
    }
    await logToAppLogs(level.toUpperCase() as any, event, data, enrichedContext)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Logger failed:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
