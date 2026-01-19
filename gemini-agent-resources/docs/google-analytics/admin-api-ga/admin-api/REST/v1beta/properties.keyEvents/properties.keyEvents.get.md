# Method: properties.keyEvents.get

Retrieve a single Key Event.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/keyEvents/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                                               |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`     | `string` Required. The resource name of the Key Event to retrieve. Format: properties/{property}/keyEvents/{keyEvent} Example: "properties/123/keyEvents/456" |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`KeyEvent`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.keyEvents#KeyEvent).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
