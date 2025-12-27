# Send User Properties

User properties describe segments of your user base, such as language preference
or geographic location. Analytics automatically logs some user properties. If
you want to collect additional properties, you can set up to 25 additional user
properties per project. See Custom user properties to learn how to set and
register user properties.

User properties enhance user segmentation, but user property data is often only
available server-side. The Measurement Protocol lets you augment client-side
measurements with server-side data, which is typically infeasible using only
client-side solutions.

## Reserved Names

Some user property names are reserved and cannot be used in measurements:

- `first_open_time`
- `first_visit_time`
- `last_deep_link_referrer`
- `user_id`
- `first_open_after_install`

Additionally, user property names cannot begin with:

- `google_`
- `ga_`
- `firebase_`

## Example Usage

### Firebase gtag.js

In the following example, your CRM has a user property (`customer_tier`) you
would like to add to your measurements. `customer_tier` can be set to one of
`premium` or `standard`. To get this user property in your reports, you would do
the following:

#### Step 1: Client-Side Implementation

First, have the client send an `add_payment_info` event along with a call to a
server API that has access to your CRM system:

```javascript
gtag('event', 'add_payment_info')
gtag('get', 'G-XXXXXXXXX', 'client_id', clientId => {
  ServerAPI.addCustomerTier(clientId, [{ name: 'add_payment_info' }])
})
```

**Prerequisites:**

- **Google Analytics Setup**: Ensure you have a Google Analytics 4 property set
  up and integrated into your website. Replace `G-XXXXXXXXX` with your actual
  Google Analytics Measurement ID.
- **Server-side API Integration**: The code assumes the existence of a
  `ServerAPI` object with an `addCustomerTier` method. This must be implemented
  on your server to handle incoming customer data.

**Code Explanation:**

1. **Logging a Google Analytics Event**

   ```javascript
   gtag('event', 'add_payment_info')
   ```

   This line sends an event to Google Analytics indicating that a user has
   initiated or completed an action related to adding payment information.

2. **Retrieving Client ID and Sending to Server API**

   ```javascript
   gtag('get', 'G-XXXXXXXXX', 'client_id', clientId => {
     ServerAPI.addCustomerTier(clientId, [{ name: 'add_payment_info' }])
   })
   ```

   - `gtag('get', ...)`: Retrieves a specific value from Google Analytics
   - `'G-XXXXXXXXX'`: Your Google Analytics 4 Measurement ID
   - `'client_id'`: The specific value to retrieve (uniquely identifies a user's
     browser or device)
   - `(clientId) => { ... }`: Callback function executed once the client_id is
     retrieved
   - `ServerAPI.addCustomerTier()`: Custom method that adds or updates customer
     information
   - `clientId`: The retrieved Google Analytics client_id passed to correlate
     client-side event with server-side user data
   - `[{name: "add_payment_info"}]`: Array informing the server API about the
     specific action that occurred

#### Step 2: Server-Side Implementation

Your server then augments the measurement with the `customer_tier` user property
using the Measurement Protocol:

> **Tip:** This sample shows how to send a user property along with an event.
> You can also send a request that only contains user properties, without any
> events.

