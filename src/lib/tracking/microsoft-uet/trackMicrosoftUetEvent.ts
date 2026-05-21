type MicrosoftUetPayloadValue = string | number | string[]

export type TrackMicrosoftUetEventOptions = {
  category?: string
  action?: string
  label?: string
  value?: number
  revenueValue?: number
  currency?: string
  productId?: string | string[]
  pageType?: string
}

function addDefinedValue(
  payload: Record<string, MicrosoftUetPayloadValue>,
  key: string,
  value: MicrosoftUetPayloadValue | undefined
): void {
  if (value === undefined) return
  if (typeof value === 'number' && !Number.isFinite(value)) return
  if (Array.isArray(value) && value.length === 0) return
  payload[key] = value
}

function normalizeProductIds(
  productId: string | string[] | undefined
): string | string[] | undefined {
  if (!productId) return undefined
  if (!Array.isArray(productId)) return productId

  const productIds = productId.filter(Boolean)
  if (productIds.length === 0) return undefined
  return productIds.length === 1 ? productIds[0] : productIds
}

export function trackMicrosoftUetEvent({
  category,
  action,
  label,
  value,
  revenueValue,
  currency,
  productId,
  pageType
}: TrackMicrosoftUetEventOptions): void {
  if (typeof window === 'undefined') return

  const payload: Record<string, MicrosoftUetPayloadValue> = {}

  addDefinedValue(payload, 'ec', category)
  addDefinedValue(payload, 'ea', action)
  addDefinedValue(payload, 'el', label)
  addDefinedValue(payload, 'ev', value)
  addDefinedValue(payload, 'gv', revenueValue)
  addDefinedValue(payload, 'gc', currency)
  addDefinedValue(payload, 'prodid', normalizeProductIds(productId))
  addDefinedValue(payload, 'pagetype', pageType)

  if (Object.keys(payload).length === 0) return

  const microsoftUetQueue = window.uetq ?? ([] as Record<string, unknown>[])
  window.uetq = microsoftUetQueue
  ;(microsoftUetQueue as Record<string, unknown>[]).push(payload)
}
