// Path: types/window.d.ts

declare global {
  interface Window {
    fbq: {
      (
        method: 'init',
        pixelId: string,
        userData?: Record<string, unknown>
      ): void
      (
        method: 'track',
        event: string,
        params?: Record<string, unknown>,
        options?: { eventID?: string }
      ): void
      (
        method: 'trackCustom',
        event: string,
        params?: Record<string, unknown>,
        options?: { eventID?: string }
      ): void
      (method: 'set', property: string, value: any, pixelId?: string): void
      loaded?: boolean
      version?: string
      queue?: unknown[]
    }
    _fbq?: Window['fbq']
    dataLayer: Record<string, any>[]
    snaptr?: (
      method: string,
      eventType: string,
      data?: Record<string, string | number | string[]>
    ) => void

    pintrk?: {
      (method: 'load', tagId: string, userData?: Record<string, unknown>): void
      (method: 'page'): void
      (method: 'track', event: string, data?: Record<string, unknown>): void
      (method: string, ...args: any[]): void
      queue: any[]
      version: string
      loaded?: boolean
    }
    ttq?: {
      load: (id: string) => void
      page: () => void
      track: (
        event: string,
        params?: Record<string, any>,
        options?: { event_id?: string }
      ) => void
      identify: (data: {
        email?: string
        phone?: string
        external_id?: string
      }) => void
      instance: (id: string) => any
      on: (event: string, callback: () => void) => void
      off: (event: string, callback: () => void) => void
      methods: string[]
      setAndDefer: (target: any, method: string) => void
      _i: Record<string, any>
      _t: Record<string, number>
      _o: Record<string, any>
    }
    TiktokAnalyticsObject?: string
  }
}

export {}
