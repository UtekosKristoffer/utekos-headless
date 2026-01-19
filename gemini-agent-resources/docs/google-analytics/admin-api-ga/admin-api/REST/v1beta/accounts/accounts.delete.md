# Method: accounts.delete

Marks target Account as soft-deleted (ie: "trashed") and returns it.

This API does not have a method to restore soft-deleted accounts. However, they
can be restored using the Trash Can UI.

If the accounts are not restored before the expiration time, the account and all
child resources (eg: Properties, GoogleAdsLinks, Streams, AccessBindings) will
be permanently purged.
[https://support.google.com/analytics/answer/6154772](https://support.google.com/analytics/answer/6154772)

Returns an error if the target is not found.

### HTTP request

`DELETE https://analyticsadmin.googleapis.com/v1beta/{name=accounts/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                               |
| :--------- | :------------------------------------------------------------------------------------------------------------ |
| `name`     | `string` Required. The name of the Account to soft-delete. Format: accounts/{account} Example: "accounts/100" |

### Request body

The request body must be empty.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
