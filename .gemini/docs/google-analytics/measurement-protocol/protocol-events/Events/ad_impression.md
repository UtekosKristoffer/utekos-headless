## `ad_impression`

This event is available only for App streams.

Use this event when a user sees an ad impression.

* An `ad_impression` sent using the Measurement Protocol will *not* be included in exports to other advertising platforms such as Google Ads.  
* Sending `ad_impression` events using the Measurement Protocol can cause duplicate impressions if you've configured tagging or the SDK for your linked [Google advertising products](https://support.google.com/analytics/answer/12800258). Only send an `ad_impression` event using the Measurement Protocol if the event wasn't captured by tagging or the SDK.

### Parameters

| Name | Type | Required | Example value | Description |
| :---- | :---- | :---- | :---- | :---- |
| `ad_platform` | `string` | No | MoPub | The ad platform. |
| `ad_source` | `string` | No | AdColony | The ad source. |
| `ad_format` | `string` | No | Banner | The ad format. |
| `ad_unit_name` | `string` | No | Banner\_03 | The ad unit name. |
| `currency` | `string` | No | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | No | 3.99 |  The value of the ad impression. \* `value` is typically required for meaningful reporting. \* `currency` is required if you set `value`. |

### Send Event

[Try this event in the Google Analytics Event Builder](https://ga-dev-tools.google/ga4/event-builder/?c=ad_impression)

```
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "app_instance_id": "app_instance_id",
    "events":[{
      "name":"ad_impression",
      "params":{
        "ad_platform": "MoPub",
        "ad_source": "AdColony",
        "ad_format": "Banner",
        "ad_unit_name": "Banner_03",
        "currency": "USD",
        "value": 3.99
      }
    }]
  })
});
```
