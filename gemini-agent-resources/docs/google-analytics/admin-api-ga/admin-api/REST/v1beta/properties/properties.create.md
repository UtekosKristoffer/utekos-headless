# Method: properties.create

Creates a Google Analytics property with the specified location and attributes.

### HTTP request

`POST https://analyticsadmin.googleapis.com/v1beta/properties`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Request body

The request body contains an instance of
[`Property`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties#Property).

### Response body

If successful, the response body contains a newly created instance of
[`Property`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties#Property).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
