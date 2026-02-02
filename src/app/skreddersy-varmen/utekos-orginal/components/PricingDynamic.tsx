import { getProduct } from '@/api/lib/products/getProduct'
import { PriceDisplay } from './components/PriceDisplay' // Importer UI

export const PricingDynamic = async ({
  handle,
  theme = 'light'
}: {
  handle: string
  theme?: 'light' | 'dark'
}) => {
  const product = await getProduct(handle)
  if (!product) return null

  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const compareAt =
    product.compareAtPriceRange?.minVariantPrice ?
      parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null

  return <PriceDisplay price={price} compareAtPrice={compareAt} theme={theme} />
}
