# Using the API

## Overview

Once you have completed the prerequisites on the Get Started page, use this page
to learn how to send events and use the Test Events tool. Once you've sent an
event, verify your setup.

### API Version Information

The Conversions API is based on Facebook's Marketing API, which was built on top
of our Graph API. Marketing and Graph APIs have different version deprecation
schedules. Our release cycle is aligned with the Graph API, so **every version
is supported for at least two years**. This exception is only valid for the
Conversions API.

### Required Parameters

**Conversions API: Overview Parameters**

Web, app, and physical store events shared using the Conversions API require
specific parameters. By using the Conversions API, you agree that the
`action_source` parameter is accurate to the best of your knowledge. The list of
required parameters is available here.

---

## Send Requests

To send new events, make a POST request to this API's `/events` edge from this
path:

```
https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}
```

When you post to this edge, Facebook creates new server events.

### Example: cURL Request

```bash
curl -X POST \
    -F 'data=[
             {
                 "event_name": "Purchase",
                 "event_time": 1761263694,
                 "user_data": {
                     "em": [
                         "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"
                     ],
                     "ph": [
                         "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
                         "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
                     ],
                     "client_ip_address": "123.123.123.123",
                     "client_user_agent": "$CLIENT_USER_AGENT",
                     "fbc": "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
                     "fbp": "fb.1.1558571054389.1098115397"
                 },
                 "custom_data": {
                     "currency": "usd",
                     "value": 123.45,
                     "contents": [
                         {
                             "id": "product123",
                             "quantity": 1,
                             "delivery_category": "home_delivery"
                         }
                     ]
                 },
                 "event_source_url": "http://jaspers-market.com/product/123",
                 "action_source": "website"
             }
         ]' \
    -F 'access_token=<ACCESS_TOKEN>' \
    https://graph.facebook.com/v24.0/<PIXEL_ID>/events
```

**Available SDKs:**

- cURL
- Node.js SDK
- PHP SDK
- Python SDK
- Java SDK
- Ruby SDK

> **Tip:** Open the example in Graph API Explorer to test interactively.

### Access Token

Attach your generated secure access token using the `access_token` query
parameter to the request. You can also use Graph API Explorer to POST to the
`/<pixel_id>/events` endpoint.

