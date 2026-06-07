# One-time payment order

Creating an order differs for one-time and recurring payments. For one-time, send a POST with authorization
token to Klarna. For recurring, generate a customer token first.

The process of creating an order is different for one-time and recurring payments.

- For one-time payments, get the authorization token ready and send a request to Klarna API
- For recurring payments, generate a customer token prior to placing the order

### Create an order

To create an order for a one-time payment, send a `POST` request to the
`{apiUrl}/payments/v1/authorizations/{authorizationToken}/order` endpoint and include `authorization_token` in
the path.

For example, if the `authorization_token` is `b4bd3423-24e3`, send your request to the
`{apiUrl}/payments/v1/authorizations/b4bd3423-24e3/order` endpoint.

```json
{
  "purchase_country": "US",
  "purchase_currency": "USD",
  "billing_address": {
    "given_name": "John",
    "family_name": "Doe",
    "email": "john@doe.com",
    "title": "Mr",
    "street_address": "Lombard St 10",
    "street_address2": "Apt 214",
    "postal_code": "90210",
    "city": "Beverly Hills",
    "region": "CA",
    "phone": "333444555",
    "country": "US"
  },
  "shipping_address": {
    "given_name": "John",
    "family_name": "Doe",
    "email": "john@doe.com",
    "title": "Mr",
    "street_address": "Lombard St 10",
    "street_address2": "Apt 214",
    "postal_code": "90210",
    "city": "Beverly Hills",
    "region": "CA",
    "phone": "333444555",
    "country": "US"
  },
  "order_amount": 10,
  "order_tax_amount": 0,
  "order_lines": [
    {
      "type": "physical",
      "reference": "19-402-USA",
      "name": "Battery Power Pack",
      "quantity": 1,
      "unit_price": 10,
      "tax_rate": 0,
      "total_amount": 10,
      "total_discount_amount": 0,
      "total_tax_amount": 0,
      "product_url": "https://www.estore.com/products/f2a8d7e34",
      "image_url": "https://www.exampleobjects.com/logo.png"
    }
  ],
  "merchant_urls": {
    "confirmation": "https://example.com/confirmation",
    "notification": "https://example.com/pending"
  },
  "merchant_reference1": "45aa52f387871e3a210645d4"
}
```

_A` POST` request to create an order for a one-time payment._

#### Success response

When you receive a success response, the customer gets charged and the Klarna payments session is closed.

As part of the response, you receive the following details:

- `order_id`, an order identifier that you can later use to capture or refund the order using the
  [Order management API](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-3-create-an-order/)
- `redirect_url`, a URL to which you redirect the customer. This isn't included in the response received if
  you didn't include the URL when
  [initiating a payment](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)
