# Web Pixel API

Custom Web Pixels Custom Pixels are loaded within a lax sandbox and configured
within the pixel manager interface in the Shopify admin. For this developer
interface, the analytics, browser and the init variables on the api object have
already been deconstructed for you, and you can call them without having to
write any additional boilerplate code.

---

title: checkout_completed description: >- The `checkout_completed` event logs
when a visitor completes a purchase. It's triggered once for each checkout,
typically on the **Thank you** page. However, for upsells and post purchases,
the `checkout_completed` event is triggered on the first upsell offer page
instead. The event isn't triggered again on the **Thank you** page. If the page
where the event is supposed to be triggered fails to load, then the
`checkout_completed` event isn't triggered at all. api_name: web-pixels
source_url: html: >-
https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed
md: >-
https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed.md

---

# checkout_​completed

The `checkout_completed` event logs when a visitor completes a purchase. It's
triggered once for each checkout, typically on the **Thank you** page. However,
for upsells and post purchases, the `checkout_completed` event is triggered on
the first upsell offer page instead. The event isn't triggered again on the
**Thank you** page. If the page where the event is supposed to be triggered
fails to load, then the `checkout_completed` event isn't triggered at all.

## Properties

- clientId

  string

  The client-side ID of the customer, provided by Shopify

- context

  Context

- data

  PixelEventsCheckoutCompletedData

- id

  string

  The ID of the customer event

- name

  string

  The name of the customer event

- seq

  number

  The sequence index number of the event.

- timestamp

  string

  The timestamp of when the customer event occurred, in
  [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

- type

  EventType.Standard

### Examples

- #### Accessing Standard Events

  ##### Custom Pixel

  ```javascript
  analytics.subscribe('checkout_completed', event => {
    // Example for accessing event data
    const checkout = event.data.checkout

    const checkoutTotalPrice = checkout.totalPrice?.amount

    const allDiscountCodes = checkout.discountApplications.map(discount => {
      if (discount.type === 'DISCOUNT_CODE') {
        return discount.title
      }
    })

    const firstItem = checkout.lineItems[0]

    const firstItemDiscountedValue = firstItem.discountAllocations[0]?.amount

    const customItemPayload = {
      quantity: firstItem.quantity,
      title: firstItem.title,
      discount: firstItemDiscountedValue
    }

    const paymentTransactions = event.data.checkout.transactions.map(
      transaction => {
        return {
          paymentGateway: transaction.gateway,
          amount: transaction.amount
        }
      }
    )

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        discountCodesUsed: allDiscountCodes,
        firstItem: customItemPayload,
        paymentTransactions: paymentTransactions
      }
    }

    // Example for sending event data to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true
    })
  })
  ```

---

title: payment_info_submitted description: >- The `payment_info_submitted` event
logs an instance of a customer submitting their payment information. This event
is available on the checkout page. api_name: web-pixels source_url: html: >-
https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted
md: >-
https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted.md

---

# payment*​info*​submittedinterface

The `payment_info_submitted` event logs an instance of a customer submitting
their payment information. This event is available on the checkout page.

## Properties

- clientId

  string

  The client-side ID of the customer, provided by Shopify

- context

  Context

- data

  PixelEventsPaymentInfoSubmittedData

- id

  string

  The ID of the customer event

- name

  string

  The name of the customer event

- seq

  number

  The sequence index number of the event.

- timestamp

  string

  The timestamp of when the customer event occurred, in
  [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

- type

  EventType.Standard

```ts
export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard'
}
```

### Examples

- #### Accessing Standard Events

  ##### Custom Pixel

  ```javascript
  analytics.subscribe('payment_info_submitted', event => {
    // Example for accessing event data
    const checkout = event.data.checkout

    const checkoutTotalPrice = checkout.totalPrice?.amount

    const firstDiscountType = checkout.discountApplications[0]?.type

    const discountCode =
      firstDiscountType === 'DISCOUNT_CODE' ?
        checkout.discountApplications[0]?.title
      : null

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        firstDiscountCode: discountCode
      }
    }

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true
    })
  })
  ```

```javascript
analytics.subscribe('checkout_contact_info_submitted', event => {
  // Example for accessing event data
  const checkout = event.data.checkout

  const email = checkout.email
  const phone = checkout.phone

  const payload = {
    event_name: event.name,
    event_data: {
      email: email,
      phone: phone
    }
  }

  // Example for sending event data to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true
  })
})
```

The checkout_contact_info_submitted event logs an instance where a customer
submits a checkout form. This event is only available in checkouts where
Checkout Extensibility for customizations is enabled

Properties clientId string The client-side ID of the customer, provided by
Shopify

context Context data PixelEventsCheckoutContactInfoSubmittedData id string The
ID of the customer event

name string The name of the customer event

seq number The sequence index number of the event.

timestamp string The timestamp of when the customer event occurred, in ISO 8601
format

type EventType.Standard

```javascript
analytics.subscribe('checkout_contact_info_submitted', event => {
  // Example for accessing event data
  const checkout = event.data.checkout

  const email = checkout.email
  const phone = checkout.phone

  const payload = {
    event_name: event.name,
    event_data: {
      email: email,
      phone: phone
    }
  }

  // Example for sending event data to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true
  })
})
```
