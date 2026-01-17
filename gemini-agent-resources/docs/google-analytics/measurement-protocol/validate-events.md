# Validate events

Choose your platform:

Firebase gtag.js

The Google Analytics Measurement Protocol does not return `HTTP` error codes,
even if an event is malformed or missing required parameters. To verify your
events are valid, you should test them against the Measurement Protocol
validation server before deploying them to production. After you have validated
that your events are structured properly, you should
[verify your implementation](https://developers.google.com/analytics/devguides/collection/protocol/ga4/verify-implementation)
to make sure you're using the correct keys.

**Caution:** The validation server does _not_ validate the **`api_secret`** or
**`measurement_id`**. Carefully review those values to make sure they are
correct.

You can either call the validation server directly, or use the
[Google Analytics Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/).
The Google Analytics Event Builder lets you interactively construct events, and
uses the Measurement Protocol validation server to validate them.

This guide describes how to send events to the Measurement Protocol for Google
Analytics 4 validation server and interpret the response.

**Important:** Events sent to the validation server don't show up in reports.

## Send events for validation

The only difference in the request for events sent to the Measurement Protocol
and the Measurement Protocol validation server is the URL.

| Server                                 | URL                 |
| :------------------------------------- | :------------------ |
| Measurement Protocol                   | `/mp/collect`       |
| Measurement Protocol validation server | `/debug/mp/collect` |

All other
[request fields](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference)
are the same.

We recommend the following approach to validation:

- Use strict validation checks during development using either of the following
  options:
  - Validate requests with the
    [Event Builder](https://ga-dev-tools.google/ga4/event-builder/).
  - Send requests to the validation server with `validation_behavior` set to
    `ENFORCE_RECOMMENDATIONS`.
- In production, send requests without `validation_behavior` set to minimize the
  data rejected by the Measurement Protocol.

The following code shows an invalid event being sent to the Measurement Protocol
validation server:

```
const measurementId = "MEASUREMENT_ID";
const apiSecret = "API_SECRET";

fetch(`https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    client_id: "CLIENT_ID",
    validation_behavior: "ENFORCE_RECOMMENDATIONS",
    events: [{
      // Event names must start with an alphabetic character.
      name: "_badEventName",
      params: {},
    }]
  })
});
```

### Code Tutor

expand_more

**Tip:** If you want your data to be collected in the EU, change the URL passed
to the **`fetch`** method to begin with
**`https://region1.google-analytics.com`** instead of
**`https://www.google-analytics.com`**.

## Validation response

Here's the validation server's response to the previous event:

```
{
  "validationMessages": [
    {
      "fieldPath": "events",
      "description": "Event at index: [0] has invalid name [_badEventName]. Names must start with an alphabetic character.",
      "validationCode": "NAME_INVALID"
    }
  ]
}
```

### Code Tutor

expand_more

Here's the validation server's response to a request with no validation issues:

```
{
  "validationMessages": []
}
```

### Code Tutor

expand_more

### Response

