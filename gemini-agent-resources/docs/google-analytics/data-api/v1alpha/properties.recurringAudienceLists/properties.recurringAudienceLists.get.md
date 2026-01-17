# Method: properties.recurringAudienceLists.get

Gets configuration metadata about a specific recurring audience list. This
method can be used to understand a recurring audience list's state after it has
been created. For example, a recurring audience list resource will generate
audience list instances for each day, and this method can be used to get the
resource name of the most recent audience list instance.

This method is introduced at alpha stability with the intention of gathering
feedback on syntax and capabilities before entering beta. To give your feedback
on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1alpha/{name=properties/*/recurringAudienceLists/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                              |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The recurring audience list resource name. Format: `properties/{property}/recurringAudienceLists/{recurringAudienceList}` |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of
[`RecurringAudienceList`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.recurringAudienceLists#RecurringAudienceList).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
-
