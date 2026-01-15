## `sign_up`

This event indicates that a user has signed up for an account. Use this event to
understand the different behaviors of logged in and logged out users.

### Parameters

| Name     | Type     | Required | Example value | Description                  |
| :------- | :------- | :------- | :------------ | :--------------------------- |
| `method` | `string` | No       | Google        | The method used for sign up. |

### Send Event

[Try this event in the Google Analytics Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/?c=sign_up)

```
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "sign_up",
      "params": {
        "method": "Google"
      }
    }]
  })
});
```
