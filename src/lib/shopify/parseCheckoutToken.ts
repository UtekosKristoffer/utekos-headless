// Path: lib/shopify/parseCheckoutToken.ts
export function parseCheckoutToken(checkoutUrl: string): string | undefined {
  try {
    const url = new URL(checkoutUrl)
    const parts = url.pathname.split('/').filter(Boolean)
    const idx = parts.findIndex(p => p === 'checkouts')
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]

    return url.searchParams.get('token') ?? undefined
  } catch {
    return undefined
  }
}
