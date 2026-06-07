# Platform and PSP support

Ready to offer Klarna Express Checkout to your customers? Here's what you need to know before integrating the
product with your store's website.

## Types of checkout patterns

Klarna offers two types of checkout experiences: a one-step checkout and a multistep checkout:

- One-step checkout is the fastest of express checkout journeys. If your goal is to create the fastest
  checkout that requires none to minimal efforts from customers, then this is the optimal option to enhance
  your checkout.
- Multistep checkout is the personalized express journey. If you’re looking to offer your customers a seamless
  checkout experience, but still want to allow them the flexibility to pick between multiple shipping options,
  insert promo codes, or participate in upsell opportunities, this is the best choice for your checkout.

Use the feature matrix below to ensure you’re setting up the right express journey for your customers.

| Feature          | One-step checkout                                                                                                                                                  | Multistep checkout                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Shipping options | Planned support in Q2 2025. Suitable for basic shipping options like home delivery. Suitable for complex shipping options like Pickup points or Click and collect. |                                                                                                         |
| Discount codes   | Discount codes can be applied on the cart page before the customer enters the Express checkout flow.                                                               | Discount codes can be applied on the checkout page after the customer enters the Express checkout flow. |
| Upsell           | Not supported.                                                                                                                                                     | Allows upselling after the customer enters the Express checkout flow.                                   |

## Placement

For the biggest impact on conversion, choose the best placement for the Express checkout button. Refer to our
[button placement](https://docs.klarna.com/conversion-boosters/express-checkout/additional-resources/button-placement/)
guidelines to optimize your customer journey for a faster checkout.

## Prerequisites

Before you integrate Express checkout, check that you meet the following prerequisites:

1. Make sure to have a payment solution with Klarna. Before integrating Express checkout into your website,
   you need to have a merchant account with Klarna and
   [Klarna payments](https://docs.klarna.com/payments/web-payments/before-you-start/prepare-your-integration/#preapre-your-integration)
   integrated in your checkout.
2. Make sure to allowlist the domain of the page on which Express checkout will be integrated.\*\* \*\*If not
   all the domains are added to the allowlist, Express checkout will still load, however, the customer will
   see a "We couldn't load the next screen" error. To allowlist the domain URLs, follow these steps:

- Log into Klarna Merchant portal. If you want to test Express checkout, log into the playground Merchant
  portal. If you want to build a live integration, log into the production Merchant portal.
- Once logged in, go to **Payment settings** > **Client Identifiers**. In the **Allowed Origins for your
  integrations** section, click **Manage origins**.
- In the **Register new origin** field, add your domain’s URL. Then, click **Register**. The registered domain
  is now listed in **Allowed origins**.

3. Generate a client identifier that will let you authenticate requests sent to Klarna:

- Log into Klarna Merchant portal.
- Once logged in, go to **Payment settings** > **Client Identifiers**.
- To generate a new client identifier, navigate to **Client Identifiers for your integrations** and click
  **Generate client identifier**.

If you’ve previously generated a client identifier for your account, you can use it to build your Express
checkout integration.

## Support

If you need support with Express checkout, please contact
[Klarna's merchant support](https://www.klarna.com/uk/business/merchant-support/). ⚛️React Not Detected React
is not detected on this page. Please ensure you're visiting a React application.
