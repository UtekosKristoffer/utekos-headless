// Path: types/tracking/meta/MetaPixel.ts

export type MetaPixel = {
  (method: 'init', pixelId: string, userData?: Record<string, unknown>): void
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
  (method: 'set', property: string, value: unknown, pixelId?: string): void
  loaded?: boolean
  version?: string
  queue?: unknown[]
}
