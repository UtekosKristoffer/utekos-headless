// Path: types/fbq.d.ts

declare global {
  interface Window {
    // Facebook Pixel (Meta)
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

    // Google Tag Manager / Analytics Data Layer
    dataLayer: Record<string, any>[]

    // Snapchat Pixel
    snaptr?: (
      method: string,
      eventType: string,
      data?: Record<string, string | number | string[]>
    ) => void
  }
}

export {}
