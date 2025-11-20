analytics.subscribe('checkout_completed', event => {
  try {
    const checkout = event?.data?.checkout
    const order = checkout?.order
    const rawId = order?.admin_graphql_api_id || order?.id || null
    if (!rawId) return

    const eventId = `shopify_order_${rawId}`

    const currency =
      checkout?.currencyCode || checkout?.presentmentCurrency || order?.currency

    const totalStr =
      checkout?.totalPrice?.amount
      ?? checkout?.total_price
      ?? order?.total_price

    const value = totalStr != null ? parseFloat(String(totalStr)) : 0

    const lines = checkout?.lineItems ?? event?.data?.line_items ?? []
    const contents = []
    const contentIds = []

    for (const li of lines) {
      const id = li?.variant?.id ?? li?.variant_id ?? li?.product_id
      if (!id) continue
      const item = { id: String(id) }
      const qty = li?.quantity ?? li?.current_quantity
      const price = li?.price?.amount ?? li?.price
      if (qty != null) item.quantity = Number(qty)
      if (price != null) item.item_price = Number(price)
      contents.push(item)
      contentIds.push(String(id))
    }

    if (typeof fbq === 'function') {
      const customData = {
        value,
        currency,
        content_type: 'product',
        ...(contents.length ? { contents, content_ids: contentIds } : {})
      }

      fbq('track', 'Purchase', customData, { eventID: eventId })
    } else {
      const params = new URLSearchParams()
      params.set('id', '1092362672918571')
      params.set('ev', 'Purchase')
      params.set('eid', eventId)
      params.set('noscript', '1')
      params.set('cd[value]', String(value))
      if (currency) params.set('cd[currency]', currency)
      if (contents.length) {
        params.set('cd[contents]', JSON.stringify(contents))
        params.set('cd[content_type]', 'product')
        params.set('cd[content_ids]', JSON.stringify(contentIds))
      }
      const img = new Image()
      img.src = 'https://www.facebook.com/tr?' + params.toString()
    }
  } catch {}
})