### Example Request Body

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1633552688,
      "event_id": "event.id.123",
      "event_source_url": "http://jaspers-market.com/product/123",
      "action_source": "website",
      "user_data": {
        "client_ip_address": "192.19.9.9",
        "client_user_agent": "test ua",
        "em": [
          "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"
        ],
        "ph": [
          "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
          "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6"
        ],
        "fbc": "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
        "fbp": "fb.1.1558571054389.1098115397"
      },
      "custom_data": {
        "value": 100.2,
        "currency": "USD",
        "content_ids": ["product.id.123"],
        "content_type": "product"
      },
      "opt_out": false
    },
    {
      "event_name": "Purchase",
      "event_time": 1633552688,
      "user_data": {
        "client_ip_address": "192.88.9.9",
        "client_user_agent": "test ua2"
      },
      "custom_data": {
        "value": 50.5,
        "currency": "USD"
      },
      "opt_out": false
    }
  ]
}
```

---

## Upload Time versus Event Transaction Time

`event_time` is the event transaction time. It should be sent as a **Unix
timestamp in seconds** indicating when the actual event occurred. The specified
time may be earlier than the time you send the event to Facebook. This is to
enable batch processing and server performance optimization.

### Time Constraints

- The `event_time` can be up to **7 days before** you send an event to Meta
- If any `event_time` in data is greater than 7 days in the past, we return an
  error for the entire request and process no events
- For offline and physical store events with `physical_store` as
  `action_source`, you should upload transactions within **62 days** of the
  conversion

> **Important:** By using the Conversions API, you agree that the
> `action_source` parameter is accurate to the best of your knowledge.

---

## Batch Requests

You can send up to **1,000 events** in data. However, for optimal performance,
we recommend you send events:

- As soon as they occur
- Ideally within an hour of the event occurring

> **Warning:** If any event you send in a batch is invalid, we reject the entire
> batch.

---

## Hashing

Please check our customer information parameters page to see which parameters
should be hashed before they are sent to Facebook.

> **Note:** If you are using one of our Business SDKs, the hashing is done for
> you by the SDK.

---

## Business SDK Features for Conversions API

Learn more about three specific Business SDK features designed especially for
Conversions API users:

- Asynchronous Requests
- Concurrent Batching
- HTTP Service Interface

### Minimum Language Version Requirements

| Language | Minimum Version |
| -------- | --------------- |
| PHP      | >= 7.2          |
| Node.js  | >= 7.6.0        |
| Java     | >= 8            |
| Python   | >= 2.7          |
| Ruby     | >= 2            |

> **Important:** Business SDK support for PHP 5 has been deprecated since
> January 2019. Please upgrade to PHP 7 to use the Business SDK.
>
> If you must use PHP 5, consider using our Swagger implementation.

### Additional Resources

- [Conversions API Parameters](link-to-parameters)

---

# Pixel for the Marketing API

The Meta Pixel is the main tool you can use to track events on a website. You
can then use data from the Meta Pixel with Marketing API to:

- Build custom audiences based on activity on your website
- Measure conversion activity and determine which ads lead to results such as
  purchases

## Requirements

The Meta Pixel's base code must already be installed on every webpage where you
will be tracking events.

---

# iOS 14.5 Updates

Due to the changes for iOS 14.5, we have introduced a new tool for tracking web
events for iOS 14.5 ad campaigns.

## Aggregated Event Measurement

Meta's Aggregated Event Measurement is a protocol that allows for measurement of
web and app events from people using iOS 14.5 or later devices. Statistical
modeling may be used and is designed to provide a more complete view of results
when data is missing or partial.

### Key Limitations

Aggregated Event Measurement currently limits domains and mobile apps to **8
conversion events** that can be configured and prioritized for Aggregated Event
Measurement.

### Important Resources

- Visit our
  [Domain Verification guide](https://developers.facebook.com/docs/sharing/domain-verification)
  to verify your domain ownership for Aggregated Event Measurement
- Visit our [Business Help Center](https://www.facebook.com/business/help) to
  learn more

### Related Topics

- Aggregated Event Measurement
- Event Priority
- Value Sets
- Value Optimization
- Eligibility Requirements for Value Optimization
- Set Up Value Optimization

Visit our [Changelog](https://developers.facebook.com/docs/graph-api/changelog)
for more information about other changes available.

---

# Standard Events Examples

The following examples are standard events that you can track.

## Lead Event

Track the following Lead standard event on your website:

```javascript
fbq('track', 'Lead', {
  value: 40.0,
  currency: 'USD'
})
```

## ViewContent Event

Track the following ViewContent standard event on your website:

```javascript
fbq('track', 'ViewContent', {
  content_type: 'product',
  content_ids: ['1234'],
  value: 0.5,
  currency: 'USD'
})
```

## Search Event

Track the following Search standard event on your website:

```javascript
fbq('track', 'Search', {
  search_string: 'leather sandals',
  content_ids: ['1234', '2424', '1318', '6832'],
  value: 0.5,
  currency: 'USD'
})
```

## Purchase Event

Track the following Purchase standard event on your website's payment
confirmation page:

```javascript
fbq('track', 'Purchase', {
  content_type: 'product',
  contents: [
    { id: '1234', quantity: 2 },
    { id: '4642', quantity: 1 }
  ],
  value: 25.0,
  currency: 'USD'
})
```

---

# In-Page Events

Track in-page actions by tying standard or custom events to HTML elements such
as buttons.

## Single Button Example

```html
<button onClick="fbq('track', 'Purchase');">Button Text</button>
```

## Multiple Elements Example

Create a function if you have multiple HTML elements:

```html
<script>
  function onClick() {
    fbq('track', 'Purchase')
  }
</script>
```

Call this function to track Purchase events for multiple HTML elements:

```html
<button onClick="onClick()">Buy Now</button>

<button onClick="onClick()">Buy as a Gift</button>
```

**Note:** The Pixel Helper may show multiple Pixel events from the same page.
The Pixel Helper expects to track only on load events but by tying events to
elements, such as a button, you can use the Helper to track more event types.

---

# Track a Specific Pixel

Track a single custom event from a specific Meta Pixel. Replace `PIXEL-ID` with
the Meta Pixel ID you want to track.

```html
<script>
  function onClick() {
    fbq('trackSingleCustom', 'PIXEL-ID', 'PageView')
  }