- `fraud_status`, an indicator of whether the transaction is suspected to be legitimate or
  [fraudulent](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-3-create-an-order/#special-considerations-for-one-time-payments)
- `authorized_payment_method`, the payment method selected by your customer for this purchase

```json
{
  "order_id": "3eaeb557-5e30-47f8-b840-b8d987f5945d",
  "redirect_url": "https://payments.klarna.com/redirect/...",
  "fraud_status": "ACCEPTED",
  "authorized_payment_method": "invoice"
}
```

_A success response to the order creation request for a one-time payment._

**\[INFO]**

Send the customer browser to \`redirect_url\` provided in the response. Klarna places a cookie in the browser
and redirects the customer back to the confirmation URL you provided when creating the session. This makes the
checkout faster the next time the customer chooses to pay with Klarna.

#### Error response

If your request doesn't pass our validation, you'll receive an error response. The most common reasons why
creating an order fails are:

- placing the order more than 60 minutes after authorization
- modifying purchase details after authorization without updating the payment session

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "ERROR_CODE",
  "error_messages": ["ERROR_MESSAGE"]
}
```

_An error response to the order creation request for a one-time payment._

Here are examples of common errors with troubleshooting suggestions. You can use the value in `correlation_id`
to find entries related to the request under **Logs** in the Merchant portal.

| Error code  | Error message                                                                          | Description                                                                                                                                                                                                                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NOT_FOUND` | `Invalid authorization token`                                                          | The authorization token has expired because the order was placed more than 60 minutes after authorization. To fix the error, [request a new `authorization_token`](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-3-create-an-order/#authorize-call) and use it to place the order. |
| `BAD_VALUE` | `Not matching fields: [billing_address.postal_code]`                                   | The data shared with Klarna in a previous step (`create_session`, `load()`, or `authorize()`) have been modified causing the validation to fail.                                                                                                                                                                       |
| `BAD_VALUE` | `Not matching fields: [Incorrect number of items in the cart. Expected: 2, Actual: 3]` | The order lines or the cart were updated after the `authorize()` call. Please ensure that the cart is kept as-is or send a new authorization request.                                                                                                                                                                  |
| `REJECTED`  | `Rejected`                                                                             | This is an edge case reason, but can be triggered in case the merchant is configured with being allowed to update the cart. This could be updated from the authorize to the place order in such a way that a new authorize is triggered. In this case this is rejected.                                                |

### Special considerations for one-time payments

#### Pending fraud status

If your agreement with Klarna allows it, we can flag a suspicious transaction for an additional review instead
of accepting it immediately. In such cases, `fraud_status` in the response will be `PENDING` instead of
`ACCEPTED`.
[Read more about pending orders](https://docs.klarna.com/payments/after-payments/order-management/more-actions/pending-orders/).

```json
{
  "order_id": "3eaeb557-5e30-47f8-b840-b8d987f5945d",
  "redirect_url": "https://payments.klarna.com/redirect/...",
  "fraud_status": "PENDING",
  "authorized_payment_method": "invoice"
}
```

_A response to a create order request includes `fraud_status: PENDING `if a transaction is subject to
additional fraud review._

#### Automatic capture of created orders

If your Klarna contract allows automatic capture of the order once an order is created, set `auto_capture` to
`true` when creating the order.

## Recurring payment order

For recurring payments, you have to create a customer token before placing the order. This token identifies
your customer and the payment method selected for the purchase. It also lets you charge the customer later,
ad-hoc or at regular intervals.

For payments where you charge the customer at checkout and enable a recurring charge (`intent` set to
`buy_and_tokenize`), you have to send two separate create order requests:

1. In the first request, use `authorization_token` to charge the customer at checkout.
2. In the second request, use `customer_token` for future recurring payments.

If you're not charging the customer at checkout (`intent` set to `tokenize`), you need to send only the second
request to place the order and charge the customer at a later date.

If you're creating an order related to a subscription, include the `subscription` object in your create order
request. Learn more about
[sharing subscription details with Klarna](https://docs.klarna.com/payments/web-payments/additional-resources/use-cases/subscriptions-and-on-demand/#sharing-subscription-details-with-klarna).

**INFO**

Learn more about \[customer
tokens]\(https\://docs.klarna.com/payments/web-payments/additional-resources/use-cases/subscriptions-and-on-demand/).

### Create a customer token

Request a customer token by sending a `POST` request to the
`{apiUrl}/payments/v1/authorizations/{authorizationToken}/customer-token` endpoint.

Include the authorization token from the authorize() call as the `authorizationToken` path parameter.

```json
{
  "purchase_country": "US",
  "locale": "us-US",
  "billing_address": {
    "given_name": "Doe",
    "family_name": "John",
    "email": "john@doe.com",
    "phone": "333444555",
    "street_address": "Lombard St 10",
    "postal_code": "90210",
    "city": "Beverly Hills",
    "region": "CA",
    "country": "US"
  },
  "description": "MySaaS subscription",
  "intended_use": "subscription",
  "merchant_urls": {
    "confirmation": "https://example.com/confirmation"
  }
}
```

_A POST request to create a customer token for a customer located in the US._

#### Success response

In response to the customer token request, Klarna sends:

- `token_id`, a customer token identifier that you later use to create an order
- `redirect_url`, a URL to which the customer is redirected after the order is placed

```json
{
  "billing_address": {
    "city": "Beverly Hills",
    "country": "US",
    "email": "john@doe.com",
    "family_name": "Doe",
    "given_name": "John",
    "phone": "333444555",
    "postal_code": "90210",
    "region": "CA",
    "street_address": "Lombard St 10",
    "street_address2": "Apt 214",
    "title": "Mr"
  },
  "customer": {
    "date_of_birth": "01.01.1979",
    "gender": "M",
    "title": "Mr"
  },
  "payment_method_reference": "0b1d9815-165e-42e2-8867-35bc03789e00",
  "redirect_url": "https://credit.klarna.com/v1/sessions/0b1d9815-165e-42e2-8867-35bc03789e00/redirect",
  "token_id": "0b1d9815-165e-42e2-8867-35bc03789e00"
}
```

_A success response contains a customer token (`token_id`)._

#### Error response

If Klarna can't create a customer token based on the data you sent, you'll receive an error response.

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "ERROR_CODE",
  "error_messages": ["ERROR_MESSAGE"]
}
```

_An error response to a create a customer token request._

Here are examples of common errors with troubleshooting suggestions. You can use the value in `correlation_id`
to find entries related to the request under **Logs** in the Merchant portal.

| Error code          | Error message                                           | Description                                                                                                                         |
| ------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `NOT_FOUND`         | `Invalid authorization token`                           | The authorization token has expired. Make sure to place within 60 minutes of authorization or re-authorize the purchase.            |
| `BAD_VALUE`         | `Bad value: purchase_country`                           | The billing address country is different from that of the country specified for this session.                                       |
| `BAD_REQUEST`       | `X is not valid for creating customer tokens in Y`      | The selected payment method can't be tokenized in the specified country.                                                            |
| `INVALID_OPERATION` | `Not allowed to create customer tokens for intent buy.` | You can only create a token when the intent of the session is set to `tokenize` or `buy_and_tokenize`. \[ Learn more about intent]. |

### Create an order with an authorization token with intent: buy_and_tokenize

**INFO**

This section only applies to payment sessions where `intent: buy_and_tokenize`. For payments with
`intent: tokenize`, [ create an order with a customer token].

To charge the customer at checkout, send a `POST` request to the
`{apiUrl}/payments/v1/authorizations/{authorizationToken}/order` endpoint. Include the authorization token as
a path parameter.

For example, if the `authorization_token` is `b4bd3423-24e3`, send your request to the
`{apiUrl}/payments/v1/authorizations/b4bd3423-24e3/order` endpoint.

Include subscription details in the `subscription` object. These should match the details you previously
shared with Klarna when initiating the payment session.

```json
{
  "purchase_country": "US",
  "purchase_currency": "USD",
  "billing_address": {
    "given_name": "John",
    "family_name": "Doe",
    "email": "john@doe.com",
    "title": "Mr",
    "street_address": "Lombard St 10",
    "street_address2": "Apt 214",
    "postal_code": "90210",
    "city": "Beverly Hills",
    "region": "CA",
    "phone": "333444555",
    "country": "US"
  },
  "shipping_address": {
    "given_name": "John",
    "family_name": "Doe",
    "email": "john@doe.com",
    "title": "Mr",
    "street_address": "Lombard St 10",
    "street_address2": "Apt 214",
    "postal_code": "90210",
    "city": "Beverly Hills",
    "region": "CA",
    "phone": "333444555",
    "country": "US"
  },
  "order_amount": 10,
  "order_tax_amount": 0,
  "order_lines": [
    {
      "type": "physical",
      "reference": "19-402-USA",
      "name": "Battery Power Pack",
      "quantity": 1,
      "unit_price": 10,
      "tax_rate": 0,
      "total_amount": 10,
      "total_discount_amount": 0,
      "total_tax_amount": 0,
      "product_url": "https://www.estore.com/products/f2a8d7e34",
      "image_url": "https://www.exampleobjects.com/logo.png",
      "subscription": {
        "name": "string",
        "interval": "MONTH",
        "interval_count": 1
      }
    }
  ],
  "merchant_urls": {
    "confirmation": "https://example.com/confirmation",
    "notification": "https://example.com/pending"
  },
  "merchant_reference1": "45aa52f387871e3a210645d4"
}
```

_A create order request for a subscription where a customer is charged once a month._

#### Success response

In response to a create order call, you receive:

- `order_id`, an order identifier that you can later use to capture or refund the order using the \[ Order
  management API]
- `redirect_url`, a URL to which you redirect the customer. This isn't included in the response received if
  you didn't include the URL when \[ initiating a payment]
- `fraud_status`, an indicator of whether the transaction is suspected to be fraudulent
- `authorized_payment_method`, the payment method selected by your customer for this purchase

```json
{
  "order_id": "3eaeb557-5e30-47f8-b840-b8d987f5945d",
  "redirect_url": "https://payments.klarna.com/redirect/...",
  "fraud_status": "ACCEPTED",
  "authorized_payment_method": "invoice"
}
```

A success response to a place order request created with an authorization token.

#### Error response

If your request doesn't pass our validation, you'll receive an error response. The most common reasons why
creating an order fails are:

- placing the order more than 60 minutes after authorization
- modifying purchase details after authorization without updating the payment session

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "ERROR_CODE",
  "error_messages": ["ERROR_MESSAGE"]
}
```

_An error response to the order creation request for a recurring payment based on `authorization_token`._

Here are examples of common errors with troubleshooting suggestions. You can use the value in `correlation_id`
to find entries related to the request under **Logs** in the Merchant portal.

| Error code  | Error message                                                                          | Description                                                                                                                                                                                                                                                             |
| ----------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NOT_FOUND` | `Invalid authorization token`                                                          | The authorization token has expired because the order was placed more than 60 minutes after authorization. To fix the error, \[ request a new authorization_token] and use it to place the order.                                                                       |
| `BAD_VALUE` | `Not matching fields: [billing_address.postal_code]`                                   | The data shared with Klarna in a previous step (`create_session`, `load`, or `authorize`) have been modified causing the validation to fail.                                                                                                                            |
| `BAD_VALUE` | `Not matching fields: [Incorrect number of items in the cart. Expected: 2, Actual: 3]` | The order lines or the cart were updated after the `authorize` call. Please ensure that the cart is kept as-is or send a new `authorize` request.                                                                                                                       |
| `REJECTED`  | `Rejected`                                                                             | This is an edge case reason, but can be triggered in case the merchant is configured with being allowed to update the cart. This could be updated from the authorize to the place order in such a way that a new authorize is triggered. In this case this is rejected. |

