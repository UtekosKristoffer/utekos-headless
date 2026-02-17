// Path: src/lib/tracking/google/mapItems.ts
export function mapItems(order: any) {
  const lineItems = Array.isArray(order?.line_items) ? order.line_items : []
  return lineItems
    .map((item: any) => ({
      item_id:
        item?.sku
        || item?.variant_id?.toString()
        || item?.product_id?.toString(),
      item_name: item?.title,
      item_variant: item?.variant_title,
      item_brand: item?.vendor,
      price: item?.price !== undefined ? Number(item.price) : undefined,
      quantity: item?.quantity ? Number(item.quantity) : 1
    }))
    .filter((i: any) => !!i.item_id || !!i.item_name)
}
