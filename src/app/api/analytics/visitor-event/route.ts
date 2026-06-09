import { NextResponse } from 'next/server'
import { z } from 'zod'

const SOURCE_PROJECT = 'utekos-headless'

type SupabaseAuthMode = 'service_role' | 'anon'
type SupabaseCredentials = {
  url: string | undefined
  serviceRoleKey: string | undefined
  anonKey: string | undefined
  authKey: string | null
  authMode: SupabaseAuthMode | 'missing'
}

const visitorEventPayloadSchema = z.object({
  visitorId: z.string().trim().min(8).max(160),
  sessionId: z.string().trim().min(8).max(160).optional().nullable(),
  pathname: z.string().trim().min(1).max(2048).optional().nullable(),
  referrer: z.string().trim().max(2048).optional().nullable()
})

function normalizeEnvValue(value: string | undefined) {
  const normalized = value?.trim()

  return normalized && normalized.length > 0 ? normalized : undefined
}

function isJwtLikeKey(value: string | undefined) {
  return normalizeEnvValue(value)?.split('.').length === 3
}

function isSupabasePlatformKey(value: string | undefined) {
  const normalized = normalizeEnvValue(value)

  return normalized?.startsWith('sb_publishable_') || normalized?.startsWith('sb_secret_') || false
}

function isUsableSupabaseRestKey(value: string | undefined) {
  return isJwtLikeKey(value) || isSupabasePlatformKey(value)
}

function pickFirstSupabaseRestKey(values: Array<string | undefined>) {
  return values.find(isUsableSupabaseRestKey)
}

export function resolveSupabaseCredentials(): SupabaseCredentials {
  const url =
    normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_URL)
    || normalizeEnvValue(process.env.SUPABASE_VERCEL_SUPABASE_URL)
    || normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL)
    || normalizeEnvValue(process.env.SUPABASE_URL)

  const serviceRoleKey = pickFirstSupabaseRestKey([
    process.env.SUPABASE_VERCEL_SUPABASE_SECRET_KEY,
    process.env.SUPABASE_VERCEL_SUPABASE_SERVICE_ROLE_KEY,
    process.env.SUPABASE_SERVICE_ROLE_SECRET,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ])

  const anonKey = pickFirstSupabaseRestKey([
    process.env.SUPABASE_VERCEL_SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOG_SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_POSTHOG_SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_PUBLISHABLE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ])

  return {
    url,
    serviceRoleKey,
    anonKey,
    authKey: serviceRoleKey || anonKey || null,
    authMode:
      serviceRoleKey ? 'service_role'
      : anonKey ? 'anon'
      : 'missing'
  }
}

function getSupabaseRestUrl(url: string, path: string) {
  return `${url.replace(/\/$/, '')}/rest/v1/${path.replace(/^\//, '')}`
}

function createSupabaseRestHeaders(authKey: string) {
  const headers: Record<string, string> = {
    'apikey': authKey,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  }

  if (isJwtLikeKey(authKey)) {
    headers.Authorization = `Bearer ${authKey}`
  }

  return headers
}

export async function POST(request: Request) {
  let payload: z.infer<typeof visitorEventPayloadSchema>

  try {
    payload = visitorEventPayloadSchema.parse(await request.json())
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

  const { url, serviceRoleKey, anonKey } = resolveSupabaseCredentials()

  if (!url || (!serviceRoleKey && !anonKey)) {
    console.warn('visitor-event persistence skipped due to missing Supabase REST credentials', {
      hasUrl: Boolean(url),
      hasServiceRoleKey: Boolean(serviceRoleKey),
      hasAnonKey: Boolean(anonKey)
    })

    return new NextResponse(null, {
      status: 204
    })
  }

  const restUrl = getSupabaseRestUrl(url, 'website_visitor_events')
  const authModes: SupabaseAuthMode[] = serviceRoleKey ? ['service_role', 'anon'] : ['anon']

  let response: Response | null = null
  let usedAuthMode: SupabaseAuthMode | null = null

  try {
    for (const authMode of authModes) {
      const authKey = authMode === 'service_role' ? serviceRoleKey : anonKey

      if (!authKey) continue

      usedAuthMode = authMode
      response = await fetch(restUrl, {
        method: 'POST',
        headers: createSupabaseRestHeaders(authKey),
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

      if (response.ok) {
        break
      }

      if (response.status !== 401 && response.status !== 403) {
        break
      }

      if (authMode === 'service_role' && anonKey) {
        continue
      }

      break
    }
  } catch (error) {
    console.warn('visitor-event persistence failed', {
      usedAuthMode,
      errorText: error instanceof Error ? error.message : String(error)
    })

    return new NextResponse(null, {
      status: 204
    })
  }

  if (!response || !response.ok) {
    const errorText = response ? await response.text() : 'No response from Supabase.'

    console.warn('visitor-event persistence failed', {
      status: response?.status ?? 502,
      usedAuthMode,
      errorText
    })

    return new NextResponse(null, {
      status: 204
    })
  }

  return new NextResponse(null, {
    status: 204
  })
}
