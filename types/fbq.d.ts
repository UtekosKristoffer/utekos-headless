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
    snaptr: {
      (method: 'init', pixelId: string, config?: Record<string, any>): void
      (method: 'track', event: string, params?: Record<string, any>): void
      handleRequest?: (...args: any[]) => void
      queue?: any[]
    }
    _snaptr_loaded?: boolean

    // Klaviyo (New Object & Legacy)
    // Dokumentasjon: https://developers.klaviyo.com/en/docs/javascript_api
    klaviyo: {
      // Core methods
      push: (...args: any[]) => void

      // Tracking
      track: (
        event: string,
        properties?: Record<string, any>,
        callback?: Function
      ) => boolean // Returns Promise/Boolean in new API

      trackViewedItem: (item: Record<string, any>, callback?: Function) => void

      // Identification
      identify: (
        properties: Record<string, any>,
        callback?: Function
      ) => Record<string, any> // Returns Promise/Object in new API

      isIdentified: (callback?: Function) => boolean

      // Forms
      openForm: (formId: string, callback?: Function) => void

      // Configuration
      account: (accountId?: string, callback?: Function) => string
      cookieDomain: (cookieDomain?: string, callback?: Function) => string
    }

    // Legacy Klaviyo object (fremdeles brukt internt av proxyen)
    _learnq: any[]
    _klOnsite: any[] // Brukes av det nye proxy-scriptet som kø
  }
}

export {}
