# Method: properties.audienceLists.get

-
-
-
-
-
-
-

Gets configuration metadata about a specific audience list. This method can be
used to understand an audience list after it has been created.

See
[Creating an Audience List](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics)
for an introduction to Audience Lists with examples.

This method is available at beta stability at
[audienceExports.get](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/get).
To give your feedback on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1alpha/{name=properties/*/audienceLists/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                  |
| :--------- | :--------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The audience list resource name. Format: `properties/{property}/audienceLists/{audienceList}` |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`AudienceList`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.audienceLists#AudienceList).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
-
-
