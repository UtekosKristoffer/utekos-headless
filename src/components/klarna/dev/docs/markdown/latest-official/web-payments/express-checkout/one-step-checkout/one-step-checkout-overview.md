# Overview

Learn how to integrate the one-step Express checkout for a fast and simple shopping journey.

Follow the web integration guide to add the one-step Express checkout to your website.

Not sure if the one-step checkout is the best option for your store? Refer to the
[Before you start](https://docs.klarna.com/conversion-boosters/express-checkout/before-you-start/) article to
make sure you offer your customers the best checkout experience.

The process of creating a one-step Express checkout consists of three main steps:

1. Initializing and display Express checkout button
2. Handling the authorization response
3. Creating an order

## Integration steps

### 1. Initialize and display the Express checkout button

Load the Klarna payments JavaScript library when the cart page or a product detail page is loaded. Ensure the
library is included only once to prevent conflicts.

```html
<script defer src="https://x.klarnacdn.net/kp/lib/v1/api.js"></script>
```

Then, implement the `klarnaAsyncCallback` function where you initialize Express checkout. Implement the
`klarnaAsyncCallback` before importing the library. This way you ensure it will be invoked when the library is
loaded. Within `klarnaAsyncCallback`,\* \*\*\* \*\*include the logic to:

1. Initialize Klarna’s JavaScript SDK providing your client identifier as `client_id`, get your `client_id`
   from the Merchant portal. Refer to the
   [Before you start](https://docs.klarna.com/conversion-boosters/express-checkout/before-you-start/) article
   for instructions.
2. Load the button in a chosen container using a `load()` function. To help debug any issues that occur when
   loading the button, implement the
   [`load()` callback](https://docs.klarna.com/conversion-boosters/express-checkout/integrate-express-checkout/integrate-one-step-express-checkout/#responses).
3. Handle the `on_click` event, in which you start the payment authorization process by calling the
   `authorize()` function. Keep the following best practices in mind:

- When initiating the authorization, make sure that the format of the `orderPayload` is the same as the body
  of the request
  [to create a Klarna payments session.](https://docs.klarna.com/api/payments/#operation/createCreditSession)
- Always invoke the `authorize()` callback that you receive in `on_click`.
- Avoid having multiple nested asynchronous calls before invoking authorization.

**\[INFO]**

The order payload object can contain all information allowed in the Klarna payments API, for example, merchant
references, merchant URLs, and extra merchant data.

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
          // Here you should invoke authorize() with the order payload.
          authorize({ auto_finalize: true, collect_shipping_address: true }, orderPayload, result => {
            // The result, if successful, contains authorization_token.
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
| `shape`     | No       | The [shape](https://docs.klarna.com/conversion-boosters/express-checkout/additional-resources/button-styling/#button-shape) of the button. The possible values are `default`, `rect`, and `pill`. If the value isn't specified, `default` is used.                                                                                                                                                                                  |
| `locale`    | No       | The language of the button text. If not specified, the browser's language will be used.                                                                                                                                                                                                                                                                                                                                             |

**\[INFO]**

The value of locale passed in the \`authorize()\` function’s configuration object defines the language of the
button text. On the other hand, the value of
\[locale]\(https\://docs.klarna.com/api/payments/#operation/createCreditSession!path=locale\\\&t=request)
passed to \`authorize()\` inside the \`orderPayload\` defines the language of the purchase flow.

Learn more about \[locale formats]\(https\://docs.klarna.com/api/data-types/#locale--country) in Klarna APIs.

The table below lists the attributes for the `authorize()` function’s configuration object.

| Attribute                  | Required | Description                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collect_shipping_address` | Yes      | Informs Express checkout whether you need the customer's shipping address from Klarna. The default value is `false`.                                                                                                                                                                                                                                        |
| `auto_finalize`            | No       | Allows you to specify whether the authorization should automatically be finalized when the customer clicks the Express button. In one-step Express checkout, set `auto_finalize` to `true`. Otherwise, the purchase won’t be authorized automatically. The default value is `true`. If you omit this attribute, the order will be authorized automatically. |

#### You can also create the Payments session on your backend if it is more aligned with your app's design.

1. Create a new
   [Payments session](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)
2. Provide the client_token receive from Payments api to the `Klarna.Payments.Buttons.init` function.
3. You don't have to provide order details in the `authorize` function.
4. The rest of the implementation looks the same

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

#### You can programmatically start the flow if you prefer to render your own button for better alignment with your other Express checkout buttons.

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

If the authorization is successful, you will receive the `authorization_token` from the client-side
`authorize()` response, in the
[authorization callback](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/other-actions/authorization-callback/),
or by
[getting the payment details from Klarna payments API.](https://docs.klarna.com/api/payments/#operation/readCreditSession)

Here’s an example of a response from the client-side `authorize()` call.

```javascript
{
  "show_form": true,
  "approved": true,
  "finalize_required": false,
  "authorization_token": "1eddf502-f3a0-45bf-b1fd-f2e3a2758200",
  "session_id": "e4b81ca2-0aae-4c16-bcb2-29a0a088a35b",
  "collected_shipping_address": { // if collect_shipping_address was set to true
    "attention": "Attn",
    "city": "London",
    "country": "GB",
    "email": "test.sam@test.com",
    "family_name": "Andersson",
    "given_name": "Adam",
    "organization_name": "string",
    "phone": "+44795465131",
    },
    "merchant_reference1": "" // if provided
    "merchant_reference2": "" // if provided
}

```

This example shows a response from the authorization callback.

```javascript
{
  "authorization_token": "1eddf502-f3a0-45bf-b1fd-f2e3a2758200",
  "session_id": "e4b81ca2-0aae-4c16-bcb2-29a0a088a35b",
  "merchant_reference1": "" // if provided
  "merchant_reference2": "" // if provided
}

```

### 3. Create an order

Once you have the `authorization_token`,
[create an order](https://docs.klarna.com/api/payments/#operation/createOrder). When creating the order, make
sure the shipping address provided in the API request matches the collected shipping address returned
alongside the `authorization_token`**...** ⚛️React Not Detected React is not detected on this page. Please
ensure you're visiting a React application.