</script>
```

**Note:** The `trackSingleCustom` method does not validate custom data.

---

# Suppress a Pixel

Suppress Meta Pixels by using `pushState` or `replaceState`:

```javascript
fbq.disablePushState = true
```

---

# Optimize Ad Delivery with Pixels

Optimize ad delivery based on standard events tracked using Meta Pixels using
the `promoted_object` field for the `/act_AD-ACCOUNT/adsets` endpoint.

## Example: Optimize for Purchase Value

The following example optimizes ads delivery based on purchase value using a
Pixel that tracks purchase events:

```bash
# Formatted for readability
curl -i -X POST "https://graph.facebook.com/v2.10/act_AD-ACCOUNT-ID/adsets
        ?name=Ad Set for Value Optimization
        &campaign_id=CAMPAIGN-ID
        &optimization_goal=VALUE
        &promoted_object={"pixel_id":"PIXEL-ID","custom_event_type":"PURCHASE"}
        &billing_event=IMPRESSIONS
        &daily_budget=1000
        &attribution_spec=[{'event_type': 'CLICK_THROUGH', 'window_days':'1'}]
        &access_token=ACCESS-TOKEN"
```

**Note:** Values for `conversion_specs` are automatically inferred based on the
objective and `promoted_object`. You cannot manually set `conversion_specs`.

---

# Image Only Pixel Code

We strongly recommend using the JavaScript code for Meta Pixel. However, in some
cases, you may use an HTML or an image Meta Pixel then add another third party
tag from your website.

## Standard Events (Image Tag)

```html
<img
  src="https://www.facebook.com/tr?id=PIXEL-ID&amp;ev=ViewContent&amp;cd[content_type]=product&amp;cd[content_ids]=1234&amp;cd[value]=0.50&amp;cd[currency]=USD&amp;noscript=1"
  height="1"
  width="1"
  style="display:none"
