# How to send EMD

Learn about all the additional information about your customer you can send.

Depending on the merchant segment and/or the services available to consumers, Klarna may require additional
information regarding the customer, the merchant and/or the purchase. This information, referred to as extra
merchant data (EMD), consist of data that is typically not available at the checkout, but which enables Klarna
to complete an assertive risk assessment, enable new promotional products and improve conversion rates for a
boost in performance.

While in some scenarios sharing EMD is optional and only connected to the enablement of new solutions
(depending on the business category or the type of goods sold), certain segments or use cases will require you
to provide Klarna with specific EMD packages.

It is _mandatory_ for you as a merchant to provide Klarna with the required EMD data points if you operate
within the following segments or if any of these use cases apply to you:

| **Segment and other use cases**      | **EMD required**                                                                                                                                                                                           | **Details**                                                                                                                                                                                                                                                                     |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marketplace                          | \* marketplace_seller_info                                                                                                                                                                                 | when enabling marketplace services and creating an order for a sub-seller, you are required to shared information about the sub-seller including the category of the products being sold and the id of the seller.                                                              |
| Travel                               | \* air_reservation_details \* train_reservation_details \* bus_reservation_details \* ferry_reservation_details \* car_rental_reservation_details \* hotel_reservation_details \* trip_reservation_details | if you are selling services associated to travel segment, you are required to provide information about the passengers and the itinerary to be booked via the applicable EMD for the service provided.                                                                          |
| Ticketing                            | \* event                                                                                                                                                                                                   | if you are selling ticket to an event, you have to provide information about the event.                                                                                                                                                                                         |
| Subscriptions and On-Demand          | \* customer_tokens                                                                                                                                                                                         | if you are selling subscriptions or enabling recurring payments, you are required to provide [subscription object and customer info information](https://docs.klarna.com/payments/web-payments/integrate-with-klarna-payments/tokenized-payments/subscriptions-and-on-demand/). |
| Selling in physical store            | \* in_store_payment                                                                                                                                                                                        | for any segment, if the purchase is done in a physical store you are required to send the EMD to allow appropriated risk analysis of the transaction and properly identify the location of the purchase.                                                                        |
| Registered checkout and Klarna deals | \* customer_account_info \* payment_history_full \* payment_history_simple                                                                                                                                 | in the case you enable consumers to register to your site, EMD will allow us to identify your returning consumers and enhance the services offered even if they have no previous history paying with Klarna as well as unlock targeted campaigns.                               |
| Pick up in store                     | \* other_delivery_address                                                                                                                                                                                  | for any segment, if the consumer is allowed to buy online and pick up the product in a physical store, then you are required to send the EMD to allow appropriated risk analysis of the transaction.                                                                            |

Additionally to these use cases, depending on the risk evaluation during the merchant onboarding process, we
might request additional information to be provided through a specific EMD appendix.

Find out more about the different data fields for each package by checking the
[attachments specification](https://docs.klarna.com/api/attachment-schema/#attachment-schema).

You need to include the extra merchant data in an attachment property of the payload when \[ getting
authorization] or \[ updating a session].

```mermaid
sequenceDiagram
autonumber
participant C as Consumer
participant M as Merchant
participant KAPI as Klarna API
participant KJS as Klarna.js

C->>M:Nagivate to
checkout page

M->>KAPI: Create
 Klarna Payment session
Note over M, KAPI: Sending "Extra Merchant Data" in this call might make the implementation
 not GDPR compliant for the EU market (NO CUSTOMER DETAILS)

KAPI->>M: Klarna payment
session response

M->>KJS: Initialize
klarna.js

M ->> KJS: Load the container

C->>M: Select Klarna
in Payment selector and
 clicks 'Pay'
M->>KJS: Execute
 Authorize call
Note over M, KJS: Preferred call to send the "Extra Merchant Data"

KJS->>M: Provide authorization token (valid for 60 minutes)

M->>KAPI: Create Order POST {apiUrl}/payments/v1/authorizations/{authorizationToken}/order
Note over M, KAPI: "Extra Merchant Data" is not validated at this stage
KAPI->>M: Provide  order_id and redirect_url
```

Add the relevant data based on the specification and your product vertical. See use cases in the following
section to find examples per each vertical.

To know which product vertical is right for you,
[contact merchant support](https://www.klarna.com/merchant-support/).

## Use Cases

### Travel

For travel segment, EMD is a mandatory requirement and merchants should send one or more of the following
packages: `air_reservation_details`, `bus_reservation_details`, `train_reservation_details`,
`ferry_reservation_details` and/or `hotel_reservation_details`.

In exceptional cases, due to the business model nature of close “trip packages” and/or “trip based on
registered travellers”, in this scenario you may not be able to provide all data requested in the above
packages, in case EMD attachment `trip_reservation_details` will enable you to share available information.

#### air_reservation_details

This Package should be included as part of the integration when the transactions includes air reservations.

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"air_reservation_details\":[{\"pnr\":\"Y2YWJD\",\"itinerary\":[{\"departure\":\"AMS\",\"departure_city\":\"Amsterdam\",\"arrival\":\"LHR\",\"arrival_city\":\"London\",\"carrier\":\"KL\",\"segment_price\":2000,\"departure_date\":\"2022-08-06T19:50:00Z\",\"ticket_delivery_method\":\"email\",\"ticket_delivery_recipient\":\"john.doe@email.com\",\"passenger_id\":[1,2,3],\"class\":\"business\"},{\"departure\":\"LHR\",\"departure_city\":\"London\",\"arrival\":\"AMS\",\"arrival_city\":\"Amsterdam\",\"carrier\":\"KL\",\"segment_price\":2000,\"departure_date\":\"2022-08-20T16:45:00Z\",\"ticket_delivery_method\":\"email\",\"ticket_delivery_recipient\":\"john.doe@email.com\",\"passenger_id\":[1,2,3],\"class\":\"business\"}],\"insurance\":[{\"insurance_company\":\"AON\",\"insurance_type\":\"cancellation\",\"insurance_price\":200}],\"passengers\":[{\"id\":1,\"title\":\"mr\",\"first_name\":\"John\",\"last_name\":\"Doe\"},{\"id\":2,\"title\":\"mrs\",\"first_name\":\"Jane\",\"last_name\":\"Doe\"},{\"id\":3,\"title\":\"\",\"first_name\":\"Josh\",\"last_name\":\"Doe\"}],\"affiliate_name\":\"Booking.com\"}]}"
}

```

#### bus_reservation_details

This Package should be included as part of the integration when the transactions includes bus reservations.

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"bus_reservation_details\":[{\"pnr\":\"121r2sx121\",\"itinerary\":[{\"departure_city\":\"Amsterdam\",\"arrival_city\":\"London\",\"carrier\":\"Eurolines\",\"segment_price\":2000,\"departure_date\":\"2022-08-06T19:50:00Z\",\"ticket_delivery_method\":\"email\",\"ticket_delivery_recipient\":\"john.doe@email.com\",\"passenger_id\":[1,2,3],\"class\":\"1st\"},{\"departure_city\":\"London\",\"arrival_city\":\"Amsterdam\",\"carrier\":\"Eurolines\",\"segment_price\":2000,\"departure_date\":\"2022-08-20T16:45:00Z\",\"ticket_delivery_method\":\"email\",\"ticket_delivery_recipient\":\"john.doe@email.com\",\"passenger_id\":[1,2,3],\"class\":\"1st\"}],\"insurance\":[{\"insurance_company\":\"AON\",\"insurance_type\":\"cancellation\",\"insurance_price\":200}],\"passengers\":[{\"id\":1,\"title\":\"mr\",\"first_name\":\"John\",\"last_name\":\"Doe\"},{\"id\":2,\"title\":\"mrs\",\"first_name\":\"Jane\",\"last_name\":\"Doe\"},{\"id\":3,\"title\":\"\",\"first_name\":\"Josh\",\"last_name\":\"Doe\"}],\"affiliate_name\":\"eurolines.de\"}]}"
}

```

#### train_reservation_details

This Package should be included as part of the integration when the transactions includes train reservations.

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"train_reservation_details\":[{\"pnr\":\"121r2sx121\",\"itinerary\":[{\"departure_city\":\"Amsterdam\",\"arrival_city\":\"London\",\"carrier\":\"Eurostar\",\"segment_price\":2000,\"departure_date\":\"2022-08-06T19:50:00Z\",\"ticket_delivery_method\":\"email\",\"ticket_delivery_recipient\":\"john.doe@email.com\",\"passenger_id\":[1,2,3],\"class\":\"1st\"},{\"departure_city\":\"London\",\"arrival_city\":\"Amsterdam\",\"carrier\":\"Eurostar\",\"segment_price\":2000,\"departure_date\":\"2022-08-20T16:45:00Z\",\"ticket_delivery_method\":\"email\",\"ticket_delivery_recipient\":\"john.doe@email.com\",\"passenger_id\":[1,2,3],\"class\":\"1st\"}],\"insurance\":[{\"insurance_company\":\"AON\",\"insurance_type\":\"cancellation\",\"insurance_price\":200}],\"passengers\":[{\"id\":1,\"title\":\"mr\",\"first_name\":\"John\",\"last_name\":\"Doe\"},{\"id\":2,\"title\":\"mrs\",\"first_name\":\"Jane\",\"last_name\":\"Doe\"},{\"id\":3,\"title\":\"\",\"first_name\":\"Josh\",\"last_name\":\"Doe\"}],\"affiliate_name\":\"eurostar.com\"}]}"
}

```

#### ferry_reservation_details

This Package should be included as part of the integration when the transactions includes ferry reservations.

```json
"attachment": {
"content_type": "application/vnd.klarna.internal.emd-v2+json",
"body": "{\"ferry_reservation_details\":[{\"pnr\":\"121r2sx121\",\"itinerary\":[{\"departure_city\":\"Calais\",\"arrival_city\":\"Dover\",\"carrier\":\"P&O\",\"segment_price\":2000,\"departure_date\":\"2022-08-06T19:50:00Z\",\"ticket_delivery_method\":\"email\",\"ticket_delivery_recipient\":\"john.doe@email.com\",\"passenger_id\":[1,2,3],\"class\":\"1st\"},{\"departure_city\":\"Dover\",\"arrival_city\":\"Calais\",\"carrier\":\"P&O\",\"segment_price\":2000,\"departure_date\":\"2022-08-20T16:45:00Z\",\"ticket_delivery_method\":\"email\",\"ticket_delivery_recipient\":\"john.doe@email.com\",\"passenger_id\":[1,2,3],\"class\":\"1st\"}],\"insurance\":[{\"insurance_company\":\"AON\",\"insurance_type\":\"cancellation\",\"insurance_price\":200}],\"passengers\":[{\"id\":1,\"title\":\"mr\",\"first_name\":\"John\",\"last_name\":\"Doe\"},{\"id\":2,\"title\":\"mrs\",\"first_name\":\"Jane\",\"last_name\":\"Doe\"},{\"id\":3,\"title\":\"\",\"first_name\":\"Josh\",\"last_name\":\"Doe\"}],\"affiliate_name\":\"poferries.com\"}]}"
}

```

#### car_rental_reservation_details

This Package should be included as part of the integration when the transactions included car rental
reservations.

```json
"attachment": {
"content_type": "application/vnd.klarna.internal.emd-v2+json",
"body": "{\"car_rental_reservation_details\": [{\"pnr\": \"3411qsxqed23123\",\"car_rental_itinerary\": [{\"rental_company\": \"Hertz\",\"drivers_id\": [1,2],\"pick_up_location\": {\"street_address\": \"Aankomstpassage Amsterdam (Schiphol)\",\"postal_code\": \"1118 AA\",\"city\": \"Schiphol\",\"country\": \"NL\"},\"start_time\": \"2022-08-20T16:45:00Z\",\"drop_off_location\": {\"street_address\": \"Aankomstpassage Amsterdam (Schiphol)\",\"postal_code\": \"1118 AA\",\"city\": \"Schiphol\",\"country\": \"NL\"},\"end_time\": \"2022-08-25T16:45:00Z\",\"car_price\": 700,\"class\": \"economy\"}],\"insurance\": [{\"insurance_company\":\"AON\",\"insurance_type\":\"cancellation\",\"insurance_price\":2000}],\"drivers\": [{\"id\":1,\"title\":\"mr\",\"first_name\":\"John\",\"last_name\":\"Doe\"},{\"id\":2,\"title\":\"mrs\",\"first_name\":\"Jane\",\"last_name\":\"Doe\"}],\"affiliate_name\": \"hertz.com\"}]}"
}

```

#### hotel_reservation_details

This Package should be included as part of the integration when the transactions included hotel reservations.

```json
"attachment": {
"content_type": "application/vnd.klarna.internal.emd-v2+json",
"body": "{\"hotel_reservation_details\":[{\"pnr\":\"20qsx2121\",\"hotel_itinerary\": [{\"hotel_name\": \"Hotel ltd.\",\"address\": {\"street_address\":\"New Burlington St 10\",\"postal_code\": \"W1B 1JA\",\"city\": \"London\",\"country\": \"GB\"},\"start_time\": \"2022-08-06T19:50:00Z\",\"end_time\": \"2022-08-20T22:00:00Z\",\"number_of_rooms\": 1,\"ticket_delivery_method\": \"email\",\"ticket_delivery_recipient\": \"john.doe@email.com\",\"hotel_price\": 23050,\"class\":\"Presidential Suite\",\"passenger_id\": [1,2]}],\"insurance\":[{\"insurance_company\":\"AON\",\"insurance_type\":\"cancellation\",\"insurance_price\":200}],\"passengers\":[{\"id\": 1,\"title\":\"mr\",\"first_name\": \"John\",\"last_name\": \"Doe\"},{\"id\": 2,\"title\":\"mrs\",\"first_name\": \"Jane\",\"last_name\": \"Doe\"}],\"affiliate_name\":\"Hotels.com\"}]}"
}

```

#### trip_reservation_details

Information about trip reservations that include multiple services, for example, flight reservation, hotel
room reservation, and train reservation, where information about the services isn't available at the time of
booking.

**\[WARNING]**

\*\*This package does not replace \`air_reservation_details\`, \`hotel_reservation_details\` nor any other
travel related package\*\*. It should only be used when you are not able provide detailed information for the
services included.

```json
"attachment": {
"content_type": "application/vnd.klarna.internal.emd-v2+json",
"body": "{\"trip_reservation_details\":[{\"trip_itinerary\":{\"initial_country\":\"France\",\"initial_city\":\"Calais\",\"final_country\":\"England\",\"final_city\":\"Dover\",\"start_time\":\"2022-08-06T19:50:00Z\",\"end_time\":\"2022-08-15T19:50:00Z\"},\"trip_passengers\":[{\"id\":1,\"first_name\":\"John\",\"last_name\":\"Doe\",\"birth_date\":\"1980-05-10\",\"email\":\"johndoe@email.com\",\"unique_id\":\"AYY12345\",\"main_passenger\":\"true\"},{\"id\":2,\"title\":\"mrs\",\"first_name\":\"Jane\",\"last_name\":\"Doe\",\"birth_date\":\"1982-10-05\",\"email\":\"janedoe@email.com\",\"unique_id\":\"AYY98765\",\"main_passenger\":\"false\"}],\"min_age\":\"21\",\"max_age\":\"60\",\"services\":{\"travel_insurance\":\"true\",\"hotel\":\"true\",\"flight\":\"true\",\"cancelation_service\":\"true\",\"shared_room\":\"false\"},\"affiliate_name\":\"WEROAD\"}]}"
}

```

### Marketplace

#### marketplace_seller_info

This Package allows Klarna to identify transactions that were generated via a marketplace and includes
information for risk evaluation of the corresponding sellers.

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"marketplace_seller_info\":[{\"sub_merchant_id\":\"1234567890qwertyuiopasdfg\",\"sub_merchant_name\":\"Marketbrick Ltd.\",\"sub_merchant_postal_code\":\"11010\",\"product_category\":\"Computers\",\"product_name\":\"Acer 5400\",\"account_registration_date\":\"2020-06-10T12:02:21Z\",\"account_last_modified\":{\"password\":\"2020-06-10T12:02:21Z\",\"email\":\"2020-06-10T12:02:21Z\",\"listing\":\"2020-06-10T12:02:21Z\",\"login\":\"2020-06-10T12:02:21Z\",\"address\":\"2020-06-10T12:02:21Z\"},\"seller_rating\":4.5,\"number_of_trades\":34,\"volume_of_trades\":4500}]}"
}

```

### Registered checkout and Klarna deals

#### customer_account_info, payment_history_full and payment_history_simple

Allow Klarna to identify users that previously created an account in your store website and differentiate from
shoppers using\* Gues\*t checkout flows.

The following example shows how to send EMD including `costumer_account_info` and `payment_history_full`:

```json
"attachment":{
"content_type":"application/vnd.klarna.internal.emd-v2+json",
"body":"{\"payment_history_full\":[{\"unique_account_identifier\":\"1234567890qwertyuiopasdfg\",\"number_paid_purchases\":5,\"payment_option\": \"other\",\"total_amount_paid_purchases\":412134,\"date_of_first_paid_purchase\":\"2021-06-10T12:10:43Z\",\"date_of_last_paid_purchase\":\"2022-05-11T12:43:56Z\"},{\"unique_account_identifier\":\"1234567890qwertyuiopasdfg\",\"number_paid_purchases\":30,\"payment_option\": \"non klarna credit\",\"total_amount_paid_purchases\":123210,\"date_of_first_paid_purchase\":\"2022-01-02T10:23:10Z\",\"date_of_last_paid_purchase\":\"2022-11-09T16:52:41Z\"}],\"customer_account_info\":[{\"unique_account_identifier\":\"1234567890qwertyuiopasdfg\",\"account_registration_date\":\"2021-06-10T12:02:21Z\",\"account_last_modified\":\"2021-07-10T12:02:21Z\"}]}"
}

```

**\[INFO]**

In case that not all properties are available to share \`payment_history_full\` it is recommended to implement
\`payment_history_simple\` package instead.

`payment_history_simple` *exampl*e:

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"payment_history_simple\":[{\"unique_account_identifier\":\"1234567890qwertyuiopasdfg\",\"paid_before\":true}]}"
}

```

### Ticketing

#### event

This Package should be included as part of the integration when the transactions included tickets for events
such as concerts, amusement parks, etc.

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"event\": [{\"event_name\": \"Lady Gaga, the Chromatica Ball\",\"event_company\": \"Ticketmaster\",\"genre_of_event\": \"Music concert\",\"arena_name\": \"Gelredome\",\"arena_location\": {\"street_address\": \"Batavierenweg 25\",\"postal_code\": \"6841 HN\",\"city\": \"Arnhem\",\"country\": \"NL\"},\"start_time\": \"2023-07-26T20:45:00Z\",\"end_time\": \"2023-07-26T22:45:00Z\",\"access_controlled_venue\": true,\"ticket_delivery_method\": \"email\",\"ticket_delivery_recipient\": \"john@email.com\",\"affiliate_name\": \"Ticketmaster\"}]}"
}

