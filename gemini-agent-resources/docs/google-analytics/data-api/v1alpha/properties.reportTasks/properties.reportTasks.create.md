# Method: properties.reportTasks.create

Initiates the creation of a report task. This method quickly returns a report
task and initiates a long running asynchronous request to form a customized
report of your Google Analytics event data.

A report task will be retained and available for querying for 72 hours after it
has been created.

A report task created by one user can be listed and queried by all users who
have access to the property.

### HTTP request

`POST https://analyticsdata.googleapis.com/v1alpha/{parent=properties/*}/reportTasks`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                  |
| :--------- | :--------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. The parent resource where this report task will be created. Format: `properties/{propertyId}` |

### Request body

The request body contains an instance of
[`ReportTask`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks#ReportTask).

### Response body

If successful, the response body contains a newly created instance of
[`Operation`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/Shared.Types/Operation).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
