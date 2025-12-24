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
})(window, document, 'script', 'dataLayer', 'GTM-5TWMJQFP')

gtag('consent', 'update', {
  ad_storage: 'granted',
  analytics_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted'
})

analytics.subscribe('checkout_completed', event => {
  window.dataLayer.push({
    event: 'checkout_completed',
    timestamp: event.timestamp,
    id: event.id,
    token: event.data?.checkout?.token,
    url: event.context.document.location.href,
    client_id: event.clientId,
    email: event.data?.checkout?.email,
    phone: event.data?.checkout?.phone,
    first_name: event.data?.checkout?.shippingAddress?.firstName,
    last_name: event.data?.checkout?.shippingAddress?.lastName,
    address1: event.data?.checkout?.shippingAddress?.address1,
    address2: event.data?.checkout?.shippingAddress?.address2,
    city: event.data?.checkout?.shippingAddress?.city,
    country: event.data?.checkout?.shippingAddress?.country,
    countryCode: event.data?.checkout?.shippingAddress?.countryCode,
    province: event.data?.checkout?.shippingAddress?.province,
    provinceCode: event.data?.checkout?.shippingAddress?.provinceCode,
    zip: event.data?.checkout?.shippingAddress?.zip,
    orderId: event.data?.checkout?.order?.id,
    currency: event.data?.checkout?.currencyCode,
    subtotal: event.data?.checkout?.subtotalPrice?.amount,
    shipping: event.data?.checkout?.shippingLine?.price?.amount,
    value: event.data?.checkout?.totalPrice?.amount,
    tax: event.data?.checkout?.totalTax?.amount
  })
})
