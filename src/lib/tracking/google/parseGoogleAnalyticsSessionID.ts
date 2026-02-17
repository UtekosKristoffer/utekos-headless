// Path: src/lib/tracking/google/parseGoogleAnalyticsSessionID.ts

export function parseGoogleAnalyticsSessionID(
  cookieValue: string | undefined
): string | null {
  if (!cookieValue) return null

  const parts = cookieValue.split('.')
  if (parts.length >= 3) {
    return parts[2] ?? null
  }
  return null
}
