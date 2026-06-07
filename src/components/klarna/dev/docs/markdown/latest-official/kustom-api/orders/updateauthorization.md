# Update the order amount and order lines

Set new order amount and order lines. Read more on Updating orders

Endpoint: PATCH /ordermanagement/v1/orders/{order_id}/authorization Version: 1.0.0

## Path parameters:

- `order_id` (string, required) Order id

## Header parameters:

- `Klarna-Idempotency-Key` (string) This header will guarantee the idempotency of the operation. The key
  should be unique and is recommended to be a UUID version 4. Retries of requests are safe to be applied in
  case of errors such as network errors, socket errors and timeouts. Input values of the operation are
  disregarded when evaluating the idempotency of the operation, only the key matters.

## Request fields (application/json):

- `description` (string) Description of the change. Example: "Added charger"

- `order_amount` (integer, required) The new total order amount. Minor units.

- `order_lines` (array, required) New set of order lines for the order.

- `order_lines.image_url` (string) URL to an image that can be embedded in communications between Klarna and
  the customer. Example: "https://yourstore.example/product/headphones.png"

- `order_lines.merchant_data` (string) Data about the order line. Example: "Some metadata"

- `order_lines.name` (string, required) Descriptive item name.

- `order_lines.product_identifiers` (object) product_identifiers

- `order_lines.product_identifiers.brand` (string) The product's brand name as generally recognized by
  consumers. If no brand is available for a product, do not supply any value. Maximum 70 characters. Example:
  Intel Example: "Intel"

- `order_lines.product_identifiers.category_path` (string) The product's category path as used in the
  merchant's webshop. Include the full and most detailed category and separate the segments with ' > '.
  Maximum 750 characters. Example: Electronics Store > Computers & Tablets > Desktops Example: "Electronics
  Store > Computers & Tablets > Desktops"

- `order_lines.product_identifiers.color` (string) Color to be shown to the end customer (max 64 characters).
  Example: Denim blue Example: "Denim blue"

- `order_lines.product_identifiers.global_trade_item_number` (string) The product's Global Trade Item Number
  (GTIN). Common types of GTIN are EAN, ISBN or UPC. Exclude dashes and spaces, where possible. Maximum 50
  characters. Example: 735858293167 Example: 735858293167

- `order_lines.product_identifiers.manufacturer_part_number` (string) The product's Manufacturer Part Number
  (MPN), which - together with the brand - uniquely identifies a product. Only submit MPNs assigned by a
  manufacturer and use the most specific MPN possible. Maximum 70 characters. Example: BOXNUC5CPYH Example:
  "BOXNUC5CPYH"

- `order_lines.product_identifiers.size` (string) Size to be shown to the end customer (max 64 characters).
  Example: 4 Example: 4

- `order_lines.product_url` (string) URL to the product that can be used in communications between Klarna and
  the customer. Example: "https://yourstore.example/product/headphones"

- `order_lines.quantity` (integer, required) Item quantity. Example: 1

- `order_lines.quantity_unit` (string) Unit used to describe the quantity. Example: "pcs."

- `order_lines.reference` (string) Article number, SKU, or similar identifier on the product variant level.
  Example: 75001

- `order_lines.tax_rate` (integer) The tax rate in percent with two implicit decimals.

- `order_lines.total_amount` (integer, required) Total amount including tax and discounts (quantity \*
  unit_price - total_discount_amount).

- `order_lines.total_discount_amount` (integer) The discount amount in minor units. Includes tax. Example:
  1200 = $12. Max value: 200000000

- `order_lines.total_tax_amount` (integer) The total tax amount in minor units.

- `order_lines.type` (string) Order line type. Enum: "physical", "discount", "shipping_fee", "sales_tax",
  "store_credit", "gift_card", "digital", "surcharge", "return_fee", "package"

- `order_lines.unit_price` (integer, required) Unit price including tax without applying discounts in minor
  units.

## Response 403 fields (application/json):

- `correlation_id` (string) Correlation id. For searching logs. Example:
  "66782175-ae05-44fc-9eb3-eeceadbad271"

- `error_code` (string) Error code Example: "NOT_ALLOWED"

- `error_messages` (array) Error messages

## Response 404 fields (_/_):

- `correlation_id` (string)

- `error_code` (string) Enum: "INTERNAL_ERROR", "NOT_FOUND", "TOO_MANY_REQUESTS", "REFUND_NOT_ALLOWED",
  "CAPTURE_NOT_ALLOWED", "CANCEL_NOT_ALLOWED", "UPDATE_NOT_ALLOWED", "NO_SUCH_ORDER", "BAD_REQUEST",
  "PAYLOAD_TOO_LARGE", "NO_SUCH_CAPTURE", "RESOURCE_NOT_FOUND", "INVALID_REQUEST_PARAMETERS", "NOT_ALLOWED",
  "UNSUPPORTED_MEDIA_TYPE", "FORBIDDEN"

- `error_messages` (array)