```

### Subscriptions and On-Demand

#### customer_tokens

This Package should be included as part of the integration when the transactions included subscriptions for
customers.

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"customer_tokens\":[{\"avg_order_value\":10000, \"avg_purchase_frequency_count\":1, \"avg_purchase_frequency_interval\":\"MONTH\", \"min_order_value\":10000, \"max_order_value\":10000}]}"
}

```

### Vouchers and Digital Products

#### voucher

This Package should be included as part of the integration when the transactions includes vouchers or digital
products

**Voucher example**

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"voucher\":[{\"voucher_name\":\"The View from The Shard & Glass of Champagne for Two\",\"voucher_company\":\"The Shard\",\"start_time\":\"2024-08-23T23:00:00Z\",\"end_time\":\"2024-11-24T23:59:59Z\",\"affiliate_name\":\"Virgin Experience\"}]}"
}

```

**Digital Product example**

```json
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"voucher\":[{\"voucher_name\":\"Google Analytics 101\",\"voucher_company\":\"The School\",\"start_time\":\"2024-08-23T23:00:00Z\",\"end_time\":\"2024-11-24T23:59:59Z\",\"affiliate_name\":\"Business Education\"}]}"
}

```

### Selling in physical store

#### in_store_payment

This package should be included as part of an integration when the purchase is done at a physical store.

```json
"attachment": {
 "content_type": "application/vnd.klarna.internal.emd-v2+json",
 "body": "{\"in_store_payment\": [{\"store_info\": {\"merchant_store_id\": \"LONDON12\",\"store_terminal_id\":\"AD12342D\",\"store_address\": {\"street_address\":\"New Burlington St 10\",\"postal_code\": \"W1B 1JA\",\"city\": \"London\",\"country\": \"GB\"}}}]}"
}

