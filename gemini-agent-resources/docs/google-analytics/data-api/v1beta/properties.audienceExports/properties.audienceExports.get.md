# Method: properties.audienceExports.get

Gets configuration metadata about a specific audience export. This method can be
used to understand an audience export after it has been created.

See
[Creating an Audience Export](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics)
for an introduction to Audience Exports with examples.

Audience Export APIs have some methods at alpha and other methods at beta
stability. The intention is to advance methods to beta stability after some
feedback and adoption. To give your feedback on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1beta/{name=properties/*/audienceExports/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                        |
| :--------- | :--------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The audience export resource name. Format: `properties/{property}/audienceExports/{audienceExport}` |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`AudienceExport`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports#AudienceExport).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
