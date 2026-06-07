# Get details of an HPP session

Use this API to read an HPP session content and it's status. Read more on Read HPP session.

Endpoint: GET /hpp/v1/sessions/{session_id} Version: 1.1

## Path parameters:

- `session_id` (string, required) HPP session id

## Response 200 fields (application/json):

- `authorization_token` (string) Authorization token (only for KP Sessions) Example:
  "70850a20-a2a0-5c70-810c-096fa6f850bb"

- `customer` (object)

- `customer.date_of_birth` (string) Customer's date of birth (YYYY-MM-dd) Example: "1987-08-15"

- `customer.family_name` (string) Customer's family name

- `customer.given_name` (string) Customer's given name

- `customer.national_identification_number` (string) Customer's national identity number Example:
  "19870815-84932"

- `customer.title` (string) Customer's title Example: "Mr"

- `expires_at` (string) Session expiration time Example: "2038-01-19T03:14:07.000Z"

- `klarna_reference` (string) Kustom reference provided by MoOD Example: "ffc25786"

- `manual_identification` (object)

- `manual_identification.challenge` (string) Identification challenge Example: "A78"

- `manual_identification.customer_obfuscated` (object)

- `manual_identification.expires_at` (string) Session identification expiry time (YYYY-MM-ddThh:mm:ss.fffZ)
  Example: "2038-01-19T03:14:07.000Z"

- `order_id` (string) Order id of the payment session Example: "93d644a2-43f3-11e9-b210-d663bd873d93"

- `session_id` (string) The id of the HPP Session Example: "a15b228c-02ad-11e9-8eb2-f2801f1b9fd1"

- `status` (string) Current HPP Session status Enum: "WAITING", "BACK", "IN_PROGRESS", "MANUAL_ID_CHECK",
  "COMPLETED", "CANCELLED", "FAILED", "DISABLED", "ERROR"

- `updated_at` (string) Latest status update time Example: "2038-01-19T03:14:07.000Z"

## Response 401 fields

## Response 403 fields

## Response 404 fields

⚛️React Not Detected React is not detected on this page. Please ensure you're visiting a React application.