| Key                  | Type                                                                                                                                                          | Description                      |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------- |
| `validationMessages` | Array\<[ValidationMessage](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events?client_type=gtag#validation_message)\> | An array of validation messages. |

### ValidationMessage

| Key              | Type                                                                                                                                           | Description                                      |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| `fieldPath`      | string                                                                                                                                         | The path to the field that was invalid.          |
| `description`    | string                                                                                                                                         | A description of the error.                      |
| `validationCode` | [ValidationCode](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events?client_type=gtag#validation_code) | A validation code that corresponds to the error. |

### ValidationCode

| Value                   | Description                                                                                                                                                                |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VALUE_INVALID`         | The value provided for a `fieldPath` was invalid. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations). |
| `VALUE_REQUIRED`        | A required value for a `fieldPath` was not provided.                                                                                                                       |
| `NAME_INVALID`          | The name provided was invalid. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations).                    |
| `NAME_RESERVED`         | The name provided was one of the reserved names. See [reserved names](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#reserved_names). |
| `VALUE_OUT_OF_BOUNDS`   | The value provided was too large. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations).                 |
| `EXCEEDED_MAX_ENTITIES` | There were too many parameters in the request. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations).    |
| `NAME_DUPLICATED`       | The same name was provided more than once in the request.                                                                                                                  |

# Verify implementation

-

After going through
[validating events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events),
you'll want to verify your implementation. The validation server validates that
your events have the correct structure, but to verify that they are being sent
correctly to your property, you'll need to do the following:

- [Send an event from a client](https://developers.google.com/analytics/devguides/collection/protocol/ga4/verify-implementation?client_type=firebase#client_send)
- [Send an event to your property](https://developers.google.com/analytics/devguides/collection/protocol/ga4/verify-implementation?client_type=firebase#send)
- [Check the Realtime view](https://developers.google.com/analytics/devguides/collection/protocol/ga4/verify-implementation?client_type=firebase#realtime)
- [Check DebugView](https://developers.google.com/analytics/devguides/collection/protocol/ga4/verify-implementation?client_type=firebase#debugview)

If you're not seeing your events after going through these steps, check
[troubleshooting](https://developers.google.com/analytics/devguides/collection/protocol/ga4/troubleshooting)
for common implementation errors.

## Send an event from a client

Choose your client:

Firebase gtag.js

In order for an event to be valid, it must have an `app_instance_id` that has
already been used to send an event from the Google Analytics for Firebase SDK.
Capture this ID client-side, and include it in your call to the Measurement
Protocol. In
[send an event to your property](https://developers.google.com/analytics/devguides/collection/protocol/ga4/verify-implementation?client_type=firebase#send),
we use `"app_instance_id"` as the `app_instance_id`. You will need to replace
this with a real `app_instance_id` that comes from the SDK. See
[are you using the correct app_instance_id](https://developers.google.com/analytics/devguides/collection/protocol/ga4/troubleshooting#correct_app_instance_id)
for how to make sure you're using a valid value.

**Note:** Be careful not to mix up **`app_instance_id`** and
**`firebase_app_id`**. **`firebase_app_id`** is same for all users, but
**`app_instance_id`** varies for every installation.

## Send an event to your property

After you have sent an event from a client and captured a valid
`app_instance_id`, you'll be ready to send an event using the Measurement
Protocol. When verifying your implementation, you should send the exact event
that you're trying to measure using the Measurement Protocol.

For example, the following sends a
[refund](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#refund)
event:

```
const firebaseAppId = "FIREBASE_APP_ID";
const apiSecret = "API_SECRET";

fetch(`https://www.google-analytics.com/mp/collect?firebase_app_id=${firebaseAppId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "app_instance_id": "APP_INSTANCE_ID",
    "events": [{
      "name": "refund",
      "params": {
        "currency": "USD",
        "value": "9.99",
        "transaction_id": "ABC-123"
      }
    }]
  })
});
```

### Code Tutor

expand_more

## Check the Realtime view

After sending an event using the Measurement Protocol, check the Realtime view
for your property. Events typically show up within a few seconds.

Go to the Realtime view by opening
[Google Analytics](https://analytics.google.com/), then going to **Reports** \>
**Realtime** in the left navigation. You'll want to focus on the bottom charts,
such as "Event count by Event name" and "Key Events by Event name."

Realtime view showing an event

## Check DebugView

If the Realtime view doesn't provide enough detail for you to verify your
implementation, enable debug mode in some test events by including the following
parameters in the `params` collection so you can monitor and review the events
in **DebugView**:

1. `"debug_mode": true` or `"debug_mode": 1`
2. `"engagement_time_msec"` set to a positive number

For example, the following sends a
[refund](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#refund)
with debug mode enabled:

```
const firebase_app_id = "FIREBASE_APP_ID";
const apiSecret = "API_SECRET";

fetch(`https://www.google-analytics.com/mp/collect?firebase_app_id=${firebaseAppId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "app_instance_id": "APP_INSTANCE_ID",
    "events": [{
      "name": "refund",
      "params": {
        "currency": "USD",
        "value": "9.99",
        "transaction_id": "ABC-123",
        "engagement_time_msec": 1200,
        "debug_mode": true
      }
    }]
  })
});
```

After you send events with debug mode enabled, follow the instructions for
[monitoring events using **DebugView**](https://support.google.com/analytics/answer/7201382)
to verify your implementation.

## Measurement protocol use cases

The Google Analytics Measurement Protocol lets you send offline data to your Web
or App stream, in addition to the data you're already collecting with tagging or
the Firebase SDK.

This guide describes common Google Analytics Measurement Protocol use cases and
their requirements.

**Key Term:** In this guide, "business day" is the business day of an event or
session in the
[time zone of your property](https://support.google.com/adsense/answer/9830725).

## Summary of requirements

This table provides a quick reference of the requirements for each use case.
Keep the following best practices in mind:

1. The `timestamp_micros` of events and user properties defaults to the request
   time. When sending an event or user property change that occurred in the
   past, override the timestamp as described in the
   [sending events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events)
   guide and the
   [user properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties)
   guide.
2. For accurate Realtime reports and engagement metrics, include the
   `engagement_time_msec` event parameter set to the milliseconds elapsed since
   the preceding event.

| Use case                                             | Session ID   | Request time requirement                                                                  | `timestamp_micros` requirement                       |
| :--------------------------------------------------- | :----------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| Assign User-ID to events                             | Required     | \<= end of the session start's business day                                               | \>= session start and \<= session end                |
| Session attribution                                  | Required     | \<= session start \+ 24 hours                                                             | \>= session start and \<= session end                |
| Export events to advertising platforms               | Not required | \<= last session day \+ 63 days                                                           | \>= request time minus 72 hours and \<= request time |
| Send events or user properties for audience creation | Not required | Web: \<= latest online event time \+ 30 days App: \<= latest online event time \+ 42 days | \>= request time minus 72 hours and \<= request time |

## Assign User-ID to events

Use the Measurement Protocol to provide online or offline events with a
[User-ID](https://support.google.com/analytics/answer/9213390).

Here are some example use cases for adding a User-ID to an event:

1. Your online measurement lacks the information needed to look up the User-ID
   for online events, but you have an event-processing pipeline that is able to
   make the association between an online session and a User-ID.  
   In this scenario, you are using the Measurement Protocol to provide _online_
   events with a User-ID.
2. You don't have the User-ID for events you are sending with the Measurement
   Protocol, but you want those events to be associated with a User-ID if the
   user logged in online over the course of the session.  
   In this scenario, you are using online events to provide _Measurement
   Protocol_ events with a User-ID.

Here are the requirements to add a User-ID to an event:

- Include the `session_id` in the event's parameter list.
- Send the Measurement Protocol events on the _same business day_ as the online
  session.
- If you override `timestamp_micros`, set it to a timestamp between the start
  and end time of the online session.
- If your goal is to provide User-ID for online events, set the `user_id` in the
  request.
- If your goal is for each Measurement Protocol event to have the User-ID from
  its corresponding online session, you don't need to set `user_id`.

## Session attribution

Measurement Protocol events that meet specific requirements appear in reports
with the same session attributes (such as geographic information, source,
medium, and campaign) as online events from the same session.

Here are the requirements for session attribution:

- Include the `session_id` in the event's parameter list.
- Send the request no later than 24 hours after the start of the online
  session.  
  For example, if the session started at 11:15 AM on Monday in your property's
  time zone, send the request before 11:15 AM on Tuesday.
- If you override `timestamp_micros`, set it to a timestamp between the start
  and end time of the online session.

## Export events to advertising platforms

Google Analytics includes the events you send using Measurement Protocol in
exports to linked advertising products such as Google Ads or Campaign Manager
360\.

**Tip:** This use case doesn't require **`session_id`**.

A few common scenarios where this is useful include:

- Your business has offline events that you want included in advertising
  attribution and reporting.
- You have additional events in a system that is not available to tagging or the
  Firebase SDK, but you still want to include those events in linked products.

Here are the requirements to export events to advertising platforms:

- Send the request no later than 63 days after the latest online event, even if
  the key event's attribution window is more than 63 days.  
  For example, if the latest online event for the `client_id` or
  `app_instance_id` occurred on March 1, send the Measurement Protocol event no
  later than May 3\.
- If you override `timestamp_micros`, set it to a timestamp within the last 72
  hours.

## Send events or user properties for audience creation

Events and user properties sent using Measurement Protocol are included in the
evaluation of
[audience conditions](https://support.google.com/analytics/answer/9267572) if
you adhere to a few requirements.

**Tip:** This use case doesn't require **`session_id`**.

Here are the requirements to send events or user properties for audience
creation:

- Send the request to a Web stream no later than 30 days after the latest online
  event for the same `client_id`.  
  For example, if the latest online event for the `client_id` occurred on March
  1, send the Measurement Protocol event no later than March 31\.
- Send the request to an App stream no later than 42 days after the latest
  online event for the same `app_instance_id`.  
  For example, if the latest online event for the `app_instance_id` occurred on
  March 1, send the Measurement Protocol event no later than April 12\.
- If you override `timestamp_micros`, set it to a timestamp within the last 72
  hours.
