This guide explains how you can send
[Google Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
web and app stream
[events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events)
to a Google Analytics server, so that you can view Measurement Protocol events
in your
[Google Analytics reports](https://developers.google.com/analytics/devguides/reporting/data/v1/basics).

Choose the platform you want to see in this guide:
<button value="firebase" default="">Firebase</button>
<button value="gtag">gtag.js</button>

## Format the request

The Google Analytics Measurement Protocol only supports HTTP `POST` requests.

To send an event, use the following format:

    POST /mp/collect HTTP/1.1
    HOST: www.google-analytics.com
    Content-Type: application/json

    PAYLOAD_DATA

> [!TIP] **Tip:** If you want your data to be collected in the EU, change the
> `HOST` in the example to `region1.google-analytics.com`.

You must provide the following in the request URL:

- `api_secret`: The **API SECRET** generated in the Google Analytics UI.

  To create a new secret, navigate to **Admin** \> **Data collection and
  modification** \> **Data streams** \> **choose your stream** \> **Measurement
  Protocol API secrets** \> **Create**.

<!-- -->

- `firebase_app_id`: The Firebase App ID, found in the Firebase console under
  **Project Settings** \> **General** \> **Your Apps** \> **App ID**.

  The `firebase_app_id` isn't the same as the `app_instance_id`. The
  `firebase_app_id` identifies your app, whereas `app_instance_id` identifies a
  single installation of the app.

You must provide a request body in the
[JSON POST body](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#payload_post_body)
format for the Measurement Protocol. Here's an example:

      {
       "app_instance_id": "APP_INSTANCE_ID",
       "events": [
          {
            "name": "login",
            "params": {
              "method": "Google",
              "session_id": "SESSION_ID",
              "engagement_time_msec": 100
            }
          }
       ]
      }

While `session_start` is a
[reserved event name](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#reserved_names),
creating a new `session_id` creates a new session without the need to send
`session_start`. Understand how
[sessions are counted](https://support.google.com/analytics/answer/9191807).

## Try it

Here's an example you can use to send multiple events at once. This example
sends a
[`tutorial_begin`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events?tech=aw_measurement_protocol#tutorial_begin)
event and a
[`join_group`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events?tech=aw_measurement_protocol#join_group)
event to your Google Analytics server, includes
[geographic information](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#payload_geo_info)
using the `user_location` field, and includes
[device information](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#payload_device_info)
using the `device` field.

    const firebaseAppId = "FIREBASE_APP_ID";
    const apiSecret = "API_SECRET";

    fetch(`https://www.google-analytics.com/mp/collect?firebase_app_id=${firebaseAppId}&api_secret=${apiSecret}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app_instance_id: "APP_INSTANCE_ID",
        events: [
          {
            name: "tutorial_begin",
            params: {
              "session_id": "SESSION_ID",
              "engagement_time_msec": 100
            }
          },
          {
            name: "join_group",
            params: {
              "group_id": "G_12345",
              "session_id": "SESSION_ID",
              "engagement_time_msec": 150
            }
          }
        ],
        user_location: {
          city: "Mountain View",
          region_id: "US-CA",
          country_id: "US",
          subcontinent_id: "021",
          continent_id: "019"
        },
        device: {
          category: "mobile",
          language: "en",
          screen_resolution: "1280x2856",
          operating_system: "Android",
          operating_system_version: "14",
          model: "Pixel 9 Pro",
          brand: "Google",
          browser: "Chrome",
          browser_version: "136.0.7103.60"
        }
      })
    });

The format of `firebase_app_id` is platform specific. See **Application ID**
under
[Firebase config files and objects](https://firebase.google.com/docs/projects/learn-more#config-files-objects).

## Override timestamp

The Measurement Protocol uses the _first_ timestamp it finds in the following
list for each event and user property in the request:

1. The `timestamp_micros` of the event or user property.
2. The `timestamp_micros` of the request.
3. The time that the Measurement Protocol receives the request.

The following example sends a request-level timestamp that applies to all of the
events and
[user properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties)
in the request. As a result, the Measurement Protocol assigns a timestamp of
`requestUnixEpochTimeInMicros` to the `tutorial_begin` and `join_group` events
and the `customer_tier` user property.

    {
      "timestamp_micros": requestUnixEpochTimeInMicros,
      "events": [
        {
          "name": "tutorial_begin"
        },
        {
          "name": "join_group",
          "params": {
            "group_id": "G_12345",
          }
        }
      ],
      "user_properties": {
        "customer_tier": {
          "value": "PREMIUM"
        }
      }
    }

The following example sends a request-level timestamp, an event-level timestamp,
and a user property-level timestamp. As a result, the Measurement Protocol
assigns the following timestamps:

- `tutorialBeginUnixEpochTimeInMicros` for the `tutorial_begin` event
- `customerTierUnixEpochTimeInMicros` for the `customer_tier` user property
- `requestUnixEpochTimeInMicros` for the `join_group` event and the
  `newsletter_reader` user property.

  { "timestamp_micros": requestUnixEpochTimeInMicros, "events": [ { "name":
  "tutorial_begin", "timestamp_micros": tutorialBeginUnixEpochTimeInMicros }, {
  "name": "join_group", "params": { "group_id": "G_12345", } } ],
  "user_properties": { "customer_tier": { "value": "PREMIUM",
  "timestamp_micros": customerTierUnixEpochTimeInMicros }, "newsletter_reader":
  { "value": "true" } } }

### Validation behavior for past events and user properties

Events and user properties can be backdated up to 72 hours. If the
`timestamp_micros` value is earlier than 72 hours ago, the Measurement Protocol
accepts or rejects the event or user property as follows:

- If the `validation_behavior` is not set or is set to `RELAXED`, the
  Measurement Protocol accepts the event or user property but overrides its
  timestamp to 72 hours ago.
- If the `validation_behavior` is set to `ENFORCE_RECOMMENDATIONS`, the
  Measurement Protocol rejects the event or user property.

## Limitations

The following limitations apply to sending Measurement Protocol events to Google
Analytics:

> [!NOTE] **Note:** For information on the limitations of 360 features, see
> [Google Analytics 360](https://support.google.com/analytics/answer/11202874).

- Requests can have a maximum of 25 events.
- Events can have a maximum of 25 parameters.
- Events can have a maximum of 25 user properties.
- User property names must be 24 characters or fewer.
- User property values must be 36 characters or fewer.
- Event names must be 40 characters or fewer, can only contain alphanumeric
  characters and underscores, and must start with an alphabetic character.
- Parameter names including item parameters must be 40 characters or fewer, can
  only contain alphanumeric characters and underscores, and must start with an
  alphabetic character.
- Parameter values including item parameter values must be 100 characters or
  fewer for a standard Google Analytics property, and 500 characters or fewer
  for a Google Analytics 360 property.

  This limit doesn't apply to the `session_id` and `session_number` parameters
  when their values are provided by the corresponding
  [Analytics Session ID](https://support.google.com/tagmanager/answer/7182738#utilities)
  and
  [Analytics Session Number](https://support.google.com/tagmanager/answer/7182738#utilities)
  built-in variables in Google Tag Manager.

- Item parameters can have a maximum of 10 custom parameters.

- The post body must be smaller than 130kB.

- The
  [timestamp](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#override_timestamp)
  must be within the last 72 hours. See
  [Validation behavior for past events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#past_events)
  for details.

- App Measurement Protocol events sent to Google Analytics don't populate Search
  audiences in Google Ads for app users.

For additional requirements of each use case, see
[common use cases](https://developers.google.com/analytics/devguides/collection/protocol/ga4/use-cases).
