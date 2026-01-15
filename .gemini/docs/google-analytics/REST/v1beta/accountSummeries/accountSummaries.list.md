# Method: accountSummaries.list

Returns summaries of all accounts accessible by the caller.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1alpha/accountSummaries`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Query parameters

| Parameters  |                                                                                                                                                                                                                                                                                       |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pageSize`  | `integer` The maximum number of AccountSummary resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum) |
| `pageToken` | `string` A page token, received from a previous `accountSummaries.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `accountSummaries.list` must match the call that provided the page token.                               |

### Request body

The request body must be empty.

### Response body

Response message for accountSummaries.list RPC.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                    |
| :----------------------------------------------------------------------------------------------------- |
| `{   "accountSummaries": [     {       object (AccountSummary)     }   ],   "nextPageToken": string }` |

| Fields               |                                                                                                                                        |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `accountSummaries[]` | `object (AccountSummary)` Account summaries of all accounts the caller has access to.                                                  |
| `nextPageToken`      | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`

## AccountSummary

A virtual resource representing an overview of an account and all its child
Google Analytics properties.

| JSON representation                                                                                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "account": string,   "displayName": string,   "propertySummaries": [     {       object (PropertySummary)     }   ] }` |

| Fields                |                                                                                                                              |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `name`                | `string` Resource name for this account summary. Format: accountSummaries/{account_id} Example: "accountSummaries/1000"      |
| `account`             | `string` Resource name of account referred to by this account summary Format: accounts/{account_id} Example: "accounts/1000" |
| `displayName`         | `string` Display name for the account referred to in this account summary.                                                   |
| `propertySummaries[]` | `object (PropertySummary)` List of summaries for child accounts of this account.                                             |

## PropertySummary

A virtual resource representing metadata for a Google Analytics property.

| JSON representation                                                                                            |
| :------------------------------------------------------------------------------------------------------------- |
| `{   "property": string,   "displayName": string,   "propertyType": enum (PropertyType),   "parent": string }` |

| Fields         |                                                                                                                                                                                                                      |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `property`     | `string` Resource name of property referred to by this property summary Format: properties/{property_id} Example: "properties/1000"                                                                                  |
| `displayName`  | `string` Display name for the property referred to in this property summary.                                                                                                                                         |
| `propertyType` | `enum (PropertyType)` The property's property type.                                                                                                                                                                  |
| `parent`       | `string` Resource name of this property's logical parent. Note: The Property-Moving UI can be used to change the parent. Format: accounts/{account}, properties/{property} Example: "accounts/100", "properties/200" |
