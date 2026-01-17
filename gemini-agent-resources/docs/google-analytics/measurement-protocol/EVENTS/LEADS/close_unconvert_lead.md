## `close_unconvert_lead`

This event measures when a user is marked as not becoming a converted lead,
along with the reason.

### Parameters

| Name                    | Type     | Required | Example value   | Description                                                                                                                                                                                                                                                                  |
| :---------------------- | :------- | :------- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`              | `string` | Yes\*    | USD             | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. \* If you set `value` then `currency` is required for revenue metrics to be computed accurately.                                                   |
| `value`                 | `number` | Yes\*    | 30.03           | The monetary value of the event. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `unconvert_lead_reason` | `string` | No       | Never responded | The reason the lead was unconverted.                                                                                                                                                                                                                                         |

### Send Event

[Try this event in the Google Analytics Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/?c=close_unconvert_lead)

```
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "close_unconvert_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "unconvert_lead_reason": "Never responded"
      }
    }]
  })
});
```
