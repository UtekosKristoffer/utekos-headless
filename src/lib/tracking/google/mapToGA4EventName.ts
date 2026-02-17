export function mapToGA4EventName(metaName: string): string {
  const map: Record<string, string> = {
    Purchase: 'purchase',
    AddToCart: 'add_to_cart',
    InitiateCheckout: 'begin_checkout',
    ViewContent: 'view_item',
    PageView: 'page_view',
    Lead: 'generate_lead'
  }
  return map[metaName] || metaName.toLowerCase().replace(/\s+/g, '_')
}
