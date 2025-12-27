// Path: src/proxy.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHash } from 'crypto'

// Configuration for marketing parameters
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
  cookie_max_age: 30 * 24 * 60 * 60, // 30 days in seconds
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

/**
 * Hash email address using SHA256
 * @param email Email address to hash
 * @returns Hashed email (SHA256)
 */
function hashEmail(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex')
}
/**
 * Format Facebook Click ID (_fbc) cookie
 * @param fbclid Facebook Click ID value
 * @param timestamp Optional timestamp for cookie creation
 * @returns Formatted _fbc cookie value
 */
function formatFbcCookie(
  fbclid: string,
  timestamp: number = Date.now()
): string {
  // Format: fb.1.creationTime.fbclid
  // Meta forventer tidsstempel i millisekunder
  return `fb.1.${timestamp}.${fbclid}`
}
/**
 * Extract marketing parameters (UTM, FBCLID, email, etc.) from URL query string
 * @param searchParams URLSearchParams object
 * @returns Object containing extracted marketing parameters
 */
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

  // Extract UTM parameters
  MARKETING_CONFIG.utm_params.forEach(param => {
    const value = searchParams.get(param)
    if (value) {
      marketing.utm[param] = value
      marketing.all[param] = value
    }
  })

  // Extract FBCLID parameter
  const fbclid = searchParams.get(MARKETING_CONFIG.fbclid_param)
  if (fbclid) {
    marketing.fbclid = fbclid
    marketing.all[MARKETING_CONFIG.fbclid_param] = fbclid
  }

  // Extract FBC parameter
  const fbc = searchParams.get(MARKETING_CONFIG.fbc_param)
  if (fbc) {
    marketing.fbc = fbc
    marketing.all[MARKETING_CONFIG.fbc_param] = fbc
  }

  // Extract email and hash it
  const email = searchParams.get(MARKETING_CONFIG.email_param)
  if (email) {
    marketing.email = email
    marketing.emailHash = hashEmail(email)
    marketing.all.email_hash = marketing.emailHash
  }

  // Extract additional marketing parameters
  MARKETING_CONFIG.additional_params.forEach(param => {
    const value = searchParams.get(param)
    if (value) {
      marketing.additionalParams[param] = value
      marketing.all[param] = value
    }
  })

  return marketing
}

/**
 * Build cookie configuration objects for Set-Cookie headers
 * @param params Marketing parameters to set as cookies
 * @param isSecureConnection Whether connection is secure (HTTPS)
 * @returns Array of cookie configurations
 */
function buildCookieConfigs(
  params: MarketingParams,
  isSecureConnection: boolean
): CookieConfig[] {
  const cookies: CookieConfig[] = []

  // Create JSON cookie for all marketing parameters
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

  // Create email hash cookie if email was provided
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

  // Create _fbc cookie if fbclid is provided
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

/**
 * Format cookie configuration into Set-Cookie header string
 * @param config Cookie configuration object
 * @returns Formatted Set-Cookie header string
 */
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

/**
 * Main handler for marketing parameters
 * Extracts UTM, FBCLID, email, and other marketing parameters from request,
 * builds cookies (including JSON cookie and hashed email), and applies them to response
 * @param request NextRequest object
 * @param response NextResponse object to modify
 * @returns Updated NextResponse with Set-Cookie headers
 */
function handleMarketingParams(
  request: NextRequest,
  response: NextResponse
): NextResponse {
  const url = new URL(request.url)
  const isSecureConnection = url.protocol === 'https:'

  // Extract marketing parameters from URL query string
  const marketingParams = extractMarketingParams(url.searchParams)

  // Only process if marketing parameters are present
  if (Object.keys(marketingParams.all).length === 0) {
    return response
  }

  // Build cookie configurations
  const cookieConfigs = buildCookieConfigs(marketingParams, isSecureConnection)

  // Apply cookies to response
  cookieConfigs.forEach(config => {
    const cookieHeader = formatCookieHeader(config)
    response.headers.append('Set-Cookie', cookieHeader)
  })

  // Add custom header for tracking (optional)
  response.headers.set(
    'X-Marketing-Params-Captured',
    Object.keys(marketingParams.all).join(',')
  )

  // Log marketing params captured (for debugging)
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

/**
 * Middleware entry point for Vercel
 * Integrates marketing parameter handling into the proxy logic
 */
export function proxy(request: NextRequest) {
  const url = new URL(request.url)
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  const pathname = url.pathname
  const isTargetRoute =
    !pathname.startsWith('/_next') && !pathname.startsWith('/api/internal')

  if (!isTargetRoute) {
    return NextResponse.next()
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

const SENSITIVE_PATHS_REGEX =
  /\.(env|git|config|aws|yml|yaml|sql|bak|backup|key|secret)|^\/admin/i

/**
 * Middleware entry point for Vercel
 * Integrates marketing parameter handling, security checks, and request filtering
 */

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|videos).*)'
  ]
}


// Export functions for testing and reuse
export {
  handleMarketingParams,
  extractMarketingParams,
  buildCookieConfigs,
  formatCookieHeader,
  hashEmail,
  formatFbcCookie
}