### Create an order with a customer token with intent: tokenize

**\[INFO]**

When creating an order with a customer token, include \`Klarna-Idempotency-Key\` in the request header.

Send a `POST` request to the `{apiUrl}/customer-token/v1/tokens/{customerToken}/order` endpoint and include
the customer token as a path parameter.

For example, if the `token_id` is `0b1d9815-165e-42e2-8867-35bc03789e00,` send your request to the
`{apiUrl}/customer-token/v1/tokens/0b1d9815-165e-42e2-8867-35bc03789e00/order` endpoint.

Make sure to also include subscription details in the `subscription` object. These should match the details
you previously shared with Klarna when initiating the payment session.

```json
{
"merchant_reference1": "45aa52f387871e3a210645d4",
"merchant_data": "optional string",
"locale": "de-DE",
"auto_capture": true,
"purchase_currency": "EUR",
"order_amount": 999,
"order_tax_amount": 0,
"order_lines": [{
"type": "digital",
"subscription": {
"name": " Premium Monthly {{1234834}}",
"interval": "MONTH",
"interval_count": 1
}
"reference": "19-402",
"name": "Streaming Service Monthly - Free Trial",
"quantity": 1,
"unit_price": 999,
"tax_rate": 0,
"total_amount": 999,
"total_discount_amount": 0,
"total_tax_amount": 0,
}]
}

