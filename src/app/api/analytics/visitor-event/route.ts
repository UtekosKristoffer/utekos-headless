import { NextResponse } from 'next/server'
import { z } from 'zod'
const SOURCE_PROJECT = 'utekos-headless'

const visitorEventPayloadSchema = z.object({
  visitorId: z.string().trim().min(8).max(160),
  sessionId: z.string().trim().min(8).max(160).optional().nullable(),
  pathname: z.string().trim().min(1).max(2048).optional().nullable(),
  referrer: z.string().trim().max(2048).optional().nullable()
})

function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

function getSupabaseRestUrl(path: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_URL

  if (!supabaseUrl || supabaseUrl.trim().length === 0) {
    throw new Error('Missing required environment variable: SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL')
  }

  return `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${path.replace(/^\//, '')}`
}

export async function POST(request: Request) {
  try {
    const payload = visitorEventPayloadSchema.parse(await request.json())
    const serviceRoleKey = getRequiredEnv('SUPABASE_VERCEL_SUPABASE_SERVICE_ROLE_KEY')

    const response = await fetch(getSupabaseRestUrl('website_visitor_events'), {
      method: 'POST',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        source_project: SOURCE_PROJECT,
        visitor_id: payload.visitorId,
        session_id: payload.sessionId ?? null,
        pathname: payload.pathname ?? null,
        referrer: payload.referrer ?? null,
        user_agent: request.headers.get('user-agent'),
        occurred_at: new Date().toISOString()
      })
    })

    if (!response.ok) {
      const errorText = await response.text()

      return NextResponse.json(
        {
          error: errorText || 'Could not persist visitor event.'
        },
        {
          status: 502
        }
      )
    }

    return new NextResponse(null, {
      status: 204
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown visitor event error.'
      },
      {
        status: 400
      }
    )
  }
}
