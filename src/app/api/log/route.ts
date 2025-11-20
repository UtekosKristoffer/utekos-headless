// Path: src/app/api/log/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { redisPush, redisList, redisTrim } from '@/lib/redis'
import crypto from 'crypto'

type LogPayload = {
  event: string
  level?: 'info' | 'warn' | 'error'
  data?: Record<string, unknown>
  context?: {
    cartId?: string
    path?: string
  }
}

export async function GET() {
  try {
    const logs = await redisList('app_logs', 0, 49)

    return NextResponse.json({
      count: logs.length,
      logs
    })
  } catch (error) {
    console.error('Failed to fetch logs:', error)
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
    const userAgent = req.headers.get('user-agent')

    const fbp = req.cookies.get('_fbp')?.value
    const fbc = req.cookies.get('_fbc')?.value
    const externalId = req.cookies.get('ute_ext_id')?.value

    const timestamp = new Date().toISOString()

    const logEntry = {
      id: crypto.randomUUID(),
      timestamp,
      level: level.toUpperCase(),
      event,
      identity: {
        ip,
        fbp,
        fbc,
        externalId,
        userAgent
      },
      context: {
        ...context,
        referer: req.headers.get('referer')
      },
      data
    }

    if (process.env.NODE_ENV === 'development') {
      console.dir(logEntry, { depth: null, colors: true })
    } else {
      console.log(`[${level.toUpperCase()}] ${event}`, JSON.stringify(logEntry))
    }

    await redisPush('app_logs', logEntry)
    await redisTrim('app_logs', 0, 999)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Logger failed:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
