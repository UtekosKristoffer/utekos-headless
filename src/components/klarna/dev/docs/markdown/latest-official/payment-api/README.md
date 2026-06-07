# Klarna Payments API V1 (1.0.0)

Download OpenAPI specification:[Download](blob:https://docs.klarna.com/83a17e09-febb-452a-996b-48cc132f055f)

The payments API is used to create a session to offer Klarna's payment methods as part of your checkout. As
soon as the purchase is completed the order should be read and handled using the
[`Order Management API`](https://docs.klarna.com/api/ordermanagement).

**Note:** Examples provided in this section includes full payloads, including all supported fields, required
and optionals. In order to implement a best in class request we recommend you don't include customer details
when initiating a payment session. Refer to
[Initiate a payment](https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)
section for further details.

Read more on [Klarna payments](https://docs.klarna.com/klarna-payments/).

## [](https://docs.klarna.com/acquirer/klarna/api/payments/#operation/createCreditSession)Create a session

Use this API call to create a Klarna Payments session.  
When a session is created you will receive the available `payment_method_categories` for the session, a
`session_id` and a `client_token`. The `session_id` can be used to read or update the session using the REST
API. The `client_token` should be passed to the browser. Read more on
**[Create a new payment session](https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)**.
