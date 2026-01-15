# Measurement Protocol reference | gtag.js Setup

This page describes the transport mechanism and data parameters for the
Measurement Protocol.

## Transport

All data must be sent securely using HTTPS POST requests.

Send requests to the following endpoint:
`https://www.google-analytics.com/mp/collect`

If you want your data to be collected in the EU, use the following endpoint
instead: `https://region1.google-analytics.com/mp/collect`

Here's a sample POST request:

```
POST /mp/collect HTTP/1.1
HOST: www.google-analytics.com
Content-Type: application/json
PAYLOAD_DATA
```

Replace `PAYLOAD_DATA` with Payload of the request.

The Measurement Protocol returns a `2xx` status code if the HTTP request is
received. The Measurement Protocol doesn't return an error code if the payload
is malformed, or if the data is incorrect or not processed by Google Analytics.

> **Tip:** If you don't get a `2xx` status code, correct any errors in your HTTP
> request. Don't retry the same request.

## Payload

The payload has two parts:

- Query parameters.
- A JSON POST body.

### Query parameters

| Parameter Name   | Description                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_secret`     | **Required.** The API Secret from the Google Analytics UI. <br> Found under **Admin > Data Streams > Choose your stream > Measurement Protocol > Create**. <br><br> _Private to your organization. Should be regularly updated to avoid excessive SPAM._ |
| `measurement_id` | Measurement ID. The identifier for a Data Stream. Found in the Google Analytics UI under **Admin > Data Streams > choose your stream > Measurement ID**                                                                                                  |

### JSON POST body

| Key                    | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client_id`            | string  | **Required.** Unique identifier for a user instance of a web client. Must be two positive numbers, joined by a period (.). <br><br> _If you're using `gtag.js`, use `gtag.js('get')` to get this value. See [Send event to the Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag). <br> If you're using Google Tag Manager:_ <br> _In most cases, use the Analytics Client ID built-in variable._ <br> _If you need to retrieve the `client_id` within a custom template, use the `readAnalyticsStorage` API._ |
| `user_id`              | string  | _Optional._ A unique identifier for a user. See [User-ID for cross-platform analysis](https://support.google.com/analytics/answer/9213390) for more information on this identifier. Can include only utf-8 characters.                                                                                                                                                                                                                                                                                                                                                                       |
| `timestamp_micros`     | number  | _Optional._ A Unix timestamp, microseconds, not milliseconds. Represents the time of the event. Should be set only to record events that happened in the past. Can be overridden by `user_property` or event timestamps. Events can be backdated up to 72 hours.                                                                                                                                                                                                                                                                                                                             |
| `user_properties`      | object  | _Optional._ The user properties for the measurement.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `user_data`            | object  | _Optional._ User-provided data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `consent`              | object  | _Optional._ Consent settings for the request. See the [consent](#consent) section for more information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `non_personalized_ads` | boolean | _Deprecated: Use the `ad_personalization` field of `consent` instead._ <br> _Optional._ Set to `true` to indicate the user's data shouldn't be used for personalized ads.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `user_location`        | object  | _Optional._ Sets the geographic information for the request in a structured format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `ip_override`          | string  | _Optional._ IP address Google Analytics uses to derive geographic information for the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `device`               | object  | _Optional._ Sets the device information for the request in a structured format.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `user_agent`           | string  | _Optional._ Provides a user agent for Google Analytics to use to derive device information for the request. Google Analytics ignores this field if the request also includes `device`.                                                                                                                                                                                                                                                                                                                                                                                                       |
| `validation_behavior`  | string  | _Optional._ Sets the validation behavior for the request. <br><br> _Either `RELAXED` or `ENFORCE_RECOMMENDATIONS`. Defaults to `RELAXED` if not specified._                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `events[]`             | array   | **Required.** An array of event items. Up to 25 events can be sent per request. See the [events reference](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) for all valid events.                                                                                                                                                                                                                                                                                                                                                                 |
| `events[].name`        | string  | **Required.** Name of the event. See [Events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) for all options.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `events[].params`      | object  | _Optional._ Parameters for the event. See [Events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) for the suggested parameters for each event, and [Common event parameters](#common-event-parameters).                                                                                                                                                                                                                                                                                                                                         |

### Common event parameters

The Measurement Protocol has the following common event parameters:

| Key                    | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `session_id`           | number or string | Identifier for the user session. **Required for several common use cases.** <br><br> The Measurement Protocol accepts the `session_id` in the following formats: <br> _ A positive numeric value representing a timestamp, provided as a number or a string <br> _ If you're using `gtag.js`, use `gtag.js('get')` to get this value. <br> _ If you're using custom templates in GTM, use the `readAnalyticsStorage` custom template API to get this value. This API returns an array which can contain information about multiple sessions. You should extract a specific `session_id`. <br> _ A session ID string retrieved from the Analytics Session ID built-in variable in Google Tag Manager. |
| `engagement_time_msec` | number           | The duration of user engagement, in milliseconds, for the event. Use a value that reflects the amount of user engagement time since the preceding event.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `timestamp_micros`     | number           | The Unix epoch time, in microseconds, for the event. Use this parameter to override the timestamp of the event.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

> **Tip:** You must include the `engagement_time_msec` and `session_id`
> parameters in order for user activity to display in reports like Realtime.

### Consent

The `consent` attribute configures consent types and states. If you don't
specify consent, Google Analytics uses the consent settings from corresponding
online interactions for the client or app instance.

| Key                  | Type   | Description                                                                                                                                                          |
| -------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ad_user_data`       | string | _Optional._ Consent for sending user data from the request's events and user properties to Google for advertising purposes. <br><br> _Either `GRANTED` or `DENIED`._ |
| `ad_personalization` | string | _Optional._ Consent for personalized advertising for the user. <br><br> _Either `GRANTED` or `DENIED`._                                                              |

### Geographic information

The `user_location` and `ip_override` attributes provide geographic information.
`user_location` takes precedence over `ip_override`.

Here's the structure of the `user_location` field. Provide as many of the
attributes as possible. We recommend `country_id` and `region_id` at a minimum.

| Key               | Type   | Description                                                                                                                                                   |
| ----------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `city`            | string | _Optional._ The city's name. If the city is in the US, also set `country_id` and `region_id` so Google Analytics can properly map the city name to a city ID. |
| `region_id`       | string | _Optional._ The ISO 3166 country and subdivision. For example, `US-CA`, `US-AR`, `CA-BC`, `GB-LND`, `CN-HK`.                                                  |
| `country_id`      | string | _Optional._ The country in ISO 3166-1 alpha-2 format. For example, `US`, `AU`, `ES`, `FR`.                                                                    |
| `subcontinent_id` | string | _Optional._ The subcontinent in UN M49 format. For example, `011`, `021`, `030`, `039`.                                                                       |
| `continent_id`    | string | _Optional._ The continent in UN M49 format. For example, `002`, `019`, `142`, `150`.                                                                          |

Here's a sample `user_location`:

```json
"user_location": {
  "city": "Mountain View",
  "region_id": "US-CA",
  "country_id": "US",
  "subcontinent_id": "021",
  "continent_id": "019"
}
```

`ip_override` is an alternative to `user_location`. If you send `ip_override`
instead, Google Analytics derives geographic information from the IP address. If
you send `user_location`, Google Analytics ignores `ip_override`.

If you don't send `user_location` or `ip_override`, Google Analytics derives
geographic information from tagging events using `client_id`.

Google Analytics applies the property's granular location data settings to the
request, regardless of the geographic information sent.

### Device information

To send device information, use the `device` field. Here's the structure of the
`device` field. Provide as many of the attributes as possible. We recommend
`category` at a minimum.

| Key                        | Type   | Description                                                                                                   |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| `category`                 | string | _Optional._ The category of the device. For example, `desktop`, `tablet`, `mobile`, `smart TV`.               |
| `language`                 | string | _Optional._ The language in ISO 639-1 format. For example, `en`, `en-US`.                                     |
| `screen_resolution`        | string | _Optional._ The resolution of the device, formatted as `WIDTHxHEIGHT`. For example, `1280x2856`, `1080x2340`. |
| `operating_system`         | string | _Optional._ The operating system or platform. For example, `MacOS`.                                           |
| `operating_system_version` | string | _Optional._ The version of the operating system or platform. For example, `13.5`.                             |
| `model`                    | string | _Optional._ The model of the device. For example, `Pixel 9 Pro`, `Samsung Galaxy S24`.                        |
| `brand`                    | string | _Optional._ The brand of the device. For example, `Google`, `Samsung`.                                        |
| `browser`                  | string | _Optional._ The brand or type of browser. For example, `Chrome`, `Firefox`.                                   |
| `browser_version`          | string | _Optional._ The version of the browser. For example, `136.0.7103.60`, `5.0`.                                  |

The following snippet shows an example of `device` settings:

```json
"device": {
  "category": "mobile",
  "language": "en",
  "screen_resolution": "1280x2856",
  "operating_system": "Android",
  "operating_system_version": "14",
  "model": "Pixel 9 Pro",
  "brand": "Google",
  "browser": "Chrome",
  "browser_version": "136.0.7103.60"
}
```

As an alternative to the structured information in `device`, you can specify a
user agent string in the `user_agent` attribute. If the request includes the
`device` attribute then the Measurement Protocol ignores `user_agent`.

If a request specifies neither `device` nor `user_agent`, Google Analytics
derives device information from tagging events using `client_id`.

Regardless of whether you specify `device` or `user_agent`, Google Analytics
applies the property's granular device data settings to the request.

### Validation behavior

The `validation_behavior` attribute controls how the Measurement Protocol
validates the contents of the request.

- `RELAXED` validation only rejects requests that are malformed. It might still
  accept events and parameters with invalid field names or with data that isn't
  the correct type, but it ignores parameters that exceed limits. The
  Measurement Protocol uses `RELAXED` validation by default.
- `ENFORCE_RECOMMENDATIONS` validation rejects event and item parameters that
  aren't the correct type or that contain parameters that exceed limits. In
  addition, `ENFORCE_RECOMMENDATIONS` rejects any event or user property with a
  timestamp that is not within the last 72 hours.

We recommend the following approach:

> Use `ENFORCE_RECOMMENDATIONS` when you validate events to get as much feedback
> as possible about potential problems with your requests.

You can also validate requests using the
[Event Builder](https://ga-dev-tools.google/ga4-event-builder/) since it
specifies `ENFORCE_RECOMMENDATIONS` when validating requests.

> Don't specify `validation_behavior` when you send events to minimize the data
> rejected by the Measurement Protocol.

If you want to prioritize strict validation over data collection when sending a
particular request, add the `validation_behavior` field and set it to
`ENFORCE_RECOMMENDATIONS`.

## Custom parameters

You can include custom user-scoped, event-scoped and item-scoped parameters in a
Measurement Protocol payload.

- User-scoped custom parameters can be included in `user_properties`.
- Event-scoped custom parameters can be included in `events[].params`.
- Item-scoped custom parameters can be included in `items`.

## Recommended values for certain events

Some events have recommended parameters. See
[events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events)
for the recommended parameters for all supported events.

## Reserved names

Some event, parameter, and user property names are reserved and can't be used:

### Reserved event names

The following event names are reserved and can't be used:

- `ad_activeview`
- `ad_click`
- `ad_exposure`
- `ad_query`
- `ad_reward`
- `adunit_exposure`
- `app_clear_data`
- `app_exception`
- `app_install`
- `app_remove`
- `app_store_refund`
- `app_update`
- `app_upgrade`
- `dynamic_link_app_open`
- `dynamic_link_app_update`
- `dynamic_link_first_open`
- `error`
- `firebase_campaign`
- `firebase_in_app_message_action`
- `firebase_in_app_message_dismiss`
- `firebase_in_app_message_impression`
- `first_open`
- `first_visit`
- `notification_dismiss`
- `notification_foreground`
- `notification_open`
- `notification_receive`
- `notification_send`
- `os_update`
- `session_start`
- `user_engagement`

In addition, `ad_impression`, `in_app_purchase` and `screen_view` events are
only allowed for App streams.

### Reserved parameter names

The following parameter names are reserved and can't be used:

- `firebase_conversion`

Parameter names can't begin with the following:

- `_` (underscore)
- `firebase_`
- `ga_`
- `google_`
- `gtag.`

### Reserved user property names

The following user property names are reserved and can't be used:

- `first_open_time`
- `first_visit_time`
- `last_deep_link_referrer`
- `user_id`
- `first_open_after_install`

Additionally, user property names can't begin with:

- `_` (underscore)
- `firebase_`
- `ga_`
- `google_`
