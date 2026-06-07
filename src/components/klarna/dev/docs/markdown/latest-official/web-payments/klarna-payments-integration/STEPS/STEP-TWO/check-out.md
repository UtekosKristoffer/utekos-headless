# Set up Klarna's JavaScript SDK

Learn how to set up the Javascript SDK to display Klarna's widget.

During the checkout, your customers can see Klarna as a payment option, select it, and go ahead with the
purchase. To enable these customer interactions, you need to perform two main actions:

1. display the Klarna widget
2. get authorization for the purchase

The two actions take place on the client side. You have to set up Klarna's JavaScript SDK and make the
`load()` call for displaying the widget and the `authorize()` call for getting the purchase authorization.

To make the call for displaying the widget, first you need to add and initialize the SDK and then place a
container in your page.

### 1. Add the SDK to your page

Add the SDK by including the following script in the body section of your checkout page.

```markup
<script>
window.klarnaAsyncCallback = function () {

// This is where you start calling Klarna's JS SDK functions
//
// Klarna.Payments.init({....})

};
</script>
<script src="https://x.klarnacdn.net/kp/lib/v1/api.js" async></script>

```

_Sample of the Klarna's JavaScript SDK in the checkout page._

**\[INFO]**

You do not need to install the JavaScript SDK beforehand. It's enough to include the previous script in the
HTML file of your checkout page.

### 2. Initialize the SDK

Initialize the SDK by making an `init()` call and passing the `client_token` from the
[Initiate a payment step](../STEP-ONE/initiate-a-payment.md).

```javascript
Klarna.Payments.init({
  client_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.dtxWM6MIcgoeMgH87tGvsNDY6cH'
})
```

_Sample of the call to initialize the SDK._

**\[INFO]**

The \`client_token\` relies on the created session, which expires after 48 hours. The purchase might fail
after this time.

### 3. Add a container to your page

Add a container in the HTML file of your checkout page. This container specifies where to place the widget.

```markup
<div id="klarna-payments-container">
</div>

