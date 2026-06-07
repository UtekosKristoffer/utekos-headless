# Initiate a payment

The end-to-end process to make a payment with Klarna involves three main steps.

In order to enable Klarna in your e-commerce you need to complete the following 3 steps:

1. **[Initiate a payment](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/)**
   creates a session that identifies the purchase towards Klarna.
2. **[Check out](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-2-checkout/)**
   displays Klarna as a payment method and authorizes the purchase.
3. **[Create an order](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-3-create-an-order/)**
   uses the authorized payment from the previous step and creates an order.

The payment process has slight variations according to each
[scenario](https://docs.klarna.com/payments/web-payments/before-you-start/what-is-klarna-payments/#payment-scenarios)
one-time or recurring payments. The following sections present a high-level description of the payment process
in each scenario.

The payment process starts when you create a session towards Klarna. With an active session, you are able to
show Klarna as a payment method in your checkout.

This session identifies the payment and is unique for the order life cycle. It also dictates which payment
methods are available, depending on the purchase country and the cart's amount.

Creating a session takes place in the server side. You have to send a request to the Klarna payments API. As a
response, you get a `client_token` (JSON Web Token), useful for the following step.

### One-time payments scenario

You need to specify in the API request that the created session is for a one-time payment. The `intent`
parameter should contain the values that are valid for this scenario.

### Recurring payments scenario

You need to specify in the API request that the created session is for a recurring payment. The `intent`
parameter should contain the values that are valid for this scenario.

**\[INFO]**

For more technical details, see \[Step 1: Initiate a
payment]\(https\://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/).

## Check out

When you create the purchase session, your customer can see Klarna as a payment method in your checkout and go
ahead with the purchase.

This step consists of two actions:

1. displaying the Klarna widget
2. authorizing the purchase.

**Displaying the Klarna widget**

The wigdet displays Klarna as an option to pay. If the customer selects it, they have to log into
[user account](https://docs.klarna.com/resources/developer-tools/sample-data/sample-customer-data/#about-user-account)
to then chose their preferred payment method.

You have to load the Klarna widget along with other payment methods you offer in your checkout.

Displaying the widget takes place in the client side. You need to make a request using Klarna's Javascript SDK
and pass the `client_token` from the previous step.

**Authorizing the purchase**

When your customer selects to pay with Klarna, you have to request authorization from our side before going
ahead.

Authorizing the purchase takes place in the client side. You need to make a request using the Klarna's
Javascript SDK. As a response, you receive an` authorization_token,` useful for the following step.

When you call authorize(), the Klarna window opens for your customers and here they need to log into their
user account to be able to select a payment method for their purchase.

Then, we run a payment method flow including operations on the specific purchase and customer like collecting
funding source, underwriting, and running fraud assessments.

We use the order and customer information, make an assessment, and authorize the purchase.

### Scenarios

In this step, your customers see in the widget Klarna as a single payment option and there is no major
difference depending on the scenario, one-time or recurring payments. After they log into user account, they
can see the different payment methods.

**\[INFO]**

For more technical details, see \[Step 2: Check
out.]\(https\://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-2-checkout/)

## Create an order

To continue with the purchase, you have to create an order in Klarna's system.

This step takes place in the server side through the Klarna payments API.

### One-time payments scenario

For one-time payments, you send an API request, including the `authorization_token` from the previous step and
a URL pointing to the confirmation page for your customer. This request creates an order in Klarna’s system.
Once you create an order, the payment session is closed.

### Recurring payments scenario

Creating an order for recurring payments comprises two sub-steps:

1. generating a customer token
2. placing the order.

**Generating `customer_token `**

Generate a `customer_token` to use it any time you need to place an order. The `customer_token` identifies
your customer and their preferred payment method. To generate the `customer_token`, you send an API request,
including the `authorization_token` from the previous step.

**Placing the order**

The `customer_token `allows you to create an order on behalf of your customer without the need for their
confirmation at the moment of the payment. You can place the order anytime by sending an API request,
including the `customer_token` and the order details.

**\[INFO]**

For more technical details,
[see](/src/components/klarna/dev/docs/markdown/latest-official/web-payments/klarna-payments-integration/STEPS/STEP-THREE/one-time%20payment%20order.md).
