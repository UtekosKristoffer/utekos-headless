# Method: accounts.patch

Updates an account.

### HTTP request

`PATCH https://analyticsadmin.googleapis.com/v1beta/{account.name=accounts/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters     |                                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------------------ |
| `account.name` | `string` Output only. Resource name of this account. Format: accounts/{account} Example: "accounts/100" |

### Query parameters

| Parameters   |                                                                                                                                                                                                                                                                                                                                                                              |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateMask` | `string (FieldMask format)` Required. The list of fields to be updated. Field names must be in snake case (for example, "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "\*" to match all fields. This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`. |

### Request body

The request body contains an instance of
[`Account`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/accounts#Account).

### Response body

If successful, the response body contains an instance of
[`Account`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/accounts#Account).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
