# Method: properties.audienceExports.create

Creates an audience export for later retrieval. This method quickly returns the
audience export's resource name and initiates a long running asynchronous
request to form an audience export. To export the users in an audience export,
first create the audience export through this method and then send the audience
resource name to the `audienceExports.query` method.

See
[Creating an Audience Export](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics)
for an introduction to Audience Exports with examples.

An audience export is a snapshot of the users currently in the audience at the
time of audience export creation. Creating audience exports for one audience on
different days will return different results as users enter and exit the
audience.

Audiences in Google Analytics 4 allow you to segment your users in the ways that
are important to your business. To learn more, see
[https://support.google.com/analytics/answer/9267572](https://support.google.com/analytics/answer/9267572).
Audience exports contain the users in each audience.

Audience Export APIs have some methods at alpha and other methods at beta
stability. The intention is to advance methods to beta stability after some
feedback and adoption. To give your feedback on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`POST https://analyticsdata.googleapis.com/v1beta/{parent=properties/*}/audienceExports`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                    |
| :--------- | :----------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. The parent resource where this audience export will be created. Format: `properties/{property}` |

### Request body

The request body contains an instance of
[`AudienceExport`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports#AudienceExport).

### Response body

If successful, the response body contains a newly created instance of
[`Operation`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/Shared.Types/Operation).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
