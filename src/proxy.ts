import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHash } from 'crypto'

const SGTM_ENDPOINT = 'https://sgtm-tracking-351763550388.europe-north1.run.app'
const TRACKING_PATH = '/metrics'

const MARKETING_CONFIG = {
  utm_params: [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term'
  ],
  fbclid_param: 'fbclid',
  fbc_param: 'fbc',
  email_param: 'email',
  additional_params: ['gclid', 'msclkid', 'gbraid', 'wbraid', 'dclid'],
  cookie_max_age: 30 * 24 * 60 * 60,
  cookie_path: '/',
  cookie_domain: process.env.COOKIE_DOMAIN,
  json_cookie_name: 'marketing_params',
  email_hash_cookie_name: 'email_hash',
  fbc_cookie_name: '_fbc'
}

interface MarketingParams {
  utm: Record<string, string>
  fbclid: string
  fbc: string
  email: string
  emailHash: string
  additionalParams: Record<string, string>
  all: Record<string, string>
  timestamp: string
}

interface CookieConfig {
  name: string
  value: string
  maxAge: number
  path: string
  domain?: string
  sameSite: 'Strict' | 'Lax' | 'None'
  secure: boolean
}

function hashEmail(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
}

function formatFbcCookie(
  fbclid: string,
  timestamp: number = Date.now()
): string {
  return `fb.1.${timestamp}.${fbclid}`
}

function extractMarketingParams(
  searchParams: URLSearchParams
): MarketingParams {
  const timestamp = new Date().toISOString()
  const marketing: MarketingParams = {
    utm: {},
    fbclid: '',
    fbc: '',
    email: '',
    emailHash: '',
    additionalParams: {},
    all: {},
    timestamp
  }

  MARKETING_CONFIG.utm_params.forEach(param => {
    const value = searchParams.get(param)
    if (value) {
      marketing.utm[param] = value
      marketing.all[param] = value
    }
  })

  const fbclid = searchParams.get(MARKETING_CONFIG.fbclid_param)
  if (fbclid) {
    marketing.fbclid = fbclid
    marketing.all[MARKETING_CONFIG.fbclid_param] = fbclid
  }

  const fbc = searchParams.get(MARKETING_CONFIG.fbc_param)
  if (fbc) {
    marketing.fbc = fbc
    marketing.all[MARKETING_CONFIG.fbc_param] = fbc
  }

  const email = searchParams.get(MARKETING_CONFIG.email_param)
  if (email) {
    marketing.email = email
    marketing.emailHash = hashEmail(email)
    marketing.all.email_hash = marketing.emailHash
  }

  MARKETING_CONFIG.additional_params.forEach(param => {
    const value = searchParams.get(param)
    if (value) {
      marketing.additionalParams[param] = value
      marketing.all[param] = value
    }
  })

  return marketing
}

function buildCookieConfigs(
  params: MarketingParams,
  isSecureConnection: boolean
): CookieConfig[] {
  const cookies: CookieConfig[] = []

  const jsonCookieValue = JSON.stringify({
    utm: params.utm,
    fbclid: params.fbclid,
    fbc: params.fbc,
    additionalParams: params.additionalParams,
    timestamp: params.timestamp
  })

  const jsonCookie: CookieConfig = {
    name: MARKETING_CONFIG.json_cookie_name,
    value: jsonCookieValue,
    maxAge: MARKETING_CONFIG.cookie_max_age,
    path: MARKETING_CONFIG.cookie_path,
    sameSite: isSecureConnection ? 'None' : 'Lax',
    secure: isSecureConnection
  }
  if (MARKETING_CONFIG.cookie_domain) {
    jsonCookie.domain = MARKETING_CONFIG.cookie_domain
  }
  cookies.push(jsonCookie)

  if (params.emailHash) {
    const emailHashCookie: CookieConfig = {
      name: MARKETING_CONFIG.email_hash_cookie_name,
      value: params.emailHash,
      maxAge: MARKETING_CONFIG.cookie_max_age,
      path: MARKETING_CONFIG.cookie_path,
      sameSite: isSecureConnection ? 'None' : 'Lax',
      secure: isSecureConnection
    }
    if (MARKETING_CONFIG.cookie_domain) {
      emailHashCookie.domain = MARKETING_CONFIG.cookie_domain
    }
    cookies.push(emailHashCookie)
  }

  if (params.fbclid) {
    const fbcValue = params.fbc || formatFbcCookie(params.fbclid)
    const fbcCookie: CookieConfig = {
      name: MARKETING_CONFIG.fbc_cookie_name,
      value: fbcValue,
      maxAge: MARKETING_CONFIG.cookie_max_age,
      path: MARKETING_CONFIG.cookie_path,
      sameSite: isSecureConnection ? 'None' : 'Lax',
      secure: isSecureConnection
    }
    if (MARKETING_CONFIG.cookie_domain) {
      fbcCookie.domain = MARKETING_CONFIG.cookie_domain
    }
    cookies.push(fbcCookie)
  }

  return cookies
}

