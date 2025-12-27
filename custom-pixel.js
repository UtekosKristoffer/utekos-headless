const GTM_CONTAINER_ID = 'GTM-5TWMJQFP'

window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}

;(function (w, d, s, l, i) {
  w[l] = w[l] || []
  w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : ''
  j.async = true
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
  f.parentNode.insertBefore(j, f)
})(window, document, 'script', 'dataLayer', GTM_CONTAINER_ID)

const currentUrl = init.context.document.location.href
const urlObj = new URL(currentUrl)

const passedClientId = urlObj.searchParams.get('force_client_id')
const passedGclid = urlObj.searchParams.get('gclid')

if (passedClientId || passedGclid) {
  window.dataLayer.push({
    event: 'cross_domain_data_ready',
    original_client_id: passedClientId,
    original_gclid: passedGclid
  })
}

analytics.subscribe('checkout_completed', event => {
  const checkout = event.data.checkout

  const transactionId = checkout.order ? checkout.order.id : checkout.id

  const items = checkout.lineItems.map(item => ({
    item_id: item.variant.product.id,
    item_name: item.variant.product.title,
    price: item.variant.price.amount,
    quantity: item.quantity,
    item_variant: item.variant.title,
    currency: checkout.currencyCode
  }))

  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      value: checkout.totalPrice.amount,
      tax: checkout.totalTax.amount,
      shipping: checkout.shippingLine ? checkout.shippingLine.price.amount : 0,
      currency: checkout.currencyCode,
      coupon:
        (
          checkout.discountApplications
          && checkout.discountApplications.length > 0
        ) ?
          checkout.discountApplications[0].title
        : undefined,
      items: items
    },
    user_data: {
      email: checkout.email,
      phone: checkout.phone,
      address: {
        first_name: checkout.shippingAddress?.firstName,
        last_name: checkout.shippingAddress?.lastName,
        street: checkout.shippingAddress?.address1,
        city: checkout.shippingAddress?.city,
        region: checkout.shippingAddress?.provinceCode,
        postal_code: checkout.shippingAddress?.zip,
        country: checkout.shippingAddress?.countryCode
      }
    },
    original_client_id: passedClientId,
    original_gclid: passedGclid
  })
})

analytics.subscribe('page_viewed', event => {
  window.dataLayer.push({
    event: 'page_view',
    page_location: event.context.document.location.href,
    page_title: event.context.document.title
  })
})
