// Path: types/fbq.d.ts

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
      // Fallback for andre metoder
      (method: string, ...args: any[]): void
      queue: any[]
      version: string
    }
  }
}

export {}