```

#### Success response

In response to a create order call, you receive:

- `order_id`, an order identifier that you can later use to capture or refund the order using the \[ Order
  management API]
- `fraud_status`, an indicator of whether the transaction is suspected to be fraudulent

```json
{
  "order_id": "a89ec121-1276-419d-882a-c343d58fd1bc",
  "fraud_status": "ACCEPTED"
}
```

_A success response to a place order request created with a customer token._

#### Error response

If your request doesn't pass our validation, you'll receive an error response.

```json
{
  "error_code": "ERROR_CODE",
  "error_messages": ["Array of error messages"],
  "correlation_id": "Unique id for this request used for troubleshooting."
}
```

An error response to creation an order request based on a customer token.

Here are examples of common errors with troubleshooting suggestions. You can use the value in `correlation_id`
to find entries related to the request under **Logs** in the Merchant portal.

| Error code                   | HTTP status code | Description                                                                                                                                                  |
| ---------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TOKEN_NOT_FOUND`            | `404`            | The customer token wasn't found. Make sure that `customerToken` in the path matches the token.                                                               |
| `TOKEN_SUSPENDED`            | `403`            | The customer token has been suspended by Klarna.                                                                                                             |
| `TOKEN_CANCELED`             | `403`            | The customer token exists, but isn't linked to your merchant ID. Try again with another customer token.                                                      |
| `UNAVAILABLE_PAYMENT_METHOD` | `403`            | The payment method can't be used for orders in the specified currency.                                                                                       |
| `PAYMENT_METHOD_FAILED`      | `403`            | Purchase for payment method failed. If a credit payment method was used, this is most likely due to the customer being rejected. Try resending your request. |
| `BAD_REQUEST`                | `400`            |                                                                                                                                                              |
| `SERVICE_UNAVAILABLE`        | `503`            | A temporary internal Klarna error occurred. Try again later.                                                                                                 |

⚛️React Not Detected React is not detected on this page. Please ensure you're visiting a React application.
