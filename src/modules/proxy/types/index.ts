// Path: src/modules/proxy/types/index.ts
import type { NextRequest, NextResponse } from 'next/server'
export type AdPlatformConfig = {
  id: 'meta' | 'snapchat' | 'pinterest' | 'tiktok'
  param: string
  cookieName: string | undefined
  logConfig: {
    eventName: string
    emoji: string
  }
}

export type DetectedAdInteraction = {
  platformId: string
  paramValue: string
  cookieName: string | undefined
  logData: {
    event: string
    level: 'INFO'
    context: Record<string, string>
  }
}

export type ProxyCookieConfig = {
  name: string
  value: string
  options: {
    path: string
    secure: boolean
    httpOnly: boolean
    sameSite: 'lax' | 'strict' | 'none'
    maxAge: number
  }
}

export type ProxyContext = {
  userAgent: string
  referer: string
  url: URL
  pathname: string
  isProduction: boolean
  isTargetRoute: boolean
  isBlockedAgent: boolean
}

export type ProxyActionPlan = {
  cookiesToSet: ProxyCookieConfig[]
  logsToDispatch: DetectedAdInteraction['logData'][]
}

export type ProxyPipelineDependencies = {
  detectInteractions: (params: URLSearchParams) => DetectedAdInteraction[]
  planActions: (
    interactions: DetectedAdInteraction[],
    isProduction: boolean
  ) => ProxyActionPlan

  applyCookies: (res: NextResponse, cookies: ProxyCookieConfig[]) => void
  dispatchLogs: (
    req: NextRequest,
    logs: DetectedAdInteraction['logData'][],
    meta: { userAgent: string; referer: string }
  ) => Promise<void>

  legacyHandler: (req: NextRequest, res: NextResponse) => Promise<NextResponse>
}
