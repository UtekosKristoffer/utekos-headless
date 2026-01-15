# Method: properties.customMetrics.get

Lookup for a single CustomMetric.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/customMetrics/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                            |
| :--------- | :--------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The name of the CustomMetric to get. Example format: properties/1234/customMetrics/5678 |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`CustomMetric`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics#CustomMetric).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
