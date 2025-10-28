# Payload Helper

> Fill out the required and recommended data parameter fields to see how your
> payload should be structured when it's sent to Facebook from your server.

Web, app, and physical store events shared using the Conversions API require
specific parameters. The list of required parameters is available here.

---

## Selected Product

- **Name:** Selected Product
- **Identifier:** `selectedProduct`

## Website

<span>&#8203;</span>

---

## Event Type Parameters

The fields `event_name`, `event_time`, and `action_source` are required for all
events while `event_id` is recommended for deduplication. Additionally, the
fields `client_user_agent` and `event_source_url` are required for website
events.

### Required Fields

| Field         | Type   | Value        | Notes    |
| ------------- | ------ | ------------ | -------- |
| event_name    | string | `Purchase`   | Required |
| event_time    | int    | `1761311305` | Required |
| action_source | string | `website`    | Required |

### Recommended Field

- `event_id∙Optional`
  - **Type:** `string`

**Action:** Add Event Type Parameters

---

## Customer Information Parameters

Include at least one customer information parameter for each event you want to
send. Facebook will use this data for the purposes described in its Business
Tools Terms, including ads attribution and ads delivery optimization.

All customer information parameters should be hashed as SHA256, except for
client IP address, client user agent, click ID, and browser ID. Any other
customer information parameters that are not hashed are automatically rejected
by Facebook.

### Email (em)∙ Optional

- **Type:** `string` | Must be hashed
- **Value:** `7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068`
- **Controls:** Delete field · Close · Normalize · Hash · Add another value

### Phone number (ph)∙ Optional

- **Type:** `string` | Must be hashed
- **Value:** `16505551234`
- **Controls:** Delete field · Normalize · Hash · Add another value

**Action:** Add Customer Information Parameters

---

## Custom Data Parameters

| Parameter          | Type   | Value    | Notes |
| ------------------ | ------ | -------- | ----- |
| currency∙ Optional | string | `USD`    |       |
| value∙ Optional    | float  | `142,52` |       |

**Action:** Add Custom Data Parameters

---

## Attribution Data Parameters

| Parameter                   | Type  | Value |
| --------------------------- | ----- | ----- |
| attribution_share∙ Optional | float | `0,3` |

**Action:** Add Attribution Data Parameters

---

## Original Event Data Parameters

| Parameter            | Type   | Value        |
| -------------------- | ------ | ------------ |
| event_name∙ Optional | string | `Purchase`   |
| event_time∙ Optional | int    | `1761311305` |

**Action:** Add Original Event Data Parameters

---

## Generate Code

### Node.js Example

```javascript
'use strict'
const bizSdk = require('facebook-nodejs-business-sdk')
const ServerEvent = bizSdk.ServerEvent
const EventRequest = bizSdk.EventRequest
const UserData = bizSdk.UserData
const CustomData = bizSdk.CustomData
const Content = bizSdk.Content

const access_token = '<ACCESS_TOKEN>'
const pixel_id = '<ADS_PIXEL_ID>'
const api = bizSdk.FacebookAdsApi.init(access_token)

let current_timestamp = Math.floor(new Date() / 1000)

const userData_0 = new UserData()
  .setEmails([
    '7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068'
  ])
  .setPhones([])
const customData_0 = new CustomData().setValue(142.52).setCurrency('USD')
const serverEvent_0 = new ServerEvent()
  .setEventName('Purchase')
  .setEventTime(1761311305)
  .setUserData(userData_0)
  .setCustomData(customData_0)
  .setActionSource('website')

const eventsData = [serverEvent_0]
const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
  eventsData
)
eventRequest.execute()
```

### curl Example

```javascript
'use strict'
const bizSdk = require('facebook-nodejs-business-sdk')
const ServerEvent = bizSdk.ServerEvent
const EventRequest = bizSdk.EventRequest
const UserData = bizSdk.UserData
const CustomData = bizSdk.CustomData
const Content = bizSdk.Content

const access_token = '<ACCESS_TOKEN>'
const pixel_id = '<ADS_PIXEL_ID>'
const api = bizSdk.FacebookAdsApi.init(access_token)

let current_timestamp = Math.floor(new Date() / 1000)

const userData_0 = new UserData()
  .setEmails([
    '7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068'
  ])
  .setPhones([])
const customData_0 = new CustomData().setValue(142.52).setCurrency('USD')
const serverEvent_0 = new ServerEvent()
  .setEventName('Purchase')
  .setEventTime(1761311305)
  .setUserData(userData_0)
  .setCustomData(customData_0)
  .setActionSource('website')

const eventsData = [serverEvent_0]
const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
  eventsData
)
eventRequest.execute()
```

---

## Final Notes

- You can add multiple values to most customer information parameters.
- Learn more
- There are no errors found.

### Test this Payload

- Enter a dataset ID (formerly pixel)
- Send to Test Events
- Open Graph Explorer
