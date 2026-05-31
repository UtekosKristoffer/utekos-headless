# KLARNA CONVERSION FEATURES

## DEVELOPER GUIDELINES & UTILITIES

If the authorization is successful, you will receive the authorization_token from the client-side authorize()
response, in the authorization callback, or by getting the payment details from Klarna payments API.API

Here’s an example of a response from the client-side authorize() call.

```json
{
  "show_form": true,
  "approved": true,
  "finalize_required": false,
  "authorization_token": "1eddf502-f3a0-45bf-b1fd-f2e3a2758200",
  "session_id": "e4b81ca2-0aae-4c16-bcb2-29a0a088a35b",
  "collected_shipping_address": { // if collect_shipping_address was set to true
    "attention": "Attn",
    "city": "London",
    "country": "GB",
    "email": "test.sam@test.com",
    "family_name": "Andersson",
    "given_name": "Adam",
    "organization_name": "string",
    "phone": "+44795465131",
    },
    "merchant_reference1": "" // if provided
    "merchant_reference2": "" // if provided
}
```

**OpenAPI specification:** [Full JSON here](src/components/klarna/utils/paymentOpenAPSpecification.Ijson)

The payments API is used to create a session to offer Klarna's payment methods as part of your checkout. As
soon as the purchase is completed the order should be read and handled using the Order Management API.

**Note:** Examples provided in this section includes full payloads, including all supported fields, required
and optionals. In order to implement a best in class request, don't include customer details when initiating a
payment session - unless special use cases.

- Refer to `Initiate a paymen`t` section for further details.

**Read more:** on Klarna payments.

## Extra Merchant Data Schema

Explore the Extra Merchant Data (EMD) schema used to share additional information about the customer, the
merchant, and the purchase, enabling Klarna to perform accurate risk assessment, unlock new products, and
improve conversion.

Extra Merchant Data (EMD) is a structured data framework that lets you share additional information about the
customer, the merchant, and the purchase that is typically not available at checkout. This data enables Klarna
to complete an assertive risk assessment, unlock new promotional products, and improve conversion rates.

This schema describes every EMD package and its fields.

Include the relevant packages in the `attachment` property of the payload when getting authorization or
updating a session, using the content type `application/vnd.klarna.internal.emd-v2+json`.

air_reservation_details

Array of objects

Information about air travel reservations and passengers.

[

pnr

string

The passenger name record (PNR).  
Example: `Y2YWJD`

itinerary

Array of objects

The air travel itinerary details. One object represents one travel segment.

Array \[

departure

string

The 3-letter IATA airport code of the departure airport.  
Example: `AMS`

Length: min 3, max 3

departure_city

string

The city of departure.  
Example: `Amsterdam`

arrival

string

The 3-letter IATA airport code of the arrival airport.  
Example: `LHR`

Length: min 3, max 3

arrival_city

string

The city of arrival.  
Example: `London`

carrier

string

The airline's IATA code.  
Example: `KL`

Length: min 2, max 2

segment_price

integer

The price of the travel segment in minor units of the
[purchase currency](https://docs.klarna.com/api/payments/#operation/createOrder!path=purchase_currency&t=request).

Example:

•EUR 100,10 is `10010` in minor units.

•SEK 100 is `10000` in minor units.

•JPY 100 is `100` in minor units.

departure_date

string (date-time)

The departure date. The following ISO 8601 formats are validated by the pattern:

•`YYYY-MM-DDThh:mm` (e.g., '2023-11-24T15:00')

•`YYYY-MM-DDThh:mm:ss` (e.g., '2023-11-24T15:00:00')

•`YYYY-MM-DDThh:mmZ` (e.g., '2023-11-24T15:00Z')

•`YYYY-MM-DDThh:mm:ssZ` (e.g., '2023-11-24T15:00:00Z')

Note: Only 'Z' timezone notation is supported, not offset notation like '+01:00'. Ensure dates use valid month
(01-12), day (01-31), hour (00-23), minute (00-59), and second (00-59) values.

Pattern: `^[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9](:[0-5][0-9]){0,1}Z{0,1}$`

ticket_delivery_method

enum: pick_up | email | post | phone

The way in which the ticket is delivered. The following lowercase values are accepted:

•`pick_up` — The ticket is picked up in person.

•`email` — The ticket is sent by email.

•`post` — The ticket is sent by post.

•`phone` — The ticket is sent to a phone number.

ticket_delivery_recipient

string

The recipient to whom the ticket is delivered. The value depends on the selected `ticket_delivery_method`:

•For `email`, use the recipient's email address. Example: `john.doe@email.com`

•For `phone`, use the recipient's phone number.

•For `pick_up` and `post`, combine the recipient's first name and last name. Example: `John Doe`

passenger_id

array of integers

The array containing each passenger's index passed in the `passengers.id` object.  
Example:

•If there's 1 passenger, use `[1]`

•If there are 2 passengers, use `[1,2]`

•If there are 3 passengers, use `[1,2,3]`

class

string

The service class.  
Example: `economy`

\]

insurance

Array of objects

Information about insurance for the air travel.

Array \[

insurance_company

string

The name of the insurance company.  
Example: `AON`

insurance_type

enum: cancellation | travel | cancellation_travel | bankruptcy

The scope of the insurance coverage. The following lowercase values are accepted:

•`cancellation` — Coverage for cancellation of any services during the travel

•`travel` — Coverage for incident-related expenses that occur during the travel

•`cancellation_travel` — Coverage for the cancellation of the whole travel

•`bankruptcy` — Coverage in case of the airline's bankruptcy

insurance_price

integer

The price of insurance in minor units of the
[purchase currency](https://docs.klarna.com/api/payments/#operation/createOrder!path=purchase_currency&t=request).  
Example:

•EUR 20 is `2000` in minor units.

•SEK 200 is `20000` in minor units.

•JPY 10 is `10` in minor units.

\]

passengers

Array of objects

Information about the passengers.

Array \[

id

integer

The passenger's index number. The value must be one of those specified in the `itinerary.passenger_id` array.

title

enum: mr | mrs | ms | s The title used before the passenger's name.  
The following lowercase values are accepted:

•`mr` — Mr.

•`mrs` — Mrs.

•`ms` — Ms.

For passengers under 12 years of age, leave blank.

first_name

string

The passenger's first name.  
Example: `John`

last_name

string

The passenger's last name.  
Example: `Doe`

\]

affiliate_name

string

The name of the referring partner. If there's no referring partner, leave blank.  
Example: `Booking.com`

\]
