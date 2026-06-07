# Create an order with a customer token

Use this API call to create an order using a Kustom Customer Token. Make sure you use the correct token ID
when placing an order, to ensure that the right consumer gets billed. Read more on Create a new order using
the customer token.

Endpoint: POST /customer-token/v1/tokens/{customerToken}/order Version: 1.0.0

## Path parameters:

- `customerToken` (string, required)

## Header parameters:

- `Klarna-Idempotency-Key` (string)

## Request fields (application/json):

- `attachment` (object)

- `attachment.body` (string, required) The content of the extra merchant data should be presented as a string
  inside this property. The body should be an object containing any of the keys and sub-objects described
  below serialized to JSON. More information on that object can be found
  [here](https://docs.klarna.com/api/extra-merchant-data). Example:
  "{\"customer_account_info\":[{\"unique_account_identifier\":\"test@gmail.com\",\"account_registration_date\":\"2017-02-13T10:49:20Z\",\"account_last_modified\":\"2019-03-13T11:45:27Z\"}]}"

- `attachment.content_type` (string, required) The content type of the body. It is usually represented as
  "application/vnd.klarna.internal.emd-v2+json" Example: "application/vnd.klarna.internal.emd-v2+json"

- `auto_capture` (boolean) Allow merchant to trigger auto capturing.

- `merchant_data` (string) Pass through field (max 6000 characters). Example:
  "{\"order_specific\":[{\"substore\":\"Women's Fashion\",\"product_name\":\"Women Sweatshirt\"}]}"

- `merchant_reference1` (string) Used for storing merchant's internal order number or other reference. If set,
  will be shown on the confirmation page as "order number" (max 255 characters). Example: "ON4711"

- `merchant_reference2` (string) Used for storing merchant's internal order number or other reference (max 255
  characters). Example: "ON4711"

- `merchant_urls` (object)

- `merchant_urls.confirmation` (string, required) URL of merchant confirmation page. (max 2000 characters)

- `merchant_urls.push` (string) URL that will be requested when an order is completed. Should be different
  than checkout and confirmation URLs. (max 2000 characters)

- `order_amount` (integer, required) Non-negative, minor units. Total amount of the order, including tax and
  any discounts.

- `order_lines` (array, required) The applicable order lines (max 1000)

- `order_lines.image_url` (string) URL to an image that can be later embedded in communications between Kustom
  and the customer. (max 1024 characters). A minimum of 250x250 px resolution is recommended for the image to
  look good in the Kustom app, and below 50x50 px won't even show. We recommend using a good sized image
  (650x650 px or more), however the file size must not exceed 12MB. Example:
  "https://www.exampleobjects.com/logo.png"

- `order_lines.merchant_data` (string) Used for storing merchant's internal order number or other reference.
  Pass through field. (max 255 characters) Example:
  "{\"customer_account_info\":[{\"unique_account_identifier\":\"test@gmail.com\",\"account_registration_date\":\"2017-02-13T10:49:20Z\",\"account_last_modified\":\"2019-03-13T11:45:27Z\"}]}"

- `order_lines.name` (string, required) Descriptive name of the order line item. Example: "Running shoe"

- `order_lines.product_identifiers` (object)

- `order_lines.product_identifiers.brand` (string) The product's brand name as generally recognized by
  consumers. If no brand is available for a product, do not supply any value. Example: "shoe-brand"

- `order_lines.product_identifiers.category_path` (string) The product's category path as used in the
  merchant's webshop. Include the full and most detailed category and separate the segments with ' > '
  Example: "Shoes > Running"

- `order_lines.product_identifiers.global_trade_item_number` (string) The product's Global Trade Item Number
  (GTIN). Common types of GTIN are EAN, ISBN or UPC. Exclude dashes and spaces, where possible Example:
  "4912345678904"

- `order_lines.product_identifiers.manufacturer_part_number` (string) The product's Manufacturer Part Number
  (MPN), which - together with the brand - uniquely identifies a product. Only submit MPNs assigned by a
  manufacturer and use the most specific MPN possible Example: "AD6654412-334.22"

- `order_lines.product_identifiers.color` (string) Color to be shown to the end customer (max 64 characters).
  Example: "white"

- `order_lines.product_identifiers.size` (string) Size to be shown to the end customer (max 64 characters).
  Example: "small"

- `order_lines.product_url` (string) URL to the product in the merchantâ€™s webshop that can be later used in
  communications between Kustom and the customer. (max 1024 characters) Example: "https://.../AD6654412.html"

- `order_lines.quantity` (integer, required) Quantity of the order line item. Must be a non-negative number.
  Example: 1

- `order_lines.quantity_unit` (string) Unit used to describe the quantity, e.g. kg, pcs, etc. If defined the
  value has to be 1-8 characters. Example: "pcs"

- `order_lines.reference` (string) Client facing article number, SKU or similar. Max length is 256 characters.
  Example: "AD6654412"

- `order_lines.tax_rate` (integer) Tax rate of the order line. Non-negative value. The percentage value is
  represented with two implicit decimals. I.e 1900 = 19%. Example: 1900

- `order_lines.total_amount` (integer, required) Total amount of the order line. Must be defined as
  non-negative minor units. Includes tax and discount. Eg: 2500=25 euros Value = (quantity x unit_price) -
  total_discount_amount. (max value: 100000000) Example: 2500

- `order_lines.total_discount_amount` (integer) Non-negative minor units. Includes tax. Eg: 500=5 euros
  Example: 500

