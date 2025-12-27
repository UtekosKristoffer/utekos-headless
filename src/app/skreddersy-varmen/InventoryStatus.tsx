import { getProduct } from '@/api/lib/products/getProduct'
import { StockDisplay } from './StockDisplay' // Importer UI

export const InventoryStatus = async ({
  handle,
  theme = 'light'
}: {
  handle: string
  theme?: 'light' | 'dark'
}) => {
  const product = await getProduct(handle)
  if (!product) return null

  return (
    <StockDisplay
      count={product.totalInventory || 0}
      available={product.availableForSale}
      theme={theme}
    />
  )
}
