import type { KlarnaPlacementData } from '../types'

export const DEFAULT_KLARNA_PLACEMENT_DATA: KlarnaPlacementData = {
  key: 'credit-promotion-badge',
  locale: 'no-NO',
  purchaseAmount: undefined as number | string | undefined
} as const
