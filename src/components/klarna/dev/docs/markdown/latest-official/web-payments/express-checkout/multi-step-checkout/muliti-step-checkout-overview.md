# Overview

Learn how to integrate the multistep Express checkout to support more robust checkout options.

Follow the web integration guide to add the multistep Express checkout to your website.

Not sure if the multistep checkout is the best option for your store? Refer to the
[Before you start](https://docs.klarna.com/conversion-boosters/express-checkout/before-you-start/) article to
make sure you offer your customers the best checkout experience.

The process of creating a multistep Express checkout consists of six main steps:

1. Initializing and display the Express checkout button
2. Handling the authorization response
3. Initializing Klarna payments JavaScript SDK in checkout
4. Finalizing the authorization
5. Handling finalization callback
6. Creating an order

## Integration steps

### 1. Initialize and display the Express checkout button

Load the Klarna payments JavaScript library when the cart page or a product detail page is loaded. Ensure the
library is included only once to prevent conflicts.

```html
<script defer src="https://x.klarnacdn.net/kp/lib/v1/api.js"></script>
```

Then, implement the `klarnaAsyncCallback` function where you initialize the Express checkout. Implement the
`klarnaAsyncCallback` before importing the library. This way you ensure it will be invoked when the library is
loaded. Within `klarnaAsyncCallback`,\* \*\*\* \*\*include the logic to:

1. Initialize Klarna’s JavaScript SDK providing your client identifier as `client_id`, get your `client_id`
   from the Merchant portal. Refer to the
   [Before you start](https://docs.klarna.com/conversion-boosters/express-checkout/before-you-start/) article
   for instructions on how to generate your client_id.
2. Load the button in a chosen container using a `load()` function. To help debug any issues that occur when
   loading the button, implement the
   [`load()` callback](https://docs.klarna.com/conversion-boosters/express-checkout/integrate-express-checkout/integrate-multistep-express-checkout/#responses).
3. Handle the `on_click` event, in which you start the payment authorization process by calling the
   `authorize()` function. Keep the following best practices in mind:
   - When initiating the authorization, make sure that the format of the `orderPayload` is the same as the
     body of the request
     [to create a Klarna payments session.](https://docs.klarna.com/api/payments/#operation/createCreditSession)
   - Avoid having multiple nested asynchronous calls before invoking authorization.

**\[INFO]**

The \`orderPayload\` object can contain all information allowed in the \[Klarna payments
API]\(https\://docs.klarna.com/api/payments/#operation/createCreditSession), for example, merchant references,
merchant URLs, or extra merchant data.

Here’s an example of code that initializes the Klarna JavaScript library and renders the Express checkout
button on a cart or a product detail page:

```html
<script defer src="https://x.klarnacdn.net/kp/lib/v1/api.js"></script>

<script>
  window.klarnaAsyncCallback = function () {
    window.Klarna.Payments.Buttons.init({
      client_id: 'klarna_client_test...'
    }).load(
      {
        container: '#container',
        theme: 'default',
        shape: 'default',
        locale: 'es-ES',
        on_click: authorize => {
          // Here you should invoke authorize with the order payload.
          authorize({ auto_finalize: false, collect_shipping_address: true }, orderPayload, result => {
            // Here you will receive customer data and client_token necessary to resume the authorization in your checkout.
          })
        }
      },
      function load_callback(loadResult) {
        // Here you can handle the result of loading the button
      }
    )
  }
</script>
```

The table below lists the attributes of the `load()` function’s configuration object.

| Attribute   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `container` | Yes      | `container` represents the location where you want the Express checkout button to be displayed. In this attribute, you can specify either: \* a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), for example, `#my-component-id`, `.my-component-class` \* an [element](https://developer.mozilla.org/en-US/docs/Web/API/Element)-type object directly, for example, `document.createElement('div')` |
| `on_click`  | Yes      | The function passed in this attribute will be executed when the Express checkout button is clicked. It will receive the `authorize()` function, which has to be invoked to start the Express checkout flow. The `authorize()` function acts similarly to `authorize()` in a standard \[ Klarna payments] integration.                                                                                                               |
| `theme`     | No       | The [color theme](https://docs.klarna.com/conversion-boosters/express-checkout/additional-resources/button-styling/#theme) of the button. The possible values are `default`, `light`, and `dark`. If the value isn't specified, `default` is used.                                                                                                                                                                                  |
| `shape`     | No       | The [shape](https://docs.klarna.com/express-checkout/additional-resources/button-styling/#button-shape#button-shape) of the button. The possible values are `default`, `rect`, and `pill`. If the value isn't specified, `default` is used.                                                                                                                                                                                         |
| `locale`    | No       | The language of the button text. If not specified, the browser's language will be used.                                                                                                                                                                                                                                                                                                                                             |

**\[INFO]**

The value of locale passed in the \`authorize()\` function’s configuration object defines the language of the
button text. On the other hand, the value of
\[locale]\(https\://docs.klarna.com/api/payments/#operation/createCreditSession!path=locale\\\&t=request)
passed to \`authorize()\` inside the \`orderPayload\` defines the language of the purchase flow. Learn more
about \[locale formats]\(https\://docs.klarna.com/api/data-types/#locale--country) in Klarna APIs.

The table below lists the attributes for the `authorize()` function’s configuration object.

| Attribute                  | Required | Description                                                                                                                                                                                                                                                                                                       |
| -------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collect_shipping_address` | Yes      | Informs Express checkout whether you need the customer's shipping address from Klarna. The default value is `false`.                                                                                                                                                                                              |
| `auto_finalize`            | No       | Allows you to specify whether the authorization should automatically be finalized when the user clicks the Express button. In multistep Express checkout, make sure to always set `auto_finalize` to `false` to keep the authorization process open until the purchase is finalized. The default value is `true`. |

#### Create the payment session on your backend to better align with your app's design (optional)

If creating the session server-side better fits your app’s architecture, follow these steps:

1. Create a new
   [Payment session](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)
2. Provide the `client_token` receive in the
   [create session response](https://docs.klarna.com/api/payments/#operation/createCreditSession!c=200&path=client_token&t=response)
   to the `Klarna.Payments.Buttons.init` function.
3. You don't have to provide order details in the `authorize` function.
4. The rest of the implementation stays the same.

```html
<script>
  window.klarnaAsyncCallback = function () {
    window.Klarna.Payments.Buttons.init({
      client_token: '<client_token>'
    }).load(
      {
        container: '#container',
        theme: 'default',
        shape: 'default',
        locale: 'es-ES',
        on_click: authorize => {
          // Here you should invoke authorize() without the order payload.
          authorize({ auto_finalize: true, collect_shipping_address: true }, null, result => {
            // The result, if successful, contains authorization_token.
          })
        }
      },
      function load_callback(loadResult) {
        // Here you can handle the result of loading the button.
      }
    )
  }
</script>
```

**You can programmatically start the flow if you prefer to render your own button for better alignment with
your other Express checkout buttons.**

```javascript
window.klarnaAsyncCallback = function () {
  window.Klarna.Payments.Buttons.init({
    client_id: '<client_id>'
  }).authorize(
    {
      collect_shipping_address: true,
      auto_finalize: true
    },
    order_payload,
    result => {
      // The result, if successful, contains authorization_token.
    }
  )
}
```

### 2. Handle the authorization response

In the multistep checkout, after the customer completes the first step, you’ll receive the `authorize()` call
response with the `finalize_required` flag set to `true` and the `client_token` necessary to resume the
authorization at checkout.

Redirect the customer to the checkout and pre-fill all necessary fields with the customer data returned in the
authorize() response call.

```javascript
{
  "show_form": true,
  "approved": true,
  "finalize_required": true,
  "client_token": "1eddf502-f3a0-45bf-b1fd-f2e3a2758200",
  "session_id": "e4b81ca2-0aae-4c16-bcb2-29a0a088a35b",
  "collected_shipping_address": { // if collect_shipping_address was set to true
    "attention": "Attn",
    "city": "London",
    "country": "GB",
    "email": "test.sam@test.com",
    "family_name": "Andersson",
    "given_name": "Adam",
    "organization_name": "string",
    "phone": "+44795465131"
  },
  "payment_method_categories": [
    {
      "asset_urls": {
        "descriptive": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
        "standard": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
      },
      "identifier": "pay_now",
      "name": "Pay now"
    },
    {
      "asset_urls": {
        "descriptive": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
        "standard": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
      },
      "identifier": "pay_later",
      "name": "Pay in 30 days"
    }
  ]
}

```

An example of a response from the client-side authorize() call.

### 3. Initialize Klarna payments JavaScript SDK in checkout

When the customer navigates to another page or reloads the current one, you need to initialize the Klarna
payments library with the `client_token` you got from the authorization response. This will keep the
authorized session open.

```javascript
<script>
  window.klarnaAsyncCallback = function () {
// Here is where you start calling Klarna's JavaScript SDK functions
Klarna.Payments.init({
       	client_token: "your-client-token",
});
Klarna.Payments.load({
    container: '#klarna-payments-container',
}, ...)
// Here is where you start calling Klarna.Payments.finalize({}
</script>
<script src="https://x.klarnacdn.net/kp/lib/v1/api.js" async></script>

```

An example of Klarna's JavaScript SDK and a call that initializes the SDK on the checkout page.

### 4. Finalize the authorization

To authorize the purchase, you need the `authorization_token`. To get the `authorization_token`, call the
`Klarna.Payments.finalize()`\[ Klarna.Payments.finalize()] function during the final purchase step.

**\[INFO]**

If changes were made in the order payload, for example, to the order amount or shipping address, you have to
submit them when calling \`Klarna.Payments.finalize()\`.

```javascript
Klarna.Payments.finalize({}, orderPayload, function (res) {
  // res = {
  //   show_form: true,
  //   approved: true,
  //   authorization_token: "b4bd3423-24e3",
  //   collected_shipping_address: {...}
  // }
})
```

An example of a `Klarna.Payments.finalize()` call.

### 5. Handle the finalization callback

If the purchase is authorized successfully, you’ll receive the `authorization_token` in the client-side
`finalize()` response, the
[authorization callback](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/other-actions/authorization-callback/),
or by
[getting the payment details from Klarna payments API.](https://docs.klarna.com/api/payments/#operation/readCreditSession)
You need the `authorization_token` to create an order in the final step.

Here’s an example of a response from the client-side `authorize()` function:

```javascript
{
"show_form": true,
"approved": true,
"finalize_required": false,
"authorization_token": "0eb73d2c-d55a-5358-9080-ddc3903e3941",
"session_id": "e4b81ca2-0aae-4c16-bcb2-29a0a088a35b",
}

```

Here’s an example of a response from the authorization callback:

```javascript
{
  "authorization_token": "1eddf502-f3a0-45bf-b1fd-f2e3a2758200",
  "session_id": "e4b81ca2-0aae-4c16-bcb2-29a0a088a35b",
}

```

### 6. Create an order

Once you have the `authorization_token`,
[create the order](https://docs.klarna.com/api/payments/#operation/createOrder). When creating the order, make
sure the order payload is the same as the one sent in the `finalize()` call. ⚛️React Not Detected React is not
detected on this page. Please ensure you're visiting a React application.
