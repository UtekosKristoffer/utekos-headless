# Measurement protocol use cases

The Google Analytics Measurement Protocol lets you send offline data to your Web
or App stream, in addition to the data you're already collecting with tagging or
the Firebase SDK.

This guide describes common Google Analytics Measurement Protocol use cases and
their requirements.

> [!IMPORTANT] **Key Term:** In this guide, "business day" is the business day
> of an event or session in the
> [time zone of your property](https://support.google.com/adsense/answer/9830725).

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

| Use case                                             | Session ID   | Request time requirement                                                                | `timestamp_micros` requirement                       |
| ---------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Assign User-ID to events                             | Required     | \<= end of the session start's business day                                             | \>= session start and \<= session end                |
| Session attribution                                  | Required     | \<= session start + 24 hours                                                            | \>= session start and \<= session end                |
| Export events to advertising platforms               | Not required | \<= last session day + 63 days                                                          | \>= request time minus 72 hours and \<= request time |
| Send events or user properties for audience creation | Not required | Web: \<= latest online event time + 30 days App: \<= latest online event time + 42 days | \>= request time minus 72 hours and \<= request time |

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
- Send the request no later than 24 hours after the start of the online session.

  For example, if the session started at 11:15 AM on Monday in your property's
  time zone, send the request before 11:15 AM on Tuesday.

- If you override `timestamp_micros`, set it to a timestamp between the start
  and end time of the online session.

## Export events to advertising platforms

Google Analytics includes the events you send using Measurement Protocol in
exports to linked advertising products such as Google Ads or Campaign
Manager 360.

> [!TIP] **Tip:** This use case doesn't require `session_id`.

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
  later than May 3.

- If you override `timestamp_micros`, set it to a timestamp within the last 72
  hours.

## Send events or user properties for audience creation

Events and user properties sent using Measurement Protocol are included in the
evaluation of
[audience conditions](https://support.google.com/analytics/answer/9267572) if
you adhere to a few requirements.

> [!TIP] **Tip:** This use case doesn't require `session_id`.

Here are the requirements to send events or user properties for audience
creation:

- Send the request to a Web stream no later than 30 days after the latest online
  event for the same `client_id`.

  For example, if the latest online event for the `client_id` occurred on March
  1, send the Measurement Protocol event no later than March 31.

- Send the request to an App stream no later than 42 days after the latest
  online event for the same `app_instance_id`.

  For example, if the latest online event for the `app_instance_id` occurred on
  March 1, send the Measurement Protocol event no later than April 12.

- If you override `timestamp_micros`, set it to a timestamp within the last 72
  hours.
