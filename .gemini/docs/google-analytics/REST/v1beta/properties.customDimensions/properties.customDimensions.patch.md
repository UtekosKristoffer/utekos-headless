# Method: properties.customDimensions.patch

Updates a CustomDimension on a property.

### HTTP request

`PATCH https://analyticsadmin.googleapis.com/v1beta/{customDimension.name=properties/*/customDimensions/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters             |                                                                                                                                         |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `customDimension.name` | `string` Output only. Resource name for this CustomDimension resource. Format: properties/{property}/customDimensions/{customDimension} |

### Query parameters

| Parameters   |                                                                                                                                                                                                                                                                                                          |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateMask` | `string (FieldMask format)` Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "\*" to match all fields. This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`. |

### Request body

The request body contains an instance of
[`CustomDimension`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customDimensions#CustomDimension).

### Response body

If successful, the response body contains an instance of
[`CustomDimension`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customDimensions#CustomDimension).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
