# Get customer token details

Use the Klarna payments API to check the status and details of the payment method linked to a customer token.

To get the details of a customer token, send a `GET` request with an empty request body to the
`{apiUrl}/customer-token/v1/tokens/{customerToken}` endpoint. Provide the customer token as a `customerToken`
path parameter.

### Success response

### In response to your call, you'll receive the customer token's status and the details of the associated payment method.

```json
{
  "card": {
    "brand": "VISA",
    "expiry_date": "12/2020",
    "masked_number": "**1234"
  },
  "direct_debit": {
    "masked_number": "**124"
  },
  "payment_method_type": "INVOICE",
  "status": "ACTIVE"
}
```

A success response to the check customer token details request.

### Error response

### If the customer token in your request is invalid, you'll get an error response. Make sure that the `customerToken` in the path matches the `token_id` of the token you \[ created earlier].

You can use the value in `correlation_id` to find entries related to the request in **Logs** in the Merchant
portal.

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "NOT_FOUND",
  "error_messages": ["Invalid customer-token ID"]
}
```
