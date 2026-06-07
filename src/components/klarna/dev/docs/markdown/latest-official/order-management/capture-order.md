# Capture an order

**Endpoint:** "https://api.klarna.com/ordermanagement/v1/orders/{order_id}/captures"

## Create capture

Authorizations: basicAuth

#### PATH PARAMETERS:

- order_id: required

Order id: string

### header Parameters

`Klarna-Idempotency-Key`: string

This header will guarantee the idempotency of the operation.

The key should be unique and is recommended to be a UUID version 4. Retries of requests are safe to be applied
in case of errors such as network errors, socket errors and timeouts. Input values of the operation are
disregarded when evaluating the idempotency of the operation, only the key matters.

Request Body schema: `application/json`: required
