# Best Practices - Conversions API

Use these best practices as general recommendations to successfully integrate
the Conversions API. These recommendations are designed to help you make the
most effective use of the Conversions API. Follow the implementation and
post-implementation recommendations to ensure a smooth integration and optimal
results when sharing data with Meta.

## Overview

In addition to the following best practices, we recommend that you watch this
video for a more hands-on tutorial on using the Conversions API. The video
guides you through how to:

- Send Requests
- Handle Dropped Events, Event Transaction Time, and Batch Requests
- Verify Events
- Use the Test Events Tool

Web, app, and physical store events shared using the Conversions API require
specific parameters. The list of required parameters is available here.

## Implementation

### Campaign Setup

When setting up your campaign, simplify the account structure and use the
following established campaign best practices:

- Implement Learning Phase best practices
- Refrain from making significant campaign edits
- Minimize Auction Overlap
- Select Automatic Placements and Campaign Budget Optimization
- Choose the right bid strategy based on your business goals

### Set Up Redundant Events

We recommend that you use the Conversions API in addition to the Meta Pixel, and
that you share the same events using both tools. We call this a redundant event
setup. For example, if you share Purchase, Initiate Checkout, and Contact events
using the Meta Pixel, you should also share those same events from your server
using the Conversions API.

The Conversions API allows you to share website events that the Pixel may lose
due to network connectivity issues or page loading errors. The Conversions API
can also be used to share other types of important events and data that occur
offline or at a later time that the Pixel cannot.

### Ensure Redundant Events Can Be Deduplicated

When sending redundant events using the Meta Pixel and Conversions API, ensure
that both events use the identical `event_name` and that either `event_id` or a
combination of `external_id` and `fbp` are included. We recommend including all
of these parameters to help Meta properly deduplicate events and reduce double
reporting of identical events. Learn more about deduplication, when it's
necessary and how to set it up.

### Send Required and Recommended Parameters

The following server event and customer information parameters are required:

| Parameter           | Type                 | When Required      |
| ------------------- | -------------------- | ------------------ |
| `action_source`     | Server event         | All events         |
| `event_source_url`  | Server event         | All website events |
| `client_user_agent` | Customer information | All website events |

By using the Conversions API, you agree that the `action_source` parameter is
accurate to the best of your knowledge. We also recommend including the
`external_id` and `event_id` event parameters for all events.

Sending additional customer information parameters may help increase Event Match
Quality. Only matched events can be used for ads attribution and ad delivery
optimization, and the higher the matching quality, the better. While unmatched
events cannot be used for attribution or ad delivery optimization, they can
still be used for basic measurement. Examples of high-quality customer
information parameters include:

- email address (`em`)
- IP address (`client_ip_address`)
- name (`fn` and `ln`)
- phone number (`ph`)

### Baseline Requirements for Matching

Following the release of Graph API version 13.0, we will be updating the
baseline requirements for which combinations of customer information parameters
are considered valid with a Conversions API event. These changes will help us
provide better feedback for when an event has a combination of customer
information parameters that is so broad that it is unlikely to be effective for
matching.

An event is considered invalid if it only includes customer information
parameters that consist of one of the following combinations, (or a subset
thereof):

- `ct` + `country` + `st` + `zp` + `ge` + `client_user_agent`
- `db` + `client_user_agent`
- `fn` + `ge`
- `ln` + `ge`

For example, if an event had only the customer information parameters `ge`,
`ct`, `st`, and `country` (this could correspond to a man, in Menlo Park,
California, USA), it would be rejected because those customer information
parameters are a subset of one of the above combinations.

### Ensure fbp and fbc Parameters Are Refreshed

The `fbp` and `fbc` parameters are cookie values typically set on your site
visitors' browsers in connection with Meta's first-party cookie solution, and
are subject to change. If you send them as user parameters, you should regularly
refresh their values.

These values will be set as first-party cookies when the Meta Pixel is
implemented on your website and can be retrieved for use in Conversions API
requests.

### Share Events Closer to Real Time

Sharing events when they happen can help your campaigns achieve the best
results. You can share server events using the Conversions API in real time or
in batches close to real time.

### Use Test Events

We recommend using the Test Events tool to validate your Conversions API
connection. Typically, developers should use their own customer information
parameters (for example, name, email address, phone number) for test events,
because these events may get discarded if they don't match a Facebook or Meta
account.

You can use the Test Events tool to:

- Verify that you've set up your server events correctly and we've received
  them.
- Verify that you've deduplicated events correctly by seeing which events were
  processed and deduplicated.
- Debug any unusual activity.

Learn how to test your server events using the Test Events tool.

### Use Payload Helper

Fill out the required and recommended data parameter fields in the Payload
Helper tool to see how your payload should be structured and to get
recommendations for which parameters to include.

### Use Our Business SDK

The code samples in our documentation include Business SDK examples in Python,
Java, Ruby, PHP, and Node. They can save some development effort, such as
hashing user parameters, which is done automatically in the Business SDK.

If you are not planning to use the Business SDK, we recommend that you implement
hashing.

### Use the Conversions API for Offline Events

The Conversions API supports all offline events and should be used as the
comprehensive container for these types of events. Examples include physical
store sales, phone calls, actions taken on devices (such as smart TVs or game
consoles), and offline subscriptions.

When sending offline events, be sure to include the `action_source` event
parameter, and choose the appropriate value (should not be website). The action
source is required to determine the campaign objectives for which the event is
intended.

By using the Conversions API, you agree that the `action_source` parameter is
accurate to the best of your knowledge.

## Additional Best Practices for Partners

### Agencies: Send partner_agent String

Partners or agencies that share events on behalf of their advertisers should
send a unique `partner_agent` string, including platform name as documented. If
applicable, work with your dedicated Meta representative to decide on a suitable
agent string.

### Website Platforms: Onboarding Advertisers

By default, website platform partners may consider whether to offer Conversions
API selectively or to opt-in advertisers. The Meta Pixel and Conversions API
share the same business terms, and we recommend that you opt-in your customers
to also share their data using the Conversions API when they set up the Meta
Pixel. While we believe using both tools will strengthen and secure their
data-sharing for the long term, we also suggest that you provide your customers
with information about both the Conversions API and Meta Pixel to help inform
their choice.

## Post-Implementation

### Check Event Match Quality

If you share server events using the Conversions API, you can see the Event
Match Quality (EMQ) for each event in Events Manager. An event's EMQ score (out
of 10) indicates how effective your server event's customer information may be
at matching it to a Facebook or Meta account. Learn more about EMQ best
practices here.

Event Match Quality is currently available only for web events. For other event
types such as offline and physical store events, app events, conversion leads or
any integration under alpha or beta stages, contact your Meta representative for
guidance on improving event match quality.

### Run a Test

When using the Conversions API, we recommend that you test and optimize your
Meta advertising strategy. Some testing options include:

- **Conversion Lift Study**: Understand the incremental performance impact of
  using server events.
- **Split Testing**: Understand which campaign strategy achieves the best and
  most efficient outcomes to optimize performance.
