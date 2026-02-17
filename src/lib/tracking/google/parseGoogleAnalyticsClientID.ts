// Path: src/lib/tracking/google/parseGoogleAnalyticsClientID.ts

export function parseGoogleAnalyticsClientID(
  cookieValue: string | undefined
): string | null {
  if (!cookieValue) return null

  const parts = cookieValue.split('.')
  if (parts.length >= 4) {
    return parts.slice(2).join('.')
  }
  return null
}
