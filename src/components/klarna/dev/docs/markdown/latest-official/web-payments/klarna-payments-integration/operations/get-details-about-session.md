# Get details about a session

**GET:** "https://api.klarna.com/payments/v1/sessions/{session_id}"

Use this API call to get a Klarna Payments session. You can read the Klarna Payments session at any time after
it has been created, to get information about it. This will return all data that has been collected during the
session. Read more on Read an existing payment session.

**200:**

```json
{
  "acquiring_channel": "ECOMMERCE",
  "attachment": {
    "body": "{\"customer_account_info\":[{\"unique_account_identifier\":\"test@gmail.com\",\"account_registration_date\":\"2017-02-13T10:49:20Z\",\"account_last_modified\":\"2019-03-13T11:45:27Z\"}]}",
    "content_type": "application/vnd.klarna.internal.emd-v2+json"
  },
  "authorization_token": "string",
  "billing_address": {
    "attention": "Attn",
    "city": "New York",
    "country": "US",
    "email": "test.sam@test.com",
    "family_name": "Andersson",
    "given_name": "Adam",
    "organization_name": "string",
    "phone": "+13106683312",
    "postal_code": "10024-3941",
    "region": "US-NY",
    "street_address": "509 Amsterdam Ave",
    "street_address2": "Floor 22 / Flat 2",
    "title": "Mr."
  },
  "client_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJzZXNzaW9uX2lkIiA6ICIw",
  "custom_payment_method_ids": ["string"],
  "customer": {
    "date_of_birth": "1978-12-31",
    "gender": "male",
    "organization_entity_type": "LIMITED_COMPANY",
    "organization_registration_id": "string",
    "title": "Mr.",
    "type": "organization",
    "vat_id": "string"
  },
  "design": "string",
  "expires_at": "2038-01-19T03:14:07.000Z",
  "locale": "en-US",
  "merchant_data": "{\"order_specific\":[{\"substore\":\"Women's Fashion\",\"product_name\":\"Women Sweatshirt\"}]}",
  "merchant_reference1": "ON4711",
  "merchant_reference2": "hdt53h-zdgg6-hdaff2",
  "merchant_urls": {
    "confirmation": "https://www.example-url.com/confirmation",
    "notification": "https://www.example-url.com/notification",
    "push": "https://www.example-url.com/push",
    "authorization": "https://www.example-url.com/authorization",
    "app_return_url": "appName://KlarnaPayment"
  },
  "options": {
    "color_border": "#FF9900",
    "color_border_selected": "#FF9900",
    "color_details": "#FF9900",
    "color_text": "#FF9900",
    "radius_border": "5px"
  },
  "order_amount": 2000,
  "order_lines": [
    {
      "image_url": "https://www.exampleobjects.com/logo.png",
      "merchant_data": "{\"customer_account_info\":[{\"unique_account_identifier\":\"test@gmail.com\",\"account_registration_date\":\"2017-02-13T10:49:20Z\",\"account_last_modified\":\"2019-03-13T11:45:27Z\"}]}",
      "name": "Running shoe",
      "product_identifiers": {
        "brand": "shoe-brand",
        "category_path": "Shoes > Running",
        "global_trade_item_number": "4912345678904",
        "manufacturer_part_number": "AD6654412-334.22",
        "color": "white",
        "size": "small"
      },
      "product_url": "https://.../AD6654412.html",
      "quantity": 1,
      "quantity_unit": "pcs",
      "reference": "AD6654412",
      "tax_rate": 2000,
      "total_amount": 2000,
      "total_discount_amount": 500,
      "total_tax_amount": 333,
      "type": "physical",
      "unit_price": 2500,
      "subscription": {
        "name": "string",
        "interval": "DAY",
        "interval_count": 1
      }
    }
  ],
  "order_tax_amount": 333,
  "payment_method_categories": [
    {
      "asset_urls": {
        "descriptive": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
        "standard": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
      },
      "identifier": "klarna",
      "name": "Pay with Klarna"
    }
  ],
  "purchase_country": "US",
  "purchase_currency": "USD",
  "shipping_address": {
    "attention": "Attn",
    "city": "New York",
    "country": "US",
    "email": "test.sam@test.com",
    "family_name": "Andersson",
    "given_name": "Adam",
    "organization_name": "string",
    "phone": "+13106683312",
    "postal_code": "10024-3941",
    "region": "US-NY",
    "street_address": "509 Amsterdam Ave",
    "street_address2": "Floor 22 / Flat 2",
    "title": "Mr."
  },
  "status": "complete",
  "intent": "buy"
}
```

**403:** You were not authorized to execute this operation.

**404:** The session does not exist.