/>
```

---

# Reference: Standard Events

You can use the Meta Pixel's `fbq('track')` function to track the following
standard events. Standard events also support parameter objects with specific
object properties, which allow you to include detailed information about an
event.

## Event Deduplication

If you're implementing the Meta Pixel alongside the Conversions API, we
recommend you include the `eventID` parameter as a fourth parameter to the
`fbq('track')` function. See the
[Deduplicate Pixel and Server Events documentation](https://developers.facebook.com/docs/meta-pixel/implementation/deduplicate-pixel-and-server-events)
for more information.

---

## Standard Events Table

| Event Name               | Event Description                                                                                                                                                                                                                                   | Object Properties                                                                                                                                                                               | Promoted Object `custom_event_type` value |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **AddPaymentInfo**       | When payment information is added in the checkout flow.<br><br>_Example: A person clicks on a save billing information button._                                                                                                                     | `content_ids`, `contents`, `currency`, `value`<br><br>Optional.                                                                                                                                 | `ADD_PAYMENT_INFO`                        |
| **AddToCart**            | When a product is added to the shopping cart.<br><br>_Example: A person clicks on an add to cart button._                                                                                                                                           | `content_ids`, `content_type`, `contents`, `currency`, `value`<br><br>Optional.<br>**Required for Advantage+ catalog ads:** `contents`                                                          | `ADD_TO_CART`                             |
| **AddToWishlist**        | When a product is added to a wishlist.<br><br>_Example: A person clicks on an add to wishlist button._                                                                                                                                              | `content_ids`, `contents`, `currency`, `value`<br><br>Optional.                                                                                                                                 | `ADD_TO_WISHLIST`                         |
| **CompleteRegistration** | When a registration form is completed.<br><br>_Example: A person submits a completed subscription or signup form._                                                                                                                                  | `currency`, `value`<br><br>Optional.                                                                                                                                                            | `COMPLETE_REGISTRATION`                   |
| **Contact**              | When a person initiates contact with your business via telephone, SMS, email, chat, etc.<br><br>_Example: A person submits a question about a product._                                                                                             | Optional.                                                                                                                                                                                       | `CONTACT`                                 |
| **CustomizeProduct**     | When a person customizes a product.<br><br>_Example: A person selects the color of a t-shirt._                                                                                                                                                      | Optional.                                                                                                                                                                                       | `CUSTOMIZE_PRODUCT`                       |
| **Donate**               | When a person donates funds to your organization or cause.<br><br>_Example: A person adds a donation to the Humane Society to their cart._                                                                                                          | Optional.                                                                                                                                                                                       | —                                         |
| **FindLocation**         | When a person searches for a location of your store via a website or app, with an intention to visit the physical location.<br><br>_Example: A person wants to find a specific product in a local store._                                           | Optional.                                                                                                                                                                                       | `FIND_LOCATION`                           |
| **InitiateCheckout**     | When a person enters the checkout flow prior to completing the checkout flow.<br><br>_Example: A person clicks on a checkout button._                                                                                                               | `content_ids`, `contents`, `currency`, `num_items`, `value`<br><br>Optional.                                                                                                                    | `INITIATE_CHECKOUT`                       |
| **Lead**                 | When a sign up is completed.<br><br>_Example: A person clicks on pricing._                                                                                                                                                                          | `currency`, `value`<br><br>Optional.                                                                                                                                                            | `LEAD`                                    |
| **Purchase**             | When a purchase is made or checkout flow is completed.<br><br>_Example: A person has finished the purchase or checkout flow and lands on thank you or confirmation page._                                                                           | `content_ids`, `content_type`, `contents`, `currency`, `num_items`, `value`<br><br>**Required:** `currency` and `value`<br>**Required for Advantage+ catalog ads:** `contents` or `content_ids` | `PURCHASE`                                |
| **Schedule**             | When a person books an appointment to visit one of your locations.<br><br>_Example: A person selects a date and time for a tennis lesson._                                                                                                          | Optional.                                                                                                                                                                                       | `SCHEDULE`                                |
| **Search**               | When a search is made.<br><br>_Example: A person searches for a product on your website._                                                                                                                                                           | `content_ids`, `content_type`, `contents`, `currency`, `search_string`, `value`<br><br>Optional.<br>**Required for Advantage+ catalog ads:** `contents` or `content_ids`                        | `SEARCH`                                  |
| **StartTrial**           | When a person starts a free trial of a product or service you offer.<br><br>_Example: A person selects a free week of your game._                                                                                                                   | `currency`, `predicted_ltv`, `value`<br><br>Optional.                                                                                                                                           | `START_TRIAL`                             |
| **SubmitApplication**    | When a person applies for a product, service, or program you offer.<br><br>_Example: A person applies for a credit card, educational program, or job._                                                                                              | Optional.                                                                                                                                                                                       | `SUBMIT_APPLICATION`                      |
| **Subscribe**            | When a person applies to a start a paid subscription for a product or service you offer.<br><br>_Example: A person subscribes to your streaming service._                                                                                           | `currency`, `predicted_ltv`, `value`<br><br>Optional.                                                                                                                                           | `SUBSCRIBE`                               |
| **ViewContent**          | A visit to a web page you care about (for example, a product page or landing page). ViewContent tells you if someone visits a web page's URL, but not what they see or do on that page.<br><br>_Example: A person lands on a product details page._ | `content_ids`, `content_type`, `contents`, `currency`, `value`<br><br>Optional.<br>**Required for Advantage+ catalog ads:** `contents` or `content_ids`                                         | `VIEW_CONTENT`                            |

---

## Object Properties Reference

You can include the following predefined object properties with any custom
events, and any standard events that support them. Format your parameter object
data using JSON.
[Learn more about event parameters with Blueprint](https://www.facebookblueprint.com/student/path/241030-meta-pixel).

| Property Key       | Value Type                   | Parameter Description                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_category` | String                       | Category of the page/product.<br><br>Optional.                                                                                                                                                                                                                                                                                                                                                                                        |
| `content_ids`      | Array of integers or strings | Product IDs associated with the event, such as SKUs (e.g. `['ABC123', 'XYZ789']`).                                                                                                                                                                                                                                                                                                                                                    |
| `content_name`     | String                       | Name of the page/product.<br><br>Optional.                                                                                                                                                                                                                                                                                                                                                                                            |
| `content_type`     | String                       | Either `product` or `product_group` based on the `content_ids` or `contents` being passed. If the IDs being passed in `content_ids` or `contents` parameter are IDs of products, then the value should be `product`. If product group IDs are being passed, then the value should be `product_group`.<br><br>If no `content_type` is provided, Meta will match the event to every item that has the same ID, independent of its type. |
| `contents`         | Array of objects             | An array of JSON objects that contains the quantity and the International Article Number (EAN) when applicable, or other product or content identifier(s). `id` and `quantity` are the required fields. e.g. `[{'id': 'ABC123', 'quantity': 2}, {'id': 'XYZ789', 'quantity': 2}]`.                                                                                                                                                    |
| `currency`         | String                       | The currency for the value specified.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `num_items`        | Integer                      | Used with `InitiateCheckout` event. The number of items when checkout was initiated.                                                                                                                                                                                                                                                                                                                                                  |
| `predicted_ltv`    | Integer, float               | Predicted lifetime value of a subscriber as defined by the advertiser and expressed as an exact value.                                                                                                                                                                                                                                                                                                                                |
| `search_string`    | String                       | Used with the `Search` event. The string entered by the user for the search.                                                                                                                                                                                                                                                                                                                                                          |
| `status`           | Boolean                      | Used with the `CompleteRegistration` event, to show the status of the registration.<br><br>Optional.                                                                                                                                                                                                                                                                                                                                  |
| `value`            | Integer or float             | The value of a user performing this event to the business.                                                                                                                                                                                                                                                                                                                                                                            |
