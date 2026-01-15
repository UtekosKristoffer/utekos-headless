## `campaign_details`

Use this event to send campaign details that will be applied to events with a
timestamp greater than or equal to the timestamp of the `campaign_details`
event.

**Note:** The **`campaign_details`** event won't be visible in Google Analytics
reports or DebugView. If you have BigQuery export enabled, this event will be
present in your BigQuery event export data.

### Parameters

| Name          | Type     | Required | Example value | Description                                                                                                                  |
| :------------ | :------- | :------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `campaign_id` | `string` | No       | google_1234   | The campaign id.                                                                                                             |
| `campaign`    | `string` | No       | Summer_fun    | The name used to identify a specific promotion or strategic campaign.                                                        |
| `source`      | `string` | No       | google        | The campaign traffic source (e.g. google, email, etc.).                                                                      |
| `medium`      | `string` | No       | cpc           | The campaign medium (e.g. email, cost-per-click, etc.)                                                                       |
| `term`        | `string` | No       | summer+travel | The campaign term used with paid search to supply the keywords for ads.                                                      |
| `content`     | `string` | No       | logolink      | The campaign content used for A/B testing and content-targeted ads to differentiate ads or links that point to the same URL. |

### Send Event

[Try this event in the Google Analytics Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/?c=campaign_details)

```
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "campaign_details",
      "params": {
        "campaign_id": "google_1234",
        "campaign": "Summer_fun",
        "source": "google",
        "medium": "cpc",
        "term": "summer+travel",
        "content": "logolink"
      }
    }]
  })
});
```
