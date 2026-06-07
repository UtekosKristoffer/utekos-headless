# Discount voucher or code

Most common discount types can be deducted through Klarna payments. Find all information below on vouchers,
codes, gift cards and loyalty clubs, including integration and VAT handling.

A discount code or voucher gives the customer a right to get a price reduction, either in absolute value or as
a percentage off. A product's final price is the tax basis for the VAT and the tax rate stays the same. For
example, if the product is reduced by 10%, the absolute value of the VAT is also reduced by 10%.

Klarna payments supports value-based and percentage discounts. They can be applied for specific items or
across entire orders. Currently, Klarna doesn't support the user interface to digest discounts, but they can
be applied to the order lines. For percentage reductions, the discounts and taxes can either be added as
positive values per order line as `total_discount_amount` or as separate order lines with negative amounts.

The formula for calculating the tax amount is _total_amount_ - _total_amount_ \* 10000 / (10000 + _tax_rate_).

### Example of a discount per order line

The order is placed for a white t-shirt discounted by 20% at a tax rate of 25%.

```json
{
...
"name": "white t-shirt",
"quantity": 1,
"reference": "12-345-ABC",
"tax_rate": 2500,
"total_amount": 25000,
"total_discount_amount": 5000,
"total_tax_amount": 5000,
"type": "physical",
"unit_price": 30000
}

```

### Example of a fixed $10-discount as a separate order line

```json
{
...
"name": "10 USD discount",
"quantity": 1,
"reference": "12-345-ABC-discount",
"tax_rate": 2500,
"total_amount": -1000,
"total_tax_amount": -200,
"type": "physical",
"unit_price": -1000
}

```

### Example of a buy-2-for-3 deal

```json
{
...
"name": "buy 2 for 3 discount",
"quantity": 1,
"reference": "buy 2 get 3-discount",
"tax_rate": 2500,
"total_amount": - {3*item price - 2*item},
"total_tax_amount": - {total_amount*0.2),
"type": "discount",
"unit_price": -{3*item price - 2*item}
}

```

## Gift cards

Gift cards can be used to purchase any item from the merchant that issued them. Unlike vouchers and codes
above, gift cards have a face-value assigned to them, meaning that someone paid for the purchase of that
value. Hence, the purchase of a gift card can be seen as a currency exchange, so no VAT is triggered at this
point. The VAT needs to be calculated only upon redemption of the gift card. Gift cards are most commonly
categorized as so-called multi-purpose vouchers, meaning that they allow purchases for products with different
tax rates. Since the tax amount can't be predicted until purchase, the redemption of a gift card inside Klarna
payments should be through a separate order line with a negative amount and the VAT set to 0.

## Loyalty clubs

There are many different types of loyalty clubs and schemes, so evaluation needs to be done on a case-to-case
basis. Most often, customers collect points for their purchases that they can then exchange for bonus checks.
The bonus checks should be handled similarly to a code or voucher, meaning the price and VAT should be reduced
subsequently to the applied bonus points. Please reach out to
[Klarna Merchant support](https://www.klarna.com/merchant-support?utm_source=devportal&utm_medium=web&utm_campaign=support-link&utm_content=footer)
for help.

## Store credit

Store credit is used when a customer returns an item that was already paid for and does not get a cash refund
for it. This only applies to store credit that is created outside of Klarna’s payment methods. In this case
the store credit should be treated as a gift card, meaning as a new negative order line with the VAT set to 0.
Issuing the store credit isn't subject to taxation, only the subsequent purchase with it will trigger VAT.

### Example from store_credit and gift_cards in the order lines

```json
"order_lines" : [
{
"type" : "gift_card",
"reference" : "654",
"name" : "gift card",
"quantity" : 1,
"quantity_unit" : "euro",
"unit_price" : -300,
"tax_rate" : 1000,
"total_amount" : -300,
"total_tax_amount" : -27
},
{
"type" : "store_credit",
"reference" : "987",
"name" : "store credit",
"quantity" : 1,
"quantity_unit" : "euro",
"unit_price" : -500,
"tax_rate" : 0,
"total_amount" : -500,
"total_tax_amount" : 0
}
]

```
