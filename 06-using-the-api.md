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
