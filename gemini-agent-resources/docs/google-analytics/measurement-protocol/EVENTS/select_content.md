## `select_content`

This event signifies that a user has selected some content of a certain type.
This event can help you identify popular content and categories of content on
your website or app.

### Parameters

| Name           | Type     | Required | Example value | Description                                      |
| :------------- | :------- | :------- | :------------ | :----------------------------------------------- |
| `content_type` | `string` | No       | product       | The type of selected content.                    |
| `content_id`   | `string` | No       | C_12345       | An identifier for the content that was selected. |

### Send Event

[Try this event in the Google Analytics Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/?c=select_content)

```
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "select_content",
      "params": {
        "content_type": "product",
        "content_id": "C_12345"
      }
    }]
  })
```
