# REST Resource: properties.dataStreams.measurementProtocolSecrets

## Resource: MeasurementProtocolSecret

A secret value used for sending hits to Measurement Protocol.

| JSON representation                                                      |
| :----------------------------------------------------------------------- |
| `{   "name": string,   "displayName": string,   "secretValue": string }` |

| Fields        |                                                                                                                                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`        | `string` Output only. Resource name of this secret. This secret may be a child of any type of stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets/{measurementProtocolSecret} |
| `displayName` | `string` Required. Human-readable display name for this secret.                                                                                                                                                     |
| `secretValue` | `string` Output only. The measurement protocol secret value. Pass this value to the api_secret field of the Measurement Protocol API when sending hits to this secret's parent property.                            |

| Methods                                                                                                                                            |                                                                               |
| :------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| [`create`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets/create) | Creates a measurement protocol secret.                                        |
| [`delete`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets/delete) | Deletes target MeasurementProtocolSecret.                                     |
| [`get`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets/get)       | Lookup for a single MeasurementProtocolSecret.                                |
| [`list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets/list)     | Returns child MeasurementProtocolSecrets under the specified parent Property. |
| [`patch`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams.measurementProtocolSecrets/patch)   | Updates a measurement protocol secret.                                        |
