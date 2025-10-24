# Meta Conversions API

## Overview

The **Conversions API** is designed to create a connection between an
advertiser's marketing data (such as website events, app events, business
messaging events and offline conversions) from an advertiser's server, website
platform, mobile app, or CRM to Meta systems that optimize ad targeting,
decrease cost per result and measure outcomes.

Server events are linked to a dataset ID and are processed like events sent
using the Meta Pixel, Facebook SDK for iOS or Android, mobile measurement
partner SDK, offline event set, or `.csv` upload. This means that server events
may be used in measurement, reporting, or optimization in a similar way as other
connection channels.

> **Recommendation:** For optimal ad performance and measurement, advertisers
> should follow the Conversions API best practices.

---

## About Conversions API

### Purpose

The Conversions API creates a direct connection between your marketing data and
Meta's ad optimization systems that help:

- Optimize ad targeting
- Decrease cost per result
- Measure outcomes across Meta technologies

### Marketing Data Includes

- Website events
- App events
- Offline conversions
- Messaging events

> **Note:** Offline conversions can be used for ad optimization within a Sales
> Objective campaign when you select "Website and in-store."

---

## Event Data Management

The Conversions API can help you manage event data with a single API.

### Supported Event Sources

- Websites
- Physical stores
- Email
- Business chat
- Phone
- Mobile app
- Offline

> **Important Notice:** Offline Conversions API will be discontinued in **May
> 2025**. At that time, you will no longer be able to use the Offline
> Conversions API to upload events to offline event sets. We recommend that you
> upload events to datasets instead and convert your Offline Conversions API
> integration into a Conversions API integration.

---

## Key Benefits (For Website Events)

Using the Conversions API for website events can help you:

### 1. Improve Connectivity, Reducing Cost Per Result

- Data from the Conversions API is less impacted than the Meta Pixel by browser
  loading errors, connectivity issues and ad blockers
- When used alongside the pixel, creates a more reliable connection that helps
  the ad delivery system decrease your cost per result

### 2. Optimize Ads for Later Customer Journey Actions

- Includes post-purchase actions (e.g., subscriptions), in-store actions, and
  customer scores

### 3. Improve Measurement

- Better measure ad performance and attribution across the customer journey

### 4. Increase Event Matching, Reducing Cost Per Result

- Include additional customer information parameters that help increase matched
  events and your event match quality

---

## Integration with Meta Pixel

> **Recommendation:** If you use the Conversions API to send website events,
> consider also using the pixel to help maximize the effectiveness of your
> website events.

### Website Events Sent Through the Conversions API

- Are linked to your pixel and behave like events sent through the pixel
- Used for the same types of ad optimization
- Appear in the same surfaces (Meta Ads Manager and Meta Events Manager)
- Follow the off-Facebook activity tool and third-party data ads personalization
  control
- Subject to Meta Business Tools terms restrictions

> **Privacy Note:** Like the pixel, the Conversions API isn't designed to be a
> means to bypass data-sharing policies such as the iOS App Tracking
> Transparency framework or privacy rules in Europe such as the ePrivacy
> Directive.

---

## Key Benefits (For Offline Events)

When you use the Conversions API to send offline events, it may help you:

- Measure in-store outcomes driven by your Meta ads
- Create custom audiences and lookalike audiences based on your offline events
- Run lift studies to understand the impact of Meta ads on your in-store
  purchases

---

## iOS 14.5 Updates: Aggregated Event Measurement

Meta's **Aggregated Event Measurement** is a protocol that allows for
measurement of web and app events from people using iOS 14.5 or later devices.

### Current Limitations

- Aggregated Event Measurement limits domains and mobile apps to **8 conversion
  events** that can be configured and prioritized

### Resources

