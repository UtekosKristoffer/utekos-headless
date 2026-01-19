# Method: properties.dataStreams.delete

Deletes a DataStream on a property.

### HTTP request

`DELETE https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/dataStreams/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                           |
| :--------- | :-------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The name of the DataStream to delete. Example format: properties/1234/dataStreams/5678 |

### Request body

The request body must be empty.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
-
