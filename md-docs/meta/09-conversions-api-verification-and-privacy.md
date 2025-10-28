# Verify Events

After you send your events, confirm that we have received them in Events
Manager:

1. On the Data Sources page, click on the Pixel corresponding to the `PIXEL_ID`
   in your POST request
   - For more information see Business Help Center: Navigate Events Manager
2. Then, click **Overview**. You see the number of raw, matched and attributed
   events we received
3. Under **Connection Method**, you see the channel in which that event was sent
4. You can click on each event to get more specific information

> **Timeline:** After you start sending events, you should be able to verify
> them within 20 minutes.

Now you can start sending events from your server.

---

## Test Events Tool

You can verify that your server events are received correctly by Facebook by
using the Test Events feature in Events Manager.

### How to Access

To find the tool, go to: **Events Manager > Data Sources > Your Pixel > Test
Events**

### Using the Test Events Tool

The Test Events tool generates a test ID. Send the test ID as a
`test_event_code` parameter to start seeing event activity appear in the Test
Events window.

> **Important Notes:**
>
> - The `test_event_code` field should be used **only for testing**
> - You need to **remove it** when sending your production payload
> - Events sent with `test_event_code` are **not dropped**
> - They flow into Events Manager and are used for targeting and ads measurement
>   purposes

### Example Request Structure

```json
{
  "data": [
    {
      "event_name": "ViewContent",
      "event_time": 1761263094,
      "event_id": "event.id.123",
      "event_source_url": "http://jaspers-market.com",
      "user_data": {
        "client_ip_address": "1.2.3.4",
        "client_user_agent": "test user agent"
      }
    }
  ],
  "test_event_code": "TEST123"
}
```

### Graph API Explorer Example

Here's an example of how the request appears in Graph API Explorer:

You can generate this test payload using the Payload Helper tool. Please note
that the test event code is only for testing payload.

### Viewing Test Events

Your server events appear in the Test Events window once the request is sent.

---

## Data Processing Options for US Users

For these two APIs, implement data processing options by adding
`data_processing_options`, `data_processing_options_country`, and
`data_processing_options_state` inside each event within the `data` parameter of
your events.

> **Note:** The App Events and Offline Conversions APIs are no longer
> recommended for new integrations. Instead, it is recommended that you use the
> Conversions API as it now supports web, app, and offline events. See
> Conversions API for App Events and Conversions API for Offline Events for more
> information.

### Option 1: Explicitly Not Enable Limited Data Use (LDU)

Specify an empty array for each event or simply remove the field in the payload:

```json
{
        "data": [
                {
                        "event_name": "Purchase",
                        "event_time": <EVENT_TIME>,
                        "user_data": {
                                "em": "<EMAIL>"
                        },
                        "custom_data": {
                                "currency": "<CURRENCY>",
                                "value": "<VALUE>"
                        },
                        "data_processing_options": []
                }
        ]
}
```

### Option 2: Enable LDU with Geolocation

Have Meta perform geolocation:

```json
{
        "data": [
                {
                        "event_name": "Purchase",
                        "event_time": <EVENT_TIME>,
                        "user_data": {
                                "em": "<EMAIL>",
                                "client_ip_address": "256.256.256.256"
                        },
                        "custom_data": {
                                "currency": "<CURRENCY>",
                                "value": "<VALUE>"
                        },
                        "data_processing_options": ["LDU"],
                        "data_processing_options_country": 0,
                        "data_processing_options_state": 0
                }
        ]
}
```

### Option 3: Enable LDU with Manual Location

Manually specify the location, e.g., for California:

```json
{
        "data": [
                {
                        "event_name": "Purchase",
                        "event_time": <EVENT_TIME>,
                        "user_data": {
                                "em": "<EMAIL>"
                        },
                        "custom_data": {
                                "currency": "<CURRENCY>",
                                "value": "<VALUE>"
                        },
                        "data_processing_options": ["LDU"],
                        "data_processing_options_country": 1,
                        "data_processing_options_state": 1000
                }
        ]
}
```

### Manual Upload UI

The Offline Conversions API offers the option to manually upload your events
from a `.csv` file. In this case, add Data Processing Options, Data Processing
Country, and Data Processing State as columns inside your file. More information
about this can be found in the upload user interface.

**Learn more about [Data Processing Options](link).**

---
