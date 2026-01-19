# Method: properties.keyEvents.create

Creates a Key Event.

### HTTP request

`POST https://analyticsadmin.googleapis.com/v1beta/{parent=properties/*}/keyEvents`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                          |
| :--------- | :----------------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. The resource name of the parent property where this Key Event will be created. Format: properties/123 |

### Request body

The request body contains an instance of
[`KeyEvent`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.keyEvents#KeyEvent).

### Response body

If successful, the response body contains a newly created instance of
[`KeyEvent`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.keyEvents#KeyEvent).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
