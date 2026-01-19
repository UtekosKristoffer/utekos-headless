# Method: properties.keyEvents.list

Returns a list of Key Events in the specified parent property. Returns an empty
list if no Key Events are found.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{parent=properties/*}/keyEvents`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                        |
| :--------- | :------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. The resource name of the parent property. Example: 'properties/123' |

### Query parameters

| Parameters  |                                                                                                                                                                                                                                           |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`  | `integer` The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum)                                                      |
| `pageToken` | `string` A page token, received from a previous `keyEvents.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `keyEvents.list` must match the call that provided the page token. |

### Request body

The request body must be empty.

### Response body

Response message for keyEvents.list RPC.

If successful, the response body contains data with the following structure:

| JSON representation                                                                       |
| :---------------------------------------------------------------------------------------- |
| `{   "keyEvents": [     {       object (KeyEvent)     }   ],   "nextPageToken": string }` |

| Fields          |                                                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `keyEvents[]`   | `object (KeyEvent)` The requested Key Events                                                                                           |
| `nextPageToken` | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
