# Method: properties.keyEvents.delete

Deletes a Key Event.

### HTTP request

`DELETE https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/keyEvents/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                                             |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The resource name of the Key Event to delete. Format: properties/{property}/keyEvents/{keyEvent} Example: "properties/123/keyEvents/456" |

### Request body

The request body must be empty.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
