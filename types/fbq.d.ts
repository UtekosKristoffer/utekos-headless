// Path: types/fbq.d.ts
declare global {
  interface Window {
    fbq: {
      (method: 'init', pixelId: string): void
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
    }
    _fbq?: Window['fbq']
  }
}
export {}
