# Method: properties.googleAdsLinks.delete

Deletes a GoogleAdsLink on a property

### HTTP request

`DELETE https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/googleAdsLinks/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                        |
| :--------- | :--------------------------------------------------------------------- |
| `name`     | `string` Required. Example format: properties/1234/googleAdsLinks/5678 |

### Request body

The request body must be empty.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