```

### Pick up in store

#### other_delivery_address

This package should be included as part of an integration when delivery will be done on an alternative
non-residential address such as pick-up in a store or in a pick-up point.

```json
"attachment": {
"content_type": "application/vnd.klarna.internal.emd-v2+json",
"body": "{\"other_delivery_address\":[{\"shipping_method\":\"store pick-up\",\"shipping_type\":\"express\",\"first_name\":\"Test\",\"last_name\":\"Person\",\"street_address\":\"Rue La Fayette\",\"street_number\":\"40\",\"postal_code\":\"75009\",\"city\":\"Paris\",\"country\":\"FR\"}]}"
}

```

**\[SUCCESS]**

It is not required to duplicate the address information, include only the store/pick-up point address in the
API object \`shipping_address\` and submit EMD attachment \`other_delivery_address\` detailing
\`shipping_method\`

See the alternatives below:

**Address on shipping_address only**

```json
Klarna.Payments.authorize(
  {},
  {
    …
    "shipping_address":{
      "email":"klarna.test@klarna.com",
      "given_name":"Klarna",
      "family_name":"Test",
      "phone":"+16145555555",
      "street_address":"100 N. High Street",
      "street_address2":"Suite 300",
      "city":"Columbus",
      "region":"OH",
      "postal_code":"43215",
      "country":"US"
    }
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"other_delivery_address\":[{\"shipping_method\":\"store pick-up\",\"shipping_type\":\"express\"}]}"
}

```

**Address on shipping_address and EMD**

```json
Klarna.Payments.authorize(
  {},
  {
    …
    "shipping_address":{
      "email":"klarna.test@klarna.com",
      "given_name":"Klarna",
      "family_name":"Test",
      "phone":"+16145555555",
      "street_address":"100 N. High Street",
      "street_address2":"Suite 300",
      "city":"Columbus",
      "region":"OH",
      "postal_code":"43215",
      "country":"US"
    }
"attachment": {
  "content_type": "application/vnd.klarna.internal.emd-v2+json",
  "body": "{\"other_delivery_address\":[{\"shipping_method\":\"store pick-up\",\"shipping_type\":\"express\",\"first_name\":\"Klarna\",\"last_name\":\"Test\",\"street_address\":\"N. High Street\",\"street_number\":\"100\",\"postal_code\":\"43215\",\"city\":\"Columbus\",\"country\":\"US\"}]}"
}

```

**\[ERROR]**

If the you will be sending the address in EMD attachment this should not be different than the
`shipping_address` API object.
