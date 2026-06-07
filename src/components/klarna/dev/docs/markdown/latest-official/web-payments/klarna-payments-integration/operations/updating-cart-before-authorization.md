# Updating the cart before authorization

If your customer updates their shopping cart or if you make any changes to payment details, you have to update
the payment session before creating an order.

When the customer modifies the content of their shopping cart before authorization, you can update a payment
session in two steps.

1. Send a `POST` request to the
   `[{apiUrl}](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/other-actions/update-the-cart/)/payments/v1/sessions/{sessionID}`
   endpoint.
2. Send a l`oad()` call to make the changes visible to your customer.

### 1: POST API request

To update the payment session, send the updated order details in a `POST` request to the
`[{apiUrl}](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/other-actions/update-the-cart/)/payments/v1/sessions/{sessionID}`
endpoint.

The `sessionID` path parameter must match the session identifier (`session_id`) you got in response to the
[create session request](/src/components/klarna/dev/docs/markdown/latest-official/web-payments/klarna-payments-integration/STEPS/STEP-ONE/initiate-a-payment.md).

```json
{
  "order_amount": 998,
  "order_tax_amount": 0,
  "order_lines": [
    {
      "type": "physical",
      "reference": "19-315",
      "name": "Battery Power Pack",
      "quantity": 2,
      "unit_price": 499,
      "tax_rate": 0,
      "total_amount": 998,
      "total_discount_amount": 0,
      "total_tax_amount": 0
    }
  ]
}
```

A sample request to update the details of a Klarna payments session.

### Success response

If the request is successful, the Klarna payments session is updated and you'll receive a `204 No content`
response.

### Error response

If your request contains errors, you'll receive an error response.

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "ERROR_CODE",
  "error_messages": ["ERROR_MESSAGE"]
}
```

An error response to the update session request.

Here are examples of common errors with troubleshooting suggestions. You can use the value in `correlation_id`
to find entries related to the request under **Logs** in the Merchant portal.

| Error code  | Error message                  | Description                                                                                                                                                                                       |
| ----------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BAD_VALUE` | `Bad value: order_tax_amount`  | The tax details in the request aren't aligned with [the rules for tax handling](https://docs.klarna.com/payments/web-payments/additional-resources/error-handling-and-validations/tax-handling/). |
| `BAD_VALUE` | `Bad value: order_lines`       | Some of the order line details don't follow our guidelines or violate API field restrictions. Refer to the [Klarna payments API reference](https://docs.klarna.com/api/payments/) for details.    |
| `BAD_VALUE` | `Bad value: purchase_currency` | `purchase_currency` is incorrectly formatted or doesn’t match locale. This may occur if the customer updates their billing address, causing `country` to be updated.                              |
| `NOT_FOUND` | `Invalid session id`           | The session identifier specified in the path can't be found. Make sure the value in `sessionID` has the correct value and try again.                                                              |

### 2: A load() call

To show the updated order details to your customer, send the updated details in a `load()` call to Klarna.

```javascript
Klarna.Payments.load(
  {
    container: '#klarna_container',
    payment_method_categories: [
      {
        asset_urls: {},
        identifier: 'klarna',
        name: 'Pay with Klarna'
      }
    ]
  },
  {
    purchase_country: 'GB',
    purchase_currency: 'GBP',
    locale: 'en-GB',
    order_amount: 20,
    order_tax_amount: 0,
    order_lines: [
      {
        type: 'physical',
        reference: '19-402',
        name: 'Battery Power Pack',
        quantity: 2,
        unit_price: 10,
        tax_rate: 0,
        total_amount: 20,
        total_discount_amount: 0,
        total_tax_amount: 0
      }
    ]
  },
  function (res) {
    console.debug(res)
  }
)
```

A `load()` call to update the order details.

Learn how to handle
[responses to the load() call](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-2-checkout/#display-klarna-load-responses).

## Updating the cart after authorization

If your customer updates the cart after the `authorize()` call, you can share updates with Klarna in two ways:

- If the Klarna widget is still displayed to the customer in the browser, send a new `authorize()` call with
  updated details to start a new risk and fraud assessment process. In response to a successful `authorize()`
  call, you'll get a new `authorization_token`. Make sure to use the new token to place an order.
- If your checkout solution lets the customer change the order details after payment, for example, on an order
  review page, you have to re-authorize the session. In this case, a Klarna widget is typically not displayed,
  meaning you can't authorize the purchase in the standard way with `init()`, `load()`, and `authorize()`
  calls. A `reauthorize()` call can handle this and any necessary customer communication in fullscreen modals.

**\[INFO]**

We recommend you display modals launched during re-authorization as the customer might need to provide some
input to complete the purchase. ⚛️React Not Detected React is not detected on this page. Please ensure you're
visiting a React application.
