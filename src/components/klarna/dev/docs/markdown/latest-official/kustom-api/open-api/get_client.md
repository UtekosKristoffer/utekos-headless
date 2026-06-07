# Get client

Fetches a single API client by the clientId.

Endpoint: GET /elements/v1/clients/{clientId} Version: v0

## Path parameters:

- `clientId` (string, required)

## Response 200 fields (application/json):

- `id` (string) Unique identifier for the client.

- `merchant_id` (string) The ID of the merchant that owns the client.

- `allowed_origins` (array) Browser origins permitted to use this client.

- `name` (string) Friendly name shown in the portal.

- `placements` (array) Placements configured for this client.

- `placements.key` (string) Placement key configured for the client. Example: "AVAILABLE_PAYMENT_METHODS"

- `placements.custom_styles` (string) Optional CSS that will be injected into the placement container.
  Example: ".hero { background: #000; }"

- `placements.content` (array) Information required to render the placement.

- `placements.content.type` (string) Type of placement content. Enum: "PAYMENT_METHOD",
  "EXTERNAL_PAYMENT_METHOD", "DELIVERY_CARRIER", "EXPRESS_CHECKOUT"

- `placements.content.name` (string) The name of the content. Enum: "STRIPE_PUBLIC_API_KEY",
  "STRIPE_ACCOUNT_ID", "NONE"

- `placements.content.value` (string) The value of the content. Example: "MASTERCARD_DEBIT"

- `placements.content.imageUrl` (string) The URL for the image to be rendered. Example:
  "https://cdn.ingrid.com/static/shipping-logos/logo-postnord-round-30.svg"

- `placements.express_config` (object) The configuration for the Express checkout flow.

- `placements.express_config.push_url` (string, required) URL that will be used for push notification when an
  order is completed. Should be different than checkout and confirmation URLs. (max 2000 characters) Example:
  "https://merchant.com/push" Example: "https://www.example.com/api/push"

- `placements.express_config.validation_url` (string) URL that will be requested for final merchant
  validation. (must be https, max 2000 characters) Example: "https://merchant.com/validation" Example:
  "https://www.example.com/api/validation"

- `placements.express_config.confirmation_url` (string, required) URL of the merchant confirmation page. The
  consumer will be redirected back to the confirmation page if the authorization is successful after the
  customer clicks on the ‘Place Order’ button inside checkout. The special characters of the confirmation URL
  should be encoded, e.g. the "space" character should be written as "%20". Then, on top of that, the whole
  confirmation URL should be encoded. E.g. the "space" character should become "%2520". (max 2000 characters)
  Example: "https://merchant.com/confirmation.html" Example: "https://www.example.com/confirmation.html"

- `placements.express_config.payment_methods` (array) An ordered list of payment methods and how they should
  be offered in the express checkout.

- `placements.express_config.payment_methods.method` (string) Enum: "AMAZON_PAY", "APPLE_PAY", "GOOGLE_PAY",
  "KLARNA", "PAYPAL", "UNKNOWN"

- `placements.express_config.payment_methods.provider` (string) Enum: "STRIPE", "PAYPAL"

- `created_at` (string) Time when the client was created.

- `updated_at` (string) Time when the client was last updated.

## Response 400 fields (_/_):

- `message` (string)

- `additional_context` (object)

- `code` (string) Enum: "CLIENT_NOT_FOUND", "ORIGIN_NOT_ALLOWED", "HTTP_CLIENT_ERROR", "HTTP_SERVER_ERROR",
  "DOMAIN_NOT_WHITELISTED", "PLACEMENT_CONFIG_MISSING", "ARGUMENT_NOT_VALID", "CONSTRAINT_VIOLATION",
  "PROFILE_DOESNT_BELONG_TO_MERCHANT", "MERCHANT_NOT_FOUND"

## Response 502 fields (_/_):

- `message` (string)

- `additional_context` (object)

- `code` (string) Enum: "CLIENT_NOT_FOUND", "ORIGIN_NOT_ALLOWED", "HTTP_CLIENT_ERROR", "HTTP_SERVER_ERROR",
  "DOMAIN_NOT_WHITELISTED", "PLACEMENT_CONFIG_MISSING", "ARGUMENT_NOT_VALID", "CONSTRAINT_VIOLATION",
  "PROFILE_DOESNT_BELONG_TO_MERCHANT", "MERCHANT_NOT_FOUND"
