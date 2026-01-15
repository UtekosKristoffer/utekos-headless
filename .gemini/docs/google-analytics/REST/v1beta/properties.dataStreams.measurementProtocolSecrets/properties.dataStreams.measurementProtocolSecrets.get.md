# Method: properties.dataStreams.measurementProtocolSecrets.get

Lookup for a single MeasurementProtocolSecret.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/dataStreams/*/measurementProtocolSecrets/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                                                                         |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The name of the measurement protocol secret to lookup. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`MeasurementProtocolSecret`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets#MeasurementProtocolSecret).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
