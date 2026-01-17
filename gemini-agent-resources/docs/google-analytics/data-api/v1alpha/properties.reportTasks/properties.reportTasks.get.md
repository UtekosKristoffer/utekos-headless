# Method: properties.reportTasks.get

Gets report metadata about a specific report task. After creating a report task,
use this method to check its processing state or inspect its report definition.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1alpha/{name=properties/*/reportTasks/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                            |
| :--------- | :--------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The report task resource name. Format: `properties/{property}/reportTasks/{reportTask}` |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`ReportTask`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks#ReportTask).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