- `order_lines.total_tax_amount` (integer) Total tax amount of the order line. Must be within Â±1 of
  total_amount - total_amount 10000 / (10000 + tax_rate). Negative when type is discount. Example: 475

- `order_lines.type` (string) Type of the order line item. Enum: "physical", "discount", "shipping_fee",
  "sales_tax", "digital", "gift_card", "store_credit", "surcharge"

- `order_lines.unit_price` (integer, required) Price for a single unit of the order line. Non-negative minor
  units. Includes tax, excludes discount. (max value: 100000000) Example: 2500

- `order_lines.subscription` (object)

- `order_lines.subscription.name` (string, required) The name of the subscription product

- `order_lines.subscription.interval` (string, required) The cadence unit for this. Enum: "DAY", "WEEK",
  "MONTH", "YEAR"

- `order_lines.subscription.interval_count` (integer, required) The number of intervals

- `order_tax_amount` (integer) Non-negative, minor units. The total tax amount of the order.

- `purchase_currency` (string, required) ISO 4217 purchase currency. Example: "GBP"

- `shipping_address` (object)

- `shipping_address.attention` (string) â€˜Attn.â€™ - optional parameter. Example: "Attn"

- `shipping_address.city` (string) Customerâ€™s city. Example: "London"

- `shipping_address.country` (string) Customerâ€™s country. This value overrides the purchase country if they
  are different. Should follow the standard of ISO 3166 alpha-2. E.g. GB, US, DE, SE. Example: "GB"

- `shipping_address.email` (string) Customerâ€™s email address. Example: "test.sam@test.com"

- `shipping_address.family_name` (string) Customerâ€™s family name. Example: "Andersson"

- `shipping_address.given_name` (string) Customerâ€™s first name. Example: "Adam"

- `shipping_address.organization_name` (string) Organization name (if applicable). Only applicable for B2B
  customers.

- `shipping_address.phone` (string) Phone number. Preferably a mobile phone number. Example: "+44795465131"

- `shipping_address.postal_code` (string) Customerâ€™s postal code. Validation according to
  [Universal Postal Union addressing system](https://www.upu.int/en/activities/addressing/postal-addressing-systems-in-member-countries.html)
  E.g. 12345, W1G OPW. Example: "W1G 0PW"

- `shipping_address.region` (string) Customerâ€™s region or state - Mandatory for US and AU market.
  Validations according to ISO 3166-2 format, e.g. OH, NJ, etc. Example: "OH"

- `shipping_address.street_address` (string) Customerâ€™s street address.Validation according to
  [Universal Postal Union addressing system](https://www.upu.int/en/activities/addressing/postal-addressing-systems-in-member-countries.html).
  Regional formatting is required, as follows: UK/US/FR: 33 Cavendish Square Rest of EU: De Ruijterkade 7
  Example: "33 Cavendish Square"

- `shipping_address.street_address2` (string) Customerâ€™s street address. Second Line. Example: "Floor 22 /
  Flat 2"

- `shipping_address.title` (string) Customerâ€™s Title. Allowed values per country: UK - "Mr", "Ms" DE -
  "Herr", "Frau" AT: "Herr, "Frau" CH: de-CH: "Herr, "Frau" it-CH: "Sig.", "Sig.ra" fr-CH: "M", "Mme" BE:
  "Dhr.", "Mevr." NL: "Dhr.", "Mevr." Example: "Mr."

## Response 200 fields (application/json):

- `authorized_payment_method` (object)

- `authorized_payment_method.number_of_days` (integer)

- `authorized_payment_method.number_of_installments` (integer)

- `authorized_payment_method.type` (string, required) Enum: "invoice", "fixed_amount", "pix", "base_account",
  "deferred_interest", "direct_debit", "direct_bank_transfer", "b2b_invoice", "card", "slice_it_by_card",
  "pay_later_by_card", "fixed_sum_credit", "pay_by_card"

- `fraud_status` (string, required) Fraud status for the order. Either ACCEPTED or PENDING. If ACCEPTED, the
  order could be captured. If PENDING, please wait till you receive the notification from Kustom in the
  notification URL that the order has been approved. You can find additional information
  [here](https://docs.klarna.com/payments/after-payments/order-management/more-actions/pending-orders/).

- `order_id` (string, required) Unique order ID of the transaction. This ID will be used for all order
  management processes.

- `redirect_url` (string, required) URL to redirect the customer to after placing the order. This is a Kustom
  URL to which the merchant should redirect the customer to. Kustom will place a cookie in the customerâ€™s
  browser (if redirected) and redirect the customer back to the confirmation URL provided by the merchant.
  This is not a mandatory step but a recommended one to improve the returning customerâ€™s experience. It is
  a spontaneous step and does not harm the customerâ€™s experience. Example:
  "https://credit.klarna.com/v1/sessions/0b1d9815-165e-42e2-8867-35bc03789e00/redirect"

## Response 400 fields (application/json):

- `authorized_payment_method` (object)

- `authorized_payment_method.number_of_days` (integer)

- `authorized_payment_method.number_of_installments` (integer)

- `authorized_payment_method.type` (string, required) Enum: "invoice", "fixed_amount", "pix", "base_account",
  "deferred_interest", "direct_debit", "direct_bank_transfer", "b2b_invoice", "card", "slice_it_by_card",
  "pay_later_by_card", "fixed_sum_credit", "pay_by_card"

- `correlation_id` (string)

- `error_code` (string)

- `error_messages` (array)

- `fraud_status` (string)

- `reason` (string)

## Response 403 fields

## Response 404 fields

## Response 409 fields
