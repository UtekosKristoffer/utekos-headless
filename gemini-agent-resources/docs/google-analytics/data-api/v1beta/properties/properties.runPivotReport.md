# Method: properties.runPivotReport

Returns a customized pivot report of your Google Analytics event data. Pivot
reports are more advanced and expressive formats than regular reports. In a
pivot report, dimensions are only visible if they are included in a pivot.
Multiple pivots can be specified to further dissect your data.

### HTTP request

`POST https://analyticsdata.googleapis.com/v1beta/{property=properties/*}:runPivotReport`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                                                                                                                                                                                                                                                                                      |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `property` | `string` A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Within a batch request, this property should either be unspecified or consistent with the batch-level property. Example: properties/1234 |

### Request body

The request body contains data with the following structure:

| JSON representation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dimensions": [     {       object (Dimension)     }   ],   "metrics": [     {       object (Metric)     }   ],   "dateRanges": [     {       object (DateRange)     }   ],   "pivots": [     {       object (Pivot)     }   ],   "dimensionFilter": {     object (FilterExpression)   },   "metricFilter": {     object (FilterExpression)   },   "currencyCode": string,   "cohortSpec": {     object (CohortSpec)   },   "keepEmptyRows": boolean,   "returnPropertyQuota": boolean,   "comparisons": [     {       object (Comparison)     }   ] }` |

| Fields                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensions[]`        | `object (Dimension)` The dimensions requested. All defined dimensions must be used by one of the following: dimensionExpression, dimensionFilter, pivots, orderBys.                                                                                                                                                                                                                                                                                                                                        |
| `metrics[]`           | `object (Metric)` The metrics requested, at least one metric needs to be specified. All defined metrics must be used by one of the following: metric_expression, metricFilter, orderBys.                                                                                                                                                                                                                                                                                                                   |
| `dateRanges[]`        | `object (DateRange)` The date range to retrieve event data for the report. If multiple date ranges are specified, event data from each date range is used in the report. A special dimension with field name "dateRange" can be included in a Pivot's field names; if included, the report compares between date ranges. In a cohort request, this `dateRanges` must be unspecified.                                                                                                                       |
| `pivots[]`            | `object (Pivot)` Describes the visual format of the report's dimensions in columns or rows. The union of the fieldNames (dimension names) in all pivots must be a subset of dimension names defined in Dimensions. No two pivots can share a dimension. A dimension is only visible if it appears in a pivot.                                                                                                                                                                                              |
| `dimensionFilter`     | `object (FilterExpression)` The filter clause of dimensions. Dimensions must be requested to be used in this filter. Metrics cannot be used in this filter.                                                                                                                                                                                                                                                                                                                                                |
| `metricFilter`        | `object (FilterExpression)` The filter clause of metrics. Applied at post aggregation phase, similar to SQL having-clause. Metrics must be requested to be used in this filter. Dimensions cannot be used in this filter.                                                                                                                                                                                                                                                                                  |
| `currencyCode`        | `string` A currency code in ISO4217 format, such as "AED", "USD", "JPY". If the field is empty, the report uses the property's default currency.                                                                                                                                                                                                                                                                                                                                                           |
| `cohortSpec`          | `object (CohortSpec)` Cohort group associated with this request. If there is a cohort group in the request the 'cohort' dimension must be present.                                                                                                                                                                                                                                                                                                                                                         |
| `keepEmptyRows`       | `boolean` If false or unspecified, each row with all metrics equal to 0 will not be returned. If true, these rows will be returned if they are not separately removed by a filter. Regardless of this `keepEmptyRows` setting, only data recorded by the Google Analytics property can be displayed in a report. For example if a property never logs a `purchase` event, then a query for the `eventName` dimension and `eventCount` metric will not have a row eventName: "purchase" and eventCount: 0\. |
| `returnPropertyQuota` | `boolean` Toggles whether to return the current state of this Google Analytics property's quota. Quota is returned in [PropertyQuota](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runPivotReport#PropertyQuota).                                                                                                                                                                                                                                            |
| `comparisons[]`       | `object (Comparison)` Optional. The configuration of comparisons requested and displayed. The request requires both a comparisons field and a comparisons dimension to receive a comparison column in the response.                                                                                                                                                                                                                                                                                        |

### Response body

If successful, the response body contains an instance of
[`RunPivotReportResponse`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/RunPivotReportResponse).

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
-
