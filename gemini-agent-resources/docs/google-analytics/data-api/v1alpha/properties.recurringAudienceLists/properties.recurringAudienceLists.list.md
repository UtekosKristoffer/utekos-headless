# Method: properties.recurringAudienceLists.list

Lists all recurring audience lists for a property. This method can be used for
you to find and reuse existing recurring audience lists rather than creating
unnecessary new recurring audience lists. The same audience can have multiple
recurring audience lists that represent different dimension combinations; for
example, just the dimension `deviceId` or both the dimensions `deviceId` and
`userId`.

This method is introduced at alpha stability with the intention of gathering
feedback on syntax and capabilities before entering beta. To give your feedback
on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1alpha/{parent=properties/*}/recurringAudienceLists`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                   |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. All recurring audience lists for this property will be listed in the response. Format: `properties/{property}` |

### Query parameters

| Parameters  |                                                                                                                                                                                                                                                                               |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`  | `integer` Optional. The maximum number of recurring audience lists to return. The service may return fewer than this value. If unspecified, at most 200 recurring audience lists will be returned. The maximum value is 1000 (higher values will be coerced to the maximum).  |
| `pageToken` | `string` Optional. A page token, received from a previous `recurringAudienceLists.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `recurringAudienceLists.list` must match the call that provided the page token. |

### Request body

The request body must be empty.

### Response body

A list of all recurring audience lists for a property.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------ |
| `{   "recurringAudienceLists": [     {       object (RecurringAudienceList)     }   ],   "nextPageToken": string }` |

| Fields                     |                                                                                                                                        |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `recurringAudienceLists[]` | `object (RecurringAudienceList)` Each recurring audience list for a property.                                                          |
| `nextPageToken`            | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
-
