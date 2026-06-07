# What is automatic capture (auto-capture)?

Auto-capture finalizes transactions immediately for certain categories like digital products. It requires
setting auto_capture true in the order request, complying with Klarna's shipping policy for merchant
protection.

By default, all transactions successfully completed via Klarna Payment direct integrations will be finalized
with an order created but not captured. This means that the customer has successfully completed a purchase but
has not actually been charged for the order.

[2min read]

In order to comply with Klarna's shipping policy and remain covered by the
[Merchant Protection Program](https://www.klarna.com/international/merchant-protection-program) , all orders
should only be captured at the time of order fulfillment.

In specific segments, orders are immediately fulfilled, and the final customer will gain access to their
purchase on the spot. This is common for digital products or services.

The automatic capture allows businesses in these particular categories to capture and charge the customer
immediately at the time of purchase confirmation.

## Categories and exceptions allowed to use auto-capture

Usage of automatic capture is restricted to the following use cases and business categories:

- In-store
- Digital products
- Vouchers
- Services & Events
- Fulfilment of order within 24 hours from order creation

**Merchants associated to any other category not mentioned above are required to get explicit approval from
Klarna in order to implement it.**

**\[WARNING]**

Multiple categories that are allowed to use automatic-capture are also required to send \[addition
information]\(https\://docs.klarna.com/payments/web-payments/additional-resources/use-cases/extra-merchant-data/)
based on the corresponding category.

## Integration considerations

In order to enable automatic capture of an order, it is required to include `auto_capture `property in the
`create_order` request and set it up to `true`

```json
{
  "auto_capture": true,
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

A POST request to create an order for a one-time payment with auto-capture.

### Integration via PSPs or Platforms

Note that every partner may enable different support and configuration processes to enable and disable
auto-capture. In particular cases, if the capability is enabled by default, you will be required to disabled
it in order to be compliant with the requirements in Klarna's
[Merchant Protection Program](https://www.klarna.com/international/merchant-protection-program/).

Please see \[ here] the specific documentation for the corresponding partner to understand particular
requirements. ⚛️React Not Detected React is not detected on this page. Please ensure you're visiting a React
application.
