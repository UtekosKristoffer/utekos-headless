# Validations when initiating a payment

Here you find information on the validations that occur throughout the payment process.

Different data validations occur in the three steps of the payment process:

1. [Initiate a payment](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/).
2. [Check out](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-2-checkout/).
3. [Create an order](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-3-create-an-order/).

When initiating a payment, the Klarna Payments API uses the request payload to validate the attributes of the
created session. We validate that:

- `locale` and `purchase_country` are aligned
- `tax` is aligned to the standards in the
  [Handle tax article](https://docs.klarna.com/payments/web-payments/additional-resources/error-handling-and-validations/tax-handling/)
- value types and restrictions on specific fields are aligned to the guidelines in the
  [API documentation](https://docs.klarna.com/api/payments/).

### Validations when updating the cart

When
[updating the cart](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/other-actions/update-the-cart/),
the Klarna payments API takes any updated data as a new session to validate.

## Validations when checking out

When
[getting the authorization](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/step-2-checkout/#get-authorization),
the `authorize()` call triggers a risk and fraud assessment on Klarna’s side.

In this step, we check that the address fulfills all country standards and exists in the records of that
specific country. If this information is broken, the validation fails.

If any address field - in either billing or shipping - is incorrect, you get an error message specifying what
field is failing.

## Validations when creating an order

When creating an order, we validate the data against the most recent purchase and customer information you
send us. This applies to both scenarios,
[recurring and one-time payments](https://docs.klarna.com/payments/web-payments/before-you-start/what-is-klarna-payments/#payment-scenarios).

By considering the last payload you send, we ensure that both yours and our side keep the most updated data.
We validate the following:

- the billing and shipping address objects are the same when creating an order and getting authorization. Any
  difference makes the order invalid
- the order lines in the payload are the same when creating an order and getting authorization. This object is
  treated as a list.

If the data shared when creating an order matches the data shared when getting authorization and no other
details have been added in between, the validation is successful.

If you share customer details up until creating an order but not when getting authorization, an empty payload
matches the customer data you are sending, and the validation is successful.
