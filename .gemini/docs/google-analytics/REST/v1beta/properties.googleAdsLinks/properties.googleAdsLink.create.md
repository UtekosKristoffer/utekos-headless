# Method: properties.googleAdsLinks.create

Creates a GoogleAdsLink.

### HTTP request

`POST https://analyticsadmin.googleapis.com/v1beta/{parent=properties/*}/googleAdsLinks`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                    |
| :--------- | :------------------------------------------------- |
| `parent`   | `string` Required. Example format: properties/1234 |

### Request body

The request body contains an instance of
[`GoogleAdsLink`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.googleAdsLinks#GoogleAdsLink).

### Response body

If successful, the response body contains a newly created instance of
[`GoogleAdsLink`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.googleAdsLinks#GoogleAdsLink).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
