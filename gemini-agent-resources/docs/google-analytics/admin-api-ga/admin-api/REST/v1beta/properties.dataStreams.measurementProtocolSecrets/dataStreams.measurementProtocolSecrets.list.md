# Method: properties.dataStreams.measurementProtocolSecrets.list

Returns child MeasurementProtocolSecrets under the specified parent Property.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{parent=properties/*/dataStreams/*}/measurementProtocolSecrets`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                              |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. The resource name of the parent stream. Format: properties/{property}/dataStreams/{dataStream}/measurementProtocolSecrets |

### Query parameters

| Parameters  |                                                                                                                                                                                                                                                                             |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`  | `integer` The maximum number of resources to return. If unspecified, at most 10 resources will be returned. The maximum value is 10\. Higher values will be coerced to the maximum.                                                                                         |
| `pageToken` | `string` A page token, received from a previous `measurementProtocolSecrets.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `measurementProtocolSecrets.list` must match the call that provided the page token. |

### Request body

The request body must be empty.

### Response body

Response message for ListMeasurementProtocolSecret RPC

If successful, the response body contains data with the following structure:

| JSON representation                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------------- |
| `{   "measurementProtocolSecrets": [     {       object (MeasurementProtocolSecret)     }   ],   "nextPageToken": string }` |

| Fields                         |                                                                                                                                        |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `measurementProtocolSecrets[]` | `object (MeasurementProtocolSecret)` A list of secrets for the parent stream specified in the request.                                 |
| `nextPageToken`                | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
