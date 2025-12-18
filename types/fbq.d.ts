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
    snaptr: {
      (method: 'init', pixelId: string, config?: Record<string, any>): void
      (method: 'track', event: string, params?: Record<string, any>): void
      handleRequest?: (...args: any[]) => void
      queue?: any[]
    }
    _snaptr_loaded?: boolean
    klaviyo: {
      push: (...args: any[]) => void
      track: (
        event: string,
        properties?: Record<string, any>,
        callback?: Function
      ) => boolean
      identify: (
        properties: Record<string, any>,
        callback?: Function
      ) => Record<string, any>
      trackViewedItem: (item: Record<string, any>, callback?: Function) => void
    }
    _learnq: any[]
  }
}

export {}
