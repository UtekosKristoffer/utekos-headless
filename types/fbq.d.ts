;/ Path: types/bfq.d.ts
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
      // Meta Pixel properties
      loaded?: boolean
      version?: string
      queue?: unknown[]
    }
    _fbq?: Window['fbq']
  }
}

export {}
