# Get details about a session

Use the Klarna payments API to check the details of a session at any time after it has been created, to get.

This will return all data that has been collected during the session.

To see the details of the session created when initiating a payment, send a `GET` request with an empty
request body to the \[ \{apiUrl}]`{apiUrl}/payments/v1/sessions/{session_id}` endpoint. Provide the id of the
session you want to revise as a `session_id` path parameter.

**\[INFO]**

We only share customer details after authorizing the session.

### Success response

In response to your call, you receive all the data collected throughout the payment process associated with
this session.

```json
Description:
successful operation

Headers:
Status Code: 200
Content-Type: application/json

{
"billing_address": {
"attention": "string",
"city": "Beverly Hills",
"country": "US",
"email": "john@doe.com",
"family_name": "Doe",
"given_name": "John",
"organization_name": "string",
"phone": "333444555",
"postal_code": "90210",
"region": "CA",
"street_address": "Lombard St 10",
"street_address2": "Apt 214",
"title": "Mr"
},
"client_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJzZXNzaW9uX2lkIiA6ICIw",
"customer": {
"date_of_birth": "string",
"gender": "string",
"last_four_ssn": "string",
"national_identification_number": "string",
"organization_entity_type": "LIMITED_COMPANY",
"organization_registration_id": "string",
"title": "string",
"type": "string",
"vat_id": "string"
},
"expires_at": "2038-01-19T03:14:07.000Z",
"locale": "en-US",
"merchant_urls": {
"confirmation": "string",
"notification": "string",
"push": "string"
},
"order_amount": 0,
"order_lines": [
{
"image_url": "https://www.exampleobjects.com/logo.png",
"merchant_data": "{\"marketplace_seller_info\":[{\"product_category\":\"Women's Fashion\",\"product_name\":\"Women Sweatshirt\"}]}",
"name": "Battery Power Pack",
"product_identifiers": {
"brand": "Intel",
"category_path": "Electronics Store > Computers & Tablets > Desktops",
"global_trade_item_number": "735858293167",
"manufacturer_part_number": "BOXNUC5CPYH"
},
"product_url": "https://www.estore.com/products/f2a8d7e34",
"quantity": 0,
"quantity_unit": "kg",
"reference": "19-402-USA",
"tax_rate": 0,
"total_amount": 0,
"total_discount_amount": 0,
"total_tax_amount": 0,
"type": "physical",
"unit_price": 0
}
],
"order_tax_amount": 0,
"payment_method_categories": [
{
"asset_urls": {},
"identifier": "klarna",
"name": "Pay with Klarna"
}
],
"purchase_country": "US",
"purchase_currency": "USD",
"shipping_address": {
"attention": "string",
"city": "Beverly Hills",
"country": "US",
"email": "john@doe.com",
"family_name": "Doe",
"given_name": "John",
"organization_name": "string",
"phone": "333444555",
"postal_code": "90210",
"region": "CA",
"street_address": "Lombard St 10",
"street_address2": "Apt 214",
"title": "Mr"
},
"status": "complete"
}

```

Sample of a successful response to check the session details.

### Error response

If the session id in your request is invalid, you get an error response. Ensure the `session_id` value you
provided is correctly formatted and corresponds to a session that has not expired.

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "ERROR_CODE",
  "error_messages": ["ERROR_MESSAGE"]
}
```

Sample of an error to check the session details.

**\[INFO]**

You can use the correlation\\\_id value to troubleshoot the call in the merchant portal logs app. ⚛️React Not
Detected React is not detected on this page. Please ensure you're visiting a React application.
