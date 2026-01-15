# Method: properties.delete

Marks target Property as soft-deleted (ie: "trashed") and returns it.

This API does not have a method to restore soft-deleted properties. However,
they can be restored using the Trash Can UI.

If the properties are not restored before the expiration time, the Property and
all child resources (eg: GoogleAdsLinks, Streams, AccessBindings) will be
permanently purged.
[https://support.google.com/analytics/answer/6154772](https://support.google.com/analytics/answer/6154772)

Returns an error if the target is not found.

### HTTP request

`DELETE https://analyticsadmin.googleapis.com/v1beta/{name=properties/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                         |
| :--------- | :---------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The name of the Property to soft-delete. Format: properties/{property_id} Example: "properties/1000" |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`Property`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties#Property).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
