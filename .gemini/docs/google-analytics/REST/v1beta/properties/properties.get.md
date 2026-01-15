# Method: properties.get

Lookup for a single GA Property.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{name=properties/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                    |
| :--------- | :----------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The name of the property to lookup. Format: properties/{property_id} Example: "properties/1000" |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`Property`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties#Property).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
