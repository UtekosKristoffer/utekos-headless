# Method: properties.reportTasks.list

Lists all report tasks for a property.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1alpha/{parent=properties/*}/reportTasks`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                       |
| :--------- | :-------------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. All report tasks for this property will be listed in the response. Format: `properties/{property}` |

### Query parameters

| Parameters  |                                                                                                                                  |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`  | `integer` Optional. The maximum number of report tasks to return.                                                                |
| `pageToken` | `string` Optional. A page token, received from a previous `reportTasks.list` call. Provide this to retrieve the subsequent page. |

### Request body

The request body must be empty.

### Response body

A list of all report tasks for a property.

If successful, the response body contains data with the following structure:

| JSON representation                                                                           |
| :-------------------------------------------------------------------------------------------- |
| `{   "reportTasks": [     {       object (ReportTask)     }   ],   "nextPageToken": string }` |

| Fields          |                                                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `reportTasks[]` | `object (ReportTask)` Each report task for a property.                                                                                 |
| `nextPageToken` | `string` A token, which can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
