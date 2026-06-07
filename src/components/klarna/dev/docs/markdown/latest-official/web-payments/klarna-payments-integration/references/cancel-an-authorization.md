# Requesting the release

Use the Klarna payments API to cancel an authorization and remove any customer debts gotten during the payment
session.

When a customer won't complete a purchase or you won't use the authorization token immediately, you can cancel
the authorization. This action clears the customer's debt.

To cancel an authorization, send a `DELETE `request with an empty request body to the
`{apiUrl}/payments/v1/authorizations/{authorizationToken}` endpoint. Provide the authorization token you got
from the [`authorize()` call](cancelAuthorization.md) as an {`authorizationToken`} parameter.

**[INFO]**

Canceling an authorization might impact our credit assessment when attempting to generate a new one.

### Success response

In response to your call, you receive a `204` status code corresponding to a successful but empty response.

```json
HTTP/1.1 204 No Content

Content-Type: application/json
Klarna-Correlation-Id: e19dc121-1276-419d-882a-c343d58fb9aa

{ }

```

Sample of a success response to cancel an authorization.

### Error response

If the authorization token in your request is invalid, you get an error response. Ensure the
`authorization_token` value you provided is correctly formatted and corresponds to an authorization that has
not expired.

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "ERROR_CODE",
  "error_messages": ["ERROR_MESSAGE"]
}
```

Sample of an error response to release an authorization.