```

_Sample of the widget container._

## Display Klarna

At checkout, your customers can choose to pay with Klarna. Then, a pop-up window is opened where your
customers log into their Klarna account and select their preferred Klarna payment method.

You need to use our JavaScript SDK to display Klarna in your checkout. This interaction is possible through
the load() call happening on the client side.

**\[INFO]**

The following information is applicable for both
\[scenarios]\(https\://docs.klarna.com/payments/web-payments/before-you-start/what-is-klarna-payments/#payment-scenarios),
one-time and recurring payments.

### Load() call

At checkout, display Klarna as a payment option by using the `load()` call. Specify the following parameter:

- `container`, the identifier of the container you
  [added to your checkout page](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-2-checkout/#set-up-klarnas-javascript-sdk-3-add-a-container-to-your-page)

For more information about `load()` call parameters, refer to the
[Klarna payments SDK reference](https://docs.klarna.com/payments/web-payments/additional-resources/klarna-payments-sdk-reference/#load-parameters).

```javascript
Klarna.Payments.load(
  {
    container: '#klarna-payments-container'
  },
  {},
  function (res) {
    console.debug(res)
  }
)
```

_A sample `load()` call to display Klarna as a payment option._

#### User interaction during the call

For a better user experience, call `load()` when loading your checkout. In this way, you ensure that the
container of Klarna payments loads immediately in a hidden container, and it's ready to appear when needed.

Don't forget to use the Klarna logo that you received in
[Step 1: Initiate a payment](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)
and add the payment method name. From the payload you received in Step 1, use:

- `identifier` to dynamically load the payment option
- `name` to display the correct and localized payment method title
- `asset_urls` to contain the Klarna logo

**\[INFO]**

You can manage the name and Klarna descriptor when \[adding the Klarna payments in your
checkout]\(https\://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-2-checkout/#display-klarna)
and use the name and asset\\\_urls returned in \[Step 1: Initiate a
payment.]\(https\://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)

### Load Responses

After processing the `load()` call, the callback function is executed. The JavaScript callback is an object
containing the following parameters:

- `show_form`, indicating if Klarna payments is available
- `error,` containing details of potential error messages

We know that you want to give customers a great checkout experience. For this reason, we created a
functionality to alert your store when your customer cannot use any Klarna payment method. This alert is
through the `show_form` boolean parameter, which is used as a response flag to the `load()` call. We recommend
you listen to it all the time.

There are two potential cases that you need to handle based on the response flag:

- **Success response:** Your checkout offers Klarna payments.
- **Error response:** Your checkout is not able to offer Klarna payments.

#### Success response

If the response flag is `show_form: true`, your checkout displays Klarna as a payment option for this
purchase. This is the standard response.

```json
{
  "show_form": true
}
```

_A sample success response to offer Klarna payments._

#### Error response

If the response flag is show_form: false, your store is not able to offer Klarna as a payment option.

This negative response results from the pre-assessment that Klarna executes for the purchase.

```json
{
  "show_form": false
}
```

To handle the negative response, you can set up one of the following visual arrangements in your checkout:

- Hide the Klarna option from the checkout.
- Grey out the Klarna option and disable clicking.
- Keep the Klarna option and accept an error message. Klarna informs the customer that this option is not
  available.

## [Get authorization]

When your customer selects Klarna to pay, you need to use our JavaScript SDK to get authorization for the
purchase.

In this step, you send all the necessary customer details for Klarna to assess and decide whether or not to
accept this purchase. When the authorization is successful, you receive an authorization token as a response,
useful for
[Step 3: Create an order](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-3-create-an-order/).

**\[SUCCESS]**

The authorization is possible through the \`authorize()\` call happening on the client side, however you
should implement the \[authorization
callback]\(https\://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-2-checkout/#get-authorization-authorization-callback)
to received the authorization token is also on the server side and ensure that no authorization is missed.

**\[INFO]**

The following information is useful for both
\[scenarios]\(https\://docs.klarna.com/payments/web-payments/before-you-start/what-is-klarna-payments/#payment-scenarios),
one-time and recurring payments.

### Authorize() call

Get authorization for the purchase by using the `authorize()` call. We recommend sending the following
parameters in the data object of the authorize call:

- `billing_address`, containing the customer's billing address.
- `shipping_address`, containing the customer's shipping address. If you don't provide a shipping address, we
  copy the billing address and use it as the shipping address.

If no billing or shipping address is provided, new Klarna customers have to manually enter their full billing
address on the Klarna payment page. Providing the billing address in the `authorize() `call enables Klarna to
prefill the signup form for new customers.

We recommend to avoid any delays or asynchronous operations (for example, sending calls to your backend)
between the user clicking the **Buy** button and you calling `authorize()`. Longer delays or asynchronous
operations between the actual user interaction and the `authorize()` call cause the browser to block the
Klarna pop-up from opening.

To update the Klarna session, provide all necessary information when calling `authorize()`. If you need to
update your backend session, we recommend doing so when the customer returns from Klarna's purchase flow.

```javascript
Klarna.Payments.authorize(
  {},
  {
    billing_address: {
      given_name: 'Alice',
      family_name: 'Test',
      email: 'customer@email.se',
      phone: '+46701740615',
      street_address: 'Södra Blasieholmshamnen 2',
      postal_code: '11 148',
      city: 'Stockholm',
      country: 'SE'
    },
    shipping_address: {
      given_name: 'Alice',
      family_name: 'Test',
      email: 'customer@email.se',
      street_address: 'Södra Blasieholmshamnen 2',
      postal_code: '11 148',
      city: 'Stockholm',
      phone: '+46701740615',
      country: 'SE'
    },
    customer: {
      date_of_birth: '1941-03-21'
    }
  },
  function (res) {
    console.debug(res)
  }
)
```

_A sample `authorize()` call._

In some cases, Klarna requires additional information about the customer and purchase. We recommend you send
it in the `authorize()` call. For more information, see the
[Extra merchant data section](https://docs.klarna.com/payments/web-payments/additional-resources/use-cases/extra-merchant-data/).

**\[INFO]**

For GDPR (General Data Protection Regulation) reasons, you shouldn't send customer data before the
\`authorize()\` call.

Klarna uses all this information to make the risk assessment. To see what data you need per market and how to
format it, check the
[customer data requirements](https://docs.klarna.com/klarna-payments/in-depth-knowledge/customer-data-requirements/).

#### User interaction during the call

During the `authorize()` call and until you receive the callback, Klarna runs a purchase flow that includes a
risk assessment. You need to visually indicate to your customer that an ongoing process is happening. For a
better user experience, we suggest:

- Avoiding another `authorize()` call (for example, disable the buy button)
- Showing your customer that the order is in progress (for example, show a loading spinner)
- Preventing your customer from changing the order or billing details (for example, lock the input fields on
  your page).

### Authorization callback

Utilizing the server-side authorization callback is critical for maintaining a seamless transaction process.
This method ensures that you can get the necessary `authorization_token` and `session_id` on the back-end,
even when facing client-side communication problems. This capability is crucial for creating orders and
enhancing the customer experience, even during front-end issues. It underscores the importance of the
authorization callback in maintaining transaction continuity and ensuring a smooth process for consumers.

```json
{
  "authorization_token": "0eb73d2c-d55a-5358-9080-ddc3903e3941",
  "session_id": "e4b81ca2-0aae-4c16-bcb2-29a0a088a35b"
}
```

_A sample server-side callback request from Klarna._

**\[INFO]**

For more details, see the \[authorization
callbacks]\(https\://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/other-actions/authorization-callback/)
documentation.

### Authorization responses

There are three potential cases that you need to handle based on the response:

- **Success response:** The purchase is approved.
- **Fixable error response:** The customer needs to adjust and try again.
- **Error response:** The purchase is not approved and you can't display Klarna as a payment option.

#### Success response and authorization callback

If the response is `approved: true`, Klarna has approved the authorization for this purchase and as a response
you will received the response including:

- `approved`, containing the authorization result. It's a boolean value that indicates approved or denied.
- `show_form`, showing the availability of Klarna as a payment option. It's a boolean value that indicates
  displayed or hidden.
- `authorization_token`, containing the token that allows you to place the order. This is only returned if
  it's an approved authorization.
- `error`, contanining details of potential error messages.

`authorization_token` allows you to
[create an order](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-3-create-an-order/)
for both scenarios, recurring and one-time payments. The token is valid for 60 minutes.

#### Fixable error response

If the response of the authorize is not successful with `show_form: true` and an `error` object containing
`invalid_fields`, something fixable is wrong and the customer needs to take action. An error message is
displayed asking the customer to make corrections before you re-authorize the purchase. The error message
points out which fields are incorrect.

It's also possible that the response is `approved: false `and `show_form: true`, but the callback doesn't
include `error`. This means the customer has terminated a required interaction in the widget, such as
authentication or sign-up flows. In this case, you should keep Klarna visible so that the customer can make
another purchase attempt.

```json
{
approved: false,
show_form: true,
error: {
invalid_fields: [
billing_address.street_address
billing_address.city
billing_address.given_name
billing_address.postal_code
billing_address.family_name
billing_address.email ]
}
}

```

_A sample fixable error response._

**\[INFO]**

We suggest you use the error message in the \`authorize()\` response to highlight a specific input field on
your page.

#### Error response

If the response is `show_form: false`, your store is not able to offer Klarna as a payment option. You should
disable Klarna from your checkout, and your customer might select another payment method.

This negative response results from the pre-assessment that Klarna executes for the purchase.

```json
{
  "approved": false,
  "show_form": false
}
```

_A sample error response._ ⚛️React Not Detected React is not detected on this page. Please ensure you're
visiting a React application.
