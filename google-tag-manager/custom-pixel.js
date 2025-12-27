/**
 * Tittel: GTM Custom Pixel for Utekos.no (Headless)
 * Beskrivelse: Håndterer GA4 Ecommerce, Google Ads Enhanced Conversions og Cross-Domain Tracking
 * Container ID: GTM-5TWMJQFP
 */

// 1. Initialiser dataLayer og gtag-funksjon
window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}

// 2. Last inn Google Tag Manager (Sandbox-versjon)
;(function (w, d, s, l, i) {
  w[l] = w[l] || []
  w[l].push({
    'gtm.start': new Date().getTime(),
    'event': 'gtm.js'
  })
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : ''
  j.async = true
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
  f.parentNode.insertBefore(j, f)
})(window, document, 'script', 'dataLayer', 'GTM-5TWMJQFP') // Din Container ID

// 3. Konfigurer Consent (Standardinnstilling)
// Siden Shopify blokkerer pixelen hvis samtykke mangler (pga. innstillingene dine),
// setter vi disse til 'granted' når skriptet først kjører.
gtag('consent', 'update', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted'
})

// --- CROSS-DOMAIN LOGIKK (NY) ---

// Henter URL fra init-konteksten for å se etter parametere sendt fra hovedsiden
// Dette er nødvendig for at GTM skal kunne koble sesjonen fra headless-butikken til checkout
const currentUrl = init.context.document.location.href
const urlObj = new URL(currentUrl)

const passedClientId = urlObj.searchParams.get('force_client_id')
const passedGclid = urlObj.searchParams.get('gclid')

// Hvis parametere finnes, push dem til dataLayer umiddelbart.
// Dette gjør at GTM-tags kan bruke dem til å sette feltverdier (Fields to Set).
if (passedClientId || passedGclid) {
  window.dataLayer.push({
    event: 'cross_domain_data_ready',
    original_client_id: passedClientId,
    original_gclid: passedGclid
  })
}

// --- HJELPEFUNKSJONER ---

// Hjelpefunksjon for å mappe handlekurv-linjer til GA4 Items-format
// Ref: measure-ecommerce-docs.md
const getItems = lineItems => {
  return lineItems.map((item, index) => {
    return {
      item_id: item.variant?.sku || item.variant?.id, // Prioriter SKU hvis tilgjengelig
      item_name: item.variant?.product?.title,
      price: item.variant?.price?.amount,
      quantity: item.quantity,
      item_variant: item.variant?.title, // F.eks "Large / Grønn"
      index: index
    }
  })
}

// --- HENDELSER (EVENTS) ---

// A. Checkout Started (Tilsvarer GA4: begin_checkout)
// Ref: web-pixel-api.md & measure-ecommerce-docs.md
analytics.subscribe('checkout_started', event => {
  const checkout = event.data.checkout

  window.dataLayer.push({
    event: 'begin_checkout',
    ecommerce: {
      currency: checkout.currencyCode,
      value: checkout.totalPrice?.amount,
      items: getItems(checkout.lineItems)
    }
  })
})

// B. Payment Info Submitted (Tilsvarer GA4: add_payment_info)
// Ref: web-pixel-api.md & measure-ecommerce-docs.md
analytics.subscribe('payment_info_submitted', event => {
  const checkout = event.data.checkout

  window.dataLayer.push({
    event: 'add_payment_info',
    ecommerce: {
      currency: checkout.currencyCode,
      value: checkout.totalPrice?.amount,
      items: getItems(checkout.lineItems),
      payment_type: 'unknown',
      coupon: checkout.discountApplications?.[0]?.title || undefined
    }
  })
})

// C. Checkout Completed (Tilsvarer GA4: purchase) - KRITISK
// Ref: web-pixel-api.md & measure-ecommerce-docs.md
analytics.subscribe('checkout_completed', event => {
  const checkout = event.data.checkout

  // Klargjør brukerdata for Enhanced Conversions
  // Vi sender rådata til dataLayer, så hasher GTM det via "User-Provided Data" variabelen.
  const userData = {
    email: checkout.email,
    phone_number: checkout.phone,
    address: {
      first_name: checkout.shippingAddress?.firstName,
      last_name: checkout.shippingAddress?.lastName,
      street: checkout.shippingAddress?.address1,
      city: checkout.shippingAddress?.city,
      region: checkout.shippingAddress?.province,
      postal_code: checkout.shippingAddress?.zip,
      country: checkout.shippingAddress?.countryCode
    }
  }

  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: checkout.order?.id, // Unik ID for ordren
      value: checkout.totalPrice?.amount,
      tax: checkout.totalTax?.amount,
      shipping: checkout.shippingLine?.price?.amount,
      currency: checkout.currencyCode,
      coupon: checkout.discountApplications?.[0]?.title || undefined,
      items: getItems(checkout.lineItems),
      payment_type: 'unknown'
    },
    // Legger ved brukerdata på toppnivå for enkel tilgang i GTM
    user_data: userData,
    // Sender med cross-domain IDer igjen for sikkerhets skyld
    original_client_id: passedClientId,
    original_gclid: passedGclid
  })
})
