// Path: src/lib/tracking/google/parseSessionIdFromGaContainerCookie.ts

export function parseSessionIdFromGaContainerCookie(cookieValue?: string) {
  if (!cookieValue) return undefined
  const parts = cookieValue.split('.')
  const sid = parts?.[2]
  return sid ? Number(sid) : undefined
}
