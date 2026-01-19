# Method: accounts.get

Lookup for a single Account.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{name=accounts/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                          |
| :--------- | :------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The name of the account to lookup. Format: accounts/{account} Example: "accounts/100" |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`Account`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/accounts#Account).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
