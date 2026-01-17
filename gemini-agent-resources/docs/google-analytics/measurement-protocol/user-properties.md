# Send user properties

-
-
-
-
-

User properties describe segments of your user base, such as language preference
or geographic location. Analytics
[automatically logs some user properties](https://support.google.com/analytics/answer/9268042).
If you want to collect additional properties, you can set up to 25 additional
user properties per project. See
[Custom user properties](https://support.google.com/analytics/answer/9269570) to
learn how to set and register user properties.

User properties enhance user segmentation, but user property data is often only
available server-side. The Measurement Protocol lets you augment client-side
measurements with server-side data, which is typically infeasible using only
client-side solutions.

## Reserved names

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

## Example usage

Firebase gtag.js

In the following example, your CRM has a user property (`customer_tier`) you
would like to add to your measurements. `customer_tier` can be set to one of
`premium` or `standard`. To get this user property in your reports, you would do
the following:

First, have the client send an
[`add_payment_info`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#add_payment_info)
event along with a call to a server API that has access to your CRM system:

**client code**

```
gtag('event', 'add_payment_info');
gtag('get', 'G-XXXXXXXXX', 'client_id', (clientId) => {
  ServerAPI.addCustomerTier(clientId, [{name: "add_payment_info"}]);
});
```

### Code Tutor

expand_more

Your server then augments the measurement with the `customer_tier` user property
using the Measurement Protocol:

**server code**

**Tip:** This sample shows how to send a user property along with an event. You
can also send a request that _only_ contains user properties, without any
events.

```
const measurementId = "MEASUREMENT_ID";
const apiSecret = "API_SECRET";

function addCustomerTier(clientId, events) {

  // Request the customer tier from the CRM.
  const customerTier = getCustomerTier(clientId);

  const queryParams = `?measurement_id=${measurementId}&api_secret=${apiSecret}`;
  fetch(`https://www.google-analytics.com/mp/collect${queryParams}`, {
    method: "POST",
    body: JSON.stringify({
      "client_id": clientId,
      "user_properties": {
        "customer_tier": {
          "value": "CUSTOMER_TIER"
        }
      },
      "events": JSON.parse(events)
    })
  });
}
```

### Code Tutor

expand_more

This user property reports the two segments `premium` and `standard`.

**Key Point:** User properties can improve segmentation using data that's only
available server-side through use of the Measurement Protocol.

See
[Sending events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events)
for full details on how to send events using the Measurement Protocol.

## Override timestamp

The Measurement Protocol uses the _first_ timestamp it finds in the following
list for each user property in the request:

1. The `timestamp_micros` of the entry in `user_properties`.
2. The `timestamp_micros` of the request.
3. The time that the Measurement Protocol receives the request.

The following example sends a request-level timestamp that applies to all of the
user properties in the request. As a result, the Measurement Protocol assigns
both the `customer_tier` and `customer_group` user properties a timestamp of
`requestUnixEpochTimeInMicros`.

```
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

### Code Tutor

expand_more

The following example sends both a request-level timestamp and a timestamp for
the `customer_tier` user property. As a result, the Measurement Protocol assigns
the `customer_tier` a timestamp of `customerTierUnixEpochTimeInMicros`, and the
`customer_group` a timestamp of `requestUnixEpochTimeInMicros`.

```
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
```

### Code Tutor

expand_more

**Tip:** Google Analytics uses the most recent value of a user property for each
user. If you're sending user property changes that occurred in the past,
override the timestamp to ensure that the user properties from Measurement
Protocol don't override more recent changes from tagging or the Firebase SDK.