```javascript
const measurementId = 'MEASUREMENT_ID'
const apiSecret = 'API_SECRET'

function addCustomerTier(clientId, events) {
  // Request the customer tier from the CRM.
  const customerTier = getCustomerTier(clientId)

  const queryParams = `?measurement_id=${measurementId}&api_secret=${apiSecret}`
  fetch(`https://www.google-analytics.com/mp/collect${queryParams}`, {
    method: 'POST',
    body: JSON.stringify({
      client_id: clientId,
      user_properties: {
        customer_tier: {
          value: 'CUSTOMER_TIER'
        }
      },
      events: JSON.parse(events)
    })
  })
}
```

**Prerequisites:**

- **Google Analytics 4 Setup**:
  - Create a GA4 property if you don't already have one
  - Obtain your `MEASUREMENT_ID` (format: `G-XXXXXXXXXX`)
  - Create an API Secret for the Measurement Protocol in your GA4 property
    settings
- **Development Environment**:
  - Node.js installed
  - Basic understanding of JavaScript

**Code Explanation:**

1. **Define Measurement ID and API Secret**

   ```javascript
   const measurementId = 'MEASUREMENT_ID'
   const apiSecret = 'API_SECRET'
   ```

   - `MEASUREMENT_ID`: Replace with your actual GA4 Measurement ID (e.g.,
     `G-XXXXXXXXXX`)
   - `API_SECRET`: Replace with the Measurement Protocol API Secret from your
     GA4 property settings

2. **Send Custom User Property and Events to GA4**

   ```javascript
   function addCustomerTier(clientId, events) {
     const customerTier = getCustomerTier(clientId)
     const queryParams = `?measurement_id=${measurementId}&api_secret=${apiSecret}`
     fetch(`https://www.google-analytics.com/mp/collect${queryParams}`, {
       method: 'POST',
       body: JSON.stringify({
         client_id: clientId,
         user_properties: {
           customer_tier: {
             value: 'CUSTOMER_TIER'
           }
         },
         events: JSON.parse(events)
       })
     })
   }
   ```

   - `getCustomerTier(clientId)`: Placeholder function to retrieve customer tier
     from CRM
   - `queryParams`: Constructs necessary query parameters for GA4 Measurement
     Protocol
   - `fetch`: POST request to GA4 Measurement Protocol endpoint
   - Request body contains:
     - `client_id`: Unique identifier for the user/client
     - `user_properties`: Custom user properties (e.g., `customer_tier`)
     - `events`: Array of event objects (parsed from JSON string)

This user property reports the two segments `premium` and `standard`.

> **Key Point:** User properties can improve segmentation using data that's only
> available server-side through use of the Measurement Protocol.

See Sending events for full details on how to send events using the Measurement
Protocol.

## Override Timestamp

The Measurement Protocol uses the first timestamp it finds in the following list
for each user property in the request:

1. The `timestamp_micros` of the entry in `user_properties`
2. The `timestamp_micros` of the request
3. The time that the Measurement Protocol receives the request

### Example 1: Request-Level Timestamp

The following example sends a request-level timestamp that applies to all of the
user properties in the request. As a result, the Measurement Protocol assigns
both the `customer_tier` and `customer_group` user properties a timestamp of
`requestUnixEpochTimeInMicros`.

```json
{
    "timestamp_micros": requestUnixEpochTimeInMicros,
    "user_properties": {
        "customer_tier": {
            "value": customerTierValue
        },
        "customer_group": {
            "value": customerGroupValue
        }
    }
}
```

**Prerequisites:**

- **Google Cloud Project Setup**: Ensure billing is enabled and necessary APIs
  (e.g., Google Analytics Data API) are activated
- **Firebase Project Setup** (if applicable): Ensure your app is connected to
  your Firebase project
- **Environment and Tooling**: Install necessary tools (Android Studio, Flutter,
  gcloud CLI) depending on implementation

**Code Explanation:**

- **Event Timestamp**: `timestamp_micros` represents the time the event occurred
  in microseconds since Unix epoch
- **User Properties**: Object containing custom attributes about the user
- **customer_tier**: Property representing loyalty level or subscription tier
  (e.g., 'Gold', 'Silver', 'Bronze')
- **customer_group**: Property categorizing users into segments (e.g.,
  'Wholesale', 'Retail', 'Premium')

### Example 2: Property-Level Timestamp

The following example sends both a request-level timestamp and a timestamp for
the `customer_tier` user property. As a result, the Measurement Protocol assigns
the `customer_tier` a timestamp of `customerTierUnixEpochTimeInMicros`, and the
`customer_group` a timestamp of `requestUnixEpochTimeInMicros`.

```json
{
    "timestamp_micros": requestUnixEpochTimeInMicros,
    "user_properties": {
        "customer_tier": {
            "value": customerTierValue,
            "timestamp_micros": customerTierUnixEpochTimeInMicros
        },
        "customer_group": {
            "value": customerGroupValue
        }
    }
}
```

**Prerequisites:**

- **Google Cloud Project Setup**: Create or select a project, enable billing and
  necessary APIs
- **Development Environment Setup**: Install gcloud CLI, Android Studio, or
  Flutter as needed

**Code Explanation:**

- **Event Timestamp**: `timestamp_micros` at request level for overall event
  timing
- **User Properties**: Contains custom user attributes
  - **customer_tier**:
    - `value`: The actual tier value (e.g., "Gold", "Silver", "Bronze")
    - `timestamp_micros`: Optional timestamp indicating when this specific tier
      value was set
  - **customer_group**:
    - `value`: The group identifier (e.g., "VIP", "New Users", "Promo Q4")

> **Tip:** Google Analytics uses the most recent value of a user property for
> each user. If you're sending user property changes that occurred in the past,
> override the timestamp to ensure that the user properties from Measurement
> Protocol don't override more recent changes from tagging or the Firebase SDK.
