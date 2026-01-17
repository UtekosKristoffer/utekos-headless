# Method: properties.recurringAudienceLists.create

Creates a recurring audience list. Recurring audience lists produces new
audience lists each day. Audience lists are users in an audience at the time of
the list's creation.

A recurring audience list ensures that you have audience list based on the most
recent data available for use each day. If you manually create audience list,
you don't know when an audience list based on an additional day's data is
available. This recurring audience list automates the creation of an audience
list when an additional day's data is available. You will consume fewer quota
tokens by using recurring audience list versus manually creating audience list
at various times of day trying to guess when an additional day's data is ready.

This method is introduced at alpha stability with the intention of gathering
feedback on syntax and capabilities before entering beta. To give your feedback
on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`POST https://analyticsdata.googleapis.com/v1alpha/{parent=properties/*}/recurringAudienceLists`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                            |
| :--------- | :------------------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. The parent resource where this recurring audience list will be created. Format: `properties/{property}` |

### Request body

The request body contains an instance of
[`RecurringAudienceList`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.recurringAudienceLists#RecurringAudienceList).

### Response body

If successful, the response body contains a newly created instance of
[`RecurringAudienceList`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.recurringAudienceLists#RecurringAudienceList).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
