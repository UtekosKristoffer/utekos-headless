# Installation

**Merchant details**

Your client identifier is setup directly in the code with the origin domain you provided. To manage it further
please follow the link to the client identifiers page.

Before you start Install Express checkout by simply adding 3 code snippet to your site. Follow the instruction
below and copy paste the code to your site.

If you’re using E-commerce platforms such as Shopify, WooCommerce, Adobe commerce, etc. Install Express
checkout easily with platforms specific solutions, check our platforms integration guide.

## Step 1. Import Library

```html
<script src="https://x.klarnacdn.net/kp/lib/v1/api.js" async></script>
```

Add the code to your website right after opening the body tag. The code only needs to be added once per page.
Note: Adding the script through a tag manager is not supported.

## Step 2. Add container where the button should be rendered

Add the button code inside the body tag of your cart page or product page. Wherever you want the button to
appear. Check out our
[Best Practices](https://docs.klarna.com/conversion-boosters/express-checkout/additional-resources/button-placement/?utm_source=merchant%20portal)
for guidelines and inspiration.

## Step 3. Add script to load button and handle events

Add the callback code inside the body tag of the pages where you put the buttons. This code will connect to
Klarna data base and allow shoppers to sign into their Klarna account.

It will return shoppers personal details. You can then use this data to pre-fill billing information in your
checkout.

```html
<div id="container"></div>
```

```js
window.klarnaAsyncCallback = function () {
  window.Klarna.Payments.Buttons.init({
    client_id:
      'klarna_live_client_VC04U2RSUUFUOGFWL1RKcDExTy1sMCo5Q3RCNmU1JGwsYWM3MWY4MjAtNWVlYi00NTg1LWIyMTAtN2Q2NTEwMWY0N2M2LDEseVYzei9xZ3VlejBhQmV3NC8vM3JQcmVaa0RoS3RadzA4VDdMMFRueXJhTT0'
  }).load(
    {
      container: '#container',
      theme: 'default',
      shape: 'default',
      on_click: authorize => {
        // Here you should invoke authorize with the order payload.
        authorize(
          { collect_shipping_address: true },
          payload, // order payload
          result => {
            // The result, if successful contains the authorization_token
          }
        )
      }
    },
    function load_callback(loadResult) {
      // Here you can handle the result of loading the button
    }
  )
}
```

For advance customization of the button, see
[Customization guide.](https://docs.klarna.com/express-checkout/additional-resources/button-styling/?utm_source=merchant%20portal)
