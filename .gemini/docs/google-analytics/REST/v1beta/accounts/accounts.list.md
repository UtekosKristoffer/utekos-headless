# Method: accounts.list

Returns all accounts accessible by the caller.

Note that these accounts might not currently have GA properties. Soft-deleted
(ie: "trashed") accounts are excluded by default. Returns an empty list if no
relevant accounts are found.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/accounts`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Query parameters

| Parameters    |                                                                                                                                                                                                                                                                        |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`    | `integer` The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) |
| `pageToken`   | `string` A page token, received from a previous `accounts.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `accounts.list` must match the call that provided the page token.                                |
| `showDeleted` | `boolean` Whether to include soft-deleted (ie: "trashed") Accounts in the results. Accounts can be inspected to determine whether they are deleted or not.                                                                                                             |

### Request body

The request body must be empty.

### Response body

Request message for accounts.list RPC.

If successful, the response body contains data with the following structure:

| JSON representation                                                                     |
| :-------------------------------------------------------------------------------------- |
| `{   "accounts": [     {       object (Account)     }   ],   "nextPageToken": string }` |

| Fields          |                                                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `accounts[]`    | `object (Account)` Results that were accessible to the caller.                                                                         |
| `nextPageToken` | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
