# Method: properties.customMetrics.create

Creates a CustomMetric.

### HTTP request

`POST https://analyticsadmin.googleapis.com/v1beta/{parent=properties/*}/customMetrics`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                    |
| :--------- | :------------------------------------------------- |
| `parent`   | `string` Required. Example format: properties/1234 |

### Request body

The request body contains an instance of
[`CustomMetric`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics#CustomMetric).

### Response body

If successful, the response body contains a newly created instance of
[`CustomMetric`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics#CustomMetric).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
