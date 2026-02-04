export interface AdPlatformConfig {
  id: 'meta' | 'snapchat' | 'pinterest' | 'tiktok'
  param: string
  cookieName: string | undefined // exactOptionalPropertyTypes compliance
  logConfig: {
    eventName: string
    emoji: string
  }
}

export interface DetectedAdInteraction {
  platformId: string
  paramValue: string
  cookieName: string | undefined
  logData: {
    event: string
    level: 'INFO'
    context: Record<string, string>
  }
}

export interface MiddlewareCookieConfig {
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

export interface MiddlewareContext {
  userAgent: string
  referer: string
  url: URL
  pathname: string
  isProduction: boolean
  isTargetRoute: boolean
  isBlockedAgent: boolean
}

export interface MiddlewareActionPlan {
  cookiesToSet: MiddlewareCookieConfig[]
  logsToDispatch: DetectedAdInteraction['logData'][]
}
