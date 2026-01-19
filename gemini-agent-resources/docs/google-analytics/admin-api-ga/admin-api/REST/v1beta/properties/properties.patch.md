# Method: properties.patch

Updates a property.

### HTTP request

`PATCH https://analyticsadmin.googleapis.com/v1beta/{property.name=properties/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters      |                                                                                                                   |
| :-------------- | :---------------------------------------------------------------------------------------------------------------- |
| `property.name` | `string` Output only. Resource name of this property. Format: properties/{property_id} Example: "properties/1000" |

### Query parameters

| Parameters   |                                                                                                                                                                                                                                                                                                                                                                       |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateMask` | `string (FieldMask format)` Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "\*" to match all fields. This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`. |

### Request body

The request body contains an instance of
[`Property`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties#Property).

### Response body

If successful, the response body contains an instance of
[`Property`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties#Property).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
