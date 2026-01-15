## `search`

Log this event to indicate when the user has performed a search. You can use
this event to identify what users are searching for on your website or app. For
example, you could send this event when a user views a search results page after
performing a search.

### Parameters

| Name          | Type     | Required | Example value | Description                     |
| :------------ | :------- | :------- | :------------ | :------------------------------ |
| `search_term` | `string` | Yes      | t-shirts      | The term that was searched for. |

### Send Event

[Try this event in the Google Analytics Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/?c=search)

```
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "search",
      "params": {
        "search_term": "t-shirts"
      }
    }]
  })
});
```
