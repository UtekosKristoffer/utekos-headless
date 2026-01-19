# Method: properties.customMetrics.archive

Archives a CustomMetric on a property.

### HTTP request

`POST https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/customMetrics/*}:archive`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                |
| :--------- | :------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The name of the CustomMetric to archive. Example format: properties/1234/customMetrics/5678 |

### Request body

The request body must be empty.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
-
