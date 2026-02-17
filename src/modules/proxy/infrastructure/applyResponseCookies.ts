import type { NextResponse } from 'next/server'
import type { ProxyCookieConfig } from '@/modules/proxy/types'

export function applyResponseCookies(
  response: NextResponse,
  cookies: ProxyCookieConfig[]
): void {
  for (const cookie of cookies) {
    response.cookies.set(cookie.name, cookie.value, cookie.options)
  }
}
