# Acknowledge a Kustom checkout order

Acknowledge order. Read more on Acknowledging orders

Endpoint: POST /ordermanagement/v1/orders/{order_id}/acknowledge Version: 1.0.0

## Path parameters:

- `order_id` (string, required) Order id

## Header parameters:

- `Klarna-Idempotency-Key` (string) This header will guarantee the idempotency of the operation. The key
  should be unique and is recommended to be a UUID version 4. Retries of requests are safe to be applied in
  case of errors such as network errors, socket errors and timeouts. Input values of the operation are
  disregarded when evaluating the idempotency of the operation, only the key matters.

## Response 403 fields (application/json):

- `correlation_id` (string) Correlation id. For searching logs. Example:
  "66782175-ae05-44fc-9eb3-eeceadbad271"

- `error_code` (string) Error code Example: "NOT_ALLOWED"

- `error_messages` (array) Error messages

## Response 404 fields (application/json):

- `correlation_id` (string) Correlation id. For searching logs. Example:
  "66782175-ae05-44fc-9eb3-eeceadbad271"

- `error_code` (string) Error code Example: "NO_SUCH_ORDER"

- `error_messages` (array) Error messages

## Response 204 fields
