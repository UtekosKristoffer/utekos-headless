# Method: properties.audienceExports.query

Retrieves an audience export of users. After creating an audience, the users are
not immediately available for exporting. First, a request to
`audienceExports.create` is necessary to create an audience export of users, and
then second, this method is used to retrieve the users in the audience export.

See
[Creating an Audience Export](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-basics)
for an introduction to Audience Exports with examples.

Audiences in Google Analytics 4 allow you to segment your users in the ways that
are important to your business. To learn more, see
[https://support.google.com/analytics/answer/9267572](https://support.google.com/analytics/answer/9267572).

Audience Export APIs have some methods at alpha and other methods at beta
stability. The intention is to advance methods to beta stability after some
feedback and adoption. To give your feedback on this API, complete the
[Google Analytics Audience Export API Feedback](https://forms.gle/EeA5u5LW6PEggtCEA)
form.

### HTTP request

`POST https://analyticsdata.googleapis.com/v1beta/{name=properties/*/audienceExports/*}:query`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                             |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`     | `string` Required. The name of the audience export to retrieve users from. Format: `properties/{property}/audienceExports/{audienceExport}` |

### Request body

The request body contains data with the following structure:

| JSON representation                         |
| :------------------------------------------ |
| `{   "offset": string,   "limit": string }` |

| Fields   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `offset` | `string (int64 format)` Optional. The row count of the start row. The first row is counted as row 0\. When paging, the first request does not specify offset; or equivalently, sets offset to 0; the first request returns the first `limit` of rows. The second request sets offset to the `limit` of the first request; the second request returns the second `limit` of rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). |
| `limit`  | `string (int64 format)` Optional. The number of rows to return. If unspecified, 10,000 rows are returned. The API returns a maximum of 250,000 rows per request, no matter how many you ask for. `limit` must be positive. The API can also return fewer rows than the requested `limit`, if there aren't as many dimension values as the `limit`. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).                               |

### Response body

A list of users in an audience export.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "audienceRows": [     {       object (AudienceRow)     }   ],   "audienceExport": {     object (AudienceExport)   },   "rowCount": integer }` |

| Fields           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `audienceRows[]` | `object (AudienceRow)` Rows for each user in an audience export. The number of rows in this response will be less than or equal to request's page size.                                                                                                                                                                                                                                                                                                                                                                    |
| `audienceExport` | `object (AudienceExport)` Configuration data about AudienceExport being queried. Returned to help interpret the audience rows in this response. For example, the dimensions in this AudienceExport correspond to the columns in the AudienceRows.                                                                                                                                                                                                                                                                          |
| `rowCount`       | `integer` The total number of rows in the AudienceExport result. `rowCount` is independent of the number of rows returned in the response, the `limit` request parameter, and the `offset` request parameter. For example if a query returns 175 rows and includes `limit` of 50 in the API request, the response will contain `rowCount` of 175 but only 50 rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`

## AudienceRow

Dimension value attributes for the audience user row.

| JSON representation                                                                |
| :--------------------------------------------------------------------------------- |
| `{   "dimensionValues": [     {       object (AudienceDimensionValue)     }   ] }` |

| Fields              |                                                                                                                                                               |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dimensionValues[]` | `object (AudienceDimensionValue)` Each dimension value attribute for an audience user. One dimension value will be added for each dimension column requested. |

## AudienceDimensionValue

The value of a dimension.

| JSON representation                                                                                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field one_value can be only one of the following:   "value": string   // End of list of possible types for union field one_value. }` |

| Fields                                                                                              |                                                               |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| Union field `one_value`. One kind of dimension value. `one_value` can be only one of the following: |                                                               |
| `value`                                                                                             | `string` Value as a string if the dimension type is a string. |
