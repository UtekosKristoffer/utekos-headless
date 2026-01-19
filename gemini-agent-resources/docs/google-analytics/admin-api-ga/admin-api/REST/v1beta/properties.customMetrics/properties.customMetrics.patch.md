# Method: properties.customMetrics.patch

Updates a CustomMetric on a property.

### HTTP request

`PATCH https://analyticsadmin.googleapis.com/v1beta/{customMetric.name=properties/*/customMetrics/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters          |                                                                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| `customMetric.name` | `string` Output only. Resource name for this CustomMetric resource. Format: properties/{property}/customMetrics/{customMetric} |

### Query parameters

| Parameters   |                                                                                                                                                                                                                                                                                                          |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateMask` | `string (FieldMask format)` Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "\*" to match all fields. This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`. |

### Request body

The request body contains an instance of
[`CustomMetric`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics#CustomMetric).

### Response body

If successful, the response body contains an instance of
[`CustomMetric`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics#CustomMetric).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
-