- Visit our
  [Domain Verification guide](https://www.facebook.com/business/help/286768115176155)
  to verify your domain ownership for Aggregated Event Measurement

---

## Best Practices for Conversions API

> **Applies to:** Businesses that use the Conversions API to send website
> events.

### 1. Redundant Setups

**Best Practice:** Use the Conversions API alongside the Meta Pixel, sharing the
same events through both tools. This is known as a **redundant event setup**.

**Why It's Beneficial:** The Conversions API can capture website events that the
pixel might miss due to network issues or page loading errors.

#### Event Coverage

- **Target:** Aim for a **75% event coverage ratio** of Conversions API to Meta
  Pixel events for accurate reporting and optimal ad performance
- Achieve this by sending all relevant events through the Conversions API,
  including those potentially lost due to browser restrictions or technical
  issues

#### Deduplication

- Deduplicate redundant events to avoid double reporting
- Deduplication allows you to keep one event and discard duplicates
- Indicate whether an event is a duplicate by including specific parameters

### 2. Event Match Quality

**Goal:** Aim to improve event match quality, which indicates how effectively
customer information parameters match events with a Meta account.

**Benefits:** Better event match quality can increase additional conversions
reported.

#### How to Improve

- Include parameters to improve your event match quality in Meta Events Manager
- Increase coverage of customer information parameters
- More events with these parameters increase the likelihood of a match

> **Privacy Requirement:** Ensure you have obtained lawful permissions and
> necessary consents before sharing information with third parties.

- Prioritize customer information parameters that are likely to improve event
  match quality

### 3. Other Best Practices

- **Real-Time Event Sharing:** Share your events in real time or as close to
  real time as possible
- **Expand Integration:** Connect more pixels and share more events, if
  applicable
- **Regular Monitoring:** Continue to monitor your Conversions API setup
  regularly
- **Opportunity Score:** Apply opportunity score recommendations when they're
  available

---

## Parameters

Website events shared using the Conversions API require the `client_user_agent`,
`action_source`, and `event_source_url` parameters, while non-web events require
only `action_source`.

> By using the Conversions API, you agree that the `action_source` parameter is
> accurate to the best of your knowledge.

### Key Customer Information Parameters

| Parameter           | Description       | Hashing Required |
| ------------------- | ----------------- | ---------------- |
| `em`                | Email             | ✅ Yes           |
| `ph`                | Phone Number      | ✅ Yes           |
| `fn`                | First Name        | ✅ Yes           |
| `ln`                | Last Name         | ✅ Yes           |
| `ge`                | Gender            | ✅ Yes           |
| `db`                | Date of Birth     | ✅ Yes           |
| `ct`                | City              | ✅ Yes           |
| `st`                | State             | ✅ Yes           |
| `zp`                | Zip Code          | ✅ Yes           |
| `country`           | Country           | ✅ Yes           |
| `external_id`       | External ID       | ⚠️ Recommended   |
| `client_ip_address` | Client IP Address | ❌ No            |
| `client_user_agent` | Client User Agent | ❌ No            |
| `fbc`               | Click ID          | ❌ No            |
| `fbp`               | Browser ID        | ❌ No            |

### Key Server Event Parameters

- `event_name`
- `event_time`
- `user_data`
- `custom_data`
- `event_source_url`
- `opt_out`
- `event_id`
- `action_source`

---

## ClickID (fbc) and fbp Parameters

> **Recommendation:** We recommend that you always send `_fbc` and `_fbp`
> browser cookie values in the `fbc` and `fbp` event parameters, respectively,
> when available.

### What Is Meta's ClickID

ClickID is a Meta-generated parameter that is passed with the URL when a user
clicks an ad.

**Example:** `.../?fbclid=IwAR...`

### Format ClickID (fbc)

The formatted ClickID value must be of the form:

```
version.subdomainIndex.creationTime.<fbclid>
```

**Components:**

- `version` is always this prefix: `fb`
- `subdomainIndex` is which domain the cookie is defined on. If generating on a
  server, use the value `1`
- `creationTime` is the UNIX time since epoch in milliseconds
- `<fbclid>` is the value for the fbclid query parameter

### Store ClickID

It is highly recommended to set `_fbc` as:

- HTTP cookie with the **90 days expiration time**

### fbp Parameter

The `fbp` event parameter value must be of the form:

```
version.subdomainIndex.creationTime.randomnumber
```

**Components:**

- `version` is always this prefix: `fb`
- `subdomainIndex`: If generating on a server, use the value `1`

---

## External ID

`external_id` is a string that represents a user on an advertiser's system. You
must be consistent across channels.

### How It Works

**Step 1:** You send us an event with `external_id` and customer information
parameters.

**Step 2:** We look for a match. If we find a match, we associate the
`external_id`.

**Step 3:** In subsequent events, you can send us an event containing only
`external_id`.

> **Note:** The `external_id` to specific user matches expire periodically. We
> recommend that you refresh it as frequently as possible.

### fbp Parameter (as External ID)

If your system is not set up for `external_id`, we can mitigate the problem by
using the `fbp` parameter as an external ID.

> **Important:** `external_id` is always favored, since it offers improved
> performance.
