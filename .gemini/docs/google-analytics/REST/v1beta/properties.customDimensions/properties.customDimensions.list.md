# properties.customDimensions.list

Lists CustomDimensions on a property.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{parent=properties/*}/customDimensions`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                    |
| :--------- | :------------------------------------------------- |
| `parent`   | `string` Required. Example format: properties/1234 |

### Query parameters

| Parameters  |                                                                                                                                                                                                                                                         |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pageSize`  | `integer` The maximum number of resources to return. If unspecified, at most 50 resources will be returned. The maximum value is 200 (higher values will be coerced to the maximum).                                                                    |
| `pageToken` | `string` A page token, received from a previous `customDimensions.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `customDimensions.list` must match the call that provided the page token. |

### Request body

The request body must be empty.

### Response body

Response message for customDimensions.list RPC.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                     |
| :------------------------------------------------------------------------------------------------------ |
| `{   "customDimensions": [     {       object (CustomDimension)     }   ],   "nextPageToken": string }` |

| Fields               |                                                                                                                                        |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `customDimensions[]` | `object (CustomDimension)` List of CustomDimensions.                                                                                   |
| `nextPageToken`      | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
-
