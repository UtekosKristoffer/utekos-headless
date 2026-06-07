# Create an HPP session

Use this API to create an HPP session after creating a payment session. Read more on Create a new HPP session.

Endpoint: POST /hpp/v1/sessions Version: 1.1

## Header parameters:

- `User-Agent` (string) User-Agent

## Request fields (application/json):

- `merchant_urls` (object)

- `merchant_urls.back` (string) Back URL Example:
  "https://example.com/back?sid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&hppId={{session_id}}"

- `merchant_urls.cancel` (string) Cancel URL Example:
  "https://example.com/cancel?sid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&hppId={{session_id}}"

- `merchant_urls.error` (string) System error URL Example:
  "https://example.com/error?sid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&hppId={{session_id}}"

- `merchant_urls.failure` (string) Failure URL Example:
  "https://example.com/fail?sid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&hppId={{session_id}}"

- `merchant_urls.status_update` (string) Status update URL Example:
  "https://example.com/status_update?sid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&secret=yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy&hppId={{session_id}}"

- `merchant_urls.success` (string) Success URL Example:
  "https://example.com/success?sid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&hppId={{session_id}}&token={{authorization_token}}"

- `options` (object)

- `options.background_images` (array) List of Images to use for the background. Best matching resolution will
  be used.

- `options.background_images.url` (string) Url for the image

- `options.background_images.width` (integer) Width of the image

- `options.logo_url` (string) URL of the logo to be displayed Example: "https://example.com/logo.jpg"

- `options.page_title` (string) Title for the Payment Page Example: "Complete your purchase"

- `options.payment_method_categories` (array) Payment Method Categories to show on the Payment Page. All
  available categories will be given to the customer if none is specified using payment_method_category or
  payment_method_categories. Ignored field for KCO Orders. Enum: "DIRECT_DEBIT", "DIRECT_BANK_TRANSFER",
  "PAY_NOW", "PAY_LATER", "PAY_OVER_TIME", "KLARNA"

- `options.payment_method_category` (string) Payment Method Category to show on the Payment Page. All
  available categories will be given to the customer if none is specified using payment_method_category or
  payment_method_categories. Ignored field for KCO Orders. Enum: "DIRECT_DEBIT", "DIRECT_BANK_TRANSFER",
  "PAY_NOW", "PAY_LATER", "PAY_OVER_TIME", "KLARNA"

- `options.place_order_mode` (string) Enum: "PLACE_ORDER", "CAPTURE_ORDER", "NONE"

- `options.purchase_type` (string) The type of this purchase Enum: "BUY", "RENT", "BOOK", "SUBSCRIBE",
  "DOWNLOAD", "ORDER", "CONTINUE"

- `options.show_subtotal_detail` (string) Enum: "HIDE"

- `payment_session_url` (string, required) URL of the KP Session or KCO Order to be hosted by the HPP Session
  Example: "One of https://api.kustom.co/payments/v1/sessions/92d97f60-7a78-46a5-8f68-c56fe52dc4af or
  https://api.kustom.co/checkout/v3/orders/92d97f60-7a78-46a5-8f68-c56fe52dc4af"

- `profile_id` (string) Profile id for default session options Example: "87ab3565-5e06-4006-9ada-8eedc6926703"

## Response 201 fields (application/json):

- `distribution_module` (object)

- `distribution_module.generation_url` (string)

- `distribution_module.standalone_url` (string)

- `distribution_module.token` (string)

- `distribution_url` (string) Endpoint for link distribution Example:
  "https://api.kustom.co/hpp/v1/sessions/9cbc9884-1fdb-45a8-9694-9340340d0436/distribution"

- `expires_at` (string) Session expiration time Example: "2038-01-19T03:14:07.000Z"

- `manual_identification_check_url` (string) Endpoint for manual identification check Example:
  "https://api.kustom.co/hpp/v1/sessions/9cbc9884-1fdb-45a8-9694-9340340d0436/manual-id-check"

- `qr_code_url` (string) HPP url to download qr code image Example:
  "https://pay.klarna.com/eu/hpp/payments/a94e7760-d135-2721-a538-d6294ea254ed/qr"

- `redirect_url` (string) HPP url to redirect the consumer to. ECOMMERCE only Example:
  "https://pay.klarna.com/eu/hpp/payments/2OCkffK"

- `session_id` (string) HPP session id Example: "9cbc9884-1fdb-45a8-9694-9340340d0436"

- `session_url` (string) Endpoint to get the session Example:
  "https://api.kustom.co/hpp/v1/sessions/9cbc9884-1fdb-45a8-9694-9340340d0436"

## Response 400 fields

## Response 401 fields

## Response 403 fields

## Response 404 fields
