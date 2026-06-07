# [](cancelAuthorization.md)Cancel an authorization

**DELETE**

**Endpoint:** `https://api.klarna.com/payments/v1/authorizations/{authorizationToken}`

Use this API call to cancel/release an authorization.

If the `authorization_token` received during a Klarna Payments won’t be used to place an order immediately you
could release the authorization.

**Read more on** [Cancel an existing authorization](cancel-an-authorization.md).

##### path Parameters

`authorizationToken` : required

**Type:** string

### Responses

**204:** The authorization was cancelled successfully.

**403** You were not authorized to execute this operation.

**404:** The authorization does not exist.
