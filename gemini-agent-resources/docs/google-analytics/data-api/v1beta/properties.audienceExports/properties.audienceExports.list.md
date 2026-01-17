# Method: properties.audienceExports.list

Lists all audience exports for a property. This method can be used for you to
find and reuse existing audience exports rather than creating unnecessary new
audience exports. The same audience can have multiple audience exports that
represent the export of users that were in an audience on different days.

See
[Creating an Audience Export](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics)
for an introduction to Audience Exports with examples.

Audience Export APIs have some methods at alpha and other methods at beta
stability. The intention is to advance methods to beta stability after some
feedback and adoption. To give your feedback on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1beta/{parent=properties/*}/audienceExports`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                           |
| :--------- | :------------------------------------------------------------------------------------------------------------------------ |
| `parent`   | `string` Required. All audience exports for this property will be listed in the response. Format: `properties/{property}` |

### Query parameters

| Parameters  |                                                                                                                                                                                                                                                                 |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`  | `integer` Optional. The maximum number of audience exports to return. The service may return fewer than this value. If unspecified, at most 200 audience exports will be returned. The maximum value is 1000 (higher values will be coerced to the maximum).    |
| `pageToken` | `string` Optional. A page token, received from a previous `audienceExports.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `audienceExports.list` must match the call that provided the page token. |

### Request body

The request body must be empty.

### Response body

A list of all audience exports for a property.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                   |
| :---------------------------------------------------------------------------------------------------- |
| `{   "audienceExports": [     {       object (AudienceExport)     }   ],   "nextPageToken": string }` |

| Fields              |                                                                                                                                        |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `audienceExports[]` | `object (AudienceExport)` Each audience export for a property.                                                                         |
| `nextPageToken`     | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
