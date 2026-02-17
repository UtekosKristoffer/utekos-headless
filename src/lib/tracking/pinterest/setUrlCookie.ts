// Path: src/lib/tracking/pinterest/setUrlCookie.ts
export function setUrlCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`
}
