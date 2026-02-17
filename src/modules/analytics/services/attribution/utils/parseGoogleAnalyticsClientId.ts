// Path: src/modules/analytics/services/attribution/utils/parseGoogleAnalyticsClientId.ts
export function parseGoogleAnalyticsClientId(
  cookieVal: string
): string | undefined {
  const parts = cookieVal.split('.')
  if (parts.length >= 4) return `${parts[2]}.${parts[3]}`
  return undefined
}
