import { getProduct } from '@/api/lib/products/getProduct'
import { PurchaseClient } from './PurchaseClient'

export async function SectionPurchase() {
  const product = await getProduct('utekos-techdown')

  if (!product) return null

  return <PurchaseClient product={product} />
}
