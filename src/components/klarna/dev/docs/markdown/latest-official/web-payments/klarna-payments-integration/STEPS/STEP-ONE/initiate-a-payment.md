# Authentication

This section of the guide walks you through initiating a payment and letting your customers pay with Klarna.

When your customer wants to pay with Klarna, you have to open a payment session and share the shopping cart
details in a `POST` request to the `{apiURL}/payments/v1/sessions` endpoint. In that request, you also specify
if the payment is one-time or recurring.

Once you start a payment session, it stays open for 48 hours or until you place an order. You can also send a
separate `POST` request to cancel the session.

Klarna payments API uses HTTP basic authentication. To authenticate, use your API credentials that consist of:

- A username linked to your Klarna merchant ID (MID)
- A password associated with your username

If you're using an API platform that lets you store your credentials, you can add them in relevant fields.
Otherwise, make sure to include the Base64-encoded username:password in the Authorization header field of each
API request, as shown below.

```json
Authorization: Basic pwhcueUff0MmwLShJiBE9JHA==

```

_A sample authorization request header with Base64-encoded credentials._

## Common parameters

To get a success response, include the following required parameters in your
`POST {apiURL}/payments/v1/sessions` request.

| Parameter                      | Description                                                                                                                                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale`                       | The language of information presented on the Klarna widget. Learn more about [using locale in API calls](https://docs.klarna.com/payments/web-payments/before-you-start/data-requirements/puchase-countries-currencies-locales/). |
| `purchase_country` _required_  | The country where the purchase is made. Learn more about [supported countries](https://docs.klarna.com/payments/web-payments/before-you-start/data-requirements/puchase-countries-currencies-locales/).                           |
| `purchase_currency` _required_ | The currency in which the customer is charged. Learn more about [supported currencies](https://docs.klarna.com/payments/web-payments/before-you-start/data-requirements/puchase-countries-currencies-locales/).                   |
| `order_amount` _required_      | The total price of the order, including tax and discounts.                                                                                                                                                                        |
| `order_lines` _required_       | The details of order lines in the purchase.                                                                                                                                                                                       |
| `intent`                       | The purpose of the payment session.                                                                                                                                                                                               |
| `merchant_urls.authorization`  | Get a callback once the customer has completed the flow and you can create an order.                                                                                                                                              |

**\[INFO]**

We recommend you don't include customer details when initiating a payment session. Instead, use the
\[\`authorize()\`]\(https\://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)
call to share them with Klarna at a later stage of the checkout process when the customer clicks \*\*Buy\*\*.

## Payment scenarios and intent

As [we already mentioned](https://docs.klarna.com/acquirer/klarna/get-started/what-is-klarna-payments/), you
can use Klarna payments in a variety of payment scenarios. Depending on the scenario, add the right value in
the `intent` field of the request.

For one-time payments, set `intent` to `buy`.

For recurring payments:

- Set `intent` to `tokenize` if you don't want to place an order at checkout.
- Set `intent` to `buy_and_tokenize` if you want to place the first order at checkout.
- Set `intent` to `buy_and_default_tokenize` if you want to place the first order at checkout and add an
  additional service at the same time.

The intent you set for a session determines the steps you need to take when creating an order later in the
process.

### One-time payment

To open a one-time payment session, include all common parameters in the request body and set `intent` to
`buy`.

```json
{
  "acquiring_channel": "ECOMMERCE",
  "intent": "buy",
  "purchase_country": "SE",
  "purchase_currency": "SEK",
  "locale": "en-SE",
  "order_amount": 9500,
  "order_tax_amount": 1900,
  "order_lines": [
    {
      "type": "physical",
      "reference": "19-402",
      "name": "Battery Power Pack",
      "quantity": 1,
      "unit_price": 10000,
      "tax_rate": 2500,
      "total_amount": 9500,
      "total_discount_amount": 500,
      "total_tax_amount": 1900,
      "image_url": "https://www.exampleobjects.com/logo.png",
      "product_url": "https://www.estore.com/products/f2a8d7e34"
    }
  ],
  "merchant_urls": {
    "authorization": "https://example.com/authorization_callbacks"
  }
}
```

_A sample `POST` request to create a one-time payment session._

### Recurring payment without payment at checkout

To enable recurring payments without charging your customer at checkout, include the following in your
request:

- All common parameters
- `intent` set to `tokenize`
- The subscription details in the `subscription` object

You can charge the customer later using a customer token created in the same Klarna payments session.

```json
{
  "acquiring_channel": "ECOMMERCE",
  "intent": "tokenize",
  "purchase_country": "SE",
  "purchase_currency": "SEK",
  "locale": "en-SE",
  "order_amount": 9999,
  "order_tax_amount": 2000,
  "order_lines": [
    {
      "type": "digital",
      "subscription": {
        "name": "Premium Monthly {{1234834}}",
        "interval": "MONTH",
        "interval_count": 1
      },
      "reference": "19-402",
      "name": "Streaming Service Monthly - Free Trial",
      "quantity": 1,
      "unit_price": 9999,
      "tax_rate": 2500,
      "total_amount": 9999,
      "total_discount_amount": 0,
      "total_tax_amount": 2000
    }
  ],
  "merchant_urls": {
    "authorization": "https://example.com/authorization_callbacks"
  }
}
```

_A sample `POST` request to enable recurring payments._

### Recurring payment with payment at checkout

To charge the customer at checkout and enable recurring payments at the same time, include the following in
your request:

- All common parameters
- `intent` set to `buy_and_tokenize`
- The subscription details in the `subscription` object

```json
{
  "acquiring_channel": "ECOMMERCE",
  "intent": "buy_and_tokenize",
  "purchase_country": "SE",
  "purchase_currency": "SEK",
  "locale": "en-SE",
  "order_amount": 9999,
  "order_tax_amount": 2000,
  "order_lines": [
    {
      "type": "digital",
      "subscription": {
        "name": "Premium Monthly {{1234834}}",
        "interval": "MONTH",
        "interval_count": 1
      },
      "reference": "19-402",
      "name": "Streaming Service Monthly - Free Trial",
      "quantity": 1,
      "unit_price": 9999,
      "tax_rate": 2500,
      "total_amount": 9999,
      "total_discount_amount": 0,
      "total_tax_amount": 2000
    }
  ],
  "merchant_urls": {
    "authorization": "https://example.com/authorization_callbacks"
  }
}
```

_A sample `POST` request to charge the customer at checkout and enable recurring payments._

### Recurring payment with mixed payments at the checkout

[Mixed payments](https://docs.klarna.com/payments/web-payments/additional-resources/use-cases/mixed-payments/)
allows you to charge the customer at the checkout for one item and enable future orders by tokenizing another
payment method.

- All common parameters
- `intent` set to `buy_and_default_tokenize`
- The subscription details in the `subscription` object

You will be able to charge the customer later using a customer token.

#### Success response

In response to a create session call, you receive:

- `session_id`, a payment session identifier you can use to \[ update the session] and \[ retrieve session]
  details
- `client_token`, a token you pass to the
  [JavaScript SDK](https://docs.klarna.com/payments/web-payments/additional-resources/klarna-payments-sdk-reference/)
  or Mobile
  SDK([Android](https://docs.klarna.com/payments/mobile-payments/integrate-with-mobile-sdk/android/native-view/#authorize-the-session-mobile-app),
  [iOS](https://docs.klarna.com/payments/mobile-payments/integrate-with-mobile-sdk/ios/klarna-payments/#authorizing-the-session)
  and
  [React Native](https://docs.klarna.com/payments/mobile-payments/integrate-with-mobile-sdk/reactnative/native-view/#render-payment-view-mobile-app-initialize-the-session))
  to launch the Klarna widget
- `payment_method_categories`, an array that lists the grouped Klarna payment methods available for the
  session. We can respond with one or more categories depending on the market and account configuration.

```json
{
"session_id": "068df369-13a7-4d47-a564-62f8408bb760",
"client_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAwMDAwMDAwMDAtMDAwMDAtMDAwMC0wMDAwMDAwMC0wMDAwIiwidXJsIjoiaHR0cHM6Ly9jcmVkaXQtZXUua2xhcm5hLmNvbSJ9.A_rHWMSXQN2NRNGYTREBTkGwYwtm-sulkSDMvlJL87M",
"payment_method_categories": [
{
"identifier": "klarna"
"name" : "Pay with Klarna",
"asset_urls" : {
"descriptive" : "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
"standard" : "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
}
}
]
}

```

_A sample success response to the create session call._

#### Error response

If your request doesn't pass our validation, you'll receive an error response.

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "BAD_VALUE",
  "error_messages": ["Bad value: order_lines"]
}
```

_A sample error response caused by incorrect order line details._

Go to
[Error Handling](https://docs.klarna.com/resources/developer-tools/error-handling/error-codes-and-messages-for-klarna-payments/)
to learn more about common errors and troubleshooting suggestions. You can use the value in `correlation_id`
to find entries related to the request under **Logs** in the Merchant portal. ⚛️React Not Detected React is
not detected on this page. Please ensure you're visiting a React application.
