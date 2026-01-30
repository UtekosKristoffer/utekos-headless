import { getCookie } from '@/components/analytics/MetaPixel/getCookie'
export function logAttribution(productName: string, price: number) {
  try {
    const snapId = getCookie('ute_sc_cid')
    const metaId = getCookie('_fbc') // Meta Click ID cookie

    const sources = []
    if (snapId) sources.push('Snapchat 👻')
    if (metaId) sources.push('Meta 💙')

    if (sources.length > 0) {
      const sourceLabel = sources.join(' + ')
      fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: 'INFO',
          event: `🛒 AddToCart fra ${sourceLabel}`,
          context: {
            source: sourceLabel,
            product: productName,
            value: price,
            snapId: snapId || undefined,
            metaId: metaId || undefined
          }
        })
      })
    }
  } catch (err) {
    console.error('Logging failed', err)
  }
}
