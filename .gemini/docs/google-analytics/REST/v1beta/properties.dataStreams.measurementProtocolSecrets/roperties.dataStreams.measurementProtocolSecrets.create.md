# Method: properties.dataStreams.measurementProtocolSecrets.create

Creates a measurement protocol secret.

### HTTP request

`POST https://analyticsadmin.googleapis.com/v1beta/{parent=properties/*/dataStreams/*}/measurementProtocolSecrets`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                  |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. The parent resource where this secret will be created. Format: properties/{property}/dataStreams/{dataStream} |

### Request body

The request body contains an instance of
[`MeasurementProtocolSecret`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets#MeasurementProtocolSecret).

### Response body

If successful, the response body contains a newly created instance of
[`MeasurementProtocolSecret`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets#MeasurementProtocolSecret).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
