'use client'

import { usePurchaseLogic } from '@/hooks/usePurchaseLogic'
import { PurchaseClientViewLanding } from './PurchaseClientViewLanding'
import type { ShopifyProduct } from 'types/product'

export function PurchaseClientLanding({
  products
}: {
  products: Record<string, ShopifyProduct | null | undefined>
}) {
  const logic = usePurchaseLogic({ products })

  return <PurchaseClientViewLanding {...logic} isTechDownOffer={false} />
}
