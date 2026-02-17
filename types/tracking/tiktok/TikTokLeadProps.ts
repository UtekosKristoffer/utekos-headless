// Path: types/tracking/tiktok/TikTokLeadProps.ts

export type TikTokLeadProps = {
  eventId: string
  emailHash: string
  clientIp: string | undefined
  userAgent: string
  url: string
  ttclid?: string | undefined
  ttp?: string | undefined
}
