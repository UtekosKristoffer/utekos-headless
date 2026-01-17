# Method: properties.audienceLists.list

-
-
-
-
-
-
-
-

Lists all audience lists for a property. This method can be used for you to find
and reuse existing audience lists rather than creating unnecessary new audience
lists. The same audience can have multiple audience lists that represent the
list of users that were in an audience on different days.

See
[Creating an Audience List](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics)
for an introduction to Audience Lists with examples.

This method is available at beta stability at
[audienceExports.list](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/list).
To give your feedback on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1alpha/{parent=properties/*}/audienceLists`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                         |
| :--------- | :---------------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. All audience lists for this property will be listed in the response. Format: `properties/{property}` |

### Query parameters

| Parameters  |                                                                                                                                                                                                                                                             |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`  | `integer` Optional. The maximum number of audience lists to return. The service may return fewer than this value. If unspecified, at most 200 audience lists will be returned. The maximum value is 1000 (higher values will be coerced to the maximum).    |
| `pageToken` | `string` Optional. A page token, received from a previous `audienceLists.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `audienceLists.list` must match the call that provided the page token. |

### Request body

The request body must be empty.

### Response body

A list of all audience lists for a property.

If successful, the response body contains data with the following structure:

| JSON representation                                                                               |
| :------------------------------------------------------------------------------------------------ |
| `{   "audienceLists": [     {       object (AudienceList)     }   ],   "nextPageToken": string }` |

| Fields            |                                                                                                                                        |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `audienceLists[]` | `object (AudienceList)` Each audience list for a property.                                                                             |
| `nextPageToken`   | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
-
-
