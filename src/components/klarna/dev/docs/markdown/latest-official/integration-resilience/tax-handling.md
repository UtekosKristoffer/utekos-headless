# Why do we care?

When using Klarna payments, it's important that you include correct tax details for each order.

When you include tax details in each order, your customers get the right sense of the total order amount.
Klarna payments is equipped with a validation mechanism to ensure the tax calculations are correct.

Below you can find in-depth descriptions of how this validation is done, to ensure your own validation is
aligned with Klarna’s.

## Tax handling best practices

Customer expectations and tax legislations are different in Europe, Australia, and the US. Thus, we recommend
different approaches to tax handling in each market.

### Transmitting tax in the EU or Australia

If you are using Klarna in any European market or in Australia we recommend that:

- You transmit `tax_rate` and `tax_amount` for each order line.
- The calculation of tax amounts at the order line level and the order level is within the allowed deviation,
  as described below.
- You use the `order_tax_amount` field to sum all `total_tax_amount` values at the order line level.

```json
{
  "order_amount": 62400,
  "order_tax_amount": 10400,
  "order_lines": [
    {
      "type": "physical",
      "reference": "19-402",
      "name": "Battery Power Pack",
      "image_url": "https://www.exampleobjects.com/logo.png",
      "product_url": "https://www.estore.com/products/f2a8d7e34",
      "quantity": 1,
      "tax_rate": 2000,
      "total_amount": 59500,
      "total_tax_amount": 9917,
      "unit_price": 59500,
      "type": "physical"
    },
    {
      "quantity": 1,
      "tax_rate": 2000,
      "name": "Shipping Fee",
      "total_amount": 2900,
      "total_tax_amount": 483,
      "unit_price": 2900,
      "type": "shipping_fee"
    }
  ]
}
```

An example of sharing tax details with Klarna in the EU or Australia.

### Transmitting tax in the US

If you are using Klarna in the US we recommend that the tax amount is transmitted as an additional order line.

- Different tax types should be reflected in separate order lines.
- The `name` field value for a tax order line `name` should be `"Tax"` or `"Sales Tax"`.
- `order_tax_amount` is the `total_amount` of the `sales_tax` order line.
- `order_amount` is the sum of the `total_amount` from each order line, plus the `order_tax_amount`.
- The `tax_rate` field isn't present in any order lines.

```json
{
  "purchase_country": "US",
  "purchase_currency": "USD",
  "locale": "en-US",
  "order_amount": 21000,
  "order_tax_amount": 1000,
  "order_lines": [
    {
      "type": "physical",
      "reference": "19-402",
      "name": "Battery Power Pack",
      "image_url": "https://www.exampleobjects.com/logo.png",
      "product_url": "https://www.estore.com/products/f2a8d7e34",
      "quantity": 1,
      "unit_price": 20000,
      "total_amount": 20000
    },
    {
      "type": "sales_tax",
      "name": "Tax",
      "quantity": 1,
      "unit_price": 1000,
      "total_amount": 1000
    }
  ]
}
```

US sample create session call with tax.

## Tax validation logic

There are two ways to handle taxes in Klarna payments:

- The global way of making tax a part of every single item and summarizing taxes at the order level.
- The US standard of having tax as a separate item.

The global way validates taxes at the order and item level.

At the order level, the calculated total amount including tax must be within error tolerance value ±Items
Quantity.

sum(items total tax amount) - sum(items) = total tax amount = ( sum(items) total tax amount sum(items))

At item level, the value of the calculated tax rate must be within error tolerance ±1. All item’s validation
must be valid to create an order:

(calculated tax rate - 1) = tax rate = (calculated tax rate + 1)

where:

calculated tax rate = 100 \* total tax amount / (total amount - total tax amount)

## Tax validation examples

### Example 1

An order with 2 items is accepted. Tax validation is done at the order level and at the item level.

#### Validation at the order level

(9917 + 483) - 2 = 10400 = (9917 + 483) + 2

10400 - 2 = 10400 = 10400 + 2

#### Validation at the item level

Item 1

Calculated tax rate = (100 \* 99.2) / (595 - 99.2)

Calculated tax rate = 20

2000 - 1 = 2000 = 2000 + 1

Item 2

Calculated tax rate = (100 \* 4.8) / (29 - 4.8)

Calculated tax rate = 20

2000 - 1 = 2000 = 2000 + 1

```json
{
  "order_amount": 62400,
  "order_tax_amount": 10400,
  "order_lines": [
    {
      "quantity": 1,
      "reference": "19-402",
      "name": "Battery Power Pack",
      "image_url": "https://www.exampleobjects.com/logo.png",
      "product_url": "https://www.estore.com/products/f2a8d7e34",
      "tax_rate": 2000,
      "total_amount": 59500,
      "total_tax_amount": 9917,
      "unit_price": 59500,
      "type": "physical"
    },
    {
      "quantity": 1,
      "tax_rate": 2000,
      "name": "Shipping Fee",
      "total_amount": 2900,
      "total_tax_amount": 483,
      "unit_price": 2900,
      "type": "shipping_fee"
    }
  ]
}
```

A sample order with 2 items accepted.

### Example 2

An order with 2 items passes the order-level validation but is rejected at the item level.

#### Validation at the order level (accepted)

(11900 + 580) - 2 = 12.480 = (11900 + 580) + 2

12480 - 2 = 12.480 = 12480 + 2

#### Validation at the item level (rejected)

Calculated tax rate = (119 \* 100) / (714 - 119)

Calculated tax rate = 20

2000 - 1 = 2500 = 2000 + 1

```json
{
  "order_amount": 62400,
  "order_tax_amount": 12480,
  "order_lines": [
    {
      "quantity": 1,
      "reference": "19-402",
      "name": "Battery Power Pack",
      "image_url": "https://www.exampleobjects.com/logo.png",
      "product_url": "https://www.estore.com/products/f2a8d7e34",
      "tax_rate": 2500,
      "total_amount": 59500,
      "total_tax_amount": 11900,
      "unit_price": 59500,
      "type": "physical"
    },
    {
      "quantity": 1,
      "tax_rate": 2500,
      "name": "Shipping Fee",
      "total_amount": 2900,
      "total_tax_amount": 580,
      "unit_price": 2900,
      "type": "shipping_fee"
    }
  ]
}
```

Order with 2 items rejected at the item level.

### Failed validation

If an order fails validation, you'll get an error response with the incorrect field or value.

The sales tax might change between the time when an order is created to when it's shipped. For example, an
order is placed on September 28 but doesn’t get shipped until October 1. Meanwhile, a new sales tax comes into
effect on October 1.

1. Create an order with the currently valid tax rate.
2. If the tax rate is different at the time of shipment, update the order. Most retailers don’t charge a
   higher tax, but rather side with the customer and only charge what’s quoted when the customer placed the
   order. If required by law, they charge a reduced amount if the tax is lower at the time of shipment.
3. Klarna runs a new risk check when you update the order. If this check fails, you can't capture the
   increased tax amount.
4. If Klarna accepts the update, you can capture the increased tax amount.
