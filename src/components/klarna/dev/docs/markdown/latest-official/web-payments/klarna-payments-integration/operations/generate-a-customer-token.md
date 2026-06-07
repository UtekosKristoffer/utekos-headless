# Generate A Customer Token

Use this API call to create a Klarna Customer Token.

After having obtained an `authorization_token` for a successful authorization, this can be used to create a
purchase token instead of placing the order. Creating a Klarna Customer Token results in Klarna storing
customer and payment method details. Read more on Generate a customer token.

**PATH PARAMETERS:**

authorizationToken

- **required**
- Type: string

Request Body schema: application/json

```json
{
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
  "customer": {
    "customer_token": "36115bcd-708d-4712-8c06-976ac5817e18",
    "date_of_birth": "1978-12-31",
    "gender": "male",
    "last_four_ssn": "string",
    "national_identification_number": "string",
    "organization_entity_type": "LIMITED_COMPANY",
    "organization_registration_id": "string",
    "title": "Mr.",
    "type": "organization",
    "vat_id": "string"
  },
  "description": "string",
  "intended_use": "SUBSCRIPTION",
  "locale": "en-US",
  "purchase_country": "US",
  "purchase_currency": "USD"
}
```

---

### Response

```json
{
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
  "customer": {
    "date_of_birth": "1978-12-31",
    "gender": "male"
  },
  "payment_method_reference": "0b1d9815-165e-42e2-8867-35bc03789e00",
  "redirect_url": "https://credit.klarna.com/v1/sessions/0b1d9815-165e-42e2-8867-35bc03789e00/redirect",
  "token_id": "0b1d9815-165e-42e2-8867-35bc03789e00"
}
```
