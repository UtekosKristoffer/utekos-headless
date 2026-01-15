# Method: properties.dataStreams.measurementProtocolSecrets.patch

Updates a measurement protocol secret.

### HTTP request

`PATCH https://analyticsadmin.googleapis.com/v1beta/{measurementProtocolSecret.name=properties/*/dataStreams/*/measurementProtocolSecrets/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters                       |                                                                                                                                                                                                                     |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `measurementProtocolSecret.name` | `string` Output only. Resource name of this secret. This secret may be a child of any type of stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} |

### Query parameters

| Parameters   |                                                                                                                                                                                                                     |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `updateMask` | `string (FieldMask format)` Required. The list of fields to be updated. Omitted fields will not be updated. This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`. |

### Request body

The request body contains an instance of
[`MeasurementProtocolSecret`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets#MeasurementProtocolSecret).

### Response body

If successful, the response body contains an instance of
[`MeasurementProtocolSecret`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets#MeasurementProtocolSecret).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
