# Overview

Transparency in costs, including shipping, is key to maintaining trust with your customers and ensuring
compliance with Klarna's guidelines.

In case an order includes additional cost due to shipping these should be detailed in the `order_lines` as an
additional product.

In order to clearly indicate that the object is associated to shipping fees and not to an specific product,
you should indicate `"type": "shipping_fee"`. Additionally, as a good practice we recommend to set the name of
the corresponding also as "**Shipping**" or any variation that allows a clear understanding to the customer
what this line is about.

The customer will be able to see this level of details in their post purchase experience, including Klarna
app.

This will ensure a transparent and accurate checkout experience for your customers as well as better post
purchase experience.

## Integration steps

Let's break it down into simple steps:

**1 - Identify the shipping costs**:

Before you can send the shipping fee information through the API, you need to determine the shipping costs
associated with the customer's order. This can vary based on factors like destination, delivery method, and
package weight.

**2- Validate you checkout experience**:

Within your checkout system, ensure that you have a field or method to calculate the shipping costs before the
final checkout stage. This should be dynamic, adjusting in real-time as customers change their shipping
preferences.

**3- Modify the Klarna Payments API Request**:

In your API request to Klarna, you'll include the shipping costs as a separate line item. `order_lines` object
should be included in the
[creation of the session](https://docs.klarna.com/api/payments/#operation/createCreditSession!path=order_amount&t=request)
request as well as in the
[creation of the order](https://docs.klarna.com/api/payments/#operation/createOrder!path=order_lines&t=request)request.

Here's a simplified example of how to structure this in your payload:

#### Example:`order_lines` object for shipping fees

```json
{
  "order_amount": 10000,
  "order_tax_amount": 2000,
  "order_lines": [
    {
      "type": "physical",
      "name": "Product Name",
      "quantity": 1,
      "unit_price": 8000,
      "tax_rate": 2500,
      "total_amount": 8000,
      "total_tax_amount": 2000
    },
    {
      "type": "shipping_fee",
      "name": "Shipping",
      "quantity": 1,
      "unit_price": 2000,
      "tax_rate": 0,
      "total_amount": 2000,
      "total_tax_amount": 0
    }
  ]
}
```

**4 - Testing**:

Before going live, thoroughly test the integration in a sandbox environment to ensure the shipping costs are
correctly calculated and displayed to the customer. Klarna provides a test environment for this purpose.

**5 - Go Live**:

Once testing confirms that everything is working as expected, you can proceed to deploy the changes to your
live environment. Keep an eye on the first transactions to ensure all data is transmitted correctly.
