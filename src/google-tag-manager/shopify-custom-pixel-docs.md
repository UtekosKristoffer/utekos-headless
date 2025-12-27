# Create a Google Tag Manager Custom Pixel

You can use Google Tag Manager (GTM) as a custom pixel to manage your
third-party pixels.

When you're ready to test your GTM custom pixel, use the Shopify Pixel Helper to
ensure that all the events you want to track are being added to the sandbox
without errors.

You can also use the Google Tag Assistant page extension to test which Google
tags are being loaded on the page. However, Google Tag Assistant's Troubleshoot
tag feature isn't compatible with custom pixels, and doesn't detect any Google
tags in a custom pixel, or other pixels being loaded by GTM.

> **Note**: Before you create a custom pixel, you should review available apps
> for improved stability, security, and performance. However, if there isn't an
> app that meets your needs, then you can use Google Tag Manager as a custom
> pixel.

## Table of Contents

- [Preparing to Create a Custom Pixel](#preparing-to-create-a-custom-pixel)
- [Create a Google Tag Manager Custom Pixel](#create-a-google-tag-manager-custom-pixel)
  - [Subscribe to Customer Events and Push to GTM's Data Layer](#subscribe-to-customer-events-and-push-to-gtms-data-layer)
  - [Example Google Tag Manager Custom Pixel](#example-google-tag-manager-custom-pixel)
  - [Configure Google Tag Manager to Accept Events from Your Custom Pixel](#configure-google-tag-manager-to-accept-events-from-your-custom-pixel)
- [Replacing Old dataLayer.push(event) Calls with analytics.publish()](#replacing-old-datalayerpushevent-calls-with-analyticspublish)
- [Replace Old dataLayer.push(data)](#replace-old-datalayerpushdata)
- [Tips for Setting Up Google Analytics 4](#tips-for-setting-up-google-analytics-4)
  - [Cleaner Page URLs](#cleaner-page-urls)
  - [Enhanced Measurement](#enhanced-measurement)

---

## Preparing to Create a Custom Pixel

Before you create a custom pixel using Google Tag Manager, review the following
information to make sure that you understand how to configure your pixel:

- Create or open a Google Tag Manager account and get the GTM Container ID.
- For security, tag managers loaded in our sandbox have the same restrictions as
  any other pixels. Learn more about
  [pixels sandbox limitations](https://shopify.dev/docs/api/pixels/sandbox).

---

## Create a Google Tag Manager Custom Pixel

You can create a Google Tag Manager custom pixel to manage your third party
pixels.

> **Grow Your Business**: This is an advanced tutorial, and is unsupported by
> Shopify. If you need help adding a custom pixel, then you can
> [hire a Shopify Partner](https://www.shopify.com/partners).

### Steps

1. Open your Google Tag Manager account, and select the account that you want to
   set up a custom pixel with.
2. Click **Admin**, and then click **Install Google Tag Manager** to open the
   installation code.
3. Copy the code block that belongs in the `<head>` section of a page.
4. Remove the HTML tags from the code block. For example, `<script></script>`.
5. Insert the remaining code into a new Shopify Custom Pixel.
6. Subscribe to customer events and push to GTM's `dataLayer`.
7. To review how the code should display, refer to the
   [example Google Tag Manager custom pixel](#example-google-tag-manager-custom-pixel).
8. Configure Google Tag Manager to accept events from your Custom Pixel.
9. **Optional**: If you have existing `dataLayer.push(event)` calls in your
   `checkout.liquid` file, then replace it with `analytics.publish()`.

---

### Subscribe to Customer Events and Push to GTM's Data Layer

You can subscribe to customer events using the GTM `dataLayer` in your custom
pixel code.

By default, there's a set of standard events that you can subscribe to. However,
if you want to track customer events that aren't part of the standard events
offering, then you can publish your own custom events from Liquid template
files.

Below is an example of subscribing to the standard `product_viewed` event, which
indicates when someone views a product. When the event triggers, it pushes the
event to the `dataLayer`.

```javascript
analytics.subscribe('product_viewed', event => {
  window.dataLayer.push({
    event: 'product_viewed',
    product_title: event.data?.productVariant?.title
  })
})
```

In this example, the product title is being passed in the event payload. You can
use a Google Tag Manager variable to capture the product title from the event
payload in your tag of choice.

---

### Example Google Tag Manager Custom Pixel

The example below is a simplified version of a Google Tag Manager custom pixel
that displays how to send data to Google Tag Manager. To push more events to
your `dataLayer`, you can subscribe to more standard and custom events.

> **Note**: This pixel example also contains example settings reflecting Google
> Consent Mode v2, which is a mode that allows a pixel to respect a visitor's
> cookie consent choices for traffic including the European Economic Area (EEA).
> You can learn more about consent mode from
> [Google Ads Help](https://support.google.com/google-ads/answer/10000067).
>
> These example settings might not match what's required for your store based on
> your region's privacy legislation. If you need help with adding or customizing
> consent settings in your custom pixel, then review
> [Google's Set up consent mode on websites guide](https://developers.google.com/tag-platform/security/guides/consent)
> or [hire a Shopify Partner](https://www.shopify.com/partners).

```javascript
// Define dataLayer and the gtag function.
window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}

// Initialize GTM tag
;(function (w, d, s, l, i) {
  w[l] = w[l] || []
  w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : ''
  j.async = true
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
  f.parentNode.insertBefore(j, f)
})(window, document, 'script', 'dataLayer', 'GTM-XXXXXXX')

// Google Consent Mode v2
gtag('consent', 'update', {
  ad_storage: 'granted',
  analytics_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted'
})

// Subscribe to events
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

analytics.subscribe('payment_info_submitted', event => {
  window.dataLayer.push({
    event: 'payment_info_submitted',
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

analytics.subscribe('checkout_shipping_info_submitted', event => {
  window.dataLayer.push({
    event: 'checkout_shipping_info_submitted',
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

analytics.subscribe('checkout_address_info_submitted', event => {
  window.dataLayer.push({
    event: 'checkout_address_info_submitted',
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

analytics.subscribe('checkout_contact_info_submitted', event => {
  window.dataLayer.push({
    event: 'checkout_contact_info_submitted',
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

analytics.subscribe('checkout_started', event => {
  window.dataLayer.push({
    event: 'checkout_started',
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

analytics.subscribe('product_added_to_cart', event => {
  window.dataLayer.push({
    event: 'product_added_to_cart',
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    price: event.data?.cartLine?.merchandise?.price?.amount,
    currency: event.data?.cartLine?.merchandise?.id,
    product_title: event.data?.cartLine?.merchandise?.product?.title,
    quantity: event.data?.cartLine?.quantity,
    total_cost: event.data?.cartLine?.cost?.totalAmount?.amount
  })
})

analytics.subscribe('cart_viewed', event => {
  window.dataLayer.push({
    event: 'cart_viewed',
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    total_cost: event.data?.cart?.cost?.totalAmount?.amount,
    quantity: event.data?.cart?.totalQuantity,
    cart_id: event.data?.cart?.id
  })
})

analytics.subscribe('page_viewed', event => {
  window.dataLayer.push({
    event: 'page_viewed',
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    page_title: event.context.document.title
  })
})

analytics.subscribe('product_viewed', event => {
  window.dataLayer.push({
    event: 'product_viewed',
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    product_id: event.data?.productVariant?.product?.id,
    product_title: event.data?.productVariant?.title,
    product_sku: event.data?.productVariant?.sku
  })
})

analytics.subscribe('search_submitted', event => {
  window.dataLayer.push({
    event: 'search_submitted',
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    query: event.data?.searchResult?.query
  })
})

analytics.subscribe('collection_viewed', event => {
  window.dataLayer.push({
    event: 'collection_viewed',
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    collection_id: event.data?.collection?.id,
    collection_title: event.data?.collection?.title
  })
})
```

---

### Configure Google Tag Manager to Accept Events from Your Custom Pixel

After you create your custom pixel, you need to configure Google Tag Manager to
accept events from your custom pixel. To do this, you need a tag, a trigger, and
`dataLayer` variables in Google Tag Manager.

Some examples of select standard customer events and their Google Tag Manager
equivalents are listed in the following table:

| Shopify Event                     | Trigger                      | GTM Event           |
| --------------------------------- | ---------------------------- | ------------------- |
| `payment_info_submitted`          | Submit payment information   | `add_payment_info`  |
| `checkout_address_info_submitted` | Submit shipping information  | `add_shipping_info` |
| `product_added_to_cart`           | Add an item to shopping cart | `add_to_cart`       |
| `checkout_started`                | Start checkout               | `begin_checkout`    |
| `checkout_completed`              | Complete checkout            | `purchase`          |
| `product_removed_from_cart`       | Remove item from cart        | `remove_from_cart`  |
| `cart_viewed`                     | View shopping cart           | `view_cart`         |
| `product_viewed`                  | View product details page    | `view_item`         |
| `collection_viewed`               | Views a list of items        | `view_item_list`    |

GTM tag event parameters need to match expected naming conventions in order for
your custom pixel `dataLayer` events to be processed.

Some examples of select custom pixel `dataLayer` event properties and their
equivalent Google Analytics 4 (GA4) event parameters are as follows:

| Custom Pixel dataLayer Events                       | GA4 Event Parameters |
| --------------------------------------------------- | -------------------- |
| `event.data?.checkout?.currencyCode`                | `currency`           |
| `event.data?.checkout?.totalPrice?.amount`          | `value`              |
| `event.data?.checkout?.order?.id`                   | `transaction_id`     |
| `event.data?.checkout?.discountAllocations`         | `coupon`             |
| `event.data?.checkout?.shippingLine?.price?.amount` | `shipping`           |
| `event.data?.checkout?.totalTax`                    | `tax`                |
| `event.data?.checkout?.lineItems`                   | `items`              |

#### Example Configuration

Here's an example using the following `checkout_completed` event:

```javascript
analytics.subscribe('checkout_completed', event => {
  window.dataLayer.push({
    event: 'checkout_completed',
    orderId: event.data?.checkout?.order?.id,
    currency: event.data?.checkout?.currencyCode,
    price: event.data.checkout.totalPrice.amount,
    shippingLine: event.data.checkout.shippingLine.price.amount,
    totalTax: event.data.checkout.totalTax
  })
})
```

**Configuration Steps:**

1. The Google Tag Manager trigger is a custom event type with the event name of
   `checkout_completed`. The **Event name** field in the trigger must match the
   `event` key in your custom pixel.

2. `orderId` and `currency` are the variables that you use in Google Tag Manager
   to capture the data from the event. They can be mapped to a `dataLayer`
   variable in Google Tag Manager. Each event variable requires its own
   `dataLayer` variable. Set the trigger to fire on all custom events.

3. Create a tag that uses the trigger you just created. Under event parameters,
   add the variables that you want to capture. In the example above, `orderId`,
   `currency`, `price`, `shippingLine` and `totalTax` would be set up as
   `dataLayer` variables. Each time the tag fires, it will capture these
   `dataLayer` variables with the event.

> **Note**: At least one tag and trigger must be set up in Google Tag Manager
> for data transfer to occur.

---

## Replacing Old dataLayer.push(event) Calls with analytics.publish()

If you've previously set up Google Tag Manager, then you need to replace your
`dataLayer.push` calls with `Shopify.analytics.publish()` calls. You can find
your `dataLayer.push` calls in your `theme.liquid` files, in the **Layout**
section of your theme editor.

You also need to replace the `dataLayer.push` calls in the `checkout.liquid`.
However, because `checkout.liquid` isn't compatible with Shopify Extensions, you
need to use a UI extension to push data to web pixels.

Below is a simplified example of a custom email sign up event being tracked
using `dataLayer` in `theme.liquid` files.

**Before (Old Method):**

```html
<script>
  dataLayer.push({ event: 'email_signup', email: customer.email })
</script>
```

**After (New Method):**

The Shopify equivalent displays in this way, which pushes the data into your
custom pixel.

```html
<script>
  Shopify.analytics.publish('email_signup', { email: customer.email })
</script>
```

Then, in your custom pixel code you would add something such as this:

```javascript
analytics.subscribe('email_signup', event => {
  window.dataLayer.push({
    event: 'email_signup',
    email: event.customData.email
  })
})
```

---

## Replace Old dataLayer.push(data)

Google Tag Manager has a feature that lets you push a stateful `dataLayer`
object on every event. While Shopify's pixel sandbox doesn't include an
equivalent feature, you can achieve the same outcome by creating your own data
object and passing it into custom events.

**Example:**

For example, define a `customData` object, before any of your custom events are
published.

```html
<script>
  const customData = { email: customer.email }
</script>
```

Then, whenever you want to include your custom data, pass it into your publish
method.

```html
<script>
  Shopify.analytics.publish('email_signup', customData)
</script>
```

> **Note**: Shopify doesn't support adding custom data to standard events at
> this time. If this is something you need, then you can publish your own custom
> events to replace standard events.

---

## Tips for Setting Up Google Analytics 4

Consider the following tips for setting up Google Analytics 4 (GA4) when using
Google Tag Manager as a custom pixel.

### Cleaner Page URLs

When GA4 is running in a sandbox, you might notice that the page URLs include
information about the sandbox it's operating in. If you want to remove the
sandbox information from those URLs, then you can turn off GA4's automatic pages
tracking, and instead implement your own, by using the standard `page_viewed`
event.

```javascript
analytics.subscribe('page_viewed', event => {
  window.dataLayer.push({
    event: 'page_viewed',
    page_location: event.context.window.location.href,
    page_title: event.context.document.title
  })
})
```

After you publish your own event to `dataLayer`, you can create a GA4
`page_view` tag that triggers on the `page_viewed` event. Most commonly, you can
use the **Google Analytics: GA4 Event** tag type, and set the **Event Name** to
`page_view`. After you set the tag type and event name, you should add a
parameter for `page_location` and set the value to the same value that you've
passed into your `dataLayer` from your custom pixel.

### Enhanced Measurement

When loading GA4 inside of Shopify's pixel sandbox, some events that are
normally automatically inferred will need to be set up manually. For example,
outbound link clicks, as part of GA4's **Enhanced measurement** setting, can't
be triggered automatically for security reasons when using custom pixels.
However, it's possible to implement GA4's enhanced measurement events yourself
as custom events.

The code provided below includes a simplified example of tracking outbound link
clicks.

```html
<script>
  function detectOutboundLink() {
    // add your logic for determining if a link click is outbound

    // if the link click is outbound then publish it
    if (isOutboundLink) {
      Shopify.analytics.publish('outbound_link', { link_url: link_url })
    }
  }
</script>
```

Finally, in GTM, create a GA4 tag that sends the link click to GA4, by ensuring
the event name is `click`, to match GA4's enhanced event naming.

You can achieve the same tracking for any of Google's enhanced measurement
metrics.
