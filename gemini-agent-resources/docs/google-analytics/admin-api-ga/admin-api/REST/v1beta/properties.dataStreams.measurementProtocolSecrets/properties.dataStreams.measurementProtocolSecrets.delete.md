# Method: properties.dataStreams.measurementProtocolSecrets.delete

Deletes target MeasurementProtocolSecret.

### HTTP request

`DELETE https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/dataStreams/*/measurementProtocolSecrets/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                                                                       |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`     | `string` Required. The name of the MeasurementProtocolSecret to delete. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} |

### Request body

The request body must be empty.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
