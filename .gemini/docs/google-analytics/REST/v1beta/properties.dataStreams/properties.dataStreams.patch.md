# Method: properties.dataStreams.patch

Updates a DataStream on a property.

### HTTP request

`PATCH https://analyticsadmin.googleapis.com/v1beta/{dataStream.name=properties/*/dataStreams/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters        |                                                                                                                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dataStream.name` | `string` Output only. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000" |

### Query parameters

| Parameters   |                                                                                                                                                                                                                                                                                                          |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateMask` | `string (FieldMask format)` Required. The list of fields to be updated. Omitted fields will not be updated. To replace the entire entity, use one path with the string "\*" to match all fields. This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`. |

### Request body

The request body contains an instance of
[`DataStream`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams#DataStream).

### Response body

If successful, the response body contains an instance of
[`DataStream`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams#DataStream).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
