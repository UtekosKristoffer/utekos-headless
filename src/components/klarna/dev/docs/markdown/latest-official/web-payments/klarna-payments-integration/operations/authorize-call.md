# Authorize() call

Use the Klarna JavaScript SDK to finalize an authorization.

In a multistep checkout, your customer can change any order details after the payment selection step (for
example, on an order review page). If you have a multistep checkout and you `authorize` Klarna at the payment
selection step, you might need to `finalize` the purchase with Klarna when your customer has reviewed the
order. The authorization of the purchase must always happen at the end of the purchase when the customer
clicks the **Buy** button.

To finalize a purchase in a multistep checkout, use the `authorize` call at the payment selection step and the
`finalize` call when the customer clicks the **Buy** button.

You need to finalize the authorization only if you have a multistep checkout.

If you're starting a new Klarna payments integration, we recommend that you authorize the purchase at the very
last step in your checkout.

During the authorization step, call authorize with the auto_finalize parameter set to false. In this way, you
indicate that there's an upcoming finalization step in your checkout.

```javascript
Klarna.Payments.authorize({ payment_method_category: 'klarna', auto_finalize: false }, {}, function (res) {
  // proceed to next checkout page. The finalize_required property in the response indicates
  // if finalize is needed or not.
  //
  // res = {
  //   show_form: true,
  //   approved: true,
  //   finalize_required: true
  // }
})
```

Sample of the `authorize()` for finalizing the authorization.

## Finalize() call

If the response of the authorize call indicated that `finalize_required` is `true` you need to call
`finalize()` when the customer reaches the last page at checkout to finish the purchase. This call triggers
the actual authorization and returns the `authorization_token`.

```javascript
Klarna.Payments.finalize({ payment_method_category: 'klarna' }, {}, function (res) {
  // res = {
  //   show_form: true,
  //   approved: true,
  //   authorization_token: ...
  // }
})
```

Sample of the `finalize()` for finalizing the authorization.

### Responses

In a successful response, you get an `authorization_token` to create an order. For more details about the
possible responses, see the
[Get authorization](/src/components/klarna/dev/docs/markdown/latest-official/web-payments/klarna-payments-integration/STEPS/STEP-TWO/check-out#Getauthorization)
section of the documentation.