function formatCookieHeader(config: CookieConfig): string {
  const parts = [
    `${encodeURIComponent(config.name)}=${encodeURIComponent(config.value)}`,
    `Path=${config.path}`,
    `Max-Age=${config.maxAge}`,
    `SameSite=${config.sameSite}`
  ]

  if (config.domain) {
    parts.push(`Domain=${config.domain}`)
  }

  if (config.secure) {
    parts.push('Secure')
  }

  return parts.join('; ')
}

function handleMarketingParams(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  const url = new URL(request.url)
  const isSecureConnection = url.protocol === 'https:'

  const marketingParams = extractMarketingParams(url.searchParams)

  if (Object.keys(marketingParams.all).length === 0) {
    return response
  }

  const existingFbc = request.cookies.get(MARKETING_CONFIG.fbc_cookie_name)
  if (marketingParams.fbclid && !marketingParams.fbc && existingFbc?.value) {
    const parts = existingFbc.value.split('.')
    if (parts.length === 4 && parts[3] === marketingParams.fbclid) {
      marketingParams.fbc = existingFbc.value
      marketingParams.all[MARKETING_CONFIG.fbc_param] = existingFbc.value
    }
  }

  const cookieConfigs = buildCookieConfigs(marketingParams, isSecureConnection)

  cookieConfigs.forEach(config => {
    const cookieHeader = formatCookieHeader(config)
    response.headers.append('Set-Cookie', cookieHeader)
  })

  response.headers.set(
    'X-Marketing-Params-Captured',
    Object.keys(marketingParams.all).join(',')
  )

  if (process.env.NODE_ENV === 'development') {
    console.log('[Marketing Params Captured]', {
      utm: marketingParams.utm,
      fbclid: marketingParams.fbclid,
      hasEmail: !!marketingParams.email,
      emailHashSet: !!marketingParams.emailHash,
      additionalParams: marketingParams.additionalParams,
      timestamp: marketingParams.timestamp
    })
  }

  return response
}

export async function proxy(request: NextRequest) {
  const url = new URL(request.url)
  const pathname = url.pathname
  const isTargetRoute =
    !pathname.startsWith('/_next') && !pathname.startsWith('/api/internal')

  if (!isTargetRoute) {
    return NextResponse.next()
  }

  if (pathname.startsWith(TRACKING_PATH)) {
    try {
      const targetPath = pathname.replace(TRACKING_PATH, '')
      const targetUrl = new URL(
        targetPath + url.search,
        SGTM_ENDPOINT
      ).toString()

      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('host', new URL(SGTM_ENDPOINT).host)

      const ip = request.headers.get('x-forwarded-for') ?? ''
      requestHeaders.set('x-forwarded-for', ip)

      requestHeaders.set('accept-encoding', 'identity')
      requestHeaders.delete('content-length')

      const proxyResponse = await fetch(targetUrl, {
        method: request.method,
        headers: requestHeaders,
        body: request.body,
        duplex: 'half'
      } as RequestInit)

      const responseHeaders = new Headers(proxyResponse.headers)
      responseHeaders.delete('content-encoding')
      responseHeaders.delete('content-length')
      responseHeaders.delete('transfer-encoding')

      const response = new NextResponse(proxyResponse.body, {
        status: proxyResponse.status,
        statusText: proxyResponse.statusText,
        headers: responseHeaders
      })

      return response
    } catch (error) {
      console.error('[Proxy] sGTM forwarding failed:', error)
      return NextResponse.next()
    }
  }

  const response = NextResponse.next()
  return handleMarketingParams(request, response)
}

const BLOCKED_USER_AGENTS = [
  'python-httpx',
  'python-requests',
  'aiohttp',
  'scrapy',
  'curl',
  'wget'
]

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|videos).*)'
  ]
}

export {
  handleMarketingParams,
  extractMarketingParams,
  buildCookieConfigs,
  formatCookieHeader,
  hashEmail,
  formatFbcCookie
}
