# Method: properties.list

Returns child Properties under the specified parent Account.

Properties will be excluded if the caller does not have access. Soft-deleted
(ie: "trashed") properties are excluded by default. Returns an empty list if no
relevant properties are found.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/properties`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Query parameters

| Parameters    |                                                                                                                                                                                                                                                                                                                                        |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------- | --- | ----------------------------- | ------------------------------------------- | --- | ------------------- | --------------------------------- | --- | --------------------- | ----------------------------------- | --- | --------------------- | --------------------------------- | --- | --------------------------- | ----------------------------------------- | --- | -------------------- | -------------------------------------- | --- |
| `filter`      | `string` Required. An expression for filtering the results of the request. Fields eligible for filtering are: `parent:`(The resource name of the parent account/property) or `ancestor:`(The resource name of the parent account) or `firebase_project:`(The id or number of the linked firebase project). Some examples of filters: ` | Filter | Description |     | ----------------------------- | ------------------------------------------- |     | parent:accounts/123 | The account with account id: 123. |     | parent:properties/123 | The property with property id: 123. |     | ancestor:accounts/123 | The account with account id: 123. |     | firebase_project:project-id | The firebase project with id: project-id. |     | firebase_project:123 | The firebase project with number: 123. | `   |
| `pageSize`    | `integer` The maximum number of resources to return. The service may return fewer than this value, even if there are additional pages. If unspecified, at most 50 resources will be returned. The maximum value is 200; (higher values will be coerced to the maximum)                                                                 |
| `pageToken`   | `string` A page token, received from a previous `properties.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `properties.list` must match the call that provided the page token.                                                                                            |
| `showDeleted` | `boolean` Whether to include soft-deleted (ie: "trashed") Properties in the results. Properties can be inspected to determine whether they are deleted or not.                                                                                                                                                                         |

### Request body

The request body must be empty.

### Response body

Response message for properties.list RPC.

If successful, the response body contains data with the following structure:

| JSON representation                                                                        |
| :----------------------------------------------------------------------------------------- |
| `{   "properties": [     {       object (Property)     }   ],   "nextPageToken": string }` |

| Fields          |                                                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `properties[]`  | `object (Property)` Results that matched the filter criteria and were accessible to the caller.                                        |
| `nextPageToken` | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics.edit`
