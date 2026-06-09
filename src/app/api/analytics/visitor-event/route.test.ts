import assert from 'node:assert/strict'
import test from 'node:test'

import { POST, resolveSupabaseCredentials } from './route'

const SUPABASE_ENV_KEYS = [
  'NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_URL',
  'SUPABASE_VERCEL_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_URL',
  'SUPABASE_VERCEL_SUPABASE_SECRET_KEY',
  'SUPABASE_VERCEL_SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SERVICE_ROLE_SECRET',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_VERCEL_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOG_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_POSTHOG_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
] as const

const SERVICE_ROLE_JWT = 'service.header.signature'
const ANON_JWT = 'anon.header.signature'

function resetSupabaseEnv() {
  for (const key of SUPABASE_ENV_KEYS) {
    delete process.env[key]
  }
}

function createVisitorEventRequest(payload: unknown) {
  return new Request('https://utekos.no/api/analytics/visitor-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-agent': 'node-test'
    },
    body: JSON.stringify(payload)
  })
}

test('resolveSupabaseCredentials falls back to anon JWT key when service role key is missing', () => {
  const originalEnv = { ...process.env }
  resetSupabaseEnv()

  process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_URL = 'https://example.supabase.co'
  process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_ANON_KEY = ANON_JWT
  process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_PUBLISHABLE_KEY = 'sb_publishable_public'

  try {
    const credentials = resolveSupabaseCredentials()

    assert.equal(credentials.url, 'https://example.supabase.co')
    assert.equal(credentials.authKey, ANON_JWT)
    assert.equal(credentials.authMode, 'anon')
  } finally {
    process.env = originalEnv
  }
})

test('resolveSupabaseCredentials prefers server secret key when available', () => {
  const originalEnv = { ...process.env }
  resetSupabaseEnv()

  process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_URL = 'https://example.supabase.co'
  process.env.SUPABASE_VERCEL_SUPABASE_SECRET_KEY = 'sb_secret_private'
  process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_ANON_KEY = ANON_JWT

  try {
    const credentials = resolveSupabaseCredentials()

    assert.equal(credentials.authKey, 'sb_secret_private')
    assert.equal(credentials.authMode, 'service_role')
  } finally {
    process.env = originalEnv
  }
})

test('POST returns 204 when Supabase persistence fails', async () => {
  const originalEnv = { ...process.env }
  const originalFetch = globalThis.fetch
  resetSupabaseEnv()

  process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_URL = 'https://example.supabase.co'
  process.env.SUPABASE_VERCEL_SUPABASE_SERVICE_ROLE_KEY = SERVICE_ROLE_JWT
  globalThis.fetch = (async () => new Response('Unauthorized', { status: 401 })) as typeof fetch

  try {
    const response = await POST(createVisitorEventRequest({
      visitorId: 'visitor-123',
      sessionId: 'session-123',
      pathname: '/produkter/utekos-techdown',
      referrer: 'https://example.com'
    }))

    assert.equal(response.status, 204)
  } finally {
    process.env = originalEnv
    globalThis.fetch = originalFetch
  }
})

test('POST retries anon credentials after service role 401', async () => {
  const originalEnv = { ...process.env }
  const originalFetch = globalThis.fetch
  const requests: Array<{ headers: Headers }> = []
  resetSupabaseEnv()

  process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_URL = 'https://example.supabase.co'
  process.env.SUPABASE_VERCEL_SUPABASE_SERVICE_ROLE_KEY = SERVICE_ROLE_JWT
  process.env.NEXT_PUBLIC_SUPABASE_VERCEL_SUPABASE_POSTHOGSUPABASE_PUBLISHABLE_KEY = 'sb_publishable_public'

  globalThis.fetch = (async (_input, init) => {
    requests.push({
      headers: new Headers(init?.headers)
    })

    return requests.length === 1
      ? new Response('Unauthorized', { status: 401 })
      : new Response(null, { status: 201 })
  }) as typeof fetch

  try {
    const response = await POST(createVisitorEventRequest({
      visitorId: 'visitor-123',
      sessionId: 'session-123',
      pathname: '/produkter/utekos-techdown',
      referrer: 'https://example.com'
    }))

    assert.equal(response.status, 204)
    assert.equal(requests.length, 2)
    assert.equal(requests[0]?.headers.get('Authorization'), `Bearer ${SERVICE_ROLE_JWT}`)
    assert.equal(requests[1]?.headers.get('apikey'), 'sb_publishable_public')
    assert.equal(requests[1]?.headers.has('Authorization'), false)
  } finally {
    process.env = originalEnv
    globalThis.fetch = originalFetch
  }
})
